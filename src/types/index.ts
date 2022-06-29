export { CandEndpResp } from "./candidate_response"
export { JobAppsEndpRespSimplified } from "./job_application_response"

export interface CandItem {
	candidate_id: string
	first_name: string
	last_name: string
	email: string
	job_app_id: string
	job_app_created_at: string
}
