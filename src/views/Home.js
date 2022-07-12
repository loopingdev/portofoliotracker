import { useState, useEffect } from "react";

import { getTotalBurnt, getCurrentSupply, getTotalEarnings } from "../lib/contract";
import { getTokenHoldersCount, getTreasuryValue, getTokenBalance } from "../lib/covalent";
import { getMarketCap } from "../lib/helpers";

import OverallTokenStats from "../components/OverallTokenStats/OverallTokenStats";
import Portfolio from "../components/Portfolio/Portfolio";
import Volume from "../components/Volume/Volume";
import SupplyMechanics from "../components/SupplyMechanics/SupplyMechanics";

import "../assets/Home.css";



function Home( { accountConnected}) {
  const [ dexScreenerData, setDexScreenerData ] = useState({});
  const [ totalBurnt, setTotalBurnt ] = useState(0);
  const [ currentSupply, setCurrentSupply ] = useState(0);
  const [ marketCap, setMarketCap ] = useState(0);
  const [ totalEarnings, setTotalEarnings ] = useState(0);
  const [ totalEarningsUsd, setTotalEarningsUsd] = useState(0);
  const [ holdersCount, setHoldersCount ] = useState(0);
  const [ treasuryVal, setTreasuryVal ] = useState(0);
  const [ holdedAmount, setHoldedAmount ] = useState(0);
  const [ holdedAmountRaw, setHoldedAmountRaw ] = useState(0);
  const [ totalEarningsRaw, setTotalEarningsRaw ] = useState(0);
  const [ holdedAmountInUsd, setHoldedAmountInUsd ] = useState(0);
  const [ tokenPriceUsd, setTokenPriceUsd ] = useState(0);


  function calculateEstimatedRewards(){
    const dailyBuysPercentage = (dailyBuys / dailyTotalTransactions) * 100;
    const dailySellsPercentage = (dailySells / dailyTotalTransactions) * 100; 
    const roraUserShare = (holdedAmount / currentSupply) * 100;

    const buyRewards = (dailyVolumeInTokens * dailyBuysPercentage) * 0.02 * roraUserShare;
    const sellRewards = (dailyVolumeInTokens * dailySellsPercentage) * 0.05 * roraUserShare;
    const totalRewards = (buyRewards + sellRewards);

    return totalRewards;
}

  useEffect(() => {
    fetch(`https://api.dexscreener.io/latest/dex/tokens/${process.env.REACT_APP_TOKEN_ADDRESS}`)
    .then(results => results.json())
    .then(data => {
      if (data.pairs && data.pairs.length > 0){
        setDexScreenerData(data.pairs[0]);
        getCurrentSupply().then(currentSupply => {
          const mc = getMarketCap(parseFloat(currentSupply), parseFloat(data.pairs[0].priceUsd))
          setCurrentSupply(currentSupply);
          setMarketCap(parseFloat(mc).toFixed(2));
        })
        if (window.ethereum !== undefined && window.ethereum.selectedAddress !== null){
          getTotalEarnings(window.ethereum.selectedAddress).then(total => {
            setTotalEarningsRaw(total);
            setHoldedAmount(parseFloat(total).toFixed(2))
            setHoldedAmountInUsd(parseFloat(total * parseFloat(data.pairs[0].priceUsd)).toFixed(4))
          })
          
          getTokenHoldersCount().then(count => setHoldersCount(count) );
          getTreasuryValue().then(val => setTreasuryVal( parseFloat(parseFloat(val).toFixed(2)) ));
  
          getTokenBalance(window.ethereum.selectedAddress).then(total => {
            setHoldedAmountRaw(total);
          });

          setTokenPriceUsd(data.pairs[0].priceUsd)
        }
        
        
      }
    })
    getTotalBurnt().then(val => setTotalBurnt(parseFloat(val)));
    
    
  }, [accountConnected])

  useEffect(() => {
    const earnings = totalEarningsRaw - holdedAmountRaw;
    setTotalEarnings(parseFloat(earnings).toFixed(2));
    setTotalEarningsUsd( parseFloat(earnings * parseFloat(tokenPriceUsd)).toFixed(4) )
  }, [holdedAmountRaw, totalEarningsRaw, tokenPriceUsd])


  

  return (
    <>
      <OverallTokenStats dexScreenerData={dexScreenerData} marketCap={marketCap} holders={holdersCount} />
      <div className="row ">
      <div className="col-xl-9 portfolio-volume-wrapper">
        <Portfolio totalEarnings={(totalEarningsRaw-holdedAmountRaw)-totalEarnings} totalEarningsUsd={totalEarningsUsd-holdedAmountInUsd} holdedAmount={holdedAmount} holdedAmountInUsd={holdedAmountInUsd}/>
      </div>
      <div className="col-xl-3 portfolio-volume-wrapper">
        <Volume dexScreenerData={dexScreenerData}/>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-md-9">
        <SupplyMechanics totalBurnt={totalBurnt} currentSupply={currentSupply} treasury={treasuryVal}/>
      </div>
    </div>
    </>
  );
}

export default Home;