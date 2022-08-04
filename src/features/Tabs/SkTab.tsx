import React from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossInfoSlice";
import CopyIcon from "../../common/icons/CopyIcon";
import PlusIcon from "../../common/icons/PlusIcon";
import MinusIcon from "../../common/icons/MinusIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";

function SkTab(props: { sk: number, setSk: Function }) {
    const width = 40
    const height = 40

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentSk = crossInfo.state?.arrays.DaySets.daysets[0]

    const handleSkSelectChange = (event: SelectChangeEvent<number>) => props.setSk(Number(event.target.value))

    return (
        <Box style={{border: ".5px solid"}}>
            <div style={{display: "inline-flex", marginTop: "1rem"}}>
                <FormControl sx={{width: "fit-content", minWidth: "100px"}}>
                    <InputLabel id="demo-simple-select-label">№ сут. карты</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={props.sk ?? 0}
                        label="№ сут. карты"
                        onChange={handleSkSelectChange}
                    >
                        {currentSk && crossInfo.state?.arrays.DaySets.daysets.map(sk =>
                            <MenuItem value={sk.num} key={sk.num}>СК {sk.num}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button variant="outlined" title="Копировать ПК">
                    <PlusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать ПК">
                    <MinusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать ПК">
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать ПК">
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать ПК">
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать ПК">
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
        </Box>
    )
}

export default SkTab