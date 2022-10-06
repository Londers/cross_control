import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectHistory} from "../crossInfoSlice";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";
import {setHistory} from "../additionalInfoSlice";

function HistorySelect() {
    const dispatch = useAppDispatch()
    const history = useAppSelector(selectHistory)

    let value = -1

    return (
        <FormControl sx={{width: "fit-content", minWidth: "150px", marginTop: "5px"}} size={"small"}>
            <InputLabel id="demo-simple-select-label">Выбор правки</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={value}
                label="Выбор правки"
                onChange={(event) => {
                    console.log(history[Number(event.target.value)])
                    value = -1

                    dispatch(wsSendMessage({type: "getHistory", data: {time: history[Number(event.target.value)].time}}))
                    dispatch(setHistory(history[Number(event.target.value)].time))
                }}
            >
                <MenuItem value={-1} key={-1}></MenuItem>
                {history && history.map((h, i) =>
                   <MenuItem value={i} key={i}>{new Date(h.time).toLocaleString('ru-RU') + " - " + h.login}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default HistorySelect