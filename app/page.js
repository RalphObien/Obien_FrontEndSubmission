"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        fetchBalance(provider, accounts[0]); 
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };
  

  const fetchBalance = async (provider, address) => {
    if (!address || !provider) return;
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  
  

  return (
    <div className="container">
      <h1>Connect with MetaMask</h1>
      {!account ? (
        <button onClick={connectWallet}>
          {loading ? "Connecting..." : "Connect with MetaMask"}
        </button>
      ) : (
        <div>
          <p className="account-info">Connected as: {account}</p>
          <p className="balance">
            Balance: {balance ? `${balance} ETH` : "Fetching..."}
          </p>
        </div>
      )}
    </div>
  );
}
