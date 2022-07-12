import { useState, useEffect } from 'react';
import { providers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import "./ConnectWallet.css";

function ConnectWallet({ onAccountConnect }) {
    const [web3Modal, setWeb3Modal] = useState(null);
    const [address, setAddress] = useState("")

    useEffect(() => {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: process.env.REACT_APP_INFURA_KEY,
            }
          },
        };
    
        const newWeb3Modal = new Web3Modal({
          cacheProvider: true, 
          network: "mainnet",
          // providerOptions,
        });
    
        setWeb3Modal(newWeb3Modal)
    }, [])

    useEffect(() => {
        if(web3Modal && web3Modal.cachedProvider){
          connectWallet()
        }
    }, [web3Modal])

    async function connectWallet() {
        const provider = await web3Modal.connect();
        addListeners(provider);
        const ethersProvider = new providers.Web3Provider(provider)
        const userAddress = await ethersProvider.getSigner().getAddress()
        console.log(userAddress)
        setAddress(userAddress)
        onAccountConnect(userAddress)
    }

    async function disconnectWallet(){
        await web3Modal.clearCachedProvider();
        setAddress("")
    }

    async function addListeners(web3ModalProvider) {
        
        web3ModalProvider.on("accountsChanged", (accounts) => {
          window.location.reload()
        });
        
        // Subscribe to chainId change
        web3ModalProvider.on("chainChanged", (chainId) => {
          window.location.reload()
        });
    }

    return (
      <>
        { address ? (
              <>
                  {/* <p className='text-white'>{address}</p> */}
                  <button type="button" className="btn btn-primary" onClick={disconnectWallet}>DISCONNECT WALLET</button>
              </>
              
          ): (
              <button type="button" className="btn btn-primary" onClick={connectWallet}>CONNECT WALLET</button>
          )}
      </>
    );
}

export default ConnectWallet;
