import "@stdlib/deploy";

struct Hackathon {
    id: Int;
    creator: Address;
    name: String;
    description: String;
    prizePool: Int;
    winningTeamId: Int;
    approvedTeams: map<Int, Int>;
    pendingRequests: map<Int, Int>;
}

struct Team {
    id: Int;
    name: String;
    leader: Address;
    members: map<Int, Address>;
    length: Int;
}

message CreateHackerParams {
    dataHash: String;
    devScore: Int;
}

message CreateHackathonParams {
    name: String;
    description: String;
    prizePool: Int;
}

message ApproveForHackathonParams {
    hackathonId: Int;
    teamId: Int;
}

message JoinHackathonParams {
    hackathonId: Int;
    teamId: Int;
}

message CreateTeamParams {
    name: String;
    members: map<Int, Address>;
}

message AddMemberToTeam {
    teamId: Int;
    member: Address;
}

message SetWinnerParams {
    hackathonId: Int;
    teamId: Int;
}

contract HackerOne with Deployable {
    
  hackersCount: Int = 0;
  hackathons: map<Int, Hackathon>;
  hackathonsCount: Int = 0;
  teams: map<Int, Team>;
  currTeamId: Int = 0;
  platformOwner: Address;

  init() {
    self.hackathons = emptyMap();
    self.teams = emptyMap();
    self.platformOwner = sender();
  }

  // create Hackathon
  receive(msg: CreateHackathonParams) {
    let _hackathon: Hackathon = Hackathon {
      id: self.hackathonsCount,
      name: msg.name,
      description: msg.description,
      prizePool: msg.prizePool,
      creator: sender(),
      winningTeamId: -1,
      approvedTeams: emptyMap(),
      pendingRequests: emptyMap()  
    };
    self.hackathons.set(self.hackathonsCount, _hackathon);
    self.hackathonsCount += 1;
  }

  get fun getHackathon(_id: Int): Hackathon {
    require(self.hackathons.exists(_id), "Hackathon doesn't exist");
    return self.hackathons.get(_id)!!;
  }
  
  // create Team
  receive(msg: CreateTeamParams) {
    let leader = sender();
    let members: map<Int, Address> = emptyMap();
    members.set(0, leader);

    let team = Team {
        id: self.currTeamId,
        name: msg.name,
        leader: sender(),
        members: members,
        length: 1
    };
    self.teams.set(self.currTeamId, team);
    self.currTeamId += 1;
  }
  get fun getTeam(teamId: Int): Team {
    require(self.teams.exists(teamId), "Team doesn't exist");
    return self.teams.get(teamId)!!;
  }
  // add member in team
  receive(msg: AddMemberToTeam) {
    require(self.teams.exists(msg.teamId), "Team doesn't exist");
    require(self.teams.get(msg.teamId)!!.leader == sender(), "Only team leader can add members");
    let team = self.getTeam(msg.teamId);
    let length = team.length;
    team.members.set(length, msg.member);
    length += 1;
    let newTeam = Team {
        id: msg.teamId,
        name: team.name,
        leader: team.leader,
        members: team.members,
        length: length
    };
    self.teams.set(msg.teamId, newTeam);
  }

  // Join hackathon (team)
  receive(msg: JoinHackathonParams) {
    let hackathon = self.getHackathon(msg.hackathonId);
    require(self.hackathons.exists(msg.hackathonId), "Hackathon doesnt exist");
    require(self.teams.exists(msg.teamId), "Team doesn'texist");

    let alreadyPresent = false;

    let approvedTeams = self.hackathons.get(msg.hackathonId)!!.approvedTeams;
    foreach (_, val in approvedTeams) {
        if (val == msg.teamId) {
            alreadyPresent = true;
        }
    }
    require(!alreadyPresent, "Team already approved");

    let pendingRequests = self.hackathons.get(msg.hackathonId)!!.pendingRequests;
    let pendingRequestsLength = 0;
    foreach (_, val in pendingRequests) {
        if (val == msg.teamId) {
            alreadyPresent = true;
        }
        pendingRequestsLength += 1;
    }
    require(!alreadyPresent, "Team already registered");

    pendingRequests.set(pendingRequestsLength, msg.teamId);
    let newHackathon = Hackathon {
        id: hackathon.id,
        creator: hackathon.creator,
        name: hackathon.name,
        description: hackathon.description,
        prizePool: hackathon.prizePool,
        winningTeamId: hackathon.winningTeamId,
        approvedTeams: hackathon.approvedTeams,
        pendingRequests: pendingRequests
    };
    self.hackathons.set(msg.hackathonId, newHackathon);
  }

  // approve team
  receive(msg: ApproveForHackathonParams) {
    require(self.hackathons.exists(msg.hackathonId), "Hackathon doesnt exist");
    let hackathon: Hackathon = self.getHackathon(msg.hackathonId);
    require(sender() == hackathon.creator, "Only hackathon creator can use this function");
    require(self.teams.exists(msg.teamId), "Team doesn'texist");

    let teamId = msg.teamId;
    let inPendingList = false;
    let inApproveList = false;


    let approvedTeams = hackathon.approvedTeams;
    let approvedTeamsLength = 0;
    foreach(_, val in approvedTeams) {
        if (val == teamId) {
            inApproveList = true;
        }
        approvedTeamsLength += 1;
    }
    require(!inApproveList, "Team is already approved for the hackathon");

    let pendingRequestsLength = 0;
    let teamIndex = -1;
    let pendingRequests = hackathon.pendingRequests;
    foreach (key, val in pendingRequests) {
        if (val == teamId) {
            inPendingList = true;
            teamIndex = key;
        }
        pendingRequestsLength += 1;
    }
    require(inPendingList, "Hacker is not registered for the hackathon");

    let i = teamIndex;
    while (i + 1 < pendingRequestsLength) {
        pendingRequests.set(i, pendingRequests.get(i+1)!!);
        i += 1;
    }
    pendingRequests.set(pendingRequestsLength - 1, null);
    approvedTeams.set(approvedTeamsLength, teamId);

    let newHackathon = Hackathon {
        id: hackathon.id,
        creator: hackathon.creator,
        name: hackathon.name,
        description: hackathon.description,
        prizePool: hackathon.prizePool,
        winningTeamId: hackathon.winningTeamId,
        approvedTeams: approvedTeams,
        pendingRequests: pendingRequests
    };
    self.hackathons.set(msg.hackathonId, newHackathon);

  }

  // setWinner
  receive(msg: SetWinnerParams) {
    require(self.hackathons.exists(msg.hackathonId), "Hackathon doesn't exist");
    require(self.teams.exists(msg.teamId), "Team doesn't exist");

    let hackathon = self.getHackathon(msg.hackathonId);
    let newHackathon = Hackathon {
        id: hackathon.id,
        creator: hackathon.creator,
        name: hackathon.name,
        description: hackathon.description,
        prizePool: hackathon.prizePool,
        winningTeamId: msg.teamId,
        approvedTeams: hackathon.approvedTeams,
        pendingRequests: hackathon.pendingRequests
    };
    self.hackathons.set(msg.hackathonId, newHackathon);
  }
}

