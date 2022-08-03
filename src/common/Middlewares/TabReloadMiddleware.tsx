import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {setState} from "../../features/crossInfoSlice";

export const reloadMainTab = createAction("reload/mainTab")
export const reloadPkTab = createAction("reload/PkTab")
export const reloadSkTab = createAction("reload/SkTab")
export const reloadNkTab = createAction("reload/NkTab")
export const reloadGkTab = createAction("reload/GkTab")
export const reloadVvTab = createAction("reload/VvTab")
export const reloadKvTab = createAction("reload/KvTab")

export const TabReloadMiddleware = createListenerMiddleware()

TabReloadMiddleware.startListening({
    matcher: isAnyOf(reloadMainTab, reloadPkTab, reloadSkTab, reloadNkTab, reloadGkTab, reloadVvTab, reloadKvTab),
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState
        const currentDeviceState = state.crossInfo.state
        const savedDeviceState = state.stateSave

        if (!currentDeviceState) return

        if (reloadMainTab.match(action)) {
            listenerApi.dispatch(setState(
                {
                    ...currentDeviceState,
                    id: savedDeviceState.id,
                    idevice: savedDeviceState.idevice,
                    area: savedDeviceState.area,
                    subarea: savedDeviceState.subarea,
                    name: savedDeviceState.name,
                    phone: savedDeviceState.phone,
                    dgis: savedDeviceState.dgis,
                    scale: savedDeviceState.scale,
                    Model: savedDeviceState.Model,
                    arrays: {
                        ...currentDeviceState.arrays,
                        type: savedDeviceState.arrays.type,
                        SetupDK: savedDeviceState.arrays.SetupDK,
                        timedev: savedDeviceState.arrays.timedev
                    }
                }
            ))
        } else if (reloadPkTab.match(action)) {

        } else if (reloadSkTab.match(action)) {

        } else if (reloadNkTab.match(action)) {

        } else if (reloadGkTab.match(action)) {

        } else if (reloadVvTab.match(action)) {

        } else if (reloadKvTab.match(action)) {

        }
    }
})