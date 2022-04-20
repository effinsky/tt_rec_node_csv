import { NextFunction, Request, Response, Router } from "express"
import { get_tt_api_data } from "../services/tt_api"

export const router = Router()

// get request from user
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const data = await get_tt_api_data(api_key)
    // put data into csv
    // return csv
})
