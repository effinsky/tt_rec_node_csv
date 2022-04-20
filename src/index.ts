import axios from "axios"
import { config } from "dotenv"
import Express, { NextFunction, Request, Response } from "express"
import { router } from "./router"

const app = Express()
app.use(router)

if (process.env.NODE_ENV !== "production") {
    config()
}
export const api_key = process.env.SUPER_SECRET_KEY

const PORT = process.env.PORT
app.listen(PORT, () => void console.log(`app listening on port ${PORT}`))
