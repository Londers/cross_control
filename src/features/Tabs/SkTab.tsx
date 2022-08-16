import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addSkLine, deleteSkLine, selectCrossInfo, updateSk} from "../crossInfoSlice";
import CopyIcon from "../../common/icons/CopyIcon";
import PlusIcon from "../../common/icons/PlusIcon";
import MinusIcon from "../../common/icons/MinusIcon";
import InsertIcon from "../../common/icons/InsertIcon";
import ReloadIcon from "../../common/icons/ReloadIcon";
import CreateIcon from "../../common/icons/CreateIcon";
import SkTable from "../Tables/SkTable";
import {GridSelectionModel} from "@mui/x-data-grid";
import {Sk} from "../../common";
import {reloadSkTab} from "../../common/Middlewares/TabReloadMiddleware";

function SkTab(props: { sk: number, setSk: Function }) {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentSk = crossInfo.state?.arrays.DaySets.daysets[props.sk - 1]

    const [selectedLine, setSelectedLine] = useState<GridSelectionModel>([0])

    const handleSkSelectChange = (event: SelectChangeEvent<number>) => props.setSk(Number(event.target.value))
    const handleAddLineButton = () => {
        dispatch(addSkLine({skNum: props.sk - 1, lineNum: Number(selectedLine[0])}))
    }
    const handleDeleteLineButton = () => {
        dispatch(deleteSkLine({skNum: props.sk - 1, lineNum: Number(selectedLine[0])}))
    }
    const handleCopyButton = () => {
        localStorage.setItem("sk", JSON.stringify(currentSk))
    }
    const handlePasteButton = () => {
        const skCopyString = localStorage.getItem("sk")
        if (skCopyString) {
            const skCopy: Sk = JSON.parse(skCopyString)
            dispatch(updateSk({skNum: props.sk - 1, sk: skCopy}))
        }
    }
    const handleReloadButton = () => {
        dispatch(reloadSkTab())
    }
    const handleCreateButton = () => {
        const newSk: Sk = {
            num: props.sk,
            count: 1,
            lines: Array.from({length: 12}, () => {
                return {npk: 0, hour: 0, min: 0}
            })
        }
        newSk.lines[0].npk = 1
        dispatch(updateSk({skNum: props.sk - 1, sk: newSk}))
    }

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
                            <MenuItem value={sk.num} key={sk.num}>{sk.num}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button variant="outlined" title="Добавить строку" onClick={handleAddLineButton}>
                    <PlusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Удалить строку" onClick={handleDeleteLineButton}>
                    <MinusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать" onClick={handleCopyButton}>
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить" onClick={handlePasteButton}>
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить" onClick={handleReloadButton}>
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Создать" onClick={handleCreateButton}>
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
            <br/>
            <div>
                <SkTable skNum={props.sk} currentSk={currentSk} line={selectedLine} setLine={setSelectedLine}/>
                {/*<SkTable skNum={props.sk} currentSk={currentSk} currentRow={selectedRow} setCurrentRow={setSelectedRow}/>*/}
            </div>
        </Box>
    )
}

export default SkTab