import React from "react";
import Home from "./components/HomeComponent.js";
import Header from "./components/Header.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Home />
        </React.Fragment>
    );
}

export default App;
