import React from "react";

function HistoryInfo(props: { historyDiffs: string[] }) {
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
            lineHeight: 2,
        }}>
            {props.historyDiffs.map(
                (res, i) =>
                    <div key={i} style={{
                        borderTop: "1px solid",
                        borderRadius: "5px",
                        fontSize: i === 0 ? 20 : 15,
                        padding: "0 10px"
                    }}>
                        {res}
                    </div>
            )}
        </div>
    )
}

export default HistoryInfo