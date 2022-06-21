const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");


const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;


describe("Swap test", ()=> {
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const MyAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
    const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";

    let swapContract;

    beforeEach(async()=> {
        const swapFactory = await ethers.getContractFactory("testSwap");
        swapContract = await swapFactory.deploy();
        await swapContract.deployed();
    });

    it("Should swap", async()=> {

      // impersonate acc
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [DAIHolder],
    });

      const impersonateSigner = await ethers.getSigner(DAIHolder);

      // Create an instance of DAI token;
      const DAIContract = new ethers.Contract(DAIAddress, ERC20ABI, impersonateSigner);
      const DAIHolderBalance = await DAIContract.balanceOf(impersonateSigner.address);
      await DAIContract.approve(swapContract.address, DAIHolderBalance);


      // Create an Instance of WETH contract
      const WETHContract = new ethers.Contract(WETHAddress, ERC20ABI, impersonateSigner);
      const myWETHBalance = await WETHContract.balanceOf(MyAddress);
      console.log("Initial balance", ethers.utils.formatUnits(myWETHBalance.toString()));

    
      // Get the current Block
      const latestBlock = await ethers.provider.getBlockNumber();
      const timestamp = (await ethers.provider.getBlock(latestBlock)).timestamp;

    
      // Execute the swap 
      await swapContract.connect(impersonateSigner).swap(
          DAIAddress,
          WETHAddress,
          DAIHolderBalance,
          MyAddress,
          timestamp + 100 // adding 100 seconds to the current block
    );

      const myWETHBalance_updated = await WETHContract.balanceOf(MyAddress);
      console.log("Balance after swap", ethers.utils.formatUnits(myWETHBalance_updated.toString()));

      const DAIHolderBalance_updated = await DAIContract.balanceOf(impersonateSigner.address);
      expect(DAIHolderBalance_updated.eq(BigNumber.from(0))).to.be.true;
      expect(myWETHBalance_updated.gt(myWETHBalance)).to.be.true;

    });

});

