import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {Gk} from "../../common";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "pageNum", headerName: "месяц", flex: 15, editable: false, sortable: false,},
]

for (let i = 0; i < 31; i++) {
    columns.push({...defaultColumnOptions, field: i.toString(), headerName: (i + 1).toString()})
}

function GkTable(props: { currentGk: Gk[] | undefined }) {

    const rows = props.currentGk?.map((nk, index) => {
        return {
            id: index,
            pageNum: index + 1,
            ...nk.days
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

export default GkTable