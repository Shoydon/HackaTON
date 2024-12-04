import Card from '@/components/ui/card'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/tars-background'
import React from 'react'

const HackathonsPage = () => {
    const hackathons = [
        {
            name: "Web3 AI & Blockchain Convergence",
            description: "Create innovative AI agents powered by blockchain technology",
            prizePool: "$5,000"
        },
        {
            name: "Decentralized Finance Revolution",
            description: "Build next-generation DeFi solutions and smart contract protocols",
            prizePool: "$10,000"
        },
        {
            name: "NFT Innovation Challenge on TON",
            description: "Develop groundbreaking NFT applications and use cases",
            prizePool: "$7,500"
        },
        {
            name: "Layer 2 Scaling Hackathon",
            description: "Design scalable solutions for blockchain network performance",
            prizePool: "$8,000"
        },
        {
            name: "Crypto Gaming Ecosystem",
            description: "Create play-to-earn games with blockchain integration",
            prizePool: "$6,000"
        },
        {
            name: "Decentralized Identity Hack",
            description: "Build privacy-preserving identity solutions on blockchain",
            prizePool: "$5,500"
        },
        {
            name: "Smart Contract Security Challenge",
            description: "Develop robust security mechanisms for blockchain applications",
            prizePool: "$9,000"
        },
        {
            name: "Web3 Social Media Innovation",
            description: "Reimagine social platforms with decentralized principles",
            prizePool: "$6,500"
        },
        {
            name: "Blockchain Sustainability Hack",
            description: "Create eco-friendly blockchain solutions and green crypto innovations",
            prizePool: "$7,000"
        },
        {
            name: "Cross-Chain Interoperability",
            description: "Build bridges between different blockchain networks",
            prizePool: "$8,500"
        },
        {
            name: "Decentralized Cloud Computing",
            description: "Develop distributed computing platforms on blockchain",
            prizePool: "$7,250"
        },
        {
            name: "Web3 IoT Integration Hack",
            description: "Connect Internet of Things with blockchain and smart contracts",
            prizePool: "$6,750"
        }
    ];

    return (
        <div className="min-h-[100vh] bg-neutral-900 flex flex-col relative w-full">
            <h2 className="relative mt-16 flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-full mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>The Open HackaTONs</span>
            </h2>
            <ShootingStars />
            <StarsBackground />
            <div className='grid grid-cols-1 items-stretch md:grid-cols-3 max-w-6xl mx-auto mt-12 gap-4'>
                {hackathons.map((hackathon, index) => (
                    <Card
                        key={index}
                        name={hackathon.name}
                        description={hackathon.description}
                        prizePool={hackathon.prizePool}
                    />
                ))}
            </div>
        </div>
    )
}

export default HackathonsPage