import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {FaChevronDown, FaChevronUp, FaRegFileAlt} from "react-icons/fa";

function Tags(props) {
    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState([])

    useEffect(() => {
        NotesService.getBookMarks().then((result) => {
            setTags(result.data)
        })
    }, [props.tagged])

    const clickHandler = () => {
        setOpen(!open)
    }
    return (

        <div className={"text-gray-300 text-sm "}>
            <button onClick={clickHandler} className={"w-full px-4"}>
                <div className={"flex items-center py-2 hover:bg-gray-600/20 rounded mb-1"}>
                        <span className={"mr-2 ml-3"}>
                            <Tags className={"text-blue-400 w-5 h-5"}/>
                        </span>
                    <span className={"font-semibold dark:text-slate-400 text-gray-500"}>Tags</span>
                    <span className={"ml-auto mr-3"}>
                          {open
                              ? <FaChevronUp className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                              : <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                          }
                    </span>
                </div>
            </button>
            <div className={`${open ? "h-full" : "h-0"} ml-7 overflow-hidden`}>

                {tags.length
                    ? tags.map((item, index) => {
                        return (
                            <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1`}>
                            <span className={"mr-2 ml-4"}>
                                <FaRegFileAlt className={"dark:text-slate-400 text-gray-500"}/>
                            </span>
                                <span className={"dark:text-slate-100 text-slate-800 "}>{item.name ? item.name : "Untitled"}</span>
                            </div>
                        )
                    })
                    :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>
                        Your tags will be sent here.
                    </div>}
            </div>
        </div>
    )
}

export default Tags
