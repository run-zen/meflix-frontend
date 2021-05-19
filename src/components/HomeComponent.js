import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesData from "../views/moviesData.js";

function Home() {
    const [Movies, setMovies] = useState([]);
    const [loading, setloading] = useState(false);
    const [searchname, setSearchname] = useState("");

    useEffect(() => {
        getMovies();
    }, []);

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

    async function quicksearch() {
        try {
            setloading(false);
            const { data } = await MoviesData.quicksearch(searchname);
            setloading(true);
            setMovies(data.MoviesList);
        } catch (e) {
            console.error(e);
        }
    }

    function DisplayMovies() {
        return Movies.map((movie) => {
            const title = `${movie.title}`;
            return (
                <div className="movie-grid">
                    <img
                        src={movie.poster}
                        alt="movie poster"
                        className="img-thumbnail"
                    ></img>
                    <h4>{title}</h4>
                </div>
            );
        });
    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 searchbar">
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
                                for="#quicksearch-bar"
                                to={"/quicksearch/?name=" + searchname}
                                type="submit"
                                class="btn btn-primary"
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
                    <DisplayMovies />
                ) : (
                    <div class="d-flex justify-content-center mt-5">
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default Home;
