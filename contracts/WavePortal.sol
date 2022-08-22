// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

pragma experimental ABIEncoderV2;
//in one of the function we are accessing two levels of dynamcic arrays 

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message that  user want to sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    //to hold all the waves anyone ever sends to me
    Wave[] waves;

    constructor() {
        console.log("Jay shree RAM: ");
    }

    
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        
         // This is where I actually store the wave data in the array.
         
        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

   
    function getAllWaves() public view returns (Wave[] memory) {
        // this is why we need "pragma experimental ABIEncoderV2;"

        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}