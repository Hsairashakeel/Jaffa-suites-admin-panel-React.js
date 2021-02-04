import React from 'react'
import Widgets from './Widget'
import RecentReportGraph from './recentReportGraph'
import RecentReportChart from './recentReportChart'
import RecentActivity from './recentActivities'
import Earning from './earnings'
class Dashboard extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
            load:false
        }
    }
    componentDidMount()
    {
        this.setState(
            {
                load:true
            }
        )
    }
    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Dashboard</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Widgets />
                  {this.state.load?     
                    <div className="row">
                        <RecentReportGraph />
                        <RecentReportChart />
                    </div>
                    :<div></div>
                    }
                    <div className="row clearfix">
                        {/* Activity */}
                        <RecentActivity />
                        {/* #END# Activity */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Earning />                        
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Dashboard;