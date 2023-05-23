import { useParams } from "react-router-dom"
import { ClientInfo } from "../components/ClientDisplay"

export default function ClientDisplayById() {

    const {id} = useParams()

    return(
        <div>
        <h1>Client Form</h1>
        <ClientInfo id={id} />
        </div>
    )
}