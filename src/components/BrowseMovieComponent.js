import React, { useState } from "react";
import { Link } from "react-router-dom";
import MySelect from "./selectComponent.js";

export default function BrowseMovies(props) {
    const [searchname, setSearchname] = useState("");

    const onChangeSearchName = (e) => {
        const search = e.target.value;
        setSearchname(search);
    };

    return (
        <>
            <div className="container">
                <div className="row center-form">
                    <div className="search-form">
                        <div className="browse-search">
                            <div class="input-group browse-input">
                                <div class="form-outline">
                                    <input
                                        type="search"
                                        id="quicksearch-bar"
                                        className="form-control"
                                        placeholder="search name"
                                        value={searchname}
                                        onChange={onChangeSearchName}
                                        required
                                    />
                                </div>
                                <Link
                                    id="submit-btn"
                                    for="#quicksearch-bar"
                                    to={`/quicksearch/?name=${searchname}`}
                                    type="submit"
                                    class="btn btn-outline-success"
                                >
                                    search
                                </Link>
                            </div>
                            <div />
                        </div>
                        <form>
                            <div className="form-row">
                                <label>Genre</label>
                                <MySelect />
                            </div>
                            <div className="form-row">
                                <label>Rating</label>
                                <MySelect />
                            </div>
                            <div className="form-row">
                                <label>Sort by</label>
                                <MySelect />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: "120vh" }}></div>
        </>
    );
}
