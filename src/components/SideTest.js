import {useEffect, useState} from "react";
import {
    Article, ArticleOutlined,
    Close, Folder, FolderOutlined, PersonOutline, Search
} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {
    FaArrowDown, FaCaretDown, FaCaretRight,
    FaChevronDown,
    FaChevronRight, FaFolder,
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
import {CgFileDocument} from "react-icons/cg";

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
                                    props.droppedHandler(dropResult.id, item.id);
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

    const [open, setOpen] = useState(true)
    const navigator = useNavigate()

    const clickHandle = (id, type, folder_id, e) => {
        e.preventDefault()
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
        }
        else {
            // setOpen(!open);
            props.folderClicked(id)
            navigator(`/folder/${id||0}`)
        }
    }

    useEffect(() =>{
    },[props])

    const chevronClickHandle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }
    return (
        <>
            <a ref={attacheRef} href={"#"} className={`${(props.selected === props.items.id) ? "dark:bg-gray-600/20" : ""} ${isActive ? "bg-blue-500" : ""} ml-4 text-dark-gray flex items-center dark:text-gray-200 p-2 rounded dark:hover:bg-slate-700 mx-2`} onClick={(e) => clickHandle(props.items.id, props.items.type, props.items.folder_id, e)}>
                <div className={"flex items-center"}
                     style={{
                         marginLeft: props.depth * 2,
                     }}>
                    <button onClick={chevronClickHandle} className={""}>
                        {(props.items.items && props.items.items.length > 0)
                            ? <div className={"hover:dark:bg-gray-500 rounded h-4 w-4 p-1 flex items-center"}>
                                {open?<FaCaretDown/>:<FaCaretRight/>}
                            </div>
                            :""
                        }
                    </button>
                </div>
                <div className={"flex items-center mr-2 ml-1"}>
                    {(props.items.type === "folder")
                        ? <FaRegFolder className={"dark:text-yellow-600 text-yellow-500"}/>
                        : <CgFileDocument/>}
                </div>
                <div className={"flex truncate items-center"}>
                    {props.items.name ? props.items.name : "Untitled"}
                </div>
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
    const [open, setOpen] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [selected, setSelected] = useState("");

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    useEffect(() => {
        setSelected(props.folder.id)
    }, [ props.folder])

    const folderClicked = (id) => {
        props.folderHandleClick(id)
        setSelected(id)
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
                w-76
                -ml-76
                dark:bg-lb
                bg-light-gray
                md:ml-0
                flex-shrink-0
                py-2
                border-r
                dark:border-gray-700/30`}>

            <div className={"my-2"}>
                <Bookmarks selected={selected} bookmarked={props.bookMarked} folderClicked={folderClicked}/></div>
            <div className={"my-2"}><Recents selected={selected} recent={false} folderClicked={folderClicked}/></div>
            <div className={"my-2"}><Tags selected={selected} tagged={false} folderClicked={folderClicked}/></div>

            <div className={"text-gray-300 text-sm "}>
                <button
                    onClick={
                        () => {
                            // setOpen(!open)
                            folderClicked("docs")
                        }
                    }
                    className={`w-full px-2 `}>
                    <div className={` ${(selected === "docs" || selected===0) ? "dark:bg-gray-600/20" : ""} flex items-center py-2 dark:hover:bg-slate-700 rounded mb-1 ${isActive ? "bg-blue-500 text-white" : ""}`} ref={drop}
                         role="card">
                        <span className={"mr-2 ml-2"}>
                            <ArticleOutlined className={"dark:text-slate-400 text-gray-500 w-5 h-5"}/>
                        </span>
                        <span className={"font-semibold dark:text-slate-400 text-gray-500"}>Documents</span>
                        {/*<span className={"ml-auto mr-3"}>*/}
                        {/*      {open*/}
                        {/*          ? <FaChevronDown className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                        {/*          : <FaChevronRight className={"dark:text-gray-400 text-slate-500 h-3 w-3"}/>*/}
                        {/*      }*/}
                        {/*</span>*/}
                    </div>
                </button>
                <div className={`${open ? "h-full" : "h-0"} bg-gray-900/30_ _mx-2 highlight-white rounded overflow-hidden`}>
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
                </div>
            </div>
        </div>
    )
}
