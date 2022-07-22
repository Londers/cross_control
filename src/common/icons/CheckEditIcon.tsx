import React from "react"

function CheckEditIcon(props: { width: number, height: number })
{
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            {...props}
        >
            <defs>
                <linearGradient id="d">
                    <stop offset={0} stopColor="#ffcd00"/>
                    <stop offset={1} stopColor="red"/>
                </linearGradient>
                <linearGradient id="c">
                    <stop offset={0} stopColor="#eefb11"/>
                    <stop offset={1} stopColor="#fbcd11"/>
                </linearGradient>
                <linearGradient id="a">
                    <stop offset={0} stopColor="#fff"/>
                    <stop offset={1} stopOpacity={0} stopColor="#fffcfc"/>
                </linearGradient>
                <linearGradient id="b">
                    <stop offset={0}/>
                    <stop offset={1} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <path
                d="M164.261 159.996c-.306-1.272-.874-2.193-1.53-2.983l-36.593-40.218c-.83-.921-1.793-1.36-2.886-1.93-1.268-.658-2.667-.702-4.11-.702H49.236c-5.421 0-10.361 4.21-10.361 10.044v147.014c0 5.878 4.94 11.36 10.361 11.36h106.282c5.421 0 9.269-5.482 9.269-11.36V164.162c0-1.579-.175-2.719-.525-4.166zm-41.009-25.394 25.358 27.85h-25.358zM52.864 268.59V128.242h56.398v35.833c0 6.49 5.858 12.412 12.285 12.412h29.249v92.103z"
                style={{
                    stroke: "#fff",
                    strokeOpacity: 1,
                    fill: "#00f",
                }}
                transform="translate(0 -97)"
            />
            <path
                style={{
                    fill: "#00f",
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 0.26458332,
                    strokeOpacity: 1,
                }}
                d="M72.697 191.733h57.196v8.018H72.697zM72.697 210.254h57.196v8.018H72.697zM72.794 228.073h57.196v8.018H72.794zM72.794 246.594h57.196v8.018H72.794z"
                transform="translate(0 -97)"
            />
            <path
                style={{
                    fill: "#acf",
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 4.04697323,
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
                d="M465.609 194.253c-.005-44.237.844-51.464 5.457-46.467 3.004 3.254 24.562 26.827 47.907 52.383l42.445 46.467h-95.804l-.005-52.383zM211.045 647.2c0-.812 13.485-12.63 29.966-26.264l29.966-24.787h222.911v-32.325l-91.924-.155-91.924-.155 20.203-17.945 20.203-17.944 71.72-.083 71.722-.083v-32.325l-55.559-.31c-30.557-.171-62.723-2.472-71.48-5.113l-15.92-4.802 16.502-13.07 16.503-13.07h109.954v-32.325H458.77c-30.45 0-34.127-.725-27.667-5.448 8.458-6.185 5.28-14.755-5.47-14.755-10.042 0-13.283-4.36-7.987-10.74 3.146-3.792 15.292-5.423 40.37-5.423h35.872V374.16c0-15.37-.505-15.962-14.634-17.173l-14.634-1.254 32.638-27.274c30.324-25.34 34.01-27.274 52.01-27.274h19.37v347.492H389.843c-98.339 0-178.797-.664-178.797-1.477z"
                transform="scale(.26458)"
            />
            <path
                style={{
                    fill: "#ff0",
                    stroke: "#000",
                    strokeWidth: 2.4157114,
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
                d="m53.07 267.984 98.168-67.698-31.659.364 33.842-47.28-39.467-.702-37.353 58.63 24.986.12z"
                transform="translate(0 -97)"
            />
            <path
                style={{
                    fill: "#acf",
                    fillOpacity: 1,
                    stroke: "#000",
                    strokeWidth: 8.56062984,
                    strokeLinecap: "round",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 0,
                }}
                d="M198.043 378.877V116.662h216V227.017l-41.571 65.323-41.571 65.322-27.18.016c-14.948.008-27.754.38-28.457.826-.963.612-1.21 4.367-1 15.235l.279 14.423 18.112.5 18.112.5-12.112 19.206-12.112 19.206-5 .06c-2.75.032-5.576.424-6.279.87-.963.612-1.21 4.367-1 15.235l.279 14.423 39.903.5 39.903.5-15.217 17.733-15.217 17.732-24.186.268-24.186.267-.276 15.217-.276 15.217 10.955.283 10.955.283-47.983 56c-26.39 30.8-48.633 56.66-49.429 57.465-1.262 1.277-1.446-31.978-1.446-260.75z"
                transform="scale(.26458)"
            />
        </svg>
    )
}

export default CheckEditIcon