import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Hacker = {
    $$type: 'Hacker';
    addr: Address;
    dataHash: string;
    devScore: bigint;
}

export function storeHacker(src: Hacker) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.addr);
        b_0.storeStringRefTail(src.dataHash);
        b_0.storeInt(src.devScore, 257);
    };
}

export function loadHacker(slice: Slice) {
    let sc_0 = slice;
    let _addr = sc_0.loadAddress();
    let _dataHash = sc_0.loadStringRefTail();
    let _devScore = sc_0.loadIntBig(257);
    return { $$type: 'Hacker' as const, addr: _addr, dataHash: _dataHash, devScore: _devScore };
}

function loadTupleHacker(source: TupleReader) {
    let _addr = source.readAddress();
    let _dataHash = source.readString();
    let _devScore = source.readBigNumber();
    return { $$type: 'Hacker' as const, addr: _addr, dataHash: _dataHash, devScore: _devScore };
}

function loadGetterTupleHacker(source: TupleReader) {
    let _addr = source.readAddress();
    let _dataHash = source.readString();
    let _devScore = source.readBigNumber();
    return { $$type: 'Hacker' as const, addr: _addr, dataHash: _dataHash, devScore: _devScore };
}

function storeTupleHacker(source: Hacker) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    builder.writeString(source.dataHash);
    builder.writeNumber(source.devScore);
    return builder.build();
}

function dictValueParserHacker(): DictionaryValue<Hacker> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHacker(src)).endCell());
        },
        parse: (src) => {
            return loadHacker(src.loadRef().beginParse());
        }
    }
}

export type Hackathon = {
    $$type: 'Hackathon';
    id: bigint;
    creator: Address;
    name: string;
    description: string;
    prizePool: bigint;
    winningTeamId: bigint;
    approvedTeams: Dictionary<bigint, bigint>;
    pendingRequests: Dictionary<bigint, bigint>;
}

export function storeHackathon(src: Hackathon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.creator);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeInt(src.prizePool, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.winningTeamId, 257);
        b_1.storeDict(src.approvedTeams, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_1.storeDict(src.pendingRequests, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadHackathon(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _creator = sc_0.loadAddress();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _prizePool = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _winningTeamId = sc_1.loadIntBig(257);
    let _approvedTeams = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    let _pendingRequests = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'Hackathon' as const, id: _id, creator: _creator, name: _name, description: _description, prizePool: _prizePool, winningTeamId: _winningTeamId, approvedTeams: _approvedTeams, pendingRequests: _pendingRequests };
}

function loadTupleHackathon(source: TupleReader) {
    let _id = source.readBigNumber();
    let _creator = source.readAddress();
    let _name = source.readString();
    let _description = source.readString();
    let _prizePool = source.readBigNumber();
    let _winningTeamId = source.readBigNumber();
    let _approvedTeams = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _pendingRequests = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Hackathon' as const, id: _id, creator: _creator, name: _name, description: _description, prizePool: _prizePool, winningTeamId: _winningTeamId, approvedTeams: _approvedTeams, pendingRequests: _pendingRequests };
}

function loadGetterTupleHackathon(source: TupleReader) {
    let _id = source.readBigNumber();
    let _creator = source.readAddress();
    let _name = source.readString();
    let _description = source.readString();
    let _prizePool = source.readBigNumber();
    let _winningTeamId = source.readBigNumber();
    let _approvedTeams = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _pendingRequests = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Hackathon' as const, id: _id, creator: _creator, name: _name, description: _description, prizePool: _prizePool, winningTeamId: _winningTeamId, approvedTeams: _approvedTeams, pendingRequests: _pendingRequests };
}

function storeTupleHackathon(source: Hackathon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.creator);
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.prizePool);
    builder.writeNumber(source.winningTeamId);
    builder.writeCell(source.approvedTeams.size > 0 ? beginCell().storeDictDirect(source.approvedTeams, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.pendingRequests.size > 0 ? beginCell().storeDictDirect(source.pendingRequests, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserHackathon(): DictionaryValue<Hackathon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHackathon(src)).endCell());
        },
        parse: (src) => {
            return loadHackathon(src.loadRef().beginParse());
        }
    }
}

export type Team = {
    $$type: 'Team';
    id: bigint;
    name: string;
    leader: Address;
    members: Dictionary<bigint, Address>;
    length: bigint;
}

