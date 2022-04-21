import { Request, Response, Router } from "express"
import { get_tt_candidates, get_tt_job_applications } from "../services/tt_api"
import ObjectsToCsv from "objects-to-csv"

type CandidateItem = {
    candidate_id: string
    first_name: string
    last_name: string
    email: string
    job_application_id: string
    job_application_created_at: string
}
export const router = Router()

router.get("/", async (_: Request, res: Response): Promise<void> => {
    try {
        // pass this data to the service layer, do all the logic there, and only
        // send back the result
        const data = await get_tt_candidates("candidates")

        const unsettled_cand_promises: Promise<CandidateItem>[] = data.map(
            async (cand: any): Promise<CandidateItem | undefined> => {
                const job_application_url =
                    cand["relationships"]["job-applications"]["links"][
                        "related"
                    ]

                try {
                    const job_application_data = await get_tt_job_applications(
                        job_application_url
                    )

                    const job_applications = job_application_data.map(
                        (job_app: any) => ({
                            id: job_app.id,
                            created_at: job_app.attributes["created-at"],
                        })
                    )

                    const single_cand_processed: CandidateItem = {
                        candidate_id: cand.id,
                        first_name: cand.attributes["first-name"],
                        last_name: cand.attributes["last-name"],
                        email: cand.attributes.email,
                        job_application_id: job_applications[0]?.id,
                        job_application_created_at:
                            job_applications[0]?.created_at,
                    }

                    return single_cand_processed
                } catch (e) {
                    console.error(e)

                    return undefined
                }
            }
        )

        const candidate_info = await Promise.allSettled(
            unsettled_cand_promises
        ).then((v) =>
            v.map((cand_item) =>
                cand_item.status === "fulfilled"
                    ? cand_item.value
                    : cand_item.reason
            )
        )
        const csv = new ObjectsToCsv(candidate_info)
        await csv.toDisk("./src/assets/files/candidates.csv")

        res.attachment("./src/assets/files/candidates.csv").status(200).send()
    } catch (err) {
        console.error(err)
    }
})
