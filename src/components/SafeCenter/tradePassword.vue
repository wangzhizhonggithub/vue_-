<template>
    <div class="p_conent">
        <div class="p_header">
            <h2 v-if="change">{{$t("trade.info8")}}</h2>
            <h2 v-if="change2">{{$t("trade.info8")}}</h2>
            <h2 v-if="change3">{{$t("trade.info10")}}</h2>
        </div>
        <div class="info" v-if="status">
            <p>
                <span style="margin-right:0.25rem;">{{$t("trade.info2")}}</span>
                <Button type="primary" @click="resetit" v-if="status1">{{$t("config.action10")}}</Button>
            </p>
        </div>
        <!-- 设置 -->
        <div class="first" v-if="change">
            <Form :model="formRight" label-position="right" :label-width="200" :rules="ruleValidate" ref="formValidate">
                <FormItem :label="$t('trade.info3')" prop="transpw">
                    <Input v-model="formRight.transpw" type="password" @on-blur="ifjy"></Input>
                </FormItem>
                <FormItem label="确认资金密码：" prop="rettranspw">
                    <Input v-model="formRight.rettranspw" type="password"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                    <Input v-model="formRight.code"></Input>
                    <span @click="flag && getcode('setTransPw')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show">{{count}} s</span>
                </FormItem>
                <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1">
                    <Input v-model="formRight.ecode"></Input>
                    <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show1">{{count1}} s</span>
                </FormItem>
                <FormItem :label="$t('trade.info11')" prop="onecode" v-if="chkAuth && gtype">
                    <Input v-model="formRight.onecode"></Input>
                </FormItem>
            </Form>
        </div>
        <div class="btn" v-if="change">
            <Button type="primary" size="large" @click="save('formValidate')">{{$t("login.info7")}}</Button>
        </div>
        <!-- 重置 -->
        <div class="first" v-if="change3">
            <Form :model="formRight2" label-position="right" :label-width="200" :rules="ruleValidate1" ref="formValidate1">
                <FormItem :label="$t('trade.info4')" prop="retranspw">
                    <Input v-model="formRight2.retranspw" type="password" @on-blur="ifjy"></Input>
                </FormItem>
                <FormItem :label="$t('trade.info7')" prop="transpw">
                    <Input v-model="formRight2.transpw" type="password"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                    <Input v-model="formRight2.code"></Input>
                    <span @click="flag && getcode('updateTransPw')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show" disabled>{{count}} s</span>
                </FormItem>
                <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1">
                    <Input v-model="formRight2.ecode"></Input>
                    <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show1" disabled>{{count1}} s</span>
                </FormItem>
                <FormItem :label="$t('trade.info11')" prop="onecode" v-if="chkAuth && gtype">
                    <Input v-model="formRight2.onecode"></Input>
                </FormItem>
            </Form>
        </div>
        <div class="btn" v-if="change3">
            <Button type="primary" size="large" @click="resetpwd('formValidate1')">{{$t("login.info7")}}</Button>

        </div>

    </div>
