import {State} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {sizeVerification} from "../common/otherFunctions";


const initialState: State = {} as State

export const  stateSaveSlice = createSlice({
    name: "stateSave",
    initialState,
    reducers: {
        setStateSave: (state, action: PayloadAction<State>) => {
            if (action.payload.arrays.defstatis.lvs[0].period === 0) {
                action.payload.arrays.defstatis.lvs[0].period = 5
                alert("Исправлена ошибка Т уср ИН во Внешних входах. Отправьте изменение на контроллер.")
            }
            Object.assign(state, {...sizeVerification(action.payload)})
        },
    }
})

export const {setStateSave} = stateSaveSlice.actions

export const selectStateSave = (state: RootState) => state.stateSave

export default stateSaveSlice.reducer