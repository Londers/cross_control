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
        {
            field: "name",
            headerName: "№ Назн.",
            type: "string",
            ...defaultColumnOptions,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "type",
            headerName: "Тип стат.",
            type: "number",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                // if ((typeof params.row.type !== "number") && (typeof params.row.type !== "string") ){
                //     console.log("zaebalo")
                //     return {...params.row, type: "0"}
                // }
                const newTimeUse = {...params.row, type: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
            headerAlign: "center",
            align: "center",
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
            flex: 2,
            headerAlign: "center",
            align: "center",
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
            headerAlign: "center",
            align: "center",
        },
        {
            field: "fazes",
            headerName: "Фазы",
            type: "string",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newTimeUse = {...params.row, fazes: params.props.value}
                delete newTimeUse.id
                changeTimeUse(Number(params.id), newTimeUse)
                return {...params.row}
            },
            headerAlign: "center",
            align: "center",
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
            headerAlign: "center",
            align: "center",
        },
    ]

    // useEffect(() => {dispatch(setDevicePspd(state?.Model.vpcpdl + "." + state?.Model.vpcpdr))})

    const rows = props.SetTimeUse?.uses.map((use, index) => {
        return {id: index, ...use, type: use.type.toString()}
    })

    return (
        <div style={{height: "473.5px", width: "100%", marginInline: "auto"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                sx={{borderBottom: "none"}}
            />}
        </div>
    )
}

export default VvMainTable