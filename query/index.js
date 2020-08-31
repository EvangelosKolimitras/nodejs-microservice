const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {

})
app.post("/events", (req, res) => {

})

app.listen(4002, () => console.log("Listeing on 4002."))