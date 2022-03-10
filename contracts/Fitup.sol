// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Fitup {
    
    address owner;
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

    event BetCreated(address creator, address organisation, uint256 amount);
    event BetPayout(address issuer, bool success, address organisation, uint256 amount);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createBet(address organisation
     ) payable external {
        validateBet();
        incrementCount();
        uint256 amount = msg.value;
        address creator = msg.sender;
        uint256 created_at = block.timestamp;
        active = true;

        bets[creator] = Bet(amount, organisation, created_at, active);
        emit BetCreated(msg.sender, organisation, msg.value);
    
    }


    function getBet(address _from) external view returns(Bet memory) {
        return bets[_from];
    }
    
    function payoutBet(bool _success, address _issuer) external onlyOwner {
        require(bets[_issuer].amount > 0);
        uint256 _amount = bets[_issuer].amount;
        address _organisation = bets[_issuer].organisation;
        if(_success == true) {
            payable(_issuer).transfer(_amount);
        }
        else {
            payable(_organisation).transfer(_amount);
        }
        emit BetPayout(_issuer, _success, _organisation, _amount);
    }


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

    function getBetCount() public view returns (uint ){
        return totalBetCount;
        
    }
    
}
