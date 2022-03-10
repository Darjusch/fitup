
import Fitup from "./build/contracts/Fitup.json";
import Web3 from "web3";

const web3 = new Web3("http://127.0.0.1:8545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = Fitup.networks[networkId];

console.log('deployedNetworkAddress: ', deployedNetwork.address);

var contract = new web3.eth.Contract(Fitup.abi, deployedNetwork.address);
const accounts = await web3.eth.getAccounts();

const someOrganisation = "0x1F78324b386d7EDa0CFd45947B8796B1F22053F4"

function createBet() {
    console.log("Running createBet")
    contract.methods.createBet(someOrganisation).send({from: "0xB3479377859d54feb715cEC2EA19b0Ea411c9b36", value: 1}, function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("Hash of the transaction: " + res)
        getBet()
        getBalance();
        getBetCount()
    })
}

function getBet() {
    contract.methods.getBet("0xB3479377859d54feb715cEC2EA19b0Ea411c9b36").call(function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("Bet Data: " + res)
       
    })
}

function payoutBet() {
    contract.methods.payoutBet(true, accounts[0]).send({from: accounts[0]}, function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("Hash of the transaction: " + res)
        console.log(res)
    })


}
async function getBalance(){
   const balance=  await web3.eth.getBalance("0xB3479377859d54feb715cEC2EA19b0Ea411c9b36")
   
    console.log(balance)


}

async function getBetCount(){
    const betCount = await contract.methods.getBetCount();
    console.log(betCount)

}

createBet()

