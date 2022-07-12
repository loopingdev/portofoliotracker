import react, { useEffect, useState } from "react";
import { formatNumber } from "../lib/helpers";

import "../assets/Calculator.css"


function Calulator() {
    const [ tokenPrice, setTokenPrice ] = useState(0);
    const [ roraAmount, setRoraAmount ] = useState(1);
    const [ purchasePrice, setPurchasePrice ] = useState(0);
    const [ futurePrice, setFuturePrice ] = useState(0);
    const [ dailyVolumeInUsd, setDailyVolumeInUsd ] = useState(0);
    const [ dailyVolumeInTokens, setDailyVolumeInTokens ] = useState(0);
    const [ dailyBuys, setDailyBuys ] = useState(0);
    const [ dailySells, setDailySells ] = useState(0);
    const [ dailyTotalTransactions, setDailyTotalTransactions ] = useState(0);
    const [ currentSupply, setCurrentSupply ] = useState(1200000000);
    const [ days, setDays ] = useState(7);
    const [ initialInvestment, setInitialInvestment ] = useState(0);
    const [ estimatedRewardsInTokens, setEstimatedRewardsInTokens ] = useState(0);
    const [ estimatedRewardsInUsd, setEstimatedRewardsInUsd] = useState(0);

    function handleRoraAmountChange(e){
        setRoraAmount(parseFloat(e.target.value));
    }

    function handlePurchasePriceChange(e){
        setPurchasePrice(parseFloat(e.target.value));
    }

    function handlefuturePriceChange(e){
        setFuturePrice(parseFloat(e.target.value));
    }

    function handleDaysChange(e){
        setDays(parseInt(e.target.value))
    }

    function getTokenAmount(totalAmountInUsd, tokenPriceUsd){
        return totalAmountInUsd / tokenPriceUsd;
    }

    function calculateEstimatedRewards(){
        const dailyBuysPercentage = (dailyBuys / dailyTotalTransactions) * 100;
        const dailySellsPercentage = (dailySells / dailyTotalTransactions) * 100; 
        const roraUserShare = (roraAmount / currentSupply) * 100;

        const buyRewards = (dailyVolumeInTokens * dailyBuysPercentage) * 0.02 * roraUserShare;
        const sellRewards = (dailyVolumeInTokens * dailySellsPercentage) * 0.05 * roraUserShare;
        const totalRewards = (buyRewards + sellRewards) * days;

        return totalRewards;
    }

    useEffect(() => {
        fetch(`https://api.dexscreener.io/latest/dex/tokens/${process.env.REACT_APP_TOKEN_ADDRESS}`)
        .then(results => results.json())
        .then(data => {
            if (data && data.pairs && data.pairs.length > 0){
                setTokenPrice(parseFloat(data.pairs[0].priceUsd))
                setPurchasePrice(parseFloat(data.pairs[0].priceUsd))
                
                setDailyVolumeInUsd(parseFloat(data.pairs[0].volume.h24))
                setDailyVolumeInTokens(getTokenAmount(parseFloat(data.pairs[0].volume.h24), parseFloat(data.pairs[0].priceUsd)))
                
                setDailyBuys(parseInt(data.pairs[0].txns.h24.buys))
                setDailySells(parseInt(data.pairs[0].txns.h24.sells))
                setDailyTotalTransactions(parseInt(data.pairs[0].txns.h24.buys) + parseInt(data.pairs[0].txns.h24.sells))
            }
        })
    }, [window.ethereum])

    useEffect(() => {
        // console.log(roraAmount, purchasePrice, futurePrice, days)
        const initialInvestment = parseFloat(roraAmount * purchasePrice).toFixed(4);
        
        setInitialInvestment(initialInvestment);

        const rewardsInTokens = calculateEstimatedRewards();
        setEstimatedRewardsInTokens(parseFloat(rewardsInTokens).toFixed(4));
        setEstimatedRewardsInUsd(parseFloat(rewardsInTokens * tokenPrice).toFixed(4));

    }, [roraAmount, purchasePrice, futurePrice, days])

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card calculator-card">
                    <div className="card-body">
                        <h3 className="text-center">Calculator</h3>
                        <p className="text-center">Estimate your return</p>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" placeholder="RORA Amount" onChange={handleRoraAmountChange} value={roraAmount} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">Price: {tokenPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" placeholder="Purchase Price" onChange={handlePurchasePriceChange} value={purchasePrice}/>
                                    <div className="input-group-append">
                                        {/* <span className="input-group-text" id="basic-addon2">0.0003</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" placeholder="Future Price" onChange={handlefuturePriceChange}  />
                                    <div className="input-group-append">
                                        
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <label className="form-label">How many days?</label>
                                <input type="range" className="form-range" min="1" max="365" id="customRange2" onChange={handleDaysChange} value={days} />
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-6 mx-auto">
                                {/* <div className="row">
                                    <div className="col-md-6">
                                        APY
                                    </div>
                                    <div className="col-md-6">
                                        102,482.58%
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-md-6">
                                        Invested Days
                                    </div>
                                    <div className="col-md-6">
                                        { days }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        Initial Investment
                                    </div>
                                    <div className="col-md-6">
                                        $ { initialInvestment }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        Estimated Rewards
                                    </div>
                                    <div className="col-md-6">
                                        {estimatedRewardsInTokens} RORA
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        Potential Return
                                    </div>
                                    <div className="col-md-6">
                                        $ {estimatedRewardsInUsd}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}

export default Calulator;