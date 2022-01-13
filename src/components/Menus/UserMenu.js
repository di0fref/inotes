import {Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {Construction, Help, Logout} from "@mui/icons-material";
import {getAuth} from "firebase/auth";

function UserMenu() {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = getAuth().currentUser

    return (
        <div className={"border-b_ _dark:border-gray-700 h-14 _bg-gray-900 mb-2 pt-1 hover:bg-gray-700/80 rounded"}>
            <button onClick={handleClick} className={"w-full   py-1 mb-2 px-2"}>
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
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                  }}
                  PaperProps={{
                      style: {
                          minWidth: 200
                      }
                  }}>
                <MenuItem>
                    <ListItemIcon><Construction/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon><Help/></ListItemIcon>
                    <ListItemText>Help</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu