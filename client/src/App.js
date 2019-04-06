import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Users from './Users';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/">Home</Link>
                        <Link to="/otherpage">Other Page</Link>
                    </header>
                    <div>
                        <h1>Hola ye! with Ion</h1>
                        <Route exact path="/" component={Users} />
                        <Route path="/otherpage" component={OtherPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
