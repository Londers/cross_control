import React, {ChangeEvent} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import ReloadIcon from "../../common/icons/ReloadIcon";
import TimeIcon from "../../common/icons/TimeIcon";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    setDeviceSummertime,
    setJournal,
    setNogprs,
    selectCrossInfo,
    setDeviceArea,
    setDeviceId,
    setDeviceIdevice,
    setDeviceName,
    setDevicePbsl,
    setDevicePbsr,
    setDevicePhone,
    setDevicePspd,
    setDeviceSubarea,
    setDeviceType,
    setDeviceTz,
} from "../crossInfoSlice";
import SetupDKTable from "../Tables/SetupDKTable";
import {reloadMainTab} from "../../common/Middlewares/TabReloadMiddleware";

// import {selectStateSave} from "../stateSaveSlice";

function MainTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()
    const crossInfo = useAppSelector(selectCrossInfo)
    // const savedState = useAppSelector(selectStateSave)

    const handleReloadTabClick = () => {
        dispatch(reloadMainTab())
    }

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

    const handleTzChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeviceTz(event.target.valueAsNumber))
    }

    const handleSummertimeChange = () => {
        dispatch(setDeviceSummertime(!crossInfo.state?.arrays.timedev.summer))
    }

    const handlePspdChange = (event: SelectChangeEvent<string>) => {
        dispatch(setDevicePspd(event.target.value))
    }

    const handlePbslChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDevicePbsl(event.target.valueAsNumber))
    }

    const handlePbsrChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDevicePbsr(event.target.valueAsNumber))
    }

    const handleJournalChange = () => {
        dispatch(setJournal(!crossInfo.state?.arrays.timedev.journal))
    }

    const handleNogprsChange = () => {
        dispatch(setNogprs(!crossInfo.state?.arrays.timedev.nogprs))
    }

    return (
        <Box style={{border: ".5px solid"}}>
            <div>
                <Button variant="outlined" title="Отменить изменения" onClick={handleReloadTabClick}>
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
            <br/>
            <div>
                <Button variant="outlined" onClick={() => alert("in work")}>Выберите координаты</Button>
            </div>
            <br/>
            <div>
                <TextField
                    label="Место размещения"
                    fullWidth
                    style={{width: "500px"}}
                    value={crossInfo.state?.name ?? -1}
                    onChange={handleNameChange}
                />
            </div>
            <br/>
            <div>
                <TextField
                    label="№ телефона"
                    // inputProps={{pattern: "^([0-9]{1,4}\\-){3}[0-9]{1,3}$"}}
                    // type="number"
                    style={{width: "250px"}}
                    value={crossInfo.state?.phone.trim() ?? -1}
                    onChange={handlePhoneChange}
                />
            </div>
            <br/>
            <div>
                IP: {crossInfo.deviceIP}
            </div>
            <br/>
            <div>
                <TextField
                    label="Часовой пояс"
                    type="number"
                    style={{width: "250px"}}
                    value={crossInfo.state?.arrays.timedev.tz ?? -1}
                    onChange={handleTzChange}
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={crossInfo.state?.arrays.timedev.summer === true}
                        onChange={handleSummertimeChange}/>}
                    label="Сезонное время"
                    labelPlacement="start"
                />
                <TextField
                    label="Ожидание ответа"
                    type="number"
                    style={{width: "250px"}}
                />
            </div>
            <br/>
            <div>
                Версия ПО
                <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                    <InputLabel id="demo-simple-select-label">ПСПД</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={((parseFloat(crossInfo.state?.Model.vpcpdl + "." + crossInfo.state?.Model.vpcpdr) <= 12.3) ? "12.3" : "12.4") ?? "12.3"}
                        label="ПСПД"
                        onChange={handlePspdChange}
                    >
                        <MenuItem value="12.3" key={0}>12.3 и меньше</MenuItem>
                        <MenuItem value="12.4" key={1}>12.4 и больше</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="ПБС"
                    type="number"
                    style={{width: "75px"}}
                    value={crossInfo.state?.Model.vpbsl ?? -1}
                    onChange={handlePbslChange}
                />
                <span>.</span>
                <TextField
                    type="number"
                    style={{width: "75px"}}
                    value={crossInfo.state?.Model.vpbsr ?? -1}
                    onChange={handlePbsrChange}
                />
            </div>
            <br/>
            <div>
                <FormControlLabel
                    control={<Checkbox/>}
                    label="Запрет Неподчинение"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<Checkbox/>}
                    label="Запр. част. перег. ламг"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<Checkbox/>}
                    label="старый 3-цв. инд."
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<Checkbox checked={crossInfo.state?.arrays.timedev.journal === true}
                                       onChange={handleJournalChange}/>}
                    label="Передача журнала"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<Checkbox checked={crossInfo.state?.arrays.timedev.nogprs === true}
                                       onChange={handleNogprsChange}/>}
                    label="Журнал. Запрет GPRS"
                    labelPlacement="start"
                />
            </div>
            <br/>
            <div>
                <SetupDKTable/>
                {/*{*/}
                {/*    crossInfo.state?.arrays.SetupDK && <SetupDKTable setup={crossInfo.state?.arrays.SetupDK}/>*/}
                {/*}*/}
            </div>
        </Box>
    )
}

export default MainTab