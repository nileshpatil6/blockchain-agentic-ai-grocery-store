# 🤖 AI-POWERED AGENTIC COMMERCE - QUICKSTART

## Get Running in 3 Minutes with REAL AI! ⚡

### Step 1: Get Your FREE Gemini API Key (30 seconds)

1. Go to: **https://aistudio.google.com/apikey**
2. Click "Create API Key"
3. Copy the key

### Step 2: Install & Setup (1 minute)

```bash
cd "c:\Users\Nilesh\Downloads\IIT_Kharagpur (3)\block"

# Install dependencies
npm install

# Create .env file
echo GEMINI_API_KEY=your_actual_key_here > .env
```

**⚠️ IMPORTANT**: Replace `your_actual_key_here` with your real API key!

### Step 3: Start Blockchain (30 seconds)

**Terminal 1:**
```bash
npx hardhat node
```

Keep this running!

### Step 4: Deploy (30 seconds)

**Terminal 2:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Step 5: See AI in Action! (1 minute) 🚀

```bash
npx hardhat run scripts/ai-agent-demo.js --network localhost
```

## What You'll See:

```
🤖 AI-POWERED AUTONOMOUS PAYMENT AGENT
======================================================================

🧠 Initializing Gemini AI Agent...
   ✅ AI agent ready

📊 AI Analyzing Services and Creating Purchase Plan...

💡 AI Purchase Plan:
   Strategy: Prioritize critical cloud infrastructure (AWS EC2) first,
   then add essential storage (S3). Skip expensive travel booking to
   maintain healthy budget buffer.
   Estimated Spend: 0.052 ETH
   Buffer: 48%

🛒 AI-DRIVEN AUTONOMOUS PURCHASING
======================================================================

📦 Service 1/5: AWS EC2 Instance
   Category: Cloud Compute
   Price: 0.01 ETH
   Budget Remaining: 0.1 ETH

   🧠 AI Analyzing...
   Decision: APPROVE
   Reasoning: Critical cloud infrastructure required for core operations
   Priority: critical
   Confidence: 95%

   ✅ PAYMENT SUCCESSFUL!

📦 Service 2/5: AWS S3 Storage
   🧠 AI Analyzing...
   Decision: APPROVE
   Reasoning: Essential for data storage needs, low cost high value
   Priority: important
   Confidence: 88%

   ✅ PAYMENT SUCCESSFUL!

📦 Service 3/5: Premium Travel Booking
   🧠 AI Analyzing...
   Decision: REJECT
   Reasoning: Expensive luxury item, budget travel alternative available
   Priority: optional
   Confidence: 75%

   ⏭️  SKIPPED (AI rejected)
```

## 🎯 What Makes This Special?

### REAL AI Integration ✨

Unlike basic demos, this uses **Google Gemini AI** to:

1. **Analyze Each Purchase**
   - Evaluates necessity vs. luxury
   - Calculates value for money
   - Assesses business priority

2. **Create Smart Plans**
   - Optimizes spending order
   - Maintains budget buffer
   - Balances service categories

3. **Make Intelligent Decisions**
   - Approves critical infrastructure first
   - Rejects overpriced services
   - Suggests cheaper alternatives

4. **Provide Reasoning**
   - Every decision explained
   - Confidence scores
   - Priority levels

### No Hardcoded Logic!

The AI agent actually **thinks** and makes decisions based on:
- Current market conditions
- Service importance
- Budget constraints
- Value analysis

## 🔧 Troubleshooting

**"GEMINI_API_KEY not found"**
→ Make sure you created the `.env` file with your actual API key

**"Invalid API Key"**
→ Double-check your key from https://aistudio.google.com/apikey

**"Network error"**
→ Make sure `npx hardhat node` is running in Terminal 1

## 🎓 What's Happening Behind the Scenes?

1. **AI creates purchase plan** based on available services and budget
2. **For each service**, AI analyzes:
   - Is it critical/important/optional?
   - Is the price reasonable?
   - Do we have budget?
   - Should we buy now or skip?

3. **AI decides autonomously** - no human intervention!
4. **Smart contract enforces** the spending limits
5. **Blockchain records** every transaction permanently

## 🚀 Next Steps

### Compare with Simple Demo:

```bash
# Simple demo (no AI)
npx hardhat run scripts/demo.js --network localhost

# AI-powered demo
npx hardhat run scripts/ai-agent-demo.js --network localhost
```

See the difference - one is just executing a list, the other is **actually thinking**!

### Customize It:

Edit `scripts/ai-agent-demo.js` to:
- Add more services
- Change budget limits
- Modify AI prompts
- Try different scenarios

## 📊 Success Metrics

✅ Real AI integration (Gemini 2.5 Flash)  
✅ Intelligent decision-making  
✅ Budget optimization  
✅ Autonomous operation  
✅ Blockchain security  
✅ No human intervention needed  

---

**Total Time: 3 minutes from zero to AI-powered autonomous payments!** ⚡🤖

Get your API key and see real AI making financial decisions! 🚀
