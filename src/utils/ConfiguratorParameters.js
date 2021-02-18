import {useEffect} from "react";

export function useConfiguratorParameters(get, setPossibleParameters) {
    useEffect(() => {
        get("/list-configuration-parameters")
            .then(data => {
                setPossibleParameters(data)
            })
            .catch(error => setPossibleParameters(null))
    }, [])
}

export function useParameterValidations(possibleParameters, setValidations) {
    useEffect(() => {
        if (possibleParameters !== undefined && possibleParameters !== null) {
            const validations = Object.assign(...possibleParameters.map(parameter => {
                const obj = {}
                const acceptType = parameter.acceptType
                const inputType = acceptType.parameterInputType
                const validationType = acceptType.validationType
                obj[parameter.jsonKey] = (textValue) => {
                    if (textValue.length === 0) return null;
                    if (inputType === "INTEGER" && Number.parseInt(textValue) === Number.NaN) return null;
                    else if (inputType === "DOUBLE" && Number.parseFloat(textValue) === Number.NaN) return null;
                    else if (inputType === "BOOLEAN" && !["true", "false"].includes(textValue)) return null;

                    if (["GREATER_THAN"].includes(validationType.type)) {
                        const number = validationType.number
                        if (validationType.type === "GREATER_THAN") {
                            if (!(Number.parseInt(textValue) > number)) return null
                            else if (inputType === "INTEGER") return Number.parseInt(textValue)
                        }
                    }
                    if (validationType.type === "IN") {
                        if (!validationType.list.includes(textValue)) return null
                        else if (inputType === "BOOLEAN") return textValue === "true"
                        else if (inputType === "STRING") return textValue
                    }

                    return true
                }
                return obj
            }))

            setValidations(validations)
        }
    }, [possibleParameters])
}

export const isBooleanSetting = (setting) => setting.acceptType.parameterInputType === "BOOLEAN"
export const isIntegerSetting = (setting) => setting.acceptType.parameterInputType === "INTEGER"
export const isStringSetting = (setting) => setting.acceptType.parameterInputType === "STRING"
export const getReadableInputType = (setting) => isIntegerSetting(setting) ? "int" : setting.acceptType.parameterInputType.toLowerCase()