const connectToMongo = require('./db');
connectToMongo();
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
var cors = require('cors')
//express boilerplate code go to their and take it
const express = require('express');
const app = express();
const port = 5000;



// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())
app.use(express.json());
// app.get('/', (req,res)=>
//     res.send("Hello Amar")
// );
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, ()=>{
    console.log(`iNotebook backend running on port ${port}`);
});