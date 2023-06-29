import { useMedicalData } from "../contexts/ClientMedicalContext"
import { useState, useEffect } from "react"
import ClientNotesForm from "./ClientNotesForm"
import "./form.css"

export default function ClientNotesDisplay(props) {

    const {_id} = props

    // Local state
    const [localForm, setLocalForm] = useState({})
    const [toggleEditNote, setToggleEditNote] = useState({})

    function toggleEdit(noteId) {
        setToggleEditNote((prevState) => ({
          ...prevState,
          [noteId]: !prevState[noteId],
        }));
      }

    // Custom hook read only access to global state
    const globalFormData = useMedicalData()

    // This use effect is looking for the first form to display that matches the id and sets it to the local state.
    useEffect(() => {
        setLocalForm(globalFormData.find(form => {
            // eslint-disable-next-line
            return form._id == _id
        }))
    }, [globalFormData, _id])


    return(
        <div>
            {localForm.notes ?
        <div>
        <h3>{localForm.name}</h3>
        {localForm.notes.map(notes => {
            return(
                <div key={notes._id} class="notes">
                    <p>Note Created: {new Date(notes.createdAtDate).toLocaleDateString()}</p>
                    <p>{notes.content}</p>
                    {!toggleEditNote[notes._id] && <button onClick={() => toggleEdit(notes._id)}>Edit Note</button>}
                    {toggleEditNote[notes._id] && <ClientNotesForm id={_id} noteId={notes.id} toggleEdit={toggleEdit} />}
                </div>
            )
        })}
        </div>
            :
            <div>
                <h1>No notes found!</h1>  
            </div>
            }
        </div>
    )
}