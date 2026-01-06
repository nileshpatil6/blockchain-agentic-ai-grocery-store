const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying Agentic Commerce Protocol...\n");

  const SessionKeyManager = await hre.ethers.getContractFactory("SessionKeyManager");
  const sessionKeyManager = await SessionKeyManager.deploy();
  await sessionKeyManager.waitForDeployment();
  
  const sessionKeyAddress = await sessionKeyManager.getAddress();
  console.log("SessionKeyManager deployed to:", sessionKeyAddress);

  const MockMerchant = await hre.ethers.getContractFactory("MockMerchant");
  
  const awsMerchant = await MockMerchant.deploy("AWS Cloud Services");
  await awsMerchant.waitForDeployment();
  const awsAddress = await awsMerchant.getAddress();
  console.log("AWS Merchant deployed to:", awsAddress);
  
  const travelMerchant = await MockMerchant.deploy("Travel Booking Service");
  await travelMerchant.waitForDeployment();
  const travelAddress = await travelMerchant.getAddress();
  console.log("Travel Merchant deployed to:", travelAddress);
  
  const saasMerchant = await MockMerchant.deploy("SaaS Subscription");
  await saasMerchant.waitForDeployment();
  const saasAddress = await saasMerchant.getAddress();
  console.log("SaaS Merchant deployed to:", saasAddress);

  console.log("\nVerifying merchants...");
  await sessionKeyManager.verifyMerchant(awsAddress);
  await sessionKeyManager.verifyMerchant(travelAddress);
  await sessionKeyManager.verifyMerchant(saasAddress);
  console.log("All merchants verified!");

  const deploymentData = {
    sessionKeyManager: sessionKeyAddress,
    merchants: {
      aws: awsAddress,
      travel: travelAddress,
      saas: saasAddress
    }
  };

  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(deploymentData, null, 2)
  );
  console.log("\nDeployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
