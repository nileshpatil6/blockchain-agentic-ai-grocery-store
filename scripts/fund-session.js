const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const session = JSON.parse(fs.readFileSync("session-key.json", "utf8"));
    const [owner] = await ethers.getSigners();
    
    console.log("💰 Funding Session Wallet...");
    console.log("From:", owner.address);
    console.log("To:", session.sessionKeyAddress);
    
    const amount = ethers.parseEther("0.02"); // 0.02 ETH for transactions
    
    const tx = await owner.sendTransaction({
        to: session.sessionKeyAddress,
        value: amount
    });
    
    console.log("⏳ Transaction:", tx.hash);
    await tx.wait();
    console.log("✅ Funded session wallet with 0.02 ETH");
    
    const balance = await ethers.provider.getBalance(session.sessionKeyAddress);
    console.log("📊 Session wallet balance:", ethers.formatEther(balance), "ETH");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
