const hre = require("hardhat");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const fs = require('fs');
  const deployment = JSON.parse(fs.readFileSync('deployment.json', 'utf8'));
  const contractJson = JSON.parse(
    fs.readFileSync('artifacts/contracts/SessionKeyManager.sol/SessionKeyManager.json', 'utf8')
  );

  const [owner] = await hre.ethers.getSigners();
  const sessionKeyManager = new hre.ethers.Contract(
    deployment.sessionKeyManager,
    contractJson.abi,
    owner
  );

  const sessionWallet = hre.ethers.Wallet.createRandom().connect(hre.ethers.provider);
  console.log("\n🔑 Generated Session Key:");
  console.log("Address:", sessionWallet.address);
  console.log("Private Key:", sessionWallet.privateKey);

  // Fund the session wallet
  console.log("\n💸 Funding session wallet...");
  const fundTx = await owner.sendTransaction({
    to: sessionWallet.address,
    value: hre.ethers.parseEther("1.0")
  });
  await fundTx.wait();
  console.log("✅ Session wallet funded with 1.0 ETH!");

  console.log("\n💰 Creating session with 0.1 ETH spending limit...");
  const tx = await sessionKeyManager.createSessionKey(
    sessionWallet.address,
    hre.ethers.parseEther("0.1"),
    86400 // 24 hours
  );
  await tx.wait();
  console.log("✅ Session created!");

  const details = await sessionKeyManager.getSessionKeyDetails(
    owner.address,
    sessionWallet.address
  );
  
  console.log("\n📊 Session Details:");
  console.log("Spending Limit:", hre.ethers.formatEther(details[0]), "ETH");
  console.log("Spent:", hre.ethers.formatEther(details[1]), "ETH");
  console.log("Expiry:", new Date(Number(details[2]) * 1000).toLocaleString());
  console.log("Active:", details[3]);

  console.log("\n🤖 Simulating AI Agent Purchases...\n");

  const purchases = [
    { name: "AWS EC2", merchant: deployment.merchants.aws, amount: "0.01" },
    { name: "Flight Booking", merchant: deployment.merchants.travel, amount: "0.015" },
    { name: "SaaS Sub", merchant: deployment.merchants.saas, amount: "0.005" }
  ];

  const sessionContract = sessionKeyManager.connect(sessionWallet);

  for (const purchase of purchases) {
    console.log(`🛒 AI Purchasing: ${purchase.name} - ${purchase.amount} ETH`);
    
    try {
      const amount = hre.ethers.parseEther(purchase.amount);
      const tx = await sessionContract.executePayment(
        owner.address,
        purchase.merchant,
        amount,
        { value: amount }
      );
      await tx.wait();
      console.log(`   ✅ Success! TX: ${tx.hash}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const finalDetails = await sessionKeyManager.getSessionKeyDetails(
    owner.address,
    sessionWallet.address
  );
  
  console.log("📊 Final Budget:");
  console.log("Total Spent:", hre.ethers.formatEther(finalDetails[1]), "ETH");
  console.log("Remaining:", hre.ethers.formatEther(finalDetails[0] - finalDetails[1]), "ETH");

  rl.close();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
