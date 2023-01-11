import React, {useState, useEffect} from "react";
import Switch from "./Switch";
import '../styles/Alarm.css';
import Modal from "../components/UI/Modal/Modal";


const Alarm = (props) =>
{   
    const [alarm, setAlarm] = useState(props.alarm)


    const [id, setId] = useState(props.alarm.id)


    const [setting, setSetting] = useState(false);

    const [setting_day, setSetiing_day] = useState(false)
    function OnSetting(){
        setSetting(!setting)
        if(Object.keys(alarm.day_of_the_week).length>0){
            setSetiing_day(true)
        }
        else
        {
            setSetiing_day(false)
        }
        dayToString()
    }
    function OnSetting_day(){
        setSetiing_day(!setting_day)

    }

    const [hour, setHour] = useState(props.alarm.time.hour)
    const [minute, setMinute] = useState('')
    const [day, setDay] = useState()
    

    const [setting_time, setSetting_time] = useState(false)
    const [day_of_the_week, setDayOfTheWeek] = useState(props.alarm.day_of_the_week)

    const Fday = () =>{
        let content = [];
        for(let i=1; i<=7; i++){
            content.push(<div className={i in day_of_the_week ? "alarm_day_on": "alarm_day_off"}
            onClick = {()=>set_Day_Of_Week(i)}
            >{i}</div>)
        }
        
        return content
    }

    function set_Day_Of_Week(m){
        if(m in day_of_the_week){
            setDayOfTheWeek(current => {
                const copy = {...current};
                delete copy[m];
                return copy;
              });
        }
        else{
            setDayOfTheWeek(current => {
                const copy = {...current};
                copy[m] = true;
                return copy;
              });
        }
        dayToString()
    } 

    useEffect(() =>{
        if (String(props.alarm.time.minute).length === 1) 
        {
            setMinute('0'+String(props.alarm.time.minute))
        }
        else{
            setMinute(String(props.alarm.time.minute))
        }
        dayToString()
    }
    ,[])
    
    function dayToString(){
        let day_string = ""
        for (let key in day_of_the_week) {
            switch(key){
                case '1': day_string += "пн "; break;
                case '2': day_string += "вт "; break;
                case '3': day_string += "ср "; break;
                case '4': day_string += "чт "; break;
                case '5': day_string += "пт "; break;
                case '6': day_string += "сб "; break;
                case '7': day_string += "вс "; break;
                default: break;
            }
          }
        setDay(day_string)
    }

    return(
        <div className="alarm_test">
        <div className="alarm">
            <div className="alarm_content">
                <div className="alarm_time" onClick={()=>setSetting_time(!setting_time)}>{hour}:{minute}</div>
            </div>
            <div className="switch__content">
                <Switch style={{height: '80px'}} active={props.alarm.work}/>
            </div>
            </div>
            {setting === true &&
                     (
                    <div>
                        {/* <input id="highload0" class="checkbox-custom" name="highload0" type="checkbox" 
                            checked={setting_day} onClick={OnSetting_day}/> */}
                        <input class="checkbox-custom" type="checkbox" 
                            checked={setting_day} onClick={OnSetting_day}/>
                        <label class="checkbox-custom-label" onClick={OnSetting_day}>Повторять</label>
                        {/* <label for="highload0" class="checkbox-custom-label" onClick={OnSetting_day}>Повторять</label> */}
                        
                        {setting_day ===true &&
                            (
                                <div class="setting_days">
                                    {Fday()}
                                </div>
                            )
                        } 
                    </div>
                     )
            }
            {setting === false &&
                     (
                    <div className="alarm">
                        <div className="alarm_day">{day}</div>
                        <div className="alarm_button_seting" onClick={OnSetting}>^</div>
                     </div>
                     )
                }
            {setting === true &&
                     (
                    <div className="alarm">
                     <button>Удалить</button>
                     <div className="alarm_button_seting" onClick={OnSetting}>^</div>
                    </div>
                     
                     
                     )
            }

            <Modal visible = {setting_time} setVisible = {setSetting_time}>
            {hour}:{minute}

            </Modal>
        </div>
    )
}

export default Alarm