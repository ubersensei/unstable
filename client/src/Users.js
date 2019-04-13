import React, { Component } from 'react';
import axios from 'axios';
import socketio from 'socket.io-client';

class Users extends Component {
    state = {
        users: [],
        socket: null,
        messages: []
    };

    componentDidMount() {
        if (process.env.NODE_ENV === 'development') {
            this.setState(state => {
                return {
                    socket: socketio('http://localhost:3050', {
                        reconnection: true
                    })
                };
            }, this.addSocketListeners);
        } else {
            this.setState(state => {
                return {
                    socket: socketio(
                        'http://unstabledocker-env.qmiydmsfuj.us-west-2.elasticbeanstalk.com/',
                        {
                            reconnection: true
                        }
                    )
                };
            }, this.addSocketListeners);
        }
    }

    addMessageToState = ({ message }) => {
        console.log(message);
        const messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages
        });
    };

    addSocketListeners = () => {
        const addMessageToStateFunction = this.addMessageToState;
        this.state.socket.on('fromServer', function(data) {
            addMessageToStateFunction({
                message: `${data.title}/${data.content}`
            });
        });
        this.state.socket.on('reconnect', function(data) {
            addMessageToStateFunction({
                message: `You have been reconnected.`
            });
        });
        this.state.socket.on('disconnect', function(data) {
            addMessageToStateFunction({
                message: `You have been disconnected.`
            });
        });
    };

    emitSocketMessage = () => {
        this.state.socket.emit('fromClient', 'Hello world!');
    };

    renderUsers = () => {
        if (this.state.users.length) {
            return (
                <div>
                    {this.state.users.map((user, index) => (
                        <div key={index}>{`${user.id}/${user.name}`}</div>
                    ))}
                </div>
            );
        } else {
            return <div>No users found</div>;
        }
        // return <div>No users found</div>;
    };

    renderMessages = () => {
        if (this.state.messages.length) {
            return (
                <div className='messages-box'>
                    {this.state.messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            );
        } else {
            return <div>No messages found</div>;
        }
    };

    getUsers = () => {
        // axios.get('http://localhost:3050/api/users/getUsers').then(response => {
        axios.get('/api/users/getUsers').then(response => {
            const newUsers = response.data;
            this.setState(state => {
                return {
                    users: [...state.users, ...newUsers]
                };
            });
        });
    };

    render() {
        return (
            <div>
                {this.renderUsers()}
                <div
                    className='button button_2H10W_secondary'
                    onClick={this.getUsers}
                >
                    Get Users!
                </div>
                {this.renderMessages()}
                <div
                    className='button button_2H10W_secondary'
                    onClick={this.emitSocketMessage}
                >
                    Say Hello!
                </div>
            </div>
        );
    }
}

export default Users;
