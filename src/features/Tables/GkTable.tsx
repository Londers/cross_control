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
    {field: "pageNum", headerName: "месяц", flex: 15, editable: false, sortable: false,},
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

export default GkTable