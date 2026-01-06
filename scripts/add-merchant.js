const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const deployment = JSON.parse(fs.readFileSync("deployment.json", "utf8"));
    const [owner] = await ethers.getSigners();
    
    console.log("🏪 Adding merchant to verified list...");
    
    const SessionKeyManager = await ethers.getContractFactory("SessionKeyManager");
    const contract = SessionKeyManager.attach(deployment.sessionKeyManager);
    
    // User's second wallet as merchant
    const merchantAddress = "0x78b72bEfed4df85FcEf93FcEDF90e867E04C963A";
    
    console.log("Merchant:", merchantAddress);
    
    const tx = await contract.verifyMerchant(merchantAddress);
    console.log("⏳ Transaction:", tx.hash);
    await tx.wait();
    
    console.log("✅ Merchant verified successfully!");
    
    // Verify
    const isVerified = await contract.verifiedMerchants(merchantAddress);
    console.log("📊 Verification status:", isVerified);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
