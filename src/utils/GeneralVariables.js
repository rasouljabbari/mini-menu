const development = process.env.NODE_ENV !== 'production'

export const MAIN_URL = development ? 'http://127.0.0.1:8000/api/' : '/api/'
export const MAIN_URL_IMAGE = development ? 'http://127.0.0.1:8000/storage/' : '/'

export const SITE_INFO_URL = window?.location?.origin

export const canCreateOrder = false