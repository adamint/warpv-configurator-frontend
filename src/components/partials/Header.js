import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom"

export default function Header({classes, handleDrawerToggle}) {
    return <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap>
                <Link to="/" className="no-decorate white">WARP-V Configurator</Link>
            </Typography>
        </Toolbar>
    </AppBar>
}