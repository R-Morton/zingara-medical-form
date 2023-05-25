import { useState, useEffect } from "react"
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext" 

export default function ClientNotesForm(props) {

    const {id} = props

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    const [localClient, setLocalClient] = useState("")

    const [localContent, setLocalContent] = useState("")
    const [localDateCreated, setLocalDateCreated] = useState(Date.now())

    const handleContentChange = (event) => {
        setLocalContent(event.target.value)
    }

    useEffect(() => {
        setLocalClient(globalMedicalData.find(form => {
            // eslint-disable-next-line
            return form.id == id
        }))
    }, [globalMedicalData, id])

    const saveToGlobal = () => {
        let tempNewNote = {
            id: localClient.notes.length + 4,
            content: localContent,
            dateCreatedAt: localDateCreated
        }

        globalMedicalDispatch({type:"create-form", client: localClient, newNote: tempNewNote})
    }

    return (
        <div>
            <form>
                <label>Content:</label>
                <input type="text" value={localContent} onChange={handleContentChange} />
            </form>
            <button onClick={saveToGlobal}>Save Note!</button>
        </div>
    )
}