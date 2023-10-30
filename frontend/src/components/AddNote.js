import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});
 
  const onChange = (event) => {
    setNote({...note, [event.target.name] : event.target.value});
  }

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert('success', 'Updated Successfully!!');
    setNote({title: "", description: "", tag: ""});
  }

  return (
  <div className="container my-3">
    <h2>Add a Note</h2>
    <form>
      <div className="mb-3 my-2">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
        <div id="title" className="form-text"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea type="text" className="form-control" style={{height: '70px'}} name='description' value={note.description} onChange={onChange} />
      </div>
      <div className="mb-3 my-2">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
        <div id="tag" className="form-text"></div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
  </div>
  )
}

export default AddNote;
