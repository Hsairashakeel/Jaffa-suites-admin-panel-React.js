import React from 'react'
import $ from 'jquery'
class AddItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			image: null,
			description: "",
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
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
		if (e.target.id === "image") {
			this.setState({ [e.target.id]: e.target.files[0] });
		}
		else {
			this.setState({ [e.target.id]: e.target.value });
		}
	};

	onSubmit() {
		var FormData = require('form-data');
		console.log(this.state)
		var data = new FormData();
		data.append('galleryImage', this.state.image);
		data.append('description', this.state.description);
		data.append('isHidden', 'N');
		document.getElementById('upload').disabled = true
        $('body').fadeTo("slow", 0.5).css('pointer-events', 'none');

		$.ajax({
			type: 'POST',
			url: 'https://jaffa-suites-backend.herokuapp.com/gallery/add-gallery-image',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success:(data)=> {
				$('body').fadeTo("slow", 1).css('pointer-events', 'auto');
                document.getElementById('upload').disabled = false
				this.myAlertBottom('alert-success', 'Upload Successful', 3000)
				setTimeout(function(){ window.location = "/gallery"; },3000);
			},
			error:(data)=> {
				this.myAlertBottom('alert-success', 'Error', 3000)
			}
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
										<h4 className="page-title">Gallery</h4>
									</li>
									<li className="breadcrumb-item bcrumb-1">
										<a href="../../index.html">
											<i className="fas fa-home" /> Home</a>
									</li>
									<li className="breadcrumb-item active">Add New Image</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row clearfix">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="card">
								<div className="header">
									<h2>
										<strong>Image</strong> Upload</h2>
									<ul className="header-dropdown m-r--5">
										<li className="dropdown">
											<a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
												<i className="material-icons">more_vert</i>
											</a>
											<ul className="dropdown-menu pull-right">
												<li>
													<a href="#" onclick="return false;">Action</a>
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
									<label htmlFor="email_address1">Description</label>
									<div className="form-group">
										<div className="form-line">
											<input type="text" id="description" onChange={this.onChange} value={this.state.description} className="form-control" placeholder="Enter Image Description" />
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<div className="file-field input-field">
												<div className="btn">
													<span>Upload Image</span>
													<input type="file" name="images" onChange={this.onChange} id="image" />
												</div>
												<div className="file-path-wrapper">
													<input className="file-path validate" type="text" placeholder="Upload Image" />
												</div>
											</div>
										</div>
									</div>
									<br />
									<div className="form-group">
										<div className="form-line">
											<input type="button" id="upload" onClick={this.onSubmit} className="btn btn-info" defaultValue="Upload Image" />
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

export default AddItem;