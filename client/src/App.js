import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Users from './Users';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="header">
                        <span>
                            <Link to="/">Home</Link>
                        </span>
                        <span>
                            <Link to="/otherpage">Other Page</Link>
                        </span>
                    </header>
                    <div>
                        <h1>Demo page</h1>
                        <p>With connections to a datbase and socket!</p>
                        <Route exact path="/" component={Users} />
                        <Route path="/otherpage" component={OtherPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
