import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, selectMgr, setPk} from "../crossInfoSlice";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import PkTable from "../Tables/PkTable";
import {Pk} from "../../common";
import {PkFiniteStateMachine} from "../../common/PkFiniteStateMachine";
import {reloadPk} from "../../common/Middlewares/TabReloadMiddleware";
import MgrTable from "../Tables/MgrTable";

function PkTab(props: { pk: number, setPk: Function }) {
    const width = 40
    const height = 40
    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentPk = crossInfo.state?.arrays.SetDK.dk[props.pk - 1]
    const mgrs = useAppSelector(selectMgr)

    const [tc, setTc] = useState<number>(currentPk?.tc ?? 0)
    const [shift, setShift] = useState<number>(currentPk?.shift ?? 0)
    const [red, setRed] = useState(0)

    useEffect(() => {
        setTc(currentPk?.tc ?? 0)
        setShift(currentPk?.shift ?? 0)
    }, [currentPk])

    const [selectedRow, setSelectedRow] = useState<number[]>([1])
    const pkFSM = new PkFiniteStateMachine(currentPk, selectedRow[0] === 0 ? 0 : selectedRow[0] - 1)
    // const [pkFSM, setPkFSM] = useState<PkFiniteStateMachine>(new PkFiniteStateMachine(currentPk))

    const [selectedInsert, setSelectedInsert] = useState<number>(-1)

    const handlePkSelectChange = (event: SelectChangeEvent<number>) => props.setPk(Number(event.target.value))

    const handlePkDescChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) changePk(pkFSM.changeDesc(event.currentTarget.value))
    }
    const handlePkTcChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) setTc(Number(event.target?.value))
        // if (currentPk) changePk(pkFSM.changeTc(Number(event.target?.value)))
    }
    const handlePkTcEnter = () => {
        // if (currentPk) setTc(Number(event.target?.value))
        if (currentPk) changePk(pkFSM.changeTc(tc))
    }
    const handlePkTwotChange = () => {
        if (currentPk) changePk(pkFSM.changeTwot(!currentPk.twot))
    }
    const handlePkShiftChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) setShift(Number(event.currentTarget.value))
        // if (currentPk) changePk(pkFSM.changeShift(Number(event.currentTarget.value)))
    }
    const handlePkShiftEnter = () => {
        if (currentPk) changePk(pkFSM.changeShift(shift))
    }
    const handlePkTypePuChange = (event: SelectChangeEvent<number>) => {
        if (currentPk) changePk(pkFSM.changeTpu(Number(event.target.value)))
    }
    const handlePkRazlenChange = () => {
        if (currentPk) changePk(pkFSM.changeRazlen(!currentPk.razlen))
    }

    const handlePkTransferChange = () => {
    }

    const handlePkSwitchInsert = (event: SelectChangeEvent<number>) => {
        if (currentPk) {
            const rowForFSM = selectedRow[0] === 0 ? 0 : selectedRow[0] - 1
            const razlen = currentPk.razlen
            let tempFSM = new PkFiniteStateMachine(pkFSM.changeRazlen(false), rowForFSM)
            tempFSM = new PkFiniteStateMachine(tempFSM.insertLine(Number(event.target.value)), rowForFSM)
            changePk(tempFSM.changeRazlen(razlen))
        }
        setSelectedInsert(-1)
    }
    const handlePkSwitchDelete = () => {
        if (currentPk) {
            if (selectedRow[0] !== 1) setSelectedRow([selectedRow[0] - 1])
            changePk(pkFSM.deleteLine(true))
        }
    }

    const handlePkEditionTypeChange = () => {
        setRed(red === 1 ? 0 : 1)
    }

    const changePk = (pk: Pk) => {
        if (pk) dispatch(setPk({num: props.pk - 1, pk}))
    }

    const handlePkCopy = () => {
        localStorage.setItem("pkCopy", JSON.stringify(currentPk))
    }
    const handlePkInsert = () => {
        let pkCopy: Pk = JSON.parse(localStorage.getItem("pkCopy") ?? "{}")
        pkCopy.desc = currentPk?.desc ?? "Ошибка копирования"
        pkCopy.pk = currentPk?.pk ?? -1
        changePk(pkCopy)
    }

    const handlePkReload = () => {
        dispatch(reloadPk(props.pk - 1))
    }
    const handlePkCreate = () => {
        if (currentPk) changePk(pkFSM.createNewPk())
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Grid item xs style={{width: "30rem", display: "flex", justifyContent: "space-between"}}>
                <Select
                    value={props.pk}
                    onChange={handlePkSelectChange}
                >
                    {crossInfo.state?.arrays.SetDK.dk.map(pk =>
                        <MenuItem value={pk.pk} key={pk.pk}>ПК {pk.pk}</MenuItem>)}
                </Select>

                <Button variant="outlined" title="Копировать ПК" onClick={handlePkCopy}>
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить ПК" onClick={handlePkInsert}>
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить ПК" onClick={handlePkReload}>
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Создать ПК" onClick={handlePkCreate}>
                    <CreateIcon width={width} height={height}/>
                </Button>
            </Grid>

            <Grid item xs style={{marginTop: "1rem"}}>
                <TextField
                    label="Описание"
                    type="text"
                    value={currentPk?.desc ?? ""}
                    onChange={handlePkDescChange}
                />
            </Grid>

            <Grid item xs style={{marginTop: "1rem", width: "50rem", display: "flex", justifyContent: "space-between"}}>
                <TextField
                    label="Время цикла"
                    type="text"
                    style={{width: "150px"}}
                    value={tc ?? ""}
                    disabled={currentPk?.tpu === 1}
                    onChange={handlePkTcChange}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") handlePkTcEnter()
                    }}
                    onBlur={handlePkTcEnter}
                />
                <FormControl sx={{width: "fit-content", minWidth: "130px"}}>
                    <InputLabel id="demo-simple-select-label">Специальный ПК</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={(currentPk?.tc ?? 0 > 3) ? -1 : currentPk?.tc ?? -1}
                        label="Специальный ПК"
                        onChange={(event) => {
                            const value = Number(event.target?.value)
                            if (currentPk) {
                                if (value !== -1) {
                                    setTc(value)
                                    changePk(pkFSM.changeTc(value))
                                } else {
                                    setTc(60)
                                    let tempFSM = new PkFiniteStateMachine(pkFSM.changeTc(60), selectedRow[0])
                                    changePk(tempFSM.createNewPk(60))
                                }
                            }
                        }
                        }
                    >
                        <MenuItem value={-1} key={-1}>Отключён</MenuItem>)
                        <MenuItem value={0} key={0}>ЛР</MenuItem>)
                        <MenuItem value={1} key={1}>ЖМ</MenuItem>)
                        <MenuItem value={2} key={2}>ОС</MenuItem>)
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox
                        checked={currentPk?.twot === true}
                        onChange={handlePkTwotChange}/>}
                    label="2 T цикла"
                    labelPlacement="end"
                />
                <TextField
                    label="Сдвиг"
                    type="text"
                    style={{width: "150px"}}
                    value={shift ?? ""}
                    disabled={currentPk?.tpu === 1}
                    onChange={handlePkShiftChange}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") handlePkShiftEnter()
                    }}
                    onBlur={handlePkShiftEnter}
                />
                <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                    <InputLabel id="demo-simple-select-label">Тип ПУ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={currentPk?.tpu ?? 0}
                        label="Тип ПУ"
                        onChange={handlePkTypePuChange}
                    >
                        <MenuItem value={0} key={0}>ПК</MenuItem>)
                        <MenuItem value={1} key={1}>ЛПУ</MenuItem>)
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox
                        checked={currentPk?.razlen === true}
                        onChange={handlePkRazlenChange}/>}
                    label="Разн длит"
                    labelPlacement="end"
                />
                <FormControlLabel
                    control={<Checkbox
                        checked={false}
                        onChange={handlePkTransferChange}/>}
                    label="перенос"
                    labelPlacement="end"
                />
            </Grid>

            <Grid item xs style={{marginTop: "1rem", width: "50rem", display: "flex", justifyContent: "space-between"}}>
                <Select onChange={handlePkSwitchInsert} value={selectedInsert}>
                    <MenuItem value={-1} key={0}>Вставить перекл.</MenuItem>)
                    <MenuItem value={0} key={1}> </MenuItem>)
                    <MenuItem value={1} key={2}>МГР</MenuItem>)
                    <MenuItem value={2} key={3}>1 ТВП</MenuItem>)
                    <MenuItem value={3} key={4}>2 ТВП</MenuItem>)
                    <MenuItem value={4} key={5}>1,2 ТВП</MenuItem>)
                    <MenuItem value={5} key={6}>Зам. 1ТВП</MenuItem>)
                    <MenuItem value={6} key={7}>Зам. 2ТВП</MenuItem>)
                    <MenuItem value={7} key={8}>Зам.</MenuItem>)
                    <MenuItem value={8} key={9}>МДК</MenuItem>)
                    <MenuItem value={9} key={10}>ВДК</MenuItem>)
                </Select>
                <Button variant="outlined" onClick={handlePkSwitchDelete}>
                    Удалить перекл.
                </Button>
                <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                    <InputLabel id="demo-simple-select-label">Редакция</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // value={crossInfo.state?.area ?? 0}
                        defaultValue={red}
                        label="Редакция"
                        onChange={handlePkEditionTypeChange}
                    >
                        <MenuItem value={0} key={0}>Длительностей</MenuItem>)
                        <MenuItem value={1} key={1}>Вр. влкючения</MenuItem>)
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs style={{width: "100%", marginTop: "1rem", display: "inline-flex"}}
                  hidden={(currentPk?.tc ?? -1) < 3}>
                {currentPk && <PkTable currentPk={currentPk} pkNum={props.pk} currentRow={selectedRow[0]}
                                       setCurrentRow={setSelectedRow}
                                       pkFSM={pkFSM} redaction={red === 0}/>}
                <MgrTable mgrs={mgrs}/>
            </Grid>
        </Grid>
    )
}

export default PkTab