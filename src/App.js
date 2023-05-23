import { Route, Routes } from "react-router-dom";
import { MedicalForm } from "./components/ClientForm";
import DisplayPage from "./pages/DisplayPage";
import { ClientInfo } from "./components/ClientDisplay";
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
