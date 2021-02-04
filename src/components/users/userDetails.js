import React from 'react'
import Loading from './../shared/loader'
import $ from 'jquery'
var axios = require('axios')
var qs = require('qs')

class UserDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            activities: [],
            loading: true,
            blockReason: ""
        }
        this.toggleBlock = this.toggleBlock.bind(this)
        this.blockUser = this.blockUser.bind(this)
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").removeClass("alert-danger")
        $(".myAlert-bottom").removeClass("alert-success")
        $(".myAlert-bottom").addClass(className);

        $(".myAlert-bottom").slideDown();
        setTimeout(function () {
            $(".myAlert-bottom").slideUp();
        }, time);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            loading: true
        })
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/get-user-details-by-id',
            headers: {},
            data: {
                username: params.id
            }
        };
        axios(config)
            .then((response) => {
                if (response.data.responseCode == 1) {
                    console.log(response.data.result[0]);
                    this.setState({
                        userData: response.data.result[0],
                    })
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            });

        config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/notification/get-user-notifications',
            headers: {},
            data: {
                'username': params.id
            }
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        activities: response.data.result,
                        loading: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    blockUser() {

        var username = $("#brUser").val()
        var reason = this.state.blockReason
        var data = {
            'username': username,
            'blockReason': reason
        };
        window.$("#blockReasonModal").modal("hide")
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/block-user',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                const { match: { params } } = this.props;
                this.setState({
                    loading: true
                })
                var config = {
                    method: 'post',
                    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-user-details-by-id',
                    headers: {},
                    data: {
                        username: params.id
                    }
                };
                axios(config)
                    .then((response) => {
                        if (response.data.responseCode == 1) {
                            console.log(response.data.result[0]);
                            this.setState({
                                userData: response.data.result[0],
                            })
                        }
                    }
                    )
                    .catch(function (error) {
                        console.log(error);
                    });

                config = {
                    method: 'post',
                    url: 'https://jaffa-suites-backend.herokuapp.com/notification/get-user-notifications',
                    headers: {},
                    data: {
                        'username': params.id
                    }
                };

                axios(config)
                    .then((response) => {
                        if (response.data.responseCode === 1) {
                            this.setState({
                                activities: response.data.result,
                                loading: false
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Error Loading Users', 3000)
            });
    }
    toggleBlock(user) {
        if (!user.is_blocked) {
            window.$("#brUser").val(user.username)
            window.$("#blockReasonModal").modal("show")
        }
        else {
            var data = qs.stringify({
                'username': user.username
            });
            var config = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/user/unblock-user',
                headers: {},
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.responseCode === 1) {
                        const { match: { params } } = this.props;
                        this.setState({
                            loading: true
                        })
                        var config = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/user/get-user-details-by-id',
                            headers: {},
                            data: {
                                username: params.id
                            }
                        };
                        axios(config)
                            .then((response) => {
                                if (response.data.responseCode == 1) {
                                    console.log(response.data.result[0]);
                                    this.setState({
                                        userData: response.data.result[0],
                                    })
                                }
                            }
                            )
                            .catch(function (error) {
                                console.log(error);
                            });

                        config = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/notification/get-user-notifications',
                            headers: {},
                            data: {
                                'username': params.id
                            }
                        };

                        axios(config)
                            .then((response) => {
                                if (response.data.responseCode === 1) {
                                    this.setState({
                                        activities: response.data.result,
                                        loading: false
                                    })
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    this.myAlertBottom('alert-danger', 'Error Loading User', 3000)
                });
        }
    }

    renderPersonalInfo() {
        return (
            <div className="card">
                <div className="m-b-20">
                    <div className="contact-grid">
                        <div className="profile-header l-bg-green">
                        </div>
                        <div className="container">
                            <img src="../../assets/images/user/usrbig3.jpg" className="user-img" alt="" />
                            <div className="user-name">{this.state.userData.username}</div>
                            <div className>{this.state.userData.address}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderRecentActivites() {
        return (
            <div className="card">
                <div className="header">
                    <h2>
                        <strong>Recent</strong> Activities</h2>
                </div>
                <div className="body">
                    {this.state.activities.slice(0, 5).map(act => this.renderRecentActivityItem(act))}
                </div>
            </div>
        );
    }
    renderRecentActivityItem(activity) {
        return (
            <div className="sl-item sl-primary">
                <div className="sl-content">
                    <small className="text-muted">
                        <i className="fa fa-user position-left" /> {activity.date}</small>
                    <p>{activity.description}</p>
                </div>
            </div>
        );
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
                                        <h4 className="page-title">Profile</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">My Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Your content goes here  */}
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12">
                            {this.state.loading ? <Loading /> : this.renderPersonalInfo()}
                            {this.state.loading ? <Loading /> : this.renderRecentActivites()}
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="card">
                                <div className="profile-tab-box">
                                    <div className="p-l-20">
                                        <ul className="nav ">
                                            <li className="nav-item tab-all">
                                                <a className="nav-link active show" href="#project" data-toggle="tab">Details</a>
                                            </li>
                                            <li className="nav-item tab-all p-l-20">
                                                <a className="nav-link" href="#usersettings" data-toggle="tab">Bookings</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="project" aria-expanded="true">
                                    <div className="row clearfix">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="card project_widget">
                                                <div className="header">
                                                    <h2>User Details</h2>
                                                    <ul className="header-dropdown m-r--5">
                                                        <li className="dropdown">
                                                            <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                                <i className="material-icons">more_vert</i>
                                                            </a>
                                                            <ul className="dropdown-menu pull-right">
                                                                <li>
                                                                    <a href="#" onclick="return false;">Edit User</a>
                                                                </li>
                                                                {/* <li>
                                                                    <a href="#" onclick="return false;">Reset Password</a>
                                                                </li> */}
                                                                <li>
                                                                    {this.state.userData.is_blocked ? <a onClick={() => this.toggleBlock(this.state.userData)}>UnBlock User</a> : <a onClick={() => this.toggleBlock(this.state.userData)} >Block User</a>}
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="body">
                                                    <div className="container">
                                                        <table className="table table-bordered">
                                                            <tbody><tr>
                                                                <td>Name</td>
                                                                <td> {this.state.userData.name} </td>
                                                            </tr>
                                                                <tr>
                                                                    <td>Contact</td>
                                                                    <td>{this.state.userData.contact}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Address</td>
                                                                    <td>{this.state.userData.address}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Status</td>
                                                                    {this.state.userData.is_blocked ? <td className="bg-red">Blocked</td> : <td className="bg-green">Active</td>}

                                                                </tr>
                                                                <tr>
                                                                    <td>Active Bookings</td>
                                                                    <td>1</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Cancelled Bookings</td>
                                                                    <td>5</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Bookings</td>
                                                                    <td>8</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Description</td>
                                                                    <td>{this.state.userData.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Admin Comments</td>
                                                                    <td>{this.state.userData.block_reason}</td>
                                                                </tr>
                                                            </tbody></table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="usersettings" aria-expanded="false">
                                    {/* show bookings */}
                                    <div className="row clearfix">
                                        {/* Colorful Panel Items With Icon */}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="card">
                                                <div className="header">
                                                    <h2>
                                                        <strong>Booking</strong> Details (including history)
                    </h2>
                                                    <div className="mt-2">
                                                        <span className="label label-primary">Active</span>
                                                        <span className="label label-success">Completed</span>
                                                        <span className="label label-danger">Cancelled</span>
                                                    </div>
                                                    <ul className="header-dropdown m-r--5">
                                                        <li className="dropdown">
                                                            <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                                <i className="material-icons">more_vert</i>
                                                            </a>
                                                            <ul className="dropdown-menu pull-right">
                                                                <li>
                                                                    <a href="#" onclick="return false;">Show All</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onclick="return false;">Active</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onclick="return false;">Cancelled</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onclick="return false;">Completed</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="body">
                                                    <div className="row clearfix">
                                                        <div className="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
                                                            <div className="panel-group" id="accordion_17" role="tablist" aria-multiselectable="true">
                                                                <div className="panel panel-col-blue">
                                                                    <div className="panel-heading" role="tab" id="headingOne_17">
                                                                        <p className="panel-title">
                                                                            <a role="button" data-toggle="collapse" data-parent="#accordion_17" href="#collapseOne_17" aria-expanded="false" aria-controls="collapseOne_17">
                                                                                <i className="material-icons mt-1">arrow_downward</i> <strong>Booking ID: 50 --- Arrival: 10/20/2020 --- Dept: 10/22/2020</strong>
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                    <div id="collapseOne_17" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_17">
                                                                        <div className="panel-body">
                                                                            <table>
                                                                                <tbody><tr>
                                                                                    <th>Booking ID</th>
                                                                                    <td>50</td>
                                                                                    <th>Booking Type</th>
                                                                                    <td>Online</td>
                                                                                </tr>
                                                                                    <tr>
                                                                                        <th>
                                                                                            Booking Status
                                      </th>
                                                                                        <td>
                                                                                            <span className="label label-success">Success</span>
                                                                                        </td>
                                                                                        <td />
                                                                                        <td />
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Arrival</th>
                                                                                        <td>20/6/2020</td>
                                                                                        <th>Departure</th>
                                                                                        <td>22/6/2020</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 1</th>
                                                                                        <td>Luxury Room 1</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$200</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 2</th>
                                                                                        <td>Super Room 6</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$100</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Total Rooms</th>
                                                                                        <td>2</td>
                                                                                        <th>Total Cost</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Discount</th>
                                                                                        <td>0.00</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Total Amount</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Amount Paid</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            <div className="pt-2">
                                                                                <button type="button" className="btn bg-green waves-effect">
                                                                                    <i className="material-icons">check_circle</i>
                                                                                    <span>Check out</span>
                                                                                </button>
                                                                                <button type="button" className="btn bg-blue waves-effect">
                                                                                    <i className="material-icons">edit</i>
                                                                                    <span>Edit</span>
                                                                                </button>
                                                                                <button type="button" className="btn bg-blue waves-effect">
                                                                                    <i className="material-icons">print</i>
                                                                                    <span>Reciept</span>
                                                                                </button>
                                                                                <button type="button" className="btn bg-red waves-effect">
                                                                                    <i className="material-icons">cancel</i>
                                                                                    <span>Cancel</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="panel panel-col-green">
                                                                    <div className="panel-heading" role="tab" id="headingTwo_17">
                                                                        <p className="panel-title">
                                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_17" href="#collapseTwo_17" aria-expanded="false" aria-controls="collapseTwo_17">
                                                                                <i className="material-icons mt-1">arrow_downward</i> <strong>Booking ID: 45 --- Arrival: 08/20/2020 --- Dept: 09/22/2020</strong>
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                    <div id="collapseTwo_17" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_17">
                                                                        <div className="panel-body">
                                                                            <table>
                                                                                <tbody><tr>
                                                                                    <th>Booking ID</th>
                                                                                    <td>50</td>
                                                                                    <th>Booking Type</th>
                                                                                    <td>Online</td>
                                                                                </tr>
                                                                                    <tr>
                                                                                        <th>
                                                                                            Booking Status
                                      </th>
                                                                                        <td>
                                                                                            <span className="label label-success">Success</span>
                                                                                        </td>
                                                                                        <td />
                                                                                        <td />
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Arrival</th>
                                                                                        <td>20/6/2020</td>
                                                                                        <th>Departure</th>
                                                                                        <td>22/6/2020</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 1</th>
                                                                                        <td>Luxury Room 1</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$200</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 2</th>
                                                                                        <td>Super Room 6</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$100</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Total Rooms</th>
                                                                                        <td>2</td>
                                                                                        <th>Total Cost</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Discount</th>
                                                                                        <td>0.00</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Total Amount</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Amount Paid</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            <div className="pt-2">
                                                                                <button type="button" className="btn bg-blue waves-effect">
                                                                                    <i className="material-icons">print</i>
                                                                                    <span>Reciept</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="panel panel-col-red">
                                                                    <div className="panel-heading" role="tab" id="headingThree_17">
                                                                        <p className="panel-title">
                                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_17" href="#collapseThree_17" aria-expanded="false" aria-controls="collapseThree_17">
                                                                                <i className="material-icons mt-1">arrow_downward</i> <strong>Booking ID: 35 --- Arrival: 05/20/2020 --- Dept: 5/22/2020</strong>
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                    <div id="collapseThree_17" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree_17">
                                                                        <div className="panel-body">
                                                                            <table>
                                                                                <tbody><tr>
                                                                                    <th>Booking ID</th>
                                                                                    <td>50</td>
                                                                                    <th>Booking Type</th>
                                                                                    <td>Online</td>
                                                                                </tr>
                                                                                    <tr>
                                                                                        <th>
                                                                                            Booking Status
                                      </th>
                                                                                        <td>
                                                                                            <span className="label label-danger">Cancelled</span>
                                                                                        </td>
                                                                                        <td />
                                                                                        <td />
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Arrival</th>
                                                                                        <td>20/6/2020</td>
                                                                                        <th>Departure</th>
                                                                                        <td>22/6/2020</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 1</th>
                                                                                        <td>Luxury Room 1</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$200</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Room# 2</th>
                                                                                        <td>Super Room 6</td>
                                                                                        <th>Cost</th>
                                                                                        <td>$100</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Total Rooms</th>
                                                                                        <td>2</td>
                                                                                        <th>Total Cost</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Discount</th>
                                                                                        <td>0.00</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Total Amount</th>
                                                                                        <td>$300</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td />
                                                                                        <td />
                                                                                        <th>Amount Paid</th>
                                                                                        <td>$0</td>
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            <div className="pt-2">
                                                                                <button type="button" className="btn bg-blue waves-effect">
                                                                                    <i className="material-icons">print</i>
                                                                                    <span>Reciept</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* #END# Colorful Panel Items With Icon */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="blockReasonModal" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Block Reason</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input id="brUser" type="hidden" />
                                    <label htmlFor="contact">Reason</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <textarea className="form-control" onChange={this.onChange} id="blockReason" cols={30} rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger waves-effect" onClick={this.blockUser}>Block User</button>
                                <button type="button" className="btn btn-primary waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        );
    }
}

export default UserDetails;