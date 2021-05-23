import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "./components/HomeComponent.js";
import Header from "./components/Header.js";
import QuickSearch from "./components/quickSearchComponent.js";
import Movie from "./components/MovieCompoenet.js";
import BrowseMovies from "./components/BrowseMovieComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/quicksearch/" component={QuickSearch} />
                <Route exact path="/id/:id" component={Movie} />
                <Route exact path="/browsemovies" component={BrowseMovies} />
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
}

export default App;
