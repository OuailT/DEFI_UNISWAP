require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();



/**
 * @type import('hardhat/config').HardhatUserConfig
*/


module.exports = {
  defaultNetwork: "hardhat",
  
  paths: {
    artifacts: './src/artifacts'
  },

  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/ke4JgGIwAJQsbEABt_1Y6atV1zXhAqA_",
        blockNumber: 14390000
      }
    }
  },

  solidity: {
    version : "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs:200
      }
    }
  }

};
