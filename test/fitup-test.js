const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Fitup', function () {
  let Fitup
  let fitup
  let owner
  let addr1
  let organisation
  let organisation2
  const value = { value: ethers.utils.parseEther('1.0') }
  const one_ether = ethers.utils.parseEther('1.0')
  beforeEach(async function () {
    Fitup = await ethers.getContractFactory('Fitup')
    fitup = await Fitup.deploy()
    await fitup.deployed()
    ;[
      owner,
      addr1,
      addr2,
      organisation,
      organisation2
    ] = await ethers.getSigners()

    await fitup.addNgo('CODE', organisation.address)
    await fitup.createBet(organisation.address, value)
  })
  it('Should create a BET', async () => {
    await expect( fitup.createBet(organisation.address, value))
      .to.emit(fitup, 'BetCreated')
      .withArgs(owner.address, organisation.address, one_ether)
  })
  it('Should create a BET without increment', async () => {
    await expect( fitup.createBetWithoutIncrement(organisation.address, value))
      .to.emit(fitup, 'BetCreatedWithoutIncrement')
      .withArgs(owner.address, organisation.address, one_ether)
  })
  it('Should create a BET without increment and without variables', async () => {
    await expect( fitup.createBetWithoutIncrementAndVariables(organisation.address, value))
      .to.emit(fitup, 'BetCreatedWithoutIncrementAndVariables')
      .withArgs(owner.address, organisation.address, one_ether)
  })
  it('Should add a NGO', async () => {
    await expect( fitup.addNgo('UN', organisation2.address))
      .to.emit(fitup, 'NgoAdded')
      .withArgs('UN', organisation2.address)
  })
  it('Should payout a bet to a NGO', async () => {
    await expect( fitup.payoutBet(false, owner.address))
      .to.emit(fitup, 'BetPayout')
      .withArgs(owner.address, false, organisation.address, one_ether)
  })
  it('Should payout a bet to the creator of the bet', async () => {
    await expect( fitup.payoutBet(true, owner.address))
      .to.emit(fitup, 'BetPayout')
      .withArgs(owner.address, true, organisation.address, one_ether)
  })
  it('Should payout a bet without variables to the creator of the bet', async () => {
    await expect( fitup.payoutBetWithoutVariables(true, owner.address))
      .to.emit(fitup, 'BetPayoutWithoutVariables')
      .withArgs(owner.address, true, organisation.address, one_ether)
  })
  it('Should payout a bet without variables public to the creator of the bet', async () => {
    await expect( fitup.payoutBetWithoutVariablesPublic(true, owner.address))
      .to.emit(fitup, 'BetPayoutWithoutVariablesPublic')
      .withArgs(owner.address, true, organisation.address, one_ether)
  })
  it('Should return NGO exists', async () => {
    const ngoExist = await fitup.doesNgoExist(organisation.address)
    expect(ngoExist).to.be.equal(true)
  })
  it('Should return NGO doesn\'t exists', async () => {
    const ngoExist = await fitup.doesNgoExist(owner.address)
    expect(ngoExist).to.be.equal(false)
  })
  it('Should retun a bet', async () => {
    const bet = await fitup.getBet(owner.address)
    expect(bet.organisation).to.equal(organisation.address)
  })
})
