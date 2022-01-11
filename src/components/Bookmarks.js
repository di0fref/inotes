import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

function Bookmarks(props) {
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        NotesService.getBookMarks().then((result) => {
            setBookmarks(result.data)
        })
    }, [props.bookmarked])

    return (
        !bookmarks.length
            ?<div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-700/30 mt-2 text-gray-400"}>
                Your favourite documents will be send here.
            </div>
            :
        bookmarks.map((item, index) => {
            return (
                <ListItem disablePadding key={index}>
                    <ListItemButton>
                        <ListItemText inset><span className={"text-gray-400"}>{item.name}</span></ListItemText>
                    </ListItemButton>
                </ListItem>
            )
        })
    )
}

export default Bookmarks
