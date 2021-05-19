import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import MoviesData from "../views/moviesData.js";
import Spinner from "./spinnerComponent.js";

function QuickSearch(props) {
    const [Movies, setMovies] = useState([]);
    const [Moviesfound, setMoviesfound] = useState(-1);
    const [loading, setloading] = useState(false);
    const [searchname, setSearchname] = useState("");
    const [resultfor, setResultfor] = useState("");

    useEffect(() => {
        getMovies();
        // eslint-disable-next-line
    }, []);

    const handleScroll = () => {
        window.scroll(0, 0);
    };

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchname(searchName);
    };

    const getMovies = async () => {
        try {
            const parsed = queryString.parse(props.location.search);
            setResultfor(parsed.name);
            const { data } = await MoviesData.quicksearch(parsed.name);
            setloading(true);
            setMoviesfound(data["Movies found"]);
            setMovies(data.MoviesList);
            console.log(Movies);
        } catch (e) {
            console.error(e);
        }
    };

    async function quicksearch() {
        try {
            setloading(false);
            const { data } = await MoviesData.quicksearch(searchname);
            setloading(true);
            setResultfor(searchname);
            setMoviesfound(data["Movies found"]);
            setMovies(data.MoviesList);
        } catch (e) {
            console.error(e);
        }
    }

    function DisplayMovies() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="results-found">
                            {resultfor !== "" ? (
                                <div>
                                    {Moviesfound} movies found for your search "
                                    {resultfor}"
                                </div>
                            ) : (
                                <div>{Moviesfound} movies found</div>
                            )}
                        </div>
                    </div>
                    {Movies.map((movie) => {
                        const title = `${movie.title}`;
                        const date = new Date(movie.released);
                        const year = date.getFullYear();
                        return (
                            <div
                                className="col-12 col-md-3 movie-grid"
                                key={movie._id}
                            >
                                <div className="movie-thumbnail">
                                    <img
                                        src={movie.poster}
                                        alt="movie poster"
                                        className="img-thumbnail grid-img"
                                    ></img>
                                    <Link
                                        to={"/id/" + movie._id}
                                        className="btn btn-secondary view-details"
                                        onClick={handleScroll}
                                    >
                                        view details
                                    </Link>
                                </div>
                                <h4>{title}</h4>
                                <h4>{year ? year : ""}</h4>
                                <span class="badge">
                                    imdb:{" "}
                                    {!movie.imdb.rating
                                        ? "not rated"
                                        : movie.imdb.rating}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return (
        <div className="homepage">
            <div className="container">
                <div className="row">
                    <div className="searchbar">
                        <div class="input-group">
                            <div class="form-outline">
                                <input
                                    type="text"
                                    id="quicksearch-bar"
                                    className="form-control"
                                    placeholder="quick search"
                                    value={searchname}
                                    onChange={onChangeSearchName}
                                    required
                                />
                            </div>
                            <Link
                                id="submit-btn"
                                for="#quicksearch-bar"
                                to={"/quicksearch/?name=" + searchname}
                                type="submit"
                                class="btn btn-outline-success"
                                onClick={quicksearch}
                            >
                                search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {loading ? (
                    <div>
                        <DisplayMovies />
                    </div>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default QuickSearch;
