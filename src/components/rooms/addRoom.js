import React from 'react'
import Loading from './../shared/loader'
import {Redirect} from 'react-router-dom'
import $ from 'jquery'
import swal from 'sweetalert'
var axios = require('axios');
var qs = require('qs');
class AddRoom extends React.Component {

    constructor(props) {
        super(props)
        this.onDrop = (files) => {
            this.setState({ files })
            console.log(this.state);
            console.log(this.state.files[0] instanceof Blob)
        };
        this.state = {
            features: [],
            loadedFeatures: [],
            images: [],
            name: "",
            description: "",
            isFeaturesLoading: true,
            updatedName: "",
            updatedDescription: "",
            roomName: "",
            roomDescription: "",
            roomType: "",
            roomCost: "",
            roomDiscount: "",
        }
        this.addFeature = this.addFeature.bind(this)
        this.fetchFeatures = this.fetchFeatures.bind(this)
        this.updateFeature = this.updateFeature.bind(this)
        this.toggleUpdateModel = this.toggleUpdateModel.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    toggleUpdateModel(id, name, description) {
        $("#updatedDescription").val(description)
        $("#toUpdateID").val(id)
        $("#updatedName").val(name)
        this.setState({
            updatedName: name,
            updatedDescription: description
        })
        window.$("#updateFeature").modal("show")
    }

    updateFeature() {
        var data = qs.stringify({
            'id': $("#toUpdateID").val(),
            'name': this.state.updatedName,
            'description': this.state.updatedDescription
        });
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/feature/update-feature',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    window.$("#updateFeature").modal("hide")
                    this.myAlertBottom('alert-success', 'Feature Updated', 3000)
                    this.fetchFeatures()
                }
            })
            .catch((error)=> {
                this.myAlertBottom('alert-danger', 'Error Updating Feature', 3000)
            });
    }
    delFeature(id) {
        var data = qs.stringify({
            'id': id
        });
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/feature/delete-feature',
            headers: {},
            data: data
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
                        .then((response)=> {
                            console.log(response)
                            if (response.data.responseCode === 1) {
                                this.myAlertBottom('alert-success', 'Delete Successful', 3000)
                            }
                            else {
                                this.myAlertBottom('alert-danger', 'Error Deleteing Feature', 3000)
                            }
                        })
                        .catch((error)=> {
                            this.myAlertBottom('alert-danger', 'Error Deleteing Feature', 3000)
                        });
                    this.fetchFeatures()
                } else {
                    this.myAlertBottom('alert-success', 'Feature is Safe', 3000)
                }
            });
    }
    myAlertBottom(className, msg, time) {

		$("#alert-message").text(msg);
		$(".myAlert-bottom").addClass(className);

		$(".myAlert-bottom").slideDown();
		setTimeout(function () {
			$(".myAlert-bottom").slideUp();
		}, time);
	}
    onChange = e => {
        if (e.target.id === "images") {
            console.log("uploading File")
            console.log(e.target.files)
            this.setState({ [e.target.id]: e.target.files });
        }
        else {
            this.setState({ [e.target.id]: e.target.value });
        }

    };
    selectFeature(id, featureName) {
        //alert(id + " , " + featureName);

        // If the checkbox is checked, display the output text
        var rowID = "selectedFeature-" + id;
        if (!this.state.features.includes(id)) {
            var arr = [...this.state.features]
            arr.push(id)
            this.setState({
                features: arr
            })
            // NOTE: add this id into a array ,and this array will be sent to server
            var html = "<tr id='" + rowID + "'><td>" + featureName + "</td><tr>";
            $("#selectedFeaturesTable").append(html);
        } else {
            var array = [...this.state.features]; // make a separate copy of the array
            var index = array.indexOf(id)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ features: array });
            }
            // NOTE: remove this id from the array as this array will be sent to server
            $("#" + rowID).remove();
        }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        let formData = new FormData();
        formData.append('name', this.state.roomName)
        formData.append("cost", this.state.roomCost)
        formData.append("type", this.state.roomType)
        formData.append("discount", this.state.roomDiscount)
        formData.append("description", this.state.roomDescription)
        formData.append("images", this.state.images)
        var arr = "[";
        for (var i = 0; i < this.state.features.length; i++) {
            arr = arr + this.state.features[i];
            if (i !== this.state.features.length - 1) {
                arr += ",";
            }
        }
        arr += "]";
        formData.append("features", arr)
        formData.append('isRoomHidden', 'N')
        $.ajax({
            type: 'POST',
            url: ' https://jaffa-suites-backend.herokuapp.com/room/add-room',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: (data)=> {
                this.myAlertBottom('alert-success', 'Room Added', 3000)
                setTimeout(function(){ window.location = "/rooms"; },3000);
            },
            error: (data)=> {
                this.myAlertBottom('alert-danger', 'Error Adding Room', 3000)
            }
        });
    }
    addFeature() {
        var data = qs.stringify({
            'name': this.state.name,
            'description': this.state.description
        });
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/feature/add-feature',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.myAlertBottom('alert-success', 'Feature Added', 3000)
                    window.$("#addFeature").modal("hide")
                    this.fetchFeatures()
                }
            })
            .catch((error)=> {
                this.myAlertBottom('alert-danger', 'Error Adding Feature', 3000)
            });
    }

    renderFeature(feature) {
        return (
            <tr>
                <td className="tbl-checkbox">
                    <label>
                        <input type="checkbox" id={"checkFeature-" + feature.feature_id} onClick={() => this.selectFeature(feature.feature_id, feature.name)} />
                        <span />
                    </label>
                </td>
                <td>{feature.feature_id}</td>
                <td>{feature.name}</td>
                <td>{feature.description}</td>
                <td>
                    <button className="btn tblActnBtn" onClick={() => this.toggleUpdateModel(feature.feature_id, feature.name, feature.description)}>
                        <i className="material-icons">mode_edit</i>
                    </button>
                    <button className="btn tblActnBtn" onClick={() => this.delFeature(feature.feature_id)}>
                        <i className="material-icons">delete</i>
                    </button>
                </td>
            </tr>
        )
    }

    fetchFeatures() {
        this.setState({
            isFeaturesLoading: true
        })
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/feature/get-all-features',
            headers: {}
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        loadedFeatures: response.data.result,
                        isFeaturesLoading: false
                    })
                }
            })
            .catch( (error) =>{
                this.myAlertBottom('alert-danger', 'Error Fetching Features', 2000)
            });
    }
    componentDidMount() {
        this.fetchFeatures()
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
                                            <h4 className="page-title">Add New Room</h4>
                                        </li>
                                        <li className="breadcrumb-item bcrumb-1">
                                            <a href="../../index.html">
                                                <i className="fas fa-home" /> Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Add New Room</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="card">
                                    <div className="body">
                                        <form class="row clearfix" id="add-room-form" enctype="multipart/form-data">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="roomName" className="form-control" onChange={this.onChange} placeholder="Room Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="roomType" className="form-control" onChange={this.onChange} placeholder="Room Type" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="number" id="roomCost" className="form-control" onChange={this.onChange} placeholder="Room Cost/Price" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="number" id="roomDiscount" className="form-control" onChange={this.onChange} placeholder="Inital Discount (in %age)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <textarea className="form-control" id="roomDescription" onChange={this.onChange} cols={30} rows={3} placeholder="Room Description" defaultValue={""} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="file-field input-field">
                                                        <div className="btn">
                                                            <span>Upload Images</span>
                                                            <input type="file" name="images" onChange={this.onChange} id="images" multiple />
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text" placeholder="Upload one or more images" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <div className="card">
                                    <div className="header">
                                        <h2>
                                            Selected<strong> Features</strong>
                                        </h2>
                                    </div>
                                    <div className="tableBody">
                                        <div className="table-responsive">
                                            <table id className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Feature</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="selectedFeaturesTable">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                <div className="card">
                                    <div className="header">
                                        <h2>
                                            <strong>Room</strong> Features</h2>
                                        <ul className="header-dropdown m-r--5">
                                            <li className="dropdown">
                                                <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <i className="material-icons">more_vert</i>
                                                </a>
                                                <ul className="dropdown-menu pull-right">
                                                    <li>
                                                        <a data-toggle="modal" href="#addFeature">Add New Feature</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onclick="return false;">Action 1</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onclick="return false;">Action 2</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    {this.state.isFeaturesLoading ? <Loading /> : <div className="tableBody">
                                        <div className="table-responsive">
                                            <table id="tableExport" className="table table-hover dashboard-task-infos">
                                                <thead>
                                                    <tr>
                                                        <th>Select</th>
                                                        <th>ID</th>
                                                        <th>Feature</th>
                                                        <th>Description</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.loadedFeatures.map(feat => this.renderFeature(feat))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="card">
                                    <div className="pl-3 pt-4">
                                        <div className="form-group">
                                            <button className="btn btn-info btn-round" onClick={this.onSubmit}>Add Room</button> &nbsp; (IMPORTANT: Do recheck your room details, images, features before clicking this button)
              </div>
                                    </div>
                                </div>
                            </div>
                            {/* #END# Task Info */}
                        </div>
                    </div>
                </section>
                {/* add new user modal  */}
                <div className="modal fade" id="addFeature" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">Add New Feature</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label htmlFor="name">Feature Name</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="name" onChange={this.onChange} className="form-control" placeholder="Enter Name" />
                                        </div>
                                    </div>
                                    <label htmlFor="contact">Feature Description</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <textarea className="form-control" onChange={this.onChange} id="description" cols={30} rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info waves-effect" onClick={this.addFeature}>Add Feature</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="updateFeature" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModal">UpdateFeature</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input type="hidden" id="toUpdateID" />
                                    <label htmlFor="name">Feature Name</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="updatedName" onChange={this.onChange} className="form-control" placeholder="Enter Name" />
                                        </div>
                                    </div>
                                    <label htmlFor="contact">Feature Description</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <textarea className="form-control" onChange={this.onChange} id="updatedDescription" cols={30} rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info waves-effect" onClick={this.updateFeature}>Update Feature</button>
                                <button type="button" className="btn btn-danger waves-effect" data-dismiss="modal">Cancel</button>
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

export default AddRoom;