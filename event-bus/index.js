const express = require('express')
const app = express()

app.use(express.json());

app.post("/events", async (req, res) => {
    try {
        const event = req.body;
        await axios.post("http://localhost:4000/events", event)
        await axios.post("http://localhost:4001/events", event)
        await axios.post("http://localhost:4002/events", event)

        res.send({ status: 200 })
    } catch (error) {
        console.log(error);
    }
});


app.listen(4005, () => console.log("Listening on 4005."));