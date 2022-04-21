# fitup
Make your self accountable by betting on your goals!


**Table of Contents**
- [Used technologies and Prerequisites](#used-technologies-and-prerequisites)
- [Clone Repo](#clone-repo)
  - [Deploy](#deploy)
    - [Locally](#1.locally)
    - [Custome Netwrok](#2.custome-network)
- [Verify](#verify)
- [Test](#test) 
- [Contracts deployed and verified](#contracts-deployed-and-verified)
- [Runnig Light Node](#running-light-node)

    



### Used technologies and Prerequisites

-node:14.x0


-hardhat: ^2.9.1


### Clone Repo

``` git clone https://github.com/Darjusch/fitup ```

In the root folder of the project:

1. ``` npm i ```

## Deploy


#### 1.Locally : ``` npx hardhat run scripts/deploy.js ```

#### 2.Custome Network :
:information_source: Make sure to provide netwrok_url and account secerts to secret.js or env-var before trying to deploy on custome or remote networ network
 ``` npx hardhat run scripts/deploy.js --network NETWORKNAME ```

## Verify

Verify contract automatically using etherscan

1. ``` npx hardhat --network NETWORKNAME verify CONTRACTADDRESS ```

## Test

1. ``` npx hardhat test ```

2. Check test coverage ``` npx hardhat coverage ```

## Contracts deployed and verified

(22.03.2022)

Ropsten: ``` 0xd02C26Ae5c09F13186dbf670e29C003A6c01b917 ```
PolygonMumbai: ``` 0x94b3B62495a62E6806220d614af0dc261624e01f ```
BinanceTestnet: ``` 0x068E565aaE43979aB6dfE58FdBE67E98477Ef1D9 ```
ArbitrumTestnet: ``` 0x068E565aaE43979aB6dfE58FdBE67E98477Ef1D9 ```



## Running Light Node
:information_source: Running EVM light node is not necceassry but it gives you insight on how the etherum network manage transaction to test the smart contract locally before deploymnent.

:information_source: For more Info about etherum light node please visit [Geth](https://geth.ethereum.org/)*

1- Install geth following [this](https://geth.ethereum.org/docs/install-and-build/installing-geth) guide

2- Initializing Clef    ``` init clef ```
:information_source: *(Clef is an Account managment tool to sign transactions) for more infor visit [here](https://geth.ethereum.org/docs/clef/tutorial)*

3- To run the light node, follow [this](https://geth.ethereum.org/docs/getting-started) guide step by step!

:information_source: *The guide above use Goerli testnet! If you want to use different testnet like ropsten or even the Etherum mainnet follow the step below:*

  1. Change the cainID when starting clef! Find a list of chainIds [here](https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/)
  ```clef --keystore geth-tutorial/keystore --configdir geth-tutorial/clef --chainid {CHAIN_ID_NUMBER}```
  2. Change the network name when starting Geth!
    ``` geth --datadir geth-tutorial --signer=geth-tutorial/clef/clef.ipc --{NETWORK_NAME} --syncmode light --http```
 :information_source:*Make sure the cainId and network name Matches!!*
