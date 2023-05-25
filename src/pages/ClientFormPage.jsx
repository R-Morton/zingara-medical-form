import { useParams } from "react-router-dom"
import { ClientInfo } from "../components/ClientMedicalDisplay"
import { useState, useEffect } from "react"
import ClientNotesDisplay from "../components/ClientNotesDisplay"
import ClientNotesForm from "../components/ClientNotesForm"
import { useMedicalData } from "../contexts/ClientMedicalContext"

export default function ClientDisplayById() {

    const {id} = useParams()

    const globalFormData = useMedicalData();

    const [formDisplay, setFormDisplay] = useState(false)
    const [notesDisplay, setNotesDisplay] = useState(false)
    const [localForm, setLocalForm] = useState({})
    const [NotesFormDisplay, setNotesFormDisplay] = useState(false)

    useEffect(() => {
        setLocalForm(globalFormData.find(form => {
            // eslint-disable-next-line
            return form.id == id
        }))
    }, [globalFormData, id])

    function toggleFormDisplay() {
        setFormDisplay(!formDisplay)
    }

    function toggleNotesDisplay() {
        setNotesDisplay(!notesDisplay)
    }

    function toggleNotesFormDisplay() {
        setNotesFormDisplay(!NotesFormDisplay)
    }

    function ClientInfoRender() {
        return(
            <div>
                <h1>Client Form</h1>
                <ClientInfo id={id} />
                <button onClick={toggleFormDisplay}>Go back</button>
            </div>
        )
    }

    function ClientNoteRender() {
        return(
            <div>
                <h1>Client Notes</h1>
                <ClientNotesDisplay id={id} />
                <button onClick={toggleNotesFormDisplay}>Create new note</button>
                {NotesFormDisplay && <ClientNotesForm id={id} />}
                <button onClick={toggleNotesDisplay}>Go back</button>
            </div>
        )
    }

    return(
        <div>
            {!localForm ? 
                <div>
                    <h1>No Client found</h1>
                </div>
            :
            <div>
            {!formDisplay && !notesDisplay &&
                <div>
                    <h1>Client Medical Form</h1>
                    <button onClick={toggleFormDisplay}>Switch</button>
                    <h1>Client Notes</h1>
                    <button onClick={toggleNotesDisplay}>Switch</button>
                </div>
            }
        <div>
            {notesDisplay && ClientNoteRender()}
            {formDisplay && ClientInfoRender()}
        </div>
        </div>
        }
        </div>
    )
}