import { useState } from "react";
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext";
import "../stylesheets/medicalForm.css"
import Header from "./medical_form/header";
import Footer from "./medical_form/footer";
import Nav from "./medical_form/nav";


export function MedicalForm(props) {

    const {id} = props

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    // Set up the form's local state
    const [localName, setLocalName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localGender, setLocalGender] = useState("")
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
        setAddress2(event.target.value)
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
            <div className="main-1">
                <header>
                    <Header></Header>
                </header>
            <div className="main-client-form">
            <div className="treatment-block">
                <div className="block">
                <label>DATE OF TREATMENT:</label>
                <input type="date" value={treatmentDate} onChange={handleChangeTreatmentDate} />
                </div>
                <div className="block">
                <label>MASSAGE THERAPIST:</label>
                <select value={therapist} onChange={handleChangeTherapist}>
                    <option value={"AMY"}>AMY</option>
                </select>
                </div>
            </div>
            <h3>CLIENT DETAILS</h3>
            <div className="client-details-form">
                <div className="block">
                    <div className="name-gender-block">
                        <label>NAME:</label>
                        <input id="name" type="text" value={localName} onChange={handleChangeUsername} />
                    </div>
                    <div className="dob-height-block">
                    <label>DOB:</label>
                    <input id="dob" type="date" value={dateOfBirth} onChange={handleChangeDOB}/>
                    </div>
                </div>
                <div className="block">
                <div className="name-gender-block">
                    <label>GENDER:</label>
                    <input id="gender" type="text" value={localGender} onChange={handleChangeGender} />
                    </div>
                    <div className="dob-height-block">
                    <label>HEIGHT:</label>
                    <input id="height" type="text" value={height} onChange={handleChangeHeight} />
                    </div>
                </div>
                <div className="block" id="addressblock">
                    <label>ADDRESS:</label>
                    <input id="address1" type="text" value={address1} onChange={handleChangeAddress1} />
                </div>
                    <div className="block2">
                    <input id="address2" type="text" value={address2} onChange={handleChangeAddress2} />
                </div>
                <div className="block">
                    <label>EMAIL:</label>
                    <input id="email" type="text" value={localEmail} onChange={handleChangeEmail} />
                </div>
                <div className="block">
                    <label>OCCUPATION:</label>
                    <input id="occupation" type="text" value={occupation} onChange={handleChangeOccupation} />
                </div>

                <div className="e-contact-block">
                    <label>EMERGENCY CONTACT:</label>
                    <div className="e-contact-input">
                    <input id="e-contact-name" type="text" value={eContactName} onChange={handleEContactName} />
                    <input type="text" value={eContactNumber} onChange={handleEContactNumber} />
                    </div>
                </div>
                <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious}></Nav>
            </div>
        </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
        )
    }

    function form2() {
        return(
            <div>
                <header>
                    <Header />
                </header>
            <div className="main-2">
                <div className="client-history">
                    <h3>CLIENT HISTORY</h3>
                    <p>Please tick the following boxes</p>
                    <div className="question">
                            <p>Q1.</p><p>Are you currently experiencing any pain, discomfort, recent injuries, and/or surgery?</p>
                    </div>
                    <div className="answers">
                    <div className="radio-answers">
                        <input type="radio" value="YES" name="pain" /> <label>YES</label>
                        <input type="radio" value="NO" name="pain" /> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <p>if selected 'yes', please provide more information</p>
                        <label>Details (Location/area, when did it start etc.)</label>
                        <input type="text"></input>
                    </div>
                    <label>Have you seen a GP or specialist?</label>
                    <div className="radio-answers">
                        <input id="red" type="radio" value="YES" name="gp" /> <label>YES</label>
                        <input type="radio" value="NO" name="gp" /> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <label>Details</label>
                        <input type="text"></input>
                    </div>
                    </div>
                    <div className="question" id="question2">
                        <p>Q2.</p>
                        <p>Do you have any allergies, sesitivites, intolerances?</p>
                    </div>
                    <div className="answers">
                    <div className="radio-answers">
                        <input type="radio" value="YES" name="allergies" /> <label>YES</label>
                        <input type="radio" value="NO" name="allergies" /> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <p>if selected 'yes', please provide more information</p>
                        <label>Details</label>
                        <input type="text"></input>
                    </div>
                    </div>
                </div>
            <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious}></Nav>
            </div>
            <footer>
                <Footer />
            </footer>
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
            {index === 6 && completePage()}
        </div>
    );
}