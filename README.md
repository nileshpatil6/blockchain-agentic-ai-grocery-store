# 🤖 Agentic Commerce Protocol

**The Payment Protocol for the AI Economy**

A blockchain-based restricted-permission payment system that enables AI agents to make autonomous transactions within pre-defined constraints without human intervention.

## 🎯 Problem Statement

AI Agents need to handle tasks like travel booking, cloud resource management, and procurement autonomously. However:
- ❌ You cannot give an AI agent your private key
- ❌ You cannot approve every small transaction manually
- ✅ **Solution**: Restricted session keys with spending limits and merchant verification

## 🚀 Key Features

- **Session Keys**: Temporary payment permissions with expiry times
- **Spending Limits**: AI agents can only spend up to a predefined budget
- **Merchant Verification**: Payments only to whitelisted/verified merchants
- **Autonomous Operation**: No human intervention needed for approved transactions
- **Revocable Permissions**: Owners can revoke session keys anytime

## 📊 Market Research: First-Movers for AI Payments

### 1. **Cloud Services (AWS/GCP/Azure)** - HIGHEST PRIORITY
- **Market Size**: $500B+ cloud computing market
- **Use Case**: AI agents auto-scaling resources, purchasing compute credits
- **Pain Point**: Manual approval bottlenecks for DevOps automation
- **Opportunity**: Pay-per-use model perfect for micropayments

### 2. **SaaS Subscriptions**
- **Market Size**: $200B+ SaaS market
- **Use Case**: AI agents managing software licenses, API credits
- **Pain Point**: Manual subscription management across tools
- **Opportunity**: Dynamic scaling of seats/features based on usage

### 3. **Travel & Booking Services**
- **Market Size**: $800B+ travel industry
- **Use Case**: AI travel assistants booking flights, hotels autonomously
- **Pain Point**: Price volatility requires quick decisions
- **Opportunity**: AI can optimize timing and pricing automatically

### 4. **API Marketplaces**
- **Market Size**: $3B+ API economy
- **Use Case**: AI agents purchasing API credits (Gemini AI, data APIs)
- **Pain Point**: Rate limiting and quota management
- **Opportunity**: On-demand access without pre-commitment

## 🤖 AI Integration (Gemini-Powered)

This project uses **Google Gemini AI** for intelligent autonomous decision-making:

### AI Capabilities:
1. **Smart Purchase Analysis**: AI evaluates each transaction for necessity, value, and priority
2. **Budget Optimization**: AI creates optimal purchase plans to maximize value
3. **Risk Assessment**: AI assigns confidence scores to each decision
4. **Dynamic Prioritization**: AI categorizes services (critical/important/optional)

### How AI Makes Decisions:
```javascript
// AI analyzes: service type, price, budget, merchant, past purchases
// Returns: approve/reject, reasoning, priority, confidence score
const decision = await ai.analyzeAndDecide(service, price, budget, merchant);
```

### AI Models Used:
- **Gemini 2.5 Flash**: Fast, intelligent decision-making for real-time purchases

## 🏗️ Architecture

```
┌─────────────────┐
│   Human Owner   │
└────────┬────────┘
         │ Creates Session Key
         │ (Sets limit: 0.1 ETH, Duration: 24h)
         ▼
┌─────────────────────────┐
│ SessionKeyManager       │
│ Smart Contract          │
│ ┌─────────────────────┐ │
│ │ Session Key Data    │ │
│ │ - Spending Limit    │ │
│ │ - Spent Amount      │ │
│ │ - Expiry Time       │ │
│ │ - Merchant Whitelist│ │
│ └─────────────────────┘ │
└───────────┬─────────────┘
            │
            │ Delegates to
            ▼
    ┌──────────────┐
    │  AI Agent    │
    │ (Session Key)│
    └──────┬───────┘
           │ Makes autonomous
           │ payment decisions
           ▼
    ┌─────────────────┐
    │ Verified        │
    │ Merchants       │
    │ (AWS/SaaS/etc)  │
    └─────────────────┘
```

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity 0.8.20
- **Development Framework**: Hardhat
- **AI Agent**: Python + Web3.py
- **Frontend**: HTML/JavaScript + ethers.js
- **Testing**: Hardhat/Chai

