// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract setBet {


    uint256 public totalBetCount = 0;
    uint256 public activeBetCount = 0;
    bool active=false;
 


    
    

   struct Bet {
    
        uint256 amount;
        address organisation;
        uint256 created_at;
        bool active;
 
       

    }
    mapping (address => Bet) public bets;



    // fallback()  external payable {}
    // receive() external payable {}

    function createBet(address organisation
     ) payable external {
        validateBet();
        incrementCount();
        uint256 amount = msg.value;
        address creator = msg.sender;
        uint256 created_at = block.timestamp;
        active = true;

        bets[creator] = Bet(amount, organisation, created_at, active);
        
    
    }

    // function deposite () payable public {
    //     require(msg.value == amount);
    // }

    function validateBet() internal view {
        require(msg.value > 0, "The bet value has to be bigger than 0");
        // require(origanisation)

    }

    function incrementCount() internal {
        totalBetCount +=1;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    



    

  





}