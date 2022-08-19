import React, {useEffect} from 'react';
import './App.sass';
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middlewares/WebSocketMiddleware";
import ControlButtons from "../features/ControlButtons";
import TabsPanel from "../features/TabsPanel";
import {Grid} from "@mui/material";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            dispatch(wsConnect("wss://192.168.115.134:4443/user/Admin/cross/controlW?Region=1&Area=1&ID=1"))
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
                    <ControlButtons/>
                </Grid>
                <Grid item xs>
                    <TabsPanel/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
