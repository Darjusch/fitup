import logo from './logo.svg';
import './css/App.css';
import React, { Component } from "react";

import Fitup from "./abi/Fitup.json";
import Web3 from "web3";

class App extends Component {
  componentDidMount = async() => {
    try{

      isMetaMaskOrEthereumCompatible()

      // Connect to Metamask
      const ethereumButton = document.querySelector('.enableEthereumButton');
      const showAccount = document.querySelector('.showAccount');
      
      ethereumButton.addEventListener('click', () => {
        getAccount();
      });
      
      var currentAccount;

      // Get current Account
      async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];
        showAccount.innerHTML = currentAccount;
      }

      // If account is changed
      window.ethereum.on('accountsChanged', function (accounts) {
        const currentAccount = accounts[0];
        showAccount.innerHTML = currentAccount;
      })

      const {contract} = await setupWeb3Contract();


      // Some random address
      const someOrganisation = "0x1F78324b386d7EDa0CFd45947B8796B1F22053F4"
      

      // Create Bet
      const createBetButton = document.querySelector('.createBetButton');
      createBetButton.addEventListener('click', () => {
        createBet(currentAccount, someOrganisation, contract);
      });

      // Get Bet
      const getBetButton = document.querySelector('.getBetButton');
      getBetButton.addEventListener('click', () => {
        getBet(currentAccount, contract);
      });

      // Payout Bet
      const payoutBetButton = document.querySelector('.payoutBetButton');
      payoutBetButton.addEventListener('click', () => {
        payoutBet(currentAccount, contract);
      });

      contract.events.BetCreated({})
      .on('data', async function(event){
          console.log(`CREATE BET\n Creator: ${event.returnValues.creator}\n Organisation: ${event.returnValues.organisation}\n Amount: ${event.returnValues.amount}`)
      })
      .on('error', console.error);

      contract.events.BetPayout({})
      .on('data', async function(event){
          console.log(`PAYOUT BET\n Issuer: ${event.returnValues.issuer}\n Organisation: ${event.returnValues.organisation}\n Amount: ${event.returnValues.amount}\n Success: ${event.returnValues.success}`)
      })
      .on('error', console.error);
    }
    catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }
  render() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="enableEthereumButton">Enable Ethereum</button>
        <h2>Account: <span className="showAccount"></span></h2>
        <button className="createBetButton">Create Bet</button>
        <button className="getBetButton">Get Bet</button>
        <button className="payoutBetButton">Payout Bet</button>
      </header>
    </div>
  );
}
}
function isMetaMaskOrEthereumCompatible() {
      // Checking if Metamask or ethereum compatible browser is installed
      // https://docs.metamask.io/guide/getting-started.html#basic-considerations
      if (typeof window.ethereum !== 'undefined') {
        if(window.ethereum.isMetaMask){
          console.log('MetaMask is installed!');
        }else{
          console.log("Some other Ethereum compatible browser is installed")
        }
      }
      else{
        console.log("No ethereum compatible browser is installed")
      }
}

async function setupWeb3Contract() {
        // Connect web3 provider 
        // we use ws instead of http to listen to events. ( ws is short for websocket provider)
        const web3 = new Web3("ws://127.0.0.1:8545");

        // Get network address
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Fitup.networks[networkId];
        console.log('deployedNetworkAddress: ', deployedNetwork.address);
      
        // Create web3 contract object
        var contract = new web3.eth.Contract(Fitup.abi, deployedNetwork.address);

        return {web3, deployedNetwork, contract}
}

function createBet(currentAccount, someOrganisation, contract) {
  contract.methods.createBet(someOrganisation).send({from: currentAccount, value: 1}, function (err, res) {
      if (err) {
          alert("Make sure you enabled Ethereum")
          console.log("An error occured", err)
          return
      }
  })
}

function getBet(currentAccount, contract) {
  contract.methods.getBet(currentAccount).call(function (err, res) {
      if (err) {
          alert("Make sure you enabled Ethereum")
          console.log("An error occured", err)
          return
      }
      console.log(`GET BET\n Amount: ${res.amount}\n Organisation ${res.organisation}`)
    })
}

function payoutBet(currentAccount, contract) {
  contract.methods.payoutBet(true, currentAccount).send({from: currentAccount}, function (err, res) {
      if (err) {
          alert("Make sure you enabled Ethereum") 
          console.log("An error occured", err)
          return
      }
  })
}
export default App;
