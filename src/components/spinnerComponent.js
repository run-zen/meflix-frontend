import React from "react";

function Spinner() {
    return (
        <div className="spinner-position">
            <div class="d-flex justify-content-center">
                <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>
        </div>
    );
}

export default Spinner;
