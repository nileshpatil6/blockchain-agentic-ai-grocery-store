# Agentic Commerce - Kshitij 2026 Hackathon Submission

## 1. Executive Summary

**Track Selected:** Agentic Commerce  
**One-Liner:** An autonomous AI payment rail that enables agents to securely execute blockchain purchase decisions with cryptographic budget restraints.  
**Team Name:** [Your Team Name]  

**The Problem in One Sentence:**  
AI agents today are intelligent but financially impotent; they can find the best flight or cheapest server, but they cannot pay for it without a human blindly signing a wallet popup, destroying the concept of autonomy.

---

## 2. Market Research & Validation

**Why this project needs to exist:**  
We are entering the era of "Agentic Web," where AI doesn't just retrieve information but performs actions. Currently, there is a "Transformation Gap": AI can plan a trip but can't buy the tickets. Giving an AI a private key is a security nightmare, but requiring manual approval for every micro-transaction defeats the purpose of automation. We need a middle ground—trustless, bounded financial autonomy.

**Target Audience:**  
*   **Developers:** Building autonomous assistants who need a native payment layer.
*   **DeFi Power Users:** Who want to automate efficient asset management (e.g., "Buy ETH if it dips below $2000").
*   **Enterprises:** Managing cloud infrastructure costs where an AI agent can dynamically purchase spot instances based on real-time pricing.

**Competitor Analysis:**  
*   **Traditional Web2 (Credit Cards):** Requires identity, not programmable, prone to chargebacks, and agents can't easily hold cards.
*   **Web3 Native (Multisig Wallets):** Too slow; requires multiple human signatures for every action.
*   **Current "AI Wallets" (Raw Keys):** Storing private keys in `.env` files is a security disaster waiting to happen.
*   **Our Approach (Agentic Commerce):** We use **Session Keys** (temporary, restricted permissions) combined with **Merchant Allow-listing**. The AI has a "debit card" with a strict spending limit and expiry, not the "keys to the bank vault."

**User Persona: A Day in the Life of "Arjun"**  
Arjun is a cloud architect. He sets up our Agentic Commerce system with a 0.5 ETH monthly budget. He sleeps while his "Cloud Ops Agent" monitors AWS spot prices. At 3 AM, the price drops. The agent autonomously analyzes the opportunity, verifies it fits Arjun's "Critical" criteria, and pays for the server instance on-chain immediately. Arjun wakes up to a notification: "Server acquired at 40% discount," without ever having to unlock his phone.

---

## 3. The Solution & Innovation

**Core Value Proposition:**  
We provide the missing "Financial Logic Layer" for AI. We decouple the **Owner** (who holds funds) from the **Agent** (who spends funds), connected by a smart contract that enforces the rules.

**The "Magic Moment":**  
The user types "Get me healthy breakfast ingredients under 0.01 ETH" into the chat interface. The AI analyzes nutrition, checks prices, and then—*without any further prompt or wallet confirmation*—the user sees "Transaction Confirmed" notifications appearing one by one. The friction of "Review -> Sign -> Confirm" is completely gone.

**Unique Selling Point (USP):**  
Most projects are either "AI Chatbots" or "Crypto Wallets." We are the strictly integrated intersection:
1.  **Semantic Analysis:** We use Google's Gemini AI not just to "chat" but to parse unstructured intent (text) into structured financial transactions (JSON).
2.  **On-Chain Guardrails:** Even if the AI hallucinates and tries to send 100 ETH to a scammer, the smart contract (`SessionKeyManager.sol`) physically rejects it because of the hard-coded spending limit and verified merchant check.

**Success Metric:**  
The **"Autonomy Ratio"**: The percentage of routine transactions successfully executed by the agent without human intervention versus those requiring manual override.

---

## 4. Technical Feasibility & Architecture

**System Architecture:**  

The system operates on a hybrid **Off-Chain Intelligence / On-Chain Security** model, effectively solving the "Oracle Problem" for intent-based transactions.

