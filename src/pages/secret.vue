<template>
    <div class="cube-page">
        <aheader :headtext='headtext' @toback='toback'></aheader>
        
        <div class="cube_bd" style="bottom:0">
            <div class="back_top" v-if="floorstatus" @click="scrollTOtop">top</div>
            <cube-button :primary="true" @click="openImg" v-if="!openType">开启福利？</cube-button>
            <cube-scroll
            v-if="openType"
            ref="scroll"
            :data="items"
            direction="horizontal"
            class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
                <li v-for="(item, index) in items" 
                :key="index" 
                :class="item.state ? 'list-item active': 'list-item' "
                @click="tapImgTpey(item.type)">{{ item.title }}</li>
            </ul>
            </cube-scroll>
            <alist :list="listimg" ref="mychild"></alist>
        </div>
    </div>
</template>
<script>
import aheader from '@/components/header'
import alist from '@/components/list'
import api from '@/api/api'

export default{
    components: {
        aheader,
        alist
    },
    data(){
        return {
            headtext:"精彩内容",
            listimg: [],
            openType: false,
            floorstatus: false,
            items:[{
                    title:'大胸妹',
                    state: true,
                    type: 34
                },{
                    title:'小清新',
                    state: false,
                    type: 35
                },{
                    title:'文艺范',
                    state: false,
                    type: 36
                },{
                    title:'性感妹',
                    state: false,
                    type: 37
                },{
                    title:'大长腿',
                    state: false,
                    type: 38
                },{
                    title:'黑丝袜',
                    state: false,
                    type: 39
                },{
                    title:'小翘臀',
                    state: false,
                    type: 40
                }],
            type: 34,
            pagenum: 1
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);//返回上一层
        },
        openStorage(){
            if(!window.localStorage){
            return false;
            }else{
                let storage=window.localStorage;
                let flas = storage.getItem("openType")
                if(flas){
                    this.openType = true
                    this.getImage()
                }else{
                    this.openType = false
                }
                
            }
        },
        openImg(){
            if(!window.localStorage){
                this.openType = true
            }else{
                let storage=window.localStorage;
                storage.setItem("openType",'opentype')
                this.openStorage()  
            }
            if(this.openType){
                this.getImage()
            }
        },
        // 图片获取
        getImage(){
            let type = this.type
            let pagenum = this.pagenum
            return api.getImage(type, pagenum).then( res => {
                    let data = res.showapi_res_body
                    let newdata = []
                    for(let i=0; i<20; i++){
                        newdata.push(data[i])
                    }
                    // console.log(data)
                    if(pagenum == 1){
                        this.listimg = newdata
                    }else{
                        let oldData = this.listimg
                        // console.log(oldData)
                        this.listimg = oldData.concat(newdata)
                    }
                    
                })
        },
        tapImgTpey(type){
            this.floorstatus = false; 
            let arr = this.items
            arr.forEach( e => {
                if(e.type == type){
                    e.state = true
                }else{
                    e.state = false
                }
            })
            this.type = type
            this.pagenum = 1
            this.getImage().then(() =>{
                this.scrollTOtop()
            })
        },
        scrollTOtop() {
            this.$refs.mychild.scrollTo();
        }

    },
    created(){
        this.openStorage()  
    }
}
</script>


