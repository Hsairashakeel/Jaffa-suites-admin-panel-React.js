import React from 'react'
import swal from 'sweetalert'
import $ from 'jquery'
var axios = require('axios');
var qs = require('qs');
class AllGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: [],
            isLoading: false
        }

        this.toggleImageStatus = this.toggleImageStatus.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
    }

    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").removeClass("alert-danger");
        $(".myAlert-bottom").removeClass('alert-success');
        $(".myAlert-bottom").addClass(className);

        $(".myAlert-bottom").slideDown();
        setTimeout(function () {
            $(".myAlert-bottom").slideUp();
        }, time);
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })

        var data = qs.stringify({

        });
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/gallery/get-all-gallery-images',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        isLoading: false,
                        pictures: response.data.result
                    })
                }
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Images not fetched', 3000)
            });

    }
    renderGalleryItem(item) {
        return (
            <div className="col-md-3 col-sm-6">
                <div className="product-grid">
                    <div className="product-image">
                        <a href={item.image_path}>
                            <img className="pic-1" src={item.image_path} alt="" />
                        </a>
                        <ul className="social">
                            {/* <li>
                                <a href data-tip="View">
                                    <i className="fas fa-eye" />
                                </a>
                            </li> */}
                            <li>
                                <a href data-tip="Hide/Show" onClick={() => this.toggleImageStatus(item.gallery_image_public_id, item.is_hidden ? 'N' : 'Y')}>
                                    <i className="fas fa-ban " />
                                </a>
                            </li>
                            <li>
                                <a href data-tip="Delete" onClick={(() => this.deleteImage(item.gallery_image_public_id))}>
                                    <i className="fas fa-trash-alt" />
                                </a>
                            </li>
                        </ul>
                        {item.is_hidden ? <span className="product-new-label bg-danger">Hidden</span> : <span className="product-new-label bg-green">Active</span>}
                    </div>
                    <div className="product-content">
                        <h3 className="title"><a href="#">Image</a></h3>
                        <div className="container mb-4">
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toggleImageStatus(id, status) {
        var data = {
            'imageID': id,
            'isHidden': status
        };
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/gallery/change-image-hidden-status',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(response)
                if (response.data.responseCode === 1) {
                    if(status=='N')
                    {
                        this.myAlertBottom('alert-success', 'Image Shown', 3000)
                    }
                    else{
                        this.myAlertBottom('alert-success', 'Image Hidden', 3000)
                    }
                   
                    this.setState({
                        isLoading: true
                    })

                    var data = qs.stringify({

                    });
                    var config = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/gallery/get-all-gallery-images',
                        headers: {},
                        data: data
                    };

                    axios(config)
                        .then((response) => {
                            if (response.data.responseCode === 1) {
                                this.setState({
                                    isLoading: false,
                                    pictures: response.data.result
                                })
                            }
                        })
                        .catch((error) => {
                            this.myAlertBottom('alert-danger', 'Images not fetched', 3000)
                        });
                }
            })
            .catch((error) => {
                this.myAlertBottom('alert-danger', 'Error Toggling Status', 3000)
            });
    }

    deleteImage(id) {
        var data = {
            imageID: id
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                this.myAlertBottom('alert-success', 'Delete Successful', 3000)
                if (willDelete) {
                    var config = {
                        method: 'post',
                        url: 'https://jaffa-suites-backend.herokuapp.com/gallery/delete-gallery-image',
                        headers: {},
                        data: data
                    };
                    axios(config)
                        .then((response) => {
                            if (response.data.responseCode === 1) {
                                this.setState({
                                    isLoading: true
                                })

                                var data = qs.stringify({

                                });
                                var config = {
                                    method: 'post',
                                    url: 'https://jaffa-suites-backend.herokuapp.com/gallery/get-all-gallery-images',
                                    headers: {},
                                    data: data
                                };

                                axios(config)
                                    .then((response) => {
                                        if (response.data.responseCode === 1) {
                                            this.setState({
                                                isLoading: false,
                                                pictures: response.data.result
                                            })
                                        }
                                    })
                                    .catch((error) => {
                                        this.myAlertBottom('alert-danger', 'Images not fetched', 3000)
                                    });
                            }
                        })
                        .catch((error) => {
                            this.myAlertBottom('alert-danger', 'Error Deleting', 3000)
                        });
                }
                else {
                    this.myAlertBottom('alert-success', 'Image is Safe', 3000)
                }

            })
            .catch(err => console.log(err))
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
                                        <h4 className="page-title">Gallery</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Gallery Images</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        {/* Line Chart */}
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        <strong>Gallery</strong> Images</h2>
                                    <ul className="header-dropdown m-r--5">
                                        <li className="dropdown">
                                            <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">more_vert</i>
                                            </a>
                                            <ul className="dropdown-menu pull-right">
                                                <li>
                                                    <a href="#" onclick="return false;">Add New Image</a>
                                                </li>
                                                <li>
                                                    <a data-toggle="modal" href="#addUser">Some action</a>
                                                </li>
                                                <li>
                                                    <a href="#" onclick="return false;">Something else here</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body">
                                    <div className="row">
                                        {this.state.pictures.map(pic => this.renderGalleryItem(pic))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* #END# Line Chart */}
                    </div>
                </div>
                <div className="myAlert-bottom alert text-center">
                    <strong id="alert-message"></strong>
                </div>
            </section>

        );
    }
}

export default AllGallery;