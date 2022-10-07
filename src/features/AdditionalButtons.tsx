import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {selectCheck, selectEdit} from "./additionalInfoSlice";
import CheckInfo from "./Other/CheckInfo";
import EditInfo from "./Other/EditInfo";
import ReferenceInfo from "./Other/ReferenceInfo";
import HistoryInfo from "./Other/HistoryInfo";

function AdditionalButtons(props: { check: boolean, edit: boolean, reference: boolean, historyDiffs: string[] }) {

    const [showCheckInfo, setShowCheckInfo] = useState(false)
    const [showEditInfo, setShowEditInfo] = useState(false)
    const [showReferenceInfo, setShowReferenceInfo] = useState(false)
    const [showHistoryInfo, setShowHistoryInfo] = useState(true)

    const checkInfo = useAppSelector(selectCheck)
    const editInfo = useAppSelector(selectEdit)

    useEffect(() => {
        setShowCheck()
    }, [checkInfo])
    useEffect(() => {
        setShowEdit()
    }, [editInfo])
    useEffect(() => {
        setShowReference()
    }, [])

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
    const setShowHistory = () => {
        setShowHistoryInfo(!showHistoryInfo)
    }

    return (
        <div className="buttonGroup" style={{marginTop: "3rem"}}>
            {props.check &&
                (<>
                    <Button variant="outlined" onClick={setShowCheck}>
                        Результат проверки
                    </Button>
                    {showCheckInfo && <CheckInfo checkInfo={checkInfo}/>}
                </>)
            }

            {props.edit &&
                (<>
                    <Button variant="outlined" onClick={setShowEdit}>
                        Список пользователей на странице
                    </Button>
                    {showEditInfo && <EditInfo editInfo={editInfo}/>}
                </>)
            }
            {props.reference &&
                (<>
                    <Button variant="outlined" onClick={setShowReference}>
                        Справка по странице
                    </Button>
                    {props.reference && showReferenceInfo && <ReferenceInfo/>}
                </>)
            }
            {props.historyDiffs.length !== 0 &&
                (<>
                    <Button variant="outlined" onClick={setShowHistory}>
                        Список изменений
                    </Button>
                    {showHistoryInfo && <HistoryInfo historyDiffs={props.historyDiffs}/>}
                </>)
            }
        </div>
    )
}

export default AdditionalButtons