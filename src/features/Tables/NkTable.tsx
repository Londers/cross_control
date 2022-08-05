import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {Nk} from "../../common";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "pageNum", headerName: "№ нед. карты", ...defaultColumnOptions, flex: 2, editable: false},
    {field: "monday", headerName: "пн.", ...defaultColumnOptions},
    {field: "tuesday", headerName: "вт.", ...defaultColumnOptions},
    {field: "wednesday", headerName: "ср.", ...defaultColumnOptions},
    {field: "thursday", headerName: "чт.", ...defaultColumnOptions},
    {field: "friday", headerName: "пт.", ...defaultColumnOptions},
    {field: "saturday", headerName: "сб.", ...defaultColumnOptions},
    {field: "sunday", headerName: "вс.", ...defaultColumnOptions},
]

function NkTable(props: { currentNk: Nk[] | undefined }) {

    const rows = props.currentNk?.map((nk, index) => {
        return {
            id: index,
            pageNum: index + 1,
            monday: nk.days[0],
            tuesday: nk.days[1],
            wednesday: nk.days[2],
            thursday: nk.days[3],
            friday: nk.days[4],
            saturday: nk.days[5],
            sunday: nk.days[6],
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

export default NkTable