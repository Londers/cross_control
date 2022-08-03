import React from "react"

function CreateIcon(props: { width: number, height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            {...props}
        >
            <path
                d="M161.56 162.761c-.3-1.167-.86-2.012-1.505-2.736l-35.986-36.899c-.817-.845-1.763-1.247-2.838-1.77-1.247-.604-2.623-.644-4.041-.644H48.44c-5.331 0-10.19 3.863-10.19 9.215v134.88c0 5.392 4.859 10.422 10.19 10.422h104.52c5.332 0 9.115-5.03 9.115-10.422v-98.223c0-1.449-.172-2.495-.516-3.823zm-40.329-23.298 24.937 25.552h-24.937ZM52.01 262.393V133.628h55.463v32.875c0 5.955 5.761 11.387 12.081 11.387h28.764v84.501z"
                style={{
                    strokeWidth: 0.4159393,
                }}
                transform="translate(0 -97)"
            />
            <path
                style={{
                    fill: "#fff",
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 2.86164212,
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
                d="M196.857 381.906v-241.43H405.43v66.721c0 64.667.2 67.017 6.496 76.36 3.573 5.303 10.835 12.565 16.137 16.138 9.28 6.253 11.923 6.496 70.646 6.496h61.006V623.334H196.857Z"
                transform="scale(.26458)"
            />
            <path
                style={{
                    fill: "#fff",
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 2.86164212,
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
                d="M459.714 209.8v-44.96l40.187 39.96c22.102 21.98 41.433 42.213 42.958 44.963 2.584 4.663-.124 5-40.187 5h-42.958z"
                transform="scale(.26458)"
            />
        </svg>
    )
}

export default CreateIcon
