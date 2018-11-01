<template>
    <div class="imglist">
        <cube-scroll 
            ref="scroll"
            :scroll-events="['scroll']"
            :options="options"
            @scroll="onScrollHandle"
            @pulling-up="onPullingUp"
            @pulling-down="onPullingDown">
        <div class="cell no_b" v-for="(item, index) in list" :key="index">
            <div class="cell__bd">
                <div class="imgtitle">{{item.title}}</div>
                <img :src="item.thumb" alt="" />
            </div>
        </div>
        </cube-scroll>
    </div>
</template>
<script>
export default {
    props:{
        list:{}
    },
    data(){
        return {
            startY: 0,
            scrollToY: 0,
            scrollToTime: 700,
            scrollToEasing: 'bounce',
        }
    },
    methods:{
        goback(){
            this.$emit('toback')
        },
        // 下拉刷新
        onPullingDown() {
           this.$parent.getImage().then( () =>{
                this.$refs.scroll.forceUpdate()
                this.$refs.scroll.refresh()
           })
        },
        // 上拉加载
        onPullingUp(){
            this.$parent.pagenum = this.$parent.pagenum + 1
            this.$parent.getImage().then( () =>{
                this.$refs.scroll.forceUpdate()
                this.$refs.scroll.refresh()
           })
        },
        // 滚动检测
        onScrollHandle(e){
            let pageY = -(e.y)
            if(pageY > 200){
                this.floorstatus = true; 
            }else{
                this.floorstatus = false; 
            }
        },
    },
    computed: {
        options() {
            return {
                pullDownRefresh: {
                    threshold: 60,
                    stop: 40,
                    txt: '更新成功'
                },
                pullUpLoad: {
                    threshold: 0
                },
                scrollbar: true,
                startY: this.startY  
            }
        },
    },
    created(){
    }
}
</script>