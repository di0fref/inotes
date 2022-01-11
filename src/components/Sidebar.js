import {useEffect, useState} from "react";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {
    Alarm, Article,
    ExpandLess,
    ExpandMore,
    FolderOutlined, MenuBook, MenuBookTwoTone, Search,
    Star,
    Tag,
} from "@mui/icons-material";
import TrashList from "./TrashList";
import {sidebarListStyle, sidebarListButton} from "./styles/styles"
import {Link, useNavigate} from "react-router-dom";

function SidebarItem(props) {

    const [open, setOpen] = useState(false);
    const navigator = useNavigate()

    useEffect(() => {
        console.log("useEffect");
    }, [props.selectedNote])

    const clickHandle = (id, type) => {
        if (type === "note") {
            props.setSelectedNote(id);
            navigator(`/notes/${id}`)
        } else {
            setOpen(!open);
        }
    }

    return (
        <>
            <ListItem disablePadding
                      key={`${props.items.id}`}
                      selected={
                          props.items.type === "note"
                              ? (props.selectedNote === props.items.id)
                              : null
                      }>
                <ListItemButton sx={{
                    pl: props.depth * 3.5,
                     // my: 0.5,
                }} onClick={
                    () => {
                        clickHandle(props.items.id, props.items.type)
                    }

                }>
                    <ListItemIcon>
                        {props.items.type === "folder"
                            ? <FolderOutlined/>
                            : <Article/>}
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
                                    key={index}
                                    items={subItem}
                                    depth={props.depth + 1}
                                    selectedNote={props.selectedNote}
                                    setSelectedNote={props.setSelectedNote}
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
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [selectedNote, setSelectedNote] = useState("")
    const navigator = useNavigate()

    useEffect(() => {
        setTree(props.treeData)
    }, [props.treeData])

    const folderHandleClick = (id) => {
        props.folderHandleClick(id);
        setSelected(id);
                    navigator("/"+id)

    }

    return (
        <div className={"sidebar w-72 _w-full h-screen bg-lb sm:ml-0 -ml-72 flex-shrink-0 "}>

            <div className={"h-10 p-3"}>Avatar Menu</div>

            {/*<div className={"px-3"}>*/}
            {/*    <button className={"w-full bg-blue-600 hover:bg-blue-800 rounded h-8 mt-2 hover:pointer"}>*/}
            {/*        <div className={"flex items-center"}>*/}
            {/*            <div className={"ml-3 font-semibold text-sm"}>Create new</div>*/}
            {/*            <div className={"ml-auto mr-2"}><ExpandMore/></div>*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className={"px-3"}>
                <button className={"border border-gray-600/60 bg-gray-700/50 rounded rounded-lg w-full py-1 hover:bg-gray-600/50 text-gray-500 hover:text-gray-300"}>
                    <div className={"flex items-center"}>
                        <div className={"mx-2 "}><Search/></div>
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
                            <ListItemButton onClick={() => folderHandleClick("starred")}>
                                <ListItemIcon>
                                    <Star className={"text-yellow-500"}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <span className={"font-medium text-gray-400"}>Starred</span>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List dense style={sidebarListStyle}>
                        <ListItem
                            key={`s2`}
                            disablePadding
                            selected={
                                selected === "recent"
                            }>
                            <ListItemButton onClick={() => folderHandleClick("recent")}>
                                <ListItemIcon><Alarm/></ListItemIcon>
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
                            <ListItemButton onClick={() => folderHandleClick("tags")}>
                                <ListItemIcon><Tag/></ListItemIcon>
                                <ListItemText><span className={"font-medium text-gray-400"}>Tags</span></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>


                    <List dense style={sidebarListStyle}>
                        <ListItem disablePadding
                                  selected={
                                      selected === "notes"
                                  }>
                            <ListItemButton
                                onClick={
                                    () => {
                                        setOpen(!open)
                                        folderHandleClick("notes")
                                    }
                                }>
                                <ListItemIcon><FolderOutlined/></ListItemIcon>
                                <ListItemText><span className={"font-medium text-gray-400"}>My documents</span></ListItemText>
                                {open ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {tree.map((subItem, index) => {
                                return (
                                    <SidebarItem
                                        items={subItem}
                                        key={index}
                                        depth={1}
                                        folderHandleClick={folderHandleClick}
                                        selectedNote={selectedNote}
                                        setSelectedNote={setSelectedNote}/>
                                )
                            })}
                        </Collapse>
                    </List>
                </div>
                <div className={"mt-auto"}>
                    {/*<Shared/>*/}
                    <TrashList/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
