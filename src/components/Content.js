import QuillEditor from "./QuillEditor";
import BreadCrumbs from "./BreadCrumbs";
import {Article, Lock, Star, StarOutline} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";
import NoteMenu from "./Menus/NoteMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import {FaRegFileAlt} from "react-icons/fa";

function Content(props) {

    useEffect(() => {

    }, [props.bookMarked])

    return (
        <div className={"content flex-grow bg-white dark:bg-gray-900"}>

            {props.currentNote.id ?
                <>
                    <div className={"flex flex-col"}>
                        <div className={"h-14 px-4 flex items-center justify-between border-b dark:border-gray-800/40"}>
                            <div className={"ml-12 md:ml-0"}>
                                <Tooltip title={`${!props.currentNote.bookmark ? "Add to favorites" : "Remove from favorites"}`}>
                                    <button onClick={props.setBookmark}>
                                        {!props.currentNote.bookmark
                                            ? <StarOutline className={"dark:text-white text-slate-500"}/>
                                            : <Star className={"text-yellow-400"}/>}
                                    </button>
                                </Tooltip>
                            </div>
                            <div className={"mr-auto"}>
                                <BreadCrumbs note={props.currentNote}/>
                            </div>
                            <div>
                                <NoteMenu currentNote={props.currentNote} setLockedHandle={props.setLockedHandle}/>
                            </div>
                            <div>
                                <ThemeSwitcher/>
                            </div>
                        </div>
                    </div>
                    <div className={"editor w-full h-full flex justify-center min-h-full overflow-y-auto bg-white dark:bg-gray-900"}>
                        <div className={"w-full h-full lg:w-160 dark:text-gray-300/90 text-gray-700"}>
                            <QuillEditor note={props.currentNote} titleChangeHandle={props.titleChangeHandle}/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"flex flex-col"}>
                        <div className={"h-14 px-4 flex items-center justify-end border-b dark:border-gray-800/40"}>
                            <div className={"ml-12 md:ml-0"}>
                                <div>
                                    <ThemeSwitcher/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"pt-20 h-full flex justify-center min-h-full overflow-y-auto bg-white dark:bg-gray-900"}>
                        <div className={"w-full h-full lg:w-160 dark:text-gray-300/90 text-gray-700"}>
                            <div className={"text-center font-bold text-3xl mb-4 dark:text-gray-500 text-slate-400"}>No
                                document is
                                open
                            </div>
                            <div className={"mt-2 "}>
                                <div className={"flex items-center justify-center"}>
                                    <FaRegFileAlt className={"dark:text-slate-400 text-slate-500"}/>
                                    <span className={"ml-2"}>
                                        <button onClick={props.noteCreateHandle} className={"px-1 py-2 rounded-md dark:text-slate-400 text-slate-500 dark:hover:text-sky-500 hover:text-blue-800"}>Create new document</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Content
