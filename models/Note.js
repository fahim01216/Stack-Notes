const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        maxlength: [20, 'Title should not exceed 20 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [6, 'Description should be atleast 6 characters']
    },
    tag: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);