import React from "react";
import {Button} from "@mui/material";
import SendIcon from "../common/icons/SendIcon";
import AddIcon from "../common/icons/AddIcon";
import ReloadIcon from "../common/icons/ReloadIcon";
import DeleteIcon from "../common/icons/DeleteIcon";
import CheckEditIcon from "../common/icons/CheckEditIcon";
import ForceSendIcon from "../common/icons/ForceSendIcon";

function ControlButtons() {
    const width = 40
    const height = 40

    return (
        <div className="buttonGroup">
            <Button variant="outlined" title="Отправить изменения на ДК">
                <SendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Создать новый перекрёсток">
                <AddIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Обновить данные на АРМ">
                <ReloadIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Удалить перекрёсток">
                <DeleteIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Список операторов на АРМе">
                <CheckEditIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Принудительно обновить контроллер">
                <ForceSendIcon width={width} height={height}/>
            </Button>
            <Button variant="outlined" title="Проверить корректность массивов">
                Проверка
            </Button>
            <Button variant="outlined" title="Получить справку по странице">
                <div style={{fontSize: 25, fontWeight: "bold", color: "black"}}>
                    ?
                </div>
            </Button>
        </div>
    )
}

export default ControlButtons;