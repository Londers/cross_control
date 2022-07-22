import React from "react"

function ReloadIcon(props: { width: number, height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 450 450"
            {...props}
        >
            <path
                d="M357.883 364.8c-77.952 77.953-204.78 77.95-282.731-.002-77.948-77.947-77.95-204.775.002-282.727 25.767-25.767 58.014-43.992 93.222-52.694l14.62 59.15c-24.447 6.044-46.841 18.712-64.766 36.629-54.193 54.192-54.19 142.365 0 196.554 54.194 54.194 142.365 54.195 196.557.003 52.23-52.23 53.962-135.931 5.52-190.442l-21.077-21.077-27.182 62.679a5.08 5.08 0 0 1-5.374 3.014 5.083 5.083 0 0 1-4.344-4.38L241.937 15.4a5.09 5.09 0 0 1 5.709-5.71l156.11 20.404a5.11 5.11 0 0 1 4.383 4.34 5.087 5.087 0 0 1-3.019 5.38l-62.674 27.176 15.444 15.084c5.458 5.459 21.727 25.401 24.009 29.088 52.828 77.759 44.854 184.77-24.016 253.64z"/>
        </svg>
    )
}

export default ReloadIcon
