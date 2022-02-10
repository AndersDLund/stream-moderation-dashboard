import React from "react";
import "./Toast.scss";

export const Toast = (props) => {
    return (
        <div className={(props.success ? "toast-container success" : "toast-container")}>
            <p>{props.success ? 'SUCCESS:' : 'FAILURE:'}</p>
            <p>{props.text}</p>
        </div>
    );
}