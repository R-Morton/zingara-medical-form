import { useParams } from "react-router-dom"
import { ClientInfo } from "../components/ClientMedicalDisplay"
import { useState } from "react"
import ClientNotesDisplay from "../components/ClientNotesDisplay"
import ClientNotesForm from "../components/ClientNotesForm"

export default function ClientDisplayById() {

    const {id} = useParams()

    const [formDisplay, setFormDisplay] = useState(false)
    const [notesDisplay, setNotesDisplay] = useState(false)

    function toggleFormDisplay() {
        setFormDisplay(!formDisplay)
    }

    function toggleNotesDisplay() {
        setNotesDisplay(!notesDisplay)
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
                <ClientNotesForm id={id} />
                <button onClick={toggleNotesDisplay}>Go back</button>
            </div>
        )
    }

    return(
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
    )
}