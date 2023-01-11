import React, {useState, useEffect} from "react";
import css from "./Alarms.module.css";
import Switch from "../../Switch";
import AlarmToolbar from "../AlarmToolbar/AlarmToolbar";
import Setting from "../Setting/Setting";
import Modal from "../Modal/Modal";

const Alarms = props => {
    
    const {
        alarm = {}, 
        removeAlarm = () => {},
        onSave,
    } = props;
    
    const [setting, setSetting] = useState(alarm.setting);
    const [visible, setVisible] = useState(false);

    return(
        <div className={css.alarms}>
            <div className={css.alarm_box}>
                <div className={css.alarm_time} onClick={()=>setVisible(true)}>{alarm.time.hour}:{String(alarm.time.minute).length != 1 ? alarm.time.minute : '0'+alarm.time.minute}</div>
                <Switch alarm={alarm} onSave={onSave} />
            </div>
            <Setting 
                alarm={alarm} 
                show={setting} 
                onSave={onSave} 
            />
            <AlarmToolbar 
                alarm={alarm} 
                show={setting} 
                className={css.alarm_box} 
                onSave={onSave} 
                removeAlarm ={removeAlarm}
            />
            <Modal visible ={visible} setVisible={setVisible}>
                <div className={css.modal_time}>
                {alarm.time.hour}:{String(alarm.time.minute).length != 1 ? alarm.time.minute : '0'+alarm.time.minute}
                </div>
            </Modal>
        </div>
    )

}

export default Alarms