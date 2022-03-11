// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;


contract Recive {

   string public message = "Helloworld";


   function readValue () public view  returns ( string memory) {
      return message;
   }

   function update (string memory newMessage) public returns ( string memory)  {
      message = newMessage;
      return message;
      }
      


}

