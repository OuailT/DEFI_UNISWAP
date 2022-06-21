const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");
const {expect} = require("chai");
const { hexStripZeros } = require("ethers/lib/utils");



const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;


describe("Add Liquidity", ()=> {
    
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const MyAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
    const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
    const WETH_WHALE = "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268";
    const DAI_WHALE=  "0xF977814e90dA44bFA03b6295A0616a897441aceC";
    const TOKENS_WHALE= "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const USDT_WHALE= "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const CocosTokenAddress = "0x0C6f5F7D555E7518f6841a79436BD2b1Eef03381";
    const ThetaTokenAddress = "0x3883f5e181fccaF8410FA61e12b59BAd963fb645";
    const WBTC_WHALE= "0xF977814e90dA44bFA03b6295A0616a897441aceC";

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


        // Create an Instance of Cocos Token Contract
        let CocosTokenContract = new ethers.Contract(CocosTokenAddress, ERC20ABI, ImpersonateSigner);
        let CocosHolderBalance = await CocosTokenContract.balanceOf(ImpersonateSigner.address);
        CocosTokenContract.approve(LiquidityContract.address, CocosHolderBalance);
        console.log("Cocos Holder Balance", ethers.utils.formatUnits(CocosHolderBalance.toString()));


        // Create an Instance of Theta Token Contract
        let ThetaTokenContract = new ethers.Contract(ThetaTokenAddress, ERC20ABI, ImpersonateSigner);
        let ThetaTokenBalance = await ThetaTokenContract.balanceOf(ImpersonateSigner.address);
        ThetaTokenContract.approve(LiquidityContract.address, ThetaTokenBalance);
        console.log("Theta Token Balance", ethers.utils.formatUnits(ThetaTokenBalance.toString()));



        // Get the Lasted block
        const latestBlock = await ethers.provider.getBlockNumber();
        const getBlockNumber = (await ethers.provider.getBlock(latestBlock)).timestamp;
        console.log(getBlockNumber);


    })


})
