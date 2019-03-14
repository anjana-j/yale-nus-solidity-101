pragma solidity >=0.4.21 <0.6.0;
//pragma solidity ^0.5.0;

contract SimpleStorage {
  
   // modifier
    modifier OnlyOwner {
        require(msg.sender == AddedBy);
        _;
    }

    address public AddedBy  = msg.sender;

    // event
    event StorageEvent(
        uint indexed HashedString
    );
  
  uint storedData;

  function set(uint x) public {
    storedData = x;
    emit StorageEvent(x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
