import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import HomePage from "./page/HomePage";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/coins/:id" exact component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
