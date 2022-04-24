import {
	CandidateItem,
	CandidatesEndpointResponse,
	JobAppsEndpointRespSimplified,
} from "../types"
import { get_tt_data } from "../utils/tt_api"

import urls from "../external_config/urls.json"

type MaybeCandidateItem = CandidateItem | undefined
type MaybeCandidateItems = CandidateItem[] | undefined

export const get_candidate_data = async (): Promise<MaybeCandidateItems> => {
	try {
		const candidates_call_result =
			await get_tt_data<CandidatesEndpointResponse>(urls.candidates_url)

		if (candidates_call_result.type !== "success") {
			return undefined
		}

		const {
			payload: { data: candidate_data },
		} = candidates_call_result

		const unsettled_cand_promises: Promise<MaybeCandidateItem>[] =
			candidate_data.map(async (cand): Promise<MaybeCandidateItem> => {
				const job_application_url =
					cand["relationships"]["job-applications"]["links"][
						"related"
					]

				const job_applications_call_result =
					await get_tt_data<JobAppsEndpointRespSimplified>(
						job_application_url
					)

				if (job_applications_call_result.type !== "success") {
					return undefined
				}

				const {
					payload: { data: job_application_data },
				} = job_applications_call_result

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
					job_application_created_at: job_applications[0]?.created_at,
				}

				return single_cand_processed
			})

		const candidate_info = await Promise.allSettled(unsettled_cand_promises)

		return candidate_info.map((cand_item) =>
			cand_item.status === "fulfilled"
				? cand_item.value
				: cand_item.reason
		)

	} catch (err) {
		console.error(err)

		return undefined
	}
}