## 📦 Installation & Setup

### Prerequisites
- Node.js 20+ installed
- **Gemini API Key** (get free at [Google AI Studio](https://aistudio.google.com/apikey))

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here
```

**Get your free API key**: https://aistudio.google.com/apikey

### 3. Compile Contracts

```bash
npx hardhat compile
```

### 3. Run Tests

```bash
npx hardhat test
```

### 4. Start Local Blockchain

```bash
npx hardhat node
```

Keep this terminal running. You'll see 20 test accounts with ETH.

### 5. Deploy Contracts (New Terminal)

```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Deploy SessionKeyManager contract
- Deploy 3 mock merchants (AWS, Travel, SaaS)
- Verify all merchants
- Save addresses to `deployment.json`

### 6. Run Interactive Demo

**Option A: Simple Demo (No AI)**
```bash
npx hardhat run scripts/demo.js --network localhost
```

**Option B: AI-Powered Demo (Recommended)** ⭐
```bash
npx hardhat run scripts/ai-agent-demo.js --network localhost
```

This will:
- Create a session key with 0.1 ETH limit
- **Use Gemini AI to analyze each purchase**
- **AI creates optimal purchase strategy**
- **AI evaluates necessity, priority, and value**
- Show real-time AI decision-making
- Display reasoning for each decision

## 🎮 Demo Usage

### Option 1: AI-Powered Demo (Recommended) ⭐

```bash
npx hardhat run scripts/ai-agent-demo.js --network localhost
```

**Expected Output:**
```
🤖 AI-POWERED AUTONOMOUS PAYMENT AGENT

🔑 Session Key Generated:
   Address: 0x1234...
   ✅ Session created with 0.1 ETH limit

🧠 Initializing Gemini AI Agent...
   ✅ AI agent ready

📊 AI Analyzing Services and Creating Purchase Plan...

💡 AI Purchase Plan:
   Strategy: Prioritize critical cloud infrastructure...
   Estimated Spend: 0.052 ETH
   Buffer: 48%

🛒 AI-DRIVEN AUTONOMOUS PURCHASING

📦 Service 1/5: AWS EC2 Instance
   Category: Cloud Compute
   Price: 0.01 ETH

   🧠 AI Analyzing...
   Decision: APPROVE
   Reasonin3: Critical cloud infrastructure required
   Priority: critical
   Confidence: 95%
   ✅ PAYMENT SUCCESSFUL!

📦 Service 2/5: AWS S3 Storage
   🧠 AI Analyzing...
   Decision: APPROVE
   Reasonin4: Essential for data storage needs
   Priority: important
   Confidence: 88%
   ✅ PAYMENT SUCCESSFUL!
```

### Option 2: Simple Command Line Demo

```bash
npx hardhat run scripts/demo.js --network localhost
```

**Expected Output:**
```
🔑 Generated Session Key:
Address: 0x1234...
Private Key: 0xabcd...

💰 Creating session with 0.1 ETH spending limit...
✅ Session created!

📊 Session Details:
Spending Limit: 0.1 ETH
Spent: 0.0 ETH

🤖 Simulating AI Agent Purchases...

🛒 AI Purchasing: AWS EC2 - 0.01 ETH
   ✅ Success! TX: 0x789...

🛒 AI Purchasing: Flight Booking - 0.015 ETH
   ✅ Success! TX: 0x456...

📊 Final Budget:
Total Spent: 0.025 ETH
Remaining: 0.075 ETH
```

### Option 2: Web Interface

1. Open `demo.html` in browser
2. Connect MetaMask to localhost:8545
3. Paste contract address from `deployment.json`
4. Create session key
5. Click "🤖 Simulate AI Autonomous Shopping"

### Option 3: Python AI Agent

```bash
# Install Python dependencies
pip install web3 eth-account

# Edit deployment addresses in agent/ai_agent.py
# Run the agent
python agent/ai_agent.py
```

## 🧪 Test Coverage

```bash
npx hardhat test
```

**Tests Include:**
- ✅ Session key creation with limits
- ✅ Autonomous payments within budget
- ✅ Rejection of payments exceeding limits
- ✅ Merchant verification enforcement
- ✅ Session key revocation
- ✅ Expiry time validation

## 🎯 Success Criteria ✓

- [x] **Demo Ready**: AI agent autonomously settles transactions
- [x] **No Human Intervention**: Session key operates independently
- [x] **Pre-defined Constraints**: Spending limits and merchant whitelist enforced
- [x] **Smart Contract Security**: OpenZeppelin standards, tested
- [x] **Market Research**: Identified cloud/SaaS/travel as first-movers
- [x] **Working Prototype**: Fully functional on local testnet
- [x] **AI Integration**: Google Gemini AI for intelligent decisions

## 🔐 Security Features

1. **Spending Caps**: Hardcoded maximum spend per session
2. **Time Limits**: Sessions automatically expire
3. **Merchant Whitelist**: Only verified merchants can receive payments
4. **Revocable**: Owner can cancel session key anytime
5. **Non-Transferable**: Session keys tied to specific owner-agent pair

## 🚀 Future Enhancements

- **Multi-Chain Support**: Deploy on Polygon, Arbitrum for lower fees
- **Dynamic Limits**: AI can request limit increases (with approval)
- **Reputation System**: Track merchant reliability
- **Batch Payments**: Multiple purchases in one transaction
- **Recurring Payments**: Subscription automation
- **Refund Mechanism**: Handle failed services

## 📝 Smart Contract API

### Create Session Key
```solidity
function createSessionKey(
    address _sessionAddress,
    uint256 _spendingLimit,
    uint256 _durationInSeconds
) external
```

### Execute Payment (AI Agent)
```solidity
function executePayment(
    address _owner,
    address _merchant,
    uint256 _amount
) external payable
```

### Check Session Status
```solidity
function getSessionKeyDetails(
    address _owner,
    address _sessionAddress
) external view returns (
    uint256 spendingLimit,
    uint256 spentAmount,
    uint256 expiryTime,
    bool isActive
)
```

## 🎓 Real-World Example

**Scenario**: DevOps AI Agent Managing Cloud Costs

```javascript
// Human sets up session key
await sessionKeyManager.createSessionKey(
    aiAgentAddress,
    ethers.parseEther("10"), // $10 worth
    86400 * 30 // 30 days
);

// AI Agent autonomously:
// 1. Monitors server load
// 2. Decides to scale up (needs more compute)
// 3. Purchases AWS credits WITHOUT asking human
// 4. Stays within $10/month budget
```

## 📊 Gas Costs (Approximate)

- Create Session Key: ~80,000 gas
- Execute Payment: ~65,000 gas
- Verify Merchant: ~45,000 gas
- Revoke Session: ~30,000 gas

## 🏆 Innovation Highlights
Real AI Integration**: Uses Google Gemini AI for actual intelligent decision-making
2. **Non-custodial**: No third party holds funds
3. **Programmable Constraints**: Smart contract enforced limits
4. **AI-Powered Optimization**: Gemini analyzes and prioritizes purchases
5. **Merchant Verified**: Reduces fraud risk
6. **Autonomous Learning**: AI adapts to spending patternsfees
5. **Merchant Verified**: Reduces fraud risk

## 📄 License

MIT License - Build the future of AI commerce!

## 🤝 Contributing

This is a hackathon prototype. Contributions welcome for production hardening!

---

**Built for Track 3: Agentic Commerce**  
*Empowering AI Agents to transact autonomously in the blockchain economy* 🚀
