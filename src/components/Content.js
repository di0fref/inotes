import QuillEditor from "./QuillEditor";
import BreadCrumbs from "./BreadCrumbs";
import {Lock, Star, StarOutline} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";
import NoteMenu from "./Menus/NoteMenu";

function Content(props) {

    useEffect(() => {

    }, [props.bookMarked])

    return (
        <div className={"content flex-grow bg-gray-200 dark:bg-gray-900"}>
            <div className={"flex flex-col"}>
                <div className={"h-14 px-4 flex items-center justify-between"}>
                    <div className={"ml-12 md:ml-0"}>
                        <Tooltip title={`${!props.currentNote.bookmark ? "Add to favorites" : "Remove from favorites"}`}>
                            <button onClick={props.setBookmark}>
                                {!props.currentNote.bookmark
                                    ? <StarOutline/>
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
            <div className={"w-full h-full flex justify-center min-h-full overflow-y-auto bg-gray-200 dark:bg-gray-900"}>
                <div className={"w-full h-full lg:w-160 dark:text-gray-300/90"}>
                    <QuillEditor note={props.currentNote} titleChangeHandle={props.titleChangeHandle}/>
                </div>
            </div>
        </div>
    )
}

export default Content
