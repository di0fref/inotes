import {useEffect, useState} from "react";
import NotesService from "../service/NotesService";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";
import {sidebarListStyle} from "./styles/styles"


function TrashList() {
    const [trash, setTrash] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        NotesService.getTrash().then((result) => {
            setTrash(result.data)
        })
    }, [])

    return (
        <List dense style={sidebarListStyle}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => {setOpen(!open)}}>
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
