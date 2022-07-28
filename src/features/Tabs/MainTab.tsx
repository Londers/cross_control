import React, {ChangeEvent} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import ReloadIcon from "../../common/icons/ReloadIcon";
import TimeIcon from "../../common/icons/TimeIcon";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    selectCrossInfo,
    setDeviceArea,
    setDeviceId,
    setDeviceIdevice, setDeviceName, setDevicePhone,
    setDeviceSubarea,
    setDeviceType
} from "../crossInfoSlice";

function MainTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()
    const crossInfo = useAppSelector(selectCrossInfo)

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        dispatch(setDeviceType(Number(event.target.value)))
    }

    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeviceId(event.target.valueAsNumber))
    }

    const handleIdeviceChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeviceIdevice(event.target.valueAsNumber))
    }

    const handleAreaChange = (event: SelectChangeEvent<number>) => {
        dispatch(setDeviceArea(Number(event.target.value)))
    }

    const handleSubareaChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeviceSubarea(Number(event.target.value)))
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeviceName(event.target.value))
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDevicePhone(event.target.value))
    }

    return (
        <Box style={{border: ".5px solid"}}>
            <div>
                <Button variant="outlined">
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined">
                    <TimeIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div style={{marginTop: "1rem"}}>
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
                <TextField
                    label="№"
                    type="number"
                    style={{width: "60px"}}
                    value={crossInfo.state?.id ?? -1}
                    onChange={handleIdChange}
                />
                <TextField
                    label="№ модема"
                    type="number"
                    style={{width: "120px"}}
                    value={crossInfo.state?.idevice ?? -1}
                    onChange={handleIdeviceChange}
                />
                <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                    <InputLabel id="demo-simple-select-label">Район</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={crossInfo.state?.area ?? 0}
                        label="Район"
                        onChange={handleAreaChange}
                    >
                        {Object.entries(crossInfo.areaMap).map(([num, name]) =>
                            <MenuItem value={num} key={num}>{name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField
                    label="№ подрайона"
                    type="number"
                    style={{width: "107px"}}
                    value={crossInfo.state?.subarea ?? -1}
                    onChange={handleSubareaChange}
                />
            </div>
            <br />
            <div>
                <Button variant="outlined">Выберите координаты</Button>
            </div>
            <br />
            <div>
                <TextField
                    label="Место размещения"
                    fullWidth
                    style={{width: "500px"}}
                    value={crossInfo.state?.name ?? -1}
                    onChange={handleNameChange}
                />
                <TextField
                    label="№ телефона"
                    // inputProps={{pattern: "^([0-9]{1,4}\\-){3}[0-9]{1,3}$"}}
                    // type="number"
                    style={{width: "250px"}}
                    value={crossInfo.state?.phone.trim() ?? -1}
                    onChange={handlePhoneChange}
                />
            </div>
        </Box>
    )
}

export default MainTab