import axios from "axios";

export default axios.create({
    baseURL: "https://runzens-org-meflix-api.herokuapp.com/api/v1/movies",
    headers: {
        "Content-type": "application/json",
    },
});
