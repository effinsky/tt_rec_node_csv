import axios from "axios"
import { config } from "dotenv"
import Express, { NextFunction, Request, Response } from "express"
import { get_tt_api_data } from "./services/tt_service"

const app = Express()

if (process.env.NODE_ENV !== "production") {
    config()
}
const api_key = process.env.SUPER_SECRET_KEY

// get request from user
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const data = await get_tt_api_data(api_key)
    // put data into csv
    // return csv
})

const PORT = process.env.PORT
app.listen(PORT, () => void console.log(`app listening on port ${PORT}`))
