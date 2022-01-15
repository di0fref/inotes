import QuillEditor from "./QuillEditor";
import BreadCrumbs from "./BreadCrumbs";
import {Article, Lock, Star, StarOutline} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";
import NoteMenu from "./Menus/NoteMenu";
import ThemeSwitcher from "./ThemeSwitcher";

function Content(props) {

    useEffect(() => {

    }, [props.bookMarked])

    return (
        <div className={"content flex-grow bg-white dark:bg-gray-900"}>
            <ThemeSwitcher/>

            {props.currentNote.id ?
                <>
                    <div className={"flex flex-col"}>
                        <div className={"h-14 px-4 flex items-center justify-between border-b dark:border-gray-800/40"}>
                            <div className={"ml-12 md:ml-0"}>
                                <Tooltip title={`${!props.currentNote.bookmark ? "Add to favorites" : "Remove from favorites"}`}>
                                    <button onClick={props.setBookmark}>
                                        {!props.currentNote.bookmark
                                            ? <StarOutline className={"dark:text-white"}/>
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
                        </div>
                    </div>
                    <div className={"editor w-full h-full flex justify-center min-h-full overflow-y-auto bg-white dark:bg-gray-900"}>
                        <div className={"w-full h-full lg:w-160 dark:text-gray-300/90 text-gray-700"}>
                            <QuillEditor note={props.currentNote} titleChangeHandle={props.titleChangeHandle}/>
                        </div>
                    </div>
                </>

                : <div className={"text-muted flex flex-col justify-center items-center h-72 mt-20 w-96 mx-auto"}>
                    <div className={"font-bold text-3xl mb-4 dark:text-gray-500"}>No document is open</div>

                    <div className={"mt-2"}>
                        <div className={"flex items-center justify-start"}>
                            <span className={"ml-2"}>
                                <button onClick={props.noteCreateHandle} className={"block px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white"}>Create new document</button>
                            </span>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Content
