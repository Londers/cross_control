import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Sk} from "../../common";
import CustomTimePicker from "../Custom/CustomTimePicker";
import {useAppDispatch} from "../../app/hooks";
import {setSk} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
    sortable: false,
}


function SkTable(props: { skNum: number, currentSk: Sk | undefined }) {
    const dispatch = useAppDispatch()

    const columns: GridColumns = [
        {field: "pageNum", headerName: "№ стр.", ...defaultColumnOptions},
        {
            field: "start",
            headerName: "Т начала",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker date={params.value} setDate={null} min={null} disabled={true}/>
        },
        {
            field: "end",
            headerName: "Т начала след. ПК",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker
                    date={params.value}
                    setDate={(e: Date) => {
                        if (props.currentSk?.lines) {
                            const newLines = [
                                ...props.currentSk.lines.slice(0, params.row.pageNum - 1),
                                {
                                    ...props.currentSk.lines[params.row.pageNum - 1],
                                    hour: e.getHours(),
                                    min: e.getMinutes()
                                },
                                ...props.currentSk.lines.slice(params.row.pageNum, 12)
                            ]
                            dispatch(
                                setSk({
                                    sk: {
                                        ...props.currentSk,
                                        lines: newLines,
                                    },
                                    num: props.skNum - 1,
                                }))
                        }
                    }}
                    min={
                        (params.row.pageNum === 1) || ((params.row.pageNum ) === (props.currentSk?.count ?? -1)) ?
                            null :
                            new Date(0, 0, 0, props.currentSk?.lines[params.row.pageNum - 2].hour, props.currentSk?.lines[params.row.pageNum - 2].min)}
                    disabled={false}
                />
        },
        {
            field: "npk",
            headerName: "№ ПК",
            ...defaultColumnOptions,
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentSk?.lines) {
                    const newLines = [
                        ...props.currentSk.lines.slice(0, params.row.pageNum - 1),
                        {
                            ...props.currentSk.lines[params.row.pageNum - 1],
                            npk: Number(params.props.value),
                        },
                        ...props.currentSk.lines.slice(params.row.pageNum, 12)
                    ]
                    dispatch(
                        setSk({
                            sk: {
                                ...props.currentSk,
                                lines: newLines,
                                count: newLines.filter(line => line.npk !== 0).length
                            },
                            num: props.skNum - 1,
                        }))
                }
                return {...params.props};
            },
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

export default SkTable