// struct HackathonTeams {
//     hackathonTeams: map<Int, Int>;
// }

// struct Hacker {
//     addr: Address;
//     dataHash: String;
//     pastHackathons: map<Int, Int>;
//     teamInvites: map<Int, Int>;
//     teamsJoined: map<Int, Int>;
//     devScore: Int;
// }

// message GetTeam

// message CreateHackathonTeamParams {
//     id: Int;
//     name: String;
//     leader: Address;
//     members: map<Int, Address>;
// }

// request To Join Hackathon (individual)
//   receive(msg: JoinHackathonParams) {
//     let invalid: Bool = false;
//     require(self.hackathons.exists(msg.id), "Invalid Hackathon ID");
//     require(self.hackers.exists(sender()), "Please register as a Hacker");
//     let hackathon: Hackathon = self.getHackathon(msg.id);
//     let addr: Address = sender();
//     let approvedParticipants = hackathon.approvedParticipants;

//     foreach(_, val in approvedParticipants) {
//         if (val == addr) {
//             invalid = true;
//         }    
//     }
//     require(!invalid, "Hacker is already approved for the hackathon");

//     let _pendingRequestsLength = 0;
//     if (!invalid) {
//         let pendingRequests = hackathon.pendingRequests;
//         foreach (_, val in pendingRequests) {
//             if (val == addr) {
//                 invalid = true;
//             }
//             _pendingRequestsLength += 1;
//         }
//     }
//     require(!invalid, "Please register for the hackathon");
//     let pendingRequests = hackathon.pendingRequests;
//     pendingRequests.set(_pendingRequestsLength, addr);
//     let newHackathon = Hackathon {
//         id: hackathon.id,
//         creator: hackathon.creator,
//         name: hackathon.name,
//         description: hackathon.description,
//         prizePool: hackathon.prizePool,
//         // teams: hackathon.teams,
//         winningTeamId: hackathon.winningTeamId,
//         approvedParticipants: hackathon.approvedParticipants,
//         // approvedParticipantsLength: Int;
//         pendingRequests: pendingRequests
//         // pendingRequestsLength: Int;
//     };
//     self.hackathons.set(msg.id, newHackathon);
//   }

  // approve Hackathon Request (individual)
