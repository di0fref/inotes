import Main from "./components/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import PrivateRoute from "./components/helpers/PrivateRoute";
import Login from "./components/Login";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";


function App() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUser(user)
            localStorage.setItem('expectSignIn', '1')

            // ...
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });
    const theme = createTheme({
        components: {
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        // margin: 0,
                        // padding:0
                    }
                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        paddingLeft: 0
                    }
                }
            }
        },
        palette: {
            mode: 'dark',
        },
        typography: {
            // fontSize: 13,
            fontFamily: [
                "Inter",
                "serif"
            ].join(','),
        }
    });

    useEffect(() => {
    }, [user])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                    <Route path={"/notes/:id"} element={<Main/>}/>
                    <Route exact path={"/:id"} element={<Main/>}/>
                    <Route exact path={"/"} element={<Main/>}/>
                </Route>
                <Route exact path={"/login"} element={<Login/>}/>
            </Routes>
        </ThemeProvider>
    )

}

export default App;
