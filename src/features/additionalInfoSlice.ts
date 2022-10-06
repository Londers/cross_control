import {CheckMsg, EditInfoMsg} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState: {
    check: CheckMsg,
    edit: EditInfoMsg,
    zoom: number,
    checkErr: boolean,
    history: Date,
} = {
    check: {result: [], status: false},
    edit: {users: []},
    zoom: -1,
    checkErr: true,
    history: new Date(),
}

export const additionalInfoSlice = createSlice({
    name: "additionalInfo",
    initialState,
    reducers: {
        setCheck: (state, action: PayloadAction<CheckMsg>) => {
            state.check = action.payload
        },
        setEditInfo: (state, action: PayloadAction<EditInfoMsg>) => {
            state.edit = action.payload
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload
        },
        setCheckErr: (state, action: PayloadAction<boolean>) => {
            state.checkErr = !action.payload
        },
        setHistory: (state, action: PayloadAction<Date>) => {
            state.history = action.payload
        },
    }
})

export const {setCheck, setEditInfo, setZoom, setCheckErr, setHistory} = additionalInfoSlice.actions

export const selectCheck = (state: RootState) => state.additionalInfo.check
export const selectEdit = (state: RootState) => state.additionalInfo.edit
export const selectZoom = (state: RootState) => state.additionalInfo.zoom
export const selectCheckErr = (state: RootState) => state.additionalInfo.checkErr

export default additionalInfoSlice.reducer