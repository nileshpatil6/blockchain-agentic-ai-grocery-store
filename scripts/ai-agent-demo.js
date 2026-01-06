const hre = require("hardhat");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

class IntelligentPaymentAgent {
  constructor(geminiApiKey) {
    this.ai = new GoogleGenAI({ apiKey: geminiApiKey });
  }

  async analyzeAndDecide(service, price, budget, merchant) {
    const prompt = `You are an AI financial advisor for an autonomous payment agent managing blockchain transactions.

CONTEXT:
- Service: ${service.name}
- Category: ${service.category}
- Price: ${price} ETH
- Current Budget Remaining: ${budget.remaining} ETH
- Total Budget: ${budget.total} ETH
- Merchant: ${merchant}
- Current Services Purchased: ${JSON.stringify(budget.purchased)}

TASK:
Analyze whether this purchase is:
1. Within budget constraints
2. Necessary for business operations
3. Good value for money
4. Priority level (critical/important/optional)

Respond in JSON format:
{
  "decision": "approve" or "reject",
  "reasoning": "brief explanation",
  "priority": "critical/important/optional",
  "confidence": 0-100
}`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        decision: "approve",
        reasoning: "Default approval due to parsing error",
        priority: "optional",
        confidence: 50
      };
    } catch (error) {
      console.error("AI decision error:", error.message);
      return {
        decision: "approve",
        reasoning: "Fallback to rule-based: within budget",
        priority: "optional",
        confidence: 40
      };
    }
  }

  async generatePurchasePlan(services, totalBudget) {
    const prompt = `You are an AI procurement agent managing cloud infrastructure spending.

AVAILABLE SERVICES:
${services.map((s, i) => `${i + 1}. ${s.name} (${s.category}) - ${s.price} ETH`).join('\n')}

TOTAL BUDGET: ${totalBudget} ETH

TASK:
Create an optimal purchase plan that:
1. Maximizes value within budget
2. Prioritizes critical infrastructure (AWS/compute)
3. Balances different service categories
4. Leaves some budget buffer (10-20%)

Respond in JSON format:
{
  "purchaseOrder": [indices of services to purchase in priority order],
  "reasoning": "why this order",
  "estimatedSpend": total,
  "bufferPercentage": percentage
}`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("AI planning error:", error.message);
    }

    // Fallback to default order
    return {
      purchaseOrder: services.map((_, i) => i),
      reasoning: "Default order: all services sequentially",
      estimatedSpend: services.reduce((sum, s) => sum + parseFloat(s.price), 0),
      bufferPercentage: 0
    };
  }
}

