import "../../stylesheets/medicalFormHeader.css"
import logo from "../../assets/logo.png"

export default function Header() {
    return (
        <div className="header">
            <div className="space-above-svg">
            <img id="logo" src={logo} alt="logo"></img>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#4fb1a1" fill-opacity="1" d="M0,128L80,117.3C160,107,320,85,480,101.3C640,117,800,171,960,176C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        </div>
    )
}