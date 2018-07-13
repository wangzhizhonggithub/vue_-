<template>
    <div class="containers">
        <div :class="$i18n.locale=='en'?'left_box':'left_box1'">
            <div class="user">
                <div class="icon">
                    <img src="/static/img/icon.png" alt="">
                </div>
                <P class="username">ID:{{userid}}</P>
            </div>
            <div class="content">
                    <div v-for="(item,index) in listdata" class="box" @mouseenter="liEnter(index)" @mouseleave="liLeave(index)" :key="item.name" :title="$t(item.name)">
                            <router-link :to="item.router"  active-class="sec_cur" tag="dl">
                                    <dt>
                                            <img :src="item.url" alt="" v-show="idx!=index && ind!=index" :class="idx==index?'active':''" >
                                            <img :src="item.url1" alt=""  v-show="ind==index" class="1">
                                            <img :src="item.url1" alt=""  v-show="idx==index" class="2">
                                    </dt>
                                    <dd><span>{{$t(item.name)}}</span></dd>
                                </router-link>
                    </div>
            </div>
        </div>
        <div :class="$i18n.locale=='en'?'right_box':'right_box1'">
            <router-view></router-view>

        </div>
    </div>
</template>
<script>
    export default {
        metaInfo(){
            return{
                title:this.title,
                meta:[
                    {
                        name:"keywords",
                        conotent:this.$t("seo.a2")
                    },
                    {
                        name:"description",
                        conotent:this.$t("seo.a3")
                    }
                 ]
             }
        },
        data() {
            return {
                idx:0,//当前划过的下表
                ind:0,  //点击
                userid:'',
                title:this.$t("seo.a7"),
                listdata: [
                        {
                            name:'fins.name1', url: '../../static/img/Ficon1.png',url1: '../../static/img/Ficon_1.png', router: '/financial/account'
                        },
                        {
                            name:'fins.name2', url: '../../static/img/Ficon2.png',url1: '../../static/img/Ficon_2.png', router: '/financial/deposit'
                        },
                        {
                            name:'fins.name3', url: '../../static/img/Ficon3.png', url1: '../../static/img/Ficon_3.png',router: '/financial/withdraw'
                        },
                        {
                            name:'fins.name4', url: '../../static/img/Ficon4.png',url1: '../../static/img/Ficon_4.png', router: '/financial/funds'
                        },
                        {
                            name:'fins.name5', url: '../../static/img/Ficon5.png', url1: '../../static/img/Ficon_5.png',router: '/financial/record'
                        },
                        {
                            name:'fins.name6', url: '../../static/img/Ficon6.png', url1: '../../static/img/Ficon_6.png',router: '/financial/collection'
                        },
                    ]
                    }
        },
        methods: {
            changestyle(index) {  //改变样式
                this.idx=index;
            },
            liEnter(index){
                if(index == this.ind){
                    this.idx=-1;
                }else{
                    this.idx=index;
                }
                // console.log(this.idx);
            },
            liLeave(index){
                this.idx = -1;
                // console.log(this.idx)
            },
            getParams(){  //获得当前页下表
                /* alert(1); */
                this.listdata.forEach((item,index)=>{
                    this.listdata[index].checked=false;
                    if(this.$route.path == item.router){
                        this.ind = index;
                        this.idx = -1;
                        this.listdata[index].checked=true;
                    }
                })
                /* this.listdata[this.ind].checked = true; */
                // console.log(this.ind,this.idx)
            },
        },
        watch:{  //监听路由变化
            '$route': 'getParams'
        },
        mounted(){
            this.getParams();
            this.userid=localStorage.getItem("id")
        },
        created () {
        //     this.$eventBus.$on('ID',function(user){
        //         this.userid=user;
        //    }.bind(this))
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../assets/css/security.scss"
</style>