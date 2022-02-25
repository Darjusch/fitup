// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Fitup {
    
    address owner;

    struct Bet {
        uint256 amount;
        address organisation; 
    }
    mapping (address => Bet ) bets;

    event BetCreated(address creator, address organisation, uint256 amount);
    event BetPayout(address issuer, bool success, address organisation, uint256 amount);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createBet(address _organisation) external payable {
        require(msg.value > 0, "The bet value has to be bigger than 0");
        bets[msg.sender] = Bet(msg.value, _organisation);
        emit BetCreated(msg.sender, _organisation, msg.value);
    }

    function getBet(address _from) external view returns(Bet memory) {
        return bets[_from];
    }
    
    function payoutBet(bool _success, address _issuer) external onlyOwner {
        // TODO remove bet afterwards
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
}