async function main() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    console.error("\n❌ ERROR: GEMINI_API_KEY not found in environment variables");
    console.log("📝 Please create a .env file with your Gemini API key:");
    console.log("   GEMINI_API_KEY=your_key_here");
    console.log("\n🔑 Get your API key from: https://aistudio.google.com/apikey\n");
    process.exit(1);
  }

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
  
  console.log("\n" + "=".repeat(70));
  console.log("🤖 AI-POWERED AUTONOMOUS PAYMENT AGENT");
  console.log("=".repeat(70));
  
  console.log("\n🔑 Session Key Generated:");
  console.log("   Address:", sessionWallet.address);

  // Fund session wallet
  const fundTx = await owner.sendTransaction({
    to: sessionWallet.address,
    value: hre.ethers.parseEther("0.05")
  });
  await fundTx.wait();
  console.log("   ✅ Funded with 0.05 ETH");

  // Create session key
  const budgetLimit = "0.1";
  const tx = await sessionKeyManager.createSessionKey(
    sessionWallet.address,
    hre.ethers.parseEther(budgetLimit),
    86400
  );
  await tx.wait();
  console.log(`   ✅ Session created with ${budgetLimit} ETH limit`);

  // Initialize AI agent
  console.log("\n🧠 Initializing Gemini AI Agent...");
  const agent = new IntelligentPaymentAgent(GEMINI_API_KEY);
  console.log("   ✅ AI agent ready");

  // Available services
  const services = [
    { 
      name: "AWS EC2 Instance", 
      category: "Cloud Compute", 
      price: "0.01",
      merchant: deployment.merchants.aws 
    },
    { 
      name: "Premium Travel Booking", 
      category: "Business Travel", 
      price: "0.025",
      merchant: deployment.merchants.travel 
    },
    { 
      name: "SaaS Team License", 
      category: "Software Subscription", 
      price: "0.015",
      merchant: deployment.merchants.saas 
    },
    { 
      name: "AWS S3 Storage", 
      category: "Cloud Storage", 
      price: "0.005",
      merchant: deployment.merchants.aws 
    },
    { 
      name: "Budget Travel Option", 
      category: "Business Travel", 
      price: "0.012",
      merchant: deployment.merchants.travel 
    }
  ];

  // AI generates purchase plan
  console.log("\n📊 AI Analyzing Services and Creating Purchase Plan...");
  const plan = await agent.generatePurchasePlan(services, parseFloat(budgetLimit));
  console.log("\n💡 AI Purchase Plan:");
  console.log(`   Strategy: ${plan.reasoning}`);
  console.log(`   Estimated Spend: ${plan.estimatedSpend.toFixed(4)} ETH`);
  console.log(`   Buffer: ${plan.bufferPercentage}%`);

  const budget = {
    total: parseFloat(budgetLimit),
    remaining: parseFloat(budgetLimit),
    purchased: []
  };

  const sessionContract = sessionKeyManager.connect(sessionWallet);

  console.log("\n" + "=".repeat(70));
  console.log("🛒 AI-DRIVEN AUTONOMOUS PURCHASING");
  console.log("=".repeat(70));

  // Execute purchases based on AI plan
  for (const index of plan.purchaseOrder) {
    const service = services[index];
    const price = parseFloat(service.price);

    console.log(`\n📦 Service ${plan.purchaseOrder.indexOf(index) + 1}/${plan.purchaseOrder.length}: ${service.name}`);
    console.log(`   Category: ${service.category}`);
    console.log(`   Price: ${service.price} ETH`);
    console.log(`   Budget Remaining: ${budget.remaining.toFixed(4)} ETH`);

    // AI makes decision
    console.log("\n   🧠 AI Analyzing...");
    const decision = await agent.analyzeAndDecide(service, service.price, budget, service.merchant);
    
    console.log(`   Decision: ${decision.decision.toUpperCase()}`);
    console.log(`   Reasoning: ${decision.reasoning}`);
    console.log(`   Priority: ${decision.priority}`);
    console.log(`   Confidence: ${decision.confidence}%`);

    if (decision.decision === "approve" && price <= budget.remaining) {
      try {
        const amount = hre.ethers.parseEther(service.price);
        const tx = await sessionContract.executePayment(
          owner.address,
          service.merchant,
          amount,
          { value: amount }
        );
        
        console.log(`\n   ⏳ Transaction submitted: ${tx.hash}`);
        await tx.wait();
        console.log(`   ✅ PAYMENT SUCCESSFUL!`);

        budget.remaining -= price;
        budget.purchased.push(service.name);
        
      } catch (error) {
        console.log(`   ❌ Payment failed: ${error.message}`);
      }
    } else {
      console.log(`   ⏭️  SKIPPED (${decision.decision === "reject" ? "AI rejected" : "insufficient budget"})`);
    }

    await new Promise(r => setTimeout(r, 1500));
  }

  // Final report
  const finalDetails = await sessionKeyManager.getSessionKeyDetails(
    owner.address,
    sessionWallet.address
  );
  
  console.log("\n" + "=".repeat(70));
  console.log("📊 FINAL REPORT");
  console.log("=".repeat(70));
  console.log(`Total Budget: ${budgetLimit} ETH`);
  console.log(`Amount Spent: ${hre.ethers.formatEther(finalDetails[1])} ETH`);
  console.log(`Remaining: ${hre.ethers.formatEther(finalDetails[0] - finalDetails[1])} ETH`);
  console.log(`Services Purchased: ${budget.purchased.length}`);
  console.log("\nPurchased Services:");
  budget.purchased.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  console.log("=".repeat(70) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
