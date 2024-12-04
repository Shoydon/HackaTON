"use client"
import React, { useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { Sender, toNano, Address } from "@ton/core";
import TonConnectSender from "@/hooks/TonConnectSender";
import { hackaTON } from "@/compileCode/hackaTON";

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

            // Update state with fetched hacker details
            setHacker({
                address: wallet.account.address,
                dataHash: hackerDetails.dataHash,
                devScore: Number(hackerDetails.devScore)
            });

            alert("Hacker details retrieved successfully!");
        } catch (error) {
            console.error("Error getting hacker:", error);
            alert("Failed to retrieve hacker details");
        } finally {
            setLoading(false);
        }
    };

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
                    <h2>Get Hacker Details</h2>
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