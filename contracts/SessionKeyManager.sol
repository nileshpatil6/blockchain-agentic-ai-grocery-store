// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SessionKeyManager is Ownable {
    struct SessionKey {
        address sessionAddress;
        uint256 spendingLimit;
        uint256 spentAmount;
        uint256 expiryTime;
        bool isActive;
    }
    
    mapping(address => mapping(address => SessionKey)) public sessionKeys;
    mapping(address => bool) public verifiedMerchants;
    
    event SessionKeyCreated(address indexed owner, address indexed sessionKey, uint256 limit, uint256 expiry);
    event PaymentExecuted(address indexed owner, address indexed merchant, uint256 amount);
    event MerchantVerified(address indexed merchant);
    
    constructor() Ownable(msg.sender) {}
    
    function createSessionKey(
        address _sessionAddress,
        uint256 _spendingLimit,
        uint256 _durationInSeconds
    ) external {
        require(_sessionAddress != address(0), "Invalid session address");
        require(_spendingLimit > 0, "Limit must be positive");
        
        sessionKeys[msg.sender][_sessionAddress] = SessionKey({
            sessionAddress: _sessionAddress,
            spendingLimit: _spendingLimit,
            spentAmount: 0,
            expiryTime: block.timestamp + _durationInSeconds,
            isActive: true
        });
        
        emit SessionKeyCreated(msg.sender, _sessionAddress, _spendingLimit, block.timestamp + _durationInSeconds);
    }
    
    function executePayment(
        address _owner,
        address _merchant,
        uint256 _amount
    ) external payable {
        SessionKey storage session = sessionKeys[_owner][msg.sender];
        
        require(session.isActive, "Session not active");
        require(block.timestamp < session.expiryTime, "Session expired");
        require(verifiedMerchants[_merchant], "Merchant not verified");
        require(session.spentAmount + _amount <= session.spendingLimit, "Exceeds spending limit");
        require(msg.value == _amount, "Incorrect payment amount");
        
        session.spentAmount += _amount;
        
        (bool success, ) = payable(_merchant).call{value: _amount}("");
        require(success, "Payment transfer failed");
        
        emit PaymentExecuted(_owner, _merchant, _amount);
    }
    
    function verifyMerchant(address _merchant) external onlyOwner {
        verifiedMerchants[_merchant] = true;
        emit MerchantVerified(_merchant);
    }
    
    function revokeSessionKey(address _sessionAddress) external {
        sessionKeys[msg.sender][_sessionAddress].isActive = false;
    }
    
    function getSessionKeyDetails(address _owner, address _sessionAddress) 
        external 
        view 
        returns (
            uint256 spendingLimit,
            uint256 spentAmount,
            uint256 expiryTime,
            bool isActive
        ) 
    {
        SessionKey memory session = sessionKeys[_owner][_sessionAddress];
        return (
            session.spendingLimit,
            session.spentAmount,
            session.expiryTime,
            session.isActive
        );
    }
}
