import { useState } from "react";
import UserContext, {defaultUserContextData} from "../contexts/ClientMedicalContext";
import { UserInfo } from "./ClientDisplay";
import { UserForm } from "./ClientForm";

export function ClientParent() {

    const [userData, setUserData] = useState(defaultUserContextData);

    return(
        <UserContext.Provider value={{userData, setUserData}}>
            <UserForm />
            {userData.showForm && <UserInfo />}
        </UserContext.Provider>
    )
}