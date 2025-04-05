import { React, useContext,useEffect } from "react";
import UserNotes from "./UserNotes";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
export default function Notes() {
  const { notes,fetchAllNotes } = useContext(noteContext);
  useEffect(()=>{
    fetchAllNotes();
  },[fetchAllNotes])
  return (
    <>
      <AddNote />
      <div className="list-group my-5">
        <div className="container mx-2">
        {notes.length===0? <h3>You have no notes to display</h3>:<h3>Your Notes</h3>}
        </div>
        
        {notes.map((note, key) => {
          return <UserNotes key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}
