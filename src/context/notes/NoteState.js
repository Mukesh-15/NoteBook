import { useContext, useState  } from "react";
import NoteContext from "./noteContext";
import alertContext from "./alertContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const inotes = [];
  const [notes, setNotes] = useState(inotes);

  const {setAlert} = useContext(alertContext);


  //fetch all notes
  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOWZiNWQ2OGZlMDRlODg1Yjg2NjJkIn0sImlhdCI6MTc0MDI0MTc4Mn0.lAXro1H9X3R_ODUKSTZMy1j27SDixdGdyDgXaVTZo1w",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //ADD Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, { 
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOWZiNWQ2OGZlMDRlODg1Yjg2NjJkIn0sImlhdCI6MTc0MDI0MTc4Mn0.lAXro1H9X3R_ODUKSTZMy1j27SDixdGdyDgXaVTZo1w",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    setNotes(notes.concat([{_id:json._id,title,description,tag}]));
    setAlert("success","Note added successfully");
  };

  //Delete Note
  const deleteNote = async (note_id) => {
    // api call
    const response = await fetch(`${host}/notes/deletenote/${note_id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOWZiNWQ2OGZlMDRlODg1Yjg2NjJkIn0sImlhdCI6MTc0MDI0MTc4Mn0.lAXro1H9X3R_ODUKSTZMy1j27SDixdGdyDgXaVTZo1w",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== note_id;
    });
    setNotes(newNotes);
    setAlert("success","Note deleted successfully");
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOWZiNWQ2OGZlMDRlODg1Yjg2NjJkIn0sImlhdCI6MTc0MDI0MTc4Mn0.lAXro1H9X3R_ODUKSTZMy1j27SDixdGdyDgXaVTZo1w",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //edit for client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;

        break;
      }
      
    }
    setNotes(newNotes);
    setAlert("info","Note updated successfully");
  };

  
  return (
    <NoteContext.Provider
      value={{ notes, addNote, fetchAllNotes, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
