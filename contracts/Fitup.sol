// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Fitup {

    struct Bet {
        uint256 amount;
        string organisation;
    }
    mapping (address => Bet ) bets;

    event BetCreated(address creator, string organisation, uint256 amount);

    function createBet(string memory _organisation) public payable {
        require(msg.value > 0, "The bet value has to be bigger than 0");
        bets[msg.sender] = Bet(msg.value, _organisation);
        emit BetCreated(msg.sender, _organisation, msg.value);
    }
}