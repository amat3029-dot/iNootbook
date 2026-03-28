import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
       getNotes();
    }
   else
   {
    navigate("/login");
   }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag

    });
  
  }
  const handleClick = async (e) => {
    // e.preventDefault();
    await editNote(note._id, note.title, note.description, note.tag);
    refClose.current.click();
    // console.log("updated successfully");
    // await getNotes(); // 🔥 IMPORTANT
   props.showAlert("updated successfully","success");
                    
    // setNote({ title: "", description: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  name="title"
                  value={note.title}
                  onChange={onChange}
                  placeholder="Title"
                  className="form-control my-2"
                />

                <input
                  type="text"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                  placeholder="Description"
                  className="form-control my-2"
                />
                <input
                  type="text"
                  name="tag"
                  value={note.tag}
                  onChange={onChange}
                  placeholder="tag"
                  className="form-control my-2"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button   disabled={note.title.length<5||note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
}