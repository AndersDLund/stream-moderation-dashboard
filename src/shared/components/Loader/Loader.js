import React from "react";
import "./Loader.scss";

export const Loader = (props) => {
    return (
        <div className="loader-container">
            <div className='loader'></div>
            <p>{props.message}</p>
        </div>
    );
}