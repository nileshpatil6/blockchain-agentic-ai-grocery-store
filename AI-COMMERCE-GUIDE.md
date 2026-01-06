# 🛒 AI Commerce Platform - Quick Start

## 🚀 Launch the Platform

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm run server
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## ⚙️ Setup Instructions

When you open the platform, you'll see a setup modal. Fill in:

1. **Contract Address**: 
   - Get this from `deployment.json` file
   - Look for `sessionKeyManagerAddress`

2. **Session Key Private Key**:
   - You'll need to create a session key first
   - Or use the session key from your previous deployment

3. **Gemini API Key**:
   - Your Gemini API key from `.env` file
   - Or get a new one from: https://aistudio.google.com/apikey

## 🎯 How to Use

### Quick Shopping Examples:

1. **Buy Pasta Ingredients**:
   - Click "🍝 Pasta ingredients" or type:
   - "Buy groceries for making spaghetti carbonara"

2. **Buy Pizza Ingredients**:
   - Click "🍕 Pizza ingredients" or type:
   - "Get items for homemade pizza"

3. **Smart Budget Shopping**:
   - Click "🥗 Healthy snacks" or type:
   - "Buy healthy snacks under budget"

### Custom Requests:

Type natural language requests like:
- "I need ingredients for chicken curry"
- "Buy vegetables for salad"
- "Get items for breakfast"

## 🤖 AI Features

The AI agent will:
- ✅ Analyze your request
- ✅ Select appropriate products
- ✅ Check prices against budget
- ✅ Reject overpriced items
- ✅ Execute smart purchases
- ✅ Show transaction on Etherscan

## 📊 What You'll See

1. **Product Grid**: All available items with prices
2. **AI Chat**: Interactive conversation with the agent
3. **Thinking Process**: AI's decision-making reasoning
4. **Transaction Status**: Real blockchain confirmations
5. **Budget Tracker**: Live balance updates

## 🔗 Important Links

- **Sepolia Etherscan**: https://sepolia.etherscan.io/
- **View your transactions**: Click links in the chat after purchases
- **Contract Explorer**: Search your contract address on Etherscan

## 🎨 Features

- 🎯 Natural language shopping
- 🧠 AI decision-making with reasoning
- 💳 Real blockchain transactions
- 📊 Live balance tracking
- ✅ Smart price analysis
- ❌ Automatic rejection of expensive items
- 🔗 Etherscan integration
- 📱 Responsive modern UI

## 🔧 Troubleshooting

**If setup fails**:
1. Make sure contracts are deployed (check `deployment.json`)
2. Verify you have SepoliaETH in your wallet
3. Check that Gemini API key is valid
4. Ensure session key has permissions

**If purchases fail**:
1. Check your balance is sufficient
2. Verify session key is authorized
3. Make sure you're on Sepolia network in MetaMask

## 💡 Tips

- The AI will automatically reject items that exceed budget limits
- Each purchase is a real blockchain transaction
- You can track all transactions on Sepolia Etherscan
- The AI provides reasoning for each decision
- Budget updates in real-time after each purchase

Enjoy your AI-powered shopping experience! 🎉
