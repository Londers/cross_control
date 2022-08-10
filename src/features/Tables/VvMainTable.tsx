import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {SetTimeUse} from "../../common";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "name", headerName: "№ Назн.", type: "string", ...defaultColumnOptions, editable: false},
    {field: "type", headerName: "Тип стат.", type: "number", ...defaultColumnOptions},
    {field: "tvps", headerName: "ТВП1,2, МГР, ВПУ", type: "number", ...defaultColumnOptions},
    {field: "dk", headerName: "№ ДК", type: "number", ...defaultColumnOptions},
    {field: "fazes", headerName: "Фазы", type: "string", headerAlign: "right", align: "right", ...defaultColumnOptions},
    {field: "long", headerName: "Интервал", type: "number", ...defaultColumnOptions},
]

function VvMainTable(props: {SetTimeUse: SetTimeUse | undefined}) {
    const rows = props.SetTimeUse?.uses.map((use, index) => {
        return {id: index, ...use}
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

export default VvMainTable