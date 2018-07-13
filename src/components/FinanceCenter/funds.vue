<template>
    <div class="f_conent">
        <div class="f_header">
            <h2>{{$t("fins.name4")}}</h2>
        </div>
        <div class="f-main">
            <ul class="topUl">
                <li v-for="(item,index) in listData" :class="index==currentIndex?'lis':''" @click="tabToggle(index,item.id)">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <p>{{$t("fu.a1")}}
                <span @click="addAddress">{{$t("fu.a2")}}</span>
            </p>
        </div>
        <div class="ac_th">
            <ul>
                <li>{{$t("de.a5")}}</li>
                <li>{{$t("fu.a3")}}</li>
                <li>{{$t("fu.a4")}}</li>
                <li>{{$t("account.a5")}}</li>
            </ul>
        </div>
        <div class="ac_td" v-if="showData.length!=0">
            <ul v-for="(item,index) in showData">
                <li>{{item.time}}</li>
                <li>
                    <qrcode :value="item.address" :options="{ size: 200 }" class="showimg" v-if="item.active"></qrcode>
                    <img src="/static/img/erweima.png" alt="" @mouseenter="showimg(index)" @mouseleave="hideimg(index)">
                    <span v-clipboard:copy="item.address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{item.address}}</span>
                </li>
                <li>
                    <span v-if="!item.edit">{{item.remarks}}</span>
                    <input type="text" v-if="item.edit" class="editInput" v-model="remark" v-focus ref="inputFou">
                    <img src="/static/img/xiugai1.png" alt="" @click="editShow(index,item.remarks)" v-if="!item.edit" >
                    <img src="/static/img/tijiao.png" alt="" @click="editHide(index,item.id)" v-if="item.edit">
                </li>
                <li @click="delit(item.id)" style="cursor:pointer;color:#00adee;">{{$t("fu.a6")}}</li>
            </ul>
        </div>
        <div class="yz" v-if="showData.length!=0">
            <Button type="primary" size="large" @click="loadMore">{{$t("fu.a7")}}</Button>
        </div>
        <div v-if="showData.length==0" class="unrecord">
            <img src="/static/img/unrecode.png" alt="">
            <p>{{$t("fu.a8")}}</p>
        </div>
        <Modal v-model="modal2" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("fu.a16")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("fu.a17")}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="sureDel" style="background-color: #00aedd;
                                border-color: #00aedd;">{{$t("fu.a6")}}</Button>
            </div>
        </Modal>
        <div class="mask" v-if="add_address">
        </div>
        <div class="alertModal1" v-if="add_address">
            <p>{{$t("fu.a2")}}
                <span @click="closeAddress">
                    <Icon type="ios-close-empty" style="cursor:pointer;"></Icon>
                </span>
            </p>
            <Form :model="formRight" label-position="right" :label-width="200" ref="formRight" :rules="ruleValidate">
                <FormItem :label="$t('fu.a13')" prop="address">
                    <Input v-model="formRight.address"></Input>
                </FormItem>

                <FormItem :label="$t('fu.a11')" prop="remark">
                    <Input v-model="formRight.remark"></Input>
                </FormItem>
                <FormItem :label="$t('email.info3')" prop="transpw">
                    <Input v-model="formRight.transpw" type="password"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                    <Input v-model="formRight.code"></Input>
                    <span @click="flag && getcode()" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show">{{count}} s</span>
                </FormItem>
                <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1">
                    <Input v-model="formRight.ecode"></Input>
                    <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show1">{{count1}} s</span>
                </FormItem>
                <FormItem :label="$t('w.a10')" prop="google" v-if="chkAuth && gtype">
                    <Input v-model="formRight.google"></Input>
                </FormItem>

            </Form>
            <div class="btn">
                <Button type="primary" size="large" @click="addit('formRight')">{{$t("fu.a12")}}</Button>
            </div>
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
            const validateAddress = (rule, value, callback) => {
                if (value.replace(/^[0-9a-zA-Z]*$/g, '')) {
                    callback(new Error(this.$t('input.b2')));
                } else {
                    if (value.length != this.addressLen) {
                        callback(new Error(this.$t('input.b8') + this.addressLen + this.$t('input.b9')));
                    }
                    callback();
                }
            };
            const validateMobile = (rule, value, callback) => {
                if (!Number.isInteger(+value)) {
                    callback(new Error(this.$t('input.a10')));
                } else {
                    callback();
                }
            };
            const validateLength = (rule, value, callback) => {
                if (value.length > 16) {
                    callback(new Error(this.$t('input.b6')));
                } else {
                    callback();
                }
            };
            const validateTPwd = (rule, value, callback) => {
                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
                };
            return {
                n: 1,
                imgShow: false,
                count: '',
                timer: null,
                show: true,
                count1: '',
                editIndex:-1,
                timer1: null,
                show1: true,
                flag: 1,
                flag1: 1,
                list: [],
                addressLen: 0,
                currentIndex: 0,
                modal_loading: false,
                remark: '',
                delAddress: false,
                delId: '',
                editId: '',
                see: false,
                see1: false,
                tabid: "1", //当前tab也
                add_address: false,
                showData: [],
                listData: [],
                gtype: 0,
                modal2: false,
                language:'zh',
                formRight: {
                    address: '',
                    remark: '',
                    transpw: '',
                    google: '',
                    code: '',
                    ecode: '',
                },
                ruleValidate: {
                    address: [
                        { required: true, message: this.$t('input.b1'), trigger: 'blur' },
                        { validator: validateAddress, trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: this.$t('input.b5'), trigger: 'blur' },
                        { validator: validateLength, trigger: 'blur' }
                    ],
                    transpw: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    google: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                }
            }
        },
        components: {
            'qrcode': VueQrcode
        },
        directives: {
                focus: {
                  // 指令的定义
                  inserted: function (el) {
                    el.focus()
                  }
                }
        },
        methods: {
            init() {
                this.FetchPost(this.requestUrl.FinanceCenter.addressList, { typeid: this.tabid }).then(res => {
                    if (res.status == 200) {
                        let data = [];
                        data = res.data.data;
                        for (let i = 0; i < data.length; i++) {
                            data[i].edit = false;
                            data[i].active = false;
                        }
                        this.showData = data.filter((item, index) => {
                            let addtime = new Date((Number(item.time) * 1000));
                            item.time = this.formatDate(addtime);
                            return true;
                        });

                    } else if (res.status == 401) {
                        this.showData = [];
                    }
                })
            },
            tabToggle(index, id) {  //切换tab
                this.n = 1;
                this.currentIndex = index;
                sessionStorage.setItem("currentIndex", index);
                this.tabid = id;
                this.addressLen = Number(this.listData[index].addresslen); //地址长度
                this.init();
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
            formatDate(date) {
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '   ';
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                return Y + M + D + h + m + s;
            },
            loadMore() {  //加载更多
                this.n = this.n + 1;
                this.FetchPost(this.requestUrl.FinanceCenter.addressList, { typeid: this.tabid, page: this.n }).then(res => {
                    // console.log(res)
                    if (res.status == 200) {
                        let data = [];
                        data = res.data.data;
                        data = data.filter((item, index) => {
                            let addtime = new Date((Number(item.time) * 1000));
                            item.time = this.formatDate(addtime);
                            return true;
                        });
                        for (let i = 0; i < data.length; i++) {
                            data[i].edit = false;
                            data[i].active = false;
                            this.showData.push(data[i]);
                        }
                        // this.page=Number(res.data.page_num);
                        // this.count=Number(res.data.count);
                    } else {
                        // this.showData = [];
                        this.n--;
                        sessionStorage.setItem("n", this.n);
                        this.$Notice.warning({
                            title: this.$t('aaa.e6')
                        });
                    }
                })
            },
            delit(id) {  //删除
                this.delId = id;
                this.modal2 = true;
                this.modal_loading = false;
            },
            sureDel() {  //确定删除
                this.FetchPost(this.requestUrl.FinanceCenter.delAddress, { id: this.delId }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.e7')
                        });
                        this.modal2 = false;
                        this.tabToggle(this.currentIndex, this.tabid);
                    } else {
                        
                        this.$Notice.warning({
                            title: this.$t('aaa.e8')
                        });
                    }
                })
            },
            cancel() {  //取消删除
                this.delAddress = false;
            },
            addAddress() {  //添加地址
                this.add_address = true;
            },
            closeAddress() {  //关闭地址
                this.add_address = false;
                this.timer = null;
                this.time = null;
                this.show = true;
                this.show1 = true;
                this.formRight.remark = "";
                this.formRight.address = "";
                this.formRight.code = "";
                this.formRight.ecode = "";
                this.formRight.transpw = "";
                this.formRight.google = "";
            },
            showimg(idx) {  //二维码的显示隐藏
                let data = [];
                data = this.showData;
                for (let i = 0; i < data.length; i++) {
                    data[idx].active = true;
                }
            },
            hideimg(idx) {  //赢藏二维码
                let data = [];
                data = this.showData;
                for (let i = 0; i < data.length; i++) {
                    data[idx].active = false;
                }
            },
            editShow(idx,re) { //输入框
                // this.$refs.inputFou.focus();
                this.remark="";
                this.editIndex=idx;
                let data = [];
                data = this.showData;
                for (let i = 0; i < data.length; i++) {
                    if(this.editIndex==i){
                        data[i].edit = true;

                        this.remark=re;
                        // this.$refs.InputFou.focus()
                    }else{
                        data[i].edit = false;
                    }
                        
                }
            },
            editHide(idx, id) {  //编辑输入框
                this.editId = id;
                var len = 0;
                for (var i = 0; i < this.remark.length; i++) {
                    var a = this.remark.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 2;
                    }
                    else {
                        len += 1;
                    }
                }
                // console.log(len)
                if (len <= 16) {
                    this.FetchPost(this.requestUrl.FinanceCenter.editAddress, { id: this.editId, remarks: this.remark }).then(res => {
                        if (res.status == 200) {
                            let data = [];
                            data = this.showData;
                            for (let i = 0; i < data.length; i++) {
                                data[idx].edit = false;
                            }
                            this.tabToggle(this.currentIndex, this.tabid);
                            this.remark = "";
                        } else {
                            this.$Notice.warning({
                                title: this.$t('aaa.c6')
                            });
                            this.tabToggle(this.currentIndex, this.tabid);
                            this.remark = "";
                        }
                    })
                } else if (len == 0) {
                    this.$Notice.warning({
                        title: this.$t('input.b5'),
                    });
                } else {
                    this.$Notice.warning({
                        title: this.$t('input.b6'),
                    });
                }

            },
            addit(name) {  //添加地址
                let pcode, emailcode, gAuth;
                if (this.formRight.ecode) {
                    emailcode = 1;
                }
                if (this.formRight.code) {
                    pcode = 1;
                }
                if (this.chkAuth && this.gtype) {
                    gAuth = 1
                } else {
                    gAuth = 0
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.FinanceCenter.addAddress, {
                            typeid: this.tabid,
                            address: this.formRight.address,
                            remarks: this.formRight.remark,
                            transpw: this.md5(this.formRight.transpw),
                            code: this.formRight.code,
                            google: this.formRight.google,
                            ecode: this.formRight.ecode,
                            gAuth: gAuth,
                            pcode: pcode,
                            emailcode: emailcode
                        }).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.e3')
                                });
                                this.add_address = false;
                                this.timer = null;
                                this.time = null;
                                this.show = true;
                                this.show1 = true;
                                this.formRight.remark = "";
                                this.formRight.address = "";
                                this.formRight.code = "";
                                this.formRight.ecode = "";
                                this.formRight.transpw = "";
                                this.formRight.google = "";
                                this.tabToggle(this.currentIndex, this.tabid);
                            } else if (res.status == 402) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.e4')
                                });
                            } else if (res.status == 403) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if (res.status == 405) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            } else if (res.status == 406) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            } else if (res.status == 407) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 408) {
                                this.$Notice.warning({
                                    title: this.$t('input.b5')
                                });
                            } else if (res.status == 202) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.e5')
                                });
                            }
                        })
                    }
                })

            },
            getcode() {  //发送验证码
                this.flag = 0;
                let timestrap = Date.parse(new Date());
                let codetype = 2;
                let sign = this.md5(timestrap + "LIANZHIJIA2018ETF");
                let params = {};
                params.tplid = 58097,
                params.timestrap = timestrap,
                params.codetype = codetype;
                params.sign = sign;
                params.lyl="addressAdd";
                this.FetchPost(this.requestUrl.user.Usersetcode, params).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.b9')
                        });
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    this.flag = 1;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag = 1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
            sendcode() {  //发送邮箱验证码
                this.flag1 = 0;
                this.FetchPost(this.requestUrl.user.UsersendEmail, {type: this.language == 'zh' ? 1 :4}).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.b9')
                        });
                        const TIME_COUNT = 60;
                        if (!this.timer1) {
                            this.count1 = TIME_COUNT;
                            this.show1 = false;
                            this.timer1 = setInterval(() => {
                                if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
                                    this.count1--;
                                } else {
                                    this.show1 = true;
                                    this.flag1 = 1;
                                    clearInterval(this.timer1);
                                    this.timer1 = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag1 = 1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
        },
        components: {
            'qrcode': VueQrcode
        },
        created() {
            //数据展示
            this.language = localStorage.getItem("lan") || 'zh';
            this.currentIndex = sessionStorage.getItem("currentIndex") || 0;
            this.n = sessionStorage.getItem("n") || 1;
            this.phone = Number(localStorage.getItem("ifchkMoble"));//是否已经手机验证
            this.chkEmail = Number(localStorage.getItem("chkEmail"));//是否已经通过邮箱验证
            this.iftranspw = Number(localStorage.getItem("iftranspw"));//是否已经验证交易密码
            this.chkAuth = Number(localStorage.getItem("chkAuth"));//是否已经验证谷歌

            if (this.chkEmail && this.phone) {
                this.see = true;
                this.see1 = false;
            } else if (this.chkEmail) {
                this.see1 = true;
            } else if (this.phone) {
                this.see = true;
            }
            this.FetchPost(this.requestUrl.FinanceCenter.log, {}).then(res => {
                if (res.status == 200) {
                    let data = [];
                    data = res.data;
                    this.listData = data.data;
                    this.gtype = Number(data.gtype);
                    this.tabid = this.listData[this.currentIndex].id;
                    this.addressLen = Number(this.listData[this.currentIndex].addresslen); //地址长度
                    // console.log(this.addressLen)
                    this.init();
                }
            })
            // this.FetchGet(this.requestUrl.user.Usermoble, {}).then(res => {
            //     this.ifmoble = Number(res.data.moble);
            //     this.phone = res.data.moble;
            //     if (this.ifmoble == 0) {
            //         this.three = true;
            //     } else if (this.ifmoble) {
            //         this.three = false;
            //         this.one = true;
            //     }
            // })
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/funds.scss"
</style>