# Quick Start Guide - 5 Minutes to Working Demo

## Fastest Path to Success 🚀

### Step 1: Install (1 min)
```bash
cd "c:\Users\Nilesh\Downloads\IIT_Kharagpur (3)\block"
npm install
```

### Step 2: Test It Works (1 min)
```bash
npx hardhat test
```
You should see all tests passing ✅

### Step 3: Start Blockchain (30 sec)
```bash
npx hardhat node
```
**Leave this running!** Open a new terminal for next steps.

### Step 4: Deploy (30 sec)
```bash
npx hardhat run scripts/deploy.js --network localhost
```
This creates your contracts and merchants.

### Step 5: See the Magic! (2 min)
```bash
npx hardhat run scripts/demo.js --network localhost
```

You'll see:
```
🤖 Simulating AI Agent Purchases...

🛒 AI Purchasing: AWS EC2 - 0.01 ETH
   ✅ Success!

🛒 AI Purchasing: Flight Booking - 0.015 ETH
   ✅ Success!

🛒 AI Purchasing: SaaS Sub - 0.005 ETH
   ✅ Success!

📊 Final Budget:
Total Spent: 0.03 ETH
Remaining: 0.07 ETH
```

## That's It! 🎉

Your AI agent just made 3 autonomous purchases without any human approval!

## What Just Happened?

1. **Session Key Created**: AI got permission to spend 0.1 ETH
2. **Spending Limit Enforced**: Can't exceed budget
3. **Merchant Verified**: Only approved vendors
4. **Autonomous Execution**: No human in the loop
5. **Budget Tracking**: Real-time monitoring

## Want More?

### Web Interface
Open `demo.html` in your browser and connect MetaMask to `localhost:8545`

### Python AI Agent
```bash
pip install web3 eth-account
python agent/ai_agent.py
```

## Troubleshooting

**"Cannot find module"**: Run `npm install`  
**"Invalid nonce"**: Restart `npx hardhat node`  
**"Network error"**: Make sure hardhat node is running

## What to Show?

1. Run the demo.js script
2. Show the autonomous purchases
3. Explain the spending limit protection
4. Show test results proving security

**Total time: 5 minutes from zero to working demo!** ⚡
