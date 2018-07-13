<template>
    <div class="v-depthMore">
        <div class="nav">
            <span style="cursor:pointer;" @click="goBack">{{$t("message.title5")}}</span>>{{$t("buy.a1")}}
        </div>
        <div class="recode">
            <div class="right">
                <div class="top">
                    <div class="title">{{$t("buy.a2")}}</div>
                    <ul class="th">
                        <li>{{$t("re.a3")}}</li>
                        <li>{{$t("index.title3")}}({{bName}})</li>
                        <li>{{$t("de.a6")}}({{bname}})</li>
                    </ul>
                </div>
                <div class="sell">
                    <ul>
                        <li v-for="item in bidsArr" :key="item.id">
                            <span>{{$t("t.b17")}}{{item.id}}</span>
                            <span>{{item.price}}</span>
                            <span>
                                <b>{{item.count}}</b>
                                <i :style="{width:item.pre}"></i>
                            </span>

                        </li>

                    </ul>
                </div>
                <Page :total="sellcount" size="small" :page-size="20" :current="pagesell" style="text-align:center;padding:30px 0;" @on-change="changePage1"></Page>
            </div>
            <div class="left">
                <div class="top">
                    <div class="title">{{$t("buy.a3")}}</div>
                    <ul class="th">
                        <li>{{$t("re.a2")}}</li>
                        <li>{{$t("index.title3")}}({{bName}})</li>
                        <li>{{$t("de.a6")}}({{bname}})</li>
                    </ul>
                </div>
                <div class="bug">
                    <ul>
                        <li v-for="item in asksArr" :key="item.id">
                            <span>{{$t("t.b16")}}{{item.id}}</span>
                            <span>{{item.price}}</span>
                            <span>
                                <b>{{item.count}}</b>
                                <i :style="{width:item.pre}"></i>
                            </span>

                        </li>

                    </ul>
                    <div class="dashed"></div>
                </div>
                <Page :total="buycount" size="small" :page-size="20" :current="pagebuy" style="text-align:center;padding:30px 0;" @on-change="changePage"></Page>
            </div>

        </div>

    </div>
