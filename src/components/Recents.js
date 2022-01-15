import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Alarm, Article, ExpandLess, ExpandMore, Star} from "@mui/icons-material";

function Recents(props) {
    const [recents, setRecents] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        NotesService.getRecent().then((result) => {
            setRecents(result.data)
        })
    }, [props.recent])

    const clickHandler = () => {
        setOpen(!open)
    }
    return (
        <List dense>
            <ListItem disablePadding>
                <ListItemButton onClick={clickHandler}>
                    <ListItemIcon>
                        <Alarm className={"dark:text-gray-400 text-gray-700"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <span className={"font-semibold dark:text-gray-400 text-gray-700"}>Recent</span>
                    </ListItemText>
                    {open ? <ExpandLess className={"dark:text-gray-400 text-gray-700"}/> : <ExpandMore className={"dark:text-gray-400 text-gray-700"}/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                {recents.length ?
                    recents.map((item, index) => {
                        return (
                            <ListItem disablePadding key={index} sx={{pl: 2.5}}>
                                <ListItemButton>
                                    <ListItemIcon><Article sx={{width:16}}/></ListItemIcon>
                                    <ListItemText><span className={"text-gray-400"}>{item.name}</span></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    }) :
                    <div className={"dark:highlight-white text-sm p-3 rounded rounded-lg bg-gray-200 dark:bg-gray-700/30 mt-2 dark:text-gray-400 text-gray-700"}>
                        Your recent documents will be sent here.
                    </div>}
            </Collapse>
        </List>
    )
}

export default Recents
