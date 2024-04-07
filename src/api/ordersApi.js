import { getData } from "../utils/GeneralFunctions"
import { MAIN_URL } from "../utils/GeneralVariables"

export async function ordersListApi() {
    return await getData(MAIN_URL, 'admin/orders', 'get', {}, true)
}

export async function destroyOrderApi(id) {
    return await getData(MAIN_URL, `admin/orders/destroy/${id}`, 'get', {}, true)
}