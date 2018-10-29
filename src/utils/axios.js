import axios from 'axios'
import tip from '@/utils/tip'

export function fetch(url,data) {
    tip.loading()
    return axios.get(url, {
        params: data
    }).then((res) => {
        tip.loaded()
        return Promise.resolve(res.data)
    }).catch((res) => {
        tip.loaded()
        return Promise.reject(res)
    })
}