import axios from "axios"

// consider using single func for comm
export const get_tt_candidates = async (url: string) => {
    const api_response = await axios.get(
        `https://api.teamtailor.com/v1/candidates`,
        {
            headers: {
                Authorization:
                    "Token token=XKmwrYWiHF8awm7ZxejkwSRevwcqP3jk1hDfLC_C",
                "X-Api-Version": "20210218",
                "Content-Type": "application/vnd.api+json",
            },
        }
    )
    return api_response.data.data
}

export const get_tt_job_applications = async (url: string) => {
    const api_response = await axios.get(url, {
        headers: {
            Authorization:
                "Token token=XKmwrYWiHF8awm7ZxejkwSRevwcqP3jk1hDfLC_C",
            "X-Api-Version": "20210218",
            "Content-Type": "application/vnd.api+json",
        },
    })
    return api_response.data.data
}
