<template>
    <div class="setZspsd">
        <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
            :clickEffect="true" clickMode="push">
        </vue-particles>
        <div class="set">
            <h3>{{$t("l.b1")}}</h3>
            <p>{{$t("l.b2")}}</p>
            <form action="">
                <p class="pbox">
                    <i class="icon2"></i>
                    <input type="password" :placeholder="$t('l.b3')" @blur="checknum" v-model="pwdVal">
                </p>  
                <p class="pbox">
                    <i class="icon2"></i>
                    <input type="password" :placeholder="$t('l.b4')" v-model="rePwdVal">
                </p>
                <button type="button" @click="setNow">{{$t("config.action2")}}</button>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pwdVal: '',
                rePwdVal: '',
                error: 0,
            }
        },
        methods: {
            regParams() {
                let pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
                , pwdVal = this.pwdVal
                , rePwdVal = this.rePwdVal
                , Obj = {}
                if (pwdReg.test(pwdVal)) {
                    Obj.transpw = this.md5(pwdVal);
                } else {
                    this.$Notice.warning({ title: this.$t('input.a21') })
                    return false
                }
                if (rePwdVal == pwdVal) {
                    Obj.rettranspw = this.md5(rePwdVal)
                } else {
                    this.$Notice.warning({ title: this.$t('input.a22') })
                    return false
                }
                return Obj

            },
            checknum() {
                    let params;
                    let pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
                        , pwdVal = this.pwdVal
                        , Obj = {}
                    if (pwdReg.test(pwdVal)) {
                        Obj.transpw = this.md5(pwdVal);
                        params = Obj;

                        this.FetchPost(this.requestUrl.user.ispwd, params)
                            .then(res => {
                                if (res.status === 402) {
                                    this.$Notice.warning({ title: this.$t('aaa.a14') })
                                    this.isBtn = false
                                } else {
                                    this.isBtn = true
                                }
                            })
                    } else {

                    }
            },
            setNow() {

                let params;
                if (this.regParams()) {
                    params = this.regParams();
                } else {
                    return false
                }

                if (!this.isBtn) {

                    return false
                }
                if (this.error == 0) {
                    this.FetchPost(this.requestUrl.Arts.transpwd, params)
                        .then(res => {
                            if (res.status === 200) {
                                localStorage.setItem("res", JSON.stringify(res))
                                this.$Notice.success({ title: this.$t('aaa.a15') })
                                localStorage.setItem("iftranspw", 1)
                                this.$router.push("/index")

                            } else {
                                this.$Notice.warning({ title: this.$t('aaa.a16') })
                            }
                        })
                } else {
                    this.$Notice.warning({ title: this.$t('aaa.a14') })
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            var local = localStorage.getItem("iflogin");
                if (local == null) {
                    next({path:'/login'})
                }else{
                    next();
                }
        },
    }
</script>
<style lang="scss">
    .setZspsd {
        width: 100%;
        height: 100%;
        position: relative;
        min-width: 1200px;
        #particles-js {
            width: 100%;
            height: 660px;
            overflow: hidden;
            background: #f3f3f3;
        }
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
        .set {
            width: 26%;
            height: 3.42rem;
            background: #ffffff;
            overflow: auto;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            h3 {
                color: #555555;
                margin-top: 0.31rem;
                margin-bottom: 0.2rem;
                font-size: 16px;
                text-align: center;
            }
            p {
                color: #999999;
                text-align: center;
                font-size: 14px;
                margin-bottom: 0.2rem;
            }
        }
        form {
            width: 72%;
            margin: 0 auto;
            .pbox {
                width: 100%;
                position: relative;
                height: .5rem;
                margin-top: .12rem;
                span {
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    top: .03rem;
                    border-left: 1px solid #e5e5e5;
                    width: 0.92rem;
                    height: .44rem;
                    text-align: center;
                    line-height: .44rem;
                    cursor: pointer;
                }
            }
            input[type=text],
            input[type=password] {

                width: 100%;
                height: .5rem;
                background: #ffffff;
                border: 1px solid #dfdfdf;
                border-radius: 3px;
                color: #4d4d4d;
                ;
                font-size: 14px;
                padding-left: .4rem;
                line-height: .5rem;
            }
            input::-webkit-input-placeholder {
                color: #999999;
            }
            i {
                width: .4rem;
                height: 0.5rem;
                position: absolute;
                left: 0;
                top: 0;
                line-height: .5rem;
            }

            .icon2 {
                background: url(/static/img/login1.png) no-repeat center center;
            }
            button {
                background: #00aedd;
                color: #ffffff;
                width: 100%;
                height: 0.5rem;
                border-radius: 3px;
                cursor: pointer;
                margin-bottom: 0.1rem;
                font-size: 14px;
            }
            button:hover {
                background: #09baea;
            }
        }
    }
</style>