export function storeTeam(src: Team) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeStringRefTail(src.name);
        b_0.storeAddress(src.leader);
        b_0.storeDict(src.members, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeInt(src.length, 257);
    };
}

export function loadTeam(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _name = sc_0.loadStringRefTail();
    let _leader = sc_0.loadAddress();
    let _members = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Team' as const, id: _id, name: _name, leader: _leader, members: _members, length: _length };
}

function loadTupleTeam(source: TupleReader) {
    let _id = source.readBigNumber();
    let _name = source.readString();
    let _leader = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Team' as const, id: _id, name: _name, leader: _leader, members: _members, length: _length };
}

function loadGetterTupleTeam(source: TupleReader) {
    let _id = source.readBigNumber();
    let _name = source.readString();
    let _leader = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Team' as const, id: _id, name: _name, leader: _leader, members: _members, length: _length };
}

function storeTupleTeam(source: Team) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    builder.writeAddress(source.leader);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserTeam(): DictionaryValue<Team> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTeam(src)).endCell());
        },
        parse: (src) => {
            return loadTeam(src.loadRef().beginParse());
        }
    }
}

export type CreateHackerParams = {
    $$type: 'CreateHackerParams';
    dataHash: string;
    devScore: bigint;
}

export function storeCreateHackerParams(src: CreateHackerParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1389677699, 32);
        b_0.storeStringRefTail(src.dataHash);
        b_0.storeInt(src.devScore, 257);
    };
}

export function loadCreateHackerParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1389677699) { throw Error('Invalid prefix'); }
    let _dataHash = sc_0.loadStringRefTail();
    let _devScore = sc_0.loadIntBig(257);
    return { $$type: 'CreateHackerParams' as const, dataHash: _dataHash, devScore: _devScore };
}

function loadTupleCreateHackerParams(source: TupleReader) {
    let _dataHash = source.readString();
    let _devScore = source.readBigNumber();
    return { $$type: 'CreateHackerParams' as const, dataHash: _dataHash, devScore: _devScore };
}

function loadGetterTupleCreateHackerParams(source: TupleReader) {
    let _dataHash = source.readString();
    let _devScore = source.readBigNumber();
    return { $$type: 'CreateHackerParams' as const, dataHash: _dataHash, devScore: _devScore };
}

function storeTupleCreateHackerParams(source: CreateHackerParams) {
    let builder = new TupleBuilder();
    builder.writeString(source.dataHash);
    builder.writeNumber(source.devScore);
    return builder.build();
}

function dictValueParserCreateHackerParams(): DictionaryValue<CreateHackerParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateHackerParams(src)).endCell());
        },
        parse: (src) => {
            return loadCreateHackerParams(src.loadRef().beginParse());
        }
    }
}

export type CreateHackathonParams = {
    $$type: 'CreateHackathonParams';
    name: string;
    description: string;
    prizePool: bigint;
}

export function storeCreateHackathonParams(src: CreateHackathonParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(237951638, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeInt(src.prizePool, 257);
    };
}

export function loadCreateHackathonParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 237951638) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _prizePool = sc_0.loadIntBig(257);
    return { $$type: 'CreateHackathonParams' as const, name: _name, description: _description, prizePool: _prizePool };
}

function loadTupleCreateHackathonParams(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _prizePool = source.readBigNumber();
    return { $$type: 'CreateHackathonParams' as const, name: _name, description: _description, prizePool: _prizePool };
}

function loadGetterTupleCreateHackathonParams(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _prizePool = source.readBigNumber();
    return { $$type: 'CreateHackathonParams' as const, name: _name, description: _description, prizePool: _prizePool };
}

function storeTupleCreateHackathonParams(source: CreateHackathonParams) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.prizePool);
    return builder.build();
}

function dictValueParserCreateHackathonParams(): DictionaryValue<CreateHackathonParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateHackathonParams(src)).endCell());
        },
        parse: (src) => {
            return loadCreateHackathonParams(src.loadRef().beginParse());
        }
    }
}

export type ApproveForHackathonParams = {
    $$type: 'ApproveForHackathonParams';
    hackathonId: bigint;
    teamId: bigint;
}

export function storeApproveForHackathonParams(src: ApproveForHackathonParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4010486447, 32);
        b_0.storeInt(src.hackathonId, 257);
        b_0.storeInt(src.teamId, 257);
    };
}

