import {Defstatis, Pointset, SetTimeUse, State, Use, Useinput} from "./index";
import {setState} from "../features/crossInfoSlice";
import produce from "immer";

export const prepareVVTab = (state: State): State => {
    const oldVersion = state.Model.vpcpdr === 3

    const SetTimeUse: SetTimeUse = JSON.parse(JSON.stringify(state.arrays.SetTimeUse))
    const defstatis: Defstatis = JSON.parse(JSON.stringify(state.arrays.defstatis))
    const pointset: Pointset = JSON.parse(JSON.stringify(state.arrays.pointset))
    const useinput: Useinput = JSON.parse(JSON.stringify(state.arrays.useinput))

    if (oldVersion) {
        const shift1 = SetTimeUse.uses.shift()
        const shift2 = SetTimeUse.uses.shift()
        if (shift1 && shift2) {
            SetTimeUse.uses.push(shift1)
            SetTimeUse.uses.push(shift2)
        }
    }

    // defstatis
    defstatis.lvs[0].count = oldVersion ? 0 : SetTimeUse.uses.length
    defstatis.lvs[0].ninput = 0
    defstatis.lvs[0].typst = 0
    SetTimeUse.uses.forEach(use => {
        if (use.type !== 0) {
            defstatis.lvs[0].typst = 1
            defstatis.lvs[0].ninput++
        }
    })

    // pointset, useinput
    pointset.pts = []
    useinput.used = []

    SetTimeUse.uses.forEach((enter, index) => {
        if (!oldVersion) {
            if (enter.fazes === "0") enter.fazes = ""
            if ((enter.type !== 0) || (enter.tvps !== 0) || (enter.dk !== 0) || (enter.fazes !== "") || (enter.long !== 0)) {
                useinput.used.push(true)
            } else {
                useinput.used.push(false)
            }
        } else {
            if (enter.tvps !== 0) {
                useinput.used.push(true)
            } else {
                useinput.used.push(false)
            }
        }
        if ((enter.type !== 0) && (enter.type < 8)) {
            pointset.pts.push({num: index + 1, typst: enter.type})
        } else {
            pointset.pts.push({num: 0, typst: 0})
        }
    })


    return {
        ...state, arrays: {...state.arrays, SetTimeUse, defstatis, pointset, useinput}
    }
}

export const sizeVerification = (state: State | undefined): State => {
    if (!state) return {} as State
    const oldVersion = state.Model.vpcpdr === 3
    const SetTimeUse: SetTimeUse = JSON.parse(JSON.stringify(state.arrays.SetTimeUse))
    const length = oldVersion ? 8 : 18

    let emptyRecord: Use = {'name': '','type': 0,'tvps': 0,'dk': 0,'fazes': '','long': 0,}
    if (SetTimeUse.uses.length !== length) {
        if (SetTimeUse.uses.length < length) {
            while (SetTimeUse.uses.length !== length) {
                SetTimeUse.uses.push(Object.assign({}, emptyRecord));
            }
        } else if (SetTimeUse.uses.length > length) {
            while (SetTimeUse.uses.length !== length) {
                SetTimeUse.uses.pop();
            }
        }
        if (oldVersion) {
            for (let i = 2; i < length; i++) {
                SetTimeUse.uses[i - 2].name = (i - 1) + ' вх';
            }
            let shift4 = SetTimeUse.uses.pop();
            let shift3 = SetTimeUse.uses.pop();
            if (shift4 && shift3) {
                SetTimeUse.uses.unshift(shift4);
                SetTimeUse.uses.unshift(shift3);
            }
        } else {
            for (let i = 2; i < length; i++) {
                SetTimeUse.uses[i].name = (i - 1) + ' вх';
            }
        }
        SetTimeUse.uses[0].name = '1 ТВП';
        SetTimeUse.uses[1].name = '2 ТВП';
    }



    return {...state, arrays: {...state.arrays, SetTimeUse}}
}