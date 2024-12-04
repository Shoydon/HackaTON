import { TactCounter } from "@/compileCode/tact_Counter";
import TonConnectSender from "@/hooks/TonConnectSender";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Sender, toNano } from "@ton/core";
import { TonClient } from "@ton/ton";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import React, { useState } from "react";

const CounterFrontEnd = () => {
    const [tonConnector] = useTonConnectUI();
    const [val, setVal] = useState<null | number>(null);
    const [showVal, setShowVal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Get function
    const getData = async () => {
        setLoading(true);
        setShowVal(false);

        let sender: Sender | null = null;
        sender = new TonConnectSender(tonConnector.connector);

        const endpoint = await getHttpEndpoint({
            network: "testnet",
        });

        const client = new TonClient({ endpoint });

        const counterContract = await TactCounter.fromInit(BigInt(1));
        const tactCounter = client.open(counterContract);

        const value = await tactCounter.getCounter();

        setVal(+value.toString());
        setShowVal(true);
        setLoading(false);
    };

    // Update or increment function
    const updateData = async () => {
        setVal(null);
        setShowVal(false);

        let sender: Sender | null = null;
        sender = new TonConnectSender(tonConnector.connector);

        const endpoint = await getHttpEndpoint({
            network: "testnet",
        });

        const client = new TonClient({ endpoint });

        const tactCounter = client.open(await TactCounter.fromInit(BigInt(1)));

        await tactCounter.send(
            sender,
            {
                value: toNano("0.05"),
            },
            {
                $$type: "Add",
                queryId: BigInt(1),
                amount: BigInt(1),
            }
        );
    };

    return (
        <div className="main-wrapper">
            <TonConnectButton />
            <div>
                <h1>Counter FrontEnd</h1>
                <p>
                    This is a simple example of a counter that uses the Ton blockchain
                    with Tact.
                </p>

                <div className="dataWrapper">
                    <div className="buttonWrapper">
                        <div className="getBtn">
                            <button onClick={getData} disabled={loading}>
                                {loading ? "Loading..." : "Get Value"}
                            </button>
                        </div>
                        <div className="incrBtn">
                            <button onClick={updateData}>Send Increment</button>
                        </div>
                    </div>
                    {showVal && <p className="data">The Value of Counter is: {val}</p>}
                </div>
                <p className="note">
                    When making changes on the blockchain, it can take a few seconds to
                    update. After clicking the increment button, if you click the Get
                    Value button immediately, it may display the old data. However, if you
                    wait a few seconds before clicking Get Value, the updated data will
                    appear.
                </p>
            </div>
        </div>
    );
};

export default CounterFrontEnd;
