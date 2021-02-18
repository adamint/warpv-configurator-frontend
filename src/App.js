import {useState} from "react";
import {CssBaseline, useTheme} from "@material-ui/core";
import {useStyles} from "./style/styles";
import Header from "./components/partials/Header";
import SideBar from "./components/partials/SideBar";
import {BrowserRouter} from "react-router-dom";
import Configurator from "./components/Configurator";

export default function App({window}) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return <BrowserRouter>
        <div className={classes.root}>
            <CssBaseline/>
            <Header classes={classes} handleDrawerToggle={handleDrawerToggle}/>
            <SideBar classes={classes} handleDrawerToggle={handleDrawerToggle} theme={theme} mobileOpen={mobileOpen}
                     window={window}/>
            <Configurator classes={classes}/>
        </div>
    </BrowserRouter>
}
