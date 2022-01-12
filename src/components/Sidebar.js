import {useEffect, useState} from "react";
import {
    Checkbox,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import {
    Alarm, Article,
    ExpandLess,
    ExpandMore,
    FolderOutlined, MoreVert, PersonOutlined, Search,
    Star,
    Tag,
} from "@mui/icons-material";
import TrashList from "./TrashList";
import {sidebarListStyle, sidebarListButton} from "./styles/styles"
import {Link, useNavigate} from "react-router-dom";
import Bookmarks from "./Bookmarks";
import Tags from "./Tags";

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
            <ListItem disablePadding
                      sx={{my: 0.5}}
                      key={`${props.items.id}`}
                      selected={
                          props.items.type === "note"
                              ? (props.currentNote.id === props.items.id)
                              : null
                      }>
                <ListItemButton sx={{pl: props.depth * 2}} onClick={
                    () => {
                        clickHandle(props.items.id, props.items.type, props.items.folder_id)
                    }}>
                    <ListItemIcon>
                        {props.items.type === "folder"
                            ? <FolderOutlined/>
                            : <Article/>}
                    </ListItemIcon>
                    <ListItemText>
                        <span className={"font-medium text-gray-400 "}>
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
        setSelected(id);
        // navigator("/" + id)
    }

    return (
        <div className={"sidebar w-72 _w-full h-screen bg-lb sm:ml-0 -ml-72 flex-shrink-0 p-2"}>

            <div className={"h-10 p-3"}>Avatar Menu</div>

            {/*<div className={"px-3"}>*/}
            {/*    <button className={"w-full bg-blue-600 hover:bg-blue-800 rounded h-8 mt-2 hover:pointer"}>*/}
            {/*        <div className={"flex items-center"}>*/}
            {/*            <div className={"ml-3 font-semibold text-sm"}>Create new</div>*/}
            {/*            <div className={"ml-auto mr-2"}><ExpandMore/></div>*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className={""}>
                <button className={"border border-gray-600/60 bg-gray-700/50 rounded rounded-lg w-full py-1 hover:bg-gray-600/50 text-gray-500 hover:text-gray-300"}>
                    <div className={"flex items-center"}>
                        <div className={"mx-2"}><Search/></div>
                        <div className={""}>Search</div>
                    </div>
                </button>
            </div>

            <div className={"flex flex-col h-full sidebar-list overflow-y-auto"}>
                <div className={"flex-grow "}>
                    <List dense style={sidebarListStyle}>
                        <ListItem disablePadding
                                  key={`s1`}
                                  selected={
                                      selected === "starred"
                                  }>
                            <ListItemButton
                                onClick={
                                    () => {
                                        folderHandleClick("starred")
                                        setStarredOpen(!starredOpen)
                                    }
                                }>
                                <ListItemIcon>
                                    <Star className={"text-yellow-400"}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <span className={"font-medium text-gray-400"}>Starred</span>
                                </ListItemText>
                                {starredOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={starredOpen}>
                            <List dense>
                                <Bookmarks bookmarked={props.bookMarked}/>
                            </List>
                        </Collapse>
                    </List>
                    <List dense style={sidebarListStyle}>
                        <ListItem
                            key={`s2`}
                            disablePadding
                            selected={
                                selected === "recent"
                            }>
                            <ListItemButton onClick={() => folderHandleClick("recent")}>
                                <ListItemIcon><Alarm className={""}/></ListItemIcon>
                                <ListItemText><span className={"font-medium text-gray-400"}>Recent</span></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List dense style={sidebarListStyle}>
                        <ListItem
                            key={`s3`}
                            disablePadding
                            selected={
                                selected === "tags"
                            }>
                            <ListItemButton onClick={() => {
                                folderHandleClick("tags")
                                setTagsOpen(!tagsOpen)
                            }
                            }>
                                <ListItemIcon><Tag className={"text-blue-400"}/></ListItemIcon>
                                <ListItemText><span className={"font-medium text-gray-400"}>Tags</span></ListItemText>
                                {tagsOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={tagsOpen}>
                            <Tags bookmarked={props.tagged}/>
                        </Collapse>
                    </List>


                    <List dense style={sidebarListStyle}>
                        <ListItem disablePadding sx={{my: 0.5}} selected={selected === "notes"}

                            // secondaryAction={
                            //     <button>
                            //     <MoreVert
                            //         edge="end"
                            //     />
                            //     </button>
                            // }
                        >
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
