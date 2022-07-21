import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middlewares/WebSocketMiddleware";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            dispatch(wsConnect("wss://192.168.115.134:4443/user/Admin/cross/controlW?Region=1&Area=1&ID=11"))
        } else {
            dispatch(wsConnect(`wss://${window.location.host}/user/${localStorage.getItem("login")}/cross/controlW${window.location.search}`))
        }
    }, [dispatch])

    return (
        <div className="App">
            main
        </div>
    );
}

export default App;
