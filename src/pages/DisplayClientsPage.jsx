import { Link } from "react-router-dom";
import { ClientInfo } from "../components/ClientMedicalDisplay";
import { useMedicalData } from "../contexts/ClientMedicalContext";


export default function DisplayPage(props) {

    const globalFormData = useMedicalData();

    return(
            <div>
                <h1>Zingara Medical Forms</h1>


                <h3>There are currently {globalFormData.length} medical forms</h3>

                <h3>List of all forms</h3>

                {globalFormData.map(form => { // Find each client in global state and return a link to a dynamic page for each.
                    return(
                        <div key={form._id}>
                            <Link to={`/client/${form._id}`}>{form.name}</Link>
                        </div>
                    )
                })}

            </div>
    )

}