import React from "react";
import { Stage } from "../../common";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "line", headerName: "№ стр.", flex: 1, editable: false, sortable: false,},
    {field: "kvStart", headerName: "Т начала", type: "string", ...defaultColumnOptions},
    {field: "kvEnd", headerName: "Т конца интервала", type: "string", ...defaultColumnOptions},
    {field: "lenTVP", headerName: "T конт ТВП", type: "number", ...defaultColumnOptions},
    {field: "lenMGR", headerName: "T конт МГР", type: "number", ...defaultColumnOptions},
]

function KvTable(props: {Stages: Stage[] | undefined}) {

    const rows = props.Stages?.map((stage, index) => {
        return {
            id: index,
            line: index + 1,
            kvStart: Object.values(stage.start).join(":"),
            kvEnd: Object.values(stage.end).join(":"),
            lenTVP: stage.lenTVP,
            lenMGR: stage.lenMGR,
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

export default KvTable