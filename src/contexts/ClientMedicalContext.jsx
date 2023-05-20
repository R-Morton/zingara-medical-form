import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "react-use"

const initialMedicalData = [
    {
        name: "",
        email: "",
        age: "",
        gender: "",
        showForm: false,
    }
]

const medicalReducer = (previousState, instructions) => {
    let stateEditable = [...previousState]

    switch (instructions.type) {
        case "setup":
            let localStorageData = instructions.data
            stateEditable = localStorageData
            
            // Whatever is returned is the new state data
            return stateEditable
        
        case "create":
            console.log("TODO - Create new client medical form and add to state")
            break
        
        case "update":
            console.log("TODO - Update existing medical form and update state")
            break
        
        case "delete":
            console.log("TODO - Delete existing medical form and update state")
            break
        
        default:
            console.log("Invalid instruction")

    }
}


export const MedicalDataContext = createContext(null)
export const MedicalDispatchContext = createContext(null)

export function useMedicalData() {
    return useContext(MedicalDataContext)
}

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