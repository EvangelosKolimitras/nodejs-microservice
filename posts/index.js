const express = require('express');
const app = express();
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex")
    const { title } = req.body;
    posts[id] = {
        id, title
    }
    const event = {
        type: "PostCreated",
        data: {
            id, title
        }
    }
    await axios.post("http://localhost:4005/events", event)
    res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
})

app.listen(4000, () => console.log("Listening on port 4000."))