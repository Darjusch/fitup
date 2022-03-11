// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.11;

contract Fitup {
    address owner;
    uint256 public totalBetCount = 0;
    uint256 public activeBetCount = 0;
    bool active = false;

    struct Ngo {
        string name;
        address organisation;
    }

    struct Bet {
        uint256 amount;
        address organisation;
        uint256 created_at;
        bool active;
    }

    mapping(address => Bet) public bets;

    event BetCreated(address creator, address organisation, uint256 amount);
    event BetPayout(
        address issuer,
        bool success,
        address organisation,
        uint256 amount
    );
    mapping (address => Bet ) bets;
    Ngo[] ngos;

    event BetCreated(address creator, address organisation, uint256 amount);
    event BetPayout(address issuer, bool success, address organisation, uint256 amount);
    event NgoAdded(string name, address organisation);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createBet(address organisation) external payable validateBet {
        incrementCount();
        incrementActiveCount();
        uint256 amount = msg.value;
        address creator = msg.sender;
        uint256 created_at = block.timestamp;
        active = true;

        bets[creator] = Bet(amount, organisation, created_at, active);
        emit BetCreated(msg.sender, organisation, msg.value);
    }

    function getBet(address _from) external view returns(Bet memory) {
        require(bets[_from].amount > 0, "No Bet exists for that Address");
        return bets[_from];
    }

    function payoutBet(bool _success, address _issuer) external onlyOwner {
        require(bets[_issuer].amount > 0);
        uint256 _amount = bets[_issuer].amount;
        address _organisation = bets[_issuer].organisation;
        if (_success == true) {
            payable(_issuer).transfer(_amount);
        } else {
            payable(_organisation).transfer(_amount);
        }
        emit BetPayout(_issuer, _success, _organisation, _amount);
    }

    function incrementCount() internal {
        totalBetCount += 1;
    }

    function incrementActiveCount() internal {
        activeBetCount += 1;
    }

    modifier validateBet() {
        require(msg.value > 0, "The bet value has to be bigger than 0");
        _;
    }
}
    function addNgo(string memory name, address organisation) external onlyOwner {
        ngos.push(Ngo(name, organisation));
        emit NgoAdded(name, organisation);
    }
}
