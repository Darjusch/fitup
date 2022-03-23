const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Fitup", function () {
  let Fitup;
  let fitup;
  let owner;
  let addr1;
  let addr2;
  let organisation;
  let organisation2;
  let balanceInEthAfter;
  let OrgBalanceInEth;

  const options = { value: ethers.utils.parseEther("500") };
  const provider = waffle.provider;
  async function _getBalance(_address) {
    return parseInt(
      ethers.utils.formatEther(await provider.getBalance(_address))
    );
  }
  beforeEach(async function () {
    Fitup = await ethers.getContractFactory("Fitup");
    fitup = await Fitup.deploy();
    await fitup.deployed();
    [owner, addr1, addr2, organisation, organisation2] =
      await ethers.getSigners();

    await fitup.addNgo("CODE", organisation.address, { from: owner.address });

    await fitup.connect(addr1).createBet(organisation.address, options);

    balanceInEthAfter = await _getBalance(addr1.address);
    OrgBalanceInEth = await _getBalance(organisation.address);
  });
  it("Should create a BET", async () => {
    await expect(fitup.createBet(organisation.address, options))
      .to.emit(fitup, "BetCreated")
      .withArgs(
        owner.address,
        organisation.address,
        ethers.utils.parseEther("500")
      );
  });

  it("Should add a NGO", async () => {
    await expect(fitup.addNgo("UN", organisation2.address))
      .to.emit(fitup, "NgoAdded")
      .withArgs("UN", organisation2.address);
  });

  describe("Payout functions", function () {
    // It olny testing of the event get emitted! DOES NOT TEST IF THE PAYABLE ADDRESS.

    it("Should Emit Event-payout a bet to a NGO", async () => {
      await expect(fitup.payoutBet(false, addr1.address))
        .to.emit(fitup, "BetPayout")
        .withArgs(
          addr1.address,
          false,
          organisation.address,
          ethers.utils.parseEther("500")
        );
    });

    // It olny testing of the event get emitted! DOES NOT TEST IF THE PAYABLE ADDRESS.

    it("Should Emit Event-payout a bet to the creator of the bet", async () => {
      await expect(fitup.payoutBet(true, addr1.address))
        .to.emit(fitup, "BetPayout")
        .withArgs(
          addr1.address,
          true,
          organisation.address,
          ethers.utils.parseEther("500")
        );
    });

    it("should payout the creator", async () => {
      const payOut = await fitup.payoutBet(true, addr1.address);
      const balanceInEthPay = await _getBalance(addr1.address);

      expect(payOut.data.toLowerCase().slice(98, 138)).to.be.equal(
        addr1.address.toLowerCase().slice(2, 42)
      );

      expect(balanceInEthPay).to.be.above(balanceInEthAfter);
    });

    it("Should payout the orginization", async () => {
      const payOut = await fitup.payoutBet(false, addr1.address);
      const balanceInEthPay = await _getBalance(organisation.address);

      expect(balanceInEthPay).to.be.above(OrgBalanceInEth);
    });
  });

  it("Should check if NGO exist", async () => {
    const ngoExist = await fitup.doesNgoExist(organisation.address);
    expect(ngoExist).to.be.equal(true);
  });

  it("Should retun a bet", async () => {
    const bet = await fitup.getBet(addr1.address);
    expect(bet.organisation).to.equal(organisation.address);
  });
});
