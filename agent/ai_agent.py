import json
import time
from web3 import Web3
from eth_account import Account
import random

class AIPaymentAgent:
    """Autonomous AI Agent with restricted payment capabilities"""
    
    def __init__(self, rpc_url, session_private_key, owner_address, contract_address, abi):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.session_account = Account.from_key(session_private_key)
        self.owner_address = owner_address
        self.contract = self.w3.eth.contract(address=contract_address, abi=abi)
        
    def check_session_limits(self):
        """Check current session key status"""
        details = self.contract.functions.getSessionKeyDetails(
            self.owner_address,
            self.session_account.address
        ).call()
        
        return {
            'spending_limit': details[0],
            'spent_amount': details[1],
            'expiry_time': details[2],
            'is_active': details[3],
            'remaining': details[0] - details[1]
        }
    
    def autonomous_purchase(self, merchant_address, amount_wei, service_name):
        """Make autonomous payment decision and execute"""
        
        print(f"\n🤖 AI Agent Decision Process:")
        print(f"   Service: {service_name}")
        print(f"   Merchant: {merchant_address}")
        print(f"   Amount: {self.w3.from_wei(amount_wei, 'ether')} ETH")
        
        limits = self.check_session_limits()
        print(f"   Current spent: {self.w3.from_wei(limits['spent_amount'], 'ether')} ETH")
        print(f"   Remaining budget: {self.w3.from_wei(limits['remaining'], 'ether')} ETH")
        
        if not limits['is_active']:
            print("   ❌ Session key not active")
            return False
            
        if limits['expiry_time'] < time.time():
            print("   ❌ Session expired")
            return False
            
        if amount_wei > limits['remaining']:
            print("   ❌ Exceeds budget limit")
            return False
        
        print("   ✅ All checks passed - Executing autonomous payment...")
        
        try:
            nonce = self.w3.eth.get_transaction_count(self.session_account.address)
            
            transaction = self.contract.functions.executePayment(
                self.owner_address,
                merchant_address,
                amount_wei
            ).build_transaction({
                'from': self.session_account.address,
                'value': amount_wei,
                'gas': 200000,
                'gasPrice': self.w3.eth.gas_price,
                'nonce': nonce
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(
                transaction,
                self.session_account.key
            )
            
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            print(f"   ✅ Payment successful! TX: {tx_hash.hex()}")
            return True
            
        except Exception as e:
            print(f"   ❌ Payment failed: {str(e)}")
            return False
    
    def simulate_ai_behavior(self, merchants):
        """Simulate AI agent making autonomous decisions"""
        
        services = [
            ("AWS EC2 Instance", merchants['aws'], self.w3.to_wei(0.01, 'ether')),
            ("Travel Flight Booking", merchants['travel'], self.w3.to_wei(0.015, 'ether')),
            ("SaaS Monthly Subscription", merchants['saas'], self.w3.to_wei(0.005, 'ether')),
            ("AWS S3 Storage", merchants['aws'], self.w3.to_wei(0.008, 'ether')),
        ]
        
        print("\n" + "="*60)
        print("🤖 AI AGENT AUTONOMOUS OPERATION STARTED")
        print("="*60)
        
        for service_name, merchant, amount in services:
            time.sleep(2)
            self.autonomous_purchase(merchant, amount, service_name)
        
        print("\n" + "="*60)
        print("📊 Final Session Status:")
        final_limits = self.check_session_limits()
        print(f"   Total Spent: {self.w3.from_wei(final_limits['spent_amount'], 'ether')} ETH")
        print(f"   Budget Remaining: {self.w3.from_wei(final_limits['remaining'], 'ether')} ETH")
        print("="*60)


def main():
    with open('deployment.json', 'r') as f:
        deployment = json.load(f)
    
    with open('artifacts/contracts/SessionKeyManager.sol/SessionKeyManager.json', 'r') as f:
        contract_json = json.load(f)
    
    RPC_URL = "http://127.0.0.1:8545"
    
    print("⚙️  Setting up AI Agent with Session Key...")
    
    session_key = Account.create()
    print(f"Session Key Address: {session_key.address}")
    print(f"Session Key Private: {session_key.key.hex()}")
    
    agent = AIPaymentAgent(
        rpc_url=RPC_URL,
        session_private_key=session_key.key,
        owner_address="OWNER_ADDRESS_PLACEHOLDER",
        contract_address=deployment['sessionKeyManager'],
        abi=contract_json['abi']
    )
    
    print("\n✅ AI Agent initialized and ready for autonomous payments!")
    
    agent.simulate_ai_behavior(deployment['merchants'])


if __name__ == "__main__":
    main()
