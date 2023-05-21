import { Route, Routes } from "react-router-dom";
import { MedicalForm } from "./components/ClientForm";


function App() {
    return (
        <Routes>
            <Route path="/" element={<h1>TODO</h1>} />
            <Route path="/medical-form" element={<MedicalForm />} />
        </Routes>
    );
}

export default App;
