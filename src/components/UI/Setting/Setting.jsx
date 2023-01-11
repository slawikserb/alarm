import React, {useState, useEffect} from "react";
// import "./Setting.module.css";
import css from "./Setting.module.css";
import SoundFile from "../SoundFile/SoundFile";

const week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

const Setting = props => {
    
    const {
        alarm, 
        show, 
        onSave = () => {}
    } = props;

    const OnSetting_day = e => {
        alarm.repeat = !alarm.repeat
        onSave(alarm)
    }

    const set_Day_Of_Week = (index, remove = false) =>{
        if (remove) {
            delete alarm.day_of_the_week[index]
            // alarm.day_of_the_week.splice(alarm.day_of_the_week.indexOf(index),1);
        } else {
            alarm.day_of_the_week[index] = true
        }
        onSave(alarm)
    }

    if (!show) return null

    return(
        <div>
            <input className="checkbox-custom" type="checkbox" 
                checked={alarm.repeat} onChange={OnSetting_day}/>
            <label className="checkbox-custom-label" onClick={OnSetting_day}>Повторять</label>
            {
                alarm.repeat &&
                <div className="setting_days">
                    {
                        week.map((day, i) => (
                            <div 
                                className={alarm.day_of_the_week[i+1] !== undefined ? css.day_on : css.day_off}
                                onClick = {()=>set_Day_Of_Week(i+1, alarm.day_of_the_week[i+1])}
                                key={i}
                            >
                                {day}
                            </div>
                        ))
                    }
                </div>
            }
            {/* <SoundFile alarm = {alarm} onSave = {onSave}/> */}
        </div>
    )

}
export default Setting