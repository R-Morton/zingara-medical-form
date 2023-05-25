import { useState, useEffect } from "react"
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext" 

export default function ClientNotesForm(props) {

    const {id} = props
    const noteId = 2

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    const [localClient, setLocalClient] = useState("")

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


    const saveToGlobal = () => {
        toggleShowForm()
        let tempNewNote = {
            id: localClient.notes.length + 1,
            content: localContent,
            dateCreatedAt: localDateCreated
        }

        globalMedicalDispatch({type:"create-note", client: localClient, newNote: tempNewNote})
    }

    return (
        <div>
            {!showNoteForm ?
            <div>
                <button onClick={toggleShowForm}>Create new note</button>
            </div>
            :
            <div>
                <form>
                    <label>Content:</label>
                    <input type="text" value={localContent} onChange={handleContentChange} />
                    <button onClick={saveToGlobal}>Save Note!</button>
                </form>
            </div>
            }
        </div>
    )
}