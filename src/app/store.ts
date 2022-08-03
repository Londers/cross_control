import {configureStore} from "@reduxjs/toolkit";
import {WebSocketListenerMiddleware} from "../common/Middlewares/WebSocketMiddleware";
import {crossInfoSlice} from "../features/crossInfoSlice";
import {stateSaveSlice} from "../features/stateSaveSlice";
import {TabReloadMiddleware} from "../common/Middlewares/TabReloadMiddleware";

export const store = configureStore({
    reducer: {
        crossInfo: crossInfoSlice.reducer,
        stateSave: stateSaveSlice.reducer,
        // dispatchTable: dispatchTableSlice.reducer,
        // phaseTable: phaseTableSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(WebSocketListenerMiddleware.middleware).prepend(TabReloadMiddleware.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
export type AppDispatch = typeof store.dispatch