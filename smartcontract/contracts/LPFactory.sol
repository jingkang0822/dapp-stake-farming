//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LPFactory is ERC20 
{
    constructor(string memory _name, string memory _symbol) 
        ERC20(_name, _symbol) { }

    //cliam test 1000 Tst (for testing purpose only !!)
    function claimTst(address testToken) public {
        uint256 tst = 1000000000000000000000;
        require(IERC20(testToken).balanceOf(address(this))>tst ,"pool drained!");
        address recipient = msg.sender;
        uint256 balance = tst;
        IERC20(testToken).transfer(recipient, balance);
    }
}
