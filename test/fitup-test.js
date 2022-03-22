const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Fitup", function () {


  let Fitup;
  let fitup
  let owner;
  let addr1;
  let organisation;
  let organisation2;
  const value = {value: ethers.utils.parseEther("1.0")}
 beforeEach(async function (){

  Fitup = await ethers.getContractFactory("Fitup");
  fitup = await Fitup.deploy();
  await fitup.deployed();
  [owner, addr1, addr2,  organisation, organisation2] = await ethers.getSigners();


  await fitup.addNgo("CODE", organisation.address)
  await fitup.createBet(
    organisation.address, value);


 })
  it("Should create a BET", async () => {
  
    console.log(owner.address)
    expect(await fitup.createBet(organisation.address, value)).to.emit(fitup, "BetCreated").withArgs(owner.address, organisation.address, 1)

});
  // it("Should add a NGO", async () => {

  //   await expect(fitup.addNgo(("UN", organisation2.address, "frf"))).to.emit(fitup, "NgoAdded").withArgs("UN", organisation2.address,"dmskmn")


  // })
  // it("Should payout a bet to a NGO", async () => {
  //   expect(await fitup.payoutBet(false, owner.address)).to.emit(fitup, "BetPayout").withArgs(owner.address, false, organisation.address, 100000000)
  // })
  // it("Should payout a bet to the creator of the bet", async () => {
  //   expect(await fitup.payoutBet(true, owner.address)).to.emit(fitup, "BetPayout").withArgs(owner.address, true, organisation.address, 100000000)
  // })

  it("Should check if NGO exist", async ()=>{
    
    const ngoExist = await fitup.doesNgoExist(organisation.address)
    expect(ngoExist).to.be.equal(true)
    
    
  })

  it("Should retun a bet", async ()=>{

  const bet = await fitup.getBet(owner.address)
  expect(bet.organisation).to.equal(organisation.address)


  })
});


