import { useState, useEffect } from "react"
import { useMedicalData } from "../contexts/ClientMedicalContext"


export function ClientInfo(props){
    
    let { id } = props

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
            <h1>Route param: {id}</h1>
            {localForm ?
        <div>
            <p>Name: {localForm.name}</p>
            <p>Email: {localForm.email}</p>
            <p>Age: {localForm.age}</p>
            <p>Gender: {localForm.gender}</p>
        </div>
        :
        <div> <p>Does not exist</p> </div>
            }
        </div>
    )
}