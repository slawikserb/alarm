import React, {useState, useEffect} from "react";
import axios from 'axios';
import css from "./SoundFile.module.css"
import "./SoundFile.module.css"
import Diamond from './alarm_while.png';

const SoundFile = props => {
  
  

    const {
        alarm,
        onSave = () => {}
    } = props;

    const [audio] = useState(new Audio(alarm.sound_url));
    // const [state, setState] = useState({
    //   selectedFile: alarm.sound_url
    //   });
    const Play = () =>{
      console.log(alarm.sound_url)
    }

    const onFileChange = event => {
      alarm.sound_url = event.target.files[0]
      onSave(alarm)
      // setState({ selectedFile: event.target.files[0] });
    };
    return(
        <div>
            <div className={css.input_wrapper}>
              <input name="file" type="file" onChange={onFileChange} className={css.input_file}  accept=".mp3"/>
              <label for="input_file" className={css.input_file_button}>
              <span className={css.input_file_icon_wrapper}><img className={css.input_file_icon_wrapper} src={Diamond} alt="Выбрать файл" width="25" /></span>
              <span className={css.input_file_button_text}>{alarm.sound_url === "" ? "Выберите музыку" : alarm.sound_url.name}</span>
              
              </label>
              {/* <button onClick={Play}>1</button> */}
            </div>
        </div>
    )
}

export default SoundFile
