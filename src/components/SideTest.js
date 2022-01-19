import {useEffect, useState} from "react";
import {
    ArticleOutlined, Close,
    ExpandLess,
    ExpandMore,
    FolderOutlined,
    PersonOutline, Search
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {HiDocument, HiFolder} from "react-icons/hi";
import {FaChevronCircleDown, FaChevronDown, FaChevronUp, FaLock, FaRegFileAlt, FaRegFolder} from "react-icons/fa";
import UserMenu from "./Menus/UserMenu";
import {Tooltip} from "@mui/material";
import NewMenu from "./Menus/NewMenu";
import Bookmarks from "./Bookmarks";
import Recents from "./Recents";
import Tags from "./Tags";

function SideItem(props) {

    const [open, setOpen] = useState(false)
    const navigator = useNavigate()

    const clickHandle = (id, type, folder_id) => {
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
        } else {
            setOpen(!open);
            props.folderHandleClick(id)
        }
    }

    return (
        <>
            <button onClick={
                (e) => {
                    setOpen(!open)
                    clickHandle(props.items.id, props.items.type, props.items.folder_id)
                }
            } className={`w-full px-4`}

            >
                <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1
                    ${props.items.type === "note"
                    ? (props.currentNote.id === props.items.id) ? "bg-gray-600/10" : ""
                    : null
                }`}
                     style={{
                         marginLeft: props.depth * 2,
                     }}
                >
                    <span className={"mr-2 ml-4"}>
                        {(props.items.type === "folder")
                            ? <FaRegFolder className={"dark:text-slate-400 text-gray-500"}/>
                            // : <FaRegFileAlt className={"dark:text-slate-400 text-gray-500"}/>
                            : ""
                        }
                    </span>
                    <span className={"dark:text-slate-100 text-slate-800 "}>{props.items.name ? props.items.name : "Untitled"}</span>
                    {props.items.locked
                        ?
                        <span className={"ml-2 text-opacity-40 text-slate-700 dark:text-slate-200 dark:text-opacity-40"}><FaLock className={"h-3 w-3"}/></span>
                        : null
                    }
                    <span className={"ml-auto mr-2"}>
                      {(props.items.items && props.items.items.length > 0)
                          ? open ? <FaChevronUp className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/> :
                              <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                          : null
                      }
                    </span>
                </div>
            </button>
            {(props.items.items) ? (
                props.items.items.map((subItem, index) => {
                    return (
                        <div key={index} className={`${open ? "h-full" : "h-0"} overflow-hidden bg-gray-600_`}>
                            <SideItem
                                key={index}
                                items={subItem}
                                depth={props.depth + 12}
                                currentNote={props.currentNote}
                                folderHandleClick={props.folderHandleClick}
                            />
                        </div>
                    )
                })
            ) : null}
        </>
    )
}


export default function SideTest(props) {

    const [tree, setTree] = useState(props.treeData)
    const [open, setOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    return (
        <div className={`
                z-10
                absolute
                md:static
                transition-all
                ease-on-out
                duration-300
                sidebar
                w-76
                -ml-76
                dark:bg-lb
                bg-slate-100
                md:ml-0
                flex-shrink-0
                py-2
                border-r
                dark:border-gray-700/30`}>

            <div className={"flex items-center justify-between"}>
                <div className={"pl-4 pr-4 m-0 flex-grow"}>
                    <UserMenu/>
                </div>
                <Tooltip title={"Hide menu"}>
                    <button onClick={() => setSidebarOpen(false)} className={"mb-auto mr-2  mt-1 md:hidden block hover:text-white text-gray-300"}>
                        <Close className={""}/>
                    </button>
                </Tooltip>
            </div>
            <div className={"px-4"}>
                <button type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700/50 hover:bg-gray-200">
                    <Search sx={{height: 20, width: 20}}/>
                    <span className="flex-auto text-sm text-gray-500">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>
                </button>
            </div>
            <NewMenu noteCreateHandle={props.noteCreateHandle}/>

            <div className={"my-2"}><Bookmarks bookmarked={props.bookMarked}/></div>
            <div className={"my-2"}><Recents recent={false}/></div>
            {/*<div><Tags tagged={false}/></div>*/}

            <div className={"text-gray-300 text-sm "}>
                <button onClick={() => setOpen(!open)} className={"w-full px-4"}>
                    <div className={"flex items-center py-2 hover:bg-gray-600/20 rounded mb-1"}>
                        <span className={"mr-2 ml-3"}>
                            <PersonOutline className={"dark:text-slate-400 text-gray-500 w-5 h-5"}/>
                        </span>
                        <span className={"font-semibold dark:text-slate-400 text-gray-500"}>My documents</span>
                        <span className={"ml-auto mr-3"}>
                          {open
                              ? <FaChevronUp className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                              : <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                          }
                    </span>
                    </div>
                </button>
                <div className={`${open ? "h-full" : "h-0"} ml-7 overflow-hidden`}>
                    {tree.map((subItem, index) => {
                        return (
                            <SideItem
                                items={subItem}
                                key={index}
                                depth={0}
                                currentNote={props.currentNote}
                                folderHandleClick={props.folderHandleClick}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
