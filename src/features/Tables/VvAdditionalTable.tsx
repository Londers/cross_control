import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {SetTimeUse} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {updateNotwork} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: true,
    sortable: false,
}

const columns: GridColumns = [
    {field: "name", headerName: "№ Назн. ф", type: "string", flex: 2, editable: false, sortable: false},
]


function VvAdditionalTable(props: { SetTimeUse: SetTimeUse | undefined }) {
    const dispatch = useAppDispatch()
    const changeNotwork = (id: number, value: number) => {
        dispatch(updateNotwork({id, value}))
    }

    (() => {
        if (columns.length !== 1) return
        for (let i = 0; i < 8; i++) {
            columns.push({
                ...defaultColumnOptions,
                field: i.toString(),
                headerName: (i + 1).toString(),
                preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                    changeNotwork(i, Number(params.props.value))
                    return {...params.props}
                }
            })
        }
    })()

    const rows = [{id: 0, name: "Интервал, с", ...props.SetTimeUse?.notwork}]

    return (
        <div style={{height: "110px", width: "80%", marginInline: "auto"}}>
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

export default VvAdditionalTable