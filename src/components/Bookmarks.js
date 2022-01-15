import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, ArticleOutlined, ExpandLess, ExpandMore, Star} from "@mui/icons-material";

function Bookmarks(props) {
    const [bookmarks, setBookmarks] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        NotesService.getBookMarks().then((result) => {
            setBookmarks(result.data)
        })
    }, [props.bookmarked])

    const clickHandler = () => {
        setOpen(!open)
    }
    return (
        <List dense>
            <ListItem disablePadding>
                <ListItemButton onClick={clickHandler}>
                    <ListItemIcon>
                        <Star className={"text-yellow-400"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <span className={"font-semibold dark:text-gray-400 text-gray-700"}>Starred</span>
                    </ListItemText>
                    {open ? <ExpandLess className={"dark:text-gray-400 text-gray-700"}/> : <ExpandMore className={"dark:text-gray-400 text-gray-700"}/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                {bookmarks.length ?
                    bookmarks.map((item, index) => {
                        return (
                            <ListItem disablePadding key={index} sx={{pl: 2.5}}>
                                <ListItemButton>
                                    <ListItemIcon><ArticleOutlined sx={{width:16}} className={"dark:text-gray-400 text-gray-700"}/></ListItemIcon>
                                    <ListItemText><span className={"dark:text-gray-400 text-gray-700"}>{item.name?item.name:"Untitled"}</span></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    }) :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>
                        Your favourite documents will be sent here.
                    </div>}
            </Collapse>
        </List>
    )
}

export default Bookmarks
