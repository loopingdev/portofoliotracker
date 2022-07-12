import { formatNumber } from "../../lib/helpers"
import OverallTokenStatsCard from "../OverallTokenStatsCard/OverallTokenStatsCard"

function OverallTokenStats({ dexScreenerData, marketCap, holders }){
    return (
        <div className="row">
            <div className="col-md-3 col-sm-6">
                <OverallTokenStatsCard statName="Market Cap" statValue={`$  ${formatNumber(marketCap)}`}/>
            </div>
            <div className="col-md-3 col-sm-6">
                <OverallTokenStatsCard statName="Price" statValue={`$  ${dexScreenerData.priceUsd ? dexScreenerData.priceUsd : 0}`}/>
            </div>
            <div className="col-md-3 col-sm-6">
                <OverallTokenStatsCard statName="Liquidity" statValue={`$  ${dexScreenerData.liquidity ? parseFloat(dexScreenerData.liquidity.usd).toFixed(2) : 0}`}/>
            </div>
            <div className="col-md-3 col-sm-6">
                <OverallTokenStatsCard statName="Holders" statValue={formatNumber(holders)}/>
            </div>
        
        </div>
    )   
}

export default OverallTokenStats;