import { http_service } from './http';

export const get_tt_data = async (url: string) =>
    (await http_service.get(url)).data.data
