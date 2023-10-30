const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errors');

connectToMongo();

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Middleware to handle error
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
})