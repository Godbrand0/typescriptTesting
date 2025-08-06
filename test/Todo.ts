import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { describe } from "mocha";

describe("Todo", function () {
  
  async function deployTodo() {
  
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, accountA] = await hre.ethers.getSigners();

    const Todo = await hre.ethers.getContractFactory("TodoList");
    const todo = await Todo.deploy();

    return { todo, owner, otherAccount, accountA };
  }

  describe("deployment", function(){
    it("test if contract deployed", async function () {
      const { todo, owner, otherAccount, accountA } = await loadFixture(deployTodo);
      const address = await todo.getAddress()
      expect(address).to.be.properAddress
      
    })
  })

  describe("Test for todoList contract", function (){
  it("test to create a new todo", 
    async function () {
      const { todo, owner, otherAccount, accountA } = await loadFixture(deployTodo)
      const title = "study solidity";
      const description = "learn to code";

      await todo.addTodo(title, description);
      const myTodos = await todo.getAll();
      expect(myTodos.length).to.equal(1);
      
      const todo1  = await myTodos[0];

      expect(todo1.title).to.equal(title);
      expect(todo1.description).to.equal(description);
      expect(todo1.title).to.equal(title);
      expect(todo1.UID).to.equal(0);

    const todoMap =  todo.getByAddress(owner.address)
    expect((await todoMap).length).to.equal(1);
    expect((await todoMap)[0].title).to.equal(title);      
    }
  )

  it("test to create multiple todo ", 
    async function () {
      const { todo, owner, otherAccount, accountA } = await loadFixture(deployTodo)
      const title = "study solidity";
      const description = "learn to code";

      await todo.addTodo(title, description);
      const myTodos = await todo.getAll();
      expect(myTodos.length).to.equal(1);
      
      const todo1  = await myTodos[0];

      expect(todo1.title).to.equal(title);
      expect(todo1.description).to.equal(description);
      expect(todo1.title).to.equal(title);
      expect(todo1.UID).to.equal(0);

    const todoMap =  todo.getByAddress(owner.address)
    expect((await todoMap).length).to.equal(1);
    expect((await todoMap)[0].title).to.equal(title);      



     const title2 = "study solidity";
      const description2 = "learn to code";

      await todo.addTodo(title2, description2);
      const myTodos2 = await todo.getAll();
      expect(myTodos2.length).to.equal(2);
      
      const todo2  = await myTodos2[1];

      expect(todo2.title).to.equal(title2);
      expect(todo2.description).to.equal(description2);
      expect(todo2.UID).to.equal(1);

    const todoMap2 =  todo.getByAddress(owner.address)
    expect((await todoMap2).length).to.equal(2);
    expect((await todoMap2)[1].title).to.equal(title2);  
    }
  )

  it("test for update", async function(){
    const { todo, owner, otherAccount, accountA } = await loadFixture(deployTodo);
    const title = "new test";
    const description ="update test";

    await todo.addTodo(title,description)

    const myTodos = await todo.getAll();
    expect(myTodos.length).to.equal(1);

    const updatetitle ="task updated";
    const updatedescription = "did a thing"
    const UID = 0;

    await todo.updateTodo(updatetitle, updatedescription, UID);
    const myUpdatedTodo = await todo.getAll();
    expect(myUpdatedTodo[0].title).to.equal(updatetitle);
    expect(myUpdatedTodo[0].description).to.equal(updatedescription);
    expect(myUpdatedTodo[0].UID).to.equal(UID);

    const myUpdatedMap = await todo.getByAddress(owner.address);
    expect(myUpdatedMap[0].title).to.equal(updatetitle);
    expect(myUpdatedMap[0].description).to.equal(updatedescription);

  })

})




}); 


