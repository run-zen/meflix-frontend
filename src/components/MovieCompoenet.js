import React, { useState, useEffect } from "react";
import MoviesData from "../views/moviesData.js";

import Spinner from "./spinnerComponent.js";
import { useParams } from "react-router";

function Movie() {
    const [movie, setMovie] = useState({});
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [genres, setGenres] = useState("");

    useEffect(() => {
        getMovie();

        // eslint-disable-next-line
    }, []);

    async function getMovie() {
        try {
            const { data } = await MoviesData.getMovieById(id);
            setMovie(data);
            setRating(data.imdb.rating);
            setGenres(data.genres.join(" / "));
            setloading(true);
        } catch (e) {
            console.log(e);
        }
    }

    function Moviedisplay() {
        const date = new Date(movie.released);
        const year = date.getFullYear();
        const rated = movie.rated;
        return (
            <div>
                <div className="movie-details">
                    <div className="col-12 col-md-4">
                        <img
                            src={movie.poster}
                            class="img-thumbnail mx-auto d-block movie-poster"
                            alt="movie poster"
                        />
                    </div>
                    <div className="col-12 col-md-8 ">
                        <div className="movie-desc">
                            <div className="movie-title">{movie.title}</div>
                            <div className="movie-year">
                                <span className="badge">{rated}</span>
                                {year ? year : ""}
                            </div>
                            <div className="movie-genre">{genres}</div>
                            <div className="movie-rating">
                                <span className="badge">IMDB</span>
                                {rating}
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="movie-plot">
                    <div className="col-12">
                        <h3>Plot</h3>
                        <div>
                            <p>{movie.fullplot}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="homepage">
            <div className="container">
                <div className="row">
                    {!loading ? <Spinner /> : <Moviedisplay />}
                </div>
            </div>
        </div>
    );
}

export default Movie;