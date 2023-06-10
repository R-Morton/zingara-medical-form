import { Link, useParams } from "react-router-dom"
import { ClientInfo } from "../components/ClientMedicalDisplay"
import { useState, useEffect } from "react"
import ClientNotesDisplay from "../components/ClientNotesDisplay"
import ClientNotesForm from "../components/ClientNotesForm"
import { useMedicalData } from "../contexts/ClientMedicalContext"

export default function ClientDisplayById() {

    const {id} = useParams()

    const globalFormData = useMedicalData();

    // local state declared here
    const [formDisplay, setFormDisplay] = useState(false)
    const [notesDisplay, setNotesDisplay] = useState(false)
    const [localForm, setLocalForm] = useState({})
    const [NotesFormDisplay, setNotesFormDisplay] = useState(false)

    // Finding the form matching the id passed in as parameter and setting local state
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

    // Displays the results of the medical form when button is clicked. Passing id as prop
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
                {!NotesFormDisplay && <button onClick={toggleNotesFormDisplay}>Create new note</button>}
                {NotesFormDisplay && <ClientNotesForm id={id} toggleForm={toggleNotesFormDisplay} />}
                <br/><button onClick={toggleNotesDisplay}>Go back</button>
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
                    <h2>Client: {localForm.name}</h2>
                    <h4>Client Medical Form</h4>
                    <button onClick={toggleFormDisplay}>Show</button>
                    <h4>Client Notes</h4>
                    <button onClick={toggleNotesDisplay}>Show</button>
                    <br/><Link to={"/client"}><button>Go Back</button></Link>
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