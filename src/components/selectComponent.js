import React from "react";
import Select from "react-select";

function MySelect() {
    const genres = [
        { value: "Action", label: "Action" },
        { value: "Adventure", label: "Adventure" },
        { value: "Animation", label: "Animation" },
        { value: "Biography", label: "Biography" },
        { value: "Comedy", label: "Comedy" },
        { value: "Crime", label: "Crime" },
        { value: "Documentary", label: "Documentary" },
        { value: "Drama", label: "Drama" },
        { value: "Family", label: "Family" },
        { value: "Fantasy", label: "Fantasy" },
        { value: "Film-Noir", label: "Film-Noir" },
        { value: "History", label: "History" },
        { value: "Horror", label: "Horror" },
        { value: "Music", label: "Music" },
        { value: "Musical", label: "Musical" },
        { value: "Mystery", label: "Mystery" },
        { value: "News", label: "News" },
        { value: "Romance", label: "Romance" },
        { value: "Sci-Fi", label: "Sci-Fi" },
        { value: "Short", label: "Short" },
        { value: "Sport", label: "Sport" },
        { value: "Talk-Show", label: "Talk-Show" },
        { value: "Thriller", label: "Thriller" },
        { value: "War", label: "War" },
        { value: "Western", label: "Western" },
    ];

    const styles = {
        multiValue: (base) => ({
            ...base,
            display: "flex",
            flexDirection: "row",
        }),
        option: (styles, state) => ({
            ...styles,
            height: "100%",

            backgroundColor: state.isFocused ? "blue" : null,
            color: state.isFocused ? "white" : "black",
            fontSize: "1em",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "black",
            fontSize: "1em",
        }),
    };

    return <Select options={genres} styles={styles}></Select>;
}

export default MySelect;
