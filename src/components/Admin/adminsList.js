import React from 'react'
import AdminLayout from './adminLayout'
import { Link } from 'react-router-dom'
import axios from 'axios'
class AdminsList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
           password: '',
            name: '',
            email: '',
            contact: '',
            address: '',
            description: ''
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/add-admin',
            headers: { },
            data : this.state
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            this.forceUpdate()
          })
          .catch(function (error) {
            console.log(error);
          });
          window.$("#addAdmin").modal('hide')
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
                                        <h4 className="page-title">Admin Lists</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Admins</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <div className="col-xs-12 col-sm-6">
                                        <h2>
                                            Active <strong>Admins</strong></h2>
                                    </div>
                                    <ul className="header-dropdown m-r--5">
                                        <li className="dropdown">
                                            <Link to="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">more_vert</i>
                                            </Link>
                                            <ul className="dropdown-menu pull-right">
                                                <li>
                                                    <a data-toggle="modal" href="#addAdmin">Add Admin</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body">
                                    {/* ITEM*/}
                                    <AdminLayout />
                                    {/* END ITEM*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addAdmin" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Add New User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="name">Name</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="name" onChange={this.onChange} className="form-control" placeholder="Enter Name" />
                                        </div>
                                    </div>
                                    <label htmlFor="username">UserName</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="username" onChange={this.onChange} className="form-control" placeholder="Enter User Name" />
                                        </div>
                                    </div>
                                    <label htmlFor="password">Password</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="password" id="password" onChange={this.onChange} className="form-control" placeholder="Enter Password" />
                                        </div>
                                    </div>
                                    <label htmlFor="contact">Contact</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="contact" onChange={this.onChange} className="form-control" placeholder="Enter Contact" />
                                        </div>
                                    </div>
                                    <label htmlFor="email">Email</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="email" onChange={this.onChange} className="form-control" placeholder="Enter Email Address" />
                                        </div>
                                    </div>
                                    <label htmlFor="address">Address</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="address" onChange={this.onChange} className="form-control" placeholder="Enter Address" />
                                        </div>
                                    </div>
                                    <label htmlFor="description">Description</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="description" onChange={this.onChange} className="form-control" placeholder="Description" />
                                        </div>
                                    </div>
                                    <p className="alert alert-info">Note: An email will be sent to user consisting of temporary password which should be changed later on.
                                    </p>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.onSubmit} className="btn btn-info waves-effect">Add Admin</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default AdminsList;