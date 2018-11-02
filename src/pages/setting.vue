<template>
    <div class="cube-page">
        <aheader :headtext="headtext" @toback='toback'></aheader>
        <div class="cells">
            <div class="cell">
                <div class="cell__bd">
                    <cube-switch v-model="value">{{value? '关闭' : '开启'}}福利图片</cube-switch>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import aheader from '@/components/header'
    
export default{
    components:{
        aheader
    },
    data(){
        return {
            headtext:"我的设置",
            value: true
        }
    },
    methods:{
        toback(){
            this.$router.go(-1); // 返回上一层
        },
        getStorage(){
            if(!window.localStorage){
            return false;
            }else{
                let storage=window.localStorage;
                let flas = storage.getItem("openType")
                if(flas){
                    this.value = true
                }else{
                    this.value = false
                }
                
            }
        },
    },
    created(){
        this.getStorage()
    },
    watch: {
        value:function(curVal,oldVal){
            console.log(curVal)
            if(curVal){
                if(!window.localStorage){
                return false;
                }else{
                    let storage=window.localStorage;
                    storage.setItem("openType",'opentype')
                }
            }else{
                if(!window.localStorage){
                return false;
                }else{
                    let storage=window.localStorage;
                    storage.removeItem("openType");
                }
            }
        }
        // value: {  // 这监听对象值的改变 和上面的不一样。
        //     handler(curVal,oldVal){
        //         console.log(curVal);
        //     },
        //     // immediate: true, //加载触发
        //     // deep: true,  // 对象
        // },
    },

}
</script>
