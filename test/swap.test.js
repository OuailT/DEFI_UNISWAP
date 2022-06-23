const {expect} = require("chai");
const { ethers } = require("hardhat");


    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


describe("Swap Examples", () => {

    let swapExamples;
    let dai;
    let weth9;
    let usdc;
    let accounts;
    let myBalance;

    before(async ()=> {
       
    // Get accounts
    accounts = await ethers.getSigners(1)
    
    // Deploy Swap Examples smart contract
    let SwapExamples = await ethers.getContractFactory("swapExamples");
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();

    // We Initial tokens
    weth9 = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
    
    });



    it("swapExactInputSingle", async()=> {
        const amountIn = 10n ** 18n; // Equivalent of 1 * 18

        // Deposit ETH and Approve the smart contract to spend my ETH on my behalf
        weth9.deposit({value : amountIn});
        weth9.approve(swapExamples.address, amountIn);
        
        // Do the swap
        await swapExamples.swapExactInputSingle(amountIn);
        console.log("Dai Balance : ", await dai.balanceOf(accounts[0].address));

    });

    // Executing swap with user conditions
    it("swapExactOutputSingle", async ()=> {
        const amountInMaximum = 10n ** 18n; // 1 WETH
        const amountOut = 100n * 10n ** 18n; // 100 DAI

        await weth9.deposit({value : amountInMaximum});
        await weth9.approve(swapExamples.address, amountInMaximum);

        await swapExamples.swapExactOutputSingle(amountOut, amountInMaximum);
        
        console.log(" Dai Balance :", await dai.balanceOf(accounts[0].address));
    });


    it("swapExactInputMultihop", async () => {

        const wethAmountIn = 10n ** 18n;

        await weth9.deposit({value : wethAmountIn});
        await weth9.approve(swapExamples.address, wethAmountIn);

        await swapExamples.swapExactInputMultihop(wethAmountIn);

        console.log("Dai Balance : ", await dai.balanceOf(accounts[0].address));
    });


});

