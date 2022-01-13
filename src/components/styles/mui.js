import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    width: 16,
                    height: 16
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    marginTop: 2,
                    marginBottom: 2,
                    width: "auto",
                    '&.Mui-selected': {
                        // paddingLeft:0
                        // marginLeft:10
                    },
                },

            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // backgroundColor: "var(--menu-bg)",
                    // color: "var(--menu-color)"
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    marginTop: 10,
                    padding: 0,
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
        // body2: {
            fontSize: "16",
        // },
        fontFamily: [
            "var(--font-family)",
            "serif"
        ].join(','),
    }
});


export default theme
