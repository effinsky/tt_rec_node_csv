import { Request, Response, Router } from "express"
import { get_tt_candidates, get_tt_job_applications } from "../services/tt_api"

type CandidatePayload = {
    candidate_id: string
    first_name: string
    last_name: string
    email: string
    job_applications: { id: string; created_at: string }[]
}
export const router = Router()

router.get("/", async (_: Request, res: Response): Promise<void> => {
    try {
        const data = await get_tt_candidates("candidates")

        const unresolved_candidate_responses: Promise<CandidatePayload>[] =
            data.map(
                async (cand: any): Promise<CandidatePayload | undefined> => {
                    const job_application_url =
                        cand["relationships"]["job-applications"]["links"][
                            "related"
                        ]

                    try {
                        const job_application_data =
                            await get_tt_job_applications(job_application_url)

                        const job_applications = job_application_data.map(
                            (job_app: any) => ({
                                id: job_app.id,
                                created_at: job_app.attributes["created-at"],
                            })
                        )

                        const single_cand_processed: CandidatePayload = {
                            candidate_id: cand.id,
                            first_name: cand.attributes["first-name"],
                            last_name: cand.attributes["last-name"],
                            email: cand.attributes.email,
                            job_applications,
                        }
                        return single_cand_processed
                    } catch (e) {
                        console.error(e)

                        return undefined
                    }
                }
            )

        Promise.allSettled(unresolved_candidate_responses).then((payload) => {
            // preocess data into a csv file before sending it
            res.status(200).send(JSON.stringify(payload))
        })
    } catch (e) {
        console.error(e)
    }
})
