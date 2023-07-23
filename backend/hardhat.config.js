require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('dotenv').config();

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [ PRIVATE_KEY ]
    }
  }
};