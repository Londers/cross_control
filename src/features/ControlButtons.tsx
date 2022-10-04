import React from "react";
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
import {selectCrossInfo} from "./crossInfoSlice";
import {prepareVVTab} from "../common/otherFunctions";

function ControlButtons() {
    const width = 40
    const height = 40

    const dispatch = useAppDispatch()
    const state = useAppSelector(selectCrossInfo).state

    const handleSendButtonClick = () => {
        if (state) {
            dispatch(wsSendMessage({type: "sendB", state: prepareVVTab(state), rePaint: false} as SendSendMsg))
        }
    }
    const handleCreateButtonClick = () => {
        dispatch(wsSendMessage({type: "createB", state: state, z: -1} as SendCreateMsg))
    }
    const handleReloadButtonClick = () => {
        dispatch(wsSendMessage({type: "updateB"} as SendReloadMsg))
    }
    const handleDeleteButtonClick = () => {
        dispatch(wsSendMessage({type: "deleteB", state: state} as SendDeleteMsg))
    }
    const handleCheckControlButtonClick = () => {
        dispatch(wsSendMessage({type: "editInfoB"} as SendEditInfoMsg))
    }
    const handleForceSendButtonClick = () => {
        dispatch(wsSendMessage({type: "dispatch", id: state?.id, cmd: 1, param: 0} as SendDispatch))
    }
    const handleCheckButtonClick = () => {
        dispatch(wsSendMessage({type: "checkB", state: state} as SendCheckMsg))
    }
    const handleReferenceButtonClick = () => {
        // open dialog
    }

    return (
        <div className="buttonGroup">
            <Button variant="outlined" title="Отправить изменения на ДК" onClick={handleSendButtonClick}>
                <SendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Создать новый перекрёсток" onClick={handleCreateButtonClick}>
                <AddIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Обновить данные на АРМ" onClick={handleReloadButtonClick}>
                <ReloadIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Удалить перекрёсток" onClick={handleDeleteButtonClick}>
                <DeleteIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Список операторов на АРМе" onClick={handleCheckControlButtonClick}>
                <CheckEditIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Принудительно обновить контроллер" onClick={handleForceSendButtonClick}>
                <ForceSendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Проверить корректность массивов" onClick={handleCheckButtonClick}>
                {/*TODO: заполнить суточные карты с заменой 24 на 0 в последних строках. !Перед отправкой!*/}
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