//   receive(msg: ApproveHackathonParams) {
//     let addr = sender();
//     let participant = msg.participant;
//     let invalid = false;
//     require(addr == self.platformOwner, "Only owner can use this function");
//     require(self.hackathons.exists(msg.id), "Hackathon doesnt exist");
//     let hackathon: Hackathon = self.getHackathon(msg.id);

//     let approvedParticipants = hackathon.approvedParticipants;
//     let _approvedParticipantsLength = 0;
//     foreach(_, val in approvedParticipants) {
//         if (val == addr) {
//             invalid = true;
//         }
//         _approvedParticipantsLength += 1;
//     }
//     require(!invalid, "Hacker is already approved for the hackathon");

//     let _pendingRequestsLength = 0;
//     let hackerIndex = -1;
//     let pendingRequests = hackathon.pendingRequests;
//     if (!invalid) {
//         foreach (key, val in pendingRequests) {
//             if (val == participant) {
//                 invalid = false;
//                 hackerIndex = key;
//             }
//             _pendingRequestsLength += 1;
//         }
//     }
//     require(!invalid, "Hacker is not registered for the hackathon");

//     let i = hackerIndex;
//     while (i + 1 < _pendingRequestsLength) {
//         pendingRequests.set(i, pendingRequests.get(i+1)!!);
//         // self.hackathons.get(msg.id)!!.pendingRequests.set(i,  self.hackathons.get(msg.id)!!.pendingRequests.get(i+1)!!);
//         i += 1;
//     }
//     pendingRequests.set(_pendingRequestsLength - 1, null);
//     approvedParticipants.set(_approvedParticipantsLength, participant);
//     // self.hackathons.get(msg.id)!!.approvedParticipants.set(_approvedParticipantsLength, participant);

//     let newHackathon = Hackathon {
//         id: hackathon.id,
//         creator: hackathon.creator,
//         name: hackathon.name,
//         description: hackathon.description,
//         prizePool: hackathon.prizePool,
//         // teams: hackathon.teams,
//         winningTeamId: hackathon.winningTeamId,
//         approvedParticipants: approvedParticipants,
//         // approvedParticipantsLength: Int;
//         pendingRequests: pendingRequests
//         // pendingRequestsLength: Int;
//     };
//     self.hackathons.set(msg.id, newHackathon);
//   }

  // create Hacker
//   receive(msg: CreateHackerParams) {
//     let addr: Address = sender();
//     let _hacker: Hacker = Hacker {
//       addr: addr,
//       dataHash: msg.dataHash,
//       pastHackathons: emptyMap(),
//       teamInvites: emptyMap(),
//       teamsJoined: emptyMap(),
//       devScore: msg.devScore
//     };

//     self.hackers.set(addr, _hacker);
//     self.hackersCount += 1;
//   }

//   get fun getHacker(_addr: Address): Hacker {
//     require(self.hackers.exists(_addr), "Hacker doesn't exist");
//     // if(!self.hackers.exists(_addr)) {
//     //     return Hacker{
//     //         addr: newAddress(0, 0),
//     //         dataHash: "",
//     //         pastHackathons: emptyMap(),
//     //         teamInvites: emptyMap(),
//     //         teamsJoined: emptyMap(),
//     //         devScore: 0
//     //     };
//     // }
//     return self.hackers.get(_addr)!!;
//   }