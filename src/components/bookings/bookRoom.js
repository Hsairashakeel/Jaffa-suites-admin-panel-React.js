import React from 'react'
import swal from 'sweetalert'
import Loader from './../shared/loader'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import $ from 'jquery'
const clone = require('rfdc')()
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

class BookRooms extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            contact: "",
            email: "",
            address: "",
            people: "",
            users: [],
            rooms: [],
            arrDate: new Date(),
            depDate: new Date(),
            selectedRooms: [],
            selectedRoomsWithPrice: [],
            isUsersLoading: false,
            isRoomsLoading: false,
            discount: 0,
            step: 1
        }
        this.renderUserItem = this.renderUserItem.bind(this)
        this.onAddUser = this.onAddUser.bind(this)
        this.setArrDate = this.setArrDate.bind(this)
        this.setDepDate = this.setDepDate.bind(this)
        this.renderRoomTable = this.renderRoomTable.bind(this)
        this.getAvailableRooms = this.getAvailableRooms.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.renderRoomsInReview = this.renderRoomsInReview.bind(this)
        this.modifyRoomPriceInState = this.modifyRoomPriceInState.bind(this)
        this.modifyDiscountInState = this.modifyDiscountInState.bind(this)
        this.changeStep = this.changeStep.bind(this)
        this.prevStep = this.prevStep.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        // eslint-disable-next-line no-extend-native
        Array.prototype.sum = function (prop) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            return total
        }
        // eslint-disable-next-line no-extend-native
        Array.prototype.discountedPrice = function (prop, discount) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            if (discount === 0) {
                return total
            }
            else if (isNaN(total)) {
                return 0;
            }
            else {
                return (total - (discount * (total / 100)))
            }
        }
    }


    onSubmit() {
        var arr = this.state.arrDate.getFullYear().toString() + this.state.arrDate.getMonth().toString() + this.state.arrDate.getDate().toString()
        var dep = this.state.depDate.getFullYear().toString() + this.state.depDate.getMonth().toString() + this.state.depDate.getDate().toString()
        var discountPrice = this.state.selectedRoomsWithPrice.discountedPrice("cost", this.state.discount);
        var rooms = [];
        for (var i = 0; i < this.state.selectedRoomsWithPrice.length; i++) {
            var content = {
                roomID: this.state.selectedRoomsWithPrice[i].room_id,
                roomCost: this.state.selectedRoomsWithPrice[i].cost,
            }
            rooms.push(content);
        }
        var roomData = {
            "roomDetails": rooms
        }
        var data = {
            username: this.state.name,
            arrivalDate: arr,
            departureDate: dep,
            numberOfPeople: this.state.people,
            totalAmount: this.state.selectedRoomsWithPrice.sum("cost"),
            discount: this.state.discount,
            amountToPay: discountPrice,
            amountPaid: discountPrice,
            rooms: roomData,
            bookingType: 'F'
        }

        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/booking/add-booking',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.myAlertBottom('alert-success', 'Booking done', 2000)
                    var st = this.state.step
                    st++
                    this.setState({
                        step: st
                    }
                    )
                }
                else {
                    this.myAlertBottom('alert-danger', 'Booking Error', 2000)
                }
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Booking Error', 2000)
            });

    }

    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").removeClass("alert-danger");
        $(".myAlert-bottom").removeClass("alert-success");

        $(".myAlert-bottom").addClass(className);

        $(".myAlert-bottom").slideDown();
        setTimeout(function () {
            $(".myAlert-bottom").slideUp();
        }, time);
    }

    changeStep() {
        var st = this.state.step

        if (st === 1) {
            if (this.state.name == "" || this.state.contact == "" || this.state.email == "" || this.state.address == "" || this.state.people == "") {
                this.myAlertBottom('alert-danger', 'One or More Fields Empty', 2000)
            }
            else {
                st++;
                this.setState({
                    step: st
                })
            }
        }
        else if (st === 2) {
            if (this.state.selectedRooms.length == 0) {
                this.myAlertBottom('alert-danger', 'Select A Room', 2000)
            }
            else {
                st++;
                this.setState({
                    step: st
                })
            }
        }
        else if (st === 3) {
            st++;
            this.setState({
                step: st
            })
        }
    }
    prevStep() {
        var st = this.state.step
        st--;
        this.setState({
            step: st
        })
    }

    setArrDate(date) {
        this.setState({
            arrDate: date,
            selectedRooms: [],
            selectedRoomsWithPrice: []
        })
        this.getAvailableRooms()
    }
    setDepDate(date) {
        this.setState({
            depDate: date,
            selectedRooms: [],
            selectedRoomsWithPrice: []
        })
        this.getAvailableRooms()
    }
    onSelect(id) {
        var arr = [...this.state.selectedRooms]
        var arr1 = [...this.state.selectedRoomsWithPrice]
        if (arr.includes(id)) {
            var index = arr.indexOf(id)
            if (index !== -1) {
                arr.splice(index, 1)
                this.setState({
                    selectedRooms: arr
                })
            }
            var ind = this.state.selectedRoomsWithPrice.filter(room => {
                return room.room_id == id
            })
            index = arr1.indexOf(ind[0])
            if (index !== -1) {
                arr1.splice(index, 1)
                this.setState({
                    selectedRoomsWithPrice: arr1
                })
            }
        }
        else {
            arr.push(id)
            var roomsWithPrice = this.state.rooms.filter(room => {
                return room.room_id == id
            })
            arr1.push(clone(roomsWithPrice[0]))
            this.setState({
                selectedRooms: arr,
                selectedRoomsWithPrice: arr1
            })
        }
    }


    getAvailableRooms() {
        this.setState({
            isRoomsLoading: true
        })
        var arr = this.state.arrDate.getFullYear().toString() + this.state.arrDate.getMonth().toString() + this.state.arrDate.getDate().toString()
        var dep = this.state.depDate.getFullYear().toString() + this.state.depDate.getMonth().toString() + this.state.depDate.getDate().toString()
        var data = qs.stringify({
            'userArrival': arr,
            'userDeparture': dep
        });
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/room/get-available-rooms-for-booking',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        rooms: response.data.result,
                        isRoomsLoading: false
                    })
                }
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Error Loading Rooms', 2000)
            });
    }
    componentDidMount() {
        this.setState({
            isUsersLoading: true,
        })
        this.getAvailableRooms()
        axios(config
        )
            .then(res => {
                if (res.data.responseCode === 1) {
                    this.setState({
                        users: res.data.result,
                        isUsersLoading: false
                    })
                }
            })
            .catch(err => {
                this.myAlertBottom('alert-danger', 'Error Loading Users', 2000)
            })
    }

    onAddUser = e => {
        e.preventDefault();

        if (this.state.name != "" && this.state.email != "" && this.state.contact != "") {
            var data = qs.stringify({
                'username': this.state.name,
                'password': "12345",
                'email': this.state.email,
                'contact': this.state.contact,
                'name': ""
            });
            var conf = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/user/add-user',
                headers: {},
                data: data
            };
            axios(conf)
                .then((response) => {
                    if (response.data.responseCode === 1) {
                        this.myAlertBottom('alert-success', 'User Added', 2000)
                        this.setState({
                            isUsersLoading: true,
                        })
                        this.getAvailableRooms()
                        axios(config
                        )
                            .then(res => {
                                if (res.data.responseCode === 1) {
                                    this.setState({
                                        users: res.data.result,
                                        isUsersLoading: false
                                    })
                                }
                            })
                            .catch(err => {
                                this.myAlertBottom('alert-danger', 'Error Loading Users', 2000)
                            })
                    }
                    else if (response.data.responseCode === -2) {
                        this.myAlertBottom('alert-danger', 'Username Taken', 2000)
                    }
                })
                .catch((error) => {
                    this.myAlertBottom('alert-danger', 'Error Adding User', 2000)
                });
        }
        else {
            this.myAlertBottom('alert-danger', 'One or More fields Empty', '3000')
        }

    }

    renderUserItem(user) {
        return (
            <tr>
                <td className="table-img">
                    <img src="./../../assets/images/user/user1.jpg" alt="" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                    {user.is_blocked ? <span className="label bg-red shadow-style">Blocked</span> : <span className="label bg-green shadow-style">Active</span>}
                </td>
                {user.is_blocked ? <td></td> : <td><button className="btn btn-info" onClick={() => this.selectUser(user)}>Select</button></td>}
            </tr>
        )
    }
    selectUser(user) {
        this.setState({
            name: user.username,
            email: user.email,
            contact: user.contact
        })
        window.$("#searchUser").modal("hide");
    }
    renderCurrentUsers(users) {
        var content = this.state.users.map(user => this.renderUserItem(user))
        return (
            <table id="tableExport" className="table table-hover dashboard-task-infos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        )
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    renderRoomsItems(room) {
        return (
            <tr>
                <td className="tbl-checkbox">
                    <label>
                        <input type="checkbox" onClick={() => this.onSelect(room.room_id)} />
                        <span />
                    </label>
                </td>
                <td className="center">
                    {room.room_id}
                </td>
                <td className="center">
                    {room.name}
                </td>
                <td className="center">
                    {room.type}
                </td>
                <td className="center">
                    {room.is_locked ? <div className="label bg-red shadow-style">Blocked</div> : <div className="label bg-green shadow-style">Available</div>}
                </td>
                <td className="center">
                    {room.cost}
                </td>
                <td className="center">
                    {room.discount}
                </td>
                <td className="center">
                    {room.final_cost}
                </td>
            </tr>
        );
    }

    renderRoomsInReview(room) {
        return (
            <tr>
                <th>{room.room_id}</th>
                <td>{room.name}</td>
                <th>Cost</th>
                <td>{room.cost}</td>
                <td>
                    {/* on this button fire an event that sets the room_id field and room_price field to their values and toggles modal.... then make onclick function of done for modal field that modifies the state array... thats all*/}
                    <button className="btn tblActnBtn" data-toggle="modal" data-target="#change-cost-modal" onClick={() => this.modifyRoomPrice(room.room_id, room.cost)}>
                        <i className="material-icons">mode_edit</i>
                    </button>
                </td>
            </tr>
        )
    }

    modifyDiscountInState() {
        var dis = window.$("#new_discount").val()
        this.setState({
            discount: Number(dis)
        })
    }
    modifyRoomPrice(id, cost) {
        window.$("#room_id").val(id);
        window.$("#room_price").val(cost);
        window.$("#change-cost-modal").modal("show");
    }

    modifyRoomPriceInState() {
        //search for that id wala room and modify its price.....
        var toModify = [...this.state.selectedRoomsWithPrice]
        var id = window.$("#room_id").val();
        var ind = this.state.selectedRoomsWithPrice.filter(room => {
            return room.room_id == id
        })
        var index = toModify.indexOf(ind[0])
        if (index !== -1) {
            var obj = toModify[index]
            toModify.splice(index, 1)
            obj.cost = Number(window.$("#room_price").val());
            toModify.push(obj)
            this.setState({
                selectedRoomsWithPrice: toModify
            })
        }

    }
    renderRoomTable() {
        var content = this.state.rooms.map(room => this.renderRoomsItems(room))
        return (
            <div className="table-responsive">
                <table className="table table-hover js-basic-example contact_list">
                    <thead>
                        <tr>
                            <th className="center">Select</th>
                            <th className="center">ID</th>
                            <th className="center">Room</th>
                            <th className="center">Type</th>
                            <th className="center">Status</th>
                            <th className="center">Cost</th>
                            <th className="center">Discount</th>
                            <th className="center">Final Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (

            <div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="block-header">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <ul className="breadcrumb breadcrumb-style ">
                                        <li className="breadcrumb-item">
                                            <h4 className="page-title">New Booking</h4>
                                        </li>
                                        <li className="breadcrumb-item bcrumb-1">
                                            <a href="../../index.html">
                                                <i className="fas fa-home" /> Home</a>
                                        </li>
                                        <li className="breadcrumb-item bcrumb-2">
                                            <a href="#" onclick="return false;">Book Room</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="card">
                                    <div className="header">
                                        <h2>
                                            Add <strong>Booking</strong> Details</h2>
                                        <ul className="header-dropdown m-r--5">
                                            <li className="dropdown">
                                                <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <i className="material-icons">more_vert</i>
                                                </a>
                                                <ul className="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="#" onclick="return false;">Add New User</a>
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
                                        <div id="wizard_horizontal">
                                            {this.state.step === 1 ?
                                                <div>
                                                    <h2>Add User</h2>
                                                    <section>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <form className="mt-4">
                                                                    <label htmlFor="name">Name</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.onChange} placeholder="Enter Name" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="contact">Contact</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <input type="text" id="contact" className="form-control" value={this.state.contact} onChange={this.onChange} placeholder="Enter Contact" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="email_address1">Email</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <input type="text" id="email" onChange={this.onChange} value={this.state.email} className="form-control" placeholder="Enter Email Address" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="address">Address</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <input type="text" id="address" onChange={this.onChange} value={this.state.address} className="form-control" placeholder="Enter Address" />
                                                                        </div>
                                                                    </div>
                                                                    <p className="alert alert-info">Note: An email will be sent to user consisting of temporary password which should be changed later on.</p>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <button type="button" className="btn btn-info" onClick={this.onAddUser} >Add User</button>
                                                                            <button type="button" data-toggle="modal" data-target="#searchUser" className="btn btn-primary">Search User</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <form className="mt-4">
                                                                    <label htmlFor="name">Arrival</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <DatePicker selected={this.state.arrDate} onChange={date => this.setArrDate(date)} monthsShown={2} withPortal />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="name">Departure</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <DatePicker selected={this.state.depDate} onChange={date => this.setDepDate(date)} monthsShown={2} withPortal />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="name">People</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <input type="number" id="people" onChange={this.onChange} value={this.state.people} className="form-control" placeholder="Please enter number of people" />
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <button type="button" className="btn btn-primary" style={{ float: "right" }} onClick={this.changeStep}>Next</button>
                                                        </div>
                                                    </section>
                                                </div>
                                                : <></>}

                                            {this.state.step === 2 ?
                                                <div>
                                                    <h2>Select Rooms</h2>
                                                    <section>
                                                        {this.state.isRoomsLoading ? <Loader /> : this.renderRoomTable()}
                                                        <div>
                                                            <button type="button" className="btn btn-primary" style={{ float: "right" }} onClick={this.changeStep}>Next</button>
                                                            <button type="button" className="btn btn-info" style={{ float: "right" }} onClick={this.prevStep}>Previous</button>
                                                        </div>
                                                    </section>
                                                </div>
                                                : <></>
                                            }

                                            {this.state.step === 3 ?
                                                <div>
                                                    <h2>Review &amp; Payment</h2>
                                                    <section>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <table className="table table-hover table-responsive mt-4">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>User</th>
                                                                            <td>{this.state.name}</td>
                                                                            <th>Contact</th>
                                                                            <td>{this.state.contact}</td>
                                                                            <td />
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Arrival</th>
                                                                            <td>{this.state.arrDate.getDate().toString() + "/" + this.state.arrDate.getMonth().toString() + "/" + this.state.arrDate.getFullYear().toString()}</td>
                                                                            <th>Departure</th>
                                                                            <td>{this.state.depDate.getDate().toString() + "/" + this.state.depDate.getMonth().toString() + "/" + this.state.depDate.getFullYear().toString()}</td>
                                                                            <td />
                                                                        </tr>

                                                                        {this.state.selectedRoomsWithPrice.map(room => {
                                                                            return this.renderRoomsInReview(room)
                                                                        })}
                                                                        <tr>
                                                                            <th>Total Rooms</th>
                                                                            <td>{this.state.selectedRoomsWithPrice.length}</td>
                                                                            <th>Total Cost</th>
                                                                            <td>{this.state.selectedRoomsWithPrice.sum("cost")}</td>
                                                                            <td />
                                                                        </tr>
                                                                        <tr>
                                                                            <td />
                                                                            <td />
                                                                            <th>Discount</th>
                                                                            <td>{this.state.discount}</td>
                                                                            <td><button className="btn tblActnBtn" data-toggle="modal" data-target="#change-discount-modal">
                                                                                <i className="material-icons">mode_edit</i>
                                                                            </button></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td />
                                                                            <td />
                                                                            <th>Total Amount</th>

                                                                            <td>{this.state.selectedRoomsWithPrice.discountedPrice("cost", this.state.discount)}</td>
                                                                            <td />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <form className="mt-4">
                                                                    <div id="payment-section">
                                                                        <label htmlFor="name">Card Number</label>
                                                                        <div className="form-group">
                                                                            <div className="form-line">
                                                                                <input type="number" id="name" className="form-control" placeholder="Enter Card Number" />
                                                                            </div>
                                                                        </div>
                                                                        <label htmlFor="contact">CVV</label>
                                                                        <div className="form-group">
                                                                            <div className="form-line">
                                                                                <input type="number" id="contact" className="form-control" placeholder="Enter VV" />
                                                                            </div>
                                                                        </div>
                                                                        <label htmlFor="email_address1">Expiry Date</label>
                                                                        <div className="form-group">
                                                                            <div className="form-line">
                                                                                <input type="text" id="email_address1" className="form-control" placeholder="Enter Expiry of Card" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <div className="form-line">
                                                                                <input type="button" className="btn btn-info" defaultValue="Proceed with Payment" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="email_address1">Or Collecting Cash?</label>
                                                                    <div className="form-group">
                                                                        <div className="form-line">
                                                                            <label className="tbl-checkbox">
                                                                                <input type="checkbox" id="collection-cash-checkbox" />
                                                                                <span />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button type="button" className="btn btn-success" style={{ float: "right" }} onClick={this.onSubmit}>BOOK ROOM</button>
                                                            <button type="button" className="btn btn-info" style={{ float: "right" }} onClick={this.prevStep}>Previous</button>
                                                        </div>
                                                    </section>
                                                </div>
                                                : <></>}

                                            {this.state.step === 4 ?
                                                <div>
                                                    <h2>Invoice</h2>
                                                    <section>
                                                        <div className="container-fluid">
                                                            <div className="row clearfix">
                                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <div className="card">
                                                                        <div className="body">
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <div className="white-box">
                                                                                        <h3>
                                                                                            <b>INVOICE</b>
                                                                                            {/* <span className="pull-right">#345766</span> */}
                                                                                        </h3>
                                                                                        <hr />
                                                                                        <div className="row">
                                                                                            <div className="col-md-12">
                                                                                                <div className="pull-left">
                                                                                                    <address>
                                                                                                        <p className="font-bold">USER DETAILS :</p>
                                                                                                        <p className>
                                                                                                            {this.state.name}
                                                                                                            <br /> {this.state.contact},
                                                                                                        <br /> {this.state.email},
                                                                                                        <br /> People: {this.state.people}
                                                                                                            <br /> Rooms: {this.state.selectedRoomsWithPrice.length}
                                                                                                        </p>
                                                                                                    </address>
                                                                                                </div>
                                                                                                <div className="pull-right text-right">
                                                                                                    <address>
                                                                                                        <p className="font-bold">BOOKING DETAILS :</p>
                                                                                                        <p className>
                                                                                                            <br />
                                                                                                            <b>Date Arrival:</b> {this.state.arrDate.getDay() + "/" + this.state.arrDate.getMonth() + "/" + this.state.arrDate.getFullYear()}
                                                                                                            <br />
                                                                                                            <b>Status:</b>
                                                                                                            <span className="label label-success">Success</span>
                                                                                                        </p>
                                                                                                    </address>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="table-responsive m-t-10">
                                                                                                    <table className="table table-hover">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th className="text-center">Room</th>
                                                                                                                <th className="text-center">Type</th>
                                                                                                                <th className="text-center">Cost</th>
                                                                                                                <th className="text-center">Discout</th>
                                                                                                                <th className="text-center">Final Cost</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {this.state.selectedRoomsWithPrice.map(room => {
                                                                                                                return (
                                                                                                                    <tr>
                                                                                                                        <td className="text-center">Room {room.room_id}</td>
                                                                                                                        <td className="text-center">{room.type}</td>
                                                                                                                        <td className="text-center">${room.cost}</td>
                                                                                                                        <td className="text-center">{room.discount}</td>
                                                                                                                        <td className="text-right">{room.final_cost}</td>
                                                                                                                    </tr>
                                                                                                                )
                                                                                                            })}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="pull-right m-t-10 text-right">
                                                                                                    <p>Sub - Total amount: {this.state.selectedRoomsWithPrice.sum("cost")}</p>
                                                                                                    <p>Discount : {this.state.discount}</p>
                                                                                                    <hr />
                                                                                                    <h3>
                                                                                                        <b>Total :</b>{this.state.selectedRoomsWithPrice.discountedPrice("cost", this.state.discount)}</h3>
                                                                                                </div>
                                                                                                <div className="clearfix" />
                                                                                                <hr />
                                                                                                <div className="text-right">
                                                                                                    <button className="btn-hover btn-border-radius color-1"><i className="fas fa-print" />
                                                                                                    Print</button>
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
                                                        </div>
                                                    </section>
                                                </div>
                                                : <></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* modal for searching an existing user */}
                <div className="modal fade" id="change-cost-modal" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Change Cost</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input type="hidden" id="room_id" />
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="number" id="room_price" className="form-control" placeholder="Enter New Cost" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info waves-effect" onClick={this.modifyRoomPriceInState}>Done</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="change-discount-modal" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Change Discount</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="number" id="new_discount" className="form-control" placeholder="Enter New Discount" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info waves-effect" onClick={this.modifyDiscountInState}>Done</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" id="searchUser" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myLargeModalLabel">Search User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.isUsersLoading ? <Loader /> : this.renderCurrentUsers(this.state.users)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myAlert-bottom alert text-center">
                    <strong id="alert-message"></strong>
                </div>
            </div>


        );
    }
}

export default BookRooms;