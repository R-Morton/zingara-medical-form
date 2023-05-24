import { useState } from "react"

export default function ClientNotesForm(props) {

    const {id} = props

    // Read data custom hook defined
    const globalMedicalData = useMedicalData()

    // Write data custom hook defined
    const globalMedicalDispatch = useMedicalDispatch()

    const [localContent, setLocalContent] = useState("")

}