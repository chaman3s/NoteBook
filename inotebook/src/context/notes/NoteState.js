import React,{useState} from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
    const host = "http://localhost:90"
    const noteApi = `${host}/api/notes`
 
    const noteData =[]
      const [notes,setNote] = useState(noteData)
      // get note
      const getNote = async () => {
        const url = `${noteApi}/fetchallnotes`
        const response = await fetch(url, {
          method: 'GET', 
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YmI2M2NiZDg5YTAyNWQyMzg2NDY5In0sImlhdCI6MTYzMzQwMDM4MH0.Wh9nEYJFX1WSLvrAochsNuOlOeQoj-A2Q4q4ltSpQhI'
            
          },
        });
        const updateData= await response.json()
        console.log(updateData)
        setNote(updateData)
      }
      const addNote = async(title,description,tag) => {
        console.log("Add new note")
        const url = `${noteApi}/addnote`
        const response = await fetch(url,{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YmI2M2NiZDg5YTAyNWQyMzg2NDY5In0sImlhdCI6MTYzMzQwMDM4MH0.Wh9nEYJFX1WSLvrAochsNuOlOeQoj-A2Q4q4ltSpQhI'
            
          },
          body: JSON.stringify({title,description,tag}) 
        });
     
        const updateData= await response.json();

        setNote(notes.concat(updateData))
      }
        //signup api call
        const signUpUser = async(email, password,name,cpassword) => {
          
          if(cpassword===password){
          const url = `${host}/api/auth/create`

          const response = await fetch(url,{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({name,email,password,}) 
          });
       
          const updateData= await response.json();
          console.log(updateData);
          if(updateData.success===true) {
            localStorage.setItem('token', updateData.authtoken);          
        }
        else{
          alert(updateData.errors);
        }
      }
      else{
        alert("Error password does not match")
      }
        }
      //login api call
      const loginUser = async(email, password) => {
        const url = `${host}/api/auth/login`
        const response = await fetch(url,{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({email,password}) 
        });
     
        const updateData= await response.json();
        console.log(updateData);
        if(updateData.success===true) {
          localStorage.setItem('token', updateData.authtoken);          
      }
      else{
        alert(updateData.errors);
      }
    }
    
         //delete  note
      const deleteNote =async (id) =>{
        const url = `${noteApi}/deletenote/${id}`
        const response = await fetch(url, {
          method: 'DELETE' , 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YmI2M2NiZDg5YTAyNWQyMzg2NDY5In0sImlhdCI6MTYzMzQwMDM4MH0.Wh9nEYJFX1WSLvrAochsNuOlOeQoj-A2Q4q4ltSpQhI'
            
          }, 
        });
     
        const updateData= response.json();
        console(updateData,"update");

        const NewNote = notes.filter((note)=>{return note._id!==id})
        setNote(NewNote)
      }
      const editNote = async (id,title,description,tag) =>{
        //api call to edit
          const url = `${noteApi}/updatenote/${id}`
          const response = await fetch(url, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YmI2M2NiZDg5YTAyNWQyMzg2NDY5In0sImlhdCI6MTYzMzQwMDM4MH0.Wh9nEYJFX1WSLvrAochsNuOlOeQoj-A2Q4q4ltSpQhI'
              
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const updateData=  await response.json();

          let newNotes =  JSON.parse(JSON.stringify(notes))
        
          for(let i=0;i<notes.length;i++){
            const element=newNotes[i]
            if(element._id=id){
              newNotes[i].title=title;
              newNotes[i].description=description;
              newNotes[i].tag=tag;
            }
            break;
          }
          setNote(newNotes);
      }

    return(
        <NoteContext.Provider value={{notes,deleteNote,editNote,addNote,getNote,loginUser,signUpUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;