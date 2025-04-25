import express from "express"
import cors from "cors"
import notasRouter from "./src/routes/notasRouter.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(notasRouter)

export default app;