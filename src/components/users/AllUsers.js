import React from 'react'
import swal from 'sweetalert';
import Loader from './../shared/loader'
import $ from 'jquery'
var axios = require('axios');
var qs = require('qs');

var data = qs.stringify({

});
var config = {
    method: 'post',
    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
    headers: {},
    data: data
};

class AllUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: "",
            contact: "",
            username: "",
            email_address: "",
            loading: false,
            blockReason:"",
        }
        this.toggleBlock = this.toggleBlock.bind(this)
        this.delUser = this.delUser.bind(this)
        this.renderUserItem = this.renderUserItem.bind(this)
        this.blockUser=this.blockUser.bind(this)
    }

    renderUserItem(user) {
        return (
            <tr>
                <td></td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                    {user.is_blocked ? <span className="label bg-red shadow-style">Block</span> : <span className="label bg-green shadow-style">Active</span>}
                    <button className="btn tblActnBtn" onClick={() => this.toggleBlock(user)}>
                        <i className="material-icons">block</i>
                    </button>
                </td>
                <td>{user.active_bookings}</td>
                <td>{user.total_bookings}</td>
                <td >
                    <a style={{ paddingTop: "0.5em" }} className="btn tblActnBtn" href={"/users/" + user.username} target="_blank">
                        <i className="material-icons">remove_red_eye</i>
                    </a>
                    <button className="btn tblActnBtn" onClick={() => this.delUser(user.username)}>
                        <i className="material-icons">delete</i>
                    </button>
                </td>
            </tr>
        )
    }

    blockUser(){
     
        var username=$("#brUser").val()
        var reason=this.state.blockReason
        var data = {
            'username': username,
            'blockReason':reason
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
                var con = {
                    method: 'post',
                    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
                    headers: {},
                    data: data
                };
                axios(con
                )
                    .then(res => {
                        if (res.data.responseCode == 1) {
                            this.setState({
                                users: res.data.result
                            })
                        }
                    })
                    .catch(err => {
                        this.myAlertBottom('alert-danger', 'Error Loading Users', 3000)
                    })
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
            data = qs.stringify({
                'username': user.username
            });
            config = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/user/unblock-user',
                headers: {},
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.responseCode === 1) {
                        var con = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
                            headers: {},
                            data: data
                        };
                        axios(con
                        )
                            .then(res => {
                                if (res.data.responseCode == 1) {
                                    this.setState({
                                        users: res.data.result
                                    })
                                }
                            })
                            .catch(err => {
                                this.myAlertBottom('alert-danger', 'Error Loading Users', 3000)
                            })
                    }
                })
                .catch((error) => {
                    this.myAlertBottom('alert-danger', 'Error Loading User', 3000)
                });
        }
    }


    delUser(username) {
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/delete-user',
            headers: {},
            data: { "username": username }
        };

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios(config)
                        .then((response) => {
                            if (response.data.responseCode === 1) {
                                this.myAlertBottom('alert-success', 'User Deleted', 3000)
                                var con = {
                                    method: 'post',
                                    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
                                    headers: {},
                                    data: data
                                };
                                axios(con
                                )
                                    .then(res => {
                                        if (res.data.responseCode == 1) {
                                            this.setState({
                                                users: res.data.result
                                            })
                                        }
                                    })

                            }
                            else {
                                this.myAlertBottom('alert-danger', 'Error Deleting User', 3000)
                            }
                        })
                        .catch((error) => {
                            this.myAlertBottom('alert-danger', 'Error Deleting User', 3000)
                        });
                } else {
                    this.myAlertBottom('alert-success', 'User is Safe', 2000)
                }
            });
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        axios(config
        )
            .then(res => {
                if (res.data.responseCode == 1) {
                    this.setState({
                        users: res.data.result,
                        loading: false
                    })
                }
            })
            .catch(err => {
                this.myAlertBottom('alert-danger', 'Error Loading Users', 3000)
            })
    }

    renderUsers() {
        var tBody = this.state.users.map(usr => {
            return this.renderUserItem(usr)
        })
        var content = (
            <div className="tableBody" id="tb">
                <div className="table-responsive">
                    <table id="tableExport" className="table table-hover dashboard-task-infos">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Active Bookings</th>
                                <th>Total Bookings</th>
                                <th>Actions</th>
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

    onSubmit = e => {
        e.preventDefault();
        window.$("#addUser").modal('hide')
        var data = qs.stringify({
            'username': this.state.username,
            'password': "12345",
            'email': this.state.email_address,
            'contact': this.state.contact,
            "name": this.state.name
        });

        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/add-user',
            headers: {},
            data: data
        };
        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        username:"",
                        email:"",
                        contact:"",
                        name:""
                    })
                    this.myAlertBottom('alert-success', 'User Added', 3000)
                    this.setState({
                        loading: true
                    })
                    var con = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
                        headers: {},
                        data: data
                    };
                    axios(con
                    )
                        .then(res => {
                            if (res.data.responseCode == 1) {
                                this.setState({
                                    users: res.data.result,
                                    loading: false
                                })
                            }
                        })
                        .catch(err => {
                            this.myAlertBottom('alert-danger', 'Error Loading User', 3000)
                        })
                }
                else if (response.data.responseCode === -2) {
                    this.myAlertBottom('alert-danger', 'Username Already Taken', 3000)
                }
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Error Adding User', 3000)
            });

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
                                        <h4 className="page-title">All Users</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Users</li>
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
                                        <strong>Users</strong> Details</h2>
                                    <ul className="header-dropdown m-r--5">
                                        <li className="dropdown">
                                            <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">more_vert</i>
                                            </a>
                                            <ul className="dropdown-menu pull-right">
                                                <li>
                                                    <a href="#" onclick="return false;">Export as Exel</a>
                                                </li>
                                                <li>
                                                    <a data-toggle="modal" href="#addUser">New User</a>
                                                </li>
                                                <li>
                                                    <a href="#" onclick="return false;">Something else here</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                {this.state.loading ? <Loader /> : this.renderUsers()}

                            </div>
                        </div>
                        {/* #END# Task Info */}
                    </div>
                </div>
                <div className="modal fade" id="addUser" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Add New User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <label htmlFor="name">Name</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="name" onChange={this.onChange} className="form-control" placeholder="Enter Name" value={this.state.name} />
                                        </div>
                                    </div>
                                    <label htmlFor="contact">Contact</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="contact" onChange={this.onChange} className="form-control" value={this.state.contact} placeholder="Enter Contact" />
                                        </div>
                                    </div>
                                    <label htmlFor="email_address1">Email</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="email_address" onChange={this.onChange} value={this.state.email_address} className="form-control" placeholder="Enter Email Address" />
                                        </div>
                                    </div>
                                    <label htmlFor="address">Username</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="username" onChange={this.onChange} value={this.state.username} className="form-control" placeholder="Enter Address" />
                                        </div>
                                    </div>
                                    <p className="alert alert-info">Note: An email will be sent to user consisting of temporary password which should be changed later on.
                                    </p></form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-info waves-effect" onClick={this.onSubmit}>Add User</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
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
                                    <input id="brUser" type="hidden"  />
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

                <div className="myAlert-bottom alert text-center">
                    <strong id="alert-message"></strong>
                </div>
            </section>
        );
    }
}

export default AllUsers;