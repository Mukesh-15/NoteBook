import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import EditNote from "./EditNote";

export default function UserNotes(props) {
  const getGMTTime = (isoString) => {
    const date = new Date(isoString);
    return date.toUTCString(); // Returns a readable GMT format
  };
  const timeAgo = (isoString) => {
    const now = new Date();
    const past = new Date(isoString);
    const diffInSeconds = Math.floor((now - past) / 1000); // Difference in seconds

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <EditNote showModal={showModal} setShowModal={setShowModal} _id= {props.note._id} title={props.note.title} description={props.note.description} tag={props.note.tag}/>
      <div className="list-group-item list-group-item-action flex-column align-items-start my-1">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.note.title}</h5>
          <small>{timeAgo(getGMTTime(props.note.date))}</small>
        </div>
        <p className="mb-1">{props.note.description}</p>
        <small>{props.note.tag}</small>
        <br />
        <i
          className="m-2"
          style={{ fontSize: "1.2em" }}
          onClick={() => {
            deleteNote(props.note._id);
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </i>
        <i className="m-2" style={{ fontSize: "1.2em" }}>
          <ion-icon name="create-outline" onClick={()=>{setShowModal(true)}}></ion-icon>
        </i>
      </div>
    </>
  );
}
