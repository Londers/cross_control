import React from "react";
import {CustomTimestamp, Stage} from "../../common";
import {DataGrid, GridColumns, GridPreProcessEditCellProps, ruRU} from "@mui/x-data-grid";
import CustomTimePicker from "../Custom/CustomTimePicker";
import {useAppDispatch} from "../../app/hooks";
import {updateKvMGR, updateKvTime, updateKvTVP} from "../crossInfoSlice";

const defaultColumnOptions = {
    flex: 1,
    editable: false,
}

function KvTable(props: { Stages: Stage[] | undefined }) {
    const dispatch = useAppDispatch()
    const changeKvTime = (id: number, value: CustomTimestamp) => {
        dispatch(updateKvTime({id, value}))
    }
    const changeKvTVP = (id: number, value: number) => {
        dispatch(updateKvTVP({id, value}))
    }
    const changeKvMGR = (id: number, value: number) => {
        dispatch(updateKvMGR({id, value}))
    }

    const columns: GridColumns = [
        {field: "line", headerName: "№ стр.", flex: 1, headerAlign: "center", align: "center",},
        {
            field: "kvStart",
            headerName: "Т начала",
            type: "string",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker date={params.value} setDate={null} disabled={true}/>,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "kvEnd",
            headerName: "Т конца интервала",
            type: "string",
            ...defaultColumnOptions,
            renderCell: (params) =>
                <CustomTimePicker date={params.value}
                                  setDate={(e: Date) => {
                                      changeKvTime(Number(params.id), {hour: e.getHours(), min: e.getMinutes()})
                                  }}
                                  disabled={false}/>,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "lenTVP",
            headerName: "T конт ТВП",
            type: "number",
            ...defaultColumnOptions,
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeKvTVP(Number(params.id), Number(params.props.value))
                return {...params.props};
            },
            headerAlign: "center",
            align: "center",
        },
        {
            field: "lenMGR",
            headerName: "T конт МГР",
            type: "number",
            ...defaultColumnOptions,
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                changeKvMGR(Number(params.id), Number(params.props.value))
                return {...params.props};
            },
            headerAlign: "center",
            align: "center",
        },
    ]

    const rows = props.Stages?.map((stage, index) => {
        return {
            id: index,
            line: index + 1,
            kvStart: new Date(0, 0, 0, stage.start.hour, stage.start.min),
            kvEnd: new Date(0, 0, 0, stage.end.hour, stage.end.min),
            lenTVP: stage.lenTVP,
            lenMGR: stage.lenMGR,
        }
    })

    return (
        <div style={{height: "474px", width: "100%", marginInline: "auto"}}>
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

export default KvTable