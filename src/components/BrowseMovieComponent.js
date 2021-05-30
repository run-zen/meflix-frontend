/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import MySelect from "./selectComponent.js";
import { filters } from "../shared/filters.js";
import MoviesData from "../views/moviesData.js";
import Spinner from "./spinnerComponent.js";
import { Collapse } from "reactstrap";

export default function BrowseMovies(props) {
    const [searchname, setSearchname] = useState("");
    const [genre, setGenre] = useState(filters.genres[0].value);
    const [rating, setRating] = useState(filters.rating[0].value);
    const [sortby, setSortby] = useState(filters.sortby[0].value);
    const [language, setLanguage] = useState(filters.languages[0].value);
    const [Movies, setMovies] = useState([]);
    const [Moviesfound, setMoviesfound] = useState(-1);
    const [loading, setloading] = useState(false);
    const [moviefilters, setMovieFilters] = useState({
        name: "",
        genre: "",
        sortby: "",
        rating: "",
        language: "",
    });
    const [page, setPage] = useState(1);
    const [hasmore, setHasmore] = useState(false);
    const [firstrener, setfirstrender] = useState(true);
    const [search, setSearch] = useState(true);
    const [resultmessage, setResultmessage] = useState("All movies");
    const [isSearchable, setIssearchable] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 549) {
            setIssearchable(false);
        }
    }, []);

    const observer = useRef();
    const lastMovie = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasmore) {
                    //console.log("visible");
                    setPage((prevPage) => prevPage + 1);
                    setSearch((c) => !c);
                    // console.log(page);
                    // console.log(node);
                }
            });
            if (node) observer.current.observe(node);
        },

        [loading, hasmore]
    );

    const getMovies = useCallback(async () => {
        try {
            setloading(true);
            setfirstrender(false);
            const { data } = await MoviesData.browseMovies(page, moviefilters);
            setMovies((prevMovies) => {
                return [...new Set([...prevMovies, ...data.MoviesList])];
            });
            setMoviesfound(data["Movies found"]);
            if (
                searchname === "" &&
                genre === "All" &&
                rating === "All" &&
                language === "All"
            ) {
                setResultmessage(`All movies`);
            } else {
                setResultmessage(`${data["Movies found"]} movies found`);
            }
            setloading(false);
        } catch (e) {
            console.error(e);
        }
    }, [page, moviefilters]);

    useEffect(() => {
        getMovies();
    }, [search]);

    useEffect(() => {
        setHasmore(Moviesfound > Movies.length);
    }, [Movies, Moviesfound]);

    useEffect(() => {
        if (!firstrener) {
            document.getElementById("submit-btn").click();
        }
    }, [genre, rating, sortby, language]);

    const handleSearch = () => {
        window.scroll(0, 0);
        console.log(genre, rating, sortby);
        const filters = { name: searchname, genre, rating, sortby, language };
        setMovieFilters(filters);
        setMovies([]);
        setPage(1);
        setMoviesfound(-1);
        setSearch((c) => !c);
        window.scroll(0, 0);
    };
    const toggle = (e) => {
        setIsOpen(!isOpen);
        e.target.blur();
    };

    function DisplayMovies() {
        if (Moviesfound === 0) {
            return <div className="no-movies">No movies found</div>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="results-found">
                            {!loading ? (
                                <div>{resultmessage}</div>
                            ) : (
                                <div>searching...</div>
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
        <div className="container">
            <div className="row">
                <div className="sticky">
                    <button
                        className="btn btn-outline-success filter-toggle"
                        onClick={toggle}
                        style={{ marginBottom: "1rem" }}
                    >
                        {isOpen ? "Close filters" : "Open filters"}
                    </button>
                    <Collapse isOpen={isOpen}>
                        <div className="center-form">
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
                                                    setSearchname(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <Link
                                            id="submit-btn"
                                            for="#quicksearch-bar"
                                            to={`/browsemovies/?name=${searchname}&genre=${genre}&rating=${rating}&sortby=${sortby}&language=${language}`}
                                            type="submit"
                                            class="btn btn-outline-success"
                                            onClick={handleSearch}
                                        >
                                            search
                                        </Link>
                                    </div>
                                </div>
                                <div className="filter-title">Filter by :</div>
                                <form>
                                    <div className="form-row">
                                        <label>Genre</label>
                                        <div className="genre">
                                            <MySelect
                                                set={setGenre}
                                                options={filters.genres}
                                                loading={loading}
                                                isSearchable={isSearchable}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label>Rating</label>
                                        <div className="rating">
                                            <MySelect
                                                set={setRating}
                                                options={filters.rating}
                                                loading={loading}
                                                isSearchable={isSearchable}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label>Language</label>
                                        <div className="language">
                                            <MySelect
                                                set={setLanguage}
                                                options={filters.languages}
                                                loading={loading}
                                                isSearchable={isSearchable}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label>Order by</label>
                                        <div className="sort">
                                            <MySelect
                                                set={setSortby}
                                                options={filters.sortby}
                                                loading={loading}
                                                isSearchable={isSearchable}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div>
                    <DisplayMovies />
                </div>
                <div>{loading && <Spinner />}</div>
            </div>
        </div>
    );
}
