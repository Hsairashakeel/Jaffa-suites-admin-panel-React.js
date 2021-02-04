import React from 'react'

class Faqs extends React.Component {

    renderFaqItem() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading" role="tab" id="headingOne_1">
                    <h4 className="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1">
                            Q1. Anim pariatur cliche reprehenderit?
                    </a>
                    </h4>
                </div>
                <div id="collapseOne_1" className="panel-collapse collapse in show" role="tabpanel" aria-labelledby="headingOne_1">
                    <div className="panel-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                </div>
                    <div className="p-l-20 p-b-20">
                        <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                            <i className="material-icons">thumb_up</i>
                        </button>
                        <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                            <i className="material-icons">thumb_down</i>
                        </button>
                    </div>
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
                                        <h4 className="page-title">Faqs</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home" /> Home</a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-2">
                                        <a href="#" onclick="return false;">Extra</a>
                                    </li>
                                    <li className="breadcrumb-item active">Faqs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        {/* Basic Examples */}
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        <strong>FAQs</strong>
                                        <small>Find your solutions from here.</small>
                                    </h2>
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
                                    <div className="row clearfix">
                                        <div className="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
                                            <div className="panel-group" id="accordion_1" role="tablist" aria-multiselectable="true">
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingOne_1">
                                                        <h4 className="panel-title">
                                                            <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1">
                                                                Q1. Anim pariatur cliche reprehenderit?
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseOne_1" className="panel-collapse collapse in show" role="tabpanel" aria-labelledby="headingOne_1">
                                                        <div className="panel-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                            on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                                                        </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingThree_11">
                                                        <h4 className="panel-title">
                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseThree_2" aria-expanded="false" aria-controls="collapseThree_1">
                                                                Q2. It has survived not only five centuries, but also the leap
                                                                into?
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseThree_2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree_1">
                                                        <div className="panel-body">
                                                            Completed my graduation in Arts from the well known and renowned institution of India – SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.
                                                        </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingThree_1">
                                                        <h4 className="panel-title">
                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseThree_1" aria-expanded="false" aria-controls="collapseThree_1">
                                                                Q3. Worked as Professor and Head of the department at Sarda
                                                                Collage?
                        </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseThree_1" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree_1">
                                                        <div className="panel-body">
                                                            Completed my graduation in Arts from the well known and renowned institution of India – SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.
                      </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingOne_11">
                                                        <h4 className="panel-title">
                                                            <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_3" aria-expanded="true" aria-controls="collapseOne_3">
                                                                Q4. It has survived not only five centuries, but also the leap
                                                                into?
                        </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseOne_3" className="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne_1">
                                                        <div className="panel-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                            on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                      </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingTwo_1">
                                                        <h4 className="panel-title">
                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_4" aria-expanded="false" aria-controls="collapseOne_4">
                                                                Q5. Worked as Professor and Head of the department?
                        </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseOne_4" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_1">
                                                        <div className="panel-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                            on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                      </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingTwo_11">
                                                        <h4 className="panel-title">
                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_5" aria-expanded="false" aria-controls="collapseOne_5">
                                                                Q6. It has survived not only five centuries, but also the leap
                                                                into?
                        </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseOne_5" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_1">
                                                        <div className="panel-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                            on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                      </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading" role="tab" id="headingTwo_12">
                                                        <h4 className="panel-title">
                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_6" aria-expanded="false" aria-controls="collapseOne_6">
                                                                Q7. Completed my graduation in Arts from the well known?
                        </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapseOne_6" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_1">
                                                        <div className="panel-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                            on it squid single origin coffee nulla assumenda shoreditchet. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente.
                      </div>
                                                        <div className="p-l-20 p-b-20">
                                                            <button type="button" className="btn btn-success btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_up</i>
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-circle waves-effect waves-circle waves-float">
                                                                <i className="material-icons">thumb_down</i>
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
                        {/* #END# Basic Examples */}
                    </div>
                </div>
            </section>
        );
    }
}

export default Faqs;