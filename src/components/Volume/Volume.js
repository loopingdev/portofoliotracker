import { formatNumber } from "../../lib/helpers";

import "./Volume.css";
import hr from "../../assets/images/volume-hr.png"


function Volume({ dexScreenerData }){
    return (
        <div className="card volume-card">
            <div className="card-body mx-auto">
            <h5 className="card-title text-center">Volume (24hrs)</h5>
                <img src={hr} className="os-hr mx-auto img-fluid" alt="os-hr" />
                <h5 className="card-value text-center">{`$  ${dexScreenerData.volume ? formatNumber(dexScreenerData.volume.h24) : 0}`}</h5>
            </div>
        </div>
    );
}

export default Volume;