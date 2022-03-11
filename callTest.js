
import setBet from "./build/contracts/setBet.json";
import Web3 from "web3";



const web3 = new Web3("http://127.0.0.1:7545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = setBet.networks[networkId];

console.log('deployedNetworkAddress: ', deployedNetwork.address);

var contract = new web3.eth.Contract(setBet.abi, deployedNetwork.address);
const accounts = await web3.eth.getAccounts();

const someOrganisation = "0x1eF43B1b274653Bc99FBaBcE58740929399c5F4D"


function createBet(){
    console.log("running createBet")
    contract.methods.createBet(someOrganisation).send( 
        {from: "0x5Ab50d15B49c92e34027f381cB9Cf853402BeCA6", value:10, gas:3000000},function(err,res){
        if(err){
                        console.log("An erroror" + err)
                        return
                    }

        console.log(res)
        getBalance();

    })
}
async function getBalance(){
   const balance=  await web3.eth.getBalance("0x3b751Bf7670484e80eF186336B8A77d599c0640F")
   const bets = await contract.methods.bets("0x5Ab50d15B49c92e34027f381cB9Cf853402BeCA6")

}

createBet();


// function payable(){
//     console.log("Payable runnoig")
//     contract.methods.deposite().send( {from: web3.eth.accounts[0], value:3}, "f84d7c9be829645cb08793f2826e88e447ffec3e742ae05f8ae350d0278c520c", function(err, res){
//         if(err){
//             console.log("An erroror" + res)
//             return
//         }
//         console.log(res)
//     })
// }


// payable();