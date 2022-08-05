import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {Sk} from "../../common";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions, editable: false},
    {field: "start", headerName: "Т начала", ...defaultColumnOptions},
    {field: "end", headerName: "Т начала след. ПК", ...defaultColumnOptions},
    {field: "npk", headerName: "№ ПК", ...defaultColumnOptions},
]

function SkTable(props: { currentSk: Sk | undefined, currentRow: number, setCurrentRow: Function }) {

    const rows = props.currentSk?.lines.map((line, index) =>{
        return {
            id: index,
            pageNum: index + 1,
            start: (index === 0) ? "00:00" : (props.currentSk?.lines[index - 1].hour + ":" + props.currentSk?.lines[index - 1].min),
            end: (line.hour + ":" + line.min),
            npk: line.npk
        }
    })

    return (
        <div style={{height: "500px", width: "60%", marginInline: "auto"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
            />}
        </div>
    )
}

export default SkTable