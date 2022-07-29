import React from "react";
import {SetupDK} from "../../common";
import {useAppDispatch} from "../../app/hooks";
import {setSetupDk} from "../crossInfoSlice";
import {DataGrid, GridColumns, GridRowsProp} from "@mui/x-data-grid";

const columns: GridColumns = [
    {field: "dkn", headerName: "№ ДК", type: 'number', editable: true},
    {field: "dktype", headerName: "Тип ДК", type: 'number', editable: true},
    {field: "tminf", headerName: "Т мин см фаз", type: 'number', editable: true},
    {field: "tmaxf", headerName: "Т мах см фаз", type: 'number', editable: true},
    {field: "tprom", headerName: "Т мах Т пр", type: 'number', editable: true},
    {field: "tminmax", headerName: "Т мах Т мин", type: 'number', editable: true},
]

function SetupDKTable(props: {setup: SetupDK}) {

    const rows: GridRowsProp = [{
        id: 1,
        ...props.setup
    }]

    const dispatch = useAppDispatch()

    const handleSetupDKChange = () => {
        dispatch(setSetupDk(props.setup))
    }

    return (
        <div style={{ height: "110px", width: '38rem', marginInline: "auto" }}>
            <DataGrid
                // onCellEditStop={(e) => console.log(e)}
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
                hideFooter
            />
        </div>
    )
}

export default SetupDKTable;