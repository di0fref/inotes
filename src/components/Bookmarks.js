import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, ArticleOutlined, ExpandLess, ExpandMore, PersonOutline, Star} from "@mui/icons-material";
import {FaChevronDown, FaChevronRight, FaChevronUp, FaRegFileAlt} from "react-icons/fa";
import {CgFileDocument} from "react-icons/cg";

function Bookmarks(props) {
    const [bookmarks, setBookmarks] = useState([])
    const [selected, setSelected] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        NotesService.getBookMarks().then((result) => {
            setBookmarks(result.data)
        })
    }, [props.bookmarked])

    return (

        <div className={"text-gray-300 text-sm"}>
            <button onClick={() => setOpen(!open)} className={"w-full px-2"}>
                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 ${selected?"bg-gray-600/10":""}`}>
                        <span className={"mr-2 ml-2"}>
                            <Star className={"text-yellow-500 w-5 h-5"}/>
                        </span>
                    <span className={"font-semibold dark:text-slate-400 text-gray-500"}>Bookmarks</span>
                    <span className={"ml-2 text-xs dark:text-slate-400 text-gray-500"}>{!open?(`(${bookmarks.length} hidden)`):""}</span>
                    <span className={"ml-auto mr-3"}>
                          {open
                              ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                              : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                          }
                    </span>
                </div>
            </button>
            <div className={`${open ? "h-full" : "h-0"} mx-2 overflow-hidden`}>

                {bookmarks.length
                    ? bookmarks.map((item, index) => {
                        return (
                            <button onClick={() => {}} className={"w-full"} key={index}>
                                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 mr-4`} key={index}>
                            <span className={"mr-2 ml-5"}>
                                <CgFileDocument className={"dark:text-slate-400 text-gray-500"}/>
                            </span>
                                    <span className={"dark:text-slate-400 text-dark-gray"}>{item.name ? item.name : "Untitled"}</span>
                                </div>
                            </button>
                        )
                    })
                    :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>
                        Your favourites will be sent here.
                    </div>
                }
            </div>
        </div>
    )
}

export default Bookmarks
