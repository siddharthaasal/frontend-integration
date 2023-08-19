# frontend-integration
# Eth-Avax_Module 2 -> Smart Contract with Frontend Integration Project

In this project I have written a smart contract that has been deployed to a local hardhat node and interacted via a frontend.
This decentralised app allows a user to deposit and withdraw amount via a web3 wallet etc.

## Features
1. **Deposit**: Users can deposit a specified amount into the smart contract.
2. **Withdraw**: Users can withdraw a specified amount from the smart contract.
3. **Get Contract Owner**: Users can retrieve the contract's owner address.
4. **Check Prime**: Users can whether the amount that they entered is a prime number or not.
5. **Display Info**: It displays my info.

## Prerequisites
1. **Node.js** installed in your machine.
2. **Metamask** installed in your browser.

## Installation

Clone the project then run the following commands in your project's directory terminal:

1. Install the required dependencies:

```bash
npm install
```
3. Compile the changes:

```bash
npx hardhat compile
```

4. Start a local Ethereum network:

```bash
npx hardhat node
```
5. In a new terminal, run the scripts via:

```bash
npx hardhat run scripts/deploy.js --network localhost
```
## Running the Project
To start the frontend website, use the following command:

```bash
npm run dev
```
Once the DApp is running, open your browser and navigate to http://localhost:3000 to access the interface and play around.

## Authors
Siddharth Aasal

## License
This contract is released under MIT license
