import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Gk} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {updateGk} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "pageNum", headerName: "Месяц", flex: 15, editable: false, sortable: false, headerAlign: "center", align: "center",},
]

function GkTable(props: { currentGk: Gk[] | undefined }) {
    const dispatch = useAppDispatch()
    const changeGk = (gk: number, day: number, value: number) => {
        dispatch(updateGk({gk, day, value}))
    }

    (() => {
        if (columns.length !== 1) return
        for (let i = 0; i < 31; i++) {
            columns.push({
                ...defaultColumnOptions,
                field: i.toString(),
                headerName: (i + 1).toString(),
                headerAlign: "center",
                align: "center",
                preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                    changeGk(params.row.pageNum - 1, i, Number(params.props.value))
                    return {...params.props}
                }
            })
        }
    })()

    const rows = props.currentGk?.map((gk, index) => {
        return {
            id: index,
            pageNum: index + 1,
            ...gk.days
        }
    })

    return (
        <div style={{height: "682px", width: "95%", display: "flex", alignItems: "flex-start"}}>
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

export default GkTable