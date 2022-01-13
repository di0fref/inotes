
const {styled, IconButton} = require("@mui/material");

const MenuButtonIcon = styled(IconButton)(({theme, color = 'primary'}) => ({
    ':hover': {
        backgroundColor: 'var(--bg-button-over)',
        color:"white",
    },
    // color:"var(--text-normal)",
    borderRadius: "5px",
    padding: "0.2rem",
}));

export default MenuButtonIcon;
