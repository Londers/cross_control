import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {TextField} from "@mui/material";

function CustomTimePicker(props: { date: Date, setDate: Function | null, disabled: boolean }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                ampm={false}
                value={props.date}
                onChange={(newValue) => {
                    if (props.setDate) props.setDate(newValue);
                }}
                // minTime={props.min}
                disabled={props.disabled}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default CustomTimePicker