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
    let fitup;
    before( async () => {
        fitup = await Fitup.deployed();
    });
    it('creates a bet', async () => {
        const one_eth = ethers.utils.parseEther('1');
        await fitup.createBet(
            organisation, { 
            from: account_one,
            value: one_eth
        });
        bet = await fitup.getBet(account_one);
        expect(bet.organisation).to.equal(organisation);
        expect(bet.amount).to.equal(one_eth);
    });
})