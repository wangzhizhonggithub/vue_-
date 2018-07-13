<template>
    <div class="p_conent">
        <div class="p_header">
            <h2>{{$t("names.name4")}}</h2>
        </div>
        <div class="info" v-if="one">
            <p>
                <span style="margin-right:0.25rem;">{{$t("email.info1")}} {{phone || email}}</span>
            </p>
        </div>
        <!-- 绑定邮箱 -->
        <div v-if="one">
            <div class="first">
                <Form :model="formRight" label-position="right" :label-width="200" :rules="ruleValidate" ref="formRight">
                    <FormItem :label="$t('email.info2')" prop="email">
                        <Input v-model="formRight.email"></Input>
                    </FormItem>
                    <FormItem :label="$t('email.info3')" prop="tran">
                        <Input v-model="formRight.tran" type="password"></Input>
                    </FormItem>
                    <FormItem :label="$t('email.info4')" prop="ecode">
                        <Input v-model="formRight.ecode"></Input>
                        <span @click="flag1 && ifEmail()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show1">{{count1}} s</span>
                    </FormItem>
                    <FormItem :label="$t('email.info5')" prop="mcode">
                        <Input v-model="formRight.mcode"></Input>
                        <span @click="flag && getcode()" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show">{{count}} s</span>
                    </FormItem>
                </Form>
            </div>
            <div class="btn">
                <Button type="primary" size="large" @click="bindit('formRight')">{{$t("authen.msg1")}}</Button>
                <span @click="gotrade" style="color:#00adee;font-size:14px;cursor:pointer;">{{$t("authen.msg4")}}</span>
                <!-- <Button type="ghost" size="large" >{{$t("authen.msg4")}}</Button> -->
            </div>
        </div>
        <div class="info" v-if="two">
            <p>
                <span style="margin-right:0.25rem;">{{$t("email.info6")}}{{email}}
                </span>
            </p>
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
            const validateTPwd = (rule, value, callback) => {
                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
            };
            return {
                one: false,
                two: false,
                language: 'zh',
                three: false,
                show: true,
                show1: true,
                chkAuth: '',
                account: '',//账户
                count: '',
                count1: '',
                email: "",
                flag: 1,
                flag1: 1,
                timer: null,
                timer1: null,
                formRight: {
                    email: '',
                    tran: '',
                    ecode: '',
                    mcode: '',
                },
                ruleValidate: {
                    email: [
                        { required: true, message: this.$t('input.a13'), trigger: 'blur' },
                        { type: 'email', message: this.$t('input.a15'), trigger: 'blur' }
                    ],
                    tran: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }

                    ],
                    mcode: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],

                }

            }
        },
        methods: {
            bindit(name) {  //绑定
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UserchkEmail, { email: this.formRight.email, transpw: this.md5(this.formRight.tran), code: this.formRight.mcode, ecode: this.formRight.ecode }).then(res => {
                            if (res.status == 200) {
                                // this.$Notice.success({
                                //     title: res.message
                                // });
                                this.one = false;
                                this.two = true;
                                this.email = res.data.email;
                                this.show = true;
                                this.show1 = true;
                                localStorage.setItem("chkEmail", 1);
                            } else if (res.status == 402) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c10')
                                });
                            } else if (res.status == 403) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if (res.status == 405) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 406) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            } else if (res.status == 408) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.d1')
                                });
                            }
                        })
                    }
                })

            },
            ifEmail() {
                let params;
                let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                params = {
                    email: this.formRight.email
                }
                if (emailReg.test(this.formRight.email)) {
                    this.FetchPost(this.requestUrl.login.chkemail, params).then(res => {
                        if (res.status == 200) {
                            this.sendcode();
                        } else if (res.status == 104) {
                            this.$Notice.warning({
                                title: this.$t('ddd.a6')
                            })
                            return false;
                        } else if (res.status == 401) {
                            this.$Notice.warning({
                                title: this.$t('input.a15')
                            })
                            return false;
                        }
                    })
                } else {
                    this.$Notice.warning({
                        title: this.$t('input.a15')
                    })
                }
            },
            sendcode() {  //发送邮箱验证码
                this.flag1 = 0;
                this.FetchPost(this.requestUrl.user.UsersendEmail, { email: this.formRight.email, type: this.language == 'zh' ? 1 : 4 }).then(res => {
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
            getcode() {  //发送短信验证码
                this.flag = 0;
                let timestrap = Date.parse(new Date());
                let codetype = 2;
                let sign = this.md5(timestrap + "LIANZHIJIA2018ETF");
                let params = {};
                params.tplid = 58097,
                    params.timestrap = timestrap,
                    params.codetype = codetype;
                params.sign = sign;
                params.lyl = "chkEmail";
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
            cancel() {
                this.changes = false;
            },
            changes() {
                this.one = false;
                this.three = true;

            },
            changess() {
                this.three = false;
            },
            gotrade() {
                this.$router.push("/security/tradePassword");
            },
        },
        mounted() {
            this.language = localStorage.getItem("lan") || 'zh';
            this.chkAuth = Number(localStorage.getItem("chkAuth"));//是否已经验证谷歌  
            this.FetchGet(this.requestUrl.user.Useremail, {}).then(res => {
                this.account = res.data.id;
                this.email = res.data.email;
                this.phone = res.data.moble;
                //    this.phone=res.data.moble;
                if (this.email == 0) {
                    this.one = true;
                } else if (this.email.length > 0) {
                    this.two = true;
                }
            })
            // this.iftranspw=Number(localStorage.getItem("iftranspw"));
            // if(this.iftranspw!=0){
            //     this.transpw=true;
            // }else{
            //     this.transpw=false;
            // }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/phone.scss"
</style>