import React from "react";
import Select from "react-select";

function MySelect(props) {
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

    return (
        <Select
            options={props.options}
            styles={styles}
            defaultValue={props.options[0]}
            onChange={(selectedOption) => props.set(selectedOption.value)}
        ></Select>
    );
}

export default MySelect;
