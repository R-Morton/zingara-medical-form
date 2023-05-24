import { useMedicalData } from "../contexts/ClientMedicalContext"
import { useState, useEffect } from "react"

export default function ClientNotesDisplay(props) {

    const {id} = props

    // Local state
    const [localForm, setLocalForm] = useState({})

    // Custom hook read only access to global state
    const globalFormData = useMedicalData()

    // This use effect is looking for the first form to display that matches the id and sets it to the local state.
    useEffect(() => {
        setLocalForm(globalFormData.find(form => {
            // eslint-disable-next-line
            return form.id == id
        }))
    }, [globalFormData, id])

    return(
        <div>
        <p>{localForm.name}</p>
        <p>{localForm.notes.id}</p>
        </div>
    )
}