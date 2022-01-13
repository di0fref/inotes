import {Divider, IconButton, ListItemIcon, ListItemText, MenuItem, Menu, MenuList, Switch} from "@mui/material";
import {useEffect, useState} from "react";
import {Delete, Edit, EditOff, PictureAsPdf, Share} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuButtonIcon from "../MenuButtonIcon";

function NoteMenu(props) {

    const isDense = true

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [locked, setLocked] = useState([]);

    useEffect(() => {
        setLocked()
    },[props.currentNote.locked])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        props.currentNote.locked?setLocked(["locked"]):setLocked([])
    }, [props.currentNote.locked])

    const handleToggle = (value) => () => {
        const currentIndex = locked.indexOf(value);
        const newChecked = [...locked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setLocked(newChecked);

        /* Lock/unlock document for editing*/
        props.setLockedHandle(locked.indexOf('locked')?1:0)
    };
    return (
        <>
            <MenuButtonIcon
                onClick={handleClick}
                aria-haspopup="true">
                <MoreVertIcon style={{width: "20px", height: "20px"}}/>
            </MenuButtonIcon>
            <Menu
                PaperProps={{
                    style: {
                        minWidth: 300
                    }
                }}
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open}>
                <MenuItem dense={isDense}>
                    <ListItemIcon>
                        <PictureAsPdf/>
                    </ListItemIcon>
                    <ListItemText>Download PDF</ListItemText>
                </MenuItem>
                <MenuItem dense={isDense}>
                    <ListItemIcon>
                        <Edit/>
                    </ListItemIcon>
                    <ListItemText>Protect editing</ListItemText>
                    <Switch
                        edge="end"
                        onChange={handleToggle('locked')}
                        checked={locked.indexOf('locked') !== -1}/>
                </MenuItem>
                <MenuItem dense={isDense}>
                    <ListItemIcon>
                        <Share/>
                    </ListItemIcon>
                    <ListItemText>Share document</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem dense={isDense}>
                    <ListItemIcon>
                        <Delete/>
                    </ListItemIcon>
                    <ListItemText>Move to trash</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default NoteMenu