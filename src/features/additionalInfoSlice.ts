import {CheckMsg, EditInfoMsg} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState: {
    check: CheckMsg,
    customEdit: EditInfoMsg,
    zoom: number,
    checkErr: boolean,
    history: Date | undefined,
    pkTransferNum: number
} = {
    check: {result: [], status: false},
    customEdit: {users: []},
    zoom: -1,
    checkErr: true,
    history: undefined,
    pkTransferNum: -1
}

export const additionalInfoSlice = createSlice({
    name: "additionalInfo",
    initialState,
    reducers: {
        setCheck: (state, action: PayloadAction<CheckMsg>) => {
            state.check = action.payload
        },
        setEditInfo: (state, action: PayloadAction<EditInfoMsg>) => {
            state.customEdit = action.payload
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
        setPkTransferNum: (state, action: PayloadAction<number>) => {
            state.pkTransferNum = action.payload
        },
    }
})

export const {setCheck, setEditInfo, setZoom, setCheckErr, setHistory, setPkTransferNum} = additionalInfoSlice.actions

export const selectCheck = (state: RootState) => state.additionalInfo.check
export const selectCustomEdit = (state: RootState) => state.additionalInfo.customEdit
export const selectZoom = (state: RootState) => state.additionalInfo.zoom
export const selectCheckErr = (state: RootState) => state.additionalInfo.checkErr
export const selectPkTransferNum = (state: RootState) => state.additionalInfo.pkTransferNum

export default additionalInfoSlice.reducer