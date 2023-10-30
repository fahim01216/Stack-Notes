import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const{notes, getNotes, editNote} = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
      // eslint-disable-next-line
    }
    else {
      navigate('/login');
    }
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", ctitle: "", cdescription: "", ctag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, ctitle: currentNote.title, cdescription: currentNote.description, ctag: currentNote.tag});
  }

  const handleClick = (event) => {
    editNote(note.id, note.ctitle, note.cdescription, note.ctag);
    refClose.current.click();
    props.showAlert('success', 'Updated Successfully!!');
  }

  const onChange = (event) => {
    setNote({...note, [event.target.name]: event.target.value});
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <form className="my-3">
                          <div className="mb-3">
                              <label htmlFor="title" className="form-label">Title</label>
                              <input type="text" className="form-control" id="ctitle" name="ctitle" value={note.ctitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="description" className="form-label">Description</label>
                              <textarea type="text" className="form-control" style={{height: '70px'}} id="cdescription" name="cdescription" value={note.cdescription} onChange={onChange} minLength={5} required/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="tag" className="form-label">Tag</label>
                              <input type="text" className="form-control" id="ctag" name="ctag" value={note.ctag} onChange={onChange} />
                          </div>

                      </form>
                  </div>
                  <div className="modal-footer">
                      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button disabled={note.ctitle.length < 5 || note.cdescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container mx-2"> 
            {notes.length === 0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          })}
      </div>
    </>
  )
}

export default Notes;