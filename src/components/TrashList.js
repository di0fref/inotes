import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";


function TrashList(props) {
    const [trash, setTrash] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
            NotesService.getTrash().then((result) => {
                setTrash(result.data)
            })
    }, [props.trashed])

    return (
        <List dense>
            <ListItem disablePadding>
                <ListItemButton onClick={() => {
                    setOpen(!open)
                }}>
                    <ListItemIcon><Delete/></ListItemIcon>
                    <ListItemText>Trash</ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                {trash.map((item, index) => {
                    return (
                        <ListItem disablePadding key={index}>
                            <ListItemButton>
                                <ListItemText inset>{item.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>

                    )
                })}
            </Collapse>
        </List>
    )
}

export default TrashList
