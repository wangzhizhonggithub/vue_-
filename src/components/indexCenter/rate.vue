<template>
    <div class="v-rate">
        <div class="nav">
            <ul>
                <li v-for="(item,index) in navArr" :key="index" :class="currIndex==index?'active':''" @click="seleActive(index)">{{item}}</li>
            </ul>
        </div>
        <div class="recode">
            <div class="content" v-if="currIndex==0">
                <ul class="top">
                    <li>{{$t("index.title2")}}</li>
                    <li>{{$t("re.a2")}}</li>
                    <li>{{$t("re.a3")}}</li>
                    <li>{{$t("re.a8")}}</li>
                </ul>
                <div class="tds">
                    <ul class="bottom" v-for="item in feeData">
                        <li>
                            <img :src="item.path" alt="">
                            <!-- <img src="/static/img/ac1.png" alt=""> -->
                            <!-- <img :src="item.path" alt=""> -->
                            <span>{{item.nickname}}</span>
                        </li>
                        <li>{{buy}}%</li>
                        <li>{{sell}}%</li>
                        <li>{{item.fee}}{{item.nickname}}</li>
                    </ul>
                </div>
            </div>
            <div class="content" v-if="currIndex==1">
                    <ul class="top">
                        <li>{{$t("index.title2")}}</li>
                        <li>{{$t("names.name")}}C1</li>
                        <li>{{$t("names.name")}}C2</li>
                        <li>{{$t("names.name")}}C3</li>
                    </ul>
                    <div class="tds">
                        <ul class="bottom" v-for="item in txData">
                            <li>
                             <img :src="item.path" alt="">
                                <span>{{item.nickname}}</span>
                            </li>
                            <li>{{item.c1}}{{item.nickname}}</li>
                            <li>{{item.c2}}{{item.nickname}}</li>
                            <li>{{item.c3}}{{item.nickname}}</li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        name: 'rate',
        metaInfo(){
            return{
                title:this.title,
            }
        },
        data() {
            return {
                navArr: [
                this.$t('re.a9'),
                this.$t('re.a10')
                ],
                currIndex: 0,
                feeData:[],
                title:this.$t("seo.a8"),
                sell:'',
                buy:'',
                txData:[],
                apiUrl: this.Global.URL                
            }
        },
        methods: {
            seleActive(index) {
                this.currIndex = index;
                this.current = 1;
            },
            mapTx(data){
                let c1,c2,c3;
                this.txData=data.map((element,index) => {
                    c1=Number(element.c1).toFixed(element.jFloal ||2);
                    c2=Number(element.c2).toFixed(element.jFloal || 2);
                    c3=Number(element.c3).toFixed(element.jFloal || 2);
                    return{
                        nickname:element.nickname,
                        c1:c1,
                        c2:c2,
                        c3:c3,
                        path:element.path,
                    }
                })
            }
        },
        created () {
            this.currIndex=this.$route.query.currIndex || 0;
            this.FetchGet(this.requestUrl.Arts.stFee, {}).then(res => {
                  this.feeData=res.data.data;
                  this.buy=res.data.buy;
                  this.sell=res.data.sell;
             })
             this.FetchGet(this.requestUrl.Arts.wdra, {}).then(res => {
                    // this.txData=res.data;
                    this.mapTx(res.data)
             })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.COM.jumpScroll()
            })
        },
    }
</script>
<style lang="scss">
    .v-rate {
        // width: 100%;
        // height: inherit;
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        min-height: 650px;
        .nav {
            line-height: 44px;
            height: 44px;
            background: #f3f3f3;
            font-size: 14px;
            font-weight: 600;
            ul {
                width: 100%;
                height: 100%;
                li {
                    float: left;
                    width: 160px;
                    height: 100%;
                    text-align: center;
                    background: #e7e7e7;
                    margin-right: 10px;
                    cursor: pointer;
                    &.active {
                        background: #ffffff
                    }
                }
            }
        }
        .recode {
            width: 100%;
            min-height: 550px;
            background: #ffffff;
            padding-bottom: 23px;
            .content {
                width: 100%;
                .top {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    color: #555555;
                    font-weight: 600;
                    border-bottom: 1px solid #e9eaec;
                    background: #f8f8f9;
                    li {
                        display: inline-block;
                        width: 26%;
                        text-align: left;
                    }
                    li:nth-child(1) {
                        padding-left: 35px;
                    }
                    li:nth-child(4) {
                        width: 9%;
                    }
                }
                .tds{
                    width: 100%;
                    .bottom {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 12px;
                    color: #555555;
                    border:none;
                    li {
                        display: inline-block;
                        width: 26%;
                        text-align: left;
                        background: url('/static/img/dashed.png') repeat-x bottom;
                    }
                    li:nth-child(1) {
                        padding-left: 35px;
                        img{
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 0.01rem;
                        }
                    }
                    li:nth-child(4) {
                        width: 21%;
                    }
                }
                ul:nth-child(even){
                background: #f8f8f9;
                }
                ul:hover{
                    background:#ebf7ff;
                }
                }

                    }
                }
    }
</style>