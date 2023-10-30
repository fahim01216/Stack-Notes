const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/notesUserDB";
const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true })
            .then(() => {
                console.log('Mongo connected successfully!!');
            })
            .catch((err) => {
                console.log(err);
            });
}

module.exports = connectToMongo;