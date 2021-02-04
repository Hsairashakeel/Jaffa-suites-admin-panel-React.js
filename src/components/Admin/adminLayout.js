import React from 'react'
import axios from "axios"
import Loading from './../shared/loader'
import {Link} from 'react-router-dom'
var qs = require('qs');
var data = qs.stringify({
    
});
var config = {
    method: 'post',
    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-all-admins',
    headers: { },
    data : data
  };

const Admins=props=>(
    <div className="col-md-4">
    <div className="card border-apply">
        <div className="m-b-20">
            <div className="contact-grid">
                <div className="profile-header l-bg-cyan">
                <div className="user-name">{props.admins.username}</div>
                    <div className="name-center">{props.admins.name}</div>
                </div>
                <img src={props.admins.imagepath} className="user-img" alt="" />
                <div className="container">
                    <table className="table">
                        <tbody><tr>
                            <td>
                                <i className="material-icons">phone</i>
                            </td>
                            <td>
                            {props.admins.contact}
                    </td>
                        </tr>
                            <tr>
                                <td>
                                    <i className="material-icons">mail</i>
                                </td>
                                <td>
                                {props.admins.email}
                        </td>
                            </tr>
                        </tbody></table>
                    <div className="profile-userbuttons">
                        <Link type="button" className="btn btn-info btn-border-radius waves-effect" to={"/admins/"+props.admins.username} target="_blank">
                            View Profile
                </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
class AdminLayout extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            admins:[],
            loading:true
        }
    }

    componentDidMount()
    {
        this.setState({
            loading:true
        })
        axios(config
        )
        .then(res=>{
           if(res.data.responseCode===1)
           {
               this.setState({
                   admins:res.data.result,
                   loading:false
               })
           }
        })
        .catch(err=>
            {
                console.log(err)
            })
    }
    renderAdmins()
    {
        return this.state.admins.map(adm=>
            {
               return <Admins admins={adm} />
            })
    }
   
    render() {
        return (
            <div className="row">
               {this.state.loading?<Loading />:this.renderAdmins()}
            </div>
        );
    }
}

export default AdminLayout;