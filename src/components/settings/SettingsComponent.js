import {Fab, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import Setting from "./Setting";
import {isBooleanSetting} from "../../utils/ConfiguratorParameters";
import {useStyles} from "../../style/styles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Link} from "react-router-dom";

export const useSettingsAccordionStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function SettingsComponent({name, settings, settingsValues, setSettingsValues, validations}) {
    const classes = useSettingsAccordionStyles();
    const globalClasses = useStyles()
    const [expanded, setExpanded] = useState([]);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        (settings === undefined) ? setExpanded([]) : expanded.length === 0 && setExpanded(settings.filter(setting => setting.acceptType.parameterInputType !== "BOOLEAN"))
    }, [settings])

    const handleAccordionClick = (setting) => (event, isExpanded) => {
        if (expanded.includes(setting)) setExpanded(expanded.filter(p => p !== setting))
        else setExpanded([...expanded, setting])
    }

    const handleInputChange = (setting) => (event) => {
        event.persist()

        const newSettings = {...settingsValues}
        const value = event.target.value
        if (!value || value.length === 0) {
            delete newSettings[setting.jsonKey]
            setErrors(errors.filter(s => s !== setting.jsonKey))
            setSettingsValues(newSettings)

            return
        }
        const validationResult = validations[setting.jsonKey](value)
        if (validationResult === null) {
            delete newSettings[setting.jsonKey]
            setErrors([...errors, setting.jsonKey])
        } else {
            newSettings[setting.jsonKey] = validationResult
            setErrors(errors.filter(s => s !== setting.jsonKey))
        }

        setSettingsValues(newSettings)
    };

    return <div className={classes.root}>
        <Typography variant="h4" style={{marginBottom: 10}}>{name}</Typography>

        {settings.map(setting => <Setting setting={setting}
                                          expanded={expanded}
                                          classes={classes}
                                          handleAccordionClick={handleAccordionClick(setting)}
                                          handleInputChange={handleInputChange(setting)}
                                          settingsValues={settingsValues}
                                          key={setting.jsonKey}
                                          errors={errors}
        />)}

        <Link to="/translate">
            <Fab variant="extended" color="primary" aria-label="add"
                 className={`${globalClasses.margin} ${globalClasses.extendedIcon} ${globalClasses.fab}`}>
                Generate Verilog
                <ArrowRightIcon className={classes.extendedIcon}/>
            </Fab>
        </Link>
    </div>
}