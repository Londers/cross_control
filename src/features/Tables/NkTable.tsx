import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Nk} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {updateNk} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

function NkTable(props: { currentNk: Nk[] | undefined }) {
    const dispatch = useAppDispatch()
    const changeNk = (nk: number, day: number, value: number) => {
        if (value === 0) value = 1
        dispatch(updateNk({nk, day, value}))
    }

    const columns: GridColumns = [
        {
            field: "pageNum",
            headerName: "№ нед. карты", ...defaultColumnOptions,
            flex: 2,
            editable: false,
            headerAlign: "center",
            align: "center",
            minWidth: 115,
        },
        {
            field: "monday", headerName: "пн.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 0, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tuesday", headerName: "вт.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 1, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "wednesday", headerName: "ср.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 2, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "thursday", headerName: "чт.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 3, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "friday", headerName: "пт.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 4, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "saturday", headerName: "сб.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 5, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "sunday", headerName: "вс.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeNk(params.row.pageNum - 1, 6, Number(params.props.value))
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
    ]

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
        <div style={{height: "682px", width: "40%", display: "flex", alignItems: "flex-start"}}>
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

export default NkTable