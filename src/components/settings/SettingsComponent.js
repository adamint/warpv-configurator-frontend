import {Fab, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import Setting from "./Setting";
import {useStyles} from "../../style/useStyles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

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
    }), {index: 2});

export default function SettingsComponent({name, settings, settingsValues, setSettingsValues, validations}) {
    const globalClasses = useStyles()
    const classes = useSettingsAccordionStyles();
    const [expanded, setExpanded] = useState([]);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        (settings === undefined) ? setExpanded([]) : expanded.length === 0 && setExpanded(settings)
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
        <Typography variant="h4" className="margin-bottom-10">{name}</Typography>

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