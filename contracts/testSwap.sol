// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

// Swap an exact amount of input tokens for as many output tokens as possible.
// *Dealine is the last timestamp that this trade is valid


// *TokenIn we are going to use DAI / token out we going to use WTBC
// *TokenIN(DAI) to WETH and WETH to TokenOUT (WBTC)

import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IERC20.sol";

contract testSwap {
    
    uint256 deadline;
    // the addrress of UNISWAPV2ROUTER that allows us to do the trade between tokens
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    // function to swap tokens
    // _deadline is the time during which the transaction should be executed
    function swap (
        address _tokenIn,
        address _tokenOut,
        uint _amoutIn,
        address _to,
        uint _deadline
    ) external {
        // transfer the amount in tokens from msg.sender to this contract
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amoutIn);
        // By calling IERC20 approve you allow the uniswap contract to spend the tokens in the contracts
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amoutIn);

        // Path is a list of tokens address that we want this trade to happen.
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn; // DAI
        path[1] = _tokenOut; // WETH
        
        
        // Calculating the amount of tokens we should be exptecting on doing a swap/amountOut
        uint256[] memory amountsExpected = 
                        IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(
                _amoutIn,
                path
        );
        

        // Do the swap
        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
            amountsExpected[0],
            (amountsExpected[1]*990/1000), // accepting a splippage of 1%;
            path,
            _to,
            _deadline
        );
    }
}





