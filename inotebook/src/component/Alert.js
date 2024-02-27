import React,{useState,useEffect} from 'react'

function Alert(props) {
    const [alert, setAlert] = useState(null);
useEffect(()=>{
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    
},[setAlert])
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
        {(props)=>{
            setAlert(props)
            console.log(props)
            return(
            <div style={{height: '50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
               <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
            </div>}
            </div>
        )}}
        
        </>
    )
}

export default Alert
