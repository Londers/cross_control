import React from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import ReloadIcon from "../../common/icons/ReloadIcon";
import TimeIcon from "../../common/icons/TimeIcon";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setDeviceType} from "../crossInfoSlice";

function MainTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()
    const crossInfo = useAppSelector(selectCrossInfo)

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        dispatch(setDeviceType(Number(event.target.value)))
    }

    return (
        <Box style={{border: ".5px solid"}}>
            <Button variant="outlined">
                <ReloadIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined">
                <TimeIcon width={width} height={height}/>
            </Button>
            <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                <InputLabel id="demo-simple-select-label">Устройство</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={crossInfo.state?.arrays.type ?? 0}
                    label="Устройство"
                    onChange={handleTypeChange}
                >
                    <MenuItem value={1} key={0}>С12</MenuItem>
                    <MenuItem value={2} key={1}>УСДК</MenuItem>
                    <MenuItem value={4} key={2}>ДКА</MenuItem>
                    <MenuItem value={8} key={3}>ДТА</MenuItem>
                    <MenuItem value={0} key={4}>Нет данных</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default MainTab