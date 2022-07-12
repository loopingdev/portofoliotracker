import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Calulator from "./views/Calculator";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";

import image from "./assets/images/logo.png"

import './App.css';



function App() {
  const [ menuState, setMenuState ] = useState(true);
  const [ accountConnected, setAccountConnected] = useState(null);
  function handleMobileMenuState(){
    setMenuState(true)
  }
  function onMenuStateChange(){
    setMenuState(false)
  }
  function handleOnAccountConnect(val){
    setAccountConnected(val);
  }
  return (
    <div className="App container">
      <AppSidebar menuState={menuState} onMenuStateChange={onMenuStateChange}/>
      <main className="main">
        <div className="container">
          
          <div className='account-wrapper'>
            <div className="row action-buttons-lg">
              <div className="col-md-3 offset-md-9">
                <ConnectWallet onAccountConnect={handleOnAccountConnect}/>
              </div>
            </div>

            
            <div className="row action-buttons-sm">
              <div className="col-md-3">
                <button type="button" className="btn btn-primary mb-3" onClick={handleMobileMenuState} >
                  <div className="menu-icon-custom"></div>
                  <div className="menu-icon-custom"></div>
                  <div className="menu-icon-custom"></div>
                </button>
              </div>

              <div className="col-md-3 offset-md-6">
                <ConnectWallet onAccountConnect={handleOnAccountConnect}/>
              </div>
              
            </div>
          </div>
          
          
          
        </div>
        <div className="container mt-5">
          <div className="row">
            <Routes>
              <Route path="/" element={<Home accountConnected={accountConnected}/>} />
              <Route path="calculator" element={<Calulator />} />
            </Routes>
          </div>
        
        </div>
      
      </main>
      
    </div>
    
  );
}

export default App;
