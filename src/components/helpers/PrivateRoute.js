import {getAuth} from "firebase/auth";
import {Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute(props) {

    return getAuth().currentUser != null
        ? <Outlet/>
        : localStorage.getItem('expectSignIn')
            ? null
            : (
                    <Navigate to="/login"/>
            )
}