export function loadApproveForHackathonParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4010486447) { throw Error('Invalid prefix'); }
    let _hackathonId = sc_0.loadIntBig(257);
    let _teamId = sc_0.loadIntBig(257);
    return { $$type: 'ApproveForHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadTupleApproveForHackathonParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'ApproveForHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadGetterTupleApproveForHackathonParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'ApproveForHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function storeTupleApproveForHackathonParams(source: ApproveForHackathonParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.hackathonId);
    builder.writeNumber(source.teamId);
    return builder.build();
}

function dictValueParserApproveForHackathonParams(): DictionaryValue<ApproveForHackathonParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApproveForHackathonParams(src)).endCell());
        },
        parse: (src) => {
            return loadApproveForHackathonParams(src.loadRef().beginParse());
        }
    }
}

export type JoinHackathonParams = {
    $$type: 'JoinHackathonParams';
    hackathonId: bigint;
    teamId: bigint;
}

export function storeJoinHackathonParams(src: JoinHackathonParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3389452178, 32);
        b_0.storeInt(src.hackathonId, 257);
        b_0.storeInt(src.teamId, 257);
    };
}

export function loadJoinHackathonParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3389452178) { throw Error('Invalid prefix'); }
    let _hackathonId = sc_0.loadIntBig(257);
    let _teamId = sc_0.loadIntBig(257);
    return { $$type: 'JoinHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadTupleJoinHackathonParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'JoinHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadGetterTupleJoinHackathonParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'JoinHackathonParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function storeTupleJoinHackathonParams(source: JoinHackathonParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.hackathonId);
    builder.writeNumber(source.teamId);
    return builder.build();
}

function dictValueParserJoinHackathonParams(): DictionaryValue<JoinHackathonParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJoinHackathonParams(src)).endCell());
        },
        parse: (src) => {
            return loadJoinHackathonParams(src.loadRef().beginParse());
        }
    }
}

export type CreateTeamParams = {
    $$type: 'CreateTeamParams';
    name: string;
    members: Dictionary<bigint, Address>;
}

export function storeCreateTeamParams(src: CreateTeamParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(261481718, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeDict(src.members, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
    };
}

export function loadCreateTeamParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 261481718) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    let _members = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    return { $$type: 'CreateTeamParams' as const, name: _name, members: _members };
}

function loadTupleCreateTeamParams(source: TupleReader) {
    let _name = source.readString();
    let _members = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'CreateTeamParams' as const, name: _name, members: _members };
}

function loadGetterTupleCreateTeamParams(source: TupleReader) {
    let _name = source.readString();
    let _members = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'CreateTeamParams' as const, name: _name, members: _members };
}

function storeTupleCreateTeamParams(source: CreateTeamParams) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}

function dictValueParserCreateTeamParams(): DictionaryValue<CreateTeamParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateTeamParams(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTeamParams(src.loadRef().beginParse());
        }
    }
}

export type AddMemberToTeam = {
    $$type: 'AddMemberToTeam';
    teamId: bigint;
    member: Address;
}

export function storeAddMemberToTeam(src: AddMemberToTeam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3314349666, 32);
        b_0.storeInt(src.teamId, 257);
        b_0.storeAddress(src.member);
    };
}

export function loadAddMemberToTeam(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3314349666) { throw Error('Invalid prefix'); }
    let _teamId = sc_0.loadIntBig(257);
    let _member = sc_0.loadAddress();
    return { $$type: 'AddMemberToTeam' as const, teamId: _teamId, member: _member };
}

function loadTupleAddMemberToTeam(source: TupleReader) {
    let _teamId = source.readBigNumber();
    let _member = source.readAddress();
    return { $$type: 'AddMemberToTeam' as const, teamId: _teamId, member: _member };
}

function loadGetterTupleAddMemberToTeam(source: TupleReader) {
    let _teamId = source.readBigNumber();
    let _member = source.readAddress();
    return { $$type: 'AddMemberToTeam' as const, teamId: _teamId, member: _member };
}

function storeTupleAddMemberToTeam(source: AddMemberToTeam) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.teamId);
    builder.writeAddress(source.member);
    return builder.build();
}

