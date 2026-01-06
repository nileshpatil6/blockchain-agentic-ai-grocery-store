const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🔍 VERIFYING DEPLOYMENT ON SEPOLIA");
  console.log("=".repeat(70) + "\n");

  // Check if deployment.json exists
  if (!fs.existsSync('deployment.json')) {
    console.error("❌ deployment.json not found!");
    console.log("Run: npx hardhat run scripts/deploy.js --network sepolia");
    process.exit(1);
  }

  const deployment = JSON.parse(fs.readFileSync('deployment.json', 'utf8'));
  const network = await hre.ethers.provider.getNetwork();

  console.log("📡 Network Information:");
  console.log(`   Chain ID: ${network.chainId}`);
  console.log(`   Network: ${network.name}`);
  
  if (network.chainId !== 11155111n) {
    console.warn("\n⚠️  WARNING: Not on Sepolia testnet!");
    console.log("   Current chain ID:", network.chainId);
    console.log("   Sepolia chain ID: 11155111");
  } else {
    console.log("   ✅ Confirmed: Sepolia testnet\n");
  }

  // Get signer
  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);

  console.log("👛 Deployer Account:");
  console.log(`   Address: ${deployer.address}`);
  console.log(`   Balance: ${hre.ethers.formatEther(balance)} ETH`);
  console.log(`   Etherscan: https://sepolia.etherscan.io/address/${deployer.address}\n`);

  // Verify SessionKeyManager
  console.log("📋 Deployed Contracts:");
  console.log("\n1️⃣  SessionKeyManager:");
  console.log(`   Address: ${deployment.sessionKeyManager}`);
  console.log(`   Etherscan: https://sepolia.etherscan.io/address/${deployment.sessionKeyManager}`);

  const contractJson = JSON.parse(
    fs.readFileSync('artifacts/contracts/SessionKeyManager.sol/SessionKeyManager.json', 'utf8')
  );
  
  const sessionKeyManager = new hre.ethers.Contract(
    deployment.sessionKeyManager,
    contractJson.abi,
    deployer
  );

  try {
    const owner = await sessionKeyManager.owner();
    console.log(`   Owner: ${owner}`);
    console.log(`   ✅ Contract is accessible`);
  } catch (error) {
    console.log(`   ❌ Error accessing contract: ${error.message}`);
  }

  // Verify Merchants
  console.log("\n2️⃣  Merchant Contracts:");
  
  const merchants = [
    { name: "AWS", address: deployment.merchants.aws },
    { name: "Travel", address: deployment.merchants.travel },
    { name: "SaaS", address: deployment.merchants.saas }
  ];

  for (const merchant of merchants) {
    console.log(`\n   ${merchant.name} Merchant:`);
    console.log(`   Address: ${merchant.address}`);
    console.log(`   Etherscan: https://sepolia.etherscan.io/address/${merchant.address}`);
    
    try {
      const isVerified = await sessionKeyManager.verifiedMerchants(merchant.address);
      console.log(`   Verified: ${isVerified ? "✅ Yes" : "❌ No"}`);
    } catch (error) {
      console.log(`   ❌ Error checking verification`);
    }
  }

  // Get recent transactions
  console.log("\n" + "=".repeat(70));
  console.log("📜 RECENT TRANSACTIONS");
  console.log("=".repeat(70));

  try {
    const currentBlock = await hre.ethers.provider.getBlockNumber();
    console.log(`\nCurrent Block: ${currentBlock}`);
    console.log(`\n🔗 View all transactions:`);
    console.log(`https://sepolia.etherscan.io/address/${deployer.address}#transactions\n`);
  } catch (error) {
    console.log("Could not fetch transaction history");
  }

  // Instructions
  console.log("=".repeat(70));
  console.log("✅ NEXT STEPS");
  console.log("=".repeat(70));
  console.log("\n1. Create a session key and test AI agent:");
  console.log("   npx hardhat run scripts/ai-agent-demo.js --network sepolia\n");
  console.log("2. Share your contract addresses with others:\n");
  console.log("   SessionKeyManager:");
  console.log(`   https://sepolia.etherscan.io/address/${deployment.sessionKeyManager}\n`);
  console.log("3. Check your wallet transactions:");
  console.log(`   https://sepolia.etherscan.io/address/${deployer.address}\n`);
  console.log("=".repeat(70) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
