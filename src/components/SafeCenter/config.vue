<template>
    <div class="c_conent">
        <div class="c_header">
            <h2>{{$t("message.list1")}}</h2>
        </div>
        <div class="intru">
            <p>{{$t("message.intru1")}}<span style="color:#00aedd;">{{moble}}</span></p>  
            <p v-if="Number(level==0)">{{$t("message.intru21")}}
                <span  style="color:#00aedd;cursor: pointer;" @click="goauthe">{{$t("message.intru3")}}</span>
                <span  style="color:#00aedd;cursor: pointer;" @click="gorate">{{$t("config.a1")}}</span>
            </p>
            <p v-if="Number(level==1)">{{$t("message.intru2")}}
                <span style="color:#00aedd;cursor: pointer;" @click="goauthe">{{$t("message.intru3")}}</span>
                <span  style="color:#00aedd;cursor: pointer;" @click="gorate">{{$t("config.a1")}}</span>
            </p>
            <p v-if="Number(level==2)">{{$t("message.intru22")}}
                <span style="color:#00aedd;cursor: pointer;" @click="goauthe">{{$t("message.intru3")}}</span>
                <span  style="color:#00aedd;cursor: pointer;" @click="gorate">{{$t("config.a1")}}</span>
            </p>
            <p v-if="Number(level==3)">{{$t("message.intru23")}}
                <span style="color:#00aedd;cursor: pointer;" @click="gorate">{{$t("config.a1")}}</span>
            </p>
        </div>
        <div class="c_main">
            <div class="one" v-for="(item,index) in showdata">
                <dl>
                    <dt>
                        <img :src="item.url" alt="">
                    </dt>
                    <dd>
                        <p style="color:#555555;font-size:14px;">
                            <strong>{{$t(item.name)}}:</strong>
                            <span style="color:#16c277;margin-left:0.05rem;" v-if="Number(item.status) == 1">{{$t("config.action5")}}</span>
                            <span style="color:#ff0000;margin-left:0.05rem;" v-if="Number(item.status) == 0">{{$t("config.action6")}}</span>
                        </p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index==0 && Number(level==0)">{{$t("config.a2")}}</p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index==0 && Number(level==1)">{{$t("config.a3")}}</p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index==0 && Number(level==2)">{{$t("config.a5")}}</p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index==0 && Number(level==3)">{{$t("config.a4")}}</p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index!=0 && item.status == 1">{{$t(item.content)}}</p>
                        <p style="font-size:14px;margin-top:0.05rem;color:#999999" v-if="index!=0 && item.status == 0">{{$t(item.content1)}}</p>
                    </dd>
                </dl>
                <div class="one_right" v-if="item.status==0" @click="go(item.router)">
                    <span>{{$t("config.action2")}}</span>
            
                </div>
                <div class="one_right" v-if="item.status==1 && item.name!='titles.name4' &&  item.name!='titles.name2'" @click="go(item.router)">
                        <span>{{$t("config.action3")}}</span>
                </div>
                <div class="one_right" v-if="item.status==1 && item.name=='titles.name2' && level!=3" @click="go(item.router)">
                        <span>{{$t("config.action2")}}</span>
                </div>
            </div>
        </div>            
    </div>
</template>
<script>
    export default {
        data() {
            return {
                level:"",//等级
                checkReal: "",
                chkMoble: "",
                chkEmail: "",
                chkPw: "",
                chkTransPw: "",
                chkAuth: "",
                showdata: [],
                moble:"",
            };
        },
        methods: {
            gorate(){
                this.$router.push({
                    path: "/rate",
                    name:'Rate',
                    query:{
                        currIndex:1
                    }
                })
            },
            goauthe() {  //跳转到实名认证
                localStorage.setItem("step",2)
                this.$router.push({
                    path: "./authentication",
                    query:{
                        data:"1",
                        step:this.level
                    }
                })    
            },
            go(router){
                this.$router.push(router)
            }
        },
        created() {
            this.FetchGet(this.requestUrl.user.UserSafe, {}).then(res => {
                this.checkReal = res.data.chkReal;
                this.chkMoble = res.data.chkMoble;
                this.chkEmail = res.data.chkEmail;
                this.chkAuth = res.data.chkAuth;
                this.chkPw = res.data.chkPw;
                this.chkTransPw = res.data.chkTransPw;
                this.moble = res.data.moble;
                this.chkAuth = res.data.chkAuth;
                this.level=res.data.level;
                let showdata = this.showdata;
                showdata = [
                    {
                        name: 'titles.name2', url: '../../static/img/nicon1.png', content: 'content.txt1',content1: 'content1.txt1', status: this.checkReal,router:'/security/authentication'
                    },
                    {
                        name: 'titles.name3', url: '../../static/img/nicon2.png', content: 'content.txt2',content1: 'content1.txt2', status: this.chkMoble,router:'/security/phone'
                    },
                    {
                        name: 'titles.name4', url: '../../static/img/nicon3.png', content: 'content.txt3',content1: 'content1.txt3', status: this.chkEmail,router:'/security/email'
                    },
                    {
                        name: 'titles.name5', url: '../../static/img/nicon4.png', content: 'content.txt4',content1: 'content1.txt4', status: this.chkPw,router:'/security/loginPassword'
                    },
                    {
                        name: 'titles.name6', url: '../../static/img/nicon5.png', content: 'content.txt5',content1: 'content1.txt5', status: this.chkTransPw,router:'/security/tradePassword'
                    },
                    {
                        name: 'titles.name8', url: '../../static/img/nicon7.png', content: 'content.txt7',content1: 'content1.txt7', status: this.chkAuth,router:'/security/verification'
                    },
                ]
                this.showdata = [];
                this.showdata = showdata;

            })

        },
    }
</script>
<style lang="scss">
    @import "../../assets/css/config.scss"
</style>