<template>
    <div class="i_container">
        <div class="banner_warp" style="position:relative">
            <!-- <div class="login_warp" style="width:62.5%;height:100%;position:relative;margin:0 auto;min-width:1200px;">
                <form class="index_form" v-if="!iflogin">
                    <p class="pbox-title">{{$t("loginin.title8")}}</p>
                    <p class="pbox">
                        <i class="icon1"></i>
                        <input type="text" :placeholder="$t('loginin.title1')" class="input1" v-model="loginVal" autocomplete="off">
                    </p>
                    <p class="pbox" style="position:relative">
                        <i class="icon2"></i>
                        <input type="password" :placeholder="$t('loginin.title2')" class="input2" v-model="pwdVal" autocomplete="off" @keyup.enter="login">


                    </p>
                    <p class="pbox pbox-login" style="cursor: pointer" @click="login">
                        {{$t("loginin.title4")}}
                        <ul>
                            <li @click="forget">{{$t("l.a3")}}</li>
                            <li>|</li>
                            <li @click="register">{{$t("l.a2")}}</li>
                        </ul>
                    </p>

                </form>
            </div> -->
            <Carousel v-model="value2" class="banner" :autoplay-speed='autoTime' :autoplay='autoplay' :loop='autoplay'>
                <CarouselItem v-for="(item,index) in imgData" :key="item.img">
                    <div class="demo-carousel">
                        <a :href=item.url target="_Blank">
                            <img :src="item.img" alt="">
                        </a>
                    </div>
                </CarouselItem>
            </Carousel>
            <div class="notice">
                <img src="/static/img/notice.png" alt="">
                <div class="diva" @mouseenter ="bannertime()" @mouseleave ="bannerstart()"> 
                     <div class="bannernews" ref="bannerclass" >
                        <p v-for="item in bannernewimg" ><a :href="item.link" target='_blank'>{{item.content}}</a></p>
                  
                     </div>
                </div>
                <span @click="goMore(0)">{{$t("l.more")}}</span>
            </div>
        </div>
        <div class="content">
            <div class="jyq_content" v-for="(val, key, idx) in jyqData" :key="idx" @mouseover='rowOver1(idx)' @mouseout="rowOut1(idx)">
                <h2>{{key}}{{$t("cc.a1")}}</h2>
                <Row type="flex" class="thead">
                    <Col span="1" order="0"></Col>
                    <Col span="3" order="1" style="padding-left:8px;">{{$t("index.title2")}}</Col>
                    <Col span="3" order="2">{{$t("index.title3")}}</Col>
                    <Col span="4" order="3">{{$t("index.title4")}}({{key}})</Col>
                    <Col span="4" order="4">{{$t("index.title5")}}({{key}})</Col>
                    <Col span="3" order="5">{{$t("index.title6")}}</Col>
                    <Col span="2" order="6">{{$t("index.title7")}}</Col>
                    <Col span="4" order="7">{{$t("index.title8")}}</Col>
                </Row>
                <Row type="flex" :class='["tbody",rowFlexIndex==index && rowFlexIndex1==idx?"flex_hover":""]' v-for="(item,index) in val" :key="index" @click.native="goTrade(item.id,key)"
                    @mouseover.native='rowOver(index)' @mouseout.native="rowOut(index)">
                    <Col span="1" order="0"></Col>
                    <Col span="3" order="1">
                    <dl>
                        <dt>
                            <img :src="item.path" alt="">
                        </dt>
                        <dd>{{item.goods}}</dd>
                    </dl>
                    </Col>
                    <Col span="3" order="2" style="color:#ff0000;font-weight:600" v-if="Number(item.daydie)<=0 && Number(item.jtrade)">{{item.price.delFixed(Number(item.jtrade))}}
                    <Icon type="arrow-down-c" style="color:#ff0000;"></Icon>
                    </Col>
                    <Col span="3" order="2" style="color:#ff0000;font-weight:600" v-if="Number(item.daydie)<=0 && !Number(item.jtrade)">  {{parseInt(item.price)}}
                        <Icon type="arrow-down-c" style="color:#ff0000;"></Icon>
                        </Col>
                    <Col span="3" order="2" style="color:#16c277;font-weight:600" v-if="Number(item.daydie)>0 && Number(item.jtrade)"> {{item.price.delFixed(Number(item.jtrade))}}
                    <Icon type="arrow-up-c" style="color:#16c277;"></Icon>
                    </Col>
                    <Col span="3" order="2" style="color:#16c277;font-weight:600" v-if="Number(item.daydie)>0  &&  !Number(item.jtrade)">{{parseInt(item.price)}}
                        <Icon type="arrow-up-c" style="color:#16c277;"></Icon>
                        </Col>
                    <Col span="4" order="3" v-if="Number(item.jtrade) && item.max">{{item.max.delFixed(Number(item.jtrade))}}</Col>
                    <Col span="4" order="3" v-if="!Number(item.jtrade) && item.max">{{parseInt(item.max)}}</Col>
                    <Col span="4" order="3" v-if="!item.max">--</Col>
                    <Col span="4" order="3" v-if="Number(item.jtrade) && item.min">{{item.min.delFixed(Number(item.jtrade))}}</Col>
                    <Col span="4" order="3" v-if="!Number(item.jtrade) && item.min">{{parseInt(item.min)}}</Col>
                    <Col span="4" order="3" v-if="!item.min">--</Col>
                    <Col span="3" order="3" v-if="Number(item.btrade) && item.transnum">{{item.transnum.delFixed(Number(item.btrade))}}{{item.goods}}</Col>
                    <Col span="3" order="3" v-if="!Number(item.btrade) && item.transnum">{{parseInt(item.transnum)}}{{item.goods}}</Col>
                    <Col span="3" order="3" v-if="!item.transnum">--</Col>
                    <Col span="2" order="6" style="color:#16c277;" v-if="Number(item.daydie)>=0"> {{item.daydie.delFixed(Number(2))}}%
                    </Col>
                    <Col span="2" order="6" style="color:#ff0000;" v-if="Number(item.daydie)<0"> {{item.daydie.delFixed(Number(2))}}%
                    </Col>
                
                    <Col span="4" order="7">

                    <trend-line :trendLineData='trendLineData' :id="'trendLine_'+Number(item.id)" :typeboxid="Number(item.id)" v-if="trendLineData"></trend-line>
                    </Col>
                </Row>
            </div>

        </div>
        <div class="info">
            <div class="box">
                <div class="left">
                    <div class="infos">
                        <h2>{{$t("index.action2")}}</h2>
                        <span @click="goMore(0)" class="more">
                            {{$t("index.action1")}}
                        </span>
                        <ul>
                            <li v-for="item in GFdata" @click="goDetail(item.id,0)">
                                <p>
                                    <img src="/static/img/quare.png" alt="">
                                    <span>{{item.title}}</span>
                                </p>
                                <p class="detail">
                                    {{item.keys}}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <div class="infos">
                        <h2>{{$t("index.action3")}}</h2>
                        <span @click="goMore(1)" class="more">
                            {{$t("index.action1")}}

                        </span>
                        <ul>
                            <li v-for="item in CZdata" @click="goDetail(item.id,1)">
                                <p>
                                    <img src="/static/img/quare.png" alt="">
                                    <span>{{item.title}}</span>
                                </p>
                                <p class="detail">
                                    {{item.keys}}
                                </p>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="middle">
                    <img src="/static/img/index_slider.png" alt="">
                </div>
            </div>
        </div>
        <div class="bottom">
            <p> {{$t("index.h1")}}</p>
            <dl>
                <dt>
                    <img :src='publicInfor+"/Public/image/info1.png"' alt="">
                </dt>
                <dd>
                    <strong> {{$t("index.h2")}}</strong>
                    <span>
                        {{$t("index.h3")}}
                    </span>
                </dd>
            </dl>
            <dl>
                <dt>
                    <img :src='publicInfor+"/Public/image/info2.png"' alt="">
                </dt>
                <dd>
                    <strong> {{$t("index.h4")}}</strong>
                    <span>
                        {{$t("index.h5")}}
                    </span>
                </dd>
            </dl>
            <dl>
                <dt>
                    <img :src='publicInfor+"/Public/image/info3.png"' alt="">
                </dt>
                <dd>
                    <strong> {{$t("index.h6")}}</strong>
                    <span>
                        {{$t("index.h7")}}
                    </span>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
    import trendLine from './trendLine/TrendLine.vue'
    export default {
        metaInfo() {
            return {
                title: this.title,
                meta: [
                    {
                        name: "keywords",
                        conotent: this.$t("seo.a2")
                    },
                    {
                        name: "description",
                        conotent: this.$t("seo.a3")
                    }
                ],
            }
        },
        props: {
            type: Number
        },
        components: {
            trendLine
        },
        data() {
            return {
                title: this.$t("seo.a1"),
                rowFlexIndex: -1,
                name: "(CNHA)",
                autoTime: 5000,
                clickIndex: 0,
                listData: [
                ],
                autoplay: true,
                trendLineData: null,
                picture_num: 0,
                nowTime: +new Date(),
                loginVal: '',
                pwdVal: '',
                db_xianshi: '/static/img/xianshi.png',
                db_hidden: '/static/img/hidden.png',
                GFdata: [],
                CZdata: [],
                jfloat: 2,
                showData: [],
                imgData: [],
                rowFlexIndex1:-1,
                jyqData: {},
                iflogin: 0,
                mail: "",
                money: '',
                hideMoeny: '*****',
                passwold: "",
                 
                navArr: [
                    ('index.action2'),
                    ('index.action3'),
                ],
                value2: 0,
                myChart: {},
                user: '',
                iftranspw: '',
                itype: 0,
                drag: false,
                apiUrl: this.Global.URL,
                publicInfor: this.Global.publicInfor,
                bannernewimg:'',
                banertime:"",
                yihu:true
                 
            }
        },
        methods: {
            getIndex(idx) {
                this.clickIndex = idx;
                this.name = "(" + this.listData[idx].jyq.toUpperCase() + ")";
                for (var x in this.jyqData) {
                    if (x == this.listData[idx].jyq) {
                        this.mapjYQ(this.jyqData[x]);
                    }
                }
                // 
            },
            rowOver(index) {
                this.rowFlexIndex = index
            },
            rowOut(index) {
                this.rowFlexIndex = -1
            },
            rowOver1(index) {
                this.rowFlexIndex1 = index
            },
            rowOut1(index) {
                this.rowFlexIndex1 = -1
            },
            goTrade(id,key) {  //跳转到交易区
                let keyit="trading"+key.toUpperCase();
                this.$router.push({
                    name:keyit,
                    params: {
                        jumpId: Number(id)
                    }
                })
            },
            randomData() {
                this.now = new Date(+this.now + this.oneDay);
                this.value = this.value + Math.random() * 21 - 10;
                return {
                    name: this.now.toString(),
                    value: [
                        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('-'),
                        Math.round(this.value)
                    ]
                }
            },
            goMore(idx) {  //跳转更更多页面

                this.$router.push({ name: "problem", params: { id: idx } })
            },
            goDetail(id, index) {  //跳转详情页
                // localStorage.setItem("currIndex",index);
                // localStorage.setItem("detailid", id);
                // localStorage.setItem("name", this.navArr[index]);
                let name = index || 0
                this.$router.push({
                    name: "Gdetail",
                    query: { id, name }
                })
            },
            bannertime(){
                
                this.yihu=false
 
            },
            bannerstart(){
                
                 this.yihu=true
            },
            //banner图新闻轮播
            bannernew(){
                var language=localStorage.getItem('lan'),
                    params={}
                     
                if(language==null||language=="zh"){
                        params.language=0
                }else{
                    params.language=1
                }
                
                this.FetchPost(this.requestUrl.Arts.bannernew, params)
                    .then(res => {

                        if (res.status === 200) {
                              this.bannernewimg=res.data;
                                var that=this
                        var num=50;
                        var time=(this.bannernewimg.length-1)*(-50)
                         
                        this.banertime=setInterval(function(){  
                            
                            if(that.yihu==true){
                            num-=50;  
                            if(num< time){
                                num=50;
                                that.$refs.bannerclass.style.top= 0+'px';
                                
                            }else{
                                    that.$refs.bannerclass.style.top=num+'px';
                            }
                            }          
                         },5000)
                           
                        } else {
                           
                        }

                    })

            },
            bannernew_time(){

            },
            chargemoney() {
                this.$router.push("/financial/deposit")
            },
            mentionmoney() {
                this.$router.push("/financial/withdraw")
            },
            trading() {
                this.$router.push("/tradingCNHA")
            },
            db_cart_loop() {

            },
            db_hid(e) {
                clearInterval(window.indextime)
                if (this.drag) {

                    window.indextime = setInterval(() => {
                        this.db_cart()
                    }, 1000)
                }
                this.drag = !this.drag
            },
            db_cart() {
                var res = JSON.parse(localStorage.getItem("res")),
                    params = {
                        flag: 1
                    }
                this.mail = res.data.user || res.data.moble;
                this.passwold = res.data.id || res.data.userid;

                this.money = localStorage.getItem('money') || '';

                this.FetchPost(this.requestUrl.FinanceCenter.accountList, params)
                    .then(res => {

                        if (res.status === 200) {

                            this.money = res.data.toString().delFixed(2)

                            localStorage.setItem('money', this.money)
                        } else {
                            this.money = ''
                            localStorage.setItem('money', this.money)
                        }

                    })

            },
            login() {  //登录
                let params
                    , _this = this;
                if (this.loginParams()) {
                    params = this.loginParams()
                } else {
                    return false
                }
                this.FetchPost(this.requestUrl.login.login, params)
                    .then(res => {
                        if (res.status === 200) {

                            this.$Notice.success({
                                title: this.$t('aaa.a1'),
                                desc: false,
                                duration: 1,
                            })
                            localStorage.setItem("res", JSON.stringify(res))
                            localStorage.setItem("user", res.data.user)
                            localStorage.setItem("id", res.data.id)
                            localStorage.setItem("iflogin", res.data.chkPw);
                            localStorage.setItem("ifchkMoble", res.data.chkMoble);
                            localStorage.setItem("chkEmail", res.data.chkEmail);
                            localStorage.setItem("chkAuth", res.data.chkAuth);
                            localStorage.setItem("chkReal", res.data.chkReal);
                            localStorage.setItem("phone", res.data.moble);
                            this.iflogin = 1;

                            this.$eventBus.$emit('user', res.data.user)
                            localStorage.setItem("iftranspw", res.data.chkTransPw);
                            this.iftranspw = res.data.transpw;
                            if (this.iftranspw.length == 0) {
                                this.$router.push("/setZpsd")
                            } else {
                                this.$router.push({
                                    name: "/index", params: {

                                        ifuser: 1
                                    }
                                })
                            }
                            _this.db_cart();
                        } else if (res.status == 405) {
                            this.$router.push({
                                name: 'register',
                                params: {
                                    status: res.status,
                                    email: this.loginVal
                                }
                            })
                        } else if (res.status == 401) {
                            this.$Notice.warning({
                                title: this.$t('aaa.a2')
                            })
                        } else if (res.status == 402) {
                            this.$Notice.warning({
                                title: this.$t('aaa.a3')
                            })
                        } else if (res.status == 403) {
                            this.$Notice.warning({
                                title: this.$t('aaa.a17')
                            })
                        }
                    })
            },
            loginParams() {
                let phoneReg = /^1[34578]\d{9}$/
                    , emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                    , pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
                    , obj = {}
                    , loginVal = this.loginVal
                    , pwdVal = this.pwdVal;

                //用户名
                if (phoneReg.test(loginVal)) {
                    obj.moble = loginVal
                } else if (emailReg.test(loginVal)) {
                    obj.email = loginVal
                } else {
                    this.$Notice.warning({
                        title: this.$t('aaa.a4'),
                        desc: false,
                    })
                    return false
                }
                //密码
                if (pwdReg.test(pwdVal)) {
                    obj.password = this.md5(pwdVal)
                } else {
                    this.$Notice.warning({
                        title: this.$t('input.a17'),
                        desc: false,
                    })
                    return false
                }
                return obj
            },
            forget(event) {  //忘记密码
                this.$router.push({ name: "/login", params: { status: 1 } });
                this.$eventBus.$emit('isForgetEvent', true)
                event.stopPropagation();
            },
            register(event) {  //注册新账号
                this.$router.push("/register")
                event.stopPropagation();
            },
            changeLo() {
                this.FetchGet(this.requestUrl.Arts.list, { tb: 0, type: this.itype }).then(res => {
                    if (res.status == 200) {
                        this.GFdata = res.data[0].data.slice(0, 3);
                    } else {
                        this.GFdata = [];
                    }

                })
                this.FetchGet(this.requestUrl.Arts.list, { tb: 1, type: this.itype }).then(res => {
                    if (res.status == 200) {
                        this.CZdata = res.data[1].data.slice(0, 3);
                    } else {
                        this.CZdata = [];
                    }
                })
            },
            getTrend(callback) {
                var params = {};
                var _this = this;
                this.FetchPost(this.requestUrl.trendLine.trendIndex, params).then(res => {
                    if (res.data) {
                        let trendLineData = res.data.map(function (item) {
                            return {
                                price: Number(item.open),
                                typeboxid: Number(item.typeboxid),
                                timestamp: item.end_time * 1000
                            }
                        })
                        _this.trendLineData = trendLineData
                    }

                    //callback(trendLineData)
                })
            },
            Fixed(data, num) {
                let data1 = Number(data).toFixed(num);  //
                data1.substring(0, data1.indexOf(".") + num)
                return Number(data1);
            },
            mapjYQ(data) {
                let _this = this;
                let max, min, transnum, price;
                this.showData = data.map((element, index) => {
                    if (element.max != 0) {
                        if (Number(element.jtrade)) {
                            max = element.max.delFixed(Number(element.jtrade))
                        } else {
                            max = parseInt(element.max)
                        }

                    } else {
                        max = "--";
                    }
                    if (element.min != 0) {
                        if (Number(element.jtrade)) {
                            min = element.min.delFixed(Number(element.jtrade))
                        } else {
                            min = parseInt(element.min)
                        }

                    } else {
                        min = "--";
                    }
                    if (element.transnum != 0) {
                        if (Number(element.btrade)) {
                            transnum = element.transnum.delFixed(Number(element.btrade))
                        } else {
                            transnum = parseInt(element.transnum)
                        }

                        let len = Math.round(transnum).toString().length;
                        if (len >= 6) {
                            transnum = Math.round(transnum).toString().substring(0, len - 3)
                            transnum += "K";
                        }
                    } else {
                        transnum = "--";
                    }
                    if (Number(element.jtrade)) {
                        price = element.price.delFixed(Number(element.jtrade))
                    } else {
                        price = parseInt(element.price)
                    }
                    return {
                        path: element.path,
                        price: price,
                        max: max,
                        min: min,
                        transnum: transnum,
                        daydie: this.Fixed(element.daydie, 2),
                        goods: element.goods,
                        id: Number(element.id)
                    }
                })

            },
            getdata() {

                // if (this.$store.state.TradingArea) {
                //     let res = this.$store.state.TradingArea
                //     this.jyqData = res.data;
                //     this.getIndex(this.clickIndex);
                // } else {
                //     this.$store.dispatch('UPDATE_INDEXS')
                //         .then((res) => {
                //             this.jyqData = res;
                //             this.getIndex(this.clickIndex);
                //         })
                // }
                this.FetchGet(this.requestUrl.Arts.mainIndex, {}).then(res => {
                        this.jyqData=res.data;
                       
                        // this.getIndex(this.clickIndex);
                })
            }
        },
        created() {
            //请求接口
            clearInterval(window.indextime)
            this.iflogin = localStorage.getItem("iflogin");
            this.user = localStorage.getItem("user");
            this.$i18n.locale = localStorage.getItem("lan") || "zh";
            if (this.$i18n.locale == 'zh') {
                this.itype = 0;
            } else {
                this.itype = 1;
            }
            if (this.iflogin == 1) {
                //初始化
                this.db_cart();
            }
            this.FetchPost(this.requestUrl.Arts.banners, { type: this.itype }).then(res => {
                this.imgData = res.data;
            })
            this.FetchPost(this.requestUrl.Arts.headTrading, { type: this.itype }).then(res => {
                res.data.forEach((element, index) => {
                    this.listData.push({
                        name: element.name.toUpperCase() + this.$t("cc.a1"),
                        url: "trading" + element.name.toUpperCase(),
                        jyq: element.name
                    })
                })
                this.getdata();
            })

            //init 价格趋势数据
            this.getTrend()
            this.changeLo();
            this.bannernew();
             
            if (!window.timer) {
                window.timer = setInterval(() => {
                    this.getdata()
                }, 3000)
            } else {
                clearInterval(window.timer)
            }
            // if (localStorage.user) {
            //     clearInterval(window.indextime)
            //     window.indextime = setInterval(() => {
            //         this.db_cart()
            //     }, 1000)
            // } else {
            //     clearInterval(window.indextime)
            // }
        },
          mounted(){
           
            
        },
        updated() {
            this.user = localStorage.getItem("user");
             
        },
        watch: {
            type: function () {
                this.changeLo();
            },
            $route: function () {
                this.user = this.$route.params.ifuser;
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                var query = to.params || from.params
                if (query.type == 1) {
                    vm.COM.jumpScroll()
                }
            })
        },
        beforeRouteLeave(to, from, next) {
            //跳转页面清除定时器
            if (window.indextime) {
                clearInterval(window.indextime)
            }
            if (window.timer) {
                clearInterval(window.timer)
            }
            if(this.banertime){
                clearInterval(this.banertime)
            }
            next()
        },
        // updated () {
        //     console.log(11)
        // }
    }
</script>
<style lang="scss">
    @import "../../assets/css/index.scss"
</style>