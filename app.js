import 'express-async-errors'
require('dotenv').config()

import express, { json } from 'express'
const app = express()


//packages
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import xss from 'xss-clean'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'

// database
import connectDB from './db/connect'

// routers


// middleware
import notFound from './middlewares/not-found'
import errorHandlerMiddleware from './middlewares/error-handler'


app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60
    })
)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(json())
app.use(cookieParser(process.env.JWT_SECRET))


app.get("/", (req,res) => {
    res.send(`
     <h1>Welcome Home!</h1>
    `)
})


app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    app.listen(port, () => {
        console.log(`port is listen at http://localhost:${port}/`);
    })
}

start()