</template>
<script>
    export default {
        name: 'depthMore',
        data() {
            return {
                depth: null,
                asksArr: [],
                bidsArr: [],
                btype: 2,
                bname: "ETH",
                bName: "CNHA",
                pagebuy: 1,
                pagesell: 1,
                total: 1,
                buycount: 1,
                sellcount: 1,
                areaIndex: 0,
            }

        },
        created() {

        },
        mounted() {

        },
        updated() {

        },
        methods: {
            changePage(page) {
                this.pagebuy = page;
                this.getDepth(this.btype, function () {
                    this.mapDepth();
                }.bind(this));
            },
            changePage1(page) {
                this.pagesell = page;
                this.getDepth(this.btype, function () {
                    this.mapDepth();
                }.bind(this));
            },
            goBack() {
                this.$router.go(-1);
            },
            getDepth(id, callback) {
                let _this = this;
                let params = {}
                //params.market = 'btc_usdt';
                params.typeboxid = id;
                params.size = 100;
                params.pagebuy = this.pagebuy
                params.pagesell = this.pagesell
                // params.timestamp = +new Date();
                this.FetchPost(this.requestUrl.tradingCenter.sdList, params)
                    .then(res => {
                        this.buycount = Number(res.data.buycount);
                        this.sellcount = Number(res.data.sellcount);
                        this.bname = res.data.goods || "ETH"
                        let data = res.data;
                        let buy = data.bids || []
                            , newBuy;
                        if (Object.prototype.toString.call(buy) == '[object Array]') {
                            newBuy = buy.map((element, index) => {
                                return [
                                    element.price, element.num
                                ]
                            });
                        }

                        let sell = data.asks || []
                            , newSell;
                        if (Object.prototype.toString.call(sell) == '[object Array]') {
                            newSell = sell.map((element, index) => {
                                return [
                                    element.price, element.num
                                ]
                            });
                        }
                        _this.depth = {
                            asks: newBuy,
                            bids: newSell,
                            timestamp: data.date,
                            buycount: data.buycount,
                            sellcount: data.sellcount,
                            btrade: data.btrade,
                            jtrade: data.jtrade,
                        }

                        if (callback) {
                            callback()
                        }
                    })

            },
            mapDepth() {
                let asksArr = this.depth.asks || []
                    , realAsksArr = []
                    , bidsArr = this.depth.bids || []
                    , realBidsArr = []
                    , timestamp = this.timestamp
                    , _this = this
                    , asksCountMax = 0
                    , bidsCountMax = 0
                    , countMax = 0
                    , asksCount = 1
                    , bidsCount = 1
                    , jfloal = this.depth.btrade || 4
                    , jFloal = this.depth.jtrade || 2;
                //买单

                //     asksArr.forEach(element=>{
                //         if(asksCountMax < element[1]){
                //             asksCountMax = element[1]
                //         }
                //     })
                //     console.log(asksCountMax)
                //     bidsArr.forEach(element=>{
                //         if(bidsCountMax < element[1]){
                //             bidsCountMax = element[1]
                //         }
                //     })
                //    console.log(bidsCountMax)
                asksArr.forEach(element => {
                    // console.log(asksCountMax)
                    // console.log(Number(element[1]))
                    if (Number(element[1]) > asksCountMax) {
                        // console.log(element[1])
                        asksCountMax = element[1]
                    }
                })
                bidsArr.forEach(element => {

                    if (Number(element[1]) > bidsCountMax) {

                        bidsCountMax = element[1]
                    }

                })

                // if(asksCountMax > bidsCountMax){
                //     countMax = asksCountMax
                // }else{
                //     countMax = bidsCountMax
                // }

                asksArr.forEach((element, index) => {
                    let pre = element[1] / asksCountMax
                    pre = Math.ceil(pre * 10000) / 100
                    pre = Math.ceil(pre * 0.35) + '%'
                    //他的总量只有60%
                    let count, price
                    if (Number(jfloal)) {
                        count = element[1].toString().delFixed(jfloal);
                    } else {
                        count = parseInt(element[1]);
                    }
                    if (Number(jFloal)) {
                        price = element[0].toString().delFixed(jFloal || 2);
                    } else {
                        price = parseInt(element[0])
                    }
                    let len = Math.round(count).toString().length;
                    if (len >= 6) {
                        count = Math.round(count).toString().substring(0, len - 3)
                        count += "K";
                    }
                    realAsksArr.push({
                        id: index + (this.pagebuy - 1) * 20 + 1,
                        price: price,
                        count: count,
                        pre: pre
                    })
                });
                realAsksArr = realAsksArr;
                _this.asksArr = realAsksArr
                //卖单

                bidsArr.forEach((element, index) => {
                    let pre = element[1] / bidsCountMax;
                    let count, price
                    if (Number(jfloal)) {
                        count = element[1].toString().delFixed(jfloal);
                    } else {
                        count = parseInt(element[1]);
                    }
                    if (Number(jFloal)) {
                        price = element[0].toString().delFixed(jFloal || 2);
                    } else {
                        price = parseInt(element[0])
                    }
                    let len = Math.round(count).toString().length;
                    if (len >= 6) {
                        count = Math.round(count).toString().substring(0, len - 3)
                        count += "K";
                    }
                    pre = Math.ceil(pre * 10000) / 100
                    pre = Math.ceil(pre * 0.35) + '%'
                    realBidsArr.push({
                        id: index + (this.pagesell - 1) * 20 + 1,
                        price: price,
                        count: count,
                        pre: pre
                    })
                });
                _this.bidsArr = realBidsArr
            }
        },
        beforeRouteEnter(to, from, next) {

            next(vm => {
                var query = to.query
                vm.btype = query.id
                vm.areaIndex = query.areaIndex;
                if (vm.areaIndex == 1) {
                    vm.bName = "ETF";
                } else if (vm.areaIndex == 2) {
                    vm.bName = "ETH";
                } else if (vm.areaIndex == 0) {
                    vm.bName = "CNHA";
                } else if (vm.areaIndex == 3) {
                    vm.bName = "airdrop";
                }
                vm.COM.jumpScroll()
            })
        },
        watch: {
            btype(newVal, oldVal) {
                var btype = Number(this.btype) || 2
                this.getDepth(btype, function () {
                    this.mapDepth();
                }.bind(this));
            }
        }
    }
