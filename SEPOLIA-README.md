# 🚀 SEPOLIA READY - Quick Start

Your project is now configured for Sepolia testnet deployment!

## 📋 Quick Checklist

### ✅ Already Done:
- [x] Hardhat config updated with Sepolia network
- [x] Environment variables template created
- [x] Deployment scripts ready
- [x] Verification script added

### 🔧 You Need To Do:

1. **Get Infura API Key** (2 minutes)
   - Go to: https://infura.io/
   - Sign up (free)
   - Create project → Get API key

2. **Get MetaMask Wallet** (3 minutes)
   - Install MetaMask extension
   - Create new wallet
   - Switch to Sepolia network
   - Export private key

3. **Get FREE Sepolia ETH** (3 minutes)
   - https://www.alchemy.com/faucets/ethereum-sepolia
   - https://www.infura.io/faucet/sepolia
   - Get at least 0.1 ETH (free!)

4. **Update .env File**:
   ```env
   GEMINI_API_KEY=AIzaSyCbRsJXgRQSTkKV1SlTstc9cb_CPzqArjk
   INFURA_API_KEY=your_infura_key_here
   PRIVATE_KEY=0x_your_private_key_here
   ```

## 🎯 Deploy to Sepolia

```bash
# Compile
npx hardhat compile

# Deploy to REAL Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Verify deployment
npx hardhat run scripts/verify-deployment.js --network sepolia

# Run AI agent on REAL blockchain
npx hardhat run scripts/ai-agent-demo.js --network sepolia
```

## 📖 Full Instructions

See [SEPOLIA-SETUP.md](SEPOLIA-SETUP.md) for detailed step-by-step guide!

---

**In 10 minutes, you'll have a REAL blockchain deployment with AI!** 🤖⚡
