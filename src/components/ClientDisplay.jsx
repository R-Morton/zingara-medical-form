//src/UserInfo.jsx

import { useContext } from "react";
import UserContext from "../contexts/ClientMedicalContext"


export function UserInfo(){
    let user = useContext(UserContext);

    return(
        <div>
            <h1>Name: {user.userData.name}</h1>
            <h1>Email: {user.userData.email}</h1>
            <h1>Age: {user.userData.age}</h1>
            <h1>Gender: {user.userData.gender}</h1>
        </div>
    )
}