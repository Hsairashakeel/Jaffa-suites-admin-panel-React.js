import React from 'react'
import Loader from './../shared/loader'
import swal from 'sweetalert';
import $ from 'jquery'
var axios = require('axios');
var qs = require('qs');

class something extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            rooms: []
        }
        this.toggleBlock = this.toggleBlock.bind(this)
        this.renderTable = this.renderTable.bind(this)
        this.delRoom = this.delRoom.bind(this)
    }

    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").removeClass("alert-success")
        $(".myAlert-bottom").removeClass("alert-danger")
		$(".myAlert-bottom").addClass(className);

		$(".myAlert-bottom").slideDown();
		setTimeout(function () {
			$(".myAlert-bottom").slideUp();
		}, time);
	}
    componentDidMount() {
        this.setState({
            loading: true
        })
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/room/get-rooms-table-list',
            headers: {}
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        rooms: response.data.result,
                        loading: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    toggleBlock(room) {
        if (room.is_locked) {
            var data = qs.stringify({
                'id': room.room_id,
                'lockRoom': 'N'
            });
            var config = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/room/change-room-lock-status',
                headers: {},
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.responseCode === 1) {
                        this.setState({
                            loading: true
                        })
                        var config = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/room/get-rooms-table-list',
                            headers: {}
                        };

                        axios(config)
                            .then((response) => {
                                if (response.data.responseCode === 1) {
                                    this.setState({
                                        rooms: response.data.result,
                                        loading: false
                                    })
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            var data1 = qs.stringify({
                'id': room.room_id,
                'lockRoom': 'Y'
            });
            var config1 = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/room/change-room-lock-status',
                headers: {},
                data: data1
            };

            axios(config1)
                .then((response) => {
                    this.setState({
                        loading: true
                    })
                    if (response.data.responseCode === 1) {
                        var config = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/room/get-rooms-table-list',
                            headers: {}
                        };

                        axios(config)
                            .then((response) => {
                                if (response.data.responseCode === 1) {
                                    this.setState({
                                        rooms: response.data.result,
                                        loading: false
                                    })
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    renderRoomItem(room) {
        return (
            <tr>
                <td>
                    {room.room_id}
                </td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>
                    {room.is_locked ? <span className="label bg-red shadow-style">Block</span> : <span className="label bg-green shadow-style">Active</span>}
                    <button className="btn tblActnBtn" onClick={() => this.toggleBlock(room)}  >
                        <i className="material-icons">block</i>
                    </button>
                </td>
                <td>{room.cost}</td>
                <td>{room.discount}</td>
                <td>{room.final_cost}</td>
                <td>{room.total_bookings}</td>
                <td>
                    {/* <button className="btn tblActnBtn">
                        <i className="material-icons">remove_red_eye</i>
                    </button>
                    <button className="btn tblActnBtn">
                        <i className="material-icons">mode_edit</i>
                    </button> */}
                    <button className="btn tblActnBtn" onClick={()=>this.delRoom(room)}>
                        <i className="material-icons">delete</i>
                    </button>
                </td>
            </tr>
        );
    }

    delRoom(room) {
       
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var data = qs.stringify({
                        'id': room.room_id
                    });
                    var config = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/room/delete-room',
                        headers: {},
                        data: data
                    };

                    axios(config)
                        .then((response) => {
                            if (response.data.responseCode === 1) {
                                this.myAlertBottom('alert-success', "Room Deleted", 3000)
                                this.setState({
                                    loading: true
                                })
                                var config = {
                                    method: 'post',
                                    url: 'https://jaffa-suites-backend.herokuapp.com/room/get-rooms-table-list',
                                    headers: {}
                                };

                                axios(config)
                                    .then((response) => {
                                        if (response.data.responseCode === 1) {
                                            this.setState({
                                                rooms: response.data.result,
                                                loading: false
                                            })
                                        }
                                    })
                                    .catch( (error)=> {
                                        console.log(error);
                                    });
                            }
                            else
                            {
                                this.myAlertBottom('alert-danger', 'Error Deleting', 3000)
                            }
                        })
                        .catch( (error)=> {
                            this.myAlertBottom('alert-danger', 'Error Deleting', 3000)
                        });
                }
                else
                {
                    this.myAlertBottom('alert-success', 'Room is Safe', 3000)
                }
            });

    }
    renderTable() {
        var tBody = this.state.rooms.map(room => this.renderRoomItem(room))
        return (
            <div className="table-responsive">
                <table id="tableExport" className="table table-hover dashboard-task-infos">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Room</th>
                            <th>Room Type</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Discount</th>
                            <th>Final Cost</th>
                            <th>Total Bookings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tBody}
                    </tbody>
                </table>
            </div>
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
                                        <h4 className="page-title">All Rooms</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Rooms</li>
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
                                        <strong>Room</strong> Details</h2>
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
                                                    <a data-toggle="modal" href="#addUser">Add new Room</a>
                                                </li>
                                                <li>
                                                    <a href="#" onclick="return false;">Something else here</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tableBody">
                                    {this.state.loading ? <Loader /> : this.renderTable()}
                                </div>
                            </div>
                        </div>
                        {/* #END# Task Info */}
                    </div>
                </div>
                <div className="myAlert-bottom alert text-center">
					<strong id="alert-message"></strong>
				</div>
            </section>

        );
    }
}

export default something;