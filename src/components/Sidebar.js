import {useEffect, useState} from "react";
import {
    Checkbox,
    Collapse, Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import {
    Add,
    Alarm, Article,
    ExpandLess,
    ExpandMore,
    FolderOutlined, MoreVert, PersonOutlined, Search,
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
                        <span className={"font-medium text-gray-400"}>
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

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    const folderHandleClick = (id) => {
        props.folderHandleClick(id);
        // setSelected(id);
        // navigator("/" + id)
    }

    return (
        <div className={"sidebar sm:w-76 w-full h-screen bg-lb sm:ml-0 -ml-76 flex-shrink-0 p-4"}>

            <UserMenu/>
            <div className={""}>
                <button className={"border border-gray-600/60 bg-gray-700/50 rounded rounded-lg w-full py-1 hover:bg-gray-600/50 text-gray-500 hover:text-gray-300"}>
                    <div className={"flex items-center"}>
                        <div className={"mx-2"}><Search/></div>
                        <div className={""}>Search</div>
                    </div>
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
                                    <span className={"font-medium text-gray-400"}>My documents</span>
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

    )
}

export default Sidebar
