import React from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Pk, St} from "../../common";
import {Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {PkFiniteStateMachine} from "../../common/PkFiniteStateMachine";
import {setPk} from "../crossInfoSlice";
import {useAppDispatch} from "../../app/hooks";

const defaultColumnOptions = {
    flex: 1,
    sortable: false,
    editable: true,
}

function PkTable(props: { currentPk: Pk, pkNum: number, currentRow: number, setCurrentRow: Function, pkFSM: PkFiniteStateMachine }) {
    const dispatch = useAppDispatch()
    const changePk = (pk: Pk) => {
        if (props.currentPk) dispatch(setPk({num: props.pkNum - 1, pk}))
    }

    const calcDurationDiff = (newDuration: number) => {
        return newDuration - (props.currentPk.sts[props.currentRow - 1].stop - props.currentPk.sts[props.currentRow - 1].start + props.currentPk.sts[props.currentRow - 1].dt)
    }

    const columns: GridColumns = [
        {field: "line", headerName: "№ перекл.", ...defaultColumnOptions,},
        {
            field: "start",
            headerName: "Вр. вкл",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentPk) changePk(props.pkFSM.changeStart(Number(params.props.value)))
                // changeSkLine(Number(params.id), {...props.currentSk.lines[Number(params.id)], npk: Number(params.props.value)})
                return {...params.props};
            },
        },
        {
            field: "tf",
            headerName: "Тип фазы",
            ...defaultColumnOptions,
            renderCell: (params) => {
                return (<Select
                    onChange={(event: SelectChangeEvent<number>) => {
                        if (props.currentPk) changePk(props.pkFSM.changeType(Number(event.target.value)))
                    }}
                    value={params.value}
                    // onFocus={(e) => {
                    //     props.setCurrentRow(Number(e.currentTarget.parentElement?.parentElement?.parentElement?.getAttribute("data-id")))
                    // }}
                >
                    <MenuItem value={0} key={0}>---</MenuItem>)
                    <MenuItem value={1} key={1}>МГР</MenuItem>)
                    <MenuItem value={2} key={2}>1 ТВП</MenuItem>)
                    <MenuItem value={3} key={3}>2 ТВП</MenuItem>)
                    <MenuItem value={4} key={4}>1,2 ТВП</MenuItem>)
                    <MenuItem value={5} key={5}>Зам. 1ТВП</MenuItem>)
                    <MenuItem value={6} key={6}>Зам. 2ТВП</MenuItem>)
                    <MenuItem value={7} key={7}>Зам.</MenuItem>)
                    <MenuItem value={8} key={8}>МДК</MenuItem>)
                    <MenuItem value={9} key={9}>ВДК</MenuItem>)
                </Select>)
            }
        },
        {field: "num", headerName: "№ фазы", ...defaultColumnOptions},
        {
            field: "duration",
            headerName: "Длительность",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentPk) changePk(props.pkFSM.changeDuration(calcDurationDiff(Number(params.props.value))))
                // changeSkLine(Number(params.id), {...props.currentSk.lines[Number(params.id)], npk: Number(params.props.value)})
                return {...params.props};
            },
        },
        {
            field: "plus",
            headerName: "+пред.",
            ...defaultColumnOptions,
            renderCell: (params =>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value}
                                onChange={() => {
                                }}
                            />
                        }
                        label=""
                    />
            )
        },
    ]

    const calcDuration = (st: St) => {
        if (st.trs) {
            return props.currentPk.tc - st.start + st.dt
        } else {
            return st.stop - st.start
        }
    }

    const rows = props.currentPk.sts.map(st => {
        return {id: st.line, ...st, duration: calcDuration(st)}
    })

    return (
        <div style={{height: "500px", width: "60%", marginInline: "auto"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                disableColumnFilter
                hideFooter
                onSelectionModelChange={(newSelectionModel) => {
                    props.setCurrentRow(newSelectionModel);
                }}
                selectionModel={props.currentRow}
            />}
        </div>
    )
}

export default PkTable