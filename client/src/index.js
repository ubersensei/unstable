import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import socketio from 'socket.io-client';


let socket;
if (process.env.NODE_ENV === 'development') {
    socket = socketio('http://localhost', {
        reconnection: false,
        // 'reconnectionDelay': 2000,
        // 'reconnectionAttempts': 10 
        // forceNew: true
    });    
} else {
    socket = socketio('http://unstabledocker-env.qmiydmsfuj.us-west-2.elasticbeanstalk.com/', {
        reconnection: false,
        // 'reconnectionDelay': 2000,
        // 'reconnectionAttempts': 10 
        // forceNew: true
    });    
}

socket.emit('fromClient', 'This is great!');

socket.on('fromServer', function(data) {
    console.log(data);
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
