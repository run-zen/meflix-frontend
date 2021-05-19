import http from "../http-common";

class MoviesData {
    getHomepage() {
        return http.get("/browseMovies?page=1&rating=9");
    }

    quicksearch(name) {
        let search = name;
        if (!search) {
            return this.getHomepage();
        }
        return http.get(`/quicksearch/${search}`);
    }
}

export default new MoviesData();
