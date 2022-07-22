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
        },
        setDeviceType: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.type = action.payload
        }
    }
})

export const {setInitialData, setDeviceType} = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo

export default crossInfoSlice.reducer