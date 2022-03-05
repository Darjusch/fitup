// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract setBetContract {


    uint256 public betCount = 0;
     bool active=true;
    

   struct Bet {
        uint256 amount;
        address organisation;
        address creator;
        uint256 created_at;
        bool active;
       

    }
    mapping (address => Bet) bets;

    

  





}