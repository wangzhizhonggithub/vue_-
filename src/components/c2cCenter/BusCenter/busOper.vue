<template>
    <div class="v-busOper">
        <div class="v-main">
            <div class="main">
                <div class="buy" v-if="buyOver">
                    <p>{{$t("cc.c8")}}CNHA</p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="buyprice">
                        <span class="sps">{{$t("t.b1")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="num" @input="subMon(1)">
                        <span>{{$t("t.b2")}} CNHA</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="minnum" @input="subMon(2)">
                        <span class="spans">{{$t("cc.c10")}}</span>
                        <b>CNHA</b>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="maxnum" @input="subMon(3)" @keyup="enterMon(0)" @keyup.enter="enterTraw(1)">
                        <span class="spans">{{$t("cc.c11")}}</span>
                        <b>CNHA</b>
                    </div>
                    <b>{{$t("account.a4")}}
                        <span>{{buyMon}} CNY</span>
                    </b>
                    <div class="buyBtn" @click="enterTraw(1)">
                        {{$t("cc.c12")}}
                    </div>
                </div>
                <div class="sell" v-if="sellOver">
                    <p>{{$t("cc.c9")}}CNHA
                        <span style="color:#00adee;margin-left:15px;cursor:pointer;" @click="goUp">{{$t("cc.c13")}}</span>
                        <span>{{$t("cc.a3")}}{{goldnum}}</span>
                    </p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="sellprice">
                        <span class="sps">{{$t("t.b3")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" @input="suMon1(1)" v-model="num1">
                        <span>{{$t("t.b4")}} CNHA</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="minnum1" @input="suMon1(2)">
                        <span class="spans">{{$t("cc.c10")}}</span>
                        <b>CNHA</b>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="maxnum1" @input="suMon1(3)" @keyup="enterMon(1)" @keyup.enter="enterTraw(0)">
                        <span class="spans">{{$t("cc.c11")}}</span>
                        <b>CNHA</b>
                    </div>
                    <CheckboxGroup v-model="type" class="check">
                        <span style="margin-right:10px;">{{$t("cc.a4")}}</span>
                        <Checkbox label="2">
                            <span>{{$t("cc.a5")}}</span>
                        </Checkbox>
                        <Checkbox label="3">
                            <span>{{$t("cc.a6")}}</span>
                        </Checkbox>
                        <Checkbox label="1" disabled>
                            <span>{{$t("cc.a7")}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                    <b style="margin-right:0px;">{{$t("account.a4")}}
                        <span>{{sellMon}} CNY</span>
                    </b>
                    <div class="sellBtn" @click="enterTraw(0)">
                        {{$t("cc.c12")}}
                    </div>
                </div>
                <div class="wBuy" v-if="!buyOver">
                    <p>{{$t("cc.c8")}}CNHA</p>
                    <div class="part">
                        <p>{{$t("cc.d9")}}</p>
                        <input type="text" disabled :placeholder="userBuy.price.delFixed(Number(2))+' CNY'">
                    </div>
                    <div class="part">
                        <p>{{$t("cc.d10")}}</p>
                        <input type="text" disabled :placeholder="userBuy.num.delFixed(Number(2))+' CNHA'">
                    </div>
                    <div class="part1">
                        <div class="left">
                            <p>{{$t("cc.d11")}}</p>
                            <input type="text" disabled :placeholder="userBuy.sucnum.delFixed(Number(2))+' CNHA'">
                        </div>
                        <div class="right">
                            <p>{{$t("cc.d12")}}</p>
                            <input type="text" disabled :placeholder="userBuy.resnum.delFixed(Number(2))+' CNHA'">
                        </div>
                    </div>
                    <div class="part1">
                        <div class="left">
                            <p>{{$t("cc.c10")}}</p>
                            <input type="text" disabled :placeholder="userBuy.minnum.delFixed(Number(2))+' CNHA'">
                        </div>
                        <div class="right">
                            <p>{{$t("cc.c11")}}</p>
                            <input type="text" disabled :placeholder="userBuy.maxnum.delFixed(Number(2))+' CNHA'">
                        </div>
                    </div>
                    <span class="cancel" @click="cancelGate(1)">{{$t("cc.c19")}}</span>
                </div>
                <div class="wSell" v-if="!sellOver">
                    <p>{{$t("cc.c9")}}CNHA
                        <span style="color:#00adee;margin-left:15px;cursor:pointer;" @click="goUp">{{$t("cc.c13")}}</span>
                        <span>{{$t("cc.a3")}}{{goldnum}}</span>
                    </p>
                    <div class="part">
                        <p>{{$t("cc.c14")}}</p>
                        <input type="text" disabled :placeholder="userSell.price.delFixed(Number(2))+' CNHA'">
                    </div>
                    <div class="part">
                        <p>{{$t("cc.c15")}}</p>
                        <input type="text" disabled :placeholder="userSell.num.delFixed(Number(2))+' CNHA'">
                    </div>
                    <div class="part1">
                        <div class="left">
                            <p>{{$t("cc.c16")}}</p>
                            <input type="text" disabled :placeholder="userSell.sucnum.delFixed(Number(2))+' CNHA'">
                        </div>
                        <div class="right">
                            <p>{{$t("cc.c17")}}
                                <b style="margin-left:10px;color:#999999;font-size:12px;">（{{$t("cc.c18")}}）</b>
                            </p>
                            <input type="text" disabled :placeholder="userSell.resnum.delFixed(Number(2))+' CNHA'">
                        </div>
                    </div>
                    <div class="part1">
                        <div class="left">
                            <p>{{$t("cc.c10")}}</p>
                            <input type="text" disabled :placeholder="userSell.minnum.delFixed(Number(2))+' CNHA'">
                        </div>
                        <div class="right">
                            <p>{{$t("cc.c11")}}</p>
                            <input type="text" disabled :placeholder="userSell.maxnum.delFixed(Number(2))+' CNHA'">
                        </div>
                    </div>
                    <div class="part2" v-if="userSell.payment">
                        <p>{{$t("cc.a4")}}</p>
                        <img src="/static/img/wx1.png" alt="" v-if="Number(userSell.payment.wx) || 0">
                        <img src="/static/img/zfb1.png" alt="" v-if="Number(userSell.payment.zfb) || 0">
                        <img src="/static/img/yhk.png" alt="" style="height:22px;" v-if="Number(userSell.payment.yhk) || 0">
                        <span style="margin-left:10px;" @click="cancelGate(0)">{{$t("cc.c19")}}</span>
                        <span @click="suppleModal = true">{{$t("cc.c20")}}</span>

                    </div>
                </div>
                <div class="new" style="clear:both;"></div>
                <div class="info">
                    <h1>{{$t("cc.a8")}}</h1>
                    <p>{{$t("dd.a1")}}</p>
                    <p>{{$t("dd.a2")}}</p>
                    <p>{{$t("dd.a3")}}</p>
                    <p>{{$t("dd.a4")}}</p>
                    <p>{{$t("dd.a5")}}</p>
                    <p style="margin-bottom:20px;">{{$t("dd.a6")}}</p>
                </div>
                <div style="padding-bottom:30px;"></div>
            </div>
        </div>
        <div class="v-record">
            <ul class="uls">
                <li v-for="(item,index) in title" :class="currentIndex==index?'current':''" @click="toggle(index)">{{item}}</li>
            </ul>
            <div v-if="currentIndex==0">
                <div-table :columns="buyCol" :data="showData"></div-table>
                <div class="unrecord" v-if="showData.length==0">
                    <img src="/static/img/unrecode.png" alt="">
                    <p>{{$t("fu.a8")}}</p>
                </div>
                <Page :total="total" size="small" :page-size="5" :current="current" style="text-align:center;padding:30px 0;" v-if="showData.length>0"
                    @on-change="changePage"></Page>
            </div>
            <div v-if="currentIndex==1">
                <div-table :columns="sellCol" :data="showData"></div-table>

                <div class="unrecord" v-if="showData.length==0">
                    <img src="/static/img/unrecode.png" alt="">
                    <p>{{$t("fu.a8")}}</p>
                </div>
                <Page :total="total" size="small" :page-size="5" :current="current" style="text-align:center;padding:30px 0;" v-if="showData.length>0"
                    @on-change="changePage"></Page>
            </div>
        </div>
        <Modal v-model="sureModel" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.a18")}}</p>
                <p>{{$t("cc.a19")}}</p>
            </div>
            <div slot="footer" @click="sureBuy">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                            border-color: #00aedd;">{{$t("cc.a20")}}</Button>
            </div>
        </Modal>
        <Modal v-model="sureModel1" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.d6")}}</p>
                <p>{{$t("cc.d7")}}</p>
            </div>
            <div slot="footer" @click="sureSell">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                     border-color: #00aedd;">{{$t("cc.d8")}}</Button>
            </div>
        </Modal>
        <Modal v-model="cansupModel" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("dd.a7")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("dd.a8")}}</p>
            </div>
            <div slot="footer" @click="cancelIt(1)">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                border-color: #00aedd;">{{$t("cc.d5")}}</Button>
            </div>
        </Modal>
        <Modal v-model="cansupModel1" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("dd.a9")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("dd.a10")}}</p>
            </div>
            <div slot="footer" @click="cancelIt(0)">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;border-color: #00aedd;">确定</Button>
            </div>
        </Modal>
        <div class="delmask" v-if="suppleModal">
        </div>
        <div class="delmask" v-if="tranModal">
        </div>
        <div class="alertModal" v-if="suppleModal">
            <p>{{$t("dd.b1")}}
                <span @click="suppleModal = false">
                    <Icon type="ios-close-empty" style="cursor:pointer;" @click.native="closeSupple"></Icon>
                </span>
            </p>
            <Form :model="formRight" label-position="right" :label-width="150" ref="formRight" :rules="ruleValidate">
                <FormItem :label="$t('dd.b2')" prop="suppeNum">
                    <Input v-model="formRight.suppeNum" @on-keyup="dotExcl"></Input>
                </FormItem>
            </Form>
            <div class="btn">
                <Button type="primary" size="large" @click="suppleit('formRight')">{{$t("cc.d5")}}</Button>
            </div>
        </div>
        <div class="alertModal" v-if="tranModal">
            <p>{{$t("names.name6")}}
                <span @click="tranModal = false">
                    <Icon type="ios-close-empty" @click.native="formRight1.transpwd = ''" style="cursor:pointer;"></Icon>
                </span>
            </p>
            <Form :model="formRight1" label-position="right" :label-width="100" ref="formRight1" :rules="ruleValidate1">
                <FormItem :label="$t('w.b7')" prop="transpwd">
                    <input v-model="formRight1.transpwd" type="password" v-focus @keyup.enter="Entrust('formRight1')" class="ipuss"></input>
                    <Input type="text" style="display:none"></Input>
                </FormItem>
            </Form>
            <div class="btn">
                <Button type="primary" size="large" @click="Entrust('formRight1')">{{$t("cc.d5")}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import divTable from '../../TradingCenter/tradCommission/tradCommissionCom/divTable.vue';
    import buyCard from './jyCard.vue'
    export default {
        components: {
            divTable, buyCard
        },
        props: {
            userBuy: Object,
            userSell: Object,
            mapUserBala: Function,
            sellprice: Number,
            buyprice: Number,
            goldnum: String,
            busData: Object,
            mapUserData: Function,
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        data() {
            const validateTPwd = (rule, value, callback) => {
                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
            };
            const validateNum = (rule, value, callback) => {
                if (!value) {
                    callback(new Error(this.$t('dd.b6')));
                } else {
                    callback();
                }
            };
            return {
                type: ['1'],//收款方式,
                checkArr: [1],
                modal_loading: false,
                sureModel: false,
                sureModel1: false,
                currentIndex: 0,
                buyOver: 1,
                current: 1,
                autofocus: true,
                buyMon: 0,
                sellMon: 0,
                num: '',
                sellOrder: '',
                sellId: "",
                buyOrder: '',
                buyId: '',
                minnum: '',
                maxnum: '',
                num1: '',
                minnum1: '',
                maxnum1: '',
                params: '',
                total: 0,
                sellMon: 0,
                bustype: '',
                cansupModel: false,
                cansupModel1: false,
                suppeNum: '',
                modal2: false,
                tranModal: false,
                sellOver: 1,
                suppleModal: false,
                showData: [],
                title: [
                    this.$t('dd.b11'), this.$t('dd.b12')
                ],
                buyCol: [
                    {
                        title: this.$t('cc.b3'),
                        key: 'id',
                        width: 100
                    },
                    {
                        title: this.$t('de.a5'),
                        key: 'time',
                        width: 140,
                    },
                    {
                        title: this.$t('dd.b3'),
                        key: 'buyer'
                    },
                    {
                        title: this.$t('re.a5') + '(CNY)',
                        key: 'price',
                        width: 105,
                    },
                    {
                        title: this.$t('de.a6') + '(CNHA)',
                        key: 'count',
                        width: 130,
                    },
                    {
                        title: this.$t('cc.b5') + '(CNY)',
                        key: 'total',
                        width: 105,
                    },
                    {
                        title: this.$t('dd.b4'),
                        key: 'type',
                        width: 145,
                    },
                    {
                        title: this.$t('dd.b5'),
                        key: 'memo',
                        width: 145,
                    },
                    {
                        title: this.$t('de.a8'),
                        key: 'status',
                    },
                    {
                        title: this.$t('account.a5'),
                        key: 'action',
                        width: 120,
                        // align:'left',
                        render: (h, params) => {
                            if (params.row.status == '买家已付款') {
                                return h('div', [
                                    h('div', {
                                        style: {
                                            color: '#00aedd',
                                            cursor: 'pointer',
                                            width: '50%',
                                            float: 'left',
                                        },
                                        on: {
                                            click: () => {
                                                this.sellOrder = params.row.id;
                                                this.sellId = params.row.ordernum;
                                                this.sureModel1 = true
                                            }
                                        }
                                    }, this.$t('cc.b6')),
                                ]);
                            }
                        }
                    }
                ],
                sellCol: [
                    {
                        title: this.$t('cc.b3'),
                        key: 'id',
                        width: 100
                    },
                    {
                        type: 'expand',
                        width: 10,
                        render: (h, params) => {
                            return h(buyCard, {
                                props: {
                                    row: params.row.method,
                                    status: params.row.status
                                }
                            })
                        }
                    },
                    {
                        title: this.$t('de.a5'),
                        key: 'time',
                        width: 160,
                        align: 'center'
                    },
                    {
                        title: this.$t('re.a5') + '(CNY)',

                        key: 'price'
                    },
                    {
                        title: this.$t('de.a6') + '(CNHA)',
                        key: 'count'
                    },
                    {
                        title: this.$t('cc.b5') + '(CNY)',
                        key: 'total'
                    },
                    {
                        title: this.$t('de.a8'),
                        key: 'status',
                    },
                    {
                        title: this.$t('account.a5'),
                        key: 'action',
                        render: (h, params) => {
                            if (params.row.status == this.$t('dd.c6')) {
                                return h('div', [
                                    h('div', {
                                        style: {
                                            color: '#00aedd',
                                            cursor: 'pointer',
                                            width: '50%',
                                            float: 'left',
                                        },
                                        on: {
                                            click: () => {
                                                this.buyOrder = params.row.id;
                                                this.buyId = params.row.ordernum;
                                                this.sureModel = true
                                            }
                                        }
                                    }, this.$t('cc.b7')),
                                ]);
                            }
                        }
                    }
                ],
                formRight: {
                    suppeNum: '',
                },
                formRight1: {
                    transpwd: '',
                },
                ruleValidate: {
                    suppeNum: [
                        // { required: true, message: this.$t('dd.b6'), trigger: 'blur' },
                        { validator: validateNum, trigger: 'blur' }
                    ]
                },
                ruleValidate1: {
                    transpwd: [
                        { required: true, message: this.$t('input.a21'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            dotExcl() {
                if(Number(this.formRight.suppeNum)){
                    this.formRight.suppeNum = this.formRight.suppeNum.toString().replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.formRight.suppeNum = this.formRight.suppeNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.formRight.suppeNum = this.formRight.suppeNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.formRight.suppeNum = this.formRight.suppeNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.formRight.suppeNum.indexOf(".") < 0 && this.formRight.suppeNum != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.formRight.suppeNum = parseFloat(this.formRight.suppeNum);
                    }
                }else{
                    this.formRight.suppeNum = "";
                }
            },
            toggle(idx) {
                this.showData = [];
                this.currentIndex = idx;
                this.current = 1;
                this.mapUserData(idx, this.current);

                // this.mapData();
            },
            sureBuy() { //确认已付款
                this.FetchPost(this.requestUrl.twoCen.payMent, {
                    id: this.buyId,
                    ordernum: this.buyOrder
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b9')
                        });
                        this.sureModel = false;
                        this.mapUserData(this.currentIndex, this.current);
                    } else {
                        this.sureModel1 = false;
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                    }
                })
            },
            sureSell() { //确认已收款
                this.FetchPost(this.requestUrl.twoCen.Receiva, {
                    id: this.sellId,
                    ordernum: this.sellOrder
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b9')
                        });
                        this.sureModel1 = false;
                        this.mapUserData(this.currentIndex, this.current);
                    } else {
                        this.sureModel1 = false;
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                    }
                })
            },
            changePage(page) {
                this.current = page;
                this.mapUserData(this.currentIndex, page);
            },
            goUp() {  //跳转到财务中心充值
                this.$router.push("/financial/deposit")
            },
            suppleit(name) {  //补充CNHA
                let params = {};
                params = {
                    id: this.userSell.id,
                    num: this.formRight.suppeNum
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.twoCen.Supplement, params).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('cc.b9')
                                });
                                this.suppleModal = false;
                                this.formRight.suppeNum = "";
                                this.mapUserBala();
                            } else if (res.status == 401) {
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                });
                            } else {
                                this.$Notice.warning({
                                    title: this.$t('cc.b10')
                                });
                            }
                        })
                    }
                })
            },
            closeSupple() {
                this.formRight.suppeNum = ''
            },
            subMon(flag) {  //计算买入cnha
                if (flag == 1) {
                    this.num = this.num.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.num = this.num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.num = this.num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.num = this.num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.num.indexOf(".") < 0 && this.num != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.num = parseFloat(this.num);
                    }
                    let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                    if (numReg.test(this.num)) {
                        this.buyMon = Number(this.num).mul(this.buyprice)
                    } else {
                        this.buyMon = 0;
                    }
                } else if (flag == 2) {
                    this.minnum = this.minnum.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.minnum = this.minnum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.minnum = this.minnum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.minnum = this.minnum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.minnum.indexOf(".") < 0 && this.minnum != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.minnum = parseFloat(this.minnum);
                    }
                    if (this.num && this.minnum > this.num) {
                        this.minnum = '';
                        this.$Notice.warning({ title: "最小交易量不能大于买入量" })
                        return false
                    }
                } else if (flag == 3) {
                    this.maxnum = this.maxnum.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.maxnum = this.maxnum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.maxnum = this.maxnum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.maxnum = this.maxnum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.maxnum.indexOf(".") < 0 && this.maxnum != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.maxnum = parseFloat(this.maxnum);
                    }

                }
            },
            suMon1(flag) { //计算卖出cnha
                if (flag == 1) {
                    this.num1 = this.num1.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.num1 = this.num1.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.num1 = this.num1.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.num1 = this.num1.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.num1.indexOf(".") < 0 && this.num1 != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.num1 = parseFloat(this.num1);
                    }
                    let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                    if (numReg.test(this.num1)) {
                        this.sellMon = Number(this.num1).mul(this.sellprice)
                        if (this.sellMon > this.goldnum) {
                            this.$Notice.warning({
                                title: '商家卖出总计不能超过可用余额'
                            });
                            this.sellMon = 0;
                            this.num1 = "";
                        }
                    } else {
                        this.sellMon = 0;
                    }
                } else if (flag == 2) {
                    this.minnum1 = this.minnum1.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.minnum1 = this.minnum1.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.minnum1 = this.minnum1.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.minnum1 = this.minnum1.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.minnum1.indexOf(".") < 0 && this.minnum1 != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.minnum1 = parseFloat(this.minnum1);
                    }
                    if (this.num1 && this.minnum1 > this.num1) {
                        this.minnum1 = '';
                        this.$Notice.warning({ title: "最小交易量不能大于买入量" })
                        return false
                    }
                } else if (flag == 3) {
                    this.maxnum1 = this.maxnum1.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    this.maxnum1 = this.maxnum1.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    this.maxnum1 = this.maxnum1.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    this.maxnum1 = this.maxnum1.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                    if (this.maxnum1.indexOf(".") < 0 && this.maxnum1 != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        this.maxnum1 = parseFloat(this.maxnum1);
                    }

                }
            },
            enterMon(flag) {
                // if(flag==0){
                //     if(this.minnum > this.maxnum){
                //         this.maxnum='';
                //         this.$Notice.warning({ title:"最大交易量不能低于最小交易量"})
                //         return false
                //     }
                // }else{
                //     if(this.minnum1 > this.maxnum1){
                //         this.maxnum1='';
                //         this.$Notice.warning({ title:"最大交易量不能低于最小交易量"})
                //         return false
                //      }
                // }
            },
            regParams(type) { //正则判断
                
                let obj = {};
                let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                obj.flag = type;
                if (type == 0) {
                    obj.sellprice = this.sellprice;
                    obj.checkbox = this.type;
                    if (this.num1 == "") {
                        this.$Notice.warning({ title: this.$t('cc.c5') })
                        return false
                    } else {
                        if (numReg.test(this.num1)) {
                            obj.num = this.num1

                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.minnum1 == "") {
                        this.$Notice.warning({ title: this.$t('dd.b7') })
                        return false
                    } else {
                        if (numReg.test(this.minnum1)) {
                            obj.minnum = this.minnum1
                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.maxnum1 == "") {
                        this.$Notice.warning({ title: this.$t('dd.b8') })
                        return false
                    } else {
                        if (numReg.test(this.maxnum1)) {
                            obj.maxnum = this.maxnum1
                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.minnum1 > this.num1) {
                        this.$Notice.warning({ title: "最小交易量不能大于卖出量" })
                        return false
                    }
                    if (this.minnum1 > this.maxnum1) {
                        this.$Notice.warning({ title: "最大交易量不能低于最小交易量" })
                        return false
                    }
                } else if (type == 1) {
                    obj.buyprice = this.buyprice;
                    if (this.num == "") {
                        this.$Notice.warning({ title: this.$t('cc.c7') })
                        return false
                    } else {
                        if (numReg.test(this.num)) {
                            obj.num = this.num

                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.minnum == "") {
                        this.$Notice.warning({ title: this.$t('dd.b7') })
                        return false
                    } else {
                        if (numReg.test(this.minnum)) {
                            obj.minnum = this.minnum
                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.maxnum == "") {
                        this.$Notice.warning({ title: this.$t('dd.b8') })
                        return false
                    } else {
                        if (numReg.test(this.maxnum)) {
                            obj.maxnum = this.maxnum
                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                    if (this.minnum > this.num) {
                        this.$Notice.warning({ title: "最小交易量不能大于买入量" })
                        return false
                    }
                    if (this.minnum > this.maxnum) {
                        this.$Notice.warning({ title: "最大交易量不能低于最小交易量" })
                        return false
                    }

                }
                return obj
            },
            enterTraw(type) {      //弹出交易密码 判断买入卖出
                this.bustype = type;
                // let params;
                if (this.regParams(type)) {
                    this.params = this.regParams(type);
                    this.tranModal = true;
                } else {
                    return false
                }
            },
            Entrust(name) { //买入
                name = 'formRight1';
                this.params.transpwd = this.md5(this.formRight1.transpwd); // this.params.
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.twoCen.Entrust, this.params).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('cc.b9')
                                });
                                this.formRight1.transpwd = "";
                                this.mapUserBala();
                                if (this.bustype == 1) {
                                    this.maxnum = "";
                                    this.minnum = "";
                                    this.num = "";
                                    this.tranModal = false;
                                    this.buyOver = false;
                                    this.buyMon = 0;
                                } else {
                                    this.maxnum1 = "";
                                    this.minnum1 = "";
                                    this.num1 = "";
                                    this.tranModal = false;
                                    this.type = ["1"];
                                    this.sellOver = false;
                                    this.sellMon = 0;
                                }
                            } else if (res.status == 405) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('dd.b9')
                                });
                            } else if (res.status == 105) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({ title: "最大交易量不能低于最小交易量" })
                            } else if (res.status == 106) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({ title: "最小交易量不能大于买入量" })
                            } else if (res.status == 1061) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({ title: "最小交易量不能大于卖出量" })
                            } else if (res.status == 401) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 402) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 101) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                });
                            } else if (res.status == 102) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('cc.c2')
                                });
                            } else if (res.status == 103) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('cc.c3')
                                });
                            } else if (res.status == 104) {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('cc.c4')
                                });
                            } else {
                                this.formRight1.transpwd = "";
                                this.tranModal = false;
                                this.$Notice.warning({
                                    title: this.$t('cc.b10')
                                });
                            }
                        })
                    }
                })
                // this.buyOver = 0;
            },
            mapData(data) {
                let _this = this;
                this.showData = data.map((element, index) => {

                    let id = ''
                        , time = ''
                        , addtime = ''
                        , price = ''
                        , count = ''
                        , total = ''
                        , status = ''
                        , buyer = ''
                        , type = ''
                        , memo = ''
                        , transfer = ''
                        , abc = ''
                        , ordernum = ''
                        , method = []
                        , _disableExpand = false
                        , _expanded = false
                    if (element.transfer) {
                        transfer = (element.transfer).split(",")
                        for (let i = 0; i < transfer.length; i++) {
                            if (transfer[i] == "1") {
                                abc = this.$t('cc.a7')
                            } else if (transfer[i] == "2") {
                                abc += "  " + this.$t('cc.a5')
                            } else if (transfer[i] == "3") {
                                abc += "  " + this.$t('cc.a6')
                            }
                        }
                    }
                    addtime = new Date((Number(element.addtime) * 1000));
                    time = _this.formatDate(addtime);
                    id = element.ordernum;
                    buyer = element.xm;
                    price = element.price.delFixed(Number(2));
                    count = element.num.delFixed(Number(2));
                    total = element.total.delFixed(Number(2));
                    type = abc;
                    memo = element.remark;
                    method = element.method;
                    ordernum = element.id;
                    if (element.status == 0 && this.currentIndex == 0) {
                        status = this.$t('dd.c9');

                    } else if (element.status == 0 && this.currentIndex == 1) {
                        status = this.$t('dd.c6');
                    } else if (element.status == 1) {
                        status = this.$t('dd.c4');
                    } else if (element.status == 2 && this.currentIndex == 0) {
                        status = this.$t('dd.c10');
                    } else if (element.status == 3) {
                        status = this.$t('dd.c5');
                        _disableExpand = true;
                    }

                    return {
                        id,
                        time,
                        price,
                        count,
                        total,
                        status,
                        buyer,
                        total,
                        memo,
                        _disableExpand,
                        type,
                        method,
                        ordernum,
                        _expanded
                    }
                });
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
            sell() {
                this.sellOver = 0;
                // this.modal1 = true;
            },
            cancelGate(type) { //取消CNHA弹窗
                if (type == 0) {
                    this.cansupModel1 = true;
                } else {
                    this.cansupModel = true;
                }
            },
            cancelIt(type) {  //取消CNHA
                let params = {};
                let id;
                if (type == 0) {
                    id = this.userSell.id
                } else if (type == 1) {
                    id = this.userBuy.id
                }
                params = {
                    flag: type,
                    id: id
                }
                this.FetchPost(this.requestUrl.twoCen.Revoke, params).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b9')
                        });
                        if (type == 1) {
                            this.buyOver = true;
                            this.cansupModel = false;
                        } else {
                            this.sellOver = true;
                            this.cansupModel1 = false;
                        }

                        this.mapUserBala();
                    } else if (res.status == 401) {
                        this.$Notice.warning({
                            title: this.$t('dd.b10')
                        });
                        if (type == 1) {
                            this.cansupModel = false;
                        } else {
                            this.cansupModel1 = false;
                        }
                    } else {
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                        if (type == 1) {
                            this.cansupModel = false;
                        } else {
                            this.cansupModel1 = false;
                        }
                    }
                })
            }
        },
        created() {
            if (Object.keys(this.userBuy).length == 0) {
                this.buyOver = true;
            } else {
                this.buyOver = false;
            }
            if (Object.keys(this.userSell).length == 0) {
                this.sellOver = true;
            } else {
                this.sellOver = false;
            }
            if (this.busData) {
                this.total = Number(this.busData.count);
                this.mapData(this.busData.data);
            } else {
                this.showData = [];
            }
        },
        watch: {
            busData(newVal, oldVal) {  //监听买入卖出订单的变化

                if (this.busData) {
                    this.total = Number(this.busData.count);
                    this.mapData(this.busData.data);
                } else {
                    this.showData = [];
                }
            },
            //     tranModal(){
            //         if(this.tranModal){
            //             console.log(1)
            //             this.autofocus=true;
            //         }              
            //   }
        }
    }
</script>
<style lang="scss">
    @import './css/busSector.scss';
</style>