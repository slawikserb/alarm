import React, {useState, useEffect} from "react";
import "../styles/Switch.css";

const Switch = ({alarm, onSave}) =>
{

    const [work, setWork] = useState(alarm.work)

    
    const click = (e) => {
        
        setWork(!work)
        alarm.work = !alarm.work
        setTimeout(() => {
            onSave(alarm)
        }, 500)
    }

    return(
        <div>
            <div className={`switch-btn ${work ? "switch-on" : ""}`} onClick={click}/>
        </div>
    )
}

export default Switch