import oshr from "../../assets/images/os-hr.png"
import "./OverallTokenStatsCard.css";

function OverallTokenStatsCard({ statName, statValue }){
    return (
        <div className="card overall-token-stats-card" >
            <div className="card-body">
                <h5 className="card-title">{statName }</h5>
                <img src={oshr} className="os-hr img-fluid" alt="os-horizontal-line"/>
                <h5 className="card-value">{ statValue }</h5>
            </div>
        </div>
    );
}

export default OverallTokenStatsCard;