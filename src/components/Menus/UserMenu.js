import {
    Button,
    Divider,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Switch
} from "@mui/material";
import {useEffect, useState} from "react";
import {Construction, Help, Logout} from "@mui/icons-material";
import {getAuth} from "firebase/auth";
import ThemeSwitcher from "../ThemeSwitcher";

function UserMenu() {

    const [anchorEl, setAnchorEl] = useState(null)
    const [dark, setDark] = useState(false)
    const open = Boolean(anchorEl);

    useEffect(() => {

    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = getAuth().currentUser

    const handleToggle = () => {
    }
    return (
        <div className={"h-14 w-full mb-4 pt-1 hover:bg-gray-200 dark:hover:bg-gray-700/80 rounded dark:text-gray-400 text-gray-700"}>
            <button onClick={handleClick} className={"w-full py-1 mb-2 px-2"}>
                <div className={"flex items-center justify-start"}>
                    <div className="avatar w-10 h-10 mr-1">
                        <img src={user.photoURL} className="rounded-full p-1 bg-darker border-1" alt={"Avatar"}/>
                    </div>
                    <div className={"text-left ml-1"}>
                        <p className={"font-semibold text-sm"}>{user.displayName}</p>
                        <p className={"text-muted text-xs"}>{user.email}</p>
                    </div>
                </div>
            </button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                  }}
                  PaperProps={{
                      style: {
                          minWidth: 288
                      }
                  }}>
                <MenuItem dense>
                    <ListItemIcon><Construction/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                {/*<MenuItem dense>*/}
                {/*    <ListItemIcon><Construction/></ListItemIcon>*/}
                {/*    <ListItemText><ThemeSwitcher/></ListItemText>*/}
                {/*</MenuItem>*/}
                <MenuItem dense>
                    <ListItemIcon><Help/></ListItemIcon>
                    <ListItemText>Help</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem dense>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu
