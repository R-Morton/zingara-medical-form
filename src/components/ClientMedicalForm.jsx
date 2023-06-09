import { useState } from "react";
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext";
import "../stylesheets/medicalForm.css"


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
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
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

    const handleChangeDOB = (event) => {
        setDateOfBirth(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setLocalEmail(event.target.value);
    }

    const handleChangeHeight = (event) => {
        setHeight(event.target.value)
    }

    const handleChangeAddress1 = (event) => {
        setAddress1(event.target.value)
    }

    const handleChangeAddress2 = (event) => {
        setAddress1(event.target.value)
    }

    const handleChangeOccupation = (event) => {
        setOccupation(event.target.value)
    }

    const handleChangeUsername = (event) => {
        setLocalName(event.target.value);
    }

    const handleChangeGender = (event) => {
        setLocalGender(event.target.value);
    }

    const handleEContactName = (event) => {
        setEContactName(event.target.value)
    }

    const handleEContactNumber = (event) => {
        setEContactNumber(event.target.value)
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
            <div class="main-client-form">
                <h1>CLIENT INTAKE FORM</h1>
            <form>
                <label>DATE OF TREATMENT:</label>
                <input type="date" value={treatmentDate} onChange={handleChangeTreatmentDate} />
                <label>MASSAGE THERAPIST:</label>
                <select value={therapist} onChange={handleChangeTherapist}>
                    <option value={"AMY"}>AMY</option>
                </select>
            </form>
            <h3>CLIENT DETAILS</h3>
            <form>
                <label>Name:</label>
                <input type="text" value={localName} onChange={handleChangeUsername} />
                <label>DOB:</label>
                <input type="date" value={dateOfBirth} onChange={handleChangeDOB}/>
                <label>GENDER:</label>
                <input type="text" value={localGender} onChange={handleChangeGender} />
                <label>HEIGHT:</label>
                <input type="text" value={height} onChange={handleChangeHeight} />
                <label>Email:</label>
                <input type="text" value={localEmail} onChange={handleChangeEmail} />
                <label>ADDRESS:</label>
                <input type="text" value={address1} onChange={handleChangeAddress1} />
                <input type="text" value={address1} onChange={handleChangeAddress2} />
                <label>EMAIL:</label>
                <input type="text" value={localEmail} onChange={handleChangeEmail} />
                <label>OCCUPATION:</label>
                <input type="text" value={occupation} onChange={handleChangeOccupation} />
                <label>EMERGENCY CONTACT:</label>
                <input type="text" value={eContactName} onChange={handleEContactName} />
                <input type="text" value={eContactNumber} onChange={handleEContactNumber} />
                

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