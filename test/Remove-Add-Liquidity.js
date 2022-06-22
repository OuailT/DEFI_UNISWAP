const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");
const {expect} = require("chai");
const { pow, sendEther } = require("../src/utils"); 



const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;


describe("Add Liquidity", ()=> {
    
    // const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    // const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    // const MyAddress = "0x1db29e491c10b0C9940fA46B81Ee09AE3cd738Be";
    // const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
    // const WETH_WHALE = "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268"; <=
    // const DAI_WHALE=  "0xF977814e90dA44bFA03b6295A0616a897441aceC"; <= 
    const TOKENS_WHALE= "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268";
    const WETHAddress = "0xa117000000f279D81A1D3cc75430fAA017FA5A2e";
    const UniSwapTokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

    let LiquidityContract;

    beforeEach(async()=> {
        let liquidityContract = await ethers.getContractFactory("TestUniswapLiquidity");
        LiquidityContract = await liquidityContract.deploy();
        LiquidityContract.deployed();

    });


    it("Should add liquidity", async ()=> {

        //Impersonate Account
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [TOKENS_WHALE]
        });

        const ImpersonateSigner = await ethers.getSigner(TOKENS_WHALE);


        // Create an Instance of Sandbox Token Contract
        let WETHContract = new ethers.Contract(WETHAddress, ERC20ABI, ImpersonateSigner);
        let WETHContractBalance = await WETHContract.balanceOf(ImpersonateSigner.address);
        WETHContract.approve(LiquidityContract.address, WETHContractBalance);
        console.log("WETH balance before", ethers.utils.formatUnits(WETHContractBalance.toString()));


        // Create an Instance of Theta Token Contract
        let UniSwapTokenContract = new ethers.Contract(UniSwapTokenAddress, ERC20ABI, ImpersonateSigner);
        let UniswapBalance = await UniSwapTokenContract.balanceOf(ImpersonateSigner.address);
        UniSwapTokenContract.approve(LiquidityContract.address, UniswapBalance);
        console.log("Uniswap Balance before", ethers.utils.formatUnits(UniswapBalance.toString()));


        // Add liquidity
        await LiquidityContract.connect(ImpersonateSigner).addLiquidity(
            WETHAddress,
            UniSwapTokenAddress,
            WETHContractBalance,
            UniswapBalance);

    console.log("Uniswap Balance after", ethers.utils.formatUnits(UniswapBalance.toString()));
    console.log("WETH balance after", ethers.utils.formatUnits(WETHContractBalance.toString()));

    })


})
