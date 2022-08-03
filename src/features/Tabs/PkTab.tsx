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
import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossInfoSlice";
import CopyIcon from "../../common/icons/CopyIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";

function PkTab(props: {pk: number, setPk: Function}) {
    const width = 40
    const height = 40

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentPk = crossInfo.state?.arrays.SetDK.dk[props.pk - 1]

    const handlePkSelectChange = (event: SelectChangeEvent<number>) => props.setPk(Number(event.target.value))

    const handlePkDescChange = () => {}
    const handlePkTcChange = () => {}
    const handlePkTwotChange = () => {}
    const handlePkShiftChange = () => {}
    const handlePkTypePuChange = () => {}
    const handlePkRazlenChange = () => {}
    const handlePkTransferChange = () => {}

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
            <br />
            <div>
                <TextField
                    label="Описание"
                    type="text"
                    value={currentPk?.desc ?? ""}
                    onChange={handlePkDescChange}
                />
            </div>
            <br />
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
                        value={crossInfo.state?.area ?? 0}
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
        </Box>
    )
}

export default PkTab