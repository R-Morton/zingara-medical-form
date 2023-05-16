//src/contexts/UserContext.jsx

import { createContext } from "react"

export const defaultUserContextData = {
    name: "",
    email: "",
    age: "",
    gender: "",
    showForm: false,
}


const UserContext = createContext(defaultUserContextData);

export default UserContext;
