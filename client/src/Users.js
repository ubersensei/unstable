import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        // axios.get('http://localhost:3050/api/users/getUsers').then(response => {
        axios.get('/api/users/getUsers').then(response => {
            this.setState({
                users: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <div>This is the Users' page</div>
                <div>{JSON.stringify(this.state.users)}</div>
            </div>
        );
    }
}

export default Users;
