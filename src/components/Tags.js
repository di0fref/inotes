import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, ExpandLess, ExpandMore, Star, Tag} from "@mui/icons-material";

function Tags(props) {
    const [tags, setTags] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {


    }, [props.tagged])

    const clickHandler = () => {
        setOpen(!open)
    }
    return (
        <List dense>
            <ListItem disablePadding>
                <ListItemButton onClick={clickHandler}>
                    <ListItemIcon>
                        <Tag className={"text-blue-400"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <span className={"font-semibold text-gray-400"}>Tags</span>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                {tags.length ?
                    tags.map((item, index) => {
                        return (
                            <ListItem disablePadding key={index} sx={{pl: 4}}>
                                <ListItemButton>
                                    <ListItemIcon><Tags className={"text-blue-400"}/></ListItemIcon>
                                    <ListItemText><span className={"text-gray-400"}>{item.name}</span></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    }) :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-700/30 mt-2 text-gray-400"}>
                        Your tags will be sent here.
                    </div>}
            </Collapse>
        </List>
    )
}

export default Tags
