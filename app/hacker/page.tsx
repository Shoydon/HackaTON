"use client"
import React, { useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { Sender, toNano, Address } from "@ton/core";
import TonConnectSender from "@/hooks/TonConnectSender";
import { hackaTON } from "@/compileCode/hackaton";

const HackaTONFrontend = () => {
    const [tonConnector] = useTonConnectUI();
    const [loading, setLoading] = useState<boolean>(false);
    const [hacker, setHacker] = useState<{
        address: string | null;
        dataHash: string;
        devScore: number;
    }>({
        address: null,
        dataHash: "",
        devScore: 0
    });
    
    const [allHackers, setAllHackers] = useState<{
        address: string | null;
        dataHash: string;
        devScore: number;
    }[]>([]);
    // const [hackerId, setHackerId] = useState<Number>(0);

    // Create User (Hacker) Function  
    const createHacker = async () => {
        setLoading(true);
        try {
            // Validate inputs
            if (!hacker.dataHash || hacker.devScore < 0) {
                alert("Please provide valid dataHash and devScore");
                setLoading(false);
                return;
            }

            // Get sender and client
            let sender: Sender | null = null;
            sender = new TonConnectSender(tonConnector.connector);

            const endpoint = await getHttpEndpoint({
                network: "testnet"
            });
            const client = new TonClient({ endpoint });

            // Open the contract
            const contract = await hackaTON.fromInit();
            const hackaTONContract = client.open(contract);

            // Send create hacker transaction
            await hackaTONContract.send(
                sender,
                {
                    value: toNano("0.1") // Sufficient gas for contract operation
                },
                {
                    $$type: "CreateHackerParams",
                    dataHash: hacker.dataHash,
                    devScore: BigInt(hacker.devScore)
                }
            );

            alert("Hacker created successfully!");
        } catch (error) {
            console.error("Error creating hacker:", error);
            alert("Failed to create hacker");
        } finally {
            setLoading(false);
        }
    };

    // Get Hacker Function
    const getHacker = async () => {
        setLoading(true);
        try {
            // Ensure wallet is connected
            const wallet = tonConnector.connector.wallet;
            if (!wallet) {
                alert("Please connect your wallet first");
                setLoading(false);
                return;
            }

            const endpoint = await getHttpEndpoint({
                network: "testnet"
            });
            const client = new TonClient({ endpoint });

            // Open the contract
            const contract = await hackaTON.fromInit();
            const hackaTONContract = client.open(contract);

            // Get hacker details
            const hackerAddress = Address.parse(wallet.account.address);
            const hackerDetails = await hackaTONContract.getGetHacker(hackerAddress);
            console.log(hackerDetails);
            

            // Update state with fetched hacker details
            setHacker({
                address: hackerDetails.addr.toString(),
                dataHash: hackerDetails.dataHash,
                devScore: Number(hackerDetails.devScore)
            });

            alert("Hacker details retrieved successfully!");
            console.log({
                address: hackerDetails.addr.toString(),
                dataHash: hackerDetails.dataHash,
                devScore: Number(hackerDetails.devScore)
            });
            
        } catch (error) {
            console.error("Error getting hacker:", error);
            alert("Failed to retrieve hacker details");
        } finally {
            setLoading(false);
        }
    };

    // Get all Hackers
    const getAllHackers = async () => {
        setLoading(true);
        try {
            const wallet = tonConnector.connector.wallet;
            if (!wallet) {
                alert("Please connect your wallet first");
                setLoading(false);
                return;
            }

            const endpoint = await getHttpEndpoint({
                network: "testnet"
            });
            const client = new TonClient({ endpoint });

            // Open the contract
            const contract = await hackaTON.fromInit();
            const hackaTONContract = client.open(contract);

            const hackers = await hackaTONContract.getAllHackers();
            
            const hackersArray = (Object.values(hackers))[2];
            // console.log(hackersArray);
            const destructuredHackers = [] as { address: string | null; dataHash: string; devScore: number }[]; 

            hackersArray.forEach((value, key) => {
                // Extract key and value
                const hackerAddress = value.addr ? value.addr.toString() : null; // Convert Address to string if needed
                const dataHash = value.dataHash;
                const devScore = Number(value.devScore); // Convert BigInt to number (if needed)
            
                // Push the destructured data into the array
                destructuredHackers.push({
                    address: hackerAddress,
                    dataHash,
                    devScore
                });
            });
            setAllHackers(destructuredHackers);
            console.log(destructuredHackers);
            
        } catch (error) {
            console.error("Error getting all hackers:", error);
            alert("Failed to retrieve all hackers details");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="main-wrapper">
            <div className="mt-40">
                <div className="hacker-creation-form mb-40" >
                    <h2>Create Hacker Profile</h2>
                    <input
                        type="text"
                        placeholder="Data Hash"
                        value={hacker.dataHash}
                        onChange={(e) => setHacker(prev => ({
                            ...prev,
                            dataHash: e.target.value
                        }))}
                    />
                    <input
                        type="number"
                        placeholder="Dev Score"
                        value={hacker.devScore}
                        onChange={(e) => setHacker(prev => ({
                            ...prev,
                            devScore: parseInt(e.target.value) || 0
                        }))}
                    />
                    <button
                        onClick={createHacker}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Hacker"}
                    </button>
                </div>

                <div className="hacker-retrieval">
                    <h2>Get All Hacker</h2>
                    <button
                        onClick={getAllHackers}
                        disabled={loading}
                    >
                        {loading ? "Retrieving..." : "Get All Hackers"}
                    </button>

                    {/* {hacker.address && (
                        <div className="hacker-details">
                            <p>Address: {hacker.address}</p>
                            <p>Data Hash: {hacker.dataHash}</p>
                            <p>Dev Score: {hacker.devScore}</p>
                        </div>
                    )} */}
                </div>
                <div className="hacker-retrieval">
                    <h2>Get Hacker Details</h2>
                    {/* <input
                        type="number"
                        placeholder="Hacker Id"
                        value={hackerId.toString()}
                        onChange={(e) => setHackerId(parseInt(e.target.value))}
                    /> */}
                    <button
                        onClick={getHacker}
                        disabled={loading}
                    >
                        {loading ? "Retrieving..." : "Get My Hacker Details"}
                    </button>

                    {hacker.address && (
                        <div className="hacker-details">
                            <p>Address: {hacker.address}</p>
                            <p>Data Hash: {hacker.dataHash}</p>
                            <p>Dev Score: {hacker.devScore}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HackaTONFrontend;