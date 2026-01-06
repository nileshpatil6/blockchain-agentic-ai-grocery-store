// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockMerchant {
    string public merchantName;
    uint256 public totalRevenue;
    
    event PaymentReceived(address indexed from, uint256 amount, string service);
    
    constructor(string memory _name) {
        merchantName = _name;
    }
    
    receive() external payable {
        totalRevenue += msg.value;
        emit PaymentReceived(msg.sender, msg.value, "Service Purchase");
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
