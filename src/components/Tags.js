
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {FaChevronDown, FaChevronRight, FaChevronUp, FaRegFileAlt} from "react-icons/fa";
import {Tag} from "@mui/icons-material";

function Tags(props) {
    // const [tags, setTags] = useState([])
    const [selected, setSelected] = useState(false)

    // const [open, setOpen] = useState(false)
    //
    // useEffect(() => {
    //     NotesService.getBookMarks().then((result) => {
    //         setTags(result.data)
    //     })
    // }, [props.bookmarked])
    useEffect(() => {
        setSelected(props.selected==="tags")
    }, [props.selected])

    const clickHandler = () => {
        // setOpen(!open)
        props.folderClicked("tags")
    }
    return (

        <div className={"text-gray-300 text-sm"}>
            <button onClick={clickHandler} className={"w-full px-2"}>
                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 ${selected?"bg-gray-600/10":""}`}>
                        <span className={"mr-2 ml-2"}>
                            <Tag className={"text-blue-500 w-5 h-5"}/>
                        </span>
                    <span className={"font-semibold dark:text-slate-400 text-gray-500"}>Tags</span>
                    {/*<span className={"ml-2 text-xs dark:text-slate-400 text-gray-500"}>*/}
                    {/*    {!open?(`(${tags.length} hidden)`):""}*/}
                    {/*</span>*/}
                    {/*<span className={"ml-auto mr-3"}>*/}
                    {/*      {open*/}
                    {/*          ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                    {/*          : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                    {/*      }*/}
                    {/*</span>*/}
                </div>
            </button>
            {/*<div className={`${open ? "h-full" : "h-0"} ml-11 overflow-hidden`}>*/}

            {/*    {tags.length*/}
            {/*        ? tags.map((item, index) => {*/}
            {/*            return (*/}
            {/*                <button onClick={() => {}} className={"w-full"} key={index}>*/}
            {/*                    <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 mr-4`} key={index}>*/}
            {/*                <span className={"mr-2 ml-4"}>*/}
            {/*                    <FaRegFileAlt className={"dark:text-slate-400 text-gray-500"}/>*/}
            {/*                </span>*/}
            {/*                        <span className={"dark:text-slate-100 text-slate-800 "}>{item.name ? item.name : "Untitled"}</span>*/}
            {/*                    </div>*/}
            {/*                </button>*/}
            {/*            )*/}
            {/*        })*/}
            {/*        :*/}
            {/*        <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>*/}
            {/*            Your favourites will be sent here.*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

export default Tags