</template>
<script>
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {
                if (!Number.isInteger(+value)) {
                    callback(new Error(this.$t('input.a10')));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.test(/^[1][3,4,5,7,8][0-9]{9}$/)) {
                    callback(new Error(this.$t('input.a18')));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('input.a20')));
                } else if (value !== this.formRight2.retranspw) {
                    callback(new Error(this.$t('input.a22')));
                } else {
                    callback();
                }
            };
            const validateLength = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('input.a23')));
                } else if (value.length < 6 || value.length > 20) {
                    callback(new Error(this.$t('input.a24')));
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
                change: false,
                change1: false,
                change2: false,
                change3: false,
                show: true,
                show1: true,
                iftranspw: false,
                count: '',
                count1: '',
                timer1: null,
                show1: true,
                status: false,
                status1: false,
                flag: 1,
                language:'zh',
                error: 0,
                flag1: 1,
                error1: 0,
                timer: null,
                chkAuth: '',
                gtype: 0,
                see: false,
                see1: false,
                formRight: {
                    transpw: '',
                    rettranspw: '',
                    onecode: '',
                    ecode: '',
                    code: '',
                },
                formRight2: {
                    onecode: '',
                    ecode: '',
                    code: '',
                    retranspw: '',
                    transpw: '',
                },
                ruleValidate: {
                    transpw: [

                        { validator: validateTPwd, trigger: 'blur' },
                        // { validator: validateLength, trigger: 'blur' },
                        // { validator: validatePass, trigger: 'blur' },

                        // { validator: validateMobile, trigger: 'blur' }
                    ],
                    rettranspw: [

                        { validator: validatePassCheck, trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },

                    ],
                    onecode: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },

                    ]
                },
                ruleValidate1: {
                    transpw: [
                        { required: true, message: this.$t('input.a20'), trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur' },
                    ],
                    retranspw: [
                        { required: true, message: this.$t('input.a24'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' },
                        // { validator: validateLength, trigger: 'blur' },
                        //    { validator: validatePass, trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' },
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' },

                    ],
                    onecode: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' },

                    ]
                },
            }
        },
        methods: {
            changeit() {
                this.show = true;
                this.change1 = true;
                this.change = false;
                this.change2 = false;

            },
            ifjy() { //判断交易密码不能一之
                if(!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(this.formRight2.retranspw)){
                    return false;
                }else{
                    this.FetchPost(this.requestUrl.user.ispwd, { transpw:this.md5(this.formRight2.retranspw) }).then(res => {
                    if (res.status == 402) {
                        this.$Notice.warning({
                            title: this.$t('aaa.a14')
                        });
                        this.error = 1;
                    } else {
                        this.error = 0;
                        this.FetchPost(this.requestUrl.user.istranspw, { transpw:this.md5(this.formRight2.retranspw) }).then(res => {
                        if (res.status == 402) {
                            this.$Notice.warning({
                                title: this.$t('aaa.c7')
                            });
                            this.error1 = 1;
                        } else {
                            this.error1 = 0;
                        }
                    })
                    }
                })
                }
            },
            sendcode() {  //发送邮箱验证码
                this.flag1 = 0;
                this.FetchPost(this.requestUrl.user.UsersendEmail, { type: this.language == 'zh' ? 1 :4}).then(res => {
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
            resetit() {
                this.change1 = false;
                this.change2 = false;
                this.status1 = false;
                this.change3 = true;
            },
            save(name) {  //设置交易密码
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
                if (this.error == 0 && this.error1 == 0) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.FetchPost(this.requestUrl.user.UsersetTransPw, {
                                transpw: this.md5(this.formRight.transpw),
                                code: this.formRight.code,
                                onecode: this.formRight.onecode,
                                rettranspw: this.md5(this.formRight.rettranspw),
                                ecode: this.formRight.ecode,
                                gAuth: gAuth,
                                pcode: pcode,
                                emailcode: emailcode
                            }).then(res => {
                                if (res.status == 200) {
                                    this.$Notice.success({
                                        title: res.message
                                    });
                                    this.status = true;
                                    this.change = false;
                                    this.status1 = true;
                                    this.show = true;
                                    this.show1 = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    localStorage.setItem("iftranspw", 1)
                                } else {
                                    this.$Notice.warning({
                                        title: res.message || "操作失败"
                                    });
                                }
                            })
                        }
                    })
                } else if (this.error == 1) {
                    this.$Notice.warning({
                        title: "资金密码不能与登录密码一致！"
                    });
                } else if (this.error1 == 1) {
                    this.$Notice.warning({
                        title: "新的资金密码与旧的资金密码不能一致！"
                    });
                }


            },
            getcode(lyl) {  //发送验证码
                this.flag = 0;
                let timestrap = Date.parse(new Date());
                let codetype = 2;
                let sign = this.md5(timestrap + "LIANZHIJIA2018ETF");
                let params = {};
                params.tplid = 58097,
                params.timestrap = timestrap,
                params.codetype = codetype;
                params.sign = sign;
                params.lyl=lyl;
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
            resetpwd(name) {
                let pcode, emailcode,gAuth;
                if (this.formRight2.ecode) {
                    emailcode = 1;
                }
                if (this.formRight2.code) {
                    pcode = 1;
                }
                if (this.chkAuth && this.gtype) {
                    gAuth = 1
                } else {
                    gAuth = 0
                }
                if (this.error == 0 && this.error1 == 0) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.FetchPost(this.requestUrl.user.UserupdateTransPw, {
                                transpw: this.md5(this.formRight2.transpw),
                                code: this.formRight2.code,
                                onecode: this.formRight2.onecode,
                                retranspw: this.md5(this.formRight2.retranspw),
                                ecode: this.formRight2.ecode,
                                gAuth: gAuth,
                                pcode: pcode,
                                emailcode: emailcode
                            }).then(res => {
                                if (res.status == 200) {
                                    this.$Notice.success({
                                        title: this.$t('aaa.c8')
                                    });
                                    this.change2 = true;
                                    this.formRight2.transpw = "";
                                    this.formRight2.code = "";
                                    this.formRight2.onecode = "";
                                    this.formRight2.retranspw = "";
                                    this.formRight2.ecode = "";
                                    this.status1 = true;
                                    this.change3 = false;
                                    this.show = true;
                                    this.show1 = true;
                                } else if (res.status == 402) {
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c9')
                                    });
                                }
                                else if (res.status == 403) {
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c4')
                                    });
                                } else if (res.status == 405) {
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c2')
                                    });
                                } else if (res.status == 406) {
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c1')
                                    });
                                }else if (res.status == 409) {
                                    this.$Notice.warning({
                                        title: this.$t('ddd.a8')
                                    });
                                }
                            })
                        }
                    })
                } else if (this.error == 1) {
                    this.$Notice.warning({
                        title: this.$t('aaa.a14')
                    });
                } else if (this.error1 == 1) {
                    this.$Notice.warning({
                        title: this.$t('aaa.c7')
                    });
                }


            },
        },
        mounted() {
            this.language = localStorage.getItem("lan") || 'zh';
            this.FetchGet(this.requestUrl.user.Usertranspw, {}).then(res => {
                this.iftranspw = Number(res.data.transpw);
                this.gtype = Number(res.data.gtype); //1开启 0关闭
                this.ifgoole = Number(res.data.google);
                this.chkEmail = Number(localStorage.getItem("chkEmail"));//是否已经通过邮箱验证
                this.chkAuth = Number(localStorage.getItem("chkAuth"));//是否已经验证谷歌
                this.phone = Number(localStorage.getItem("ifchkMoble"));//是否已经手机验证
                if (this.chkEmail && this.phone) {
                    this.see = true;
                    this.see1 = false;
                } else if (this.chkEmail) {
                    this.see1 = true;
                } else if (this.phone) {
                    this.see = true;
                }
                if (this.ifgoole == 0) {
                    this.one = true;
                } else if (this.ifgoole) {
                    this.one = false;
                    this.two = true;
                }
                if (Number(this.iftranspw) == 0) {
                    this.change = true;
                } else if (Number(this.iftranspw) == 1) {
                    this.status = true;
                    this.status1 = true;
                    this.change = false;
                    this.change2 = true;

                } else if (Number(this.iftranspw) == 2) {
                    this.change3 = true;
                    this.change = false;
                    this.change1 = false;
                }
            })
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/phone.scss"
</style>