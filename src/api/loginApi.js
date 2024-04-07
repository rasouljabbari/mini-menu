import { getData } from "../utils/GeneralFunctions"
import { MAIN_URL } from "../utils/GeneralVariables"

export async function loginApi(formData) {
    const response = await getData(MAIN_URL, `login`, 'post', { ...formData }, false)
    return response
}