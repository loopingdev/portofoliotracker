import Chart from "react-apexcharts";
import smhr from "../../assets/images/sm-hr.png"
import { formatNumber } from "../../lib/helpers"
import "./SupplyMechanics.css";

function SupplyMechanics( { totalBurnt, currentSupply, treasury }){
    const options = {
        labels: ['Circulating', 'Burned', 'Treasury'],
            dataLabels:{
                enabled:false,
            },
            colors: ['#39a9b7', '#82c9d2', '#d1ebee'],
            stroke:{
                colors: 'none'
            },
            legend:{
                width: 650,
                offsetX: -200,
                offsetY: 50,
                labels:{
                    colors: '#ffffff',
                },
                markers:{
                    radius:0
                },
                fontFamily: "VCR_OSD_MONO_1.001",
                fontSize: 16,
                formatter: function(seriesName, opts) {
                    return [`
                        <span>
                            <span style="display: inline-block; width: 200px;">${seriesName}</span>
                            <span>${formatNumber(opts.w.globals.series[opts.seriesIndex])}</span>
                        </div>
                    `]
                }
            },
        responsive: [{
                breakpoint: 480,
                options: {
                    chart:{
                        width: 350,
                    },
                    legend: {
                        position:'bottom',
                        offsetX: -40,
                        offsetY: 0,
                        width:400
                    },
                    formatter: function(seriesName, opts) {
                        return [`
                        <span>
                            <span style="display: inline-block;">${seriesName}</span>
                            <span>${formatNumber(opts.w.globals.series[opts.seriesIndex])}</span>
                        </div>
                    `]
                            
                        
                    }
                }
            }
        ]
    }

    const series = [currentSupply, totalBurnt, treasury];
    return (
        <div className="card supply-mechanics-card">
            <div className="card-body">
            <h5 className="card-title">Supply Mechanics</h5>
            <img src={smhr} className="img-fluid" alt="smhr" />
            <div className="row">
                <div className="col-md-12">
                    <Chart width="750" type="donut" options={options} series={series}></Chart>
                </div>
            </div>
            
            </div>
        </div>
    )
}

export default SupplyMechanics;