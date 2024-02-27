import React ,{useState,useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import {useHistory} from 'react-router-dom'

function Signup() {
    const [Credentials,setCredentials] = useState({email: '', password:'', cpassword:'',name: ''})
  const Context = useContext(noteContext);
  const {signUpUser} = Context;
  let  history = useHistory();

//   logincheck in user side
  const loginCheck=()=>{
    console.log(localStorage.getItem('token'),"loop start")
    for(let i=0;i<=2;i++){
    if(localStorage.getItem('token')){
      history.push("/Home");
      break;
    }
  }
  }
 // api call to use side
  const handleSubmit = (e)=>{
    e.preventDefault();
    try{
    signUpUser(Credentials.email,Credentials.password,Credentials.name,Credentials.cpassword);
   setTimeout(()=>{
     console.log("login on ")
    loginCheck();

   },2000)
  }
  catch(error){
    console.error(error)
  }
  
  }
      
  
    

  const onchange =  (e) => {
    setCredentials({...Credentials,[e.target.name]:e.target.value })
  }
  return (
    <div div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="Name" className="form-label" >Name</label>
          <input type="text" className="form-control" id="name" name="name" value={Credentials.name} placeholder="name" aria-describedby="emailHelp" onChange={onchange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={Credentials.email} placeholder="Email" aria-describedby="emailHelp" onChange={onchange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" value={Credentials.password} onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword" className="form-control" id="cpassword" value={Credentials.cpassword} onChange={onchange} minLength={5} required/>
        </div>
        <button type="submit"  className="btn btn-primary">signup</button>
      </form>
    </div>
  )
}

export default Signup;