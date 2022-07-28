import {CrossControlInfoMsg} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";


const initialState: CrossControlInfoMsg = {
    areaMap: {},
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
        },
        setDeviceId: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.id = action.payload
        },
        setDeviceIdevice: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.idevice = action.payload
        },
        setDeviceArea: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.area = action.payload
        },
        setDeviceSubarea: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.subarea = action.payload
        },
        setDeviceName: (state, action: PayloadAction<string>) => {
            if (state.state) state.state.name = action.payload
        },
        setDevicePhone: (state, action: PayloadAction<string>) => {
            if (state.state) state.state.phone = action.payload
        },
    }
})

export const {
    setInitialData,
    setDeviceType,
    setDeviceId,
    setDeviceIdevice,
    setDeviceArea,
    setDeviceSubarea,
    setDeviceName,
    setDevicePhone,
} = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo

export default crossInfoSlice.reducer