1.  **Client Layer (Intent Capture):**
    *   **Interface:** A Progressive Web App (PWA) where users input high-level natural language goals (e.g., "Purchase cloud storage for next month").
    *   **Wallet Integration:** Direct connection to EOA (Externally Owned Account) for initial Session Key authorization.

2.  **Intelligence Layer (The "Brain"):**
    *   **Semantic Parser:** We utilize **Google Gemini 2.0 Flash** to deconstruct user prompts into executable intent.
    *   **Sanity Engine:** A custom Node.js middleware that validates the AI's output against a predefined JSON schema, ensuring no hallucinated parameters reach the chain.
    *   **Transaction Builder:** Converts the validated JSON into raw Ethereum transactions, signed locally by the ephemeral Session Key.

3.  **Settlement Layer (The "Trust Anchor"):**
    *   **SessionKeyManager.sol:** A custom smart contract acting as a firewall. It does not blindly execute; it validates:
        *   `isValidSession(msg.sender)`: Is this key currently authorized?
        *   `isUnderLimit(value)`: Does this transaction fit the remaining allowance?
        *   `isWhitelisted(recipient)`: Is the destination a verified merchant?

**Tech Stack:**  
*   **Blockchain:** Ethereum Sepolia Testnet (EVM Compatible).
*   **Smart Contracts:** Solidity v0.8.20 (Optimized for gas efficiency).
*   **AI Model:** Google Gemini Pro (via REST API).
*   **Backend:** Node.js, Express.js (Handling intent routing).
*   **Frontend:** Vanilla JS / HTML5 (Lightweight, high-performance UI).
*   **Security:** Ephemeral Private Keys (Stored in-memory or secure enclave, never persisted permanently).

**Key Technical Challenge & Solution:**  
*   *Challenge:* **Non-Deterministic Outputs.** LLMs can be unpredictable, occasionally outputting invalid JSON or hallucinating prices.
*   *Solution:* We implemented a **"Deterministic Guardrail"** pattern. The AI's output is treated as a *proposal*, not a command. The TypeScript middleware parses this proposal, cross-references it with live merchant data, and fully regenerates the transaction parameters. If the AI's price estimate deviates >5% from the oracle/merchant price, the transaction is auto-rejected before gas is spent.

---

## 5. Working Prototype & Demo

**GitHub Repository:** [Insert your Public Repo Link Here]  
**Live Demo:** [Insert Deployment Link if available]  

**Screenshots:**  
*(Please attach screenshots of: 1. The Dashboard showing the budget. 2. The Chat Interface with the AI thinking process. 3. A successful transaction receipt.)*

**Demo Flow:**
1.  User connects wallet and sees "0.000 ETH" session budget.
2.  User approves a session budget of 0.1 ETH (One-time MetaMask signature).
3.  User asks AI: "Buy office supplies."
4.  AI "Thinking Process" is shown: Selecting items, checking budget.
5.  Transaction cards appear instantly as the AI signs with its session key.

---

## 6. Business Model & Future Roadmap

**Monetization Strategy:**  
*   **B2B SaaS API:** Charge developers a fee for using our "Safe-Agent" SDK.
*   **Merchant Affiliate Fees:** Verified merchants (e.g., Flight Booking DApps, Compute Providers) pay a small listing fee or commission to be included in the agent's "trusted" database.

**Compliance & Regulatory Path:**  
This system fits well within the Indian regulatory landscape because it is **Self-Custodial**. The user never gives up their funds to a centralized escrow. We facilitate the tech; we do not hold the crypto. Limitations (Spending Limits) act as a built-in safety mechanism against large-scale fraud, aligning with consumer protection principles.

**The "Next 6 Months":**  
1.  **ERC-4337 Integration:** Move from our custom session keys to full Account Abstraction standard for better compatibility.
2.  **Multi-Chain Support:** Allow the agent to shop on Polygon (lower fees) and Solana (speed) simultaneously.
3.  **"Agent Personas":** Pre-trained models for specific niches—a "Travel Agent" that knows VISA rules, or a "DeFi Agent" that understands yield farming risks.
