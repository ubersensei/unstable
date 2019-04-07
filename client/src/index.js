import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import socketio from 'socket.io-client';


const socket = socketio('http://localhost:3050/socket.io/', {
    reconnection: false,
    // path: '/ws/'
    // 'reconnectionDelay': 2000,
    // 'reconnectionAttempts': 10 
    // forceNew: true
});

socket.on('fromServer', function(data) {
    console.log(data);
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
