import React, {ChangeEvent} from "react";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import {Pk, St} from "../../common";
import {Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {PkFiniteStateMachine, replaceNums, tvpNums} from "../../common/PkFiniteStateMachine";
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
        {
            field: "line",
            headerName: "№ перекл.",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            editable: false
        },
        {
            field: "start",
            headerName: "Вр. вкл",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentPk) changePk(props.pkFSM.changeStart(Number(params.props.value)))
                return {...params.props};
            },
        },
        {
            field: "tf",
            headerName: "Тип фазы",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            flex: 1.5,
            editable: false,
            renderCell: (params) => {
                return (<Select
                    onChange={(event: SelectChangeEvent<number>) => {
                        if (props.currentPk) {
                            const newTf = Number(event.target.value)
                            if (tvpNums.some(tvp => tvp === newTf)) {
                                const razlen = props.currentPk.razlen
                                const rowForFSM = props.currentRow === 0 ? 0 : props.currentRow - 1

                                let tempFSM = new PkFiniteStateMachine(props.pkFSM.changeRazlen(false), rowForFSM)
                                tempFSM = new PkFiniteStateMachine(tempFSM.changeType(newTf), rowForFSM)

                                if (replaceNums.some(repl => repl === props.currentPk.sts[props.currentRow]?.tf)) {
                                    const duration = props.currentPk.sts[rowForFSM].stop - props.currentPk.sts[rowForFSM].start + props.currentPk.sts[rowForFSM].dt
                                    tempFSM = new PkFiniteStateMachine(tempFSM.deleteLine(false), rowForFSM - 1)
                                    changePk(tempFSM.insertLine(newTf, undefined, duration))
                                    return
                                }

                                if (newTf === 4) {
                                    tempFSM = new PkFiniteStateMachine(tempFSM.insertLine(7), rowForFSM)
                                    tempFSM = new PkFiniteStateMachine(tempFSM.insertLine(6, 3), rowForFSM)
                                    tempFSM = new PkFiniteStateMachine(tempFSM.insertLine(5, 2), rowForFSM)
                                    // changePk(tempFSM.insertLine(5, 2))
                                } else {
                                    tempFSM = new PkFiniteStateMachine(tempFSM.insertLine(7), rowForFSM)
                                    // changePk(tempFSM.insertLine(7))
                                }
                                changePk(tempFSM.changeRazlen(razlen))
                            } else if (replaceNums.some(repl => repl === props.currentPk.sts[props.currentRow]?.tf)) {
                                let tempFSM = new PkFiniteStateMachine(props.pkFSM.changeType(newTf), props.currentRow)
                                changePk(tempFSM.deleteLine(true))
                            } else {
                                changePk(props.pkFSM.changeType(newTf))
                            }
                        }
                    }}
                    value={params.value}
                    onFocus={() => {
                        if (props.currentRow !== Number(params.id)) props.setCurrentRow([Number(params.id)])
                    }}
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
        {
            field: "num",
            headerName: "№ фазы",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentPk) changePk(props.pkFSM.changePhaseNum(Number(params.props.value)))
                return {...params.props};
            },
        },
        {
            field: "duration",
            headerName: "Длительность",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (props.currentPk) {
                    if (props.currentPk.tpu === 0) {
                        changePk(props.pkFSM.changeDuration(calcDurationDiff(Number(params.props.value))))
                    } else {
                        changePk(props.pkFSM.changeTc(props.currentPk.tc + calcDurationDiff(Number(params.props.value))))
                    }
                }
                return {...params.props};
            },
            valueFormatter: (params) => {
                // todo: uncomment on pk complete
                // if ((Number(params.value) < minPhaseDuration) && (props.currentPk.sts[Number(params.id) - 1].start !== props.currentPk.sts[Number(params.id) - 1].stop)) return minPhaseDuration
                return Number(params.value)
            }
        },
        {
            field: "plus",
            headerName: "+пред.",
            align: "center",
            headerAlign: "center",
            ...defaultColumnOptions,
            editable: false,
            renderCell: (params =>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (props.currentPk) changePk(props.pkFSM.changePlus(e.target.checked))
                                }}
                                onFocus={() => {
                                    if (props.currentRow !== Number(params.id)) props.setCurrentRow([Number(params.id)])
                                }}
                            />
                        }
                        label=""
                    />
            ),

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
                onCellEditStart={(params) => {
                    if (props.currentRow !== Number(params.id)) props.setCurrentRow([Number(params.id)])
                }}
            />}
        </div>
    )
}

export default PkTable