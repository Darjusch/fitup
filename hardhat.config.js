require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
let secrets = require("./secrets");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

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
