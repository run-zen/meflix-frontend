import http from "../http-common";

class MoviesData {
    getHomepage(page = 1) {
        return http.get(`/browseMovies?page=${page}&rating=8.8`);
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
