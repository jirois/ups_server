require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

app.get("/", (req,res) => {
    res.send(`
     <h1>Welcome Home!</h1>
    `)
})


const port = process.env.PORT || 5000
const start = async () => {
    app.listen(port, () => {
        console.log(`port is listen at http://localhost:${port}/`);
    })
}

start()