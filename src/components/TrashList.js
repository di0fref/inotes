import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {Delete} from "@mui/icons-material";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import {CgFileDocument} from "react-icons/cg";

function Bookmarks(props) {
    const [trash, setTrash] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        NotesService.getTrash().then((result) => {
            setTrash(result.data)
        })
    }, [props.trashed])

    return (

        <div className={"text-gray-300 text-sm mb-4"}>
            <button onClick={() => setOpen(!open)} className={"w-full px-2"}>
                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1`}>
                        <span className={"mr-2 ml-2"}>
                            <Delete className={""}/>
                        </span>
                    <span className={"font-semibold dark:text-slate-400 text-gray-500"}>Trash</span>
                    <span className={"ml-2 text-xs dark:text-slate-400 text-gray-500"}>{!open?(`(${trash.length} hidden)`):""}</span>
                    <span className={"ml-auto mr-3"}>
                          {open
                              ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                              : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                          }
                    </span>
                </div>
            </button>
            <div className={`${open ? "h-full" : "h-0 py-0"} mx-2 overflow-hidden`}>

                {trash.length
                    ? trash.map((item, index) => {
                        return (
                            <button onClick={() => {}} className={"w-full"} key={index}>
                                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 mr-1`} key={index}>
                            <span className={"mr-2 ml-5"}>
                                <CgFileDocument className={"dark:text-slate-400 text-dark-gray"}/>
                            </span>
                                    <span className={"dark:text-slate-400 text-dark-gray truncate"}>{item.name ? item.name : "Untitled"}</span>
                                </div>
                            </button>
                        )
                    })
                    :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>
                        Your deleted documents will be sent here.
                    </div>
                }
            </div>
        </div>
    )
}

export default Bookmarks
