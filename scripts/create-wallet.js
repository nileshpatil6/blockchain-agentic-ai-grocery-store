const hre = require("hardhat");

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🔑 GENERATING NEW TEST WALLET FOR SEPOLIA");
  console.log("=".repeat(70) + "\n");

  // Generate new random wallet
  const wallet = hre.ethers.Wallet.createRandom();

  console.log("✅ New Wallet Generated!\n");
  console.log("📋 WALLET DETAILS:");
  console.log("─".repeat(70));
  console.log(`Address:     ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  console.log("─".repeat(70));

  console.log("\n📝 ADD TO YOUR .env FILE:");
  console.log("─".repeat(70));
  console.log(`PRIVATE_KEY=${wallet.privateKey}`);
  console.log("─".repeat(70));

  console.log("\n💰 GET FREE SEPOLIA ETH:");
  console.log("─".repeat(70));
  console.log("Use this address at faucets:");
  console.log(`\n${wallet.address}\n`);
  console.log("Faucets that work:");
  console.log("1. PoW Faucet (no requirements):");
  console.log("   https://sepolia-faucet.pk910.de/");
  console.log("\n2. Twitter Faucet:");
  console.log("   https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia");
  console.log("\n3. If you have Twitter/GitHub:");
  console.log("   https://sepoliafaucet.com/");
  console.log("─".repeat(70));

  console.log("\n⚠️  IMPORTANT:");
  console.log("• This is a TEST wallet - only use for Sepolia testnet");
  console.log("• NEVER send real money to this address");
  console.log("• Save the private key securely");
  console.log("• Get at least 0.05 SepoliaETH before deploying");
  console.log("\n" + "=".repeat(70) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
