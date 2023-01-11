import React, {useState} from "react";
import "../styles/TimeHour.css";

const TimeHours = (props) =>
{
    const [setting, setSetting] = useState(false);

    return(
        <div className="time_hour">
            <div class="support"></div>
            <div class="clock">
                <div class="numbers">
                    <ul>
	                    <li>0</li>
                        <li>1</li>
                        <li>2</li>
	                    <li>3</li>
                        <li>4</li>
                        <li>5</li>
	                    <li>6</li>
                        <li>7</li>
                        <li>8</li>
	                    <li>9</li>
                        <li>10</li>
                        <li>11</li>
                    </ul>
                </div>
                <div class="clockwise"></div>
            </div>
        </div>
    )

}

export default TimeHours