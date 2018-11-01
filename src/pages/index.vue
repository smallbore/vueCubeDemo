<template>
    <div class="cube-page">
        <aheader :headtext="headtext"></aheader>
        <div class="cube_bd">
            <div class="joke_tpye" v-if="selectedLabelDefault == '笑话'">
                <div class="type-list" data-type="29" ref="dataType" @click="jokeTpye($event)">文字</div>
                <div class="type-list" data-type="10" ref="dataType" @click="jokeTpye($event)">图片</div>
                <div class="type-list" data-type="31" ref="dataType" @click="jokeTpye($event)">声音</div>
                <div class="type-list" data-type="41" ref="dataType" @click="jokeTpye($event)">视频</div>
            </div>
            <div class="back_top" v-if="floorstatus" @click="scrollTo">top</div>
            <cube-scroll 
            ref="scroll"
            :scroll-events="['scroll']"
            :options="options"
            @scroll="onScrollHandle"
            @pulling-up="onPullingUp"
            @pulling-down="onPullingDown">
            
                <cube-tab-panels v-model="selectedLabelDefault">
                    <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
                        <ul v-if="index == 0 && selectedLabelDefault == '首页'">
                            <li class="tab-panel-li" v-for="(hero, index) in item.heroes" :key='index'>
                                <img class="tab-img" :src="hero.img_src" />
                                <div class="fs18 pdtb5">{{hero.english}}</div>
                                <div class="fs14">{{hero.chinese}}</div>
                            </li>
                        </ul>
                        <ul v-else-if="index == 1 && selectedLabelDefault == '收藏'" >
                            <li class="tab-panel-li">
                                <img class="tab-img" :src="item.heroes.img_1366"/>
                                <div class="fs18 pdtb5">{{item.heroes.title}}</div>
                                <div class="fs14">{{item.heroes.description}}</div>
                                <div class="fs14 pdtb5">{{item.heroes.copyright}}
                                    <router-link to="/secret"><i class="cubeic-star"></i></router-link>
                                </div>
                            </li>
                        </ul>
                        <ul v-else-if="index == 2 && selectedLabelDefault == '笑话'" >
                            
                            <li class="tab-panel-li" v-for="(hero, index) in item.heroes" :key='index'>
                                <div class='cell'>
                                    <div class="cell_hd">
                                        <img :src="hero.profile_image" class="profile_image" />
                                    </div>
                                    <div class="cell_bd">
                                        <div class="fs18">{{hero.name}}</div>
                                        <div class="fs14">{{hero.create_time}}</div>
                                    </div>
                                </div>
                                <div class="fs14 pdtb5">{{hero.text}}</div>
                                <div v-if="jokeType == 10">
                                    <img :src="hero.cdn_img" @load="imageLoaded" />
                                </div>
                                <div v-if="jokeType == 31">
                                    <audio :src="hero.voiceuri" />
                                </div>
                                <div class="video_box" v-if="jokeType == 41" @click="videolist(hero.id)">
                                    <video style="width:100%; height:240px" :id="hero.id" :src="hero.video_uri" />
                                    <div class="video-play" v-show="!hero.videoplay"></div>
                                </div>
                            </li>
                            
                        </ul>
                        <ul v-else-if="index == 3">
                            <li>
                                <img src="@/assets/user-default.png" class="user_img">
                                <div class="pad10">user name</div>
                                <div class="cells">
                                    <div class="cell cell_access">
                                        <div class="cell__hd">1.</div>
                                        <div class="cell__bd tl">我的资料</div>
                                        <div class="cell__ft"></div>
                                    </div>
                                    <router-link to="/secret" class="cell cell_access">
                                        <div class="cell__hd">2.</div>
                                        <div class="cell__bd tl">福利图片</div>
                                        <div class="cell__ft"></div>
                                    </router-link>
                                    <div class="cell cell_access">
                                        <div class="cell__hd">3.</div>
                                        <div class="cell__bd tl">我的列表</div>
                                        <div class="cell__ft"></div>
                                    </div>
                                    <div class="cell cell_access">
                                        <div class="cell__hd">4.</div>
                                        <div class="cell__bd tl">我的列表</div>
                                        <div class="cell__ft"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        
                    </cube-tab-panel>
                </cube-tab-panels>
            </cube-scroll>
            
        </div>
        <div class="cube_ft">
            <div class="foot-tab">
                <cube-tab-bar
                    v-model="selectedLabelDefault"
                    :data="tabs"
                    @click="clickHandler"
                    @change="changeHandler">
                </cube-tab-bar>
            </div>
        </div>
        
    </div>
</template>

<script>
import aheader from '@/components/header'
import api from '@/api/api'

