require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()


const port = process.env.PORT || 5000
const start = async () => {
    app.listen(port, () => {
        console.log(`port is listen at http://localhost:${port}/`);
    })
}

start()