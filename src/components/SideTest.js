import {useEffect, useState} from "react";
import {
    Article, ArticleOutlined,
    Close, Folder, FolderOutlined, Menu, PersonOutline, Search
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {Link, useNavigate} from "react-router-dom";
import {
    FaArrowDown, FaCaretDown, FaCaretRight,
    FaChevronDown,
    FaChevronRight, FaEllipsisV, FaFolder,
    FaLock, FaPlus, FaRegFileAlt,
    FaRegFolder, FaSearch, FaTimes
} from "react-icons/fa";
import NewMenu from "./Menus/NewMenu";
import UserMenu from "./Menus/UserMenu";
import {Modal, Tooltip} from "@mui/material";
import Bookmarks from "./Bookmarks";
import Recents from "./Recents";
import Tags from "./Tags";
import NotesService from "../service/NotesService";
import FolderService from "../service/FolderService";
import {ItemTypes} from "./Constants";
import {useDrop, useDrag} from "react-dnd";
import {CgFileDocument} from "react-icons/cg";
import TrashList from "./TrashList";
import FolderMenu from "./Menus/FolderMenu";

function SideItem(props, {isDragging, tool}) {

    const [{opacity}, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: props.items,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.1 : 1,
            }),

            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    switch (item.type) {
                        case "note":
                            console.log(`Moving note ${item.id} into folder ${dropResult.id}`);

                            if (item.id !== dropResult.id) {
                                NotesService.update(item.id, {folder_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler(dropResult.id, item.id);
                                });
                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                        case "folder":

                            /* Make sure we cannot move a parent into a child */

                            console.log(`Moving folder ${item.id} into folder ${dropResult.id}`);
                            // if (item.id !== dropResult.id) {
                            //     FolderService.update(item.id, {parent_id: dropResult.id}).then((result) => {
                            //         /* Send signal to update sidebar */
                            //         props.droppedHandler(dropResult.id, item.id);
                            //     });
                            //
                            // } else {
                            //     console.log("Drag ref == Drop ref:: Skipping");
                            // }
                            break;
                    }
                }
            },
        }), []
    );

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {
        },
        drop: () => ({name: "SidebarLink", id: props.items.id, type: props.items.type}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));


    /* Attach both drag and drop ref to the component. */
    const attacheRef = (el) => {
        drag(el)
        drop(el)
    }

    const isActive = canDrop && isOver;

    const [open, setOpen] = useState(true)
    const navigator = useNavigate()

    const clickHandle = (id, type, folder_id, e) => {
        e.preventDefault()
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
            props.hamburgerClickHandle(false)
        } else {
            // setOpen(!open);
            props.folderClicked(id)
        }
    }

    const [hovering, setHovering] = useState(false)

    const chevronClickHandle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <>
            <a
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                ref={attacheRef} href={"#"}
                className={`
                        ${(props.currentFolder.id === props.items.id) ? "dark:bg-gray-600/20" : ""} 
                        ${isActive ? "bg-blue-500" : ""} 
                        mb-[2px] flex items-center py-2 pl-2 rounded hover:bg-gray-600/20 mr-2
                    `}

                onClick={(e) => clickHandle(props.items.id, props.items.type, props.items.folder_id, e)}
            >

                <div className={"flex items-center"}
                     style={{
                         marginLeft: props.depth * 2,
                     }}
                >
                    <button onClick={chevronClickHandle} className={""}>
                        {(props.items.items && props.items.items.length > 0)
                            ? <div className={"hover:dark:bg-gray-500 rounded h-4 w-4 p-1 flex items-center"}>
                                {open ? <FaCaretDown/> : <FaCaretRight/>}
                            </div>
                            : ""
                        }
                    </button>
                </div>
                <div className={"flex items-center mr-2 ml-1"}>
                    {(props.items.type === "folder")
                        ? <FaRegFolder className={"dark:text-yellow-600 text-yellow-500"}/>
                        : <CgFileDocument className={"dark:text-slate-400 text-dark-gray"}/>}
                </div>
                <div className={`flex truncate items-center dark:text-slate-400 text-dark-gray ${(props.currentFolder.id === props.items.id) ? "dark:text-white" : ""}`}>
                    {props.items.name ? props.items.name : "Untitled"}
                </div>
                {/*{(props.items.type === "folder")*/}
                {/*    ? hovering||1*/}
                {/*        ? <FolderMenu folder={props.items.id} noteCreateHandle={props.noteCreateHandle}/>*/}
                {/*        : null*/}
                {/*    : null*/}
                {/*}*/}
                {/*<button onClick={chevronClickHandle} className={""}>*/}
                {/*    {(props.items.items && props.items.items.length > 0)*/}
                {/*        ? <div className={"hover:dark:bg-gray-500 rounded h-4 w-4 p-1 flex items-center"}>*/}
                {/*            {open ? <FaCaretDown/> : <FaCaretRight/>}*/}
                {/*        </div>*/}
                {/*        : ""*/}
                {/*    }*/}
                {/*</button>*/}
                <span className={"w-4 h-4 ml-auto flex-grow flex items-center"}>
                    {hovering
                        ? <FolderMenu folder={0} noteCreateHandle={props.noteCreateHandle}/>
                        : null}
                    </span>
                <button onClick={() => setOpen(!open)} className={"hover:dark:bg-gray-600 rounded ml-auto mr-2 p-1 flex items-center hover:dark:text-gray-200"}>
                    {props.items.items.length
                        ? open
                            ? <Tooltip title={"Collapse"} placement={"right"}><div><FaChevronDown className={"dark:text-gray-400  text-slate-500 h-3 w-3"}/></div></Tooltip>
                            : <Tooltip title={"Expand"} placement={"right"}><div><FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/></div></Tooltip>
                        :""}
                </button>
            </a>


            {(props.items.items) ? (
                props.items.items.map((subItem, index) => {
                    return (
                        <div key={index} className={`${open ? "h-full" : "h-0"} overflow-hidden`}>
                            <SideItem
                                key={index}
                                items={subItem}
                                depth={props.depth + 10}
                                currentNote={props.currentNote}
                                folderClicked={props.folderClicked}
                                droppedHandler={props.droppedHandler}
                                selected={props.selected}
                                hamburgerClickHandle={props.hamburgerClickHandle}
                                noteCreateHandle={props.noteCreateHandle}
                                currentFolder={props.currentFolder}
                            />
                        </div>
                    )
                })
            ) : null}
        </>
    )
}


