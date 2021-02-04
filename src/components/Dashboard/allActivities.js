import React from 'react'
var axios = require('axios');

const RenderAcitivitesItem = (props) => (
    <tr>
        <td></td>
        <td>{props.activity.username}</td>
        <td>{props.activity.date}</td>
        <td>{props.activity.time}</td>
        <td>{props.activity.notification_type_name}</td>
        <td>{props.activity.notification_type_description}</td>
    </tr>
)



class AllActivites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities:[]
        }
    }
    componentDidMount() {

        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/notification/get-all-notifications',
            headers: {}
        };
        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        activities: response.data.result
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderActivities() {
        var tBody = this.state.activities.map( act => {
            return (<RenderAcitivitesItem  activity={act} />)
        })
        var content = (
            <div className="tableBody" id="tb">
                <div className="table-responsive">
                    <table id="tableExport" className="table table-hover dashboard-task-infos">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
        return content;
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
                                        <h4 className="page-title">All Activites</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Activties</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        {/* Task Info */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        <strong>Activites</strong> Details</h2>
                                   
                                </div>
                                {this.renderActivities()}

                            </div>
                        </div>
                        {/* #END# Task Info */}
                    </div>
                </div>
            </section>
        );
    }
}

export default AllActivites;