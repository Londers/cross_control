import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Mgr} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {setMgr} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

function MgrTable(props: {mgrs: Mgr[] | undefined}) {
    const dispatch = useAppDispatch()
    const changeMgr = (index: number, mgr: Mgr) => {
        dispatch(setMgr({index, mgr}))
    }

    const columns: GridColumns = [
        {
            field: "phase",
            headerName: "№ фазы",
            ...defaultColumnOptions,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tlen",
            headerName: "t мин.",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newMgr = {...params.row, tlem: Number(params.props.value)}
                delete newMgr.id
                changeMgr(Number(params.id), newMgr)
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tmgr",
            headerName: "t МГР",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const newMgr = {...params.row, tmgr: Number(params.props.value)}
                delete newMgr.id
                changeMgr(Number(params.id), newMgr)
                return {...params.props}
            },
            ...defaultColumnOptions,
            headerAlign: "center",
            align: "center",
        },
    ]

    const rows = props.mgrs?.map((mgr, index) => {
        return {
            id: index,
            ...mgr
        }
    })

    return (
        <div style={{height: "475px", width: "20%", display: "flex", alignItems: "flex-start", marginLeft: "1rem"}}>
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

export default MgrTable