import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import SendIcon from "../common/icons/SendIcon";
import AddIcon from "../common/icons/AddIcon";
import ReloadIcon from "../common/icons/ReloadIcon";
import DeleteIcon from "../common/icons/DeleteIcon";
import CheckEditIcon from "../common/icons/CheckEditIcon";
import ForceSendIcon from "../common/icons/ForceSendIcon";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {wsSendMessage} from "../common/Middlewares/WebSocketMiddleware";
import {
    SendCheckMsg,
    SendCreateMsg,
    SendDeleteMsg,
    SendDispatch,
    SendEditInfoMsg,
    SendReloadMsg,
    SendSendMsg
} from "../common";
import {selectCrossInfo, selectEdit} from "./crossInfoSlice";
import {fixDaySets, prepareVVTab} from "../common/otherFunctions";
import {selectStateSave} from "./stateSaveSlice";
import {selectCheckErr, selectCustomEdit, selectZoom} from "./additionalInfoSlice";

function ControlButtons(props: { setShowCheck: Function, setShowEdit: Function, setShowReference: Function }) {
    const width = 40
    const height = 40

    const edit = useAppSelector(selectEdit)

    const dispatch = useAppDispatch()
    const state = useAppSelector(selectCrossInfo).state
    const stateSave = useAppSelector(selectStateSave)
    const customEdit = useAppSelector(selectCustomEdit)
    const zoom = useAppSelector(selectZoom)

    const checkErr = useAppSelector(selectCheckErr)

    let [disabledSend, setDisabledSend] = useState(checkErr)
    useEffect(() => {
        setDisabledSend(checkErr)
    }, [checkErr])

    let [disabledCreate, setDisabledCreate] = useState(checkErr)
    useEffect(() => {
        if (state && stateSave) setDisabledCreate((!((state.idevice === stateSave.idevice) || (state.id === stateSave.id) || (state.dgis === stateSave.dgis)) && (!checkErr)))
    }, [checkErr, state, stateSave])

    let [disabledCheck, setDisabledCheck] = useState(true)
    useEffect(() => {
        if (!customEdit) {
            setDisabledCheck(true)
            return
        }
        if (state && stateSave) setDisabledCheck(JSON.stringify(state) === JSON.stringify(stateSave))
    }, [customEdit, state, stateSave])

    const handleSendButtonClick = () => {
        if (state) {
            if (state.area === stateSave.area) {
                dispatch(wsSendMessage({
                    type: "sendB",
                    state: prepareVVTab(fixDaySets(state)),
                    rePaint: state.dgis !== stateSave.dgis,
                    z: zoom
                } as SendSendMsg))
            } else {
                dispatch(wsSendMessage({type: "createB", state: fixDaySets(state)} as SendCreateMsg))
            }
        }
    }
    const handleCreateButtonClick = () => {
        dispatch(wsSendMessage({type: "createB", state: fixDaySets(state)} as SendCreateMsg))
    }
    const handleReloadButtonClick = () => {
        dispatch(wsSendMessage({type: "updateB"} as SendReloadMsg))
    }
    const handleDeleteButtonClick = () => {
        if (window.confirm("Вы уверены? Перекрёсток будет безвозвратно удалён.")) dispatch(wsSendMessage({type: "deleteB", state: state} as SendDeleteMsg))
    }
    const handleCheckControlButtonClick = () => {
        props.setShowEdit(true)
        dispatch(wsSendMessage({type: "editInfoB"} as SendEditInfoMsg))
    }
    const handleForceSendButtonClick = () => {
        dispatch(wsSendMessage({type: "dispatch", id: state?.idevice, cmd: 1, param: 0} as SendDispatch))
    }
    const handleCheckButtonClick = () => {
        props.setShowCheck(true)
        dispatch(wsSendMessage({type: "checkB", state: fixDaySets(state)} as SendCheckMsg))
    }
    const handleReferenceButtonClick = () => {
        props.setShowReference(true)
        // open dialog
    }

    return (
        <div className="buttonGroup">
            <Button variant="outlined" title="Отправить изменения на ДК" onClick={handleSendButtonClick}
                    disabled={!edit || disabledSend}>
                <SendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Создать новый перекрёсток" onClick={handleCreateButtonClick}
                    disabled={!edit || !disabledCreate}>
                <AddIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Обновить данные на АРМ" onClick={handleReloadButtonClick}
                    disabled={!edit || !customEdit}>
                <ReloadIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Удалить перекрёсток" onClick={handleDeleteButtonClick}
                    disabled={!edit || !customEdit}>
                <DeleteIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Список операторов на АРМе" onClick={handleCheckControlButtonClick}>
                <CheckEditIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Принудительно обновить контроллер" onClick={handleForceSendButtonClick}
                    disabled={!edit || !customEdit}>
                <ForceSendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Проверить корректность массивов" onClick={handleCheckButtonClick}
                    disabled={!edit || disabledCheck}>
                Проверка
            </Button>
            <Button variant="outlined" title="Получить справку по странице" onClick={handleReferenceButtonClick}>
                <div style={{fontSize: 25, fontWeight: "bold", color: "black"}}>
                    ?
                </div>
            </Button>
        </div>
    )
}

export default ControlButtons;