import React,{useState} from 'react'
import AlertContext from "./alertContext"
import Alert from "../../component/Alert"
const AlertState=()=> {
    const [alerts, setAlert] = useState(null);
    const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
       
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
    return (
       
       
        <AlertContext.Provider value={{alerts,showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
