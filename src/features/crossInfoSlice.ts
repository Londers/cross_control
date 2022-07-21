import {CrossControlInfoMsg} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";


const initialState: CrossControlInfoMsg = {
    areaMap: undefined,
    deviceIP: "",
    edit: false,
    history: [],
    state: undefined
}

export const crossInfoSlice = createSlice({
    name: "crossInfo",
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<CrossControlInfoMsg>) => {
            Object.assign(state, action.payload)
        }
    }
})

export const {setInitialData, } = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo

export default crossInfoSlice.reducer