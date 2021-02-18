import SettingsComponent from "./settings/SettingsComponent";

export default function CpuStageComponent({name, allSettings, settingsValues, setSettingsValues, validations}) {
    const cpuStageSettings = allSettings === undefined ? [] : allSettings.filter(setting => setting.configurationCategory === "STAGE")

    return <>
        <SettingsComponent name={name}
                           settings={cpuStageSettings}
                           settingsValues={settingsValues}
                           setSettingsValues={setSettingsValues}
                           validations={validations}/>
    </>
}

