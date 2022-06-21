// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IERC20.sol";


contract TestUniswapLiquidity {

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    function addLiquidity (
      address _tokenA,
      address _tokenB,
      uint _amountADesired,
      uint _amountBDesired  
    ) external {
        // transfer the tokens from my wallet to this contract
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountADesired);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountBDesired);

        // approve ROUTER to spend _amoutA on my behalf
        IERC20(_tokenA).approve(UNISWAP_V2_ROUTER, _amountADesired);
        IERC20(_tokenB).approve(UNISWAP_V2_ROUTER, _amountBDesired);

        (uint amountA, uint amountB, uint liquidity ) = 
        IUniswapV2Router(UNISWAP_V2_ROUTER).addLiquidity(
            _tokenA,
            _tokenB,
            _amountADesired,
            _amountBDesired,
            1,
            1,
            address(this),
            block.timestamp
        );
            
        }
}