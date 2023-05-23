import { Route, Routes } from "react-router-dom";
import { MedicalForm } from "./components/ClientMedicalForm";
import DisplayPage from "./pages/DisplayClientsPage";
import { ClientInfo } from "./components/ClientMedicalDisplay";
import ClientDisplayById from "./pages/ClientFormPage";
import Homepage from "./pages/Homepage";



function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/client" element={<DisplayPage />} />
            <Route path="/client/:id" element={<ClientDisplayById />} />
            <Route path="/client/form" element={<MedicalForm />} />
        </Routes>
    );
}

export default App;
