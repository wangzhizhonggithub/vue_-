<template>
        <div>
            <Row>
                <Col span="6" v-for="(item,index) in row" :key="index" style="margin-right:20px;">
                <Card v-if="item.ment==1">
                    <p slot="title">
                        <img src="/static/img/yhk.png" alt="">{{$t("seo.b1")}}
                        <p>{{$t("seo.b15")}}{{item.name}}</p>
                        <p>{{$t("seo.b3")}}{{item.other}}</p>
                        <p>{{$t("seo.b4")}}{{item.number}}
                            <span style="color:#00adee;font-size:12px;float:right;margin-top:1px;cursor:pointer;" v-clipboard:copy="item.number" v-clipboard:success="onCopy"
                                v-clipboard:error="onError">{{$t("de.a2")}}</span>
                        </p>
                    </p>
                </Card>
                <Card v-if="item.ment==2">
                    <p slot="title">
                        <img src="/static/img/zfb.png" alt="">{{$t("cc.a5")}}
                        <p>{{$t("seo.b15")}}{{item.name}}</p>
                        <p>{{$t("seo.b6")}}{{item.number}}
                        <p style="cursor:pointer;" @mousemove="showImg" @mouseleave="hideImg" class="imgP">{{$t("seo.b8")}}>></p>
                        <img :src="item.other" alt="" v-if="showIt" class="imgShow">
                    </p>
                </Card>
                <Card v-if="item.ment==3">
                    <p slot="title">
                        <img src="/static/img/wx.png" alt="">{{$t("cc.a6")}}
                        <p>{{$t("seo.b15")}}{{item.name}}</p>
                        <p>{{$t("seo.b7")}}{{item.number}}
                        </p>
                        <p style="cursor:pointer;" @mousemove="showImg1" @mouseleave="hideImg1" class="imgP">{{$t("seo.b9")}}>></p>
                        <img :src="item.other" alt=""v-if="showIt1" class="imgShow">
                    </p>
                </Card>
                </Col>
                <Col span="4" class="clock" v-if="clockShow">
                <img src="/static/img/clock.png" alt="" style="margin-top:20px;">
                <p>{{$t("seo.b14")}}</p>
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
                status: String
            },
            data() {
                return {
                    abc: "123",
                    clockShow: false,
                    showIt:false,
                    showIt1:false,
                    apiUrl: this.Global.URL
                }
            },
            components: {
    
            },
            methods: {
                showImg(){  //支付宝二维码
                   this.showIt=true;
                },
                hideImg(){
                    this.showIt=false;
                },
                showImg1(){  //支付宝二维码
                   this.showIt1=true;
                },
                hideImg1(){
                    this.showIt1=false;
                },
                onCopy(e) {  //复制文字
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
            },
            created() {
                if (this.status == this.$t('dd.c6')) {
                    this.clockShow = true;
                }else{
                    this.clockShow = false;
                }
            },
            watch:{
                row(){
                    // console.log(this.status)
                if (this.status == this.$t('dd.c6')) {
                    this.clockShow = true;
                }else{
                    this.clockShow = false;
                }
            }
        },
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
        .ivu-card-body{
            .imgP{
                position: relative;
                display: inline-block;
            }
            .imgShow{
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
            margin-left: 30px;
            float: right;
            p {
                font-size: 14px;
                color: #555555;
            }
        }
    </style>