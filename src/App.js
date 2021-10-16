import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import CoinPage from "./page/CoinPage";
import HomePage from "./page/HomePage";

function App() {
    const useStyle = makeStyles(() => ({
        App: {
            backgroundColor: "#14161a",
            color: "#fff",
            minHeight: "100vh",
        },
    }));
    const classes = useStyle();

    return (
        <Router>
            <div className={classes.App}>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/coins/:id" exact component={CoinPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
