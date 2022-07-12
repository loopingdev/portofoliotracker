import { formatNumber } from "../../lib/helpers";

import "./Portfolio.css"
import PortfolioStatCard from "../PortfolioStatsCard/PortfolioStatsCard";


function Portfolio( { totalEarnings, totalEarningsUsd, holdedAmount, holdedAmountInUsd }){
    return (
        <div className="wrapper">
        <h3>PORTFOLIO</h3>
        <div className="content">
            <div className="card portfolio-wrapper-card">
                <div className="row portfolio-wrapper-card-row mt-3">
                    <div className="col-md-12">
                        {/* <div className="row">
                            <div className="col-md-12 portfolio-time-periods">
                                <span className="portfolio-time-period-selector selected">All time</span> | 
                                <span className="portfolio-time-period-selector">1d</span> |
                                <span className="portfolio-time-period-selector">1m</span> |
                                <span className="portfolio-time-period-selector">3m</span> |
                                <span className="portfolio-time-period-selector">6m</span> |
                                <span className="portfolio-time-period-selector">1y</span>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-md-6">
                                <PortfolioStatCard statName="RORA Holdings" statValue={formatNumber(holdedAmount)}/>
                            </div>
                            <div className="col-md-6">
                                <PortfolioStatCard statName="My Total RORA Earnings" statValue={(totalEarnings)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row portfolio-wrapper-card-row mt-3">
                    <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <PortfolioStatCard statName="RORA Holdings Value" statValue={`$  ${holdedAmountInUsd}`}/>
                        </div>
                        <div className="col-md-6">
                            <PortfolioStatCard statName="RORA Earnings Value" statValue={`$  ${totalEarningsUsd}`}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Portfolio;
