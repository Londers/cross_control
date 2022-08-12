import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {SetTimeUse, Use} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {updateTimeUse} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

function VvMainTable(props: { SetTimeUse: SetTimeUse | undefined }) {
    const dispatch = useAppDispatch()
    const changeTimeUse = (id: number, use: Use) => {
        dispatch(updateTimeUse({id, use}))
    }

    const columns: GridColumns = [
        {field: "name", headerName: "№ Назн.", type: "string", ...defaultColumnOptions, editable: false},
        {
            field: "type",
            headerName: "Тип стат.",
            type: "number",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, type: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
        },
        {
            field: "tvps",
            headerName: "ТВП1,2, МГР, ВПУ",
            type: "number",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, tvps: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
        },
        {
            field: "dk",
            headerName: "№ ДК",
            type: "number",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, dk: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
        },
        {
            field: "fazes",
            headerName: "Фазы",
            type: "string",
            headerAlign: "right",
            align: "right", ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, fazes: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
        },
        {
            field: "long",
            headerName: "Интервал",
            type: "number",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, long: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
        },
    ]

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