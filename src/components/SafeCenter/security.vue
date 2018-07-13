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
                <div v-for="(item,index) in listdata" class="box" @mouseenter="liEnter(index)" @mouseleave="liLeave(index)" :key="item.name"
                    :title="$t(item.name)">
                    <router-link :to="item.router" active-class="sec_cur" tag="dl">
                        <dt>
                            <img :src="item.url" alt="" v-show="idx!=index && ind!=index" :class="idx==index?'active':''">
                            <img :src="item.url1" alt="" v-show="ind==index" class="1">
                            <img :src="item.url1" alt="" v-show="idx==index" class="2">
                        </dt>
                        <dd>
                            <span>{{$t(item.name)}}</span>
                        </dd>
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
                idx: -1,//当前划过的下表
                ind: 0,  //点击
                userid: '',//用户id
                leftbox: 'left_box',
                title:this.$t("seo.a6"),
                rightbox: 'right_box',
                listdata: [
                    {
                        name: 'names.name1', url: '../../static/img/icon1.png', url1: '../../static/img/icon_1.png', checked: true, router: '/security/config'
                    },
                    {
                        name: 'names.name2', url: '../../static/img/icon2.png', url1: '../../static/img/icon_2.png', checked: false, router: '/security/authentication'
                    },
                    {
                        name: 'names.name3', url: '../../static/img/icon3.png', url1: '../../static/img/icon_3.png', checked: false, router: '/security/phone'
                    },
                    {
                        name: 'names.name4', url: '../../static/img/icon4.png', url1: '../../static/img/icon_4.png', checked: false, router: '/security/email'
                    },
                    {
                        name: 'names.name5', url: '../../static/img/icon5.png', url1: '../../static/img/icon_5.png', checked: false, router: '/security/loginPassword'
                    },
                    {
                        name: 'names.name6', url: '../../static/img/icon6.png', url1: '../../static/img/icon_6.png', checked: false, router: '/security/tradePassword'
                    },
                    {
                        name: 'names.name8', url: '../../static/img/icon8.png', url1: '../../static/img/icon_8.png', checked: false, router: '/security/verification'
                    },
                    {
                        name: 'names.name9', url: '../../static/img/icon9.png', url1: '../../static/img/icon_9.png', checked: false, router: '/security/history'
                    },
                ]
            }
        },
        methods: {
            changestyle(index) {  //改变样式
                /* alert(1) */
                this.idx = index;
            },
            getParams() {  //获得当前页下表
                /* alert(1); */

                this.idx = this.$route.query.data;
                this.step = this.$route.query.step;

                if (this.step) {
                    localStorage.setItem("step", this.step)

                }
                // console.log(this.$route.path)
                this.listdata.forEach((item, index) => {
                    this.listdata[index].checked = false;
                    if (this.$route.path == item.router) {
                        this.ind = index;
                        this.idx = -1;
                        this.listdata[index].checked = true;
                    }
                })
                /* this.listdata[this.ind].checked = true; */
                // console.log(this.ind,this.idx)
            },
            liEnter(index) {
                if (index == this.ind) {
                    this.idx = -1;
                } else {
                    this.idx = index;
                }
                // console.log(this.idx);
            },
            liLeave(index) {
                this.idx = -1;
                // console.log(this.idx)
            },
            style() {
                if (this.$i18n.locale == 'en') {

                    this.leftbox = 'left_box';
                    this.rightbox = 'right_box';
                } else {

                    this.leftbox = 'left_box1';
                    this.rightbox = 'right_box1';
                }
            }
        },
        watch: {  //监听路由变化
            '$route': 'getParams',
        },
        mounted() {
            this.userid = localStorage.getItem("id")

        },
        created() {
            //     this.$eventBus.$on('ID',function(user){
            //         this.userid=user;
            //    }.bind(this))
            //刷新bug 使用sessionStore会有小问题
            this.listdata.forEach((item, index) => {
                this.listdata[index].checked = false;
                if (this.$route.path == item.router) {
                    this.ind = index;
                    this.idx = -1;
                    this.listdata[index].checked = true;
                }
            })
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../assets/css/security.scss"
</style>