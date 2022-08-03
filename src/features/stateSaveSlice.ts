import {State} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";


const initialState: State = {} as State

export const  stateSaveSlice = createSlice({
    name: "stateSave",
    initialState,
    reducers: {
        setStateSave: (state, action: PayloadAction<State>) => {
            Object.assign(state, action.payload)
        },
    }
})

export const {setStateSave} = stateSaveSlice.actions

export const selectStateSave = (state: RootState) => state.stateSave

export default stateSaveSlice.reducer