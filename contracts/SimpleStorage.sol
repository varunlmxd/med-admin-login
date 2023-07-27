pragma solidity ^0.5.16;

contract SimpleStorage {
  uint public number = 0;
  mapping(uint => string) public data;
  event dataInserted(
    uint id,
    string ipfsHash
  );
  function set(string memory x) public {
    number++;
    data[number] = x;
    emit dataInserted(number,x);
  }
}