function dictValueParserAddMemberToTeam(): DictionaryValue<AddMemberToTeam> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddMemberToTeam(src)).endCell());
        },
        parse: (src) => {
            return loadAddMemberToTeam(src.loadRef().beginParse());
        }
    }
}

export type SetWinnerParams = {
    $$type: 'SetWinnerParams';
    hackathonId: bigint;
    teamId: bigint;
}

export function storeSetWinnerParams(src: SetWinnerParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1156476552, 32);
        b_0.storeInt(src.hackathonId, 257);
        b_0.storeInt(src.teamId, 257);
    };
}

export function loadSetWinnerParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1156476552) { throw Error('Invalid prefix'); }
    let _hackathonId = sc_0.loadIntBig(257);
    let _teamId = sc_0.loadIntBig(257);
    return { $$type: 'SetWinnerParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadTupleSetWinnerParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'SetWinnerParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function loadGetterTupleSetWinnerParams(source: TupleReader) {
    let _hackathonId = source.readBigNumber();
    let _teamId = source.readBigNumber();
    return { $$type: 'SetWinnerParams' as const, hackathonId: _hackathonId, teamId: _teamId };
}

function storeTupleSetWinnerParams(source: SetWinnerParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.hackathonId);
    builder.writeNumber(source.teamId);
    return builder.build();
}

function dictValueParserSetWinnerParams(): DictionaryValue<SetWinnerParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetWinnerParams(src)).endCell());
        },
        parse: (src) => {
            return loadSetWinnerParams(src.loadRef().beginParse());
        }
    }
}

export type hackaTON$Data = {
    $$type: 'hackaTON$Data';
    hackers: Dictionary<Address, Hacker>;
    hackersCount: bigint;
    hackathons: Dictionary<bigint, Hackathon>;
    hackathonsCount: bigint;
    teams: Dictionary<bigint, Team>;
    currTeamId: bigint;
    platformOwner: Address;
}

export function storehackaTON$Data(src: hackaTON$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.hackers, Dictionary.Keys.Address(), dictValueParserHacker());
        b_0.storeInt(src.hackersCount, 257);
        b_0.storeDict(src.hackathons, Dictionary.Keys.BigInt(257), dictValueParserHackathon());
        b_0.storeInt(src.hackathonsCount, 257);
        let b_1 = new Builder();
        b_1.storeDict(src.teams, Dictionary.Keys.BigInt(257), dictValueParserTeam());
        b_1.storeInt(src.currTeamId, 257);
        b_1.storeAddress(src.platformOwner);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadhackaTON$Data(slice: Slice) {
    let sc_0 = slice;
    let _hackers = Dictionary.load(Dictionary.Keys.Address(), dictValueParserHacker(), sc_0);
    let _hackersCount = sc_0.loadIntBig(257);
    let _hackathons = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserHackathon(), sc_0);
    let _hackathonsCount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _teams = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserTeam(), sc_1);
    let _currTeamId = sc_1.loadIntBig(257);
    let _platformOwner = sc_1.loadAddress();
    return { $$type: 'hackaTON$Data' as const, hackers: _hackers, hackersCount: _hackersCount, hackathons: _hackathons, hackathonsCount: _hackathonsCount, teams: _teams, currTeamId: _currTeamId, platformOwner: _platformOwner };
}

function loadTuplehackaTON$Data(source: TupleReader) {
    let _hackers = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserHacker(), source.readCellOpt());
    let _hackersCount = source.readBigNumber();
    let _hackathons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserHackathon(), source.readCellOpt());
    let _hackathonsCount = source.readBigNumber();
    let _teams = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserTeam(), source.readCellOpt());
    let _currTeamId = source.readBigNumber();
    let _platformOwner = source.readAddress();
    return { $$type: 'hackaTON$Data' as const, hackers: _hackers, hackersCount: _hackersCount, hackathons: _hackathons, hackathonsCount: _hackathonsCount, teams: _teams, currTeamId: _currTeamId, platformOwner: _platformOwner };
}

function loadGetterTuplehackaTON$Data(source: TupleReader) {
    let _hackers = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserHacker(), source.readCellOpt());
    let _hackersCount = source.readBigNumber();
    let _hackathons = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserHackathon(), source.readCellOpt());
    let _hackathonsCount = source.readBigNumber();
    let _teams = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserTeam(), source.readCellOpt());
    let _currTeamId = source.readBigNumber();
    let _platformOwner = source.readAddress();
    return { $$type: 'hackaTON$Data' as const, hackers: _hackers, hackersCount: _hackersCount, hackathons: _hackathons, hackathonsCount: _hackathonsCount, teams: _teams, currTeamId: _currTeamId, platformOwner: _platformOwner };
}

