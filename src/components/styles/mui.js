import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    width: 16
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    marginTop: 2,
                    marginBottom: 2,
                    width: "auto"
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    // background:"rgb(55 65 81 / var(--tw-bg-opacity))",
                    marginTop: 10,
                    padding: 0,
                }
            }
        },
        //     MuiListItemButton: {
        //         styleOverrides: {
        //             root: {
        //                 paddingLeft: 8
        //             }
        //         }
        //     },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 0,
                    marginRight: "0.5em"
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
