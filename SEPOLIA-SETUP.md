# 🌐 Sepolia Testnet Deployment Guide

## Step-by-Step Setup for REAL Blockchain Testing

---

## ✅ Step 1: Install MetaMask (2 minutes)

1. **Install MetaMask extension**:
   - Chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/

2. **Create a new wallet**:
   - Click "Create a new wallet"
   - Set a password
   - **SAVE YOUR SEED PHRASE** (12 words) - write it down!
   - Never share this with anyone

3. **Switch to Sepolia Network**:
   - Click network dropdown (top left)
   - Toggle "Show test networks" in settings
   - Select "Sepolia test network"

---

## 💰 Step 2: Get FREE Sepolia ETH (5 minutes)

You need testnet ETH to pay for gas fees. Use these faucets:

### Option A: Alchemy Faucet (Easiest)
1. Go to: https://www.alchemy.com/faucets/ethereum-sepolia
2. Sign in with Google/Email
3. Enter your MetaMask address
4. Get **0.5 ETH** (free, once per day)

### Option B: Infura Faucet
1. Go to: https://www.infura.io/faucet/sepolia
2. Sign in with wallet
3. Get **0.5 ETH**

### Option C: QuickNode Faucet
1. Go to: https://faucet.quicknode.com/ethereum/sepolia
2. Enter your address
3. Get **0.1 ETH**

### Option D: Google Cloud Faucet
1. Go to: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
2. Sign in with Google
3. Get **0.05 ETH**

**Tip**: Use multiple faucets to get more test ETH!

---

## 🔑 Step 3: Get Infura API Key (3 minutes)

### Sign up for Infura (FREE):

1. **Go to**: https://infura.io/
2. **Sign up** with email
3. **Create a new project**:
   - Click "Create New Key"
   - Select "Web3 API (Formerly Ethereum)"
   - Name: "Agentic Commerce"
4. **Copy API Key** from dashboard

**Alternative**: Use Alchemy instead:
- https://alchemy.com/
- Sign up → Create App → Select Sepolia → Copy API key

---

## 🔐 Step 4: Export MetaMask Private Key (1 minute)

⚠️ **CRITICAL SECURITY WARNING**:
- **NEVER share your private key**
- **NEVER commit it to Git**
- Only use this wallet for testing
- Consider creating a separate test wallet

### Export Steps:

1. Open MetaMask
2. Click account icon (top right)
3. Click **Account Details**
4. Click **Export Private Key**
5. Enter your MetaMask password
6. **Copy the private key** (starts with 0x)

---

## 📝 Step 5: Configure .env File

Open your `.env` file and add:

```env
# AI Configuration
GEMINI_API_KEY=your_actual_gemini_key

# Infura Configuration
INFURA_API_KEY=your_actual_infura_key

# MetaMask Wallet
PRIVATE_KEY=your_actual_private_key_with_0x

# Optional: Etherscan (for contract verification)
ETHERSCAN_API_KEY=your_etherscan_key
```

**Example** (with fake values):
```env
GEMINI_API_KEY=AIzaSyABCDEF1234567890
INFURA_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
ETHERSCAN_API_KEY=ABC123XYZ789
```

---

## 🚀 Step 6: Deploy to Sepolia!

### Compile Contracts:

```bash
npx hardhat compile
```

### Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected Output**:
```
Deploying Agentic Commerce Protocol...

SessionKeyManager deployed to: 0x1234... (REAL Sepolia address!)
AWS Merchant deployed to: 0x5678...
Travel Merchant deployed to: 0x9abc...
SaaS Merchant deployed to: 0xdef0...

Verifying merchants...
All merchants verified!

Deployment info saved to deployment.json
```

---

## 🤖 Step 7: Run AI Agent on Real Testnet!

```bash
npx hardhat run scripts/ai-agent-demo.js --network sepolia
```

**What happens**:
- ✅ Uses your REAL MetaMask wallet
- ✅ Pays REAL gas fees (with test ETH)
- ✅ Transactions on REAL Sepolia blockchain
- ✅ Gemini AI makes REAL decisions
- ✅ Viewable on Etherscan!

---

## 🔍 Step 8: Verify Transactions on Etherscan

After deployment, check your transactions:

1. **Go to**: https://sepolia.etherscan.io/
2. **Enter your wallet address** or contract address
3. **See all transactions** - deployment, payments, everything!
4. **Share the link** - anyone can verify your work

Example: https://sepolia.etherscan.io/address/0xYourContractAddress

---

## 💡 Tips & Best Practices

### Security:
- ✅ Use a separate wallet for testing
- ✅ Never commit `.env` to Git (already in `.gitignore`)
- ✅ Don't put real money in test wallet
- ✅ Treat private keys like passwords

### Troubleshooting:

**"Insufficient funds"**
→ Get more Sepolia ETH from faucets

**"Invalid API key"**
→ Check your Infura/Alchemy key is correct

**"Network not found"**
→ Make sure you saved `hardhat.config.js` changes

**"Transaction underpriced"**
→ Network is congested, wait a few minutes and retry

### Cost Estimation:

On Sepolia (all FREE test ETH):
- Contract deployment: ~0.02 ETH
- Session key creation: ~0.001 ETH
- Each AI purchase: ~0.0005 ETH
- **Total for full demo**: ~0.025 ETH

Make sure you have at least **0.1 ETH** from faucets!

---

## 📊 What You Get

### On Sepolia Testnet:

✅ **Real blockchain behavior** - identical to mainnet  
✅ **Real transactions** - viewable on Etherscan  
✅ **Real smart contracts** - deployed and verified  
✅ **Real AI decisions** - Gemini API calls  
✅ **Zero cost** - free test ETH  
✅ **Public verification** - share links with anyone  
✅ **Perfect for demos** - show investors/judges  

### Future Migration to Mainnet:

When ready for production:
```bash
# Just change network!
npx hardhat run scripts/deploy.js --network mainnet
```

Same code, same contracts, just real money! (But test on Sepolia first!)

---

## 🎯 Checklist

Before deploying, make sure:

- [ ] MetaMask installed and wallet created
- [ ] Switched to Sepolia network in MetaMask
- [ ] Got 0.1+ Sepolia ETH from faucets
- [ ] Infura account created and API key copied
- [ ] Private key exported from MetaMask
- [ ] `.env` file configured with all keys
- [ ] Compiled contracts successfully
- [ ] Gemini API key working

---

## 🆘 Need Help?

### Common Issues:

1. **"Cannot find module dotenv"**
   ```bash
   npm install dotenv
   ```

2. **"Network sepolia not found"**
   - Check `hardhat.config.js` has `require("dotenv").config()`
   - Verify `.env` has INFURA_API_KEY

3. **"Private key invalid"**
   - Make sure it starts with `0x`
   - Check you copied the entire key

4. **"Out of gas"**
   - Get more Sepolia ETH from faucets
   - Try increasing gas limit in script

### Resources:

- Sepolia Faucets: https://faucetlink.to/sepolia
- Sepolia Explorer: https://sepolia.etherscan.io/
- Infura Docs: https://docs.infura.io/
- Hardhat Docs: https://hardhat.org/tutorial
- Community: https://discuss.ai.google.dev/

---

## 🎉 Success!

Once deployed, you have:
- A real smart contract on Sepolia
- AI agent making real decisions
- Blockchain transactions anyone can verify
- Perfect demo for your hackathon!

**Share your Etherscan link and show the world!** 🚀

---

**Ready to deploy? Let's go!** ⚡
