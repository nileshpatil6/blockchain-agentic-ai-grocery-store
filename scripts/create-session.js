const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("📝 Generating Session Key for AI Commerce...\n");

    // Get the deployment info
    const deployment = JSON.parse(fs.readFileSync("deployment.json", "utf8"));
    const contractAddress = deployment.sessionKeyManager;

    // Get the owner (your account)
    const [owner] = await ethers.getSigners();
    console.log("👤 Owner:", owner.address);

    // Create a new random wallet for session key
    const sessionWallet = ethers.Wallet.createRandom();
    console.log("🔑 Session Key Address:", sessionWallet.address);
    console.log("🔐 Session Key Private Key:", sessionWallet.privateKey);

    // Connect to contract
    const SessionKeyManager = await ethers.getContractFactory("SessionKeyManager");
    const contract = SessionKeyManager.attach(contractAddress);

    // Session parameters
    const spendingLimit = ethers.parseEther("0.1"); // 0.1 ETH budget
    const duration = 7 * 24 * 60 * 60; // 7 days

    console.log("\n⚙️ Creating session key with:");
    console.log("  - Spending Limit:", ethers.formatEther(spendingLimit), "ETH");
    console.log("  - Duration:", duration / (24 * 60 * 60), "days");

    // Create session key
    const tx = await contract.createSessionKey(
        sessionWallet.address,
        spendingLimit,
        duration
    );

    console.log("\n⏳ Transaction submitted:", tx.hash);
    await tx.wait();
    console.log("✅ Session key created successfully!");

    // Save session info
    const sessionInfo = {
        contractAddress: contractAddress,
        sessionKeyAddress: sessionWallet.address,
        sessionKeyPrivateKey: sessionWallet.privateKey,
        ownerAddress: owner.address,
        spendingLimit: ethers.formatEther(spendingLimit) + " ETH",
        createdAt: new Date().toISOString(),
        network: "sepolia"
    };

    fs.writeFileSync("session-key.json", JSON.stringify(sessionInfo, null, 2));
    console.log("\n💾 Session info saved to session-key.json");

    console.log("\n🎯 Use these values in the AI Commerce platform:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Contract Address:", contractAddress);
    console.log("Session Key Private Key:", sessionWallet.privateKey);
    console.log("Gemini API Key:", process.env.GEMINI_API_KEY);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
