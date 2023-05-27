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
            // Grabbing new form from instructions, defined in form component
            let newForm = instructions.newForm
            // Pushing the new form into the copy of state
            stateEditable.push(newForm)
            // Returning the copy, setting the global state
            return stateEditable}
        
        case "create-note":{
            // Searching for the client in our copy of state that matches the client id in the instructions from the form
            let clientIndex = stateEditable.findIndex(globalClient => {
                return globalClient.id === instructions.client.id 
            })
            // declaring variable of the new note
            let newNote = {...instructions.newNote}
            // declaring variable of the client being sent as instructions
            let tempClient = {...instructions.client}
            // declaring variable of the client notes that already exist.
            let tempNotes = [...tempClient.notes]
            // Pushing the new note into the client notes array and then re declaring client notes as the new array of notes
            tempNotes.push(newNote)
            tempClient.notes = tempNotes

            // Setting the index of the client within the copy to the new version with the new note and returning it, setting global state.
            stateEditable[clientIndex] = tempClient
            return stateEditable}

            
        case "update-note":{
            // Searching for matching client
            let ClientIndex = stateEditable.findIndex(globalClient => {
                return globalClient.id === instructions.client.id 
            })
            // declaring relevant fields of the updated note and client containing note.
            let updatedNote = {...instructions.updatedNote}
            let TempClient = {...instructions.client}
            let TempNotes = [...TempClient.notes]

            // Searching within the client notes for the matching note that is to be updated.
            let noteIndex = TempNotes.findIndex(notes => {
                return notes.id === updatedNote.id
            })

            // Replacing the matching note with the new updated note and redeclaring the client notes.
            TempNotes[noteIndex] = updatedNote
            TempClient.notes = TempNotes

            // Setting changes to the copy of state and returning it to global state.
            stateEditable[ClientIndex] = TempClient
            return stateEditable}
        
        case "delete-note":{
            // Finding matching client
            let clientIndex = stateEditable.findIndex(globalClient => {
                return globalClient.id === instructions.client.id 
            })

            // Declaring relevant fields.
            let noteForDeletion = {...instructions.note}
            let tempClient = {...instructions.client}
            let tempNotes = [...tempClient.notes]

            // Finding the matching note by index for deletion.
            let noteIndex = tempNotes.findIndex(notes => {
                return notes.id === noteForDeletion.id
            })
            
            // Using the matching index to delete the note and re declare client notes with change
            tempNotes.splice(noteIndex, 1)
            tempClient.notes = tempNotes

            // Set change to copy of state and return to global state.
            stateEditable[clientIndex] = tempClient
            return stateEditable
        }
        default:
            console.log("Invalid instruction")

    }
}


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