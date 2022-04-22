import { Axios, AxiosResponse } from "axios"
import { http_service } from "./http"

export type ApiCallResult<T> =
    | { type: "success"; payload: T }
    | { type: "failure" }

export const get_tt_data = async <T>(
    url: string
): Promise<ApiCallResult<T>> => {
    try {
        const { data } = await http_service.get<any, AxiosResponse<T>>(url)
        return { type: "success", payload: data }
    } catch (err) {
        console.error(err)
        return { type: "failure" }
    }
}
