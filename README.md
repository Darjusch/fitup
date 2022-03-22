# fitup

Make your self accountable by betting on your goals!

## Setup

``` git clone https://github.com/Darjusch/fitup ```

In the root folder of the project:

1. ``` npm i ```

## Deploy

1. Locally ``` npx hardhat run scripts/deploy.js ```

2. On Ropsten ``` npx hardhat run scripts/deploy.js --network ropsten ```

3. On anyother network specified in the hardhatconfig ``` npx hardhat run scripts/deploy.js --network NETWORKNAME ```

## Verify

Verify contract automatically using etherscan

1. ``` npx hardhat --network NETWORKNAME verify CONTRACTADDRESS ```

## Test

1. ``` npx hardhat test ```

## Contracts deployed and verified

(22.03.2022)

Ropsten: ``` 0xd02C26Ae5c09F13186dbf670e29C003A6c01b917 ```
PolygonMumbai: ``` 0x94b3B62495a62E6806220d614af0dc261624e01f ```
BinanceTestnet: ``` 0x068E565aaE43979aB6dfE58FdBE67E98477Ef1D9 ```
ArbitrumTestnet: ``` 0x068E565aaE43979aB6dfE58FdBE67E98477Ef1D9 ```
