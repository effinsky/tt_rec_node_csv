import axios from "axios";

// hit TT api for data
export const get_tt_api_data = async(token: string) => {
    const api_response = await axios.get("", {
        // start with raw axios and move to wrapped service
        headers: {

            // put token somewhere here
        }
    })
    return api_response.data
}