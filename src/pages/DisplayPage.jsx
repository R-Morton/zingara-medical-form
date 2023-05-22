import { ClientInfo } from "../components/ClientDisplay";
import { useMedicalData } from "../contexts/ClientMedicalContext";


export default function DisplayPage(props) {

    const globalFormData = useMedicalData();

    return(
            <div>
                <h1>Zingara Medical Forms</h1>


                <h3>There are currently {globalFormData.length} medical forms</h3>

                <h3>List of all forms</h3>

                {globalFormData.map(form => {
                    return(
                        <div key={form.id}>
                            <ClientInfo id={form.id} />
                        </div>
                    )
                })}

            </div>
    )

}