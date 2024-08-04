const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./database')

// Initialize express
const app = express()
app.use(cors())
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("MyJouney Fitness API")
})

app.post("/login", login)

app.get("/workout", getWorkout)

function login(req, res){
    let user = req.body;
    console.log("User: ", JSON.stringify(user))
    if (user.email && user.password) {
        db.login(res, user)
    } else {
        res.status(400).json({ error: 'Username and password are required' });
    }
}

function getWorkout(req, res){
    db.getWorkout(res)
}

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080")
})