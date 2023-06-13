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
            {localForm ?
                <div>
                    <div>
                        <h3>Client Details:</h3>
                        <p>Name: {localForm.name}</p>
                        <p>Email: {localForm.email}</p>
                        <p>DOB: {localForm.dob}</p>
                        <p>Gender: {localForm.gender}</p>
                        <p>Height: {localForm.height}cm</p>
                        <p>Address: {localForm.address}</p>
                        <p>Occupation: {localForm.occupation}</p>
                        <h3>Emergency Contact:</h3>
                        <p>Name: {localForm.ename}</p>
                        <p>Number: {localForm.enumber}</p>
                    </div>
                    <div>
                        <h3>Client History:</h3>
                        <h4>Experiencing Pain?</h4>
                        {localForm.pain && (
                            <div>
                                {localForm.pain.type ?
                                <div>
                                <p>{localForm.pain.type}</p>
                                {localForm.pain.gp ? <p>{localForm.pain.gp}</p> : <p>Not seen GP</p>}
                                </div>
                                
                                : <p>No pain</p>}
                            </div>
                        )}
                            
                        <h4>Allergies:</h4>
                        {localForm.allergies ? 
                        <p>{localForm.allergies}</p>
                        : <p>None</p>
                        }
                        <h4>Question 4 stuff:</h4>
                        {localForm.q4 ? 
                        localForm.q4.map((symptom) => {
                            return(
                                <p>{symptom}</p>
                            )
                        })
                        :
                        <p>None</p>
                        }
                    </div>
                </div>
                :
                    <div> <p>Does not exist</p> </div>
            }
        </div>
    )
}