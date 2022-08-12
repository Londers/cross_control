import {CrossControlInfoMsg, CustomTimestamp, Line, Pk, SetupDK, Sk, State, Use} from "../common";
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
        setPk: (state, action: PayloadAction<{ num: number, pk: Pk }>) => {
            if (state.state) Object.assign(state.state.arrays.SetDK.dk[action.payload.num], action.payload.pk)
        },
        setIte: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.SetTimeUse.ite = action.payload
        },
        setPeriod: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.defstatis.lvs[0].period = action.payload
        },
        updateSkLine: (state, action: PayloadAction<{ skNum: number, lineNum: number, line: Line }>) => {
            if (state.state) {
                state.state.arrays.DaySets.daysets[action.payload.skNum].lines[action.payload.lineNum] = action.payload.line
                state.state.arrays.DaySets.daysets[action.payload.skNum].count =
                    state.state.arrays.DaySets.daysets[action.payload.skNum].lines.filter(line => line.npk !== 0).length
            }
        },
        // updateSkNpk: (state, action: PayloadAction<{ skNum: number, lineNum: number, value: number }>) => {
        //     if (state.state) {
        //         state.state.arrays.DaySets.daysets[action.payload.skNum].lines[action.payload.lineNum].npk = action.payload.value
        //     }
        // },
        updateNk: (state, action: PayloadAction<{ nk: number, day: number, value: number }>) => {
            if (state.state) state.state.arrays.WeekSets.wsets[action.payload.nk].days[action.payload.day] = action.payload.value
        },
        updateGk: (state, action: PayloadAction<{ gk: number, day: number, value: number }>) => {
            if (state.state) state.state.arrays.MonthSets.monthset[action.payload.gk].days[action.payload.day] = action.payload.value
        },
        updateTimeUse: (state, action: PayloadAction<{ id: number, use: Use }>) => {
            if (state.state) state.state.arrays.SetTimeUse.uses[action.payload.id] = action.payload.use
        },
        updateNotwork: (state, action: PayloadAction<{ id: number, value: number }>) => {
            if (state.state) state.state.arrays.SetTimeUse.notwork[action.payload.id] = action.payload.value
        },
        updateKvTime: (state, action: PayloadAction<{id: number, value: CustomTimestamp}>) => {
            if (state.state) {
                state.state.arrays.SetCtrl.Stage[action.payload.id].end = action.payload.value
                if (state.state.arrays.SetCtrl.Stage[action.payload.id + 1]) state.state.arrays.SetCtrl.Stage[action.payload.id + 1].start = action.payload.value
            }
        },
        updateKvTVP: (state, action: PayloadAction<{ id: number, value: number }>) => {
            if (state.state) state.state.arrays.SetCtrl.Stage[action.payload.id].lenTVP = action.payload.value
        },
        updateKvMGR: (state, action: PayloadAction<{ id: number, value: number }>) => {
            if (state.state) state.state.arrays.SetCtrl.Stage[action.payload.id].lenMGR = action.payload.value
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
    setIte,
    setPeriod,
    updateSkLine,
    updateNk,
    updateGk,
    updateTimeUse,
    updateNotwork,
    updateKvTime,
    updateKvTVP,
    updateKvMGR,
} = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo
export const selectSetupDk = (state: RootState) => state.crossInfo.state?.arrays.SetupDK ?? {} as SetupDK

export default crossInfoSlice.reducer