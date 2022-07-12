import "./PortfolioStatsCard.css"
import phr from "../../assets/images/p-hr.png"

function PortfolioStatCard({statName, statValue}){
    return (
        <div className="card portfolio-stat-card">
            <div className="card-body">
                <h5 className="card-title">{ statName }</h5>
                <img src={phr} className="os-hr"  alt="os-hr" />
                <h5 className="card-value">{ statValue }</h5>
            </div>
        </div>
    )
}

export default PortfolioStatCard;