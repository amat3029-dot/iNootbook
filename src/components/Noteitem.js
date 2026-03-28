import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
export default function Noteitem(props) {
    const context=useContext(noteContext);
     const { deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 ">
            <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex mb-3">
                          <h5 className="card-title me-auto p-2">{note.title}</h5>
                    <i className="fa-solid fa-trash p-2" onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully","success");}}></i>
                      <i className="fa-solid fa-pen-to-square mx-2 text-primary p-2"onClick={()=>{updateNote(note)}}/>
                        </div>
                       <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}
