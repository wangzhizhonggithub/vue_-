<template>
    <div class="v-recodeMore">
        <div class="nav">
            <ul>
                <li v-for="(item,index) in navArr" :key="index" :class="currIndex==index?'active':''" @click="seleActive(index)">{{$t(item)}}</li>

            </ul>
        </div>
        <div class="recode">
            <div-table :columns="currCol" :data="currData" v-if="currIndex==0"></div-table>
            <div v-if="currData.length==0 && currIndex==0" class="unrecord">
                            <img src="/static/img/unrecode.png" alt="">
                            <p v-if="isLoginStatus">{{$t("fu.a8")}}</p>
                            <p v-if="!isLoginStatus">{{$t("e.a12")}}<router-link to="/login">{{$t("loginin.title4")}}</router-link>{{$t("e.a13")}}<router-link to="/register">{{$t("loginin.title7")}}</router-link>{{$t("e.a14")}}</p>
            </div>
            <div-table :columns="logCol" :data="logData" v-if="currIndex==1"></div-table>
            <div v-if="logData.length==0  && currIndex==1" class="unrecord">
                <img src="/static/img/unrecode.png" alt="">
                <p v-if="isLoginStatus">{{$t("fu.a8")}}</p>
                <p v-if="!isLoginStatus">{{$t("e.a12")}}<router-link to="/login">{{$t("loginin.title4")}}</router-link>{{$t("e.a13")}}<router-link to="/register">{{$t("loginin.title7")}}</router-link>{{$t("e.a14")}}</p>
                </div>
            <Page :total="curpage" :page-size="10" size="small" @on-change="changeCurPage" :current="current" v-if="currIndex==0" ></Page>
            <Page :total="logpage" :page-size="10" size="small" @on-change="changeLogPage" :current="current" v-if="currIndex==1"></Page>
        </div>
        <trad-module :tradModalCon='tradModalCon' :areaIndex="areaIndex"></trad-module>
        <Modal v-model="cancalModel" width="360">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("hh.a3")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{cancalText}}</p>
            </div>
            <div slot="footer" >
                <Button style="background:#00adee;border-color: #00adee;" type="error" size="large" long :loading="modal_loading" @click="undoTrue"> {{$t("fu.a10")}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import divTable from '../tradCommission/tradCommissionCom/jyTable.vue'
    import tradModule from '../tradCommission/tradCommissionCom/tradModal.vue'

    export default {
        name: 'recodeMore',
        components: {
            divTable, tradModule
        },
        data() {
            return {
                cancalText: this.$t('hh.a2'),
                btype : 2,
                areaIndex:0,
                tab: 0,
                actionText: this.$t('hh.c8'),
                navArr: [
                ('t.c1'),
                ('t.c2')
                ],
                currIndex: 0,
                bName:"CNHA",
                currEntrust: null,
                logEntrust: null,
                curpage: 0,
                current: 1,
                
                logpage:0,
                modal_loading: false,
                cancalModel: false,
                tradModalCon: { 'con': false },
                currCol: [
                    {
                        title: this.$t('de.a5'),
                        key: 'time',
                        width:150
                    },
                    {
                        title: this.$t('re.a4'),
                        key: 'type'
                    },
                    {
                        title: this.$t("re.a12")+'(CNHA)',
                        key: 'price'
                    },
                    {
                        title: this.$t('de.a6'),
                        key: 'count'
                    },
                    {
                        title: this.$t('hh.c5')+'(CNHA)',
                        key: 'commissionSum'
                    },
                    {
                        title:this.$t('hh.c3'),
                        key: 'dealDone'
                    },
                    {
                        title: this.$t('hh.c7'),
                        key: 'dealAve'
                    },
                    {
                        title:this.$t('hh.c4'),
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
                                            this.nodeal=params.row.unDeal;
                                            this.id=params.row.id;
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
                        title: this.$t("re.a12")+'(CNHA)',
                        key: 'price'
                    },
                    {
                        title:  this.$t('hh.c6'),
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
                            if(params.row.status==this.$t("w.a7")){
                            return h('div', [
                            h('div', {
                                style:{
                                    color:'#cccccc',
                                },
                                domProps: {
                                    innerHTML: this.actionText
                                },
                            })
                        ],this.actionText);
                        }else{
                            return h('div', [
                            h('div', {
                                style:{
                                    color:'#00aedd',
                                    cursor:'pointer',
                                },
                                domProps: {
                                    innerHTML: this.actionText
                                },
                                on: {
                                    click: () => {
                                        
                                        if(this.actionText ==  this.$t('hh.c8')){
                                            this.tradModalCon.con = true;
                                            this.detailIndex = params.index;
                                            this.$eventBus.$emit('GetDetail',params.row)
                                        }

                                        
                                    }
                                }
                            })
                        ]);
                        }
                        }
                    }
                ],
                logData: [],
                currData: [],
                isLoginStatus:false
            }
        },
        methods: {
            seleActive(index) {
                this.currIndex = index;
                this.current=1;            //数据和页码匹对
                this.changeCurPage(1)
               
            },
            changeCurPage(page) {
                let _this = this
                    , params = {};
                params.typeboxid = this.btype || 2
                params.page = page;
                this.FetchGet(this.requestUrl.tradingCenter.currEntrust, params)
                    .then(res => {
                        if (res.status == 200) {
                            _this.currEntrust = res.data.myent;
                            _this.mapCurrArr(_this.currEntrust)
                        } else {
                            // _this.$Message.error(res.message);
                        }
                    })
            },
            changeLogPage(page){
                let _this = this
                    , params = {};
                params.typeboxid = this.btype || 2
                params.page = page;
                this.FetchGet(this.requestUrl.tradingCenter.logEntrust, params)
                    .then(res => {
                        if (res.status == 200) {
                            _this.logEntrust = res.data.pagedata;
                            _this.mapLogArr(_this.logEntrust)
                        }
                    })
            },
            undoTrue() {
                this.modal_loading = true;
                // this.currData.splice(this.undoIndex,1)
                let obj = {
                    id:this.id,
                    nodeal:this.nodeal
                }
                this.FetchPost(this.requestUrl.tradingCenter.cancelEntrust,obj)
                    .then(res=>{
                     if(res.status==200){
                        this.success( this.$t('e.a10'));
                        this.currData.splice(this.undoIndex,1)
                        this.cancalModel = false;
                        this.modal_loading = false;
                     }else{
                        this.$Message.warning(res.message);
                        this.cancalModel = false;
                        this.modal_loading = false;
                     }
    
                    })
            },
            undoFlase() {

            },
            undo() {

            },
            getEntrust() {  //并发请求
                let _this = this
                    , params = {}
                    , opt = {};
                params.typeboxid = this.btype || 2
                params.page = 1
                opt.url1 = this.requestUrl.tradingCenter.currEntrust
                opt.params1 = params
                opt.url2 = this.requestUrl.tradingCenter.logEntrust
                opt.params2 = params
                opt.callback = function (res1, res2) {
                    if(res1.data){
                        _this.currEntrust = res1.data.myent;
                        _this.curpage = Number(res1.data.count);
                        _this.mapCurrArr(_this.currEntrust)
                    }else{
                        // _this.$Message.error(res1.message);
                    }
                    if(res2.data){
                        _this.logEntrust = res2.data.pagedata;
                        _this.logpage = Number(res2.data.count); 
                        _this.mapLogArr(_this.logEntrust);
                    }else{
                        // _this.$Message.error(res2.message);
                    }

                }
                this.FetchAll(opt)

            },
            mapCurrArr(arr) {
                let _this = this;
                this.currData = arr.map((element, index) => {
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
                this.logData = arr.map((element, index) => {
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
            warning (msg) {
                this.$Notice.warning({
                    title:msg,
                    desc: ''
                });
            },
            success (msg) {
                this.$Notice.success({
                    title: msg,
                    desc: ''
                });
            }
        },
        created() {
            //已经利用路由 回掉控制他
  
            if(localStorage.user){
                this.isLoginStatus = true
            }else{
                this.isLoginStatus = false
            }
            // console.log(this.areaIndex)
        },
        mounted(){

        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
                var query = to.query
              
                vm.btype = query.id
                vm.tab = query.tab
                vm.areaIndex = Number(query.areaIndex)
                vm.currIndex = query.tab
                if(vm.areaIndex==1){
                    vm.bName="ETF"
                vm.currCol[2].title= vm.$t("re.a12") + '(ETF)';
                vm.currCol[4].title= vm.$t("hh.c5") + '(ETF)'
                vm.logCol[2].title= vm.$t("re.a12") + '(ETF)'
            }else if(vm.areaIndex==2){
                vm.currCol[2].title= vm.$t("re.a12") + '(ETH)'
                vm.currCol[4].title= vm.$t('hh.c5') + '(ETH)'
                vm.logCol[2].title= vm.$t("re.a12") + '(ETH)'
                vm.bName="ETH"
            }else if(vm.areaIndex==0){
                vm.currCol[2].title= vm.$t("re.a12") + '(CNHA)'
                vm.currCol[4].title= vm.$t("hh.c5") + '(CNHA)'
                vm.logCol[2].title= vm.$t("re.a12") + '(CNHA)'
                vm.bName="CNHA"
            }else if(vm.areaIndex==3){
                vm.currCol[2].title= vm.$t("re.a12") + '(airdrop)'
                vm.currCol[4].title= vm.$t("hh.c5") + '(airdrop)'
                vm.logCol[2].title= vm.$t("re.a12") + '(airdrop)'
                vm.bName="airdrop"
            }

                vm.COM.jumpScroll()
            })
        },
       
        watch:{
            btype(newVal,oldVal){

                this.getEntrust();
               
            }
        }
    }
</script>
<style lang="scss">
    .v-recodeMore {
        // width: 100%;
        // height: inherit;
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        .unrecord{
            width: 100%;
            height: 100%;
             text-align: center;
            margin-top: 200px;
             p{
                 color: #999999;
                 font-size: 14px;
             }
             a{
                 color: #646464;
             }
        }
        .ivu-table-cell{
            padding-left:12px; 
        }
        .nav {
            line-height: 44px;
            height: 44px;
            background: #f3f3f3;
            font-size: 14px;
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
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 600;
                    &.active {
                        background: #ffffff
                    }
                }
            }
        }
        .recode {
            background: #ffffff;
            text-align: center;
            min-height: 600px;
            position: relative;
            /* .v-divTable {
                margin-bottom: 20px;
            } */
            table{
                min-width: 1200px;
            }
            .table{
                width: 100%;
                min-height: 600px;
                position: relative;
                background: url('/static/img/unrecode.png') no-repeat center center;
                p{
                    text-align: center;
                    width: 100%;
                    bottom: 30%;
                    position: absolute;
                    font-size: 14px;
                    color: #999999;
                    a{
                        margin: 0 5px;
                        color: #646464;
                    }
                }
            }
        }
        .ivu-page {
            margin: 0 auto;
            width: 100%;
            position: absolute;
            bottom: 20px;
        }
        .ivu-page-item-active {
            background-color: #00aedd;
            border-color:  #00aedd;
        }
    }
    
</style>