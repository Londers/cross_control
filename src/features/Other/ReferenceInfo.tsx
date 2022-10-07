import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown'

function ReferenceInfo() {
    const [data, setData] = useState<any>()

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            axios.get('/crossControl.md')
                .then(res => {
                    setData(res.data)
                })
        } else {
            axios.get(window.location.origin + '/file/static/markdown/crossControl.md')
                .then(res => {
                    setData(res.data)
                })
        }
    })

    return (
        <div style={{
            position: "absolute",
            top: "3.85rem",
            right: "9%",
            backgroundColor: "white",
            backfaceVisibility: "visible",
            border: "1px solid",
            borderRadius: "2px",
            width: "50%",
            height: "80%",
            zIndex: 2,
        }}>
            {data &&
                <div style={{height: "100%", overflow: "auto"}}>
                    <ReactMarkdown children={data}/>
                </div>}
        </div>
    )
}

export default ReferenceInfo