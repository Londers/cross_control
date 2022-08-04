import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {Pk} from "../../common";

const defaultColumnOptions = {
    flex: 1,
}

const columns: GridColumns = [
    {field: "line", headerName: "№ перекл.", ...defaultColumnOptions},
    {field: "start", headerName: "Вр. вкл", ...defaultColumnOptions},
    {field: "tf", headerName: "Тип фазы", ...defaultColumnOptions},
    {field: "num", headerName: "№ фазы", ...defaultColumnOptions},
    {field: "duration", headerName: "Длительность", ...defaultColumnOptions},
    {field: "plus", headerName: "+пред.", ...defaultColumnOptions},
]

function PkTable(props: { currentPk: Pk | undefined, currentRow: number, setCurrentRow: Function }) {

    const rows = props.currentPk?.sts.map(sw => {
        return {id: sw.line, ...sw, duration: sw.stop - sw.start}
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

export default PkTable