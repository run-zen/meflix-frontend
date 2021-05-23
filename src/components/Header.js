import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <nav class="navbar navbar-dark">
                <div className="container">
                    <Link class="navbar-brand" to="/">
                        <img
                            src={process.env.PUBLIC_URL + "/logo1.png"}
                            alt="website logo"
                        />
                    </Link>
                    <Link to={`/browsemovies`} class="browse-link">
                        Browse Movies
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;
