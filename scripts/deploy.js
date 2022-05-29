const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const UniswapContract = await hre.ethers.getContractFactory("Uniswap");
  const uniswapContract = await UniswapContract.deploy();

  await uniswapContract.deployed();

  console.log("Uniswap deployed to:", uniswapContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
