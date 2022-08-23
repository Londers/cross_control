import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {setState} from "../../features/crossInfoSlice";
import produce from "immer";

export const reloadMainTab = createAction("reload/mainTab")
export const reloadPkTab = createAction("reload/PkTab")
export const reloadPk = createAction<number>("reload/Pk")
export const reloadSkTab = createAction("reload/SkTab")
export const reloadNkTab = createAction("reload/NkTab")
export const reloadGkTab = createAction("reload/GkTab")
// export const reloadVvTab = createAction("reload/VvTab")
export const reloadKvTab = createAction("reload/KvTab")

export const TabReloadMiddleware = createListenerMiddleware()

TabReloadMiddleware.startListening({
    matcher: isAnyOf(reloadMainTab, reloadPkTab, reloadPk, reloadSkTab, reloadNkTab, reloadGkTab, reloadKvTab),
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState
        const currentDeviceState = state.crossInfo.state
        const savedDeviceState = state.stateSave

        if (!currentDeviceState) return

        if (reloadMainTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.id = savedDeviceState.id
                    draft.idevice = savedDeviceState.idevice
                    draft.area = savedDeviceState.area
                    draft.subarea = savedDeviceState.subarea
                    draft.name = savedDeviceState.name
                    draft.phone = savedDeviceState.phone
                    draft.dgis = savedDeviceState.dgis
                    draft.scale = savedDeviceState.scale
                    draft.Model = savedDeviceState.Model
                    draft.arrays.type = savedDeviceState.arrays.type
                    draft.arrays.SetupDK = savedDeviceState.arrays.SetupDK
                    draft.arrays.timedev = savedDeviceState.arrays.timedev
                })
            ))
        } else if (reloadPk.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.SetDK.dk[action.payload] = savedDeviceState.arrays.SetDK.dk[action.payload]
                })
            ))
        } else if (reloadPkTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.SetDK = savedDeviceState.arrays.SetDK
                })
            ))
        } else if (reloadSkTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.DaySets = savedDeviceState.arrays.DaySets
                })
            ))
        } else if (reloadNkTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.WeekSets = savedDeviceState.arrays.WeekSets
                })
            ))
        } else if (reloadGkTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.MonthSets = savedDeviceState.arrays.MonthSets
                })
            ))
        // } else if (reloadVvTab.match(action)) {
        } else if (reloadKvTab.match(action)) {
            listenerApi.dispatch(setState(
                produce(currentDeviceState, draft => {
                    draft.arrays.SetCtrl = savedDeviceState.arrays.SetCtrl
                })
            ))
        }
    }
})