import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import MoviesData from "../views/moviesData.js";
import Spinner from "./spinnerComponent.js";

function QuickSearch(props) {
    const [Movies, setMovies] = useState([]);
    const [Moviesfound, setMoviesfound] = useState(0);
    const [loading, setloading] = useState(false);
    const [searchname, setSearchname] = useState("");
    const [resultfor, setResultfor] = useState("");
    const [page, setPage] = useState(1);
    const [hasmore, setHasmore] = useState(false);
    const [firstrener, setfirstrender] = useState(true);

    const observer = useRef();
    const lastMovie = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasmore) {
                    //console.log("visible");
                    setPage((prevPage) => prevPage + 1);
                    // console.log(page);
                    // console.log(node);
                }
            });
            if (node) observer.current.observe(node);
        },
        // eslint-disable-next-line
        [page, loading, hasmore]
    );

    useEffect(() => {
        if (firstrener) {
            setfirstrender(false);
            return;
        }
        if (page === 1) return;
        quicksearch(page);
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        getMovies();
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line
    useEffect(() => {
        setHasmore(Moviesfound > Movies.length);
        // eslint-disable-next-line
    });

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchname(searchName);
    };

    const getMovies = async () => {
        try {
            setloading(true);
            const parsed = queryString.parse(props.location.search);
            setResultfor(parsed.name);
            setSearchname(parsed.name);
            const { data } = await MoviesData.quicksearch(parsed.name, page);
            setMoviesfound(data["Movies found"]);
            setMovies(data.MoviesList);
            setHasmore(Moviesfound > Movies.length);
            setloading(false);
        } catch (e) {
            console.error(e);
        }
    };

    async function quicksearch(page = 1) {
        try {
            setloading(true);
            const { data } = await MoviesData.quicksearch(searchname, page);
            setResultfor(searchname);
            setMoviesfound(data["Movies found"]);
            setMovies((prevState) => {
                return [...prevState, ...data.MoviesList];
            });
            setloading(false);
        } catch (e) {
            console.error(e);
        }
    }

    function clickSearch() {
        try {
            document.getElementById("quicksearch-bar").blur();
            setMovies([]);
            setPage(1);
            quicksearch();
        } catch (error) {
            console.log(error);
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
                    {Movies.map((movie, index) => {
                        const title = `${movie.title}`;
                        const date = new Date(movie.released);
                        const year = date.getFullYear();
                        const poster = movie.poster;
                        const last = Movies.length === index + 4 ? true : false;
                        if (last) {
                            return (
                                <div
                                    className="col-12 col-md-3 movie-grid"
                                    key={movie._id}
                                    ref={lastMovie}
                                >
                                    <div className="movie-thumbnail">
                                        <img
                                            src={
                                                poster
                                                    ? poster
                                                    : process.env.PUBLIC_URL +
                                                      "/No_Img_Avail.jpg"
                                            }
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    process.env.PUBLIC_URL +
                                                    "/No_Img_Avail.jpg";
                                            }}
                                            alt="movie poster"
                                            className="img-thumbnail grid-img"
                                        ></img>
                                        <Link
                                            to={"/id/" + movie._id}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary view-details"
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
                        } else {
                            return (
                                <div
                                    className="col-12 col-md-3 movie-grid"
                                    key={movie._id}
                                >
                                    <div className="movie-thumbnail">
                                        <img
                                            src={
                                                poster
                                                    ? poster
                                                    : process.env.PUBLIC_URL +
                                                      "/No_Img_Avail.jpg"
                                            }
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    process.env.PUBLIC_URL +
                                                    "/No_Img_Avail.jpg";
                                            }}
                                            alt="movie poster"
                                            className="img-thumbnail grid-img"
                                        ></img>
                                        <Link
                                            to={"/id/" + movie._id}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary view-details"
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
                        }
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
                                    type="search"
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
                                to={`/quicksearch/?name=${searchname}`}
                                type="submit"
                                class="btn btn-outline-success"
                                onClick={clickSearch}
                            >
                                search
                            </Link>
                        </div>
                    </div>
                    <div>
                        <DisplayMovies />
                    </div>
                    <div>{loading && <Spinner />}</div>
                </div>
            </div>
        </div>
    );
}

export default QuickSearch;
