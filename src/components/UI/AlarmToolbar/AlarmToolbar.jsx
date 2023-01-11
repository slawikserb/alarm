import React, {useState, useEffect} from "react";
import css from "./AlarmToolbar.module.css"
import Diamond from './vedro_while.png';

const week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

const AlarmToolbar = props =>
{ 
    const {
        alarm, 
        show,
        className, 
        removeAlarm,
        onSave = () => {}
    } = props;

    const [day, setDay] = useState()
    
    function OnSetting(){
        alarm.setting = !alarm.setting
        onSave(alarm)
        dayToString()
    }

    
    function dayToString(){
        let day_string = ""
        // alarm.day_of_the_week.sort()
        for (let key in alarm.day_of_the_week) {
            // console.log (alarm.day_of_the_week[key])
            switch(key) {
                case "1": day_string += "пн "; break;
                case "2": day_string += "вт "; break;
                case "3": day_string += "ср "; break;
                case "4": day_string += "чт "; break;
                case "5": day_string += "пт "; break;
                case "6": day_string += "сб "; break;
                case "7": day_string += "вс "; break;
                default: break;
            }
          }
        setDay(day_string)
    }

    useEffect(() =>{
        // if (alarm.setting === undefined){
        //     alarm.setting = false
        //     onSave(alarm)
        // }
        dayToString()
    },[])

    function deletes ()
    {
                removeAlarm(alarm)
        // for (let als in alarms){
        //     if(alarm.id === als.id){
        //         console.log(als.id)
        //         delete alarms[als]
        //         setAlarms(alarms)
        //     }
        // }
    }

    return(
        <div className={css.alarm_setting}>
            {
                (alarm.setting === false || alarm.setting === undefined)  ?
                    (alarm.repeat === true) ?
                        <div className={css.alarm_tolbar}>
                            <div className={css.alarm_day} onClick={OnSetting}>{day}</div>
                            <div className={css.alarm_button_seting} onClick={OnSetting}>^</div>
                        </div>
                        :
                        <div className={css.alarm_tolbar}>
                            <div className={css.alarm_day} onClick={OnSetting}></div>
                            <div className={css.alarm_button_seting} onClick={OnSetting}>^</div>
                        </div>
                    :
                    <div className={css.alarm_tolbar} >
                        <div  className={css.alarm_button_delete} onClick={deletes}>
                            <img className={css.input_button_delete_icon} src={Diamond} alt="Выбрать файл" width="25" />
                            <span className={css.alarm_button_delete_text}>Удалить</span>
                        </div>
                        <div className={css.alarm_button_seting} onClick={OnSetting}>^</div>
                    </div>
            }
        </div>
    )
}
export default AlarmToolbar
