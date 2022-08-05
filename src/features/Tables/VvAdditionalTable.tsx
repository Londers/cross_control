import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {SetTimeUse} from "../../common";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "name", headerName: "№ Назн. ф", type: "string", flex: 2, editable: false, sortable: false},
]

for (let i = 0; i < 8; i++) {
    columns.push({...defaultColumnOptions, field: i.toString(), headerName: (i + 1).toString()})
}

function VvAdditionalTable(props: { SetTimeUse: SetTimeUse | undefined }) {
    const rows = [{id: 0, name: "Интервал, с", ...props.SetTimeUse?.notwork}]


    return (
        <div style={{height: "110px", width: "80%", marginInline: "auto"}}>
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

export default VvAdditionalTable