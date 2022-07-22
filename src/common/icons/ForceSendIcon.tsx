import React from "react"

function SvgComponent (props: { width: number, height: number })
{
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 200 200"
            {...props}
        >
            <g transform="translate(0 -97)">
                <image
                    width={104.183}
                    height={106.321}
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                    x={47.766}
                    y={119.052}
                />
                <g
                    style={{
                        display: "inline",
                    }}
                >
                    <path
                        d="M33.093 100.83h22.636"
                        style={{
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: "2.7232666px",
                        }}
                        transform="matrix(2.77727 -.0071 .00762 2.58646 -69.962 -.635)"
                    />
                    <path
                        d="m32.518 101.85 6.647-6.673M32.523 100.214l6.674 6.646"
                        style={{
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: "2.5px",
                        }}
                        transform="matrix(2.77727 -.0071 .00762 2.58646 -69.962 -.635)"
                    />
                    <path
                        transform="matrix(2.77729 0 0 2.58647 -69.962 -.635)"
                        style={{
                            fill: "#000",
                            fillOpacity: 1,
                            stroke: "#fff",
                            strokeWidth: 0.08668809,
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        d="M59.603 99.285h12.005v2.789H59.603z"
                    />
                    <path
                        transform="matrix(2.77729 0 0 2.58647 -69.962 -.635)"
                        style={{
                            display: "inline",
                            fill: "#000",
                            fillOpacity: 1,
                            stroke: "#fff",
                            strokeWidth: 0.04900463,
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        d="M73.539 99.261h3.783v2.828h-3.783zM79.215 99.296h3.783v2.828h-3.783zM84.741 99.296h3.783v2.828h-3.783z"
                    />
                </g>
            </g>
        </svg>
    )
}
export default SvgComponent
