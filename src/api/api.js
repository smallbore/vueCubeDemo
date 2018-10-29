
import {commonParams, options} from './config'
import { fetch } from '@/utils/axios'

const URL = 'https://route.showapi.com/'

// 励志英文
export function getEnglish() {
    const url = URL + '1211-1'
    const data = Object.assign({}, commonParams, {
        count: '10'
    })
    return fetch(url, data)
}
// 每日图片
export function getImageday() {
    const url = URL + '1287-1'
    const data = Object.assign({}, commonParams, {
        
    })
    return fetch(url, data)
}

// 笑话集
export function getJokes(type,pagenum) {
    const url = URL + '255-1'
    const data = Object.assign({}, commonParams, {
        type: type,
        page: pagenum
    })
    return fetch(url, data)
}

// 无用的百度图片api，我靠，搞了我一天
export function getPhotoList() {
    const url = '/api/getPhotoList'

    const data = Object.assign({}, commonParams, {
        pn: 1,
        rn:10,
        tag1: '壁纸',
        tag2: '唯美'
    })
    return fetch(url, data)
}

export default{
    getEnglish,
    getImageday,
    getJokes
}