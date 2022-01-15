import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    paddingLeft:0,
                    marginTop: 2,
                    marginBottom: 2,
                    width: "auto",
                    '&.Mui-selected': {
                        // paddingLeft:0,
                        // marginLeft:10
                        // color: "rgb(14 165 233)",
                        // backgroundColor: "transparent"
                    },
                    '&:hover': {
                        // color: "rgb(14 165 233)",
                        // backgroundColor: "transparent"
                    },
                },

            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "var(--menu-bg)",
                    // color: "var(--menu-color)"
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingLeft: 6
                }
            }
        },
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
        mode: localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    },
    typography: {
        fontFamily: [
            "var(--font-family)",
            "serif"
        ].join(','),
    }
});


export default theme
