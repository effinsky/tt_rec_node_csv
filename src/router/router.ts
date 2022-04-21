import { Request, Response, Router } from "express"
import ObjectsToCsv from "objects-to-csv"
import { get_candidate_data } from "../services/candidate_service"

export const router = Router()

// change route to "/candidates"
// have root route handle sending a html view
router.get("/", async (_: Request, res: Response): Promise<void> => {
    try {
        const candidate_data = await get_candidate_data()
        if (candidate_data) {
            const csv = new ObjectsToCsv(candidate_data)
            await csv.toDisk("./src/assets/files/candidates.csv")

            res.attachment("./src/assets/files/candidates.csv")
                .status(200)
                .send()
        }
    } catch (err) {
        // console.error(err)
    }
})
