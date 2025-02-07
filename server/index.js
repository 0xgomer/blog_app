import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import router from "./router/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
}))
app.use('/api', router)
app.use(express.static('uploads'))
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)

        app.listen(PORT, () => {
            console.log(`Server was started on port: ${process.env.PORT}`)
        })
    } catch (err){
        console.log(err)
    }
}

start()