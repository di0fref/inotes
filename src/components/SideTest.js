import {useEffect, useState} from "react";
import {
    Close, Folder, FolderOutlined, PersonOutline, Search
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {
    FaChevronDown,
    FaChevronRight,
    FaLock, FaRegFileAlt,
    FaRegFolder
} from "react-icons/fa";
import NewMenu from "./Menus/NewMenu";
import UserMenu from "./Menus/UserMenu";
import {Tooltip} from "@mui/material";
import Bookmarks from "./Bookmarks";
import Recents from "./Recents";
import Tags from "./Tags";
import NotesService from "../service/NotesService";
import FolderService from "../service/FolderService";
import {ItemTypes} from "./Constants";
import {useDrop, useDrag} from "react-dnd";

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
                                    props.droppedHandler();
                                });
                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                        case "folder":
                            console.log(`Moving folder ${item.id} into folder ${dropResult.id}`);
                            if (item.id !== dropResult.id) {
                                FolderService.update(item.id, {parent_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler();
                                });

                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
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

    const [open, setOpen] = useState(false)
    const navigator = useNavigate()

    const clickHandle = (id, type, folder_id) => {
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
        } else {
            setOpen(!open);
            props.folderClicked(id)
        }
    }

    return (
        <>
            <button
                onClick={
                    (e) => {
                        setOpen(!open)
                        clickHandle(props.items.id, props.items.type, props.items.folder_id)
                    }
                } className={`w-full px-2`}>
                <div
                    ref={props.items.type === "folder"?(el) => attacheRef(el):drag}
                    role="card"

                    className={`flex items-center py-2 hover:bg-gray-600/20 rounded my-1  ${isActive ? "ring-2 ring-purple-500" : ""}
                    ${props.items.type === "folder"
                        ? (props.selected === props.items.id) ? "bg-gray-600/10" : ""
                        : null
                    }`}
                    style={{
                        marginLeft: props.depth * 1.5,
                    }}>
                    <span className={"mr-2 ml-4"}>
                            <FolderOutlined className={"dark:text-slate-400 text-gray-500 w-5 h-5"}/>
                    </span>
                    <span className={"font-semibold dark:text-slate-400 text-gray-500"}>{props.items.name ? props.items.name : "Untitled"}</span>
                    <span className={"ml-auto mr-2"}>
                      {(props.items.items && props.items.items.length > 0)
                          ? open
                              ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
                              : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>
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
                                folderClicked={props.folderClicked}
                                droppedHandler={props.droppedHandler}
                                selected={props.selected}
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

    const [tree, setTree] = useState(props.treeData)
    const [open, setOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const[selected, setSelected] = useState("");

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    const folderClicked = (id) => {
        props.folderHandleClick(id)
        setSelected(id)
        console.log(id)
    }

    return (
        <div className={`
                z-10
                absolute
                md:static
                transition-all
                ease-on-out
                duration-300
                sidebar
                w-60
                -ml-60
                dark:bg-lb
                bg-slate-100
                md:ml-0
                flex-shrink-0
                py-2
                border-r
                dark:border-gray-700/30`}>

            {/*<div className={"flex items-center justify-between"}>*/}
            {/*    <div className={"pl-4 pr-4 m-0 flex-grow"}>*/}
            {/*        <UserMenu/>*/}
            {/*    </div>*/}
            {/*    <Tooltip title={"Hide menu"}>*/}
            {/*        <button onClick={() => setSidebarOpen(false)} className={"mb-auto mr-2  mt-1 md:hidden block hover:text-white text-gray-300"}>*/}
            {/*            <Close className={""}/>*/}
            {/*        </button>*/}
            {/*    </Tooltip>*/}
            {/*</div>*/}
            {/*<div className={"px-4"}>*/}
            {/*    <button type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700/50 hover:bg-gray-200">*/}
            {/*        <Search sx={{height: 20, width: 20}}/>*/}
            {/*        <span className="flex-auto text-sm text-gray-500">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<NewMenu noteCreateHandle={props.noteCreateHandle}/>*/}

            <div className={"my-2"}><Bookmarks selected={selected} bookmarked={props.bookMarked} folderClicked={folderClicked}/></div>
            <div className={"my-2"}><Recents selected={selected} recent={false} folderClicked={folderClicked}/></div>
            <div className={"my-2"}><Tags selected={selected} tagged={false} folderClicked={folderClicked}/></div>

            <div className={"text-gray-300 text-sm "}>
                {/*<button onClick={() => setOpen(!open)} className={`w-full px-4 `}>*/}
                {/*    <div className={`flex items-center py-2 hover:bg-gray-600/20 rounded mb-1 ${isActive ? "ring-2 ring-purple-500" : ""}`} ref={drop}*/}
                {/*         role="card">*/}
                {/*        <span className={"mr-2 ml-3"}>*/}
                {/*            <PersonOutline className={"dark:text-slate-400 text-gray-500 w-5 h-5"}/>*/}
                {/*        </span>*/}
                {/*        <span className={"font-semibold dark:text-slate-400 text-gray-500"}>My documents</span>*/}
                {/*        <span className={"ml-auto mr-3"}>*/}
                {/*          {open*/}
                {/*              ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                {/*              : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                {/*          }*/}
                {/*    </span>*/}
                {/*    </div>*/}
                {/*</button>*/}
                {/*<div className={`${open ? "h-full" : "h-0"} ml-5 overflow-hidden`}>*/}
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
                            />
                        )
                    })}
                {/*</div>*/}
            </div>
            {/*<Pro treeData={props.treeData}/>*/}
        </div>
    )
}
