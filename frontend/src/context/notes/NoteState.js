import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';

    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    // Get all notes
    const getNotes = async() => {
    // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a note
    const addNote = async(title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json();
        //console.log(json);

        const note = {
            title: title,
            description: description,
            tag: tag
        }
        setNotes(notes.concat(note));
    }

    // Edit a note
    const editNote = async(id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        //console.log(json);

        // Logic to edit in the client side
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            } 
        }
        setNotes(newNotes);
    }

    // Delete a note
    const deleteNote = async(id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        //console.log(json);

        const newNotes = notes.filter((note) => {return note._id !==id});
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;