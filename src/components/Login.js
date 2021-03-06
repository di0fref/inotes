import {useState} from "react";
import NotesService from "../service/NotesService";
import {Link, useNavigate} from "react-router-dom";
// import ThemeSwitcher from "./ThemeSwitcher";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import app, {signOutFireBase} from "../firebase"
import {FcGoogle} from "react-icons/fc";
import {FaLock} from "react-icons/fa";
import {HiLockClosed, HiMail} from "react-icons/hi";

function Login(props) {

    const [username, setUsername] = useState("fredrik.fahlstad@gmail.com")
    const [password, setPassword] = useState("Sk84ever32!")

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                console.log("signInWithEmailAndPassword")
                // Signed in
                const user = userCredential.user;
                console.log(userCredential)
                // NotesService.login({
                //     idToken: credential.idToken,
                //     user: user,
                //     provider: credential.providerId
                // }).then((result) => {
                //     localStorage.setItem("api_token", result.data.api_token)
                //     navigate('/')
                // })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    const google = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                /* Validate user */
                NotesService.login({
                    idToken: credential.idToken,
                    user: user,
                    provider: credential.providerId,
                    credential: credential
                }).then((result) => {
                    localStorage.setItem("api_token", result.data.api_token)
                    navigate('/')
                }).catch((err) => {
                    console.log(err);
                    /* Sign out user on net fail */
                    signOutFireBase()
                })
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-full px-4 py-12  sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-4 rounded rounded-lg high space-y-8_ bg-secondary shadow_">
                    <div>
                        <img className="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-3xl font-extrabold text-center text-normal">
                            Sign in to your account
                        </h2>
                    </div>
                    <button onClick={google} className={"bg-primary w-full h-10 mt-6 rounded"}>
                        <div className={"flex items-center "} id={"google-login"}>
                            <div className={"ml-4"}><FcGoogle/></div>
                            <div className={"ml-2"}>Sign in wth Google</div>
                        </div>
                    </button>
                    <div className={"flex items-center justify-center mt-3"}>
                        <div className={"uppercase text-muted text-xs"}>Or</div>
                    </div>
                    <form className="mt-4" action="#" method="POST" onSubmit={submitHandler}>

                        <div className="">
                            <div className={"mt-2 relative"}>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-primary " placeholder="Email"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 m-px rounded pointer-events-none bg-primary">
                                    <HiMail/>
                                </div>
                            </div>


                            <div className={"mt-2 relative"}>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded " placeholder="Password"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 m-px rounded pointer-events-none bg-primary">
                                    <FaLock/>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="relative flex justify-center w-full h-10 px-4 py-3 mt-4 mb-8 font-medium text-white border border-transparent rounded-md group button-apply">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 m-px rounded">
                                  <HiLockClosed/>
                              </span>
                                Sign in
                            </button>
                        </div>


                    </form>
                    <div className={"flex justify-end items-center font-display font-semibold text-s-oldm-old-old"}>
                        <span>Don't have an account? <Link to={"/signup"} className={"link"}>Sign up</Link></span>
                    </div>
                </div>
            </div>
            {/*<ThemeSwitcher/>*/}
        </>
    )
}

export default Login;
