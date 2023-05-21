import { useContext, useEffect, useState } from "react";
import { useMedicalData, useMedicalDispatch } from "../contexts/ClientMedicalContext";



export function MedicalForm(props) {

    const {id} = props

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    // Set up the form's local state
    let [localName, setLocalName] = useState("");
    let [localEmail, setLocalEmail] = useState("");
    const [localGender, setLocalGender] = useState("")
    const [localAge, setLocalAge] = useState("")

    const [index, setIndex] = useState(0)

    const handleChangeEmail = (event) => {
        // Do front-end validations here.
        setEmail(event.target.value);
    }

    const handleChangeUsername = (event) => {
        // Do front-end validations here.
        setName(event.target.value);
    }

    const handleChangeGender = (event) => {
        // Do front-end validations here.
        setGender(event.target.value);
    }

    const handleChangeAge = (event) => {
        // Do front-end validations here.
        setAge(event.target.value);
    }

    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1);
      };
    
    const handlePrevious = () => {
        setIndex((prevIndex) => prevIndex -1)
    }

    const saveNoteToGlobal = () => {
		// UX note: saving should exit edit mode, but we won't do that in this app
		// We'd need to pass in the toggleEditMode stuff from the NoteParent 

		let tempNewForm = {
			id: id || globalMedicalData.length + 1,
			name: localName,
			email: localEmail,
			age: localAge,
			gender: localGender,
		}

		if (id){
			globalNotesDispatch({type:"update", updatedForm: tempNewForm})
		} else {
			globalNotesDispatch({type:"create", newForm: tempNewForm})
		}
		

	}
    
    function form1() {
        return(
            <div>
            <form>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleChangeUsername} />
                <label>Email:</label>
                <input type="text" value={email} onChange={handleChangeEmail} />
                
            </form>
            <button onClick={handleNext} >Next</button>
        </div>
        )
    }

    function form2() {
        return(
            <div>
            <form onSubmit={handleSubmit}>
                <label>Age:</label>
                <input type="text" value={age} onChange={handleChangeAge} />
                <label>Gender:</label>
                <select value={gender} onChange={handleChangeGender}>
                    <option value="male">Male</option>
                    <option vale="female">Female</option>
                </select>
                <button type="submit" >Submit</button>
            </form>
            <button onClick={handlePrevious}>Previous</button>
        </div>
        )
    }

    return (
        <div>
            {index === 0 && form1()}
            {index === 1 && form2()}
        </div>
    );
}