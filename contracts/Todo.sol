// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./interface.sol";

contract TodoList is Itodo {
    Todo[]   todos;

    mapping(address => Todo[]) private addressTodo;
    mapping(uint256 => uint256) private indexedId;
    uint256 private nextId;

    function addTodo(string memory _title, string memory _description) external  {
        Todo memory newTodo;
       
        newTodo.title = _title;
        newTodo.description = _description;
        newTodo.owner = msg.sender;
       
        newTodo.UID = nextId++;
        todos.push(newTodo);
        addressTodo[msg.sender].push(newTodo);
         indexedId[nextId] = todos.length-1;
        
    }

    function updateTodo(string memory _Newtitle, string memory _Newdescription, uint _UID) external{
        todos[_UID].title= _Newtitle;
        todos[_UID].description= _Newdescription;
        Todo[] storage userTodos = addressTodo[msg.sender];
        for (uint i; i< userTodos.length; i++) 
        {
            if(userTodos[i].UID == _UID){
                userTodos[i].title=_Newtitle;
                userTodos[i].description=_Newdescription;
            }
        }
    }

    function getByAddress(address _owner) external view returns(Todo[] memory) {
        return addressTodo[_owner];
    }
    function getAll() external view returns(Todo[] memory) {
        return todos;
    }
    
}