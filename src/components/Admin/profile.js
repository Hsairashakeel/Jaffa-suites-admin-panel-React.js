import React from 'react'
import axios from 'axios'
import $ from 'jquery'

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            cPassword: "",
            current: "",
            password: "",
            username: "",
            name: "",
            email: "",
            contact: "",
            address: "",
            description: ""
        }
    }

    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").addClass(className);

        $(".myAlert-bottom").slideDown();
        setTimeout(function () {
            $(".myAlert-bottom").slideUp();
        }, time);
    }
    onSubmitUserInfo = e => {
        e.preventDefault();
        
        if (this.state.name !== "" && this.state.username !== "" && this.state.contact !== "" && this.state.address !== "" && this.state.email != "" && this.state.description != "") {
            var data = ({
                'username': this.state.username,
                'name': this.state.name,
                'email': this.state.email,
                'contact': this.state.contact,
                'address': this.state.address,
                'description': this.state.description,
            });
            var config = {
                method: 'post',
                url: 'https://jaffa-suites-backend.herokuapp.com/user/update-user',
                headers: {},
                data: data
            };

            axios(config)
                .then(response=>{
                    if(response.data.responseCode==1)
                    {
                        this.myAlertBottom('alert-success', 'Update Successful', 3000)
                        var config = {
                            method: 'post',
                            url: 'https://jaffa-suites-backend.herokuapp.com/user/get-user-by-id',
                            headers: {},
                            data: {
                                username: this.state.username
                            }
                        };
                
                        axios(config)
                            .then((response) => {
                                if (response.data.responseCode == 1) {
                                    this.setState({
                                        userData: response.data.result[0],
                                        name: response.data.result[0].name,
                                        username: response.data.result[0].username,
                                        address: response.data.result[0].address,
                                        contact: response.data.result[0].contact,
                                        email: response.data.result[0].email,
                                        description: response.data.result[0].description
                                    })
                                }
                            }
                            )
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else
                    {
                        this.myAlertBottom('alert-danger', 'Error Updating', 3000)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            this.myAlertBottom('alert-danger', 'One or More Fields Empty', 3000)
        }
    }
    onSubmitPassword = e => {
        e.preventDefault();
        if (this.state.cPassword !== "" && this.state.password !== "" && this.state.current !== "") {
            if (this.state.password === this.state.cPassword) {
                var data = {
                    'username': this.state.userData.username,
                    'password': this.state.cPassword,
                    'newPassword': this.state.password
                }
                var config = {
                    method: 'post',
                    url: 'https://jaffa-suites-backend.herokuapp.com/user/update-password',
                    headers: {},
                    data: data
                };

                axios(config)
                    .then( (response)=> {
                        if (response.data.responseCode == 1) {
                            this.myAlertBottom('alert-success', 'Password Changed', 3000)
                        }
                        else {
                            this.myAlertBottom('alert-danger', 'Error Changing Password', 3000)
                        }
                    })
                    .catch((error)=> {
                        this.myAlertBottom('alert-danger', 'Error Changing Password', 3000)
                    });
            }
            else {
                this.myAlertBottom('alert-danger', 'Passwords Do not match', 3000)
            }
        }
        else {
            this.myAlertBottom('alert-danger', 'One or more fields Empty', 3000)
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount() {
        const { match: { params } } = this.props;

        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/get-user-by-id',
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
                        name: response.data.result[0].name,
                        username: response.data.result[0].username,
                        address: response.data.result[0].address,
                        contact: response.data.result[0].contact,
                        email: response.data.result[0].email,
                        description: response.data.result[0].description
                    })
                }
            }
            )
            .catch(function (error) {
                console.log(error);
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
                            <div className="card">
                                <div className="m-b-20">
                                    <div className="contact-grid">
                                        <div className="profile-header bg-cyan">
                                        </div>
                                        <div className="container">
                                            <img src="../../assets/images/user/usrbig3.jpg" className="user-img" alt="" />
                                            <div className="user-name">{this.state.userData.username}</div>
                                            <div className="name-center"> {this.state.userData.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="card">
                                <div className="profile-tab-box">
                                    <div className="p-l-20">
                                        <ul className="nav ">
                                            <li className="nav-item tab-all">
                                                <a className="nav-link active show" href="#project" data-toggle="tab">About Me</a>
                                            </li>
                                            <li className="nav-item tab-all p-l-20">
                                                <a className="nav-link" href="#usersettings" data-toggle="tab">Settings</a>
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
                                                    <h2>About</h2>
                                                </div>
                                                <div className="body">
                                                    <div className="row">
                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Full Name</strong>
                                                            <br />
                                                            <p className="text-muted"> {this.state.userData.name}</p>
                                                        </div>
                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Mobile</strong>
                                                            <br />
                                                            <p className="text-muted"><a href={"tel:"+this.state.userData.contact}>{this.state.userData.contact}</a></p>
                                                        </div>
                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Email</strong>
                                                            <br />
                                                            <p className="text-muted"><a href={"mailto:"+this.state.userData.email} > {this.state.userData.email} </a></p>
                                                        </div>
                                                        <div className="col-md-3 col-6">
                                                            <strong>Location</strong>
                                                            <br />
                                                            <p className="text-muted">{this.state.userData.address}</p>
                                                        </div>
                                                    </div>
                                                    <p className="m-t-30">{this.state.userData.description}</p>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="timeline" aria-expanded="false">
                                </div>
                                <div role="tabpanel" className="tab-pane" id="usersettings" aria-expanded="false">
                                    <div className="card">
                                        <div className="header">
                                            <h2>
                                                <strong>Account</strong> Settings</h2>
                                        </div>
                                        <div className="body">
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" id="username" className="form-control" value={this.state.username} placeholder="User Name"  readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" id="name" onChange={this.onChange} className="form-control" value={this.state.name} placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" id="contact" onChange={this.onChange} className="form-control" value={this.state.contact} placeholder="Contact" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" id="email" onChange={this.onChange} className="form-control" value={this.state.email} placeholder="E-mail" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                    <div className="form-group">
                                                        {/* <i class="material-icons" style="position: absolute;">add_a_photo</i> */}
                                                        <input type="text" id="address" onChange={this.onChange} className="form-control" value={this.state.address} placeholder="Address" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea type="text" id="description" onChange={this.onChange} className="form-control" rows="4"  value={this.state.description} placeholder="Write something about yourself" />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="file-field input-field">
                                                            <div className="btn">
                                                                <span>Upload Image</span>
                                                                <input type="file" />
                                                            </div>
                                                            <div className="file-path-wrapper">
                                                                <input className="file-path validate" defaultValue type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <button className="btn btn-info btn-round" onClick={this.onSubmitUserInfo}>Save Changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="header">
                                            <h2>
                                                <strong>Security</strong> Settings</h2>
                                        </div>
                                        <div className="body">
                                            <div className="form-group">
                                                <input type="password" id="current" onChange={this.onChange} className="form-control" placeholder="Current Password" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" id="password" onChange={this.onChange} className="form-control" placeholder="New Password" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" id="cPassword" onChange={this.onChange} className="form-control" placeholder="Confirm New Password" />
                                            </div>
                                            <button className="btn btn-info btn-round" style={{ color: "red" }} onClick={this.onSubmitPassword}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
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

export default Profile;