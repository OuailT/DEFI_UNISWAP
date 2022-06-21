const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");
const {expect} = require("chai");
const { pow } = require("../src/utils"); 



const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;


describe("Add Liquidity", ()=> {
    
    // const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    // const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    // const MyAddress = "0x1db29e491c10b0C9940fA46B81Ee09AE3cd738Be";
    // const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
    // const WETH_WHALE = "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268"; <=
    // const DAI_WHALE=  "0xF977814e90dA44bFA03b6295A0616a897441aceC"; <= 
    const TOKENS_WHALE= "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const SandBoxTokenAddress = "0x3845badAde8e6dFF049820680d1F14bD3903a5d0";
    const ThetaTokenAddress = "0x3883f5e181fccaF8410FA61e12b59BAd963fb645";
    const TOKEN_A_AMOUNT = pow(1, 18);
    const TOKEN_B_AMOUNT = pow(1, 18);

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
        let sandBoxTokenContract = new ethers.Contract(SandBoxTokenAddress, ERC20ABI, ImpersonateSigner);
        let sandBoxTokenBalance = await sandBoxTokenContract.balanceOf(ImpersonateSigner.address);
        sandBoxTokenContract.approve(LiquidityContract.address, TOKEN_A_AMOUNT);
        console.log("Cocos Holder Balance before", ethers.utils.formatUnits(sandBoxTokenBalance.toString()));


        // Create an Instance of Theta Token Contract
        let ThetaTokenContract = new ethers.Contract(ThetaTokenAddress, ERC20ABI, ImpersonateSigner);
        let ThetaTokenBalance = await ThetaTokenContract.balanceOf(ImpersonateSigner.address);
        ThetaTokenContract.approve(LiquidityContract.address, TOKEN_B_AMOUNT);
        console.log("Sand Box Balance before", ethers.utils.formatUnits(ThetaTokenBalance.toString()));


        // Add liquidity
        await LiquidityContract.connect(ImpersonateSigner).addLiquidity(
            SandBoxTokenAddress,
            ThetaTokenAddress,
            TOKEN_A_AMOUNT,
            TOKEN_B_AMOUNT);

    console.log("Sand Box Balance after", ethers.utils.formatUnits(ThetaTokenBalance.toString()));
    console.log("Cocos Holder Balance after", ethers.utils.formatUnits(sandBoxTokenBalance.toString()));




    })


})
