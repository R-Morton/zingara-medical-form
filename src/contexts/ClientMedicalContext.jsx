import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "react-use"

const initialMedicalData = [
    {
        id: 1,
        name: "",
        email: "",
        age: "",
        gender: "",
        notes: [{
            id: 1,
            dateCreatedAt: "",
            content: ""
        }]
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
        
        case "create":{
            console.log("TODO - Create new client medical form and add to state")
            let newForm = instructions.newForm

            stateEditable.push(newForm)

            return stateEditable}
        
        case "create-note":{
            let clientIndex = stateEditable.findIndex(globalClient => {
                return globalClient.id === instructions.client.id 
            })
            let newNote = {...instructions.newNote}
            let tempClient = {...instructions.client}
            let tempNotes = [...tempClient.notes]
            tempNotes.push(newNote)
            tempClient.notes = tempNotes
            stateEditable[clientIndex] = tempClient
            return stateEditable}

            
        case "update-note":{
            console.log("TODO - Update existing note and update state")
            let ClientIndex = stateEditable.findIndex(globalClient => {
                return globalClient.id === instructions.client.id 
            })
            let updatedNote = {...instructions.updatedNote}
            let TempClient = {...instructions.client}
            let TempNotes = [...TempClient.notes]
            let noteIndex = TempNotes.findIndex(notes => {
                return notes.id === updatedNote.id
            })
            TempNotes[noteIndex] = updatedNote
            TempClient.notes = TempNotes
            stateEditable[ClientIndex] = TempClient
            return stateEditable}
        
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