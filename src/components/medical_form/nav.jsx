
export default function Nav(props) {
    let index = props.index

    // Nav bar taking in props to change pages between client form
    return(
    <div className="nav-buttons">
        <button  className={`previous-button ${!index == 0 ? '' : 'hidden'}`} onClick={props.handlePrevious} >Previous</button>
        {index == 5 ? <button onClick={props.saveToGlobal}>Submit</button> : <button onClick={props.handleNext}>Next</button>}
    </div>
    )
}