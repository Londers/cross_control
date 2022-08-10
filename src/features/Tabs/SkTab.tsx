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
import SkTable from "../Tables/SkTable";

function SkTab(props: { sk: number, setSk: Function }) {
    const width = 40
    const height = 40

    const crossInfo = useAppSelector(selectCrossInfo)
    const currentSk = crossInfo.state?.arrays.DaySets.daysets[props.sk - 1]

    // const [selectedRow, setSelectedRow] = useState<number>(1)

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
                            <MenuItem value={sk.num} key={sk.num}>{sk.num}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button variant="outlined" title="Добавить строку">
                    <PlusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Удалить строку">
                    <MinusIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Копировать">
                    <CopyIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Вставить">
                    <InsertIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Загрузить">
                    <ReloadIcon width={width} height={height}/>
                </Button>
                <Button variant="outlined" title="Создать">
                    <CreateIcon width={width} height={height}/>
                </Button>
            </div>
            <br />
            <div>
                <SkTable skNum={props.sk} currentSk={currentSk} />
                {/*<SkTable skNum={props.sk} currentSk={currentSk} currentRow={selectedRow} setCurrentRow={setSelectedRow}/>*/}
            </div>
        </Box>
    )
}

export default SkTab