import React from "react";
import {Box, Button, Grid} from "@mui/material";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setGk} from "../crossInfoSlice";
import GkTable from "../Tables/GkTable";
import {Gk} from "../../common";
import {reloadGkTab} from "../../common/Middlewares/TabReloadMiddleware";

function GkTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentGk = crossInfo.state?.arrays.MonthSets.monthset

    const handleCopyButton = () => {
        localStorage.setItem("gk", JSON.stringify(currentGk))
    }
    const handlePasteButton = () => {
        const gkCopyString = localStorage.getItem("gk")
        if (gkCopyString) {
            const gkCopy: Gk[] = JSON.parse(gkCopyString)
            dispatch(setGk({gk: gkCopy}))
        }
    }
    const handleReloadButton = () => {
        dispatch(reloadGkTab())
    }
    const handleCreateButton = () => {
        dispatch(setGk({
            gk: Array.from({length: 12}, (v, i) => {
                return {num: i + 1, days: Array.from({length: 31}, () => 1)}
            })
        }))
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Grid item xs style={{width: "30rem", display: "flex", justifyContent: "space-between"}}>
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
            </Grid>

            <Grid item xs style={{width: "100%", marginTop: "1rem"}}>
                <GkTable currentGk={currentGk}/>
            </Grid>
        </Grid>
    )
}

export default GkTab