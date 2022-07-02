import { CandItem, CandEndpResp, JobAppsEndpRespSimplified } from "../types"
import { get_tt_data } from "../utils/tt_api"

import urls from "../external_config/urls.json"
import { CandData } from "../types/candidate_response"

type MaybeCandItem = CandItem | undefined
type MaybeCandItems = CandItem[] | undefined

export const get_cands_data = async (): Promise<MaybeCandItems> => {
	try {
		const cands_call_result = await get_tt_data<CandEndpResp>(
			urls.candidates_url
		)

		if (cands_call_result.type !== "success") {
			return undefined
		}

		const {
			payload: { data: candidates_data },
		} = cands_call_result

		const unsettled_cand_promises = process_cands_data(candidates_data)

		return handle_cand_promises(unsettled_cand_promises)
	} catch (err) {
		console.error(err)

		return undefined
	}
}

const process_cands_data = (
	cands_data: CandData[]
): Promise<MaybeCandItem>[] => {
	return cands_data.map(async (cand): Promise<MaybeCandItem> => {
		const job_app_url =
			cand["relationships"]["job-applications"]["links"]["related"]

		const job_apps = await get_job_apps_for_cand(job_app_url)

		if (!job_apps) {
			return undefined
		}

		const single_cand_processed: CandItem = {
			candidate_id: cand.id,
			first_name: cand.attrs["first-name"],
			last_name: cand.attrs["last-name"],
			email: cand.attrs.email,
			job_app_id: job_apps[0]?.id,
			job_app_created_at: job_apps[0]?.created_at,
		}

		return single_cand_processed
	})
}

const get_job_apps_for_cand = async (url: string) => {
	try {
		const job_apps_call_result =
			await get_tt_data<JobAppsEndpRespSimplified>(url)

		if (job_apps_call_result.type !== "success") {
			return undefined
		}

		const {
			payload: { data: job_app_data },
		} = job_apps_call_result

		const job_applications = job_app_data.map((job_app: any) => ({
			id: job_app.id,
			created_at: job_app.attributes["created-at"],
		}))

		return job_applications
	} catch (err) {
		console.error(err)

		return undefined
	}
}

const handle_cand_promises = async (
	unsettled_cand_promises: Promise<MaybeCandItem>[]
) => {
	const cand_info = await Promise.allSettled(unsettled_cand_promises)

	return cand_info.map((cand_item) =>
		cand_item.status === "fulfilled" ? cand_item.value : cand_item.reason
	)
}
