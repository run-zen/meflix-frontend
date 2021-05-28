import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MySelect from "./selectComponent.js";
import { filters } from "../shared/filters.js";

export default function BrowseMovies(props) {
    const [searchname, setSearchname] = useState("");
    const [genre, setGenre] = useState(filters.genres[0].value);
    const [rating, setRating] = useState(filters.rating[0].value);
    const [sortby, setSortby] = useState(filters.sortby[0].value);

    useEffect(() => {
        const btn = document.getElementById("submit-btn");
        btn.click();
        console.log(`genre : ${genre} rating: ${rating} sortby: ${sortby}`);
    }, [genre, rating, sortby]);

    const handleSearch = () => {};

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
                                        onChange={(e) =>
                                            setSearchname(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <Link
                                    id="submit-btn"
                                    for="#quicksearch-bar"
                                    to={`/browsemovies/?name=${searchname}&genre=${genre}&rating=${rating}&sortby=${sortby}`}
                                    type="submit"
                                    class="btn btn-outline-success"
                                    onClick={handleSearch}
                                >
                                    search
                                </Link>
                            </div>
                            <div />
                        </div>
                        <form>
                            <div className="form-row">
                                <label>Genre</label>
                                <MySelect
                                    set={setGenre}
                                    options={filters.genres}
                                />
                            </div>
                            <div className="form-row">
                                <label>Rating</label>
                                <MySelect
                                    set={setRating}
                                    options={filters.rating}
                                />
                            </div>
                            <div className="form-row">
                                <label>Sort by</label>
                                <MySelect
                                    set={setSortby}
                                    options={filters.sortby}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: "120vh" }}></div>
        </>
    );
}
