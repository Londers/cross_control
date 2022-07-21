import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {CrossControlInfoMsg, IncomingWebSocketMessage, OutcomingWebSocketMessage} from "../index";
import {setInitialData} from "../../features/crossInfoSlice";
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
export const wsGetMessage = createAction<IncomingWebSocketMessage>('websocket/message')
export const wsSendMessage = createAction<OutcomingWebSocketMessage>('websocket/send')
export const WebSocketListenerMiddleware = createListenerMiddleware()
let ws: WebSocket

WebSocketListenerMiddleware.startListening({
    matcher: isAnyOf(wsConnect, wsGetMessage, wsSendMessage),
    effect: async (action, listenerApi) => {
        if (wsConnect.match(action)) {
            ws = new WebSocket(action.payload)
            ws.onopen = () => console.log("opened")
            ws.onerror = (e) => console.log("error", e)
            ws.onclose = (e) => console.log("closed", e)
            ws.onmessage = (e) => listenerApi.dispatch(wsGetMessage(JSON.parse(e.data)))
        } else if (wsSendMessage.match(action)) {
            ws.send(JSON.stringify(action.payload as OutcomingWebSocketMessage))
        } else if (wsGetMessage.match(action)) {
            switch (action.payload.type) {
                case "controlInfo":
                    listenerApi.dispatch(setInitialData(action.payload.data as CrossControlInfoMsg))
                    break;
                // case "crossBuild":
                //     listenerApi.dispatch(setInitialData(action.payload.data as CrossBuildMsg))
                //     break;
                // case "changeEdit":
                //     listenerApi.dispatch(setEdit(action.payload.data as ChangeEditMsg))
                //     break;
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