<template>
    <div class="cube-page">
        <aheader :headtext='headtext' @toback='toback'></aheader>
    </div>
</template>
<script>
import aheader from '@/components/header'

export default{
    components: {
        aheader
    },
    data(){
        return {
            headtext:"精彩内容",
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);//返回上一层
        },

    }
}
</script>

