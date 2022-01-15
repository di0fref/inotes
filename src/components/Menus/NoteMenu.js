import {Divider, ListItemIcon, ListItemText, MenuItem, Menu, Switch} from "@mui/material";
import {useEffect, useState} from "react";
import {Delete, Edit, PictureAsPdf, Share} from "@mui/icons-material";
import {ChevronDownIcon} from "@heroicons/react/solid";

function NoteMenu(props) {

    const isDense = true

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [locked, setLocked] = useState([]);

    useEffect(() => {
        setLocked()
    }, [props.currentNote.locked])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        props.currentNote.locked ? setLocked(["locked"]) : setLocked([])
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
        props.setLockedHandle(locked.indexOf('locked') ? 1 : 0)
    };
    return (
        <>
            <button onClick={handleClick} className={"bg-blue-500 hover:bg-blue-600 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}>
                <div className={"flex items-center"}>
                    <p className={"font-semibold text-sm"}>Options</p>

                    <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                    />
                </div>

            </button>
            <Menu
                PaperProps={{
                    style: {
                        minWidth: 300
                    }
                }}
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open}>
                <MenuItem dense={isDense} onClick={() => {
                    handleClose()
                }}>
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
                <MenuItem dense={isDense} onClick={() => {
                    handleClose()
                }}>
                    <ListItemIcon>
                        <Share/>
                    </ListItemIcon>
                    <ListItemText>Share document</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem dense={isDense} onClick={() => {
                    handleClose()
                }}>
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
