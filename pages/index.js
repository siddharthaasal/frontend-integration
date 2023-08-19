import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amountInput, setAmountInput] = useState(1);
  const [contractOwner, setContractOwner] = useState(undefined);
  const [primeResult, setPrimeResult] = useState(undefined);
  const [myInfo, setMyInfo] = useState("");


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(amountInput);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(amountInput);
      await tx.wait();
      getBalance();
    }
  };

  const getContractOwner = async () => {
    if (atm) {
      const owner = await atm.owner();
      setContractOwner(`Contract owner: ${owner}`);
    }
  };
  
  const isPrime = (num) => {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  };
  const checkPrime = () => {
    const isNumPrime = isPrime(amountInput);
    if (isNumPrime) {
      setPrimeResult(`${amountInput} is a prime number.`);
    } else {
      setPrimeResult(`${amountInput} is not a prime number.`);
    }
  };

  const displayMyInfo = () => {
    setMyInfo("A student of Chandigarh University learning WEB-3 and Blockchain under Metacrafter Training Program! UID: 22BCT10056");
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div>
          <input
            type="number"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <button onClick={deposit}>Deposit</button>
          <button onClick={withdraw}>Withdraw</button>
        </div>
        <div>
          <button onClick={getContractOwner}>Get Contract Owner</button>
          {contractOwner && <p>{contractOwner}</p>}
          <button onClick={checkPrime}>Check Prime</button>
          {primeResult && <p>{primeResult}</p>}
        </div>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            border: "2px solid black",
          }}
          onClick={displayMyInfo}
        >
          Siddharth Aasal
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>WEB 3 ATM is here!!</h1>
      </header>
      {initUser()}
      {myInfo && (
      <div className="my-info">
        <p>{myInfo}</p>
      </div>
    )}
      <style jsx>{`
          .container {
            text-align: center;
            background: #D99A9A;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            margin: auto;
            max-width: 600px;
          }
          .title {
            color: #A60512;
            font-family: 'Foldit', cursive;
          }
          .content {
            margin-top: 20px;
          }
          .my-info {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
          }
          input[type="number"] {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          button:hover {
            background-color: #0056b3;
          }
      `}</style>
    </main>
  );
}
//hgj