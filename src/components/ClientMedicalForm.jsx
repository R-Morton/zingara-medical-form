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
    const [treatmentDate, setTreatmentDate] = useState(Date.now())
    const [therapist, setTherapist] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [height, setHeight] = useState("cm")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [occupation, setOccupation] = useState("")
    const [eContactName, setEContactName] = useState("")
    const [eContactNumber, setEContactNumber] = useState("")
    const [painRadio, setPainRadio] = useState('')
    const [painText, setPainText] = useState("")
    const [q3Answers, setQ3Answers] = useState([])
    const [gpRadio, setGpRadio] = useState('')
    const [gpText, setGpText] = useState('')
    const [allergiesRadio, setAllergiesRadio] = useState('')
    const [allergiesText, setAllergiesText] = useState('')

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

    const handleChangeName = (event) => {
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

    const handlePainRadioChange = (event) => {
        if (event.target.value === 'no'){
            setPainRadio(event.target.value)
            setGpRadio("")
            setGpText("")
            setPainText("")
        } else {
            setPainRadio(event.target.value)
        }
    }

    const handlePainTextChange = (event => {
        setPainText(event.target.value)
    })

    const handleGpRadioChange = (event) => {
        if (event.target.value === 'no') {
            setGpRadio(event.target.value)
            setGpText("")
        } else {
            setGpRadio(event.target.value)
        }
    }

    const handleGpTextChange = (event) => {
        setGpText(event.target.value)
    }

    const handleQ3AnswersChange = (event) => {
        const value = event.target.value 
        const isChecked = event.target.checked 

        if (isChecked) {
            setQ3Answers((prev) => [...prev, value])
        } else {
            setQ3Answers((prev) => 
            prev.filter((item) => item !== value)
            )
        }
    }

    const handleAllergiesRadioChange = (event) => {
        if (event.target.value === 'no') {
            setAllergiesRadio(event.target.value)
            setAllergiesText("")
        } else {
            setAllergiesRadio(event.target.value)
        }
    }

    const handleAllergiesTextChange = (event) => {
        setAllergiesText(event.target.value)
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
			dob: dateOfBirth,
			gender: localGender,
            height: height,
            address: address1,
            occupation: occupation,
            ename: eContactName,
            enumber: eContactNumber,
            pain: {
                type: painText,
                gp: gpText
            },
            allergies: allergiesText,
            q3: q3Answers,
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
                        <input id="name" type="text" value={localName} onChange={handleChangeName} />
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
                <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
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
                        <input type="radio" value="yes" name="pain" checked={painRadio === 'yes'} onChange={handlePainRadioChange} /> <label>YES</label>
                        <input type="radio" value="no" name="pain" checked={painRadio === 'no'} onChange={handlePainRadioChange} /> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <p>if selected 'yes', please provide more information</p>
                        <label>Details (Location/area, when did it start etc.)</label>
                        <input type="text" value={painText} onChange={handlePainTextChange} disabled={painRadio != 'yes'}></input>
                    </div>
                    <label>Have you seen a GP or specialist?</label>
                    <div className="radio-answers">
                        <input type="radio" value="yes" name="gp" checked={gpRadio === 'yes'} disabled={painRadio != 'yes'} onChange={handleGpRadioChange}/> <label>YES</label>
                        <input type="radio" value="no" name="gp" checked={gpRadio === 'no'} disabled={painRadio != 'yes'} onChange={handleGpRadioChange}/> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <label>Details</label>
                        <input type="text" value={gpText} onChange={handleGpTextChange} disabled={gpRadio != 'yes' || painRadio != 'yes'}></input>
                    </div>
                    </div>
                    <div className="question" id="question2">
                        <p>Q2.</p>
                        <p>Do you have any allergies, sesitivites, intolerances?</p>
                    </div>
                    <div className="answers">
                    <div className="radio-answers">
                        <input type="radio" value="yes" name="allergies" onChange={handleAllergiesRadioChange} /> <label>YES</label>
                        <input type="radio" value="no" name="allergies" onChange={handleAllergiesRadioChange}/> <label>NO</label>
                    </div>
                    <div className="text-answers">
                        <p>if selected 'yes', please provide more information</p>
                        <label>Details</label>
                        <input type="text" value={allergiesText} onChange={handleAllergiesTextChange} disabled={allergiesRadio != 'yes'}></input>
                    </div>
                    </div>
                </div>
            <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
        )
    }

    function form3() {
        return (
            <div>
                <header>
                    <Header></Header>
                </header>
                <div className="main-3">
                    <div className="client-history-2">
                    <div className="question">
                        <p>Q3.</p>
                        <p>Are you currently experiencing or ever experienced the following?</p>
                    </div>
                    <div className="page3-answers">
                        <div className="checkbox-answers">
                            <input type="checkbox" id="arthritis" value="athritis" onChange={handleQ3AnswersChange} />
                            <label>ARTHRITIS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="blood-pressure" value="Blood Pressure" onChange={handleQ3AnswersChange}/>
                            <label>HIGH/LOW BLOOD PRESSURE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="dizziness" value="dizziness" onChange={handleQ3AnswersChange}/>
                            <label>DIZZINESS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="asthma" value="asthma" onChange={handleQ3AnswersChange}/>
                            <label>ASTHMA</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="fatigue" value="fatigue" onChange={handleQ3AnswersChange}/>
                            <label>FATIGUE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="ibs" value="ibs" onChange={handleQ3AnswersChange}/>
                            <label>IRRITABLE BOWEL SYNDROME</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="migranes" value="migranes" onChange={handleQ3AnswersChange}/>
                            <label>MIGRANES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="lympathic" value="lympathic" onChange={handleQ3AnswersChange}/>
                            <label>LYMPATHIC DISORDERS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="sciatica" value="sciatica" onChange={handleQ3AnswersChange}/>
                            <label>SCIATICA</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="headaches/migranes" value="headaches/migranes" onChange={handleQ3AnswersChange}/>
                            <label>HEADACHES/MIGRAINES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="osteoperosis" value="osteoperosis" onChange={handleQ3AnswersChange}/>
                            <label>OSTEOPEROSIS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="cold-sores" value="cold sores" onChange={handleQ3AnswersChange}/>
                            <label>COLD SORES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="fungal" value="fungal" onChange={handleQ3AnswersChange}/>
                            <label>FUNGAL/BACTERIAL INFECTIONS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="acne" value="acne" onChange={handleQ3AnswersChange}/>
                            <label>ACNE, ECZEMA, PSORIASES</label>
                        </div>
                    </div>

                    <div className="question">
                        <p>Q4.</p>
                        <p>Do you have any of the following?</p>
                    </div>

                    <div className="page3-answers">
                        <div className="checkbox-answers">
                            <input type="checkbox" id="anxiety" value="anxiety" />
                            <label>ANXIETY</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="depression" value="depression" />
                            <label>DEPRESSION</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="diabetes1" value="diabetes1" />
                            <label>DIABETES TYPE 1</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="diabetes2" value="diabetes2" />
                            <label>DIABETES TYPE 2</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="liverDisease" value="liver Disease" />
                            <label>LIVER DISEASE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="ibs" value="ibs" />
                            <label>IRRITABLE BOWEL SYNDROME</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="bloodDisease" value="blood disease" />
                            <label>BLOOD DISEASE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="epilepsy" value="epilepsy" />
                            <label>EPILEPSY</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="heartDisease" value="Heart Disease" />
                            <label>HEART DISEASE/HEART CONDITIONS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="fractures" value="fractured/broken bones" />
                            <label>FRACTURES, DISLOCATIONS, BROKEN BONES, INJURY</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="cold-sores" value="cold sores" />
                            <label>GASTROINTESINAL/DISGESTIVE ISSUES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="other" value="other" />
                            <label>OTHER</label>
                        </div>
                    </div>
                    </div>
                    <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }

    function form4() {
        return(
            <div>
                <header>
                    <Header />
                </header>
                <div className="main-4">
                    <div className="client-history-3">
                        <div className="question">
                            <p>Q5.</p>
                            <p>Are you on any medication?</p>
                        </div>
                        <div className="answers">
                            <div className="radio-answers">
                                <input type="radio" value="YES" name="medication" /> <label>YES</label>
                                <input type="radio" value="NO" name="medication" /> <label>NO</label>
                            </div>
                            <div className="text-answers">
                                <label>Details</label>
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="question">
                            <p>Q6.</p>
                            <p>Have you had any recent or reoccuring infections or viruses?</p>
                        </div>
                        <div className="answers">
                            <div className="radio-answers">
                                <input type="radio" value="YES" name="infections" /> <label>YES</label>
                                <input type="radio" value="NO" name="infections" /> <label>NO</label>
                            </div>
                            <div className="text-answers">
                                <label>Details</label>
                                <input type="text"></input>
                            </div>
                        </div>
                        <div className="question">
                            <p>Q7.</p>
                            <p>Do you smoke or vape?</p>
                        </div>
                        <div className="answers">
                            <div className="radio-answers">
                                <input type="radio" value="YES" name="smoke" /> <label>YES</label>
                                <input type="radio" value="NO" name="smoke" /> <label id="smoke-no">NO</label>
                                <input type="radio" value="SOMETIMES" name="smoke" /> <label>SOMETIMES</label>
                            </div>
                        </div>
                        <div className="question">
                            <p>Q8.</p>
                            <p>Are you pregnant or given birth recently?</p>
                        </div>
                        <div className="answers">
                            <div className="radio-answers">
                                <input type="radio" value="YES" name="medication" /> <label>YES</label>
                                <input type="radio" value="NO" name="medication" /> <label>NO</label>
                            </div>
                            <div className="text-answers">
                                <p>If selected 'yes', how many weeks are you?</p>
                                <input type="text"></input>
                            </div>
                        </div>
                    
                    </div>
                    <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }

    function form5() {
        return(
            <div>
                <header>
                    <Header />
                </header>
                <div className="main-5">
                    <div className="client-history-4">
                        <div className="question">
                            <p>Q9.</p>
                            <p>How frequently do you exercise in a week?</p>
                        </div>
                        <div className="page3-answers">
                        <div className="checkbox-answers">
                            <input type="radio" name="exercise" value="none" />
                            <label>NONE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="radio" name="exercise" value="1-3 hours" />
                            <label>1-3 HOURS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="radio" name="exercise" value="3-6 hours" />
                            <label>3-6 HOURS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="radio" name="exercise" value="7+ hours" />
                            <label>7+ HOURS</label>
                        </div>
                        </div>
                        <div className="question">
                            <p>Q10.</p>
                            <p>What type of exercise do you do?</p>
                        </div>
                        <div className="page3-answers">
                        <div className="checkbox-answers">
                            <input type="checkbox" id="cardio" value="cardio" />
                            <label>CARDIO</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="yoga" value="yoga/pilates" />
                            <label>YOGA/PILATES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="strength" value="strength" />
                            <label>STRENGTH TRAINING</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="mobility" value="mobility" />
                            <label>MOBILITY WORK</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="spin" value="spin/cycle" />
                            <label>SPIN/RPM/CYCLE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="group" value="group fitness" />
                            <label>GROUP FITNESS CLASSES</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="sports" value="sports" />
                            <label>SPORTS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="dance" value="dance" />
                            <label>DANCE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="resistance" value="resistance" />
                            <label>RESISTANCE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="outdoor" value="outdoor" />
                            <label>OUTDOOR WALKS/RUNS</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="selfDefence" value="self defence" />
                            <label>SELF DEFENCE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="q10Other" value="other" />
                            <label>OTHER</label>
                        </div>
                    </div>
                    <div className="question">
                            <p>Q11.</p>
                            <p>What would you like to accomplish from your treatment?</p>
                        </div>
                        <div className="page3-answers">
                        <div className="checkbox-answers">
                            <input type="checkbox" id="increasedMobility" value="increased mobility" />
                            <label>INCREASED MOBILITY</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="painRelief" value="pain relief" />
                            <label>PAIN RELIEF</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="rangeMotion" value="improved range of motion" />
                            <label>IMPROVED RANGE OF MOTION</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="posture" value="improved posture" />
                            <label>IMPROVED POSTURE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="selfCare" value="regular self care" />
                            <label>REGULAR SELF CARE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="wellbeing" value="improve wellbeing" />
                            <label>IMPROVE WELLBEING</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="all" value="all of the above" />
                            <label>ALL OF THE ABOVE</label>
                        </div>
                        <div className="checkbox-answers">
                            <input type="checkbox" id="q11Other" value="other" />
                            <label>OTHER</label>
                        </div>
                    
                    </div>

                    </div>
                    <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }

    function form6() {
        return(
            <div>
                <header>
                    <Header />
                </header>
                <div className="main-6">
                    <div className="consent-form">
                        <h3>CONSENT FORM</h3>
                        <p>Consent for remedial massage: I have chosen to consult with and hereby give consent
                            for massage therapy to be provided by a qualified health practitioner of or
                            subcontracting for Zingara Massage who I understand is a member of a registered
                            Association and holds all the required insurance and certification for massage
                            treatment.
                        </p>
                        <p>
                            I have provided a detailed medical history. I do not expect the therapist to have
                            foreseen any previous or pre- existing condition I have not mentioned.
                        </p>
                        <p>
                            I understand massage may provide benefits for certain conditions but results are not
                            guaranteed. These benefits may include relief of muscular tension, relaxation, reduction
                            of the symptoms of stress related conditions and provision of welbeing.
                        </p>
                        <p>
                            I also understand that massage therapy may produce side effects such as muscle
                            soreness, mild bruising, increased awareness of areas of pain and light headedness
                            amongst other possible temporary outcomes
                        </p>
                        <p>
                            I am aware that the therapist does not diagnose illness, prescribe medications or
                            physically manipulate the spine or its immediate articulations.
                        </p>
                        <p>
                            The therapist understands that I have the right to question procedures used and to
                            receive an explanation of any procedures that the therapist uses.
                        </p>
                        <p>
                            I will tell the therapist about any discomfort I may experience during the therapy
                            session and understand the therapy will be adjusted accordingly.
                        </p>
                        <p>
                            I agree to have my postural assessment and details of my treatment to be shared with
                            my trainer, coach or other professional health practitioner if needed.
                        </p>
                        <p>
                            Failure to notify cancellations 24 hours in advance (extenuating circumstances may be
                            assessed by the massage practitioner) a charge will be incurred of 100% of the massage
                            price or forfeit if pre-paid treatment.
                        </p>
                        <p>
                            As a small business dedicated to the local community, Zingara Massage does their best
                            to deliver exceptional service to you and in return do ask for your on-going support and
                            timely payment within 24 hours of services rendered.
                        </p>
                        <p>
                            The information I have given is true and I agree to the consent form. *
                        </p>
                        <h3>SIGNATURE:</h3>
                        <input type="text" />
                    </div>
                    <Nav index={index} handleNext={handleNext} handlePrevious={handlePrevious} saveToGlobal={saveToGlobal}></Nav>
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
            {index === 2 && form3()}
            {index === 3 && form4()}
            {index === 4 && form5()}
            {index === 5 && form6()}
            {index === 6 && completePage()}
        </div>
    );
}