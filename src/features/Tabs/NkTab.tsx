import React from "react";
import {Box, Button} from "@mui/material";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import NkTable from "../Tables/NkTable";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setNk,} from "../crossInfoSlice";
import {Nk} from "../../common";
import {reloadNkTab} from "../../common/Middlewares/TabReloadMiddleware";

function NkTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentNk = crossInfo.state?.arrays.WeekSets.wsets

    const handleCopyButton = () => {
        localStorage.setItem("nk", JSON.stringify(currentNk))
    }
    const handlePasteButton = () => {
        const nkCopyString = localStorage.getItem("nk")
        if (nkCopyString) {
            const nkCopy: Nk[] = JSON.parse(nkCopyString)
            dispatch(setNk({nk: nkCopy}))
        }
    }
    const handleReloadButton = () => {
        dispatch(reloadNkTab())
    }
    const handleCreateButton = () => {
        const newNk = Array.from({length: 12}, (v, i) => {
            return {num: i + 1, days: Array.from({length: 7}, () => 0)}
        })
        newNk[0].days = Array.from({length: 7}, () => 1)
        dispatch(setNk({nk: newNk}))
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
                <Button variant="outlined" title="Создать" onClick={handleCreateButton}>
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div>
                <NkTable currentNk={currentNk}/>
            </div>
        </Box>
    )
}

export default NkTab