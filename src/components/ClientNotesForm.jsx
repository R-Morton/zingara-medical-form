import { useState, useEffect } from "react"
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext" 

export default function ClientNotesForm(props) {

    const id = props.id
    const noteId = props.noteId

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    const [localClient, setLocalClient] = useState("")
    const [localClientNotes, setLocalClientNotes] = useState("")

    const [localContent, setLocalContent] = useState("")
    const [localDateCreated, setLocalDateCreated] = useState(Date.now())
    const [showNoteForm, setShowNoteForm] = useState(false)

    const handleContentChange = (event) => {
        setLocalContent(event.target.value)
    }

    const toggleShowForm = () => {
        setShowNoteForm(!showNoteForm)
    }

    useEffect(() => {
        setLocalClient(globalMedicalData.find(form => {
            // eslint-disable-next-line
            return form.id == id
        }))
    }, [globalMedicalData, id])

    useEffect(() => {
        setLocalClientNotes(localClient.notes)
    }, [localClient])

    useEffect(() => {
        if (localClientNotes) {
            let tempNote = localClientNotes.find(note => {
                // eslint-disable-next-line
                return note.id == noteId
            })
            if (tempNote) {
                setLocalContent(tempNote.content)
                setLocalDateCreated(tempNote.dateCreatedAt)
            }
        }
    }, [localClientNotes, noteId])



    const saveToGlobal = () => {
        let tempNewNote = {
            id: noteId || localClient.notes.length + 1,
            content: localContent,
            dateCreatedAt: localDateCreated
        }
        if (noteId) {
            globalMedicalDispatch({type:"update-note", client: localClient, updatedNote: tempNewNote})
        } else {
            globalMedicalDispatch({type:"create-note", client: localClient, newNote: tempNewNote})
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