import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {
    ChaneEditMsg,
    CheckMsg, CreateMsg,
    CrossControlInfoMsg, DeleteMsg,
    EditInfoMsg,
    IncomingWebSocketMessage,
    OutcomingWebSocketMessage, SendHistoryMsg, SendMsg,
    State
} from "../index";
import {setCrossInfo, setEdit, setState} from "../../features/crossInfoSlice";
import {setStateSave} from "../../features/stateSaveSlice";
import {setCheck, setCheckErr, setEditInfo} from "../../features/additionalInfoSlice";
import {RootState} from "../../app/store";

// import {
//     ChangeEditMsg,
//     CrossBuildMsg, CrossConnectionMsg, CrossUpdateMsg, DispatchMsg,
//     IncomingWebSocketMessage,
//     OutcomingWebSocketMessage, PhaseMsg, StateChangeMsg
// } from "../index";
// import {
//     setConnection,
//     setCross,
//     setEdit,
//     setInitialData,
//     setPhaseInfo,
//     setState
// } from "../../features/crossSlice";
// import {setDispatch} from "../../features/dispatchTableSlice";
// import {addDK} from "../../features/phaseTableSlice";

export const wsConnect = createAction<string>("websocket/connect")
export const wsGetMessage = createAction<IncomingWebSocketMessage>("websocket/message")
export const wsSendMessage = createAction<OutcomingWebSocketMessage>("websocket/send")
export const WebSocketListenerMiddleware = createListenerMiddleware()
let ws: WebSocket

WebSocketListenerMiddleware.startListening({
    matcher: isAnyOf(wsConnect, wsGetMessage, wsSendMessage),
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState
        const currentDeviceState = state.crossInfo.state
        const savedDeviceState = state.stateSave

        if (wsConnect.match(action)) {
            ws = new WebSocket(action.payload)
            ws.onopen = () => console.log("opened")
            ws.onerror = (e) => console.log("error", e)
            ws.onclose = (e) => {
                if (e.code === 1000) {
                    alert(e.reason)
                    window.close()
                }
                console.log("closed", e)
            }
            ws.onmessage = (e) => listenerApi.dispatch(wsGetMessage(JSON.parse(e.data)))
        } else if (wsSendMessage.match(action)) {
            ws.send(JSON.stringify(action.payload as OutcomingWebSocketMessage))
        } else if (wsGetMessage.match(action)) {
            switch (action.payload.type) {
                case "controlInfo":
                    const crossControlInfo: CrossControlInfoMsg = action.payload.data as CrossControlInfoMsg
                    listenerApi.dispatch(setCrossInfo(crossControlInfo))
                    listenerApi.dispatch(setStateSave(crossControlInfo.state as State))
                    document.title = "АРМ ДК-" + crossControlInfo.state?.area + '-' + crossControlInfo.state?.id;
                    break;
                case "checkB":
                    listenerApi.dispatch(setCheck(action.payload.data as CheckMsg))
                    listenerApi.dispatch(setCheckErr((action.payload.data as CheckMsg).status))
                    break;
                case "editInfoB":
                    listenerApi.dispatch(setEditInfo(action.payload.data as EditInfoMsg))
                    break;
                case "changeEdit":
                    listenerApi.dispatch(setEdit((action.payload.data as ChaneEditMsg).edit))
                    break;
                case "sendB": {
                    const msg = action.payload.data as SendMsg
                    if (msg.status && msg.state) {
                        if (localStorage.getItem("login") !== msg.user) {
                            if (msg.state.id !== savedDeviceState.id) {
                                alert("Другой оператор изменил № перекрёстка");
                                window.location.href = window.location.pathname + window.location.search.replace("ID=" + savedDeviceState.id, "ID=" + msg.state.id);
                            } else {
                                listenerApi.dispatch(setState(msg.state))
                            }
                        } else {
                            if (msg.state.id !== savedDeviceState.id) {
                                listenerApi.dispatch(wsSendMessage({
                                    type: "deleteB",
                                    state: savedDeviceState
                                }))
                            } else {
                                listenerApi.dispatch(setStateSave(msg.state))
                            }
                        }
                    } else {
                        if (msg.message) {
                            alert(msg.message)
                        } else {
                            alert("Ошибка отправки изменений на ДК")
                        }
                    }
                    // listenerApi.dispatch(setEdit((action.payload.data as SendMsg)))
                    break;
                }
                case "createB": {
                    const msg = action.payload.data as CreateMsg
                    if (!msg.status) {
                        if (!msg.message) {
                        //     alert(msg.result)
                        // } else {
                            alert("Ошибка при создании перекрёстка")
                        }
                    } else {
                        window.location.href = window.location.pathname + window.location.search.replace("ID=" + savedDeviceState.id, "ID=" + currentDeviceState?.id);
                    }
                    // listenerApi.dispatch(setEdit((action.payload.data as CreateMsg)))
                    break;
                }
                case "deleteB": {
                    const msg = action.payload.data as DeleteMsg
                    if (msg.status) {
                        if (currentDeviceState?.id !== savedDeviceState.id) {
                            window.location.href = window.location.pathname + window.location.search.replace("ID=" + savedDeviceState.id, "ID=" + currentDeviceState?.id);
                        } else {
                            window.close();
                        }
                    } else {
                        alert("Не удалось удалить перекрёсток");
                    }
                    // listenerApi.dispatch(setEdit((action.payload.data as DeleteMsg)))
                    break;
                }
                case "sendHistory": {
                    const msg = action.payload.data as SendHistoryMsg

                    let newCrossInfo = JSON.parse(JSON.stringify(state.crossInfo))
                    newCrossInfo.state = msg.sendHistory
                    localStorage.setItem("history", JSON.stringify(newCrossInfo))
                    localStorage.setItem("historydiff", JSON.stringify(msg.diff))
                    localStorage.setItem("historyts", JSON.stringify(state.additionalInfo.history))
                    window.open(window.location.href);
                    break;
                }
                // case "dispatch":
                //     listenerApi.dispatch(setDispatch(action.payload.data as DispatchMsg))
                //     break;
                // case "crossUpdate":
                //     listenerApi.dispatch(setCross(action.payload.data as CrossUpdateMsg))
                //     break;
                // case "stateChange":
                //     listenerApi.dispatch(setState(action.payload.data as StateChangeMsg))
                //     break;
                // case "crossConnection":
                //     listenerApi.dispatch(setConnection(action.payload.data as CrossConnectionMsg))
                //     break;
                // case "phase":
                //     listenerApi.dispatch(setPhaseInfo(action.payload.data as PhaseMsg))
                //     listenerApi.dispatch(addDK(action.payload.data as PhaseMsg))
                //     break;
                // case "error":
                //     listenerApi.dispatch(setError(action.payload.data as ChangeEditMsg))
                //     break;
                // case "close":
                //     listenerApi.dispatch(setClose(action.payload.data as ChangeEditMsg))
                //     break;
                default:
                    console.log("type not found:", action.payload)
                    break;
            }
        }
    },
})