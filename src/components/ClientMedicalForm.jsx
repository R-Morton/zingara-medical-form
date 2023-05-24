import { useEffect, useState } from "react";
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
    const [localGender, setLocalGender] = useState("")
    const [localAge, setLocalAge] = useState("")

    const [index, setIndex] = useState(0)

    const handleChangeEmail = (event) => {
        // Do front-end validations here.
        setLocalEmail(event.target.value);
    }

    const handleChangeUsername = (event) => {
        // Do front-end validations here.
        setLocalName(event.target.value);
    }

    const handleChangeGender = (event) => {
        // Do front-end validations here.
        setLocalGender(event.target.value);
    }

    const handleChangeAge = (event) => {
        // Do front-end validations here.
        setLocalAge(event.target.value);
    }

    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1);
      };
    
    const handlePrevious = () => {
        setIndex((prevIndex) => prevIndex -1)
    }

    const saveToGlobal = () => {

		let tempNewForm = {
			id: id || globalMedicalData.length + 1,
			name: localName,
			email: localEmail,
			age: localAge,
			gender: localGender,
            notes: [{
                id: 1,
                content: "",
                createdAt: ""
            }]
		}

		if (id){
			globalMedicalDispatch({type:"update", updatedForm: tempNewForm})
		} else {
			globalMedicalDispatch({type:"create", newForm: tempNewForm})
		}
		

	}
    
    function form1() {
        return(
            <div>
            <form>
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
            <form onSubmit={saveToGlobal}>
                <label>Age:</label>
                <input type="text" value={localAge} onChange={handleChangeAge} />
                <label>Gender:</label>
                <select value={localGender} onChange={handleChangeGender}>
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