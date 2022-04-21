require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
let secrets = require("./secrets");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-web3");
require('solidity-coverage');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    var balance = await web3.eth.getBalance(account.address)
    console.log(`${account.address} - ${web3.utils.fromWei(balance, "ether")} ETH`);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: secrets.ropsten_url,
      accounts: [secrets.key]
    },
    mumbai: {
      url: secrets.mumbai_url,
      accounts: [secrets.key]
    },
    binance_testnet: {
      url: secrets.binance_testnet_url,
      accounts: [secrets.key]
    },
    arbitrum_testnet: {
      url: secrets.arbitrum_testnet_url,
      accounts: [secrets.key]
    },
    light_node: {
      url: "http://127.0.0.1:8545",
      accounts: [secrets.key]
    }
  },
    etherscan: {
      apiKey: {
        // Ethereum
        ropsten: secrets.etherscan_key,

        // Polygon
        polygonMumbai: secrets.mumbaiscan_key,

        // Binance
        bscTestnet: secrets.bscscan_key,

        // Arbitrum
        arbitrumTestnet: secrets.arbiscan_key
      }

  }
};
