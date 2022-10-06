import {CrossControlInfoMsg, CustomTimestamp, Gk, Line, Nk, Pk, SetupDK, Sk, Stage, State, Use} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {sizeVerification} from "../common/otherFunctions";


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
            if (action.payload.state) {
                if (action.payload.state.arrays.defstatis.lvs[0].period === 0) {
                    action.payload.state.arrays.defstatis.lvs[0].period = 5
                }
            }
            Object.assign(state, {...action.payload, state: {...sizeVerification(action.payload.state)}})
        },
        setState: (state, action: PayloadAction<State>) => {
            state.state = action.payload
        },
        setEdit: (state, action: PayloadAction<boolean>) => {
            if (state.state) state.edit = action.payload
        },

        // main tab
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
        setScale: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.scale = action.payload
        },
        setDgis: (state, action: PayloadAction<number[]>) => {
            if (state.state) state.state.dgis = action.payload.join(",")
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

        // pk tab
        setPk: (state, action: PayloadAction<{ num: number, pk: Pk }>) => {
            if (state.state) Object.assign(state.state.arrays.SetDK.dk[action.payload.num], action.payload.pk)
        },
        setIte: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.SetTimeUse.ite = action.payload
        },
        setPeriod: (state, action: PayloadAction<number>) => {
            if (state.state) state.state.arrays.defstatis.lvs[0].period = action.payload
        },

        // sk tab
        updateSk: (state, action: PayloadAction<{ skNum: number, sk: Sk }>) => {
            if (state.state) {
                state.state.arrays.DaySets.daysets[action.payload.skNum] = action.payload.sk
                state.state.arrays.DaySets.daysets[action.payload.skNum].num = action.payload.skNum + 1
            }
        },
        updateSkLine: (state, action: PayloadAction<{ skNum: number, lineNum: number, line: Line }>) => {
            if (state.state) {
                state.state.arrays.DaySets.daysets[action.payload.skNum].lines[action.payload.lineNum] = action.payload.line
                state.state.arrays.DaySets.daysets[action.payload.skNum].count =
                    state.state.arrays.DaySets.daysets[action.payload.skNum].lines.filter(line => line.npk !== 0).length
            }
        },
        addSkLine: (state, action: PayloadAction<{ skNum: number, lineNum: number }>) => {
            if (state.state && action.payload.skNum !== 11) {
                const linesCopy = [...state.state.arrays.DaySets.daysets[action.payload.skNum].lines]
                linesCopy.pop()
                linesCopy.splice(action.payload.lineNum, 0, linesCopy[action.payload.lineNum])
                state.state.arrays.DaySets.daysets[action.payload.skNum].lines = linesCopy
                state.state.arrays.DaySets.daysets[action.payload.skNum].count =
                    state.state.arrays.DaySets.daysets[action.payload.skNum].lines.filter(line => line.npk !== 0).length
            }
        },
        deleteSkLine: (state, action: PayloadAction<{ skNum: number, lineNum: number }>) => {
            if (state.state) {
                state.state.arrays.DaySets.daysets[action.payload.skNum].lines.splice(action.payload.lineNum, 1)
                state.state.arrays.DaySets.daysets[action.payload.skNum].lines.push({npk: 0, hour: 0, min: 0})
                state.state.arrays.DaySets.daysets[action.payload.skNum].count =
                    state.state.arrays.DaySets.daysets[action.payload.skNum].lines.filter(line => line.npk !== 0).length
            }
        },

        // nk tab
        setNk: (state, action: PayloadAction<{ nk: Nk[] }>) => {
            if (state.state) state.state.arrays.WeekSets.wsets = action.payload.nk
        },
        updateNk: (state, action: PayloadAction<{ nk: number, day: number, value: number }>) => {
            if (state.state) state.state.arrays.WeekSets.wsets[action.payload.nk].days[action.payload.day] = action.payload.value
        },

        // gk tab
        setGk: (state, action: PayloadAction<{ gk: Gk[] }>) => {
            if (state.state) state.state.arrays.MonthSets.monthset = action.payload.gk
        },
        updateGk: (state, action: PayloadAction<{ gk: number, day: number, value: number }>) => {
            if (state.state) state.state.arrays.MonthSets.monthset[action.payload.gk].days[action.payload.day] = action.payload.value
        },

        // vv tab
        updateTimeUse: (state, action: PayloadAction<{ id: number, use: Use }>) => {
            if (state.state) state.state.arrays.SetTimeUse.uses[action.payload.id] = action.payload.use
        },
        updateNotwork: (state, action: PayloadAction<{ id: number, value: number }>) => {
            if (state.state) state.state.arrays.SetTimeUse.notwork[action.payload.id] = action.payload.value
        },

        // kv tab
        setKv: (state, action: PayloadAction<{ kv: Stage[] }>) => {
            if (state.state) state.state.arrays.SetCtrl.Stage = action.payload.kv
        },
        updateKvTime: (state, action: PayloadAction<{ id: number, value: CustomTimestamp }>) => {
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
    setEdit,

    setDeviceType,
    setScale,
    setDgis,
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

    updateSk,
    updateSkLine,
    addSkLine,
    deleteSkLine,

    setNk,
    updateNk,

    setGk,
    updateGk,

    setKv,
    updateTimeUse,
    updateNotwork,
    updateKvTime,
    updateKvTVP,
    updateKvMGR,
} = crossInfoSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo
export const selectSetupDk = (state: RootState) => state.crossInfo.state?.arrays.SetupDK ?? {} as SetupDK
export const selectHistory = (state: RootState) => state.crossInfo.history

export default crossInfoSlice.reducer