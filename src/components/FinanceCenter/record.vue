<template>
    <div class="re_conent">
        <div class="re_header">
            <h2>{{$t("fins.name5")}}</h2>
        </div>
        <div class="firsttype">
            <ul>
                <li v-for="(item,index) in uls" :class="clickIndex==index?'li_add':''" @click="toggleClass(index,item.id)" v-if="index!=1">
                    <span v-if="index==0">{{$t(item.name)}}</span>
                    <span v-else>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="second">
            <ul>
                <li v-for="(item,index) in ulstype" :class="clickIndex1==index?'li_add1':''" @click="toggleClass1(index,item.flag)">{{$t(item.name)}}</li>
            </ul>
        </div>
        <div class="ac_th">
            <ul>
                <li>{{$t("de.a5")}}</li>
                <li>{{$t("re.a4")}}</li>
                <li>{{$t("index.title22")}}</li>
                <li>{{$t("re.a5")}}</li>

                <li>{{$t("de.a6")}}</li>

                <li>{{$t("re.a6")}}</li>
                <li>{{$t("re.a7")}}</li>
            </ul>
        </div>
        <div class="ac_td">
            <ul v-for="item in showData" v-if="showData.length!=0">
                <li>{{item.addtime}}</li>
                <li v-if="item.flag==1">{{$t("re.a2")}}</li>
                <li v-if="item.flag==0">{{$t("re.a3")}}</li>
                <li>{{item.name}}</li>
                <li>{{item.price}}{{item.names}}</li>
                <li>{{item.num}}</li>
                <li>{{item.sum}}{{item.names}}</li>
                <li v-if="item.flag==1">{{item.fee}}{{item.namese}}</li>
                <li v-if="item.flag==0">{{item.fee}}{{item.names}}</li>
            </ul>
            <div v-if="showData.length==0" class="unrecord">
                <img src="/static/img/unrecode.png" alt="">
                <p>{{$t("fu.a8")}}</p>
            </div>
        </div>
        <div class="page" v-if="showData.length!=0">
            <Page :total="count" :current.sync="current" :page-size="10" size="small" @on-change="changePage"></Page>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                clickIndex: 0,//点击币种的下表
                clickIndex1: 0,//点击类型的下表
                count: 0,//总数
                current: 1,//当前页数
                uls: [],
                id: "",
                flag: 3,
                ulstype: [
                    { name: "re.a1", flag: 3 },
                    { name: "re.a2", flag: 1 },
                    { name: "re.a3", flag: 0 },
                ],
                showData: [],
            }
        },
        methods: {
            toggleClass(idx, id) {  //切换上面的币种
                this.current = 1;
                this.clickIndex = idx;
                this.id = id;
                sessionStorage.setItem("id", this.id);
                sessionStorage.setItem("clickIndex", this.clickIndex);
                sessionStorage.setItem("current", this.current);
                let params = {};
                // console.log(this.flag)
                if (this.id && this.flag != 3) {
                    params = {
                        id: this.id,
                        flag: this.flag
                    }
                } else if (this.id) {
                    params = {
                        id: this.id,
                    }
                } else if (this.flag != 3) {
                    params = {
                        flag: this.flag
                    }

                }

                this.FetchPost(this.requestUrl.FinanceCenter.show, params

                ).then(res => {
                    if (res.status == 200) {
                        this.showData = res.data.list.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            if (Number(item.jtrade)) {
                                item.price = item.price.delFixed(Number(item.jtrade));
                                item.num = item.num.delFixed(Number(item.btrade));
                                item.sum = item.sum.delFixed(Number(item.jtrade));
                            } else {
                                item.price = parseInt(item.price);
                                item.num = parseInt(item.num);
                                item.sum = parseInt(item.sum);
                            }
                            if (item.flag == 1) {
                                var fee = item.fee + '00';
                                var _tmp = fee.match(/\.\d+0+/)[0].replace(/0+$/, '');
                                fee = fee.replace(/\.\d+0+/, _tmp);
                                if (fee.toString().split(".")[1].length == 0) {
                                    fee = fee + "00";
                                } else if (fee.toString().split(".")[1].length == 1) {
                                    fee = fee + "0";
                                } else {
                                    fee = fee;
                                }
                                item.fee = fee;
                                // item.fee=item.fee.delFixed(Number(item.btrade));
                            } else {
                                item.fee = item.fee.delFixed(Number(item.jtrade));
                            }
                            return true;
                        })
                        this.page = Number(res.data.page_num);
                        this.count = Number(res.data.count);
                    } else if (res.status == 401) {
                        this.showData = [];
                    }
                })
            },
            toggleClass1(idx, flag) {  //切换类
                this.current = 1;
                this.clickIndex1 = idx;
                this.flag = flag;
                sessionStorage.setItem("flag", this.flag);
                sessionStorage.setItem("clickIndex1", this.clickIndex1);
                sessionStorage.setItem("current", this.current);
                let params = {};
                if (this.id && this.flag != 3) {
                    params = {
                        id: this.id,
                        flag: this.flag
                    }
                } else if (this.id) {
                    params = {
                        id: this.id,
                    }
                } else if (this.flag != 3) {
                    params = {
                        flag: this.flag
                    }
                }
                this.FetchPost(this.requestUrl.FinanceCenter.show, params

                ).then(res => {
                    if (res.status == 200) {
                        this.showData = res.data.list.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            if (Number(item.jtrade)) {
                                item.price = item.price.delFixed(Number(item.jtrade));
                                item.num = item.num.delFixed(Number(item.btrade));
                                item.sum = item.sum.delFixed(Number(item.jtrade));
                            } else {
                                item.price = parseInt(item.price);
                                item.num = parseInt(item.num);
                                item.sum = parseInt(item.sum);
                            }

                            if (item.flag == 1) {
                                // item.fee=item.fee.delFixed(Number(item.btrade));
                                var fee = item.fee + '00';
                                var _tmp = fee.match(/\.\d+0+/)[0].replace(/0+$/, '');
                                fee = fee.replace(/\.\d+0+/, _tmp);
                                if (fee.toString().split(".")[1].length == 0) {
                                    fee = fee + "00";
                                } else if (fee.toString().split(".")[1].length == 1) {
                                    fee = fee + "0";
                                } else {
                                    fee = fee;
                                }
                                item.fee = fee;
                            } else {
                                item.fee = item.fee.delFixed(Number(item.jtrade));
                            }

                            return true;
                        })
                        this.page = Number(res.data.page_num);
                        this.count = Number(res.data.count);
                    } else if (res.status == 401) {
                        this.showData = [];
                    }
                })
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
            changePage() {  //切换页数
                let params = {};
                if (this.id && this.flag != 3) {
                    params = {
                        id: this.id,
                        flag: this.flag,
                        page: this.current,
                    }
                } else if (this.id) {
                    params = {
                        id: this.id,
                        page: this.current,
                    }
                } else if (this.flag != 3) {
                    params = {
                        flag: this.flag,
                        page: this.current,
                    }
                } else {
                    params = {
                        page: this.current,
                    }
                }
                sessionStorage.setItem("current", this.current);
                this.FetchPost(this.requestUrl.FinanceCenter.show, params).then(res => {
                    if (res.status == 200) {
                        this.showData = res.data.list.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            if (Number(item.jtrade)) {
                                item.price = item.price.delFixed(Number(item.jtrade));
                                item.num = item.num.delFixed(Number(item.btrade));
                                item.sum = item.sum.delFixed(Number(item.jtrade));
                            } else {
                                item.price = parseInt(item.price);
                                item.num = parseInt(item.num);
                                item.sum = parseInt(item.sum);
                            }
                            if (item.flag == 1) {
                                // item.fee=item.fee.delFixed(Number(item.btrade));
                                var fee = item.fee + '00';
                                var _tmp = fee.match(/\.\d+0+/)[0].replace(/0+$/, '');
                                fee = fee.replace(/\.\d+0+/, _tmp);
                                if (fee.toString().split(".")[1].length == 0) {
                                    fee = fee + "00";
                                } else if (fee.toString().split(".")[1].length == 1) {
                                    fee = fee + "0";
                                } else {
                                    fee = fee;
                                }
                                item.fee = fee;
                            } else {
                                item.fee = item.fee.delFixed(Number(item.jtrade));
                            }
                            return true;
                        })
                    } else {

                        sessionStorage.setItem("current", this.current - 1);
                    }
                })
            }
        },
        mounted() {
            //币种展示
            this.id = sessionStorage.getItem("id") || 0;
            this.flag = sessionStorage.getItem("flag") || 3;
            this.clickIndex = sessionStorage.getItem("clickIndex") || 0;
            this.clickIndex1 = sessionStorage.getItem("clickIndex1") || 0;
            this.current = Number(sessionStorage.getItem("current")) || 1;
            this.FetchPost(this.requestUrl.FinanceCenter.log, {}).then(res => {
                if (res.status == 200) {
                    let data = [];
                    data = res.data.data;
                    data.unshift({
                        id: '',
                        name: "re.a1"
                    })
                    this.uls = data;
                }
            })
            let params = {};
            if (this.id && this.flag != 3) {
                params = {
                    id: this.id,
                    flag: this.flag,
                    page: this.current,
                }
            } else if (this.id) {
                params = {
                    id: this.id,
                    page: this.current,
                }
            } else if (this.flag != 3) {
                params = {
                    flag: this.flag,
                    page: this.current,
                }
            } else {
                params = {
                    page: this.current,
                }
            }
            // console.log(params)
            //数据展示
            this.FetchPost(this.requestUrl.FinanceCenter.show, params).then(res => {
                if (res.status == 200) {
                    this.showData = res.data.list.filter((item, index) => {
                        let addtime = new Date((Number(item.addtime) * 1000));
                        item.addtime = this.formatDate(addtime);
                        if(Number(item.jtrade)){
                            item.price=item.price.delFixed(Number(item.jtrade));
                        item.num=item.num.delFixed(Number(item.btrade));
                        item.sum=item.sum.delFixed(Number(item.jtrade));
                        }else{
                            item.price=parseInt(item.price);
                        item.num=parseInt(item.num);
                        item.sum=parseInt(item.sum);
                        }
                        if (item.flag == 1) {
                            var fee = item.fee + '00';
                            var _tmp = fee.match(/\.\d+0+/)[0].replace(/0+$/, '');
                            fee = fee.replace(/\.\d+0+/, _tmp);
                            if (fee.toString().split(".")[1].length == 0) {
                                fee = fee + "00";
                            } else if (fee.toString().split(".")[1].length == 1) {
                                fee = fee + "0";
                            } else {
                                fee = fee;
                            }
                            item.fee = fee;
                            // item.fee=item.fee.delFixed(Number(item.btrade));
                        } else {
                            item.fee = item.fee.delFixed(Number(item.jtrade));
                        }
                        return true;
                    })
                    this.page = Number(res.data.page_num);
                    this.count = Number(res.data.count);
                } else if (res.status == 401) {
                    this.showData = [];
                }
            })
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/record.scss"
</style>