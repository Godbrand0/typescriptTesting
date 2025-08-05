// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface Itodo {
    struct Todo{
        string title;
        string description;
        address owner; 
        uint UID;
    }

    function addTodo(string memory _title, string memory _description) external ;
    function updateTodo(string memory _Newtitle, string memory _Newdescription, uint _UID) external ;
    function getByAddress(address _owner) external view returns(Todo[] memory);
    function getAll() external view returns(Todo[] memory);
    
}