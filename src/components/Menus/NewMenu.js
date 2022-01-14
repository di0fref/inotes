import {Add, Article, ExpandMore, Folder, FolderOutlined} from "@mui/icons-material";
import {ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";

export default function NewMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={"px-3_ mt-3"}>
            <button className={"w-full bg-blue-600 hover:bg-blue-800 rounded h-9 mt-2 hover:pointer"} onClick={handleClick}>
                <div className={"flex items-center"}>
                    <div className={"ml-2 mr-2"}><Add/></div>
                    <div className={"font-semibold text-sm"}>Create new</div>
                    <div className={"ml-auto mr-4"}><ExpandMore/></div>
                </div>
            </button>
            <Menu
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open} PaperProps={{
                style: {
                    minWidth: 220
                }
            }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem dense
                          onClick={() => {
                              handleClose()
                              props.noteCreateHandle()
                          }}>
                    <ListItemIcon><Article/></ListItemIcon>
                    <ListItemText>Document</ListItemText>
                </MenuItem>
                <MenuItem dense
                          onClick={() => {
                              handleClose()
                          }}>
                    <ListItemIcon><FolderOutlined/></ListItemIcon>
                    <ListItemText>Folder</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}