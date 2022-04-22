import { Request, Response, Router } from "express"
import { create_csv_file, FileCreationResult } from "../helpers/file_ops"
import { get_candidate_data } from "../services/candidate_service"
import path from "path"

export const router = Router()

router.get("/", (_: Request, res: Response): void => {
    res.render("index", {
        title: "Get yo candidate csv",
        heading: "Candidates Resource",
        button_text: "get candidate data",
    })
})

router.get(
    "/candidates_csv",
    async (_: Request, res: Response): Promise<void> => {
        const filepath = "src/assets/files/candidates.csv"

        try {
            const candidate_data = await get_candidate_data()

            if (!candidate_data) {
                res.status(404).send({
                    msg: "the requested resource was not found",
                })

                return
            }

            const file_creation_result: FileCreationResult =
                await create_csv_file(candidate_data, filepath)

            if (file_creation_result.type !== "success") {
                res.status(500).send({
                    msg: "could not generate the requested file",
                })

                return
            }

            res.status(200).sendFile(
                path.resolve(__dirname, "../assets/files/candidates.csv")
            )
        } catch (err) {
            console.error(err)
            res.status(500).send({ error: "server error" })
        }
    }
)
