import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

function Tags(props) {
    const [tags, setTags] = useState([])

    useEffect(() => {
        // NotesService.getBookMarks().then((result) => {
        //     setTags(result.data)
        // })
    }, [props.tagged])

    return (
        !tags.length
            ?<div className={"dark:highlight-white text-sm p-3  rounded rounded-lg bg-gray-700/30 mt-2 text-gray-400"}>
                Tags will end up here.
            </div>
            :
        tags.map((item, index) => {
            return (
                <ListItem disablePadding key={index}>
                    <ListItemButton>
                        <ListItemText inset><span className={"text-gray-400"}>{item.name}</span> </ListItemText>
                    </ListItemButton>
                </ListItem>
            )
        })
    )
}

export default Tags
