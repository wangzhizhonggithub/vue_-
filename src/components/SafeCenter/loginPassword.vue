<template>
    <div class="p_conent">
        <div class="p_header">
            <h2>{{$t("login.info1")}}</h2>
        </div>
        <div class="info">
            <p>{{$t("login.info2")}}
            </p>
        </div>
        <div class="first">
            <Form :model="formRight" label-position="right" :label-width="200" :rules="ruleValidate" ref="formValidate">
                <FormItem :label="$t('login.info4')" prop="oldpassword">
                    <Input v-model="formRight.oldpassword"  type="password"></Input>
                </FormItem>
                <FormItem :label="$t('login.info5')" prop="repassword">
                    <Input v-model="formRight.repassword"  type="password"></Input>
                </FormItem>
                <FormItem :label="$t('login.info6')" prop="password">
                    <Input v-model="formRight.password" type="password"></Input>
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
            </Form>
        </div>
        <div class="btn">
            <Button type="primary" size="large" @click="save('formValidate')">{{$t("login.info7")}}</Button>
            <!-- <Button type="ghost" size="large">{{$t("authen.msg2")}}</Button> -->
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
                    callback(new Error(this.$t('input.a17')));
                } else {
                    callback();
                }
            };
           const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('input.a16')));
                } else {
                    if (this.formRight.password !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('input.a16')));
                } else if (value !== this.formRight.repassword) {
                    callback(new Error(this.$t('input.a22')));
                } else {
                    callback();
                }
            };
            const validateLength = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('input.a16')));
                } else if (value.length<6 || value.length>20) {
                    callback(new Error(this.$t('input.a19')));
                } else {
                    callback();
                }
            };
            return {
                phone: '',
                chkEmail: '',
                iflogin: false,
                count: '',
                timer: null,
                count1: '',
                timer1: null,
                show1: true,
                show: true,
                flag:1,
                flag1:1,
                see:false,
                see1:false,
                language:'zh',
                formRight: {
                    oldpassword: '',
                    code: '',
                    ecode: '',
                    repassword: '',
                    password:'',
                },
                ruleValidate: {
                    oldpassword: [
                        { required: true, message: this.$t('input.a16'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' },
                        // { validator: validateLength, trigger: 'blur' },
                    ],
                    repassword: [
                        { required: true, message: this.$t('input.a18'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' },
                        // { validator: validateLength, trigger: 'blur' },
                        // { validator: validatePass, trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: this.$t('input.a20'), trigger: 'blur' }, 
                        { validator: validatePassCheck, trigger: 'blur' },
                        // { validator: validateMobile, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            save(name) {  //修改登录密码
                let pcode,emailcode;
                if(this.formRight.ecode){
                    emailcode=1;
                }
                if(this.formRight.code){
                    pcode=1;
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.Userupdatepwd, {
                            oldpassword: this.md5(this.formRight.oldpassword),
                            repassword: this.md5(this.formRight.repassword),
                            password: this.md5(this.formRight.password),
                            code:this.formRight.code,
                            ecode:this.formRight.ecode,
                            pcode:pcode,
                            emailcode:emailcode
                        }).then(res => {
                            // console.log(res)
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.d10')
                                });
                                this.formRight.oldpassword="";
                                this.formRight.repassword="";
                                this.formRight.password="";
                                this.formRight.code="";
                                this.formRight.ecode="";
                                this.show=true;
                                this.show1=true;
                            } else if(res.status==402){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d11')
                                });
                            } else if(res.status==403){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if(res.status==405){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            } else if(res.status==406){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d12')
                                });
                            }else if(res.status==407){
                                this.$Notice.warning({
                                    title: this.$t('input.a22')
                                });
                            }else if(res.status==409){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d13')
                                });
                            }else if(res.status==104){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d14')
                                });
                            }
                        })
                    } else {
                        this.show=true;
                        this.show1=true;
                    }
                })
            

            },
            getcode() {  //发送验证码
                this.flag=0;
                let timestrap=Date.parse(new Date());
                let codetype=2;
                let sign=this.md5(timestrap+"LIANZHIJIA2018ETF");
                let params = {};
                    params.tplid = 58097,
                    params.timestrap=timestrap,
                    params.codetype=codetype;
                    params.sign=sign;
                    params.lyl="updatepwd";
                this.FetchPost(this.requestUrl.user.Usersetcode,params).then(res => {
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
                                    this.flag=1;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag=1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
            sendcode() {  //发送邮箱验证码
                this.flag1=0;
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
                                    this.flag1=1;
                                    clearInterval(this.timer1);
                                    this.timer1 = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag1=1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
        },
        mounted() {
            this.language = localStorage.getItem("lan") || 'zh';
            this.chkEmail = Number(localStorage.getItem("chkEmail"));//是否已经通过邮箱验证
            this.phone = Number(localStorage.getItem("ifchkMoble"));//是否已经手机验证
            if(this.chkEmail && this.phone){
                this.see=true;
                this.see1=false;
            }else if(this.chkEmail){
                this.see1=true;
            }else if(this.phone){
                this.see=true;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/phone.scss"
</style>