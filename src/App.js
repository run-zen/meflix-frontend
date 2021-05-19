import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "./components/HomeComponent.js";
import Header from "./components/Header.js";
import QuickSearch from "./components/quickSearchComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/quicksearch/" component={QuickSearch} />
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
}

export default App;
