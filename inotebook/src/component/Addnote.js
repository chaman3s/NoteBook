import React,{ useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";
function Addnote() {
  const  [note,setNote] = useState({title: "",description: "",tag:""})
  const context = useContext(noteContext);
  const {addNote} = context;
  const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title: "",description: "",tag:""})
  }
  const onchange =  (e) => {
    setNote({...note,[e.target.name]:e.target.value })
  }
  return (
    <div className="container my-3">
      <h2>Add note </h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            titlearia-describedby="emailHelp"
            value={note.title}
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
            id="description"
            name="description"
            value= {note.description}
            onChange={onchange
              }
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
            id="tag"
            name="tag"
            value= {note.tag}
            onChange={onchange}
          />
        </div>
        <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addnote;
