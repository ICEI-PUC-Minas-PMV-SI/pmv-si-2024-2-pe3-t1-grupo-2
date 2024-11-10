const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Database')
const db = mongoose.connection
db.on('error', () => console.log("Error in Connecting to Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", (req, res) => { // passar pro resource controller de user
    const { name, email, password } = req.body

    const data = { name, email, password }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("User created Succesfully")
    })
    return res.redirect('signup_successful.html') //página de user logado
})

app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")