import React from "react";
import {Box, Button} from "@mui/material";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossInfoSlice";
import GkTable from "../Tables/GkTable";

function GkTab() {
    const width = 40
    const height = 40

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentGk = crossInfo.state?.arrays.MonthSets.monthset

    return (
        <Box style={{border: ".5px solid"}}>
            <div style={{display: "inline-flex", marginTop: "1rem"}}>
                <Button variant="outlined" title="Копировать">
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить">
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить">
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Создать">
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div>
                <GkTable currentGk={currentGk} />
            </div>
        </Box>
    )
}

export default GkTab