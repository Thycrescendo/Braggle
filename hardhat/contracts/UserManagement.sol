// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UserManagement {
    struct User {
        address userAddress;
        string username;
    }

    mapping(address => User) public users;
    mapping(string => address) public usernames;

    event UserRegistered(address indexed userAddress, string username);

    function registerUser(string memory username) external {
        require(usernames[username] == address(0), "Username already taken");
        require(bytes(users[msg.sender].username).length == 0, "User already registered");

        users[msg.sender] = User(msg.sender, username);
        usernames[username] = msg.sender;

        emit UserRegistered(msg.sender, username);
    }

    function getUser(address userAddress) external view returns (User memory) {
        return users[userAddress];
    }

    function getUserByUsername(string memory username) external view returns (User memory) {
        return users[usernames[username]];
    }
}