</script>
<style lang="scss" scoped>
    .v-depthMore {
        // width: 100%;
        // height: inherit;
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;

        .nav {
            line-height: 80px;
            height: 80px;
            background: #ffffff;
            font-size: 18px;
            margin-bottom: 15px;
            padding-left: .3rem;
            color: #555555;
        }
        .recode {
            padding-bottom: 23px;
            overflow: hidden;
            .left {
                width: 49%;
                float: left;
                margin-left: 1%;
                background: #ffffff;
                .top {
                    .title {
                        line-height: 50px;
                        height: 50px;
                        padding-left: .3rem;
                        font-size: 16px;
                    }
                    ul {
                        line-height: 40px;
                        height: 40px;
                        background: #fbfbfb;
                        padding-left: .3rem;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        li {
                            float: left;
                            &:nth-child(1) {
                                width: 30%;
                            }
                            &:nth-child(2) {
                                width: 35%;
                            }
                            &:nth-child(3) {
                                width: 35%;
                            }
                        }
                    }

                }
                .bug {
                    position: relative;
                    min-height: 600px;
                    font-size: 14px;
                    ul {
                        line-height: 31px;
                        padding-left: .3rem;

                        li {
                            overflow: hidden;

                            span {
                                float: left;
                                text-align: left;

                                &:nth-child(1) {
                                    width: 30%;
                                    color: #19be6b;

                                }
                                &:nth-child(2) {
                                    width: 35%;
                                }
                                &:nth-child(3) {
                                    width: 35%;
                                    position: relative;

                                    b {
                                        width: 40%;
                                        display: inline-block;
                                        text-align: right;
                                    }
                                    i {
                                        height: 20px;
                                        position: absolute;
                                        /* top: 50%; */
                                        /* margin-top: -9px; */
                                        /* margin-left: 8px; */
                                        background: #19be6b;
                                        opacity: 0.1;
                                        top: 5px;
                                        right: 100px;
                                    }
                                }
                            }

                        }
                    }
                }
            }

            .right {
                width: 49%;
                margin-right: 1%;
                float: left;
                background: #ffffff;
                .top {
                    .title {
                        line-height: 50px;
                        height: 50px;
                        padding-left: .3rem;
                        font-size: 16px;
                    }
                    ul {
                        line-height: 40px;
                        height: 40px;
                        background: #fbfbfb;
                        padding-left: .3rem;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        li {
                            float: left;
                            &:nth-child(1) {
                                width: 30%;
                            }
                            &:nth-child(2) {
                                width: 35%;
                            }
                            &:nth-child(3) {
                                width: 35%;
                            }
                        }
                    }

                }
                .sell {
                    font-size: 14px;
                    position: relative;
                    min-height: 600px;
                    /* height: 155px; */
                    ul {
                        line-height: 31px;
                        padding-left: .3rem;
                        li {
                            overflow: hidden;
                            span {
                                float: left;
                                text-align: left;

                                &:nth-child(1) {
                                    width: 30%;
                                    color: #ed3f14;

                                }
                                &:nth-child(2) {
                                    width: 35%;
                                }
                                &:nth-child(3) {
                                    width: 35%;
                                    position: relative;

                                    b {
                                        width: 30%;
                                        display: inline-block;
                                        text-align: right
                                    }
                                    i {

                                        height: 20px;
                                        position: absolute;
                                        /* top: 50%;
                                        margin-top: -9px;
                                        margin-left: 8px; */
                                        background: #ed3f14;
                                        opacity: 0.1;
                                        top: 5px;
                                        right: 120px;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }

    }
</style>