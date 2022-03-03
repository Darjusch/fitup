// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract SimpleContract {

    uint256 public balance = 0;

    function updateBalance(uint256 _newBalance) public {
        balance = _newBalance;
    }
}