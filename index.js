const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.status(200).json("Hello Word!")
});

app.listen(3000);