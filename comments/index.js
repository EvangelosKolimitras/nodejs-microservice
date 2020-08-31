const express = require('express');
const app = express();
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    const event = {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    }
    await axios.post("http://localhost:4005/events", event)
    res.status(201).send(comments);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
})

app.listen(4001, () => console.log("Listening on port 4001."))