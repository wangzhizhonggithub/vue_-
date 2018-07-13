<template>
    <div>
        <Row>
            <Col span="6" v-for="(item,index) in row" :key="index" style="margin-right:20px;">
            <Card v-if="item.ment==1">
                <p slot="title">
                    <img src="/static/img/yhk.png" alt="">{{$t("seo.b1")}}
                    <p>{{$t("seo.b2")}}{{item.name}}</p>
                    <p>{{$t("seo.b3")}}{{item.other}}</p>
                    <p>{{$t("seo.b4")}}{{item.number}}
                        <span style="color:#00adee;font-size:12px;float:right;margin-top:1px;cursor:pointer;" v-clipboard:copy="item.number" v-clipboard:success="onCopy"
                            v-clipboard:error="onError">{{$t("de.a2")}}</span>
                    </p>
                    <p>{{$t("seo.b5")}}{{item.remark}}
                        <span v-clipboard:copy="item.remark" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color:#00adee;font-size:12px;float:right;margin-top:1px;cursor:pointer;">{{$t("de.a2")}}</span>
                    </p>
                </p>
            </Card>
            <Card v-if="item.ment==2">
                <p slot="title">
                    <img src="/static/img/zfb.png" alt="">{{$t("cc.a5")}}
                    <p>{{$t("seo.b2")}}{{item.name}}</p>
                    <p>{{$t("seo.b6")}}{{item.number}}
                        <p>{{$t("seo.b5")}}{{item.remark}}
                            <span v-clipboard:copy="item.remark" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color:#00adee;font-size:12px;float:right;margin-top:1px;cursor:pointer;">{{$t("de.a2")}}</span>
                        </p>
                        <p style="cursor:pointer;" @mousemove="showImg" @mouseleave="hideImg" class="imgP">{{$t("seo.b8")}}>></p>
                        <img :src="item.other" alt="" v-if="showIt" class="imgShow">
                    </p>
            </Card>
            <Card v-if="item.ment==3">
                <p slot="title">
                    <img src="/static/img/wx.png" alt="">{{$t("cc.a6")}}
                    <p>{{$t("seo.b2")}}{{item.name}}</p>
                    <p>{{$t("seo.b7")}}{{item.number}}
                    </p>
                    <p>{{$t("seo.b5")}}{{item.remark}}
                        <span v-clipboard:copy="item.remark" v-clipboard:success="onCopy" v-clipboard:error="onError" style="color:#00adee;font-size:12px;float:right;margin-top:1px;cursor:pointer;">{{$t("de.a2")}}</span>
                    </p>
                    <p style="cursor:pointer;" @mousemove="showImg1" @mouseleave="hideImg1" class="imgP">{{$t("seo.b9")}}>></p>
                    <img :src="item.other" alt="" v-if="showIt1" class="imgShow">
                </p>
            </Card>
            </Col>
            <Col span="4" class="clock" v-if="clockShow">
            <img src="/static/img/clock.png" alt="" style="margin-top:20px;">
            <p>{{$t("seo.b10")}}
                <span style="color:#ef2121;margin:0 3px;">{{minu}}</span>{{$t("seo.b11")}}
                <span style="color:#ef2121;margin:0 3px;">{{secd}}</span>{{$t("seo.b12")}}</p>
            <p>{{$t("seo.b13")}}</p>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueClipboard from "vue-clipboard2";
    Vue.use(VueClipboard)
    export default {
        props: {

            row: Array,
            status: String,
            emitIt: Function,
            rows: Object,
        },
        data() {
            return {
                abc: "123",
                clockShow: false,
                showIt: false,
                showIt1: false,
                secd: 0,
                minu: 0,
                apiUrl: this.Global.URL,
            }
        },
        components: {

        },
        watch:{
            rows(){
                if (this.status == this.$t('dd.c6')) {
                    this.clockShow = true;
                    this.countDown();
                }else{
                    this.clockShow = false;
                }
            }
        },
        methods: {
            showImg() {  //支付宝二维码
                this.showIt = true;
            },
            hideImg() {
                this.showIt = false;
            },
            showImg1() {  //支付宝二维码
                this.showIt1 = true;
            },
            hideImg1() {
                this.showIt1 = false;
            },
            onCopy(e) {  //复制文字
                // this.emitIt("18","H323862744573113")
                this.$Notice.success({
                    title: this.$t('aaa.d3')
                });
            },
            onError(e) {
                this.$Notice.warning({
                    title: this.$t('aaa.d4')
                });
                // alert("复制失败！")
            },
            countDown() { //倒计时
                let _this = this;
                let countdownMinute = 30;//10分钟倒计时 ||   new Date('Sun Mar'+this.rows.time+ 'GMT+0800')
                let startTimes = new Date(this.rows.time)//开始时间 new Date('2016-11-16 15:21');  

                let endTimes = new Date(startTimes.setMinutes(startTimes.getMinutes() + countdownMinute));//结束时间  
                let curTimes = new Date();//当前时间  
     
                let surplusTimes = endTimes.getTime() / 1000 - curTimes.getTime() / 1000;//结束毫秒-开始毫秒=剩余倒计时间  
                // 进入倒计时
                _this.minu = Math.floor(surplusTimes / 60);
                _this.secd = Math.round(surplusTimes % 60);
                if(window.countdowns){
                    clearInterval(window.countdowns);
                    window.countdowns=null;
                }
                window.countdowns = setInterval(function () {
                        surplusTimes--;
                        _this.minu = Math.floor(surplusTimes / 60);
                        _this.secd = Math.round(surplusTimes % 60);
                        if (surplusTimes <= 1) {
                            _this.emitIt(_this.rows.ordernum,_this.rows.id);
                            clearInterval(window.countdowns);
                            window.countdowns=null;
                        }
                }, 1000);
            },
        },// 
        created() {
            if (this.status == this.$t('dd.c6')) {
                this.clockShow = true;
                this.countDown();
            }else{
                this.clockShow = false;
            }
        }
    }

</script>
<style lang='scss'>
   .ivu-table-expanded-cell11{
            overflow: hidden;
        }
    .ivu-card-head {
        padding: 7px 16px;
        img {
            margin-right: 5px;
            width: 22px;
            display: inline-block;
            vertical-align: middle;
        }
    }

    .ivu-card-body {
        .imgP {
            position: relative;
            display: inline-block;
        }
        .imgShow {
            width: 120px;
            height:180px;
            position: absolute;
            left: 120px;
            top:-20px;
            z-index:10000;
        }
    }

    .col {
        margin-left: 20px;
    }

    .ivu-card-body {
        padding: 5px 10px;
        p {
            color: #555555;
            font-size: 14px;
            margin-top: 2px;
        }
    }

    .ivu-card {
        font-size: 12px;
    }

    .clock {
        text-align: center;
        /* margin-left: 30px; */
        float: right;
        p {
            font-size: 14px;
            color: #555555;
        }
    }
</style>