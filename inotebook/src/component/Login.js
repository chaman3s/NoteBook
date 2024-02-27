import React ,{useState,useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import {useHistory} from 'react-router-dom'


function Login() {
  const [Credentials,setCredentials] = useState({email: '', password:''})
  const Context = useContext(noteContext);
  const {loginUser} = Context;
  const history = useHistory();
  const loginCheck=()=>{
    console.log(localStorage.getItem('token'),"loop start")
    for(let i=0;i<=2;i++){
    if(localStorage.getItem('token')){
      history.push("/Home");
      break;
    }
  }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
  loginUser(Credentials.email,Credentials.password);
   setTimeout(()=>{
     console.log("login on ")
    loginCheck();

   },2000)
  
  
  }
      
  
    

  const onchange =  (e) => {
    setCredentials({...Credentials,[e.target.name]:e.target.value })
  }
  return (
    <div div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={Credentials.email} placeholder="Email" aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" value={Credentials.password} onChange={onchange}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