export default function SideTest(props) {

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "NotebookHeader", id: 0}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    const navigator = useNavigate()

    const [tree, setTree] = useState(props.treeData)
    const [open, setOpen] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [hovering, setHovering] = useState(false)

    const [selected, setSelected] = useState("");

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    const folderClicked = (id) => {
        navigator(`/folder/${id}`)
    }
    const hamburgerClickHandle = (open) => {
        setSidebarOpen(open)
    }

    const newFolderClickHandle = (e) => {
        e.preventDefault();
        e.stopPropagation()
    }

    const [modelOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: "80vh"
    };
    return (
        <>

            <Modal open={modelOpen} onClose={handleModalClose}>
                <div style={style} className={"px-4 py-2 dark:bg-gray-800 rounded rounded-lg"}>
                    <div className={""}>
                        <div className={"flex items-center justify-start border-b h-12 dark:border-gray-700 mb-2"}>
                            <FaSearch className={"dark:text-gray-400"}/>
                            <input autoFocus placeholder={"Search"} className={"w-full rounded h-8 ml-2 p-2 dark:bg-transparent focus:outline-0"}/>
                        </div>
                        <div className={""}>Recent</div>
                        <div className={""}></div>
                    </div>
                </div>
            </Modal>

            <div onClick={() => hamburgerClickHandle(false)} className={`${sidebarOpen ? "w-full h-full" : "w-0 h-0"} sidebar-overlay`}/>
            <div className={"absolute top-4 left-6 w-10 h-10 text-slate-700 hover:text-slate-900 dark:hover:text-white dark:text-gray-300 block _md:hidden"}>
                <Tooltip title={"Show menu"}>
                    <button onClick={hamburgerClickHandle}><Menu/></button>
                </Tooltip>
            </div>
            <div className={`overflow-auto
                 h-screen
                ${sidebarOpen ? "ml-0" : "-ml-76"}
                z-10
                absolute
                md:static
                transition-all
                ease-on-out
                duration-300
                sidebar
                w-76
                dark:bg-lb
                bg-light-gray
                md:ml-0
                flex-shrink-0
                py_-2
                border-r
                dark:border-gray-700/30`}>

                <div className={"flex flex-col h-full"}>
                    <div>
                        <div className={"mb-2 "}>
                            <UserMenu/>
                        </div>
                        <div className={"px-2 my-4"}>
                            <button onClick={() => setModalOpen(true)} type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-0 shadow-sm rounded-lg text-gray-400 dark:bg-gray-700/50 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700 hover:bg-gray-200">
                                <Search sx={{height: 20, width: 20}}/>
                                <span className="flex-auto text-sm text-gray-500 dark:text-gray-200">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>
                            </button>
                        </div>
                        <div className={"my-2"}>
                            <Bookmarks selected={selected} bookmarked={props.bookMarked} folderClicked={folderClicked}/>
                        </div>
                        <div className={"my-2"}>
                            <Recents selected={selected} recent={false} folderClicked={folderClicked}/></div>
                        <div className={"my-2"}><Tags selected={selected} tagged={false} folderClicked={folderClicked}/>
                        </div>
                        <div className={`text-gray-300 text-sm `}>
                            <button
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                                onClick={() => {
                                    folderClicked(0)
                                }}
                                className={`w-full px-2 `}>
                                <div className={`${(props.currentFolder.id == 0) ? "dark:bg-gray-600/20" : ""} flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 ${isActive ? "bg-blue-500 text-white" : ""}`} ref={drop} role="card">
                                    <span className={"mr-2 ml-2"}>
                                        <ArticleOutlined className={"dark:text-slate-400 text-gray-500 w-5 h-5"}/>
                                    </span>
                                    <span className={`font-semibold dark:text-slate-400 text-gray-500 ${(props.currentFolder.id == 0) ? "dark:text-white" : ""}`}>Documents</span>

                                    <span className={"w-4 h-4 ml-auto flex-grow flex items-center"}>
                                        {hovering
                                            ? (
                                                <Tooltip title={"Create folder"}>
                                                    <button  onClick={newFolderClickHandle} className={"mr-2 h-5 w-5 text-slate-800 dark:text-slate-400 dark:hover:text-white hover:text-white flex items-center justify-center ml-auto hover:bg-blue-600 rounded rounded-sm "}>
                                                        <FaPlus className={"h-5 w-5 p-1"}/>
                                                    </button>
                                                </Tooltip>
                                            )
                                            : null}
                                        </span>
                                    <button onClick={() => setOpen(!open)} className={"hover:dark:bg-gray-500 rounded ml-auto mr-2 p-1 flex items-center"}>
                                        {open
                                            ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                                            : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                                        }
                                    </button>
                                </div>
                            </button>
                            <div className={`${open ? "h-full mb-4" : "h-0 py-0 overflow-hidden"} bg:highlight-white rounded ml-4`}>
                                {tree.map((subItem, index) => {
                                    return (
                                        <SideItem
                                            items={subItem}
                                            key={index}
                                            depth={0}
                                            currentNote={props.currentNote}
                                            folderClicked={folderClicked}
                                            droppedHandler={props.droppedHandler}
                                            selected={selected}
                                            hamburgerClickHandle={hamburgerClickHandle}
                                            noteCreateHandle={props.noteCreateHandle}
                                            currentFolder={props.currentFolder}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={"mt-auto"}>
                        <TrashList trashed={props.trashed}/>
                    </div>
                </div>
            </div>
        </>
    )
}
