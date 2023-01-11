import React, {useState, useEffect} from "react";
import Async from 'react-async';
import "./styles/app.css";
import Alarm from "./components/Alarm";
import Alarms from "./components/UI/Alarms/Alarms";
import axios from 'axios'
import Toolbar from "./components/UI/Toolbar/Toolbar";


import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';  
import TextField from '@mui/material/TextField';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import Stack from '@mui/material/Stack';  
import { TimePicker } from '@mui/x-date-pickers/TimePicker'; 

const alarmsDefault = []
//   {"id": "1", "name": "", "work": true, "time": {"hour": 21, "minute": 1}, "day_of_the_week": {6:false, 5:true}, "repeat": true, "sound_url": ""},
//   {"id": "2", "name": "", "work": false, "time": {"hour": 21, "minute": 2}, "day_of_the_week": {4:true, 1:false}, "repeat": true, "sound_url": ""},
//   // {"id": "3", "name": "", "work": false, "time": {"hour": 21, "minute": 3}, "day_of_the_week": [1,4,6], "repeat": true, "sound_url": ""},
//   // {"id": "4", "name": "", "work": false, "time": {"hour": 21, "minute": 4}, "day_of_the_week": [1,4,6], "repeat": true, "sound_url": ""},
//   // {"id": "5", "name": "", "work": false, "time": {"hour": 21, "minute": 5}, "day_of_the_week": [1,4,6], "repeat": true, "sound_url": ""},
// ]


function App() {

  const [value, setValue] = React.useState(new Date()); 
  // const s_url = "http://192.168.1.126:5000"
  const s_url = "http://localhost:5000"
  // const s_url = ""

  const [alarms, setAlarms] = useState(alarmsDefault)

  const removeAlarm = alarm => {
    axios({
      method: 'DELETE',
      url: s_url+'/alarm/delete',
      data: alarm
    })
    setAlarms(alarms.filter(p => p.id !== alarm.id))
  }
  
  const insert = async alarm => {
    axios({
      method: 'post',
      url: s_url+'/alarm/insert',
      data: alarm
      // url: '/alarm/select'
    })
    .then(function (response) {
      const newAlarms = response.data
      newAlarms.setting = false
      let copy = Object.assign([], alarms);
      copy.unshift(newAlarms)
      setAlarms(copy)
    });
    
  }

  const onSave = alarm => {
    alarms.map(al => {
      if (al.id === alarm.id) {
        if(al.setting === alarm.setting){
          axios({
            method: 'POST',
            url: s_url+'/alarm/update',
            data: alarm
          });
        }
      }
    })
    const newAlarms = alarms.map(al => {
      if (al.id === alarm.id) {
        return alarm
      }
      return al
    })
    setAlarms(newAlarms)
  }


  useEffect(() =>{
    axios({
      method: 'get',
      url: s_url+'/alarm/select'
      // url: '/alarm/select'
  })
  .then(function (response) {
    const newAlarms = response.data.map(al => {
      al.setting = false
      return al
    })
    setAlarms(newAlarms)
    // setAlarms(response.data)


      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });


  
},[])

  const Rts = () => {
    return alarms.map(al => (
      <Alarms 
        alarm={al}  
        removeAlarm={removeAlarm} 
        onSave={onSave}
        key={al.id} 
      />
    ))
  }

  return (
    <div className="App">
      
      {/* <Rts/>
      <Toolbar insert={insert}/> */}


       <LocalizationProvider dateAdapter={AdapterDateFns}>  
      <Stack space={3}>  
      <time picker  
          ampm={false}  
          openTo="hours"  
          views = {['hours', 'minutes', 'seconds']}  
          input format="HH:mm:ss"  
          mask="__:__:__"  
          label="With seconds"  
          value={value}  
          onChange={(newValue) => {  
            setValue(newValue);  
          }  
}  
          renderInput={(parameters) => <TextField {...parameters} />}  
        />  
        <time picker  
          ampmInClock  
          views={['minutes', 'seconds']}  
          input format="mm:ss"  
          mask="__:__"  
          label="Minutes and seconds"  
          value={value}  
          onChange={(newValue) => {  
            setValue(newValue);  
          }  
}  
          renderInput={(parameters) => <TextField {...parameters} />}  
        />  
      </Stack>  
    </LocalizationProvider>   




    </div>
  );
}

export default App;
