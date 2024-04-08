import { getData } from "../utils/GeneralFunctions"
import { MAIN_URL } from "../utils/GeneralVariables"

export async function ordersListApi() {
    return await getData(MAIN_URL, 'admin/orders', 'get', {}, true)
}

export async function destroyOrderApi(id) {
    return await getData(MAIN_URL, `admin/orders/destroy/${id}`, 'get', {}, true)
}

export async function storeOrderApi(data) {
    const dataParams = {
        full_name: data?.full_name,
        products: data?.items?.map(product => ({
            product_id: product?.id,
            product_count: product?.quantity
        }))
    }
    return await getData(MAIN_URL, `admin/orders`, 'post', dataParams, true, true)
}

export async function updateOrderApi({ id, data }) {
    const dataParams = {
        full_name: data?.full_name,
        products: data?.items?.map(product => ({
            product_id: product?.id,
            product_count: product?.quantity
        }))
    }
    return await getData(MAIN_URL, `admin/orders/update/${id}`, 'post', dataParams, true, true)
}

export async function updateOrderCostApi({ id, paid_cost }) {
    return await getData(MAIN_URL, `admin/orders/paid-cost/${id}`, 'post', { paid_cost }, true, true)
}