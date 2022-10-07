import React, {useEffect, useState} from 'react';
import './App.sass';
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middlewares/WebSocketMiddleware";
import ControlButtons from "../features/ControlButtons";
import TabsPanel from "../features/TabsPanel";
import {Grid} from "@mui/material";
import AdditionalButtons from "../features/AdditionalButtons";
import {setCrossInfo} from "../features/crossInfoSlice";

function App() {
    const dispatch = useAppDispatch()

    const [showCheck, setShowCheck] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showReference, setShowReference] = useState(false)
    const [showControls, setShowControls] = useState(false)
    const [historyDiffs, setHistoryDiffs] = useState<string[]>([])


    useEffect(() => {
        if (localStorage.getItem("history") !== null) {
            const crossInfoHistory = JSON.parse(localStorage.getItem('history') ?? "")
            const diffs = JSON.parse(localStorage.getItem('historydiff') ?? "");
            const historyDate = JSON.parse(localStorage.getItem('historyts') ?? "")

            dispatch(setCrossInfo(crossInfoHistory))
            setHistoryDiffs(diffs)
            document.title = `АРМ ДК-${crossInfoHistory.state.area}-${crossInfoHistory.state.id} от
                            ${new Date(historyDate).toLocaleString('ru-RU')}`

            localStorage.removeItem('history');
            localStorage.removeItem('historydiff');
            localStorage.removeItem('historyts');
            return
        }
        setShowControls(true)
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            // dispatch(wsConnect("wss://192.168.115.134:4443/user/Admin/cross/controlW?Region=1&Area=1&ID=1"))
            dispatch(wsConnect("wss://192.168.0.101:4443/user/Admin/cross/controlW?Region=1&Area=1&ID=1"))
        } else {
            dispatch(wsConnect(`wss://${window.location.host}/user/${localStorage.getItem("login")}/cross/controlW${window.location.search}`))
        }
    }, [dispatch])

    return (
        <div className="App">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                columns={14}
                height="100vh"
            >
                <Grid item xs={1}>
                    {showControls &&
                        <ControlButtons setShowCheck={setShowCheck} setShowEdit={setShowEdit}
                                        setShowReference={setShowReference}/>}
                </Grid>
                <Grid item xs>
                    <TabsPanel/>
                </Grid>
                <Grid item xs={1.2}>
                    <AdditionalButtons check={showCheck} edit={showEdit} reference={showReference} historyDiffs={historyDiffs}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
