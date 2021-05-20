import http from "../http-common";

class MoviesData {
    getHomepage() {
        return http.get("/browseMovies?page=1&rating=8.5");
    }

    quicksearch(name, page = 1) {
        let search = name;
        if (!search) {
            return this.getHomepage();
        }
        return http.get(`/quicksearch/${search}?page=${page}`);
    }

    getMovieById(id) {
        return http.get(`/id/${id}`);
    }
}

export default new MoviesData();
