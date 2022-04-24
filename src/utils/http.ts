import axios from "axios"
import { api_key } from "../app"

export const http_service = axios.create()

http_service.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers["Authorization"] = `Token token=${api_key}`
        config.headers["Content-Type"] = "application/vnd.api+json"
        config.headers["X-Api-Version"] = "20210218"
    }

    return config
})
