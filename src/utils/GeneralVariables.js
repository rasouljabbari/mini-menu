const development = process.env.NODE_ENV !== 'production'

export const MAIN_URL = development ? 'https://menu.ormanrst.com/api/v1/' : '/api/v1/'
export const MAIN_URL_IMAGE = development ? 'https://menu.ormanrst.com/' : '/'

export const SITE_INFO_URL = window?.location?.origin

export const canCreateOrder = false