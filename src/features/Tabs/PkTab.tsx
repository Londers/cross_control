import {
    Box,
    Button,
    Checkbox, FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setPk} from "../crossInfoSlice";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import PkTable from "../Tables/PkTable";
import {Pk} from "../../common";

function PkTab(props: { pk: number, setPk: Function }) {
    const width = 40
    const height = 40
    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentPk = crossInfo.state?.arrays.SetDK.dk[props.pk - 1]

    const [selectedRow, setSelectedRow] = useState<number>(1)

    const handlePkSelectChange = (event: SelectChangeEvent<number>) => props.setPk(Number(event.target.value))

    const handlePkDescChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) changePk({...currentPk, desc: event.currentTarget.value})
    }
    const handlePkTcChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) changePk({...currentPk, tc: Number(event.currentTarget.value)})
    }
    const handlePkTwotChange = () => {
        if (currentPk) changePk({...currentPk, twot: !currentPk.twot})
    }
    const handlePkShiftChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentPk) changePk({...currentPk, shift: Number(event.currentTarget.value)})
    }
    const handlePkTypePuChange = (event: SelectChangeEvent<number>) => {
        if (currentPk) changePk({...currentPk, tpu: Number(event.target.value)})
    }
    const handlePkRazlenChange = () => {
        if (currentPk) changePk({...currentPk, razlen: !currentPk.razlen})
    }
    const handlePkTransferChange = () => {
    }

    const handlePkSwitchInsert = () => {
    }
    const handlePkSwitchDelete = () => {
    }
    const handlePkEditionTypeChange = () => {
    }

    const changePk = (pk: Pk) => {
        if (pk) dispatch(setPk({num: props.pk - 1, pk}))
    }

    return (
        <Box style={{border: ".5px solid"}}>
            <div style={{display: "inline-flex", marginTop: "1rem"}}>
                <Select
                    value={props.pk}
                    onChange={handlePkSelectChange}
                >
                    {crossInfo.state?.arrays.SetDK.dk.map(pk =>
                        <MenuItem value={pk.pk} key={pk.pk}>ПК {pk.pk}</MenuItem>)}
                </Select>
                <Button variant="outlined" title="Копировать ПК">
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить ПК">
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить ПК">
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Создать ПК">
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div style={{marginTop: "1rem"}}>
                <TextField
                    label="Описание"
                    type="text"
                    value={currentPk?.desc ?? ""}
                    onChange={handlePkDescChange}
                />
            </div>
            <br/>
            <div>
                <TextField
                    label="Время цикла"
                    type="text"
                    style={{width: "150px"}}
                    value={currentPk?.tc ?? ""}
                    onChange={handlePkTcChange}
                />
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
                    value={currentPk?.shift ?? ""}
                    onChange={handlePkShiftChange}
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
            </div>
            <br/>
            <div>
                <Select onChange={handlePkSwitchInsert} defaultValue={-1}>
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
                        defaultValue={0}
                        label="Редакция"
                        onChange={handlePkEditionTypeChange}
                    >
                        <MenuItem value={0} key={0}>Длительностей</MenuItem>)
                        <MenuItem value={1} key={1}>Вр. влкючения</MenuItem>)
                    </Select>
                </FormControl>
            </div>
            <br/>
            <div>
                <PkTable currentPk={currentPk} currentRow={selectedRow} setCurrentRow={setSelectedRow}/>
            </div>
        </Box>
    )
}

export default PkTab