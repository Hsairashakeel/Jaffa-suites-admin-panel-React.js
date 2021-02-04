import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../shared/loader'
var axios = require('axios');

class AllBookings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            total_bookings: 0,
            active_bookings: 0,
            completed_bookings: 0,
            cancelled_bookings: 0,
            bookingsData: [],
            isLoading: false,
            reason:"",
            refundAmount:""
        }
        this.renderBookingItem = this.renderBookingItem.bind(this)
        this.cancelBooking=this.cancelBooking.bind(this)
    }

    componentDidMount() {
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/booking/get-booking-stats',
            headers: {}
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        total_bookings: response.data.result[0].total_bookings,
                        active_bookings: response.data.result[0].active_bookings,
                        completed_bookings: response.data.result[0].completed_bookings,
                        cancelled_bookings: response.data.result[0].cancelled_bookings
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        var config1 = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/booking/get-all-bookings',
            headers: {}
        };
        this.setState({
            isLoading: true
        })

        axios(config1)
            .then((response) => {
                if (response.data.responseCode) {
                    this.setState({
                        bookingsData: response.data.result,
                        isLoading: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    onChange=e=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    renderBookingItem(bookingItem) {
        return (
            <tr>
                <td>{bookingItem.booking_id}</td>
                <td>
                    {bookingItem.booking_status === 'D'?<div className="label bg-green shadow-style">Complete</div>:bookingItem.booking_status === 'A' ? <div className="label bg-blue shadow-style">Active</div> : <div className="label bg-red shadow-style">Cancelled</div>}
                    
                </td>
                <td>{bookingItem.username}</td>
                <td>{bookingItem.contact}</td>
                <td>{bookingItem.rooms}</td>
                <td>{bookingItem.arrival.substring(0, 10)}</td>
                <td>{bookingItem.departure.substring(0, 10)}</td>
                <td>{bookingItem.amount_to_pay}</td>
                <td>{bookingItem.amount_paid}</td>
                <td>
                    {/* <a href className="btn btn-tbl-edit">
                        <i className="material-icons">remove_red_eye</i>
                    </a> */}
                     {bookingItem.booking_status === 'A' ?  <button className="btn btn-tbl-delete" onClick={()=>this.toggleModal(bookingItem.booking_id)}>
                        <i className="material-icons">cancel</i>
                    </button> :<div></div>}
                </td>
            </tr>
        );
    }

    toggleModal(id)
    {
        window.$("#BookingId").val(id);
        window.$("#cancelBooking").modal("show")
    }    
    cancelBooking(){
        const{  reason, refundAmount }=this.state
        const data={
            bookingID:window.$("#BookingId").val(),
            cancellatioNReason:reason,
            amountRefuneded:refundAmount
        }
        var config1 = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/booking/cancel-booking',
            headers: {},
            data:data
        };

        axios(config1)
            .then((response) => {
                if (response.data.responseCode) {

                    var config = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/booking/get-booking-stats',
                        headers: {}
                    };
            
                    axios(config)
                        .then((response) => {
                            if (response.data.responseCode === 1) {
                                this.setState({
                                    total_bookings: response.data.result[0].total_bookings,
                                    active_bookings: response.data.result[0].active_bookings,
                                    completed_bookings: response.data.result[0].completed_bookings,
                                    cancelled_bookings: response.data.result[0].cancelled_bookings
                                })
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            
            
                    var conf = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/booking/get-all-bookings',
                        headers: {}
                    };
                    this.setState({
                        isLoading: true
                    })
            
                    axios(conf)
                        .then((response) => {
                            if (response.data.responseCode) {
                                this.setState({
                                    bookingsData: response.data.result,
                                    isLoading: false
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

        window.$("#cancelBooking").modal("hide")
    }
    renderBookingTable() {
        var content = this.state.bookingsData.map(bookingItem => this.renderBookingItem(bookingItem))

        var res =
            (<table id="tableExport" className="display table table-hover table-checkable order-column width-per-100">
                <thead>
                    <tr>
                        <th className="center">#</th>
                        <th className="center">Status</th>
                        <th className="center">User</th>
                        <th className="center">Contact</th>
                        <th className="center">Rooms</th>
                        <th className="center">Arrival</th>
                        <th className="center">Depart</th>
                        <th className="center">Amount</th>
                        <th className="center">Paid</th>
                        <th className="center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
            )
        return res;
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
                                        <h4 className="page-title">All Bookings</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-2">
                                        <a href="#" onclick="return false;">Bookings</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        <strong>Booking</strong> Details
                                    </h2>
                                    <ul className="header-dropdown m-r--5">
                                        <li className="dropdown">
                                            <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">more_vert</i>
                                            </a>
                                            <ul className="dropdown-menu pull-right">

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="support-box text-center l-bg-orange">
                                                <div className="text m-b-10 mt-2">
                                                    <br />
                                                    <h3>Total Bookings</h3>
                                                    <h3>{this.state.total_bookings}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="support-box text-center l-bg-cyan">
                                                <div className="text m-b-10 mt-2">
                                                    <br />
                                                    <h3>Active Bookings</h3>
                                                    <h3>{this.state.active_bookings}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="support-box text-center l-bg-green">
                                                <div className="text m-b-10 mt-2">
                                                    <br />
                                                    <h3>Completed</h3>
                                                    <h3>{this.state.completed_bookings}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="support-box text-center l-bg-red">
                                                <div className="text m-b-10 mt-2">
                                                    <br />
                                                    <h3>Cancelled</h3>
                                                    <h3>{this.state.cancelled_bookings}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-fluid mb-2">
                                            <button type="button" className="btn btn-info waves-effect"><Link style={{ color: "white" }} to="/bookroom">New Booking</Link></button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {this.state.isLoading ? <Loading /> : this.renderBookingTable()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" id="cancelBooking" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myLargeModalLabel">Search User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input type="hidden" id="BookingId" />
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="reason" value={this.state.reason} onChange={this.onChange} className="form-control" placeholder="Enter Reason " />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="number" id="refundAmount" value={this.state.refundAmount} onChange={this.onChange} className="form-control" placeholder="Enter Refund Amount" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info waves-effect" onClick={this.cancelBooking}>Done</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}
export default AllBookings;