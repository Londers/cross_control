import React from "react";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {Pk} from "../../common";
import {Checkbox, FormControlLabel, MenuItem, Select} from "@mui/material";

const defaultColumnOptions = {
    flex: 1,
    sortable: false,
    editable: true,
}

function PkTable(props: { currentPk: Pk, currentRow: number, setCurrentRow: Function }) {

    const columns: GridColumns = [
        {field: "line", headerName: "№ перекл.", ...defaultColumnOptions,},
        {field: "start", headerName: "Вр. вкл", ...defaultColumnOptions},
        {
            field: "tf",
            headerName: "Тип фазы",
            ...defaultColumnOptions,
            renderCell: (params) => {
                return (<Select onChange={() => {
                }} value={params.value}>
                    <MenuItem value={0} key={0}>---</MenuItem>)
                    <MenuItem value={1} key={1}>МГР</MenuItem>)
                    <MenuItem value={2} key={2}>1 ТВП</MenuItem>)
                    <MenuItem value={3} key={3}>2 ТВП</MenuItem>)
                    <MenuItem value={4} key={4}>1,2 ТВП</MenuItem>)
                    <MenuItem value={5} key={5}>Зам. 1ТВП</MenuItem>)
                    <MenuItem value={6} key={6}>Зам. 2ТВП</MenuItem>)
                    <MenuItem value={7} key={7}>Зам.</MenuItem>)
                    <MenuItem value={8} key={8}>МДК</MenuItem>)
                    <MenuItem value={9} key={9}>ВДК</MenuItem>)
                </Select>)
            }
        },
        {field: "num", headerName: "№ фазы", ...defaultColumnOptions},
        {field: "duration", headerName: "Длительность", ...defaultColumnOptions},
        {
            field: "plus",
            headerName: "+пред.",
            ...defaultColumnOptions,
            renderCell: (params =>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value}
                                onChange={() => {
                                }}
                            />
                        }
                        label=""
                    />
            )
        },
    ]

    const rows = props.currentPk.sts.map(sw => {
        return {id: sw.line, ...sw, duration: sw.stop - sw.start + (sw.trs ? sw.dt : 0)}
    })

    return (
        <div style={{height: "500px", width: "60%", marginInline: "auto"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                disableColumnFilter
                hideFooter
                onSelectionModelChange={(newSelectionModel) => {
                    props.setCurrentRow(newSelectionModel);
                }}
                selectionModel={props.currentRow}
            />}
        </div>
    )
}

export default PkTable