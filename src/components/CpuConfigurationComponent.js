import SettingsComponent from "./settings/SettingsComponent";

export default function CpuConfigurationComponent({name, allSettings, settingsValues, setSettingsValues, validations}) {
    const cpuSettings = allSettings === undefined ? [] : allSettings.filter(setting => setting.configurationCategory === "CPU")

    return <>
        <SettingsComponent name={name}
                           settings={cpuSettings}
                           settingsValues={settingsValues}
                           setSettingsValues={setSettingsValues}
                           validations={validations}/>
    </>
}

