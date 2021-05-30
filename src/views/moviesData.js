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
    browseMovies(page = 1, filters) {
        const name = filters.name || "";
        const genre = filters.genre === "All" ? "" : filters.genre;
        const sortby = filters.sortby === "default" ? "" : filters.sortby;
        const rating = filters.rating === "All" ? "" : filters.rating;
        const language = filters.language === "All" ? "" : filters.language;
        return http.get(
            `/browseMovies?page=${page}&name=${name}&genre=${genre}&sortby=${sortby}&rating=${rating}&language=${language}`
        );
    }
}

export default new MoviesData();
