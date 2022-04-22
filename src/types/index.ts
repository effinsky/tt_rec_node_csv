export { CandidatesEndpointResponse } from "./candidate_response"
export {JobApplicationsEndpointResponse} from "./job_application_response"

export interface CandidateItem {
    candidate_id: string
    first_name: string
    last_name: string
    email: string
    job_application_id: string
    job_application_created_at: string
}
