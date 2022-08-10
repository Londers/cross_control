import React from "react";
import {Box, Button} from "@mui/material";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import KvTable from "../Tables/KvTable";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossInfoSlice";

function KvTab() {
    const width = 40
    const height = 40

    const crossInfo = useAppSelector(selectCrossInfo)
    const Stages = crossInfo.state?.arrays.SetCtrl.Stage

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
            </div>
            <br />
            <div>
                <KvTable Stages={Stages} />
            </div>
        </Box>
    )
}

export default KvTab