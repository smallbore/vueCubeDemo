import utils from '@/utils/utils'

export const commonParams = {
    format: 'jsonp',
    showapi_appid: 44966,
    showapi_sign: '6cae83dfd63e4c52af67dd9fe32dbe1c',
    showapi_timestamp: utils.getCurrentTime()
}

export const options = {
    param: 'Callback'
}

export const ERR_OK = 0