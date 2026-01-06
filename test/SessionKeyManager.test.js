const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Agentic Commerce Protocol", function () {
  let sessionKeyManager;
  let merchant;
  let owner;
  let sessionKey;
  let user;

  beforeEach(async function () {
    [owner, sessionKey, user] = await ethers.getSigners();

    const SessionKeyManager = await ethers.getContractFactory("SessionKeyManager");
    sessionKeyManager = await SessionKeyManager.deploy();
    await sessionKeyManager.waitForDeployment();

    const MockMerchant = await ethers.getContractFactory("MockMerchant");
    merchant = await MockMerchant.deploy("Test Merchant");
    await merchant.waitForDeployment();

    await sessionKeyManager.verifyMerchant(await merchant.getAddress());
  });

  it("Should create session key with spending limits", async function () {
    const limit = ethers.parseEther("1.0");
    const duration = 3600; // 1 hour

    await sessionKeyManager.connect(user).createSessionKey(
      sessionKey.address,
      limit,
      duration
    );

    const details = await sessionKeyManager.getSessionKeyDetails(
      user.address,
      sessionKey.address
    );

    expect(details.spendingLimit).to.equal(limit);
    expect(details.isActive).to.be.true;
  });

  it("Should allow autonomous payments within limits", async function () {
    const limit = ethers.parseEther("1.0");
    const paymentAmount = ethers.parseEther("0.1");

    await sessionKeyManager.connect(user).createSessionKey(
      sessionKey.address,
      limit,
      3600
    );

    await sessionKeyManager.connect(sessionKey).executePayment(
      user.address,
      await merchant.getAddress(),
      paymentAmount,
      { value: paymentAmount }
    );

    const details = await sessionKeyManager.getSessionKeyDetails(
      user.address,
      sessionKey.address
    );

    expect(details.spentAmount).to.equal(paymentAmount);
  });

  it("Should reject payments exceeding limit", async function () {
    const limit = ethers.parseEther("0.1");
    const paymentAmount = ethers.parseEther("0.2");

    await sessionKeyManager.connect(user).createSessionKey(
      sessionKey.address,
      limit,
      3600
    );

    await expect(
      sessionKeyManager.connect(sessionKey).executePayment(
        user.address,
        await merchant.getAddress(),
        paymentAmount,
        { value: paymentAmount }
      )
    ).to.be.revertedWith("Exceeds spending limit");
  });

  it("Should reject payments to unverified merchants", async function () {
    const [, , , unverifiedMerchant] = await ethers.getSigners();
    const limit = ethers.parseEther("1.0");
    const paymentAmount = ethers.parseEther("0.1");

    await sessionKeyManager.connect(user).createSessionKey(
      sessionKey.address,
      limit,
      3600
    );

    await expect(
      sessionKeyManager.connect(sessionKey).executePayment(
        user.address,
        unverifiedMerchant.address,
        paymentAmount,
        { value: paymentAmount }
      )
    ).to.be.revertedWith("Merchant not verified");
  });

  it("Should allow session key revocation", async function () {
    const limit = ethers.parseEther("1.0");

    await sessionKeyManager.connect(user).createSessionKey(
      sessionKey.address,
      limit,
      3600
    );

    await sessionKeyManager.connect(user).revokeSessionKey(sessionKey.address);

    const details = await sessionKeyManager.getSessionKeyDetails(
      user.address,
      sessionKey.address
    );

    expect(details.isActive).to.be.false;
  });
});
