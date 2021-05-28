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
            cursor: "pointer",
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
        control: (styles) => ({
            ...styles,
            width: "auto",
            cursor: "pointer",
        }),
    };

    return (
        <Select
            options={props.options}
            styles={styles}
            defaultValue={props.options[0]}
            onChange={(selectedOption) => {
                props.set(selectedOption.value);
            }}
            isDisabled={props.loading}
            isSearchable={props.isSearchable}
        ></Select>
    );
}

export default MySelect;
