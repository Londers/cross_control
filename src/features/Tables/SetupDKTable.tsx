import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectSetupDk, setSetupDk} from "../crossInfoSlice";
import {
    DataGrid,
    GridColumns,
    GridPreProcessEditCellProps,
    GridRowsProp,
    ruRU
} from "@mui/x-data-grid";

const defaultColumnOptions = {
    type: "number",
    editable: true,
    flex: 1,
}


function SetupDKTable() {
    const dispatch = useAppDispatch()
    const setup = useAppSelector(selectSetupDk)

    const columns: GridColumns = [
        {
            field: "dkn", headerName: "№ ДК", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, dkn: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
        {
            field: "dktype", headerName: "Тип ДК", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, dktype: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
        {
            field: "tminf", headerName: "Т мин см фаз", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, tminf: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
        {
            field: "tmaxf", headerName: "Т мах см фаз", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, tmaxf: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
        {
            field: "tprom", headerName: "Т мах Т пр", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, tprom: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
        {
            field: "tminmax", headerName: "Т мах Т мин", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                dispatch(setSetupDk({...setup, tminmax: params.props.value}))
                return {...params.props};
            },
            ...defaultColumnOptions
        },
    ]

    const rows: GridRowsProp = [{
        id: 1,
        ...setup
    }]


    return (
        <div style={{height: "110px", width: "57rem", marginInline: "auto"}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
            />
        </div>
    )
}

export default SetupDKTable;