import { useState, useEffect } from "react"
import { useMedicalData } from "../contexts/ClientMedicalContext"
import { useParams } from "react-router-dom"


export function ClientInfo(props){
    
    let { id } = useParams()

    // Local state
    const [localForm, setLocalForm] = useState({})

    // Custom hook read only access to global state
    const globalFormData = useMedicalData()

    // This use effect is looking for the first form to display that matches the id and sets it to the local state.
    useEffect(() => {
        setLocalForm(globalFormData.find(form => {
            return form.id === id
        }))
    }, [globalFormData, id])

    return(
        <div>
            <p>Name: {localForm.name}</p>
            <p>Email: {localForm.email}</p>
            <p>Age: {localForm.age}</p>
            <p>Gender: {localForm.gender}</p>
        </div>
    )
}