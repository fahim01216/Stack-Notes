const express = require('express');
const Note = require('../models/Note');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

// Get all the notes using GET: api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Add a new note POST: api/notes/addnote
router.post('/addnote', fetchUser, async (req, res) => {
    // Create a new note
    try {
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        });

        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch(err) {
        res.json({error: err.message})
    }
})


// Update a existing note PUT: api/notes/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const note = {};

        if(title) {
            note.title = title;
        }
        if(description) {
            note.description = description;
        }
        if(tag) {
            note.tag = tag;
        }

        // Find the note to be updated and then update it
        let savedNote = await Note.findById(req.params.id);

        if(!savedNote) {
            return res.status(404).send('Not Found');
        }

        if(savedNote.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        const updateNote = await Note.findByIdAndUpdate(req.params.id, {$set: note}, {new: true});
        res.json(updateNote);
    }
    catch(err) {
        console.log(err);
        res.json({error: err.message})
    }
})


// Update a existing note PUT: api/notes/updatenote
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted and then delete it
        let savedNote = await Note.findById(req.params.id);

        if(!savedNote) {
            return res.status(404).send('Not Found');
        }

        if(savedNote.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json('Successfully deleted the note');
    }
    catch(err) {
        console.log(err);
        res.json({error: err.message})
    }
})


module.exports = router;