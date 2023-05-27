import { useState, useEffect } from "react"
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext" 

export default function ClientNotesForm(props) {

    // Id for client being passed in as prop
    const id = props.id

    // Id of an existing note being passed in as prop, if editing a note.
    const noteId = props.noteId

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    // Client information gets saved into local state here
    const [localClient, setLocalClient] = useState("")

    // Client notes gets saved into local state here
    const [localClientNotes, setLocalClientNotes] = useState("")
    
    // Notes content and date gets saved locally in state here
    const [localContent, setLocalContent] = useState("")
    const [localDateCreated, setLocalDateCreated] = useState(Date.now())

    const [deleteNote, setDeleteNote] = useState(false)

    // Front end validations to be done here
    const handleContentChange = (event) => {
        setLocalContent(event.target.value)
    }

    // Finding the client in the read only global state that matches the id passed in as a prop.
    // Then saving it to local state
    useEffect(() => {
        setLocalClient(globalMedicalData.find(form => {
            // eslint-disable-next-line
            return form.id == id
        }))
    }, [globalMedicalData, id])

    // Taking the notes from the client saved in local state and saving those to its own local state.
    useEffect(() => {
        setLocalClientNotes(localClient.notes)
    }, [localClient])

    // Checking to see if there is a note in the local state that matches the id of noteId that might have been passed in.
    useEffect(() => {
        if (localClientNotes) {
            let tempNote = localClientNotes.find(note => {
                // eslint-disable-next-line
                return note.id == noteId
            })
            // If it finds a note, it will set the local state of the note to the existing note.
            // This is for if we are editing a note.
            if (tempNote) {
                setLocalContent(tempNote.content)
                setLocalDateCreated(tempNote.dateCreatedAt)
            }
        }
    }, [localClientNotes, noteId])


    // Function that will take the note information and send it to the reducer.
    const saveToGlobal = () => {
        // Making a temp note that we can send to the reducer.
        let tempNewNote = {
            id: noteId || localClient.notes.length + 1,
            content: localContent,
            dateCreatedAt: localDateCreated
        }
        // If a noteId is present, meaning it is a note being edited, then the 'update-note' instruction will be sent to the reducer.
        if (noteId) {
            globalMedicalDispatch({type:"update-note", client: localClient, updatedNote: tempNewNote})
            props.toggleEdit(noteId)
        } else { // Otherwise it is a new note so the 'create-note' instruction is sent instead.
            globalMedicalDispatch({type:"create-note", client: localClient, newNote: tempNewNote})
            props.toggleForm()
        }
    }

    return (
        <div>
            <div>
                <form>
                    <label>Content:</label>
                    <input type="text" value={localContent} onChange={handleContentChange} />
                </form>
                    <button onClick={saveToGlobal}>Save Note!</button>
            </div>
        </div>
    )
}