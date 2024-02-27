import React, { useContext,useEffect,useRef,useState} from "react";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import NoteItem from "./NoteItem";
import alertContext from "../context/alertcontext/alertContext";
function Notes() {
    const alertcon = useContext(alertContext)
    const {showAlert} = useState(alertcon)
    const Context = useContext(noteContext);
    const { notes, getNote,editNote } = Context;
    const  [note,setNote] = useState({id: "",etitle: "",edescription: "",etag:""})
    useEffect(()=>{
      getNote()
       // eslint-disable-next-line
    },[]);
    const updatenote=(currentNote)=>{
      ref.current.click();
      console.log(currentNote)
      setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.etag})

    }
    const ref = useRef(null)
    const refclose = useRef(null)

    const handleClick = (e) => {
      editNote(note.id,note.etitle,note.edescription,note.etag)
      showAlert("Your not successfully update","success")
      refclose.current.click();  

        }
    const onchange =  (e) => {
      setNote({...note,[e.target.name]:e.target.value })
    }

    return (
        <>
        <button type="button" ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">EditNote</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value= {note.etitle}
            onChange={onchange}

            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value= {note.edescription}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value= {note.etag}
            onChange={onchange}
            
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">update</button>
      </div>
    </div>
  </div>
</div>
         <Addnote/>
         <div className="row my-3">
           <h2>show note </h2>
           <div className="container mx-2 ">
             {notes.length===0 && "no note to display"}
           </div>
           {notes.map((enote) => {
           return <NoteItem key={enote._id} updatenote={updatenote} note={enote}/>
         
        })}  
        </div>
        </>
    )
}

export default Notes
