const Fitup = artifacts.require("Fitup");
const {expect, use} = require("chai");
const ethers = require("ethers");
const { solidity } = require("ethereum-waffle");

contract("Fitup", accounts => {
    use(solidity);
    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const organisation = accounts[3]; //Represents the organisation we donate to
    const organisation2 = accounts[4]
    const one_eth = ethers.utils.parseEther('1');

    let fitup;
    before( async () => {
        fitup = await Fitup.deployed();
        await fitup.addNgo("CODE", organisation);
    });
    beforeEach( async () => {
        await fitup.createBet(
            organisation, {
            from: account_one,
            value: one_eth
        });

    });
    it('creates a bet', async () => {
        bet = await fitup.getBet(account_one);
        expect(bet.organisation).to.equal(organisation);
        expect(bet.amount).to.equal(one_eth);
    });
    it('lost a bet', async() => {
        let {before, after} = await beforeAfterPayout(organisation, false) // bet lost
        expect(before).to.be.lessThan(after);
    });
    it('won a bet', async() => {
        let {before, after} = await beforeAfterPayout(account_one, true) // bet won
        expect(before).to.be.lessThan(after);
    });
    async function beforeAfterPayout(from, result) {
        const before = Number(ethers.utils.formatEther(await web3.eth.getBalance(from)));
        await fitup.payoutBet(result, account_one);
        const after = Number(ethers.utils.formatEther(await web3.eth.getBalance(from)));
        return {before, after};
    }

    it("Add NGO", async()=>{
        ngo = await fitup.addNgo( "UN", organisation2);
        expect(await fitup.doesNgoExist(organisation2)).to.be.equal(true)
        // expect(ngo.organisation).to.be.equal(organisation2)

    })
})

