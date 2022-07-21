import {configureStore} from "@reduxjs/toolkit";
import {WebSocketListenerMiddleware} from "../common/Middlewares/WebSocketMiddleware";
import {crossInfoSlice} from "../features/crossInfoSlice";

export const store = configureStore({
    reducer: {
         crossInfo: crossInfoSlice.reducer,
        // dispatchTable: dispatchTableSlice.reducer,
        // phaseTable: phaseTableSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(WebSocketListenerMiddleware.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
export type AppDispatch = typeof store.dispatch