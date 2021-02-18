import {Accordion, AccordionDetails, AccordionSummary, TextField, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {getReadableInputType, isBooleanSetting} from "../../utils/ConfiguratorParameters";

export default function Setting({
                                    setting,
                                    expanded,
                                    handleInputChange,
                                    handleAccordionClick,
                                    classes,
                                    settingsValues,
                                    errors
                                }) {
    const isBoolean = isBooleanSetting(setting)

    let settingControl = <TextField
        error={errors.includes(setting.jsonKey)}
        id={`${setting.jsonKey}-input`}
        label={getReadableInputType(setting)}
        placeholder={setting.defaultValue.toString()}
        helperText={errors.includes(setting.jsonKey) ? "Invalid input." : null}
        type={["INTEGER", "DOUBLE"].includes(setting.acceptType.parameterInputType) ? "number" : "text"}
        defaultValue={settingsValues[setting.jsonKey] ? settingsValues[setting.jsonKey].toString() : null}
        onChange={handleInputChange}
        variant="filled"
        multiline
    />


    return <Accordion expanded={expanded.includes(setting)} onChange={handleAccordionClick}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls={`${setting.jsonKey}-content`}
            id={`${setting.jsonKey}-header`}
        >
            <>
                <Typography className={classes.heading}>{setting.readableName}</Typography>
                {setting.description &&
                <Typography className={classes.secondaryHeading}>{setting.description}</Typography>}
            </>
            {/*isBoolean ? <FormControlLabel
                aria-label={setting.description}
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox checked={settingsValues[setting.jsonKey] === true} onChange={handleInputChange}
                                   name={setting.jsonKey}/>}
                label={setting.readableName}
            /> : <> <Typography className={classes.heading}>{setting.readableName}</Typography>
                {setting.description &&
                <Typography className={classes.secondaryHeading}>{setting.description}</Typography>}
            </>*/}
        </AccordionSummary>
        <AccordionDetails>
            {/*isBoolean && <Typography>{setting.description}</Typography>*/}
            {settingControl}
        </AccordionDetails>
    </Accordion>
}