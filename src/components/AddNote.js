import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote, getNotes } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
     tag: ""
  });
  const handleClick = async (e) => {
    e.preventDefault();

    await addNote(note.title, note.description,note.tag);

    await getNotes(); // 🔥 IMPORTANT

    setNote({ title: "", description: "",tag:"" });
     props.showAlert("Note added successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>

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

        <button
          type="submit"
          disabled={note.title.length<5||note.description.length<5}
          onClick={handleClick}
          className="btn btn-primary"

        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;