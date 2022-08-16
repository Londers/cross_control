import React from "react";
import {Box, Button} from "@mui/material";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import KvTable from "../Tables/KvTable";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setKv} from "../crossInfoSlice";
import {Stage} from "../../common";
import {reloadKvTab} from "../../common/Middlewares/TabReloadMiddleware";

function KvTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const stages = crossInfo.state?.arrays.SetCtrl.Stage

    const handleCopyButton = () => {
        localStorage.setItem("kv", JSON.stringify(stages))
    }
    const handlePasteButton = () => {
        const kvCopyString = localStorage.getItem("kv")
        if (kvCopyString) {
            const stageCopy: Stage[] = JSON.parse(kvCopyString)
            dispatch(setKv({kv: stageCopy}))
        }
    }
    const handleReloadButton = () => {
        dispatch(reloadKvTab())
    }

    return (
        <Box style={{border: ".5px solid"}}>
            <div style={{display: "inline-flex", marginTop: "1rem"}}>
                <Button variant="outlined" title="Копировать" onClick={handleCopyButton}>
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить" onClick={handlePasteButton}>
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить" onClick={handleReloadButton}>
                    <ReloadIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div>
                <KvTable Stages={stages}/>
            </div>
        </Box>
    )
}

export default KvTab