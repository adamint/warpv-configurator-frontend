import {Button, Fab, Snackbar, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {useStyles} from "../style/useStyles";
import {useSettingsAccordionStyles} from "./settings/SettingsComponent";
import {useState} from "react";
import Alert from '@material-ui/lab/Alert';

export default function EnterJsonComponent({allSettings, settingsValues, setSettingsValues, validations}) {
    const [jsonText, setJsonText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const classes = useSettingsAccordionStyles();
    const globalClasses = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarType(null);
    }

    function onButtonClick() {
        try {
            const parameters = JSON.parse(jsonText)
            const newValues = {}
            for (const [key, value] of Object.entries(parameters)) {
                if (!(key in validations)) setSnackbarType({
                    type: "error",
                    message: `Key ${key} is not a valid parameter.`
                })
                else if (validations[key](value.toString()) === null) setSnackbarType({
                    type: "error",
                    message: `Key ${key} has an invalid value: ${value}.`
                })
                else newValues[key] = validations[key](value.toString())
            }

            setSettingsValues(newValues)
            setSnackbarType({type: "success", message: "Imported WARP-V configuration."})
        } catch (error) {
            setSnackbarType({type: "error", message: "Failed to parse JSON"})
        }
    }

    // noinspection PointlessBooleanExpressionJS
    return <>
        <Typography variant="h4" className="margin-bottom-10">Enter JSON</Typography>

        <TextField
            id="outlined-multiline-static"
            label="Enter JSON configuration for a WARP-V core"
            multiline
            rows={15}
            variant="outlined"
            fullWidth
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            placeholder="Enter JSON configuration for a WARP-V core"
            helperText="This will override any manual parameters that you've set."
            className="margin-bottom-25"
        />

        <Button variant="contained" color="primary" onClick={onButtonClick}>Import parameters</Button>

        <Link to="/translate">
            <Fab variant="extended" color="primary" aria-label="add"
                 className={`${globalClasses.margin} ${globalClasses.extendedIcon} ${globalClasses.fab}`}>
                Generate Verilog
                <ArrowRightIcon className={classes.extendedIcon}/>
            </Fab>
        </Link>

        {snackbarType && <Snackbar open={snackbarType !== null && snackbarType !== undefined} autoHideDuration={6000}
                                   onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbarType.type}>
                {snackbarType.message}
            </Alert>
        </Snackbar>}
    </>
}