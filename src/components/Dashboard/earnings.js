import React from 'react'

class Earnings extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="header">
                    <h2>
                        <strong>Earning</strong> Source</h2>
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
                    <div className="totalEarning">
                        <h2>$2,808</h2>
                    </div>
                    <div className="p-t-10">
                        <span className="pull-left progress-label">Room 1</span>
                        <span className="pull-right progress-percent label label-info m-b-5">17%</span>
                    </div>
                    <div className="earningProgress">
                        <div className="progress shadow-style">
                            <div className="progress-bar l-bg-green width-per-17" role="progressbar" aria-valuenow={17} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="p-t-10">
                        <span className="pull-left progress-label">Room 2</span>
                        <span className="pull-right progress-percent label label-danger m-b-5">27%</span>
                    </div>
                    <div className="earningProgress">
                        <div className="progress shadow-style">
                            <div className="progress-bar l-bg-purple width-per-27" role="progressbar" aria-valuenow={27} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="p-t-10">
                        <span className="pull-left progress-label">Room 3</span>
                        <span className="pull-right progress-percent label label-primary m-b-5">63%</span>
                    </div>
                    <div className="earningProgress">
                        <div className="progress shadow-style">
                            <div className="progress-bar l-bg-orange width-per-63" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="p-t-10">
                        <span className="pull-left progress-label">Room 4</span>
                        <span className="pull-right progress-percent label label-success m-b-5">18%</span>
                    </div>
                    <div className="earningProgress">
                        <div className="progress shadow-style">
                            <div className="progress-bar l-bg-cyan width-per-18" role="progressbar" aria-valuenow={18} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                    <div className="p-t-10">
                        <span className="pull-left progress-label">Room 5</span>
                        <span className="pull-right progress-percent label label-warning m-b-5">13%</span>
                    </div>
                    <div className="earningProgress">
                        <div className="progress shadow-style">
                            <div className="progress-bar l-bg-red width-per-13" role="progressbar" aria-valuenow={13} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Earnings;