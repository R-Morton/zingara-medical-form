import { Link } from "react-router-dom";

export default function Homepage() {
    return(
        <div>
        <h1>Some homepage</h1>
        <Link to={"/client/form"}>Interactive Form</Link> <br />
        <Link to={"/client/"}>Client List</Link>
        </div>
    )
}