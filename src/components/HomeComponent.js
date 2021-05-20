import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesData from "../views/moviesData.js";
import Spinner from "./spinnerComponent.js";

function Home() {
    const [Movies, setMovies] = useState([]);
    const [loading, setloading] = useState(false);
    const [searchname, setSearchname] = useState("");

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
            const { data } = await MoviesData.getHomepage();
            setloading(true);
            setMovies(data.MoviesList);
            console.log(Movies);
        } catch (e) {
            console.error(e);
        }
    };

    function DisplayMovies() {
        return (
            <div className="container">
                <div className="row">
                    {Movies.map((movie) => {
                        const title = `${movie.title}`;
                        const date = new Date(movie.released);
                        const year = date.getFullYear();
                        const poster = movie.poster;
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
                                        className="btn view-details"
                                        onClick={handleScroll}
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
                </div>
            </div>

            <div>{loading ? <DisplayMovies /> : <Spinner />}</div>
        </div>
    );
}

export default Home;
