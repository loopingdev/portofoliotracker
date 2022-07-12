import { NavLink } from "react-router-dom";

import "./AppSidebar.css";

import image from "../../assets/images/logo.png"
import DextoolsLogo from "../../assets/images/dextools_logo.png"
import CGLogo from "../../assets/images/coingecko_logo.png"
import CMCLogo from "../../assets/images/cmc_logo.png"
import PCSLogo from "../../assets/images/pcs.png";
import BSCScanLogo from "../../assets/images/bscscan.png";

function AppSidebar( { menuState, onMenuStateChange }) {
  function handleCloseBtn(){
    onMenuStateChange(false);
  }
  return (
    <div className="sidenav" style={{ display: menuState ? 'block': 'none'}}>
      <button className="close-btn btn" onClick={handleCloseBtn} >x</button>
      <div className="sidenav-inner">
        
        <img src={image} className="logo mb-4" alt="logo"/>
        
        <NavLink to="/" className={({ isActive }) =>isActive ? "sidenav-link active" : "sidenav-link"} style={{ paddingLeft: "4rem", marginTop: "3rem"}}>Dashboard</NavLink>
        <NavLink to="/calculator" className={({ isActive }) =>isActive ? "sidenav-link active" : "sidenav-link"} style={{ paddingLeft: "4rem"}}>Calculator</NavLink>
        {/* <NavLink to="/treasury" className={({ isActive }) =>isActive ? "sidenav-link active" : "sidenav-link"} style={{ paddingLeft: "4.5rem"}}>Treasury</NavLink> */}
        <a href="https://rora-realm.gitbook.io" target="_blank" className="sidenav-link" style={{ paddingLeft: "6rem"}}>Docs</a>
        <footer>

        </footer>

        <div className="footer">
          <div className="text-white">
            <div className="title mb-2">
              Links:
            </div>

            <div>
              <a href="https://pancakeswap.finance/swap?outputCurrency=0xf9Ab8A817672c1468F5a6abB54f1D825f7b7bFc5" target="_blank" className="link">
                <img src={PCSLogo} className="links-image" alt="trisolaris-link"/>Buy on Pancakeswap
              </a>
            </div>
            
            <div>
              <a href="https://www.dextools.io/app/bnb/pair-explorer/0xfba021906fad608336f94f66be50f9300800e267" target="_blank" className="link">
                <img src={DextoolsLogo} className="links-image" alt="dextools-link" />Dextools
              </a>
            </div>
            
            <div>
              <a href="#" className="link">
                <img src={CGLogo} className="links-image" alt="cg-link"/>Coingecko
              </a>
            </div>
            
            <div>
              <a href="#" className="link">
                <img src={CMCLogo} className="links-image" alt="cmc-link"/>Coinmarketcap
              </a>
            </div>

            <div>
              <a href="https://bscscan.com/address/0xf9Ab8A817672c1468F5a6abB54f1D825f7b7bFc5" target="_blank"  className="link">
                <img src={BSCScanLogo} className="links-image" alt="aurora-link"/>BSC Scan
              </a>
            </div>

          </div>
        </div>
        
      </div>
    
  </div>
  );
}

export default AppSidebar;