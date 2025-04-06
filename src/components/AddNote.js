import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
  const { addNote } = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };
  const handleClick = (e) => {
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""});
    e.preventDefault();
  };
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          value={note.title}
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          placeholder="Enter Title"
          onChange={onChange}
          name="title"
          minLength={5}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
        value={note.description}
          className="form-control"
          id="description"
          rows="3"
          onChange={onChange}
          name="description"
          minLength={5}
          required
        ></textarea>
      </div>
      <div className="col-auto">
        <label className="sr-only" htmlFor="tag">
          Username
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <input
            type="text"
            value={note.tag}
            className="form-control"
            id="tag"
            placeholder="Enter Tag"
            name="tag"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
      </div>
      <button disabled={!(note.title.length>=5&&note.description.length>=5&&note.tag.length>=5)} type="submit" className="btn btn-dark" onClick={handleClick}>
        Submit
      </button>
    </form> 
  );
}
