import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/ClientMedicalContext"


export function UserForm() {
    // Destructure the context data object
    let {userData, setUserData} = useContext(UserContext);

    // Set up the form's local state
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(false)
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")

    const [index, setIndex] = useState(0)

    useEffect(() => {
        // After receiving data from context,
        // apply that data to the form's local state.
        setName(userData.name);
        setEmail(userData.email);
    }, [userData])

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
    
    useEffect(() => {
        // Checking if show form is true, which is set once the final form is submitted
        // Then sends sets the UserData, sending it to Parent for conditional rendering
        if (showForm) {
            setUserData({ name, email, gender, age, showForm });
        }
    }, [name, email, age, gender, showForm, setUserData]);

    const handleSubmit = () => {
        setIndex(null)
        setShowForm(true)
      };
    
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