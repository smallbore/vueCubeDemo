import Vue from 'vue'
import { Toast } from 'cube-ui'

Vue.use(Toast)

/**
 * 提示与加载工具类
 */
export default class Tips {

    /**
    * 弹出加载提示
    */
    static loading(title = "加载中") {
        if (Tips.isLoading) {
            return;
        }
        Tips.isLoading = true;
        const tip = Toast.$create({
            time: 0,
            txt: title
        })
        tip.show()
    }
    /**
     * 加载完毕
     */
    static loaded() {
        if (Tips.isLoading) {
            Tips.isLoading = false;
            const tip = Toast.$create({
                time: 0,
                txt: ''
            })
            tip.hide()
        }
    }

}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
