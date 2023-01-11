import React, {useState, useEffect} from "react";
import css from "./Toolbar.module.css"
import Modal from "../Modal/Modal";

const Toolbar = props =>
{
    const {
        insert = () => {}
    } = props;

    const create = () => {
        let alarm = {}
        alarm.time = {'hour':new Date().getHours(), 'minute': new Date().getMinutes()}
        // setVisible(true)
        insert(alarm)
    }
    const [visible, setVisible] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    return(
        <div className={css.box}>
            <div className={css.button_create} onClick={create}>+</div>
            {/* <button onClick={create}>slawik</button> */}
            <Modal visible ={visible} setVisible={setVisible}>
                <div className={css.modal_time}>
                {hour}:{minute}
                </div>
            </Modal>
        </div>
    )
}

export default Toolbar