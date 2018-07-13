<template>
    <div class="r_conent">
        <div class="r_header">
            <h2>{{$t("fins.name2")}}</h2>
        </div>
        <div class="r-main">
            <ul class="topUl">
                <li v-for="(item,index) in headList" :class="index==currentIndex?'lis':''" @click="toggleTab(index,item.id)">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="address" v-if="headList">
                <p v-if="Recflag==1">{{$t("de.a1")}}
                    <b style="font-size:18px;">{{address}}</b>
                    <span v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("de.a2")}}</span>
                    <span @mouseenter="showimg" @mouseleave="hideimg">{{$t("de.a3")}}</span>
                    <qrcode :value="address" :options="{ size: 200 }" v-if="imgShow" class="img"></qrcode>
                </p>
                <p v-if="Recflag==0">
                    {{$t("de.a4")}}
                </p>
            </div>
            <div class="info">
                <h4>{{$t("account.a7")}}</h4>
                <p>
                    {{$t("de.b4")}} {{name}}{{$t("de.b5")}}
                </p>
                <p>
                    <span v-if="name=='BTC'"> {{$t("de.b1")}}</span>
                    <span v-else>{{$t("de.b2")}}</span>
                </p>
                <p>
                    {{$t("de.b33")}}
                </p>
                <p>
                    {{$t("de.b3")}}
                </p>
            </div>
        </div>
        <div class="ac_th" v-if="headList">
            <ul>
                <li>{{$t("de.a5")}}</li>
                <li>{{$t("de.a6")}}({{name}})</li>
                <li>{{$t("de.a7")}}</li>
                <li>{{$t("de.a8")}}</li>
            </ul>
        </div>
        <div class="ac_td">
            <ul v-for="item in czList">
                <li>
                    {{item.addtime}}
                </li>
                <li>{{item.goldnum}}</li>
                <li>{{item.num}}</li>
                <!-- <li v-if="Number(item.status)==2">{{$t("de.a9")}}</li> -->
                <li v-if="Number(item.status)==1">{{$t("de.a9")}}</li>
                <li v-if="Number(item.status)==0">{{$t("de.a10")}}</li>
                <li v-if="Number(item.status)==2">{{$t("w.a55")}}</li>
                <!-- <li v-else>  </li> -->
            </ul>
            <div v-if="czList.length==0" class="unrecord">
                <img src="/static/img/unrecode.png" alt="">
                <p>{{$t("fu.a8")}}</p>
            </div>
        </div>
        <div class="yz">
            <Button type="primary" size="large" @click="loadMore" v-if="czList.length>0">{{$t("fu.a7")}}</Button>
        </div>


    </div>
</template>
<script>
    import Vue from 'vue';
    import VueClipboard from "vue-clipboard2";
    import VueQrcode from '@xkeshi/vue-qrcode';
    Vue.use(VueClipboard)
    export default {
        data() {
            return {
                spanshow: true,
                spanshow1: true,
                imgShow: false,
                headList: [],
                address: '', //钱包地址
                typeid: 1,//切换的id
                czList: [],
                name: 'CNHA',
                currentIndex: 0,
                n: 1,
                istoken: 1,
                flag:0,
                tfloal: 2,
                Recflag: 1,
                showData: [
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                ]
            }
        },
        components: {
            'qrcode': VueQrcode
        },
        methods: {
            init() {
                this.flag=0;
                this.FetchPost(this.requestUrl.FinanceCenter.CZaddress, { typeid: this.typeid, istoken: this.istoken }).then(res => {
                    if (res.status == 200) {
                        this.address = res.data;
                        this.flag=1;
                        // if (this.address) {
                            this.FetchPost(this.requestUrl.FinanceCenter.CZ, { typeid: this.typeid, address: this.address }).then(res => {
                                //    console.log(res)
                                this.FetchGet(this.requestUrl.FinanceCenter.CZlog, { typeid: this.typeid, page: this.n }).then(res => {
                                    if (res.status == 200) {
                                        this.czList = res.data.pagedata.filter((item, index) => {
                                            let addtime = new Date((Number(item.addtime) * 1000));
                                            item.addtime = this.formatDate(addtime);
                                            item.goldnum = item.goldnum.delFixed(Number(this.tfloal));
                                            return true;
                                        })
                                    } else if (res.status == 402) {
                                        this.czList = [];
                                    }
                                })
                            })
                        // } else {
                        //     this.czList = [];
                        // }
                    }else if(res.status==403){
                        this.address="";
                    }
                })

            },
            toggleTab(index, typeid) {
                this.n = 1;
                sessionStorage.setItem("n",1);
                this.czList=[];
                this.address="";
                if(this.flag==0){
                    return false;
                }
                if (index != this.currentIndex) {
                    this.currentIndex = index;
                    this.typeid = typeid;
                    sessionStorage.setItem("currentIndex", this.currentIndex);
                    this.name = this.headList[this.currentIndex].name;
                    this.istoken = this.headList[this.currentIndex].istoken;
                    this.tfloal = Number(this.headList[this.currentIndex].tfloal)
                    this.Recflag = Number(this.headList[this.currentIndex].status.Recflag);

                    // if(this.Recflag){
                    this.init();
                    //  }
                }

                //   this.FetchPost(this.requestUrl.FinanceCenter.CZaddress, {typeid:this.typeid}).then(res => {
                //     this.address=res.data;
                // })
            },
            formatDate(date) {
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '   ';
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                return Y + M + D + h + m + s;
            },
            loadMore() {
                let getData = [];
                this.n++;
                sessionStorage.setItem("n", this.n);
                this.FetchGet(this.requestUrl.FinanceCenter.CZlog, { typeid: this.typeid, page: this.n }).then(res => {
                    if (res.status == 200) {
                        getData = res.data.pagedata.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            item.goldnum = item.goldnum.delFixed(Number(this.tfloal));
                            return true;
                        })
                        for (let i = 0; i < getData.length; i++) {
                            this.czList.push(getData[i])
                        }
                    } else {
                        this.n--;
                        sessionStorage.setItem("n", this.n);
                        this.$Notice.warning({
                              title:this.$t('aaa.e6')
                        })
                    }
                })
            },
            buildBTC() {
                this.spanshow = false;
            },
            buildETH() {
                this.spanshow1 = false;
            },
            showimg() {  //二维码的显示隐藏
                this.imgShow = true;
            },
            hideimg() {
                this.imgShow = false;
            },
            onCopy(e) {  //复制文字
                this.$Notice.success({
                    title:this.$t('aaa.d3')
                });
            },
            onError(e) {
                this.$Notice.warning({
                    title:this.$t('aaa.d4')
                });
                // alert("复制失败！")
            },
        },
        created() {
            // this.typeid=sessionStorage.getItem("typeid");
            if(this.$route.params.index){
                        sessionStorage.setItem("currentIndex",this.$route.params.index)
             }
            this.currentIndex = sessionStorage.getItem("currentIndex")  || 0;
            this.n = sessionStorage.getItem("n") || 1;
            this.FetchGet(this.requestUrl.FinanceCenter.headList, {}).then(res => {
                this.headList = res.data.tb;
                this.Recflag = Number(this.headList[this.currentIndex].status.Recflag);
                this.istoken = Number(this.headList[this.currentIndex].istoken)
                this.typeid = Number(this.headList[this.currentIndex].id)
                this.tfloal = Number(this.headList[this.currentIndex].tfloal)
                this.name = this.headList[this.currentIndex].name;
                // if(this.Recflag){
                    this.init();
                // }
            })
        },
    }
</script>
<style lang="scss">
    @import "../../assets/css/recharge.scss"
</style>