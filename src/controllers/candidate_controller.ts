import { Request, Response, Router } from "express"
import { create_csv_file, FileCreationResult as FileCreationRes } from "../utils/file_ops"
import { get_cands_data } from "../services/candidates_service"
import path from "path"

export const router = Router()

export const root_handler = (_: Request, res: Response): void => {
	res.render("index", {
		title: "Get yo candidate csv",
		heading: "Candidates Resource",
		button_text: "get candidate data",
	})
}

export const cands_csv_handler = async (
	_: Request,
	res: Response
): Promise<void> => {
	const filepath = "src/assets/files/candidates.csv"

	try {
		const cands_data = await get_cands_data()

		if (!cands_data) {
			res.status(404).send({
				msg: "the requested resource was not found",
			})

			return
		}

		const file_creation_res: FileCreationRes = await create_csv_file(
			cands_data,
			filepath
		)

		if (file_creation_res.type !== "success") {
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

router.get("/", root_handler)
router.get("/candidates_csv", cands_csv_handler)
