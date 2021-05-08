import React from "react";

const Box = ({ color }) => {
    return (
        <div style={{
            backgroundColor:color, width: "2rem", height:"2rem"
        }}
        />
    )
}

export default Box