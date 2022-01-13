import {useEffect, useState} from "react";
import {
    Checkbox,
    Collapse, Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, Tooltip
} from "@mui/material";
import {
    Add,
    Alarm, Article, Close,
    ExpandLess,
    ExpandMore,
    FolderOutlined, Menu, MenuBookTwoTone, MoreVert, PersonOutlined, Search,
    Star,
    Tag,
} from "@mui/icons-material";
import TrashList from "./TrashList";
import {sidebarListButton} from "./styles/styles"
import {Link, useNavigate} from "react-router-dom";
import Bookmarks from "./Bookmarks";
import Tags from "./Tags";
import Recents from "./Recents";
import UserMenu from "./Menus/UserMenu";

function SidebarItem(props) {

    const [open, setOpen] = useState(true);
    const navigator = useNavigate()

    useEffect(() => {
    }, [props.currentNote.id])

    const clickHandle = (id, type, folder_id) => {
        if (type === "note") {
            navigator(`/folder/${folder_id}/note/${id}`)
        } else {
            setOpen(!open);
        }
    }

    return (
        <>
            <ListItem
                sx={{
                    ml: props.depth * 2.5,
                    pl: props.depth * 0.5
                }}
                disablePadding
                key={`${props.items.id}`}
                selected={
                    props.items.type === "note"
                        ? (props.currentNote.id === props.items.id)
                        : null
                }>
                <ListItemButton onClick={
                    () => {
                        clickHandle(props.items.id, props.items.type, props.items.folder_id)
                    }}>

                    <ListItemIcon>
                        {props.items.type === "folder"
                            ? <FolderOutlined sx={{width: 16}}/>
                            : <Article sx={{width: 16}}/>}
                    </ListItemIcon>
                    <ListItemText>
                        <span className={"font-medium_ text-gray-400"}>
                                {props.items.name}
                        </span>
                    </ListItemText>
                    {props.items.items
                        ? open ? <ExpandLess/> : <ExpandMore/>
                        : null
                    }
                </ListItemButton>
            </ListItem>
            {(props.items.items) ? (
                <Collapse in={open} timeout="auto">
                    {/*<List dense style={sidebarListStyle}>*/}
                    {props.items.items.map((subItem, index) => {
                        return (
                            <SidebarItem
                                currentFolder={props.currentFolder}
                                key={index}
                                items={subItem}
                                depth={props.depth + 1}
                                selectedNote={props.selectedNote}
                                setSelectedNote={props.setSelectedNote}
                                currentNote={props.currentNote}
                            />
                        )
                    })}
                    {/*</List>*/}
                </Collapse>
            ) : null}
        </>
    )
}

function Sidebar(props) {

    const [tree, setTree] = useState(props.treeData)
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState(0);
    const navigator = useNavigate()
    const [starredOpen, setStarredOpen] = useState(false)
    const [recentOpen, setRecentOpen] = useState(false)
    const [tagsOpen, setTagsOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    const folderHandleClick = (id) => {
        props.folderHandleClick(id);
        // setSelected(id);
        // navigator("/" + id)
    }


    const hamburgerClickHandle = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (
        <>
            <div className={"absolute top-4 left-4 w-10 h-10 hover:text-white text-gray-300"}>
                <Tooltip title={"Show menu"}>
                    <button onClick={hamburgerClickHandle}><Menu/></button>
                </Tooltip>
            </div>
            <div className={`
                z-10
                absolute 
                md:static
                transition-all
                ease-on-out
                duration-300
                sidebar 
                w-76
                w-3/4_
                h-screen 
                -ml-76
                bg-lb 
                md:ml-0 
                ${sidebarOpen ? "ml-0" : "-ml-76"}
                flex-shrink-0 
                px-4 
                py-2 
                border-r 
                dark:border-gray-700/30`}>

                <div className={"flex items-center justify-between"}>
                    <UserMenu/>
                    <Tooltip title={"Hide menu"}>
                        <button onClick={() => setSidebarOpen(false)} className={"mb-auto mt-1 md:hidden block ml-4 hover:text-white text-gray-300"}>
                            <Close className={""}/>
                        </button>
                    </Tooltip>
                </div>
                <div className={""}>
                    <button type="button" className="flex w-full items-center text-left space-x-3 px-4 h-10 bg-white ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white dark:hover:bg-gray-700">
                        <Search sx={{height:20, width: 20}}/>
                        <span className="flex-auto text-sm text-gray-200">Quick search...</span><kbd className="font-sans font-semibold dark:text-gray-500"><abbr title="Command" className="no-underline text-gray-300 dark:text-gray-500">⌘</abbr> K</kbd>
                    </button>
                </div>

                <div className={"px-3_ mt-3"}>
                    <button className={"w-full bg-blue-600 hover:bg-blue-800 rounded h-9 mt-2 hover:pointer"}>
                        <div className={"flex items-center"}>
                            <div className={"ml-2 mr-2"}><Add/></div>
                            <div className={"font-semibold text-sm"}>Create new</div>
                            <div className={"ml-auto mr-4"}><ExpandMore/></div>
                        </div>
                    </button>
                </div>

                <div className={"flex flex-col h-full sidebar-list overflow-y-auto"}>
                    <div className={"flex-grow "}>

                        <Bookmarks bookmarked={props.bookMarked}/>
                        <Recents recent={false}/>
                        <Tags tagged={false}/>

                        <List dense>
                            <ListItem
                                disablePadding
                                selected={selected === "notes"}>
                                <ListItemButton
                                    onClick={
                                        () => {
                                            setOpen(!open)
                                            folderHandleClick("notes")
                                        }
                                    }>
                                    <ListItemIcon><PersonOutlined/></ListItemIcon>
                                    <ListItemText>
                                        <span className={"font-semibold text-gray-400"}>My documents</span>
                                    </ListItemText>
                                    {open ? <ExpandLess/> : <ExpandMore/>}
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {tree.map((subItem, index) => {
                                    return (
                                        <SidebarItem
                                            currentFolder={props.currentFolder}
                                            items={subItem}
                                            key={index}
                                            depth={1}
                                            folderHandleClick={folderHandleClick}
                                            currentNote={props.currentNote}
                                        />
                                    )
                                })}
                            </Collapse>
                        </List>
                    </div>
                    <div className={"mt-auto"}>
                        {/*<Shared/>*/}
                        <TrashList trashed={props.trashed}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
