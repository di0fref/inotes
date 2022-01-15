import {Add, Article, ArticleOutlined, ExpandMore, Folder, FolderOutlined} from "@mui/icons-material";
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
        <div className={"px-3_ mt-3 mb-3 px-4"}>
                <button onClick={handleClick} className={"bg-blue-500 hover:bg-blue-600 w-full px-4 py-2 text-sm font-medium text-white rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}>
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
                    minWidth: 288
                }
            }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
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
                    <ListItemIcon><ArticleOutlined/></ListItemIcon>
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
