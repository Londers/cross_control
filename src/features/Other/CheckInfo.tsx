import React from "react";
import {CheckMsg} from "../../common";

function CheckInfo(props: { checkInfo: CheckMsg }) {
    return (
        <div style={{
            position: "absolute",
            top: "3.85rem",
            right: "9%",
            backgroundColor: "white",
            borderBottom: "2px solid",
            borderLeft: "2px solid",
            borderRight: "2px solid",
            borderRadius: "5px",
            width: "fit-content",
            zIndex: 2,
            fontSize: 20,
            lineHeight: 2,
        }}>
            {props.checkInfo.result.map(
                (res, i) =>
                    <div key={i} style={{
                        borderTop: res.includes("Проверка") ? "2px solid" : "none",
                        backgroundColor: (res.includes("Проверка") || res.includes("OK")) ? "none" : "indianred",
                        borderRadius: "5px",
                        // paddingTop: res.includes("Проверка") ? "1rem" : "0",
                    }}>
                        {res}
                    </div>
            )}
        </div>
    )
}

export default CheckInfo