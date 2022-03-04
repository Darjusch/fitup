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
      
      // Get current Account
      async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        showAccount.innerHTML = account;
      }

      // If account is changed
      window.ethereum.on('accountsChanged', function (accounts) {
        const account = accounts[0];
        showAccount.innerHTML = account;
      })

      const {web3, deployedNetwork, contract, accounts, someOrganisation} = await setupWeb3Contract();
      // Assigning objects to state so we can use it in our functions more easily
      this.setState = {web3, deployedNetwork, contract, accounts, someOrganisation};
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
        const web3 = new Web3("http://127.0.0.1:8545");

        // Get network address
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Fitup.networks[networkId];
        console.log('deployedNetworkAddress: ', deployedNetwork.address);
      
        // Create web3 contract object
        var contract = new web3.eth.Contract(Fitup.abi, deployedNetwork.address);
  
        // Get web3 accounts
        const accounts = await web3.eth.getAccounts();
  
        // Some random address
        const someOrganisation = "0x1F78324b386d7EDa0CFd45947B8796B1F22053F4"
        
        return web3, deployedNetwork, contract, accounts, someOrganisation
}

function createBet() {
  const {accounts, someOrganisation, contract} = this.state;
  contract.methods.createBet(someOrganisation).send({from: accounts[0], value: 1}, function (err, res) {
      if (err) {
          console.log("An error occured", err)
          return
      }
      console.log("Hash of the transaction: " + res)
      console.log(res)
  })
}

function getBet() {
  const {accounts, contract} = this.state;

  contract.methods.getBet(accounts[0]).call(function (err, res) {
      if (err) {
          console.log("An error occured", err)
          return
      }
      console.log("Hash of the transaction: " + res)
      console.log(res)
  })
}

function payoutBet() {
  const {accounts, contract} = this.state;

  contract.methods.payoutBet(true, accounts[0]).send({from: accounts[0]}, function (err, res) {
      if (err) {
          console.log("An error occured", err)
          return
      }
      console.log("Hash of the transaction: " + res)
      console.log(res)
  })
}
export default App;
