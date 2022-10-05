import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, GridSelectionModel, ruRU} from "@mui/x-data-grid";
import {Line, Sk} from "../../common";
import CustomTimePicker from "../Other/CustomTimePicker";
import {useAppDispatch} from "../../app/hooks";
import {updateSkLine} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
    sortable: false,
}


function SkTable(props: { skNum: number, currentSk: Sk | undefined, line: GridSelectionModel, setLine: Function }) {
    const dispatch = useAppDispatch()
    const changeSkLine = (lineNum: number, line: Line) => {
        dispatch(updateSkLine({skNum: props.skNum - 1, lineNum, line}))
    }

    const columns: GridColumns = [
        {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions, headerAlign: "center", align: "center",},
        {
            field: "start",
            headerName: "Т начала",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker date={params.value} setDate={null} disabled={true}/>,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "end",
            headerName: "Т начала след. ПК",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker
                    date={params.value}
                    setDate={(e: Date) => {
                        changeSkLine(Number(params.id), {
                            hour: e.getHours(),
                            min: e.getMinutes(),
                            npk: Number(params.row.npk)
                        })
                    }}
                    // min={
                    //     (params.row.pageNum === 1) || ((params.row.pageNum) === (props.currentSk?.count ?? -1)) ?
                    //         null :
                    //         new Date(0, 0, 0, props.currentSk?.lines[params.row.pageNum - 2].hour, props.currentSk?.lines[params.row.pageNum - 2].min)
                    // }
                    disabled={false}
                />,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "npk",
            headerName: "№ ПК",
            ...defaultColumnOptions,
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentSk) changeSkLine(Number(params.id), {
                    ...props.currentSk.lines[Number(params.id)],
                    npk: Number(params.props.value)
                })
                return {...params.props};
            },
            headerAlign: "center",
            align: "center",
        },
    ]

    const rows = props.currentSk?.lines.map((line, index) => {
        return {
            id: index,
            pageNum: index + 1,
            start: (index === 0) ?
                new Date(0, 0, 0, 0, 0) :
                new Date(0, 0, 0, props.currentSk?.lines[index - 1].hour, props.currentSk?.lines[index - 1].min),
            end: new Date(0, 0, 0, line.hour, line.min),
            npk: line.npk
        }
    })

    return (
        <div style={{height: "682px", width: "42rem", display: "flex", alignItems: "flex-start"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                onSelectionModelChange={(newSelectionModel) => {
                    props.setLine(newSelectionModel);
                }}
                selectionModel={props.line}
                sx={{borderBottom: "none"}}
            />}
        </div>
    )
}

export default SkTable