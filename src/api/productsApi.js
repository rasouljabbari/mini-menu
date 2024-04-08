import { getData, getFormDataPost } from "../utils/GeneralFunctions"
import { MAIN_URL } from "../utils/GeneralVariables"

export async function productsListApi() {
    return await getData(MAIN_URL, 'admin/products', 'get', {}, true)
}

export async function storeProductApi({ title, image, price }) {
    const dataParams = new FormData()

    dataParams.append('title', title)
    dataParams.append('image', image)
    dataParams.append('price', price)

    return await getFormDataPost(`admin/products`,dataParams)
}

export async function updateProductApi({ title, image, price, id }) {
    const dataParams = new FormData()

    dataParams.append('title', title)
    image && dataParams.append('image', image)
    dataParams.append('price', price)

    return await getFormDataPost(`admin/products/update/${id}`, dataParams)
}

export async function destroyProductApi(id) {
    return await getData(MAIN_URL, `admin/products/destroy/${id}`, 'get', {}, true)
}