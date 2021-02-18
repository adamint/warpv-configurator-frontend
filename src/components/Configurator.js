import {Route, Switch} from "react-router-dom"
import HomePage from "./HomePage"
import CpuConfigurationComponent from "./CpuConfigurationComponent";
import {useState} from "react";
import useFetch from "../utils/useFetch";
import {useConfiguratorParameters, useParameterValidations} from "../utils/ConfiguratorParameters";
import {Typography} from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader"
import CpuStageComponent from "./CpuStageComponent";
import TranslateComponent from "./TranslateComponent";
import EnterJsonComponent from "./EnterJsonComponent";

export default function Configurator({classes}) {
    const [possibleParameters, setPossibleParameters] = useState();
    const [validations, setValidations] = useState()
    const [settingsValues, setSettingsValues] = useState({})
    const {get, post, loading, loadingTime} = useFetch("http://localhost:8080")

    useConfiguratorParameters(get, setPossibleParameters);
    useParameterValidations(possibleParameters, setValidations);
    if (possibleParameters === null) return <>
        <p>Error loading settings... please refresh or verify that you're connected to the internet.</p>
    </>
    else if ((loadingTime !== null && Date.now() - loadingTime >= 1000) && (loading || possibleParameters === undefined)) {
        return <main className={classes.content}>
            <div className={classes.toolbar}/>

            <Typography variant="h4">Loading configuration settings..</Typography>
            {loading && <ClipLoader color="#36D7B7" loading={loading} size={35}/>}

        </main>
    }

    return <main className={classes.content}>
        <div className={classes.toolbar}/>

        <Switch>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/configure/cpu">
                <CpuConfigurationComponent
                    name="CPU Configuration"
                    allSettings={possibleParameters}
                    settingsValues={settingsValues}
                    setSettingsValues={setSettingsValues}
                    validations={validations}/>
            </Route>
            <Route exact path="/configure/stage">
                <CpuStageComponent
                    name="CPU Stage Configuration"
                    allSettings={possibleParameters}
                    settingsValues={settingsValues}
                    setSettingsValues={setSettingsValues}
                    validations={validations}/>
            </Route>
            <Route exact path="/configure/json">
                <EnterJsonComponent
                    allSettings={possibleParameters}
                    settingsValues={settingsValues}
                    setSettingsValues={setSettingsValues}
                    validations={validations}/>
            </Route>
            <Route exact path="/translate">
                <TranslateComponent
                    settingsValues={settingsValues}
                    post={post}
                />
            </Route>
        </Switch>

        {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>*/}

    </main>
}