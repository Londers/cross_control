import {CrossControlInfoMsg, Pk, SetupDK, State} from "../common";
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
        setCrossInfo: (state, action: PayloadAction<CrossControlInfoMsg>) => {
            Object.assign(state, action.payload)
        },
        setState: (state, action: PayloadAction<State>) => {
            state.state = action.payload
        },
        setDeviceType: (state, action: PayloadAction<number>) => {
            if (state.state) {
                state.state.arrays.type = action.payload
                switch (action.payload) {
                    case 1:
                        state.state.Model.C12 = true;
                        break;
                    // case 2:
                    //     break;
                    case 4:
                        state.state.Model.DKA = true;
                        break;
                    case 8:
                        state.state.Model.DTA = true;
                        break;
                    default:
                        break;
                }
            }
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
        setDeviceTz: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.timedev.tz = action.payload
        },
        setDeviceSummertime: (state, action: PayloadAction<boolean>) => {
            if (state.state) state.state.arrays.timedev.summer = action.payload
        },
        setDevicePspd: (state, action: PayloadAction<string>) => {
            if (state.state) {
                [state.state.Model.vpcpdl, state.state.Model.vpcpdr] = action.payload.split(".").map(v => Number(v))
            }
        },
        setDevicePbsl: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.Model.vpbsl = action.payload
        },
        setDevicePbsr: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.Model.vpbsr = action.payload
        },
        setJournal: (state, action: PayloadAction<boolean>) => {
            if (state.state) state.state.arrays.timedev.journal = action.payload
        },
        setNogprs: (state, action: PayloadAction<boolean>) => {
            if (state.state) state.state.arrays.timedev.nogprs = action.payload
        },
        setSetupDk: (state, action: PayloadAction<SetupDK>) => {
            if (state.state) state.state.arrays.SetupDK = action.payload
        },
        setPk: (state, action: PayloadAction<{num: number, pk: Pk}>) => {
            if (state.state) Object.assign(state.state.arrays.SetDK.dk[action.payload.num], action.payload.pk)
        },
    }
})

export const {
    setCrossInfo,
    setState,
    setDeviceType,
    setDeviceId,
    setDeviceIdevice,
    setDeviceArea,
    setDeviceSubarea,
    setDeviceName,
    setDevicePhone,
    setDeviceTz,
    setDeviceSummertime,
    setDevicePspd,
    setDevicePbsl,
    setDevicePbsr,
    setJournal,
    setNogprs,
    setSetupDk,
    setPk,
} = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo
export const selectSetupDk = (state: RootState) => state.crossInfo.state?.arrays.SetupDK ?? {} as SetupDK

export default crossInfoSlice.reducer