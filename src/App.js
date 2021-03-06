import Main from "./components/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import PrivateRoute from "./components/helpers/PrivateRoute";
import Login from "./components/Login";
import {createContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ThemeProvider} from "@emotion/react";
import theme from "./components/styles/mui";
import {CssBaseline} from "@mui/material";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {


    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUser(user)
            localStorage.setItem('expectSignIn', '1')
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });

    useEffect(() => {
        // console.log(localStorage.theme)
    }, [localStorage.theme])

    return (
        <DndProvider backend={HTML5Backend} debugMode={true}>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                        <Route path={"/folder/:folder_id/note/:note_id"} element={<Main/>}/>
                        <Route exact path={"/folder/:folder_id"} element={<Main/>}/>
                        <Route exact path={"/note/:note_id"} element={<Main/>}/>
                        <Route exact path={"/"} element={<Main/>}/>
                    </Route>
                    <Route exact path={"/login"} element={<Login/>}/>
                </Routes>
            </ThemeProvider>
        </DndProvider>
    )

}

export default App;
