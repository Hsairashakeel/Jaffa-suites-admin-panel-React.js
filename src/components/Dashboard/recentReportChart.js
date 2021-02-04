import React from 'react'

class RecentReportChart extends React.Component {
    render() {
        return (
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="card">
                    <div className="header">
                        <h2>
                            <strong>Recent</strong> Report</h2>
                        <ul className="header-dropdown m-r--5">
                            <li className="dropdown">
                                <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">more_vert</i>
                                </a>
                                <ul className="dropdown-menu pull-right">
                                    <li>
                                        <a href="#" onclick="return false;">Action</a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="return false;">Another action</a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="return false;">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <div className="card">
                            <div className="chart-box-left">
                                <div className="chart-note">
                                    <span className="dot dot-product" />
                                    <span>Bookings</span>
                                </div>
                                <div className="chart-note mr-0">
                                    <span className="dot dot-service" />
                                    <span>Rooms</span>
                                </div>
                            </div>
                            {/* Canvas for Chart.js */}
                            <canvas id="chartReport2" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecentReportChart;