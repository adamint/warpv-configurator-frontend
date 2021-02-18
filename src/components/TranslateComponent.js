import {TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";

export default function TranslateComponent({settingsValues, post}) {
    const [translationError, setTranslationError] = useState()
    const [generatedJson, setGeneratedJson] = useState()
    const [generatedVerilog, setGeneratedVerilog] = useState()

    useEffect(() => {
        if (!settingsValues || Object.entries(settingsValues).length === 0) setGeneratedJson(null)
        else setGeneratedJson(JSON.stringify(settingsValues, null, "\t"))
    }, [settingsValues])

    useEffect(() => {
        if (settingsValues && Object.entries(settingsValues).length > 0) {
            post("/translate", settingsValues)
                .then(data => {
                    if (data !== undefined) {
                        setGeneratedVerilog(data.lines.join("\n"))
                        setTranslationError(null)
                    }
                })
                .catch(error => {
                    setTranslationError(error)
                    setGeneratedVerilog(null)
                })
        }
    }, [settingsValues])

    return <>
        <Typography variant="h4" className="margin-bottom-25">Generate WARP-V Core</Typography>

        <Typography variant="h5" className="margin-bottom-25">Configuration as JSON</Typography>
        <TextField
            label="JSON Configuration goes here"
            multiline
            rows={generatedJson ? generatedJson.split("\n").length + 1 : 0}
            variant="outlined"
            fullWidth
            value={generatedJson ? generatedJson : ""}
            disabled
            className="margin-bottom-25"
        />

        <Typography variant="h5" className="margin-bottom-25">TL-Verilog Configuration</Typography>
        <TextField
            label="Generated TL-Verilog goes here"
            multiline
            rows={generatedVerilog ? generatedVerilog.split("\n").length + 1 : 0}
            variant="outlined"
            fullWidth
            value={generatedVerilog ? generatedVerilog : ""}
            disabled
            className="margin-bottom-25"
        />

    </>
}