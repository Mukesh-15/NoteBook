import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function EditNote(props) {
  const { editNote } = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (props.showModal) {
      setNote({
        title: props.title || "",
        description: props.description || "",
        tag: props.tag || "",
      });
    }
  }, [props.showModal, props.title, props.description, props.tag]);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(props._id, note.title, note.description, note.tag);
    props.setShowModal(false);
  };

  return (
    <>
      {props.showModal && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Note</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => props.setShowModal(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter Title"
                        value={note.title}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter Description"
                        value={note.description}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tag">Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="Enter Tag"
                        value={note.tag}
                        onChange={onChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                    disabled={
                      !(
                        note.title.length >= 5 &&
                        note.description.length >= 5 &&
                        note.tag.length >= 5
                      )
                    }
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
