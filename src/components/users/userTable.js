import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
var qs = require('qs');

var data = qs.stringify({

});
var config = {
    method: 'post',
    url: 'https://jaffa-suites-backend.herokuapp.com/user/get-users-table-list',
    headers: {},
    data: data
};

class Table extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
            users:[],
            data:[]
        }
    }

    componentDidMount(){
        axios(config
            )
                .then(res => {
                    if (res.data.responseCode == 1) {
                        this.setState({
                            users: res.data.result,
                            data:{ columns: [
                                {
                                    label: 'UserName',
                                    field: 'username',
                                    width: 150,
                                    attributes: {
                                        'aria-controls': 'DataTable',
                                        'aria-label': 'Name',
                                    },
                                },
                                {
                                    label: 'Email',
                                    field: 'email',
                                    sort: 'disabled',
                                    width: 150,
                                },
                                {
                                    label: 'Contact',
                                    field: 'contact',
                                    sort: 'disabled',
                                    width: 150,
                                },
                                {
                                    label: 'Status',
                                    field: 'is_blocked',
                                    sort: 'disabled',
                                    width: 200,
                                },
                                {
                                    label: 'Active Bookings',
                                    field: 'active_bookings',
                                    width: 100,
                                },
                                {
                                    label: 'Total Bookings',
                                    field: 'total_bookings',
                                    width: 100,
                                },
                                {
                                    label: 'Actions',
                                    field: 'actions',
                                    sort: 'disabled',
                                    width: 150,
                                }
                            ],
                            rows: res.data.result
                            ,}
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        
    }
    render() {
        return (
            <div>
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={this.state.data} />;
            </div>
        );
    }
}

export default Table;