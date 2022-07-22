import React from "react";

function SendIcon(props: {width: number, height: number}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="25 25 150 150"
            {...props}
        >
            <g transform="translate(0 -97)">
                <g
                    fill="green"
                    stroke="none"
                    transform="matrix(.01523 0 0 -.01862 4.675 315.987)"
                >
                    <path
                        fill="green"
                        d="M4610 6399V3518l43 25c195 114 4144 2392 4494 2593 339 194 448 262 440 270-7 7-743 434-1637 949-894 516-2001 1155-2460 1420s-845 487-857 494l-23 12z"
                    />
                </g>
            </g>
        </svg>
    );
}

export default SendIcon;
