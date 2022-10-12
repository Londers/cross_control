import React, {ChangeEvent} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
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
import CoordinatesDialog from "../Other/CoordinatesDialog";

function MainTab() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()
    const crossInfo = useAppSelector(selectCrossInfo)

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
        // const [, vpcpdr] = event.target.value.split(".").map(v => Number(v))
        // if (crossInfo.state) dispatch(setState(sizeVerification({...crossInfo.state, Model: {...crossInfo.state.Model, vpcpdr}})))
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
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Grid item xs>
                <Button variant="outlined" title="Отменить изменения" onClick={handleReloadTabClick}
                        style={{marginRight: "1rem"}}>
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined">
                    <TimeIcon width={width} height={height}/>
                </Button>
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "42rem", display: "flex", justifyContent: "space-between"}}>
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
                    style={{width: "100px"}}
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
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                <CoordinatesDialog/>
                {/*<Button variant="outlined" onClick={handleCoordinatesClick}>Выберите координаты</Button>*/}
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                <TextField
                    label="Место размещения"
                    fullWidth
                    style={{width: "700px"}}
                    value={crossInfo.state?.name ?? -1}
                    onChange={handleNameChange}
                />
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                <TextField
                    label="№ телефона"
                    // inputProps={{pattern: "^([0-9]{1,4}\\-){3}[0-9]{1,3}$"}}
                    // type="number"
                    style={{width: "150px"}}
                    value={crossInfo.state?.phone.trim() ?? -1}
                    onChange={handlePhoneChange}
                />
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                IP: {crossInfo.deviceIP}
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "50rem", display: "flex", justifyContent: "space-between"}}>
                <TextField
                    label="Часовой пояс"
                    type="number"
                    style={{width: "110px"}}
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
                    style={{width: "200px"}}
                />
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "30rem", display: "flex", justifyContent: "space-between"}}>
                <span style={{display: "flex", alignItems: "center",}}>Версия ПО</span>
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
                <div style={{display: "inline-flex"}}>
                    <TextField
                        label="ПБС"
                        type="number"
                        style={{width: "75px"}}
                        value={crossInfo.state?.Model.vpbsl ?? -1}
                        onChange={handlePbslChange}
                    />
                    <span style={{display: "flex", alignItems: "center", fontSize: "22px"}}>.</span>
                    <TextField
                        type="number"
                        style={{width: "75px"}}
                        value={crossInfo.state?.Model.vpbsr ?? -1}
                        onChange={handlePbsrChange}
                    />
                </div>
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "70rem", display: "flex", justifyContent: "space-between"}}>
                <FormControlLabel
                    control={<Checkbox/>}
                    label="Запрет Неподчинение"
                    labelPlacement="start"
                    style={{marginLeft: 0}}
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
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                Параметры ДК
            </Grid>
            <Grid item xs style={{marginTop: "1rem"}}>
                <SetupDKTable/>
                {/*{*/}
                {/*    crossInfo.state?.arrays.SetupDK && <SetupDKTable setup={crossInfo.state?.arrays.SetupDK}/>*/}
                {/*}*/}
            </Grid>
            {/*{showCoordsDialog && <CoordinatesDialog/>}*/}
        </Grid>
    )
}

export default MainTab