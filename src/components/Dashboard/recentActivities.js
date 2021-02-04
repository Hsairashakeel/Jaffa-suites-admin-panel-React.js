import React from 'react'
import Loader from './../shared/loader'
var axios = require('axios');
  
class RecentActivity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            loading:true
        }
    }

    RenderActivityObject(obj) {
        var classname
        switch (obj.notification_type) {
            case 1:
                {
                    classname = "feedLblStyle lblTaskStyle"
                    break;
                }
            case 2:
                {
                    classname = "feedLblStyle lblFileStyle"
                    break;
                }
            case 3:
                {
                    classname = "feedLblStyle lblTaskStyle"
                    break;
                }
            case 4:
                {
                    classname = "feedLblStyle lblFileStyle"
                    break;
                }
            case 5:
                {
                    classname = "feedLblStyle lblReplyStyle"
                    break;
                }
            case 6:
                {
                    classname = "feedLblStyle lblReplyStyle"
                    break;
                }
            case 7:
                {
                    classname = "feedLblStyle lblFileStyle"
                    break;
                }
            case 8:
                {
                    classname = "feedLblStyle lblTaskStyle"
                    break;
                }
            case 9:
                {
                    classname = "feedLblStyle lblTaskStyle"
                    break;
                }
            default: {
                classname = "feedLblStyle lblTaskStyle"
                break;
            }
        }
        return (
            <li className="diactive-feed">
                <h6>
                    <span className={classname}>{obj.notification_type_name}</span> {obj.username}
                    <small className="text-muted">{obj.date}
                    </small>
                </h6>
                <p className="m-b-15 m-t-15">
                    {obj.notification_type_description}
                </p>
            </li>
        )
    }

    componentDidMount() {
        this.setState({
            loading:true
        })
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/notification/get-all-notifications',
            headers: {}
        };

        axios(config)
            .then((response) => {
                if (response.data.responseCode === 1) {
                    this.setState({
                        notifications: response.data.result,
                        loading:false
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="card">
                    <div className="header">
                        <h2> Recent <strong>Activities</strong></h2>
                        <ul className="header-dropdown m-r--5">
                            <li className="dropdown">
                                <a href="#" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">more_vert</i>
                                </a>
                                <ul className="dropdown-menu pull-right">
                                    <li>
                                        <a href="/dashboard/allActivities" onclick="return false;">See all</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <div className="assign-style">
                            <ul className="feedBody">
                                {this.state.loading?<Loader/>: this.state.notifications.slice(0,7).map(noti => { return this.RenderActivityObject(noti) })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default RecentActivity;