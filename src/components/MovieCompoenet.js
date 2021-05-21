import React, { useState, useEffect } from "react";
import MoviesData from "../views/moviesData.js";

import Spinner from "./spinnerComponent.js";
import { useParams } from "react-router";

function Movie() {
    const [movie, setMovie] = useState({});
    const [loading, setloading] = useState(true);
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [genres, setGenres] = useState("");

    useEffect(() => {
        if (loading) {
            document.title = "Loading...";
        }
        getMovie();

        // eslint-disable-next-line
    }, []);

    async function getMovie() {
        try {
            const { data } = await MoviesData.getMovieById(id);
            document.title = data.title;
            setMovie(data);
            setRating(data.imdb.rating);
            setGenres(data.genres.join(" / "));
            setloading(false);
        } catch (e) {
            console.log(e);
        }
    }

    function Moviedisplay() {
        const date = new Date(movie.released);
        const year = date.getFullYear();
        const rated = movie.rated;
        const poster = movie.poster;
        return (
            <div>
                <div className="movie-details">
                    <div className="col-12 col-md-4">
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
                <div className="movie-cast">
                    <div className="col-12 col-md-4">cast</div>
                </div>
                <div className="movie-plot">
                    <div className="col-12 col-md-8">
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
                <div className="row">{!loading && <Moviedisplay />}</div>
                <div className="row">{loading && <Spinner />}</div>
            </div>
        </div>
    );
}

export default Movie;
