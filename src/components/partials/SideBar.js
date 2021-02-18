import {Divider, Drawer, Hidden, List, ListItem, ListItemText} from "@material-ui/core";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";

export default function SideBar({classes, handleDrawerToggle, mobileOpen, theme, window}) {
    const container = window !== undefined ? () => window().document.body : undefined;
    const history = useHistory()

    const drawer = <div>
        <a href="https://www.redwoodeda.com/" target="_blank" rel="noreferrer">
            <img src="/redwood-logo.png" width="100%" alt="redwood logo"/>
        </a>

        <Divider/>
        <List>
            <ListItem button key="Home" component={NavLink} to="/" className="black no-decorate"
                      activeClassName="Mui-selected" exact>
                <ListItemText primary="Home"/>
            </ListItem>

            <ListItem button key="CPU configuration" component={NavLink} to="/configure/cpu" className="black no-decorate"
                      activeClassName="Mui-selected" exact>
                <ListItemText primary="CPU configuration"/>
            </ListItem>

            <ListItem button key="CPU stage" component={NavLink} to="/configure/stage" className="black no-decorate"
                      activeClassName="Mui-selected" exact>
                <ListItemText primary="CPU stage"/>
            </ListItem>

            <ListItem button key="Enter JSON Configuration" component={NavLink} to="/configure/json" className="black no-decorate"
                      activeClassName="Mui-selected" exact>
                <ListItemText primary="Enter JSON Configuration"/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button key="Translate to Verilog" component={NavLink} to="/translate" className="black no-decorate"
                      activeClassName="Mui-selected" exact>
                <ListItemText primary="Translate to Verilog"/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <a href="https://www.redwoodeda.com/" className="black no-decorate" target="_blank" rel="noreferrer">
                <ListItem button key="Redwood EDA">
                    <ListItemText primary="Redwood EDA"/>
                </ListItem>
            </a>
        </List>
    </div>

    return <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
        </Hidden>
    </nav>
}