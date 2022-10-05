import React, {useState} from "react";
import {Button} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {selectCheck, selectEdit} from "./additionalInfoSlice";
import CheckInfo from "./Other/CheckInfo";
import EditInfo from "./Other/EditInfo";
import ReferenceInfo from "./Other/ReferenceInfo";

function AdditionalButtons(props: { check: boolean, edit: boolean, reference: boolean }) {

    const [showCheckInfo, setShowCheckInfo] = useState(false)
    const [showEditInfo, setShowEditInfo] = useState(false)
    const [showReferenceInfo, setShowReferenceInfo] = useState(false)

    const checkInfo = useAppSelector(selectCheck)
    const editInfo = useAppSelector(selectEdit)

    const setShowCheck = () => {
        setShowCheckInfo(!showCheckInfo)
        setShowEditInfo(false)
        setShowReferenceInfo(false)
    }

    const setShowEdit = () => {
        setShowCheckInfo(false)
        setShowEditInfo(!showEditInfo)
        setShowReferenceInfo(false)
    }

    const setShowReference = () => {
        setShowCheckInfo(false)
        setShowEditInfo(false)
        setShowReferenceInfo(!showReferenceInfo)
    }


    return (
        <div className="buttonGroup" style={{marginTop: "3rem"}}>
            {props.check &&
                <Button variant="outlined" onClick={setShowCheck}>
                    Результат проверки
                </Button>
            }
            {showCheckInfo && <CheckInfo checkInfo={checkInfo}/>}

            {props.edit &&
                <Button variant="outlined" onClick={setShowEdit}>
                    Список пользователей на странице
                </Button>
            }
            {showEditInfo && <EditInfo editInfo={editInfo}/>}

            {props.reference &&
                <Button variant="outlined" onClick={setShowReference}>
                    Справка по странице
                </Button>
            }
            {showReferenceInfo && <ReferenceInfo/>}
        </div>
    )
}

export default AdditionalButtons