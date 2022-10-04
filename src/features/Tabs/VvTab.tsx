import React, {ChangeEvent} from "react";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setIte, setPeriod} from "../crossInfoSlice";
import VvMainTable from "../Tables/VvMainTable";
import VvAdditionalTable from "../Tables/VvAdditionalTable";

function VvTab() {
    const dispatch = useAppDispatch()

    const crossInfo = useAppSelector(selectCrossInfo)
    const SetTimeUse = crossInfo.state?.arrays.SetTimeUse

    const handleIteChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (crossInfo.state) dispatch(setIte(Number(event.currentTarget.value)))
    }
    const handlePeriodChange = (event: SelectChangeEvent<number>) => {
        if (crossInfo.state) dispatch(setPeriod(Number(event.target.value)))
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Grid item xs style={{width: "50rem"}}>
                Использование внешних входов
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "50rem"}}>
                <VvMainTable SetTimeUse={SetTimeUse} />
            </Grid>

            <Grid item xs style={{marginTop: "1rem", width: "50rem", display: "flex", justifyContent: "space-between"}}>
                <TextField
                    label="Интервал между ТЕ"
                    type="number"
                    style={{width: "150px"}}
                    value={crossInfo.state?.arrays.SetTimeUse.ite ?? -1}
                    onChange={handleIteChange}
                />
                <FormControl sx={{width: "fit-content", minWidth: "90px"}}>
                    <InputLabel id="demo-simple-select-label">Т уср ИН</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={crossInfo.state?.arrays.defstatis.lvs[0].period ?? 0}
                        label="Т уср ИН"
                        onChange={handlePeriodChange}
                    >
                        <MenuItem value="1" key={0}>1</MenuItem>
                        <MenuItem value="5" key={1}>5</MenuItem>
                        <MenuItem value="10" key={2}>10</MenuItem>
                        <MenuItem value="15" key={3}>15</MenuItem>
                        <MenuItem value="20" key={4}>20</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "50rem"}}>
                Длительность МГР при неисправности ДТ
            </Grid>
            <Grid item xs style={{marginTop: "1rem", width: "50rem", display: "flex", justifyContent: "space-between"}}>
                <VvAdditionalTable SetTimeUse={SetTimeUse}/>
            </Grid>
        </Grid>
    )
}

export default VvTab