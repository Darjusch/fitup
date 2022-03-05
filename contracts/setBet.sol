// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract setBetContract {


    uint256 public totalBetCount = 0;
    uint256 public activeBetCount = 0;
    bool active=true;


    
    

   struct Bet {
        uint256 amount;
        address organisation;
        uint256 created_at;
        bool active;
       

    }
    mapping (address => Bet) public bets;





    function createBet(uint256 amount,address organisation
     ) external {
        validateBet();
        incrementCount();
        address creator = msg.sender;
        uint256 created_at = block.timestamp;

        bets[creator] = Bet(amount, organisation, created_at, active);
        
    }

    function validateBet() internal view {
        require(msg.value > 0, "The bet value has to be bigger than 0");

    }

    function incrementCount() internal {
        totalBetCount +=1;
    }
    

  





}