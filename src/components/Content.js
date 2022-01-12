import QuillEditor from "./QuillEditor";
import BreadCrumbs from "./BreadCrumbs";
import {Star, StarOutline} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";

function Content(props) {

    useEffect(() => {

    }, [props.bookMarked])

    return (
        <div className={"content h-full flex-grow "}>
            <div className={"flex flex-col bg-gray-200 dark:bg-gray-700"}>
                <div className={"p-3 flex items-center justify-between"}>
                    <div>
                        <Tooltip title={`${!props.currentNote.bookmark?"Add to favorites":"Remove from favorites"}`}>
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

                    <div>Note menu</div>
                </div>
            </div>

            <div className={"h-full flex justify-center editor overflow-y-auto bg-gray-200 dark:bg-gray-700"}>
                <div className={"w-full h-full lg:w-160 dark:text-gray-300/90"}>
                    <QuillEditor note={props.currentNote}/>
                </div>
            </div>
        </div>
    )
}

export default Content