function storeTuplehackaTON$Data(source: hackaTON$Data) {
    let builder = new TupleBuilder();
    builder.writeCell(source.hackers.size > 0 ? beginCell().storeDictDirect(source.hackers, Dictionary.Keys.Address(), dictValueParserHacker()).endCell() : null);
    builder.writeNumber(source.hackersCount);
    builder.writeCell(source.hackathons.size > 0 ? beginCell().storeDictDirect(source.hackathons, Dictionary.Keys.BigInt(257), dictValueParserHackathon()).endCell() : null);
    builder.writeNumber(source.hackathonsCount);
    builder.writeCell(source.teams.size > 0 ? beginCell().storeDictDirect(source.teams, Dictionary.Keys.BigInt(257), dictValueParserTeam()).endCell() : null);
    builder.writeNumber(source.currTeamId);
    builder.writeAddress(source.platformOwner);
    return builder.build();
}

function dictValueParserhackaTON$Data(): DictionaryValue<hackaTON$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storehackaTON$Data(src)).endCell());
        },
        parse: (src) => {
            return loadhackaTON$Data(src.loadRef().beginParse());
        }
    }
}

 type hackaTON_init_args = {
    $$type: 'hackaTON_init_args';
}

function inithackaTON_init_args(src: hackaTON_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function hackaTON_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECLAEACs4AAQHAAQEFocqlAgEU/wD0pBP0vPLICwMCAWIEHAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRbbPPLggicFGwPwAZIwf+BwIddJwh+VMCDXCx/eIIIQUtTMg7rjAiCCEA4u2pa6jtAw0x8BghAOLtqWuvLggdQB0AHUAdABgQEB1wBVIGwT+EInVTB/bW0QNhA1EDRVYIEBAQjIVXDbPMklEDcBIG6VMFn0WjCUQTP0FeIDpAMEf+AgBhcHANQw0x8BghBS1MyDuvLggdQB0AGBAQHXAFlsEvhCUgITWYEBCwPIVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFADzxbJWMyBAQHPAMkQORIgbpUwWfRZMJRBM/QT4gWkBQZ/BOyCEA+V5Pa6jpcw0x8BghAPleT2uvLggdQB0AH0BFlsEuAgghDFjPZiuo64MNMfAYIQxYz2Yrry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQygbvkrrjAiCCEO8LKq+6CAkLEADmMPhCbYEBAVhwASBulTBZ9FowlEEz9BTi+EIkQxNxVTCBAQEFyFVAUEWBAQHPAMhQA88WyVjMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAgQEBzwDJIxA1ASBulTBZ9FowlEEz9BXiAaRYfwH2ggChhCWBAQEkWfQMb6Ex8vSBIGP4QiaBAQElWfQNb6GSMG3fIG6SMG2ON9CBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEgQEB1wBVQGwVbwXiIG7y0IBvJRAkXwTHBfL0EGheNBA3SHgnCgHi2zw0gQEBWFJOIG6VMFn0WjCUQTP0FOICpCpDFEzMVTCBAQEFyFVAUEWBAQHPAMhQA88WyVjMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAgQEBzwDJQYAgbpUwWfRaMJRBM/QV4hBGVRMlATww0x8BghDKBu+SuvLggYEBAdcAgQEB1wBZbBLbPH8MBPYQaF40EDdIeCfbPDCBcG8sgQEBVhFZ9AxvoTHy9IIAtjEqgQEBVhJZ9AxvoTHy9HAsgQEBVhFZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbvLQgG8oF18HgQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroXwOBWIIpKg0OAEhWE7qSfzPegQEBUwJQM0Ez9HhvpSCWUCPXADBYlmwhbTJtAeIC/CGz8vQsgQEBVhFZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbvLQgG8obHFwgQEBVFIAWfSEb6UgllAj1wAwWJZsIW0ybQHikI4nVhS6kn803gGkgQEBUwMDUERBM/R4b6UgllAj1wAwWJZsIW0ybQHi6FuBIjIDsxPy9IEBASoPAZJUEyISARETASFulVtZ9FowmMgBzwBBM/RC4hBnEFYQRRA0QTAfVWCBAQEIyFVw2zzJEDVBgCBulTBZ9FowlEEz9BXiEEYQNVA0FwO8jp4w0x8BghDvCyqvuvLggYEBAdcAgQEB1wBZbBLbPH/gIIIQRO5uiLrjAoIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcBEWGAPWgXBvJ4EBASRZ9AxvoTHy9BBoXjQQN0h4J9s8ggD0g/hCUoDHBfL0ggC2MSuBAQFWE1n0DG+hMfL0cHBwgQEBVFUAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroW4EQZwKzEvL0cH+BAQFUVQApEhMATlYVupJ/M94BpIEBAVMGA1BEQTP0eG+lIJZQI9cAMFiWbCFtMm0B4gLyWfSEb6UgllAj1wAwWJZsIW0ybQHikI4qVha6lTEzIn8E3gKkgQEBUwYDUFVBM/R4b6UgllAj1wAwWJZsIW0ybQHi6FuBOxtQBPL0lCKkIbmK6IEBATOlbSMQRRA1IW6VW1n0WjCYyAHPAEEz9ELigQEBVBIiARETARQVAHKBAQFTA6RTFlUgQTP0DG+hlAHXADCSW23iIG7y0IBTFBBHWSFulVtZ9FowmMgBzwBBM/RC4gKkQBMBciFulVtZ9FowmMgBzwBBM/RC4lUGD1VggQEBCMhVcNs8yRA1QYAgbpUwWfRaMJRBM/QV4hBGEDVQNBcC9DDTHwGCEETuboi68uCBgQEB1wCBAQHXAFlsEoIAqt8ngQEBJFn0DG+hMfL0ggChhCWBAQEjWfQMb6Ex8vQQaF40EDdIeCfbPDIQZxBWEEUQNBAjTwBVYIEBAQjIVXDbPMkQNUGAIG6VMFn0WjCUQTP0FeIQRhA1UDR/KRcAmFB4gQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBM8WyVADzMhYzxbJAcyBAQHPAAHIgQEBzwAS9AAS9ADJAcwBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MBkByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIGgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACYyPhDAcx/AcoAVWBQZ/QAFIEBAc8AAsj0AIEBAc8AEvQAEoEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzMntVAIBIB0rAgEgHiACTbnm4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zxVBts8bHOCcfALqBShcogQELI1n0Cm+hMfL0gQELKAJZ9AtvoZIwbd8gbpIwbY4w0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAYEBAdcAVSBsE28D4iBu8tCAbyMCASAhIwIRtCDbZ5tnjY4wJyIAAiYCASAkJgIVsiG2zxVBts8bHWAnJQDKggChhCSBAQEjWfQMb6Ex8vSBAQEkAln0DW+hkjBt3yBukjBtjjfQgQEB1wDUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BIEBAdcAVUBsFW8F4iBu8tCAbyUCFbKbts8VQbbPGx4gJykBsu1E0NQB+GPSAAGOPvQEgQEB1wDUAdD0BIEBAdcA9ASBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxEFcQVmwX4DD4KNcLCoMJuvLgids8KAAccFMAbW1t+EIQNhA1QUABaoIAqt8mgQEBI1n0DG+hMfL0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbvLQgG8oKgCSgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdABgQEB1wDUAdCBAQHXAPQE9AQwEDgQNxA2EDUQNAARvhX3aiaGkAAMF1kMBA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    inithackaTON_init_args({ $$type: 'hackaTON_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const hackaTON_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4199: { message: `Team is already approved for the hackathon` },
    8291: { message: `Only team leader can add members` },
    8754: { message: `Team already registered` },
    15131: { message: `Hacker is not registered for the hackathon` },
    18967: { message: `Hacker doesn't exist` },
    22658: { message: `Team already approved` },
    28783: { message: `Hackathon doesnt exist` },
    41348: { message: `Team doesn't exist` },
    43743: { message: `Hackathon doesn't exist` },
    46641: { message: `Team doesn'texist` },
    62595: { message: `Only hackathon creator can use this function` },
}

const hackaTON_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Hacker","header":null,"fields":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"dataHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"devScore","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Hackathon","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"prizePool","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"winningTeamId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"approvedTeams","type":{"kind":"dict","key":"int","value":"int"}},{"name":"pendingRequests","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"Team","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"leader","type":{"kind":"simple","type":"address","optional":false}},{"name":"members","type":{"kind":"dict","key":"int","value":"address"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateHackerParams","header":1389677699,"fields":[{"name":"dataHash","type":{"kind":"simple","type":"string","optional":false}},{"name":"devScore","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateHackathonParams","header":237951638,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"prizePool","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ApproveForHackathonParams","header":4010486447,"fields":[{"name":"hackathonId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"teamId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"JoinHackathonParams","header":3389452178,"fields":[{"name":"hackathonId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"teamId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateTeamParams","header":261481718,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"members","type":{"kind":"dict","key":"int","value":"address"}}]},
    {"name":"AddMemberToTeam","header":3314349666,"fields":[{"name":"teamId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"member","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetWinnerParams","header":1156476552,"fields":[{"name":"hackathonId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"teamId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"hackaTON$Data","header":null,"fields":[{"name":"hackers","type":{"kind":"dict","key":"address","value":"Hacker","valueFormat":"ref"}},{"name":"hackersCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"hackathons","type":{"kind":"dict","key":"int","value":"Hackathon","valueFormat":"ref"}},{"name":"hackathonsCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"teams","type":{"kind":"dict","key":"int","value":"Team","valueFormat":"ref"}},{"name":"currTeamId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"platformOwner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const hackaTON_getters: ABIGetter[] = [
    {"name":"getHacker","arguments":[{"name":"_addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Hacker","optional":false}},
    {"name":"allHackers","arguments":[],"returnType":{"kind":"dict","key":"address","value":"Hacker","valueFormat":"ref"}},
    {"name":"getHackathon","arguments":[{"name":"_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Hackathon","optional":false}},
    {"name":"getTeam","arguments":[{"name":"teamId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Team","optional":false}},
]

export const hackaTON_getterMapping: { [key: string]: string } = {
    'getHacker': 'getGetHacker',
    'allHackers': 'getAllHackers',
    'getHackathon': 'getGetHackathon',
    'getTeam': 'getGetTeam',
    'getHackathonCount': 'getGetHackathonCount',
}

const hackaTON_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateHackerParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateHackathonParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateTeamParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddMemberToTeam"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JoinHackathonParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ApproveForHackathonParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetWinnerParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class hackaTON implements Contract {
    
    static async init() {
        return await hackaTON_init();
    }
    
    static async fromInit() {
        const init = await hackaTON_init();
        const address = contractAddress(0, init);
        return new hackaTON(address, init);
    }
    
    static fromAddress(address: Address) {
        return new hackaTON(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  hackaTON_types,
        getters: hackaTON_getters,
        receivers: hackaTON_receivers,
        errors: hackaTON_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateHackerParams | CreateHackathonParams | CreateTeamParams | AddMemberToTeam | JoinHackathonParams | ApproveForHackathonParams | SetWinnerParams | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateHackerParams') {
            body = beginCell().store(storeCreateHackerParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateHackathonParams') {
            body = beginCell().store(storeCreateHackathonParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateTeamParams') {
            body = beginCell().store(storeCreateTeamParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddMemberToTeam') {
            body = beginCell().store(storeAddMemberToTeam(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinHackathonParams') {
            body = beginCell().store(storeJoinHackathonParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ApproveForHackathonParams') {
            body = beginCell().store(storeApproveForHackathonParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetWinnerParams') {
            body = beginCell().store(storeSetWinnerParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetHacker(provider: ContractProvider, _addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(_addr);
        let source = (await provider.get('getHacker', builder.build())).stack;
        const result = loadGetterTupleHacker(source);
        return result;
    }
    
    async getAllHackers(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allHackers', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserHacker(), source.readCellOpt());
        return result;
    }
    async getGetHackathonCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getHackathonCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetHackathon(provider: ContractProvider, _id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(_id);
        let source = (await provider.get('getHackathon', builder.build())).stack;
        const result = loadGetterTupleHackathon(source);
        return result;
    }
    
    async getGetTeam(provider: ContractProvider, teamId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(teamId);
        let source = (await provider.get('getTeam', builder.build())).stack;
        const result = loadGetterTupleTeam(source);
        return result;
    }
    
}