
import Fitup from "./build/contracts/Fitup.json";
import Web3 from "web3";


const web3 = new Web3("http://127.0.0.1:8545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = Fitup.networks[networkId];

console.log('deployedNetworkAddress: ', deployedNetwork.address);

var contract = new web3.eth.Contract(Fitup.abi, deployedNetwork.address);
const accounts = await web3.eth.getAccounts();

const someOrganisation = "0xCD5705135bB0A5A50aA714027Ab75975Bb75A963"

function createBet() {
    console.log("Running createBet")
    contract.methods.createBet(someOrganisation).send({ from: "0x3006212ef095D93936Cb88EB469Cc1f2361825c7", value:2000000000000000000, gas:3000000 }, function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("Hash of the transaction: " + res)
        // getBet()
        // getBalance();
        // getBetCount()
    })
}

async function getBet() {
    await contract.methods.getBet("0x3006212ef095D93936Cb88EB469Cc1f2361825c7").call(function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("Bet Data: " + res)

    })

}

// function getBalance() {

//     contract.methods.getBalance().call(function (err, res) {
//         if (err) {
//             console.log("An error occured", err)
//             return
//         }
//         console.log("Bet Data: " + res)

//     })

// }





// function payoutBet() {
//     contract.methods.payoutBet(true, accounts[0]).send({ from: accounts[0] }, function (err, res) {
//         if (err) {
//             console.log("An error occured", err)
//             return
//         }
//         console.log("Hash of the transaction: " + res)
//         console.log(res)
//     })


// }


// async function getBetCount() {
//     const betCount = await contract.methods.getBetCount().call(function (err, res) {
//         if (err) {
//             console.log("An error occured", err)
//             return
//         }
//         console.log("Bet Data: " + res)

//     })


// }


async function addNgo(){
  const ngo=  await contract.methods.addNgo("CODE", "0x62497C5D0264dDBf2337fE2C08ac9A0E16360a03").send({from: "0x6be2AD9611e1585f89D56C74DDcB75484Cd893Ba"}, function(err, res){
        if (err) {
            console.log("An error occured", err)
            return
        }
        // console.log("ADDED NGO " + res)
        
    })
    console.log(ngo)
}


addNgo();