export default {
    components: {
        aheader
    },
    data() {
        return {
            headtext:"首页",
            selectedLabelDefault: '首页',
            tabs: [{
                label: '首页',
                icon: 'cubeic-home',
                heroes:[]
            }, {
                label: '收藏',
                icon: 'cubeic-like',
                heroes:[]
            }, {
                label: '笑话',
                icon: 'cubeic-vip',
                heroes:[]
            }, {
                label: '我的',
                icon: 'cubeic-person',
                heroes:[]
            }],
            floorstatus: false,
            jokeType: '29',
            pagenum: 1,
            loadedImages:0,
            startY: 0,
            scrollToY: 0,
            scrollToTime: 700,
            scrollToEasing: 'bounce',
            videoPlay: false,
            videoid: ''
        }
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
    methods: {
        // foot切换
        clickHandler (label) {
        // if you clicked home tab, then print 'Home'
            // console.log(label)
            this.floorstatus = false; 
            this.selectedLabelDefault = label
            this.scrollTo();
            this.$refs.scroll.forceUpdate()
            this.$refs.scroll.refresh()
        },
        changeHandler (label) {
        // if you clicked different tab, this methods can be emitted
        },
        // 下拉刷新
        onPullingDown() {
            let label = this.selectedLabelDefault
            if(label == '首页'){
                this.getEnglish().then(() => {
                    this.$refs.scroll.forceUpdate()
                    this.$refs.scroll.refresh()
                }) 
            }else if(label == '笑话'){
                this.pagenum = 1
                this.getJokes().then( () =>{
                    this.$refs.scroll.forceUpdate()
                    this.$refs.scroll.refresh()
                })
            }else{
                this.$refs.scroll.forceUpdate()
            } 
        },
        // 上拉加载
        onPullingUp(){
            let label = this.selectedLabelDefault
            if(label == '笑话'){
                this.pagenum = this.pagenum + 1
                this.getJokes().then( () =>{
                    this.$refs.scroll.forceUpdate()
                    this.$refs.scroll.refresh()
                })
            }else{
                this.$refs.scroll.forceUpdate()
            }
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
        // 英文获取
        getEnglish(){
            return api.getEnglish().then( res => {
                    let data = res.showapi_res_body.data
                    api.getImageday().then( ref => {
                        let imgs = ref.showapi_res_body.data.img_1366
                        this.tabs[1].heroes = ref.showapi_res_body.data
                        data.forEach( (e) => {
                            e.img_src = imgs
                        })
                        this.tabs[0].heroes = data

                        let newImg = new Image()
                        newImg.src = imgs
                        newImg.onload = () => { // 图片加载成功后
                            this.$refs.scroll.refresh()
                        }
                    })
                })
            
        },
        // 笑话集获取
        getJokes(){
            let type = this.jokeType;
            let num = this.pagenum;
            return api.getJokes(type, num).then( (res) => {
                let data = res.showapi_res_body.pagebean.contentlist
                data.forEach( e => {
                    e.videoplay = false
                })
                if(num == 1){
                    this.tabs[2].heroes = data
                }else{
                    this.tabs[2].heroes = this.tabs[2].heroes.concat(data)
                }
                
                this.$refs.scroll.refresh()
            })
        },
        // 笑话集类型
        jokeTpye(e){
            // $refs dataType 唯一性 
            // console.log(this.$refs.dataType.dataset.type)
            // 原生的方法获取节点属性
            let typeNum = e.target.getAttribute('data-type');
            this.jokeType = typeNum
            this.pagenum = 1
            this.getJokes().then(() =>{
                this.scrollTo();
            })
        },
        imageLoaded() {
            this.loadedImages ++;
            if(this.loadedImages >= this.tabs[2].heroes.length){
                this.$refs.scroll.refresh()
            }
        },
        scrollTo() {
            this.$refs.scroll.scrollTo(
                0,
                this.scrollToY,
                this.scrollToTime,
                // ease[this.scrollToEasing]
            )
        },
        // video play
        videolist(id){
            let videoPlay = this.videoPlay
            let video = document.getElementById(id);
            let data = this.tabs[2].heroes
            let videoid = this.videoid
            if(!videoid){
                video.play();
                this.videoPlay = true
                data.forEach(e => {
                    if(e.id == id){
                        e.videoplay = true
                    }else{
                        e.videoplay = false
                    }
                })
            }else if(id == videoid){
                if(!videoPlay){
                    video.play();
                    this.videoPlay = true
                    data.forEach(e => {
                        if(e.id == id){
                            e.videoplay = true
                        }else{
                            e.videoplay = false
                        }
                    })
                    
                }else{
                    video.pause();
                    this.videoPlay = false
                    data.forEach(e => {
                        e.videoplay = false
                    })
                } 
            }else if(videoid && id != videoid){
                document.getElementById(videoid).pause()
                video.play();
                this.videoPlay = true
                data.forEach(e => {
                    if(e.id == id){
                        e.videoplay = true
                    }else{
                        e.videoplay = false
                    }
                })
            }
            this.videoid = id
            this.tabs[2].heroes = data
        }
    },
    created() {
        this.getEnglish()
        this.getJokes()
    },
    
}
</script>

