import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "react-use"
import { medicalReducer } from "../reducers/ClientReducer"
import { initialMedicalData } from "../data/InitialClientData"

export const MedicalDataContext = createContext(null)
export const MedicalDispatchContext = createContext(null)

// Custom hook for read only data
export function useMedicalData() {
    return useContext(MedicalDataContext)
}

// Custom hook for write/dispatch data
export function useMedicalDispatch() {
    return useContext(MedicalDispatchContext)
}

export default function MedicalProvider(props) {

    const [medicalData, medicalDispatch] = useReducer(medicalReducer, initialMedicalData)

    const [persistantData, setPersistantData] = useLocalStorage('form', initialMedicalData)

    useEffect(() => {
        medicalDispatch({type:"setup", data: persistantData})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Autosaves changes to noted from reducer state into localstorage
    useEffect(() => {
        setPersistantData(medicalData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [medicalData])

    return(
        <MedicalDataContext.Provider value={medicalData}>
            <MedicalDispatchContext.Provider value={medicalDispatch}>
                {props.children}
            </MedicalDispatchContext.Provider>
        </MedicalDataContext.Provider>
    )
}