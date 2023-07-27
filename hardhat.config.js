require('dotenv').config()
const {REACT_APP_API_URL, REACT_APP_PRIVATE_KEY}  = process.env
require("@nomiclabs/hardhat-ethers");
module.exports = {
   paths: {
      artifacts: './src/artifacts',
      cache: './src/cache',
    },
   solidity: "0.5.16",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: REACT_APP_API_URL,
         accounts: [`0x${REACT_APP_PRIVATE_KEY}`]
      }
   },
}