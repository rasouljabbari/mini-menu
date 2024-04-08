import { toast } from 'react-toastify'
import axios from 'axios'
import { MAIN_URL } from './GeneralVariables'
import { apiErrorHandler } from './errorHandling'
import copy from "copy-to-clipboard";

let authToken = localStorage.getItem('Token')

export const getData = async (
    base_url,
    url,
    type,
    dataParams = {},
    isToken = false,
    isHeaderJson = false,
    default_token = null
) => {
    let header = {}
    if (isToken && default_token) {
        header = { headers: { Authorization: `Bearer ${default_token}` } }
        if (isHeaderJson) {
            header = {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${default_token}`,
                    Accept: '*/*',
                    // "Accept-Encoding": "gzip, deflate, br",
                    // "Access-Control-Allow-Origin" : "*/*",
                    // Connection: "keep-alive"
                },
            }
        }
    } else if (isToken) {
        header = {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        }
        if (isHeaderJson) {
            header = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${authToken}`,
                    Accept: '*/*',
                    // "Accept-Encoding": "gzip, deflate, br",
                    'Access-Control-Allow-Origin': '*/*',
                    // 'Access-Control-Allow-Origin':'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    // Connection: "keep-alive"
                },
            }
        }
    }

    if (type === 'post') {
        let formData
        if (isHeaderJson) {
            formData = dataParams
        } else {
            formData = new URLSearchParams()
            for (let key in dataParams) {
                formData.append(key, dataParams[key])
            }
        }
        const response = isToken
            ? await axios.post(base_url + url, formData, header)
            : await axios.post(base_url + url, formData)
        if (response?.status === 200) {
            for (let key in response?.data.messages) {
                toast.success(response?.data.messages[key])
            }
            return { status: response?.status, data: response?.data }
        } else {
            return response
        }
    } else {
        let formData = '?'

        if (
            Object.keys(dataParams).length === 0 &&
            dataParams.constructor === Object
        ) {
            formData = ''
        }
        for (let key in dataParams) {
            formData +=
                formData.slice(-1) === '?'
                    ? `${key}=${dataParams[key]}`
                    : `&${key}=${dataParams[key]}`
        }

            const response = isToken
                ? await axios.get(base_url + url + formData, header)
                : await axios.get(base_url + url + formData)
        console.log(response, response?.status);
        
            if (response?.status === 200) {
                return response?.data
            } else {
                return apiErrorHandler(response);
            }
    }
}

export const getFormDataPost = async (url, formData) => {
    let token = localStorage.getItem('Token')
    let header = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(MAIN_URL + url, formData, header)

    if (response?.status === 200) {
        return { status: response?.status, data: response?.data }
    } else {
        return response
    }
}

export const edit_item_with_id = (lastItems, editItem) => {
    if (lastItems?.length > 0) {
        return lastItems.map((item) => {
            if (parseInt(item?.id) === parseInt(editItem?.id)) {
                return { ...editItem }
            } else {
                return { ...item }
            }
        })
    } else {
        return [editItem]
    }
}

export const edit_item_with_index = (lastItems, editItem, index) => {
    return lastItems.map((item, i) => {
        if (i === parseInt(index)) {
            return { ...editItem }
        } else {
            return { ...item }
        }
    })
}

// Remove

export const remove_item_of_arr_with_id = (arr, id) => {
    let new_array = []
    arr.map((itm) => {
        if (id !== itm.id) {
            new_array.push(itm)
        }
    })
    return new_array
}

export const downloadFileHandler = (url, title) => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    a.download = title
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
export const sortItemsWithString = (items, unit, sortDirection) => {
    return items.sort((a, b) => {
        if (sortDirection === 'inc') {
            return a?.[unit].localeCompare(b?.[unit], 'fa')
        } else {
            return b?.[unit].localeCompare(a?.[unit], 'fa')
        }
    })
}
export const sortItems = (items, unit, sortDirection) => {
    return items.sort((a, b) => {
        if (sortDirection === 'inc') {
            return a?.[unit] - b?.[unit]
        } else {
            return b?.[unit] - a?.[unit]
        }
    })
}

export const dateFormatGenerator = (date, isDashboard = false) => {

    if (date) {
        date = date?.replaceAll('-', '/')
        let year = date?.split('/')[0]
        let month = date?.split('/')[1]
        let day = date?.split('/')[2]

        let generatedDate = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(
            new Date(year, month - 1, day)
        )
        let dateArray = generatedDate.split(' ')

        if (isDashboard) {
            return `${dateArray[3]}`
        } else {
            return `${dateArray[3]}، ${dateArray[2].split(',')[0]} ${dateArray[1]} ${dateArray[0]}`
        }

    } else return '- - -'
}

export const priceCalculator = (price = 0, count = 1, discount = 0) => {
    let totalPrice = null
    if (price > 0 || count > 1) {
        totalPrice = price * count
    }
    if (price > 0 || count > 1 || discount > 0) {
        totalPrice = (price * count) - ((price * count) * discount) / 100
    }
    return totalPrice
}

export const addCustomerOrder = (list, order) => {
    let new_array = [order, ...list]
    return new_array
}

export const downloadFile = (url, params) => {
    const filename = 'orders-report.xlsx';
    let exportFormData = new FormData();
    for (let key in params) {
        exportFormData.append(key, params[key])
    }
    let urlEncodedFormData = new URLSearchParams(exportFormData).toString();
    let fileUrl = `${MAIN_URL}${url}?${urlEncodedFormData}`;
    fetch(fileUrl, {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('Token') })
    })
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  // remove the element again
        });
}

export const dicountPriceHandler = (product) => {
    return parseFloat(
        (product?.price / 100) *
        parseFloat(
            100 -
            parseFloat(product?.marketings?.discount || product?.discount)
        ))
};

export const copyToClipboard = (content) => {
    copy(content);
    toast.info("با موفقیت کپی شد.");
};