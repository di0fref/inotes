import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingLeft: 8
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    paddingLeft: 0,
                }
            }
        }
    },
    palette: {
        mode: 'dark',
    },
    typography: {
        // fontSize: 13,
        fontFamily: [
            "Inter",
            "serif"
        ].join(','),
    }
});


export default theme