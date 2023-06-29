import { Link } from "react-router-dom";
import { useEffect } from "react"
import { useMedicalDispatch } from "../contexts/ClientMedicalContext";
import { getUsers } from "../services/userServices";

export default function Homepage() {

    const medicalDispatch = useMedicalDispatch()

    useEffect(() => {
        getUsers().then(data => medicalDispatch({type:"setup", data: data}))
    }, [])

    return(
        <div>
        <h1>Some homepage</h1>
        <Link to={"/client/form"}>Interactive Form</Link> <br />
        <Link to={"/client/"}>Client List</Link>
        </div>
    )
}