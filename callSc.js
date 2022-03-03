
import Recive from "./build/contracts/Recive.json";
import Web3 from "web3";

//0xA909fAf21439FAA33d4a3d2a060938a526B54C78

const web3 = new Web3("http://127.0.0.1:7545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = Recive.networks[networkId];

console.log('deployedNetworkAddress: ', deployedNetwork.address);

var contract = new web3.eth.Contract(Recive.abi, deployedNetwork.address);
const accounts = await web3.eth.getAccounts();


// async function CallSmart(){
//     console.log("Running CallSmart contract")
//     const Update = await Update()
//     const Read = await Read()

// }



const value = "Different"
contract.methods.update(value).send({from: "0xeA31cf7d3cDD15F6d5b188Eaeb19717666929fB3"}, function (err, res) {

    if (err) {

        console.log("An error occured", err)

        return

    }

    console.log("Hash of the transaction: " + res)
    console.log(res)


    }) 

    


      


// async function Read(){
//     contract.methods.readValue().call(function (err, res) {
    
//         if (err) {
        
//           console.log("An error occured", err)
      
//           return
      
//         }
      
//         console.log("The balance is: ", res)
//         return res
      
//       })
// }


