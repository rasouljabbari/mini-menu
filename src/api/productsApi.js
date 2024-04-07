import { getData } from "../utils/GeneralFunctions"
import { MAIN_URL } from "../utils/GeneralVariables"

export async function productsListApi() {
    return await getData(MAIN_URL, 'admin/products', 'get', {}, true)
}