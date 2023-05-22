import { Route, Routes } from "react-router-dom";
import { MedicalForm } from "./components/ClientForm";
import DisplayPage from "./pages/DisplayPage";
import { ClientInfo } from "./components/ClientDisplay";



function App() {
    return (
        <Routes>
            <Route path="/" element={<h1>Some Homepage</h1>} />
            <Route path="/client" element={<DisplayPage />} />
            <Route path="/client/:id" element={<ClientInfo />} />
            <Route path="/client/form" element={<MedicalForm />} />
        </Routes>
    );
}

export default App;
