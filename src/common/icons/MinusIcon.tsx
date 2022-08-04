import React from "react"

function MinusIcon(props: { width: number, height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            {...props}
        >
            <path
                style={{
                    fill: "green",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.26499999,
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
                d="M25.702 185.119h149.679v19.655H25.702z"
                transform="translate(1.058 -97)"
            />
        </svg>
    )
}

export default MinusIcon
