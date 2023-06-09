import { useState } from "react";
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext";



export function MedicalForm(props) {

    const {id} = props

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    // Set up the form's local state
    const [localName, setLocalName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localGender, setLocalGender] = useState("male")
    const [localAge, setLocalAge] = useState("")
    const [treatmentDate, setTreatmentDate] = useState(Date.now())
    const [therapist, setTherapist] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [height, setHeight] = useState("cm")
    const [address, setAddress] = useState("")
    const [occupation, setOccupation] = useState("")
    const [eContactName, setEContactName] = useState("")
    const [eContactNumber, setEContactNumber] = useState("")

    const [index, setIndex] = useState(0)

    const handleChangeTreatmentDate = (event) => {
        setTreatmentDate(event.target.value);
    }

    const handleChangeTherapist = (event) => {
        setTherapist(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setLocalEmail(event.target.value);
    }

    const handleChangeUsername = (event) => {
        setLocalName(event.target.value);
    }

    const handleChangeGender = (event) => {
        setLocalGender(event.target.value);
    }

    const handleChangeAge = (event) => {
        setLocalAge(event.target.value);
    }

    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1);
      };
    
    const handlePrevious = () => {
        setIndex((prevIndex) => prevIndex -1)
    }

    const saveToGlobal = () => {
        // Creates a new form data, either with id passed in as a prop for updating or a new id.
		let tempNewForm = {
			id: id || globalMedicalData.length + 1,
			name: localName,
			email: localEmail,
			age: localAge,
			gender: localGender,
            notes: []
		}

        // If the id is passed in, we are updating the state of this client
		if (id){
			globalMedicalDispatch({type:"update", updatedForm: tempNewForm})
		} else { // Else we are creating a new form
			globalMedicalDispatch({type:"create", newForm: tempNewForm})
            handleNext()
		}
		

	}
    
    function form1() {
        return(
            <div>
                <h1>CLIENT INTAKE FORM</h1>
            <form>
                <label>DATE OF TREATMENT:</label>
                <input type="date" value={treatmentDate} onChange={handleChangeTreatmentDate} />
                <label>MASSAGE THERAPIST:</label>
                <select value={therapist} onChange={handleChangeTherapist}>
                    <option value={"AMY"}>AMY</option>
                </select>

                <h3>CLIENT DETAILS</h3>
                <label>Name:</label>
                <input type="text" value={localName} onChange={handleChangeUsername} />
                <label>Email:</label>
                <input type="text" value={localEmail} onChange={handleChangeEmail} />
                
            </form>
            <button onClick={handleNext} >Next</button>
        </div>
        )
    }

    function form2() {
        return(
            <div>
            <form>
                <label>Age:</label>
                <input type="text" value={localAge} onChange={handleChangeAge} />
                <label>Gender:</label>
                <select value={localGender} onChange={handleChangeGender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </form>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={saveToGlobal} >Submit</button>
        </div>
        )
    }

    function completePage() {
        return(
            <div>
                <h3>Thank you for completing the form</h3>
            </div>
        )
    }



    return (
        <div>
            {index === 0 && form1()}
            {index === 1 && form2()}
            {index === 2 && completePage()}
        </div>
    );
}