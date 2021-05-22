import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import MoviesData from "../views/moviesData.js";
import Spinner from "./spinnerComponent.js";

function Home() {
    const [Movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(true);
    const [searchname, setSearchname] = useState("");
    const [totmov, setTotmov] = useState(0);
    const [hasmore, setHasmore] = useState(false);
    //const [error, setError] = useState(false);

    const observer = useRef();
    const lastMovie = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasmore) {
                    console.log("visible");
                    setPage((prevPage) => prevPage + 1);
                    console.log(page);
                    console.log(node);
                }
            });
            if (node) observer.current.observe(node);
            console.log(`has more : ${hasmore}`);
        },
        [page, loading, hasmore]
    );

    useEffect(() => {
        getMovies();

        // eslint-disable-next-line
    }, [page]);

    // eslint-disable-next-line
    useEffect(() => {
        setHasmore(totmov > Movies.length);
    });

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchname(searchName);
    };

    const getMovies = async () => {
        try {
            setloading(true);
            const { data } = await MoviesData.getHomepage(page);

            setTotmov(data["Movies found"]);
            setMovies((prevMovies) => {
                return [...new Set([...prevMovies, ...data.MoviesList])];
            });
            setHasmore(data["Movies found"] > Movies.length);
            setloading(false);
        } catch (e) {
            console.error(e);
        }
    };

    function DisplayMovies() {
        return (
            <div className="container">
                <div className="row">
                    {Movies.map((movie, index) => {
                        const title = `${movie.title}`;
                        const date = new Date(movie.released);
                        const year = date.getFullYear();
                        const poster = movie.poster;
                        const last = Movies.length === index + 4 ? true : false;
                        if (last) {
                            return (
                                <div
                                    className="col-md-3 col-12 movie-grid"
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
                                            className="btn view-details"
                                        >
                                            view details
                                        </Link>
                                    </div>
                                    <h4>{title}</h4>
                                    <h4>{year ? year : ""}</h4>
                                    <span className="badge">
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
                                    className="col-md-3 col-12 movie-grid"
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
                                            className="btn view-details"
                                        >
                                            view details
                                        </Link>
                                    </div>
                                    <h4>{title}</h4>
                                    <h4>{year ? year : ""}</h4>
                                    <span className="badge">
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
                                    type="text"
                                    id="quicksearch-bar"
                                    className="form-control"
                                    placeholder="quick search"
                                    value={searchname}
                                    onChange={onChangeSearchName}
                                    onFocus={(e) => {
                                        e.target.select();
                                    }}
                                    required
                                />
                            </div>
                            <Link
                                id="submit-btn"
                                for="#quicksearch-bar"
                                to={
                                    "/quicksearch/?name=" +
                                    searchname +
                                    "&page=1"
                                }
                                type="submit"
                                class="btn btn-outline-success"
                            >
                                search
                            </Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="homepage-titles">
                            <i className="fa fa-star"></i> Highest rated
                        </div>
                    </div>
                    <div>
                        <DisplayMovies />
                    </div>
                    <div>{loading && <Spinner />}</div>
                </div>
            </div>

            {/* <div className="container">
                <div className="row">{loadingmore && <Spinner />}</div>
            </div> */}
        </div>
    );
}

export default Home;
