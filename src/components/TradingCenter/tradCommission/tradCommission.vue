<template>
    <div class="v-tradCommission">
        <div class="top">
            <div class="title">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <Menu-item name="1">
                        {{$t("t.c1")}}
                    </Menu-item>
                    <!-- <a href="javacript:void(0);" @click="jumpRecodeMore('recodeMore',true)" class="more">更多</a> -->
                    <router-link class="more" :to='{path:"/tradMoreRecode?id="+btype+"&tab="+0+"&areaIndex="+areaIndex}'>{{$t("t.b15")}}</router-link>
                </Menu>
            </div>
            <div :class="['table',!isdata?'air':'']">
                <p v-if="!isLoginStatus && !isdata">{{$t("e.a12")}}
                    <router-link to="/login">{{$t("loginin.title4")}}</router-link>{{$t("e.a13")}}
                    <router-link to="/register">{{$t("loginin.title7")}}</router-link>{{$t("e.a14")}}</p>
                <p v-if="isLoginStatus && !isdata">{{$t("fu.a8")}}</p>

                <div-table :columns="currCol" :data="currArr"></div-table>
            </div>

        </div>
        <div class="bottom">
            <div class="title">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <Menu-item name="1">
                        {{$t("t.c2")}}
                    </Menu-item>
                    <!-- <a href="javacript:void(0);" @click="jumpRecodeMore('recodeMore',false)" class="more">更多</a> -->
                    <router-link class="more" :to='{path:"/tradMoreRecode?id="+btype+"&tab="+1+"&areaIndex="+areaIndex}'>{{$t("t.b15")}}</router-link>
                </Menu>

            </div>
            <div :class="['table',!isdata1?'air':'']">
                <p v-if="!isLoginStatus && !isdata1">{{$t("e.a12")}}
                    <router-link to="/login">{{$t("loginin.title4")}}</router-link>{{$t("e.a13")}}
                    <router-link to="/register">{{$t("loginin.title7")}}</router-link>{{$t("e.a14")}}</p>
                <p v-if="isLoginStatus && !isdata1">{{$t("fu.a8")}}</p>
                <div-table :columns="logCol" :data="logArr" :key="logKey"></div-table>
            </div>
        </div>
        <trad-module :tradModalCon='tradModalCon' :tradModalData='tradModalData' :btype="btype" :areaIndex="areaIndex"></trad-module>
        <Modal v-model="cancalModel" width="360" :styles='stylesObj'>
            <p slot="header" style="color: #00aedd;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("hh.a3")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{cancalText}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="undoTrue" style="background-color: #00aedd;
        border-color: #00aedd;"> {{$t("fu.a10")}}</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import divTable from './tradCommissionCom/jyTable.vue'
    import tradModule from './tradCommissionCom/tradModal.vue'
    export default {
        name: 'tradCommission',
        components: {
            divTable, tradModule
        },
        props: {
            currEntrust: Array,
            logEntrust: Array,
            cancelEntrust: Object,
            btype: Number,
            callUpdateLog: Function,
            jFloal: Number,
            areaIndex: Number,
        },
        data() {
            return {
                cancalText: this.$t('hh.a2'),
                stylesObj: { top: '200px' },
                cancalModel: false,
                bName: "CNHA",
                tradModalCon: { 'con': false },
                modal_loading: false,
                nodeal: 0,
                actionText: this.$t('hh.c8'),
                id: '',
                tradModalData: null,  //点击详情获得的数组
                currCol: [
                    {
                        title: this.$t('de.a5'),
                        key: 'time',
                        width: 150
                    },
                    {
                        title: this.$t('re.a4'),
                        key: 'type'
                    },
                    {
                        title: this.$t("re.a12") + '(CNHA)',
                        key: 'price'
                    },
                    {
                        title: this.$t('de.a6'),
                        key: 'count'
                    },
                    {
                        title: this.$t('hh.c5') + '(CNHA)',
                        key: 'commissionSum'
                    },
                    {
                        title: this.$t('hh.c3'),
                        key: 'dealDone'
                    },
                    {
                        title: this.$t('hh.c7'),
                        key: 'dealAve'
                    },
                    {
                        title: this.$t('hh.c4'),
                        key: 'unDeal'
                    },
                    {
                        title: this.$t('account.a5'),
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        color: '#00aedd',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {

                                            if (params.row.dealDone > 0) {

                                                this.cancalText = this.$t('hh.a1')
                                            } else {
                                                this.cancalText = this.$t('hh.a2')
                                            }
                                            this.undoIndex = params.index;
                                            this.nodeal = params.row.unDeal;
                                            this.id = params.row.id;
                                            this.cancalModel = true
                                        }
                                    }
                                }, this.$t('a.a8'))
                            ]);
                        }
                    }
                ],
                logCol: [
                    {
                        title: this.$t('de.a5'),
                        key: 'time'
                    },
                    {
                        title: this.$t('re.a4'),
                        key: 'type'
                    },
                    {
                        title: this.$t("re.a12") + '(CNHA)',
                        key: 'price'
                    },
                    {
                        title: this.$t('hh.c6'),
                        key: 'count'
                    },

                    {
                        title: this.$t('hh.c3'),
                        key: 'dealDone'
                    },
                    {
                        title: this.$t('hh.c7'),
                        key: 'dealAve'
                    },
                    {
                        title: this.$t('de.a8'),
                        key: 'status'
                    },
                    {
                        title: this.$t('account.a5'),
                        key: 'action',
                        render: (h, params) => {
                            if (params.row.status == this.$t("w.a7")) {
                                return h('div', [
                                    h('div', {
                                        style: {
                                            color: '#cccccc',
                                        },
                                        domProps: {
                                            innerHTML: this.actionText
                                        },
                                    })
                                ], this.actionText);
                            } else {
                                return h('div', [
                                    h('div', {
                                        style: {
                                            color: '#00aedd',
                                            cursor: 'pointer',
                                        },
                                        domProps: {
                                            innerHTML: this.actionText
                                        },
                                        on: {
                                            click: () => {

                                                if (this.actionText == this.$t('hh.c8')) {
                                                    this.tradModalCon.con = true;
                                                    this.detailIndex = params.index;
                                                    this.$eventBus.$emit('GetDetail', params.row)
                                                }


                                            }
                                        }
                                    })
                                ]);
                            }

                        }
                    }
                ],
                currArr: [],
                logArr: [],
                isdata: false, //表格数据是否为空
                isdata1: false, //1为有数据 0为没有数据
                isLoginStatus: false, //用户是否登陆 1登陆 0没有
                jfloal: 4,
                logKey: +new Date()
            }
        },
        created() {
            //如果用户登录的话
            if (this.areaIndex == 1) {
                this.currCol[2].title = this.$t("re.a12") + '(ETF)';
                this.currCol[4].title = this.$t('hh.c5') + '(ETF)'
                this.logCol[2].title = this.$t("re.a12") + '(ETF)'
                this.bName = "ETF"
            } else if (this.areaIndex == 2) {
                this.currCol[2].title = this.$t("re.a12") + '(ETH)'
                this.currCol[4].title = this.$t('hh.c5') + '(ETH)'
                this.logCol[2].title = this.$t("re.a12") + '(ETH)'
                this.bName = "ETH"
            } else if (this.areaIndex == 0) {
                this.currCol[2].title = this.$t("re.a12") + '(CNHA)'
                this.currCol[4].title = this.$t('hh.c5') + '(CNHA)'
                this.logCol[2].title = this.$t("re.a12") + '(CNHA)'
                this.bName = "CNHA"
            } else if (this.areaIndex == 3) {
                this.currCol[2].title = this.$t("re.a12") + '(airdrop)'
                this.currCol[4].title = this.$t('hh.c5') + '(airdrop)'
                this.logCol[2].title = this.$t("re.a12") + '(airdrop)'
                this.bName = "airdrop"
            }
            this.$eventBus.$on('BtypeChange', function (btype, jfloal) {
                if (jfloal) {
                    this.jfloal = Number(jfloal)
                }
            }.bind(this))
            if (localStorage.getItem("user")) {
                this.isLoginStatus = true;
                this.mapCurrArr(this.currEntrust)
                this.mapLogArr(this.logEntrust)
            } else {
                this.isLoginStatus = false;
            }
        },
        methods: {
            // noticTradModule(data,index){
            //     //console.log(data,index)
            //:noticTradModule='noticTradModule' 子 父 子
            //     this.tradModalCon.con = true
            // },
            jumpRecodeMore(recodeMore, drag) {
                //drag 判断当前委托 与 历史委托
                this.$eventBus.$emit('jumpCompoent', recodeMore, drag)
            },
            undoTrue() {

                this.modal_loading = true;
                //this.currArr.splice(this.undoIndex,1)
                let obj = {
                    id: this.id,
                    nodeal: this.nodeal
                }

                // console.log(obj);
                this.FetchPost(this.requestUrl.tradingCenter.cancelEntrust, obj)
                    .then(res => {
                        if (res.status == 200) {
                            this.success(this.$t("e.a10"));
                            this.callUpdateLog()
                            this.currArr.splice(this.undoIndex, 1)
                            // this.mapCurrArr(this.currEntrust)
                            this.cancalModel = false;
                            this.modal_loading = false;

                        } else {
                            this.warning(this.$t("e.a11"));
                            this.cancalModel = false;
                            this.modal_loading = false;
                        }
                    })
            },
            undoFlase() {

            },
            undo() {

            },
            mapCurrArr(arr) {
                let _this = this;
                this.currArr = arr.map((element, index) => {
                    let type = ''
                        , price = ''
                        , fixedprice = ''
                        , count = ''
                        , time = ''
                        , commissionSum = ''
                        , dealDone = ''
                        , dealAve = ''
                        , unDeal = ''
                        , id = element.id
                        , jtrade = element.jtrade  //币二 
                        , btrade = element.btrade  //币一
                    time = Number(element.addtime).timetrans()
                    Number(element.flag) ? type = _this.$t("re.a2") : type = _this.$t("re.a3");
                    //市价 限价
                    //先买入卖出  后 市价 限价

                    if (element.flag == 1) {
                        if (element.type == 2) {
                            price = this.$t("e.a9")
                            count = "--";//数量
                            unDeal = '--';//未成交
                            if (element.dealave) {
                                if (Number(jtrade)) {
                                    dealAve = element.dealave.delFixed(jtrade)
                                } else {
                                    dealAve = parseInt(element.dealave)
                                }

                            }
                            // dealAve ="--"
                            if (Number(jtrade)) {
                                commissionSum = element.total.delFixed(jtrade);
                            } else {
                                commissionSum = parseInt(element.total);
                            }
                            //委托总额
                        } else {



                            if (Number(btrade)) {
                                price = element.fixedprice.delFixed(jtrade)
                                count = element.totalnum.delFixed(btrade) + element.name
                                unDeal = element.num.delFixed(btrade)
                                commissionSum = element.total.delFixed(jtrade)
                            } else {
                                price = parseInt(element.fixedprice)
                                count = parseInt(element.totalnum) + element.name
                                unDeal = parseInt(element.num)
                                commissionSum = parseInt(element.total)
                            }
                            if (price == '.00') {
                                price = '--'
                            }
                            if (element.dealave) {
                                if (Number(jtrade)) {
                                    dealAve = element.dealave.delFixed(jtrade)
                                } else {
                                    dealAve = parseInt(element.dealave)
                                }

                            }

                        }
                    } else if (element.flag == 0) {
                        if (element.type == 2) {
                            price = this.$t("e.a9")
                            if (Number(btrade)) {
                                count = element.totalnum.delFixed(btrade) + element.name
                                unDeal = element.num.delFixed(btrade)
                            } else {
                                count = parseInt(element.totalnum) + element.name
                                unDeal = parseInt(element.num)
                            }
                        
                            dealAve = parseInt(element.dealave) || '--'
                            commissionSum = '--'
                        } else {
                            if (Number(jtrade)) {
                                price = element.fixedprice.delFixed(jtrade)
                                if (price == '.00') {
                                    price = '--'
                                }
                                count = element.totalnum.delFixed(btrade) + element.name
                                unDeal = element.num.delFixed(btrade)
                                commissionSum = element.total.delFixed(jtrade)
                            } else {
                                price = parseInt(element.fixedprice)
                                if (price == '.00') {
                                    price = '--'
                                }
                                count = parseInt(element.totalnum) + element.name
                                unDeal = parseInt(element.num)
                                commissionSum = parseInt(element.total)
                            }

                            if (element.dealave) {
                                if (Number(jtrade)) {
                                    dealAve = element.dealave.delFixed(jtrade);
                                } else {
                                    dealAve = parseInt(element.dealave)
                                }

                            } else {
                                dealAve = "--"
                            }


                        }
                    }
                    // commissionSum = element.total.delFixed(2)
                    if (Number(btrade)) {
                        dealDone = element.sucnum.delFixed(btrade)
                    } else {
                        dealDone = parseInt(element.sucnum)
                    }

                    if (dealAve == '' || dealAve == undefined || dealAve == '.00' || dealAve == '.0000' || dealAve == '.000' || dealAve == '--') {

                        dealAve = '--'
                    } else {
                        if (Number(jtrade)) {
                            dealAve = dealAve.delFixed(jtrade)
                        } else {
                            dealAve = parseInt(dealAve)
                        }

                    }
                    return {
                        time,
                        type,
                        price,
                        count,
                        commissionSum,
                        dealDone,
                        dealAve,
                        unDeal,
                        jtrade,
                        btrade,
                        id,
                    }
                })
            },
            mapLogArr(arr) {
                // console.log(arr)
                let _this = this;
                this.logArr = arr.map((element, index) => {
                    let type = ''
                        , status = ''
                        , time = Number(element.addtime).timetrans()
                        , price
                        , dealAve
                        , dealDone
                        , jtrade = element.jtrade  //币二 
                        , btrade = element.btrade  //币一
                        , count;

                    Number(element.flag) ? type = this.$t("re.a2") : type = this.$t("re.a3");

                    if (element.type == 2) {
                        price = this.$t("e.a9")

                    } else {
                        if (Number(jtrade)) {
                            price = element.fixedprice.delFixed(jtrade)
                        } else {
                            price = parseInt(element.fixedprice)
                        }

                        if (price == '.00') {
                            price = '--'
                        }

                    }
                    if (element.type == 2 && element.flag == 1) {
                        if (Number(jtrade)) {
                            count = (Number(element.sucprice) + Number(element.price)).toString().delFixed(jtrade) + this.bName;
                        } else {
                            count = (Number(element.sucprice) + parseInt(Number(element.price))) + this.bName;
                        }

                    } else {
                        if (Number(btrade)) {
                            count = element.totalnum.delFixed(btrade) + element.name
                        } else {
                            count = parseInt(element.totalnum) + element.name
                        }
                    }
                    if (element.status == 0) {
                        status = ''
                        _this.actionText = _this.$t('hh.c8')
                    } else if (element.status == 1) {
                        status = _this.$t("a.a7")
                        _this.actionText = _this.$t('hh.c8')
                    } else if (element.status == 2) {
                        status = _this.$t("hh.c3")
                        _this.actionText = _this.$t('hh.c8')
                    } else if (element.status == 4) {
                        status = _this.$t("hh.c9")
                        _this.actionText = _this.$t('hh.c8')
                    }
                    if (Number(jtrade)) {
                        dealAve = element.dealave.delFixed(jtrade);
                      
                    } else {
                        dealAve = parseInt(element.dealave);
                    }
                    if(Number(jtrade)){
                        dealDone = element.sucnum.delFixed(btrade) + element.name
                    }else{
                        dealDone = parseInt(element.sucnum) + element.name
                    }
                    if (dealAve == '' || dealAve == undefined || dealAve == '.00' || dealAve == '.0000') {
                        dealAve = '--'
                    }

                    return {
                        time: time,
                        type: type,
                        price: price,
                        count: count,
                        dealDone: dealDone,
                        dealAve: dealAve,
                        status: status,
                        fee: element.fee,
                        sucprice: element.sucprice,
                        jFloal: jtrade,
                        btrade: btrade,
                        name: element.name,
                        flag: element.flag
                    }
                })
            },
            warning(msg) {
                this.$Notice.warning({
                    title: msg,
                    desc: ''
                });
            },
            success(msg) {
                this.$Notice.success({
                    title: msg,
                    desc: ''
                });
            }
        },
        updated() {

        },
        beforeDestroy() {


        },
        watch: {
            currEntrust(newValue, oldValue) {
                // console.log(this.currEntrust.length)
                this.mapCurrArr(this.currEntrust)
            },
            logEntrust() {
                this.mapLogArr(this.logEntrust)
            },
            currArr(newVal, oldVal) {
                if (newVal.length <= 0) {
                    this.isdata = false
                } else if (newVal.length > 0) {
                    this.isdata = true
                }
                //实时 显示无记录
            },
            logArr(newVal, oldVal) {
                if (newVal.length <= 0) {
                    this.isdata1 = false
                } else if (newVal.length > 0) {
                    this.isdata1 = true
                }
            }

        }
    }
</script>
<style lang="scss">
    .v-tradCommission {
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
        .top {
            width: 100%;
            background: #ffffff;
            height: 360px;
        }
        .bottom {
            width: 100%;
            background: #ffffff;
            height: 360px;
            margin-top: 15px;
        }
        .ivu-table-cell {
            padding-left: 12px;
        }
        .title {
            width: 100%;
            height: 55px;
            .ivu-menu-horizontal {
                height: 55px;
                line-height: 55px;
            }
            .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
                color: #555555;
                border-color: red;
            }
            .more {
                float: right;
                padding-right: .2rem;
                color: #555555;
            }
            .ivu-menu-horizontal.ivu-menu-light:after {
                height: 0;
                display: none;
            }
        }
        .table {
            width: 100%;
            height: 305px;
            position: relative;
            &.air {
                background: url('/static/img/unrecode.png') no-repeat center center;
            }
            p {
                text-align: center;
                width: 100%;
                bottom: 20%;
                position: absolute;
                font-size: 14px;
                color: #999999;
                a {
                    margin: 0 5px;
                    color: #646464;
                }
            }
        }
        .ivu-table table {
            table-layout: fixed;
            width: 1200px!important;
        }

    }
</style>