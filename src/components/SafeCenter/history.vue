<template>
    <div class="h_conent">
        <div class="h_header">
            <h2>{{$t("names.name9")}}</h2>
        </div>
        <div class="tabs">
            <p>
                <span>{{$t("fu.a14")}}</span>
                <span>{{$t("fu.a15")}}</span>
            </p>
            <ul class="uls">
                <li v-for="item in showData">
                    <span>{{item.logintime}}</span>
                    <span>{{item.loginip}}</span>
                </li>
            </ul>
        </div>
        <div class="more_btn" v-if="showData.length>0">
            <Button type="primary" size="large" style="margin-top:0.3rem;margin-bottom:0.3rem;" @click="more">{{$t("fu.a7")}}</Button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showData: [],
                getData: [],
                n: 1
            }
        },
        methods: {
            more() {  //加载更多数据
                this.n++;
                this.FetchGet(this.requestUrl.user.UseruserLoginLog, { page: this.n }).then(res => {
                    if (res.status == 200) {
                        let data1 = [];
                        let logintime, time;
                        res.data.data.forEach((element, index) => {
                            time = new Date((Number(element.logintime) * 1000));
                            logintime = this.formatDate(time)
                            this.getData.push({
                                id: element.id,
                                loginip: element.loginip,
                                userid: element.userid,
                                logintime: logintime
                            })
                        });
                        for (let i = 0; i < this.getData.length; i++) {
                            this.showData.push(this.getData[i])
                        }
                        this.getData = [];
                    } else {
                        this.getData = [];
                        this.$Notice.warning({
                            title:this.$t('aaa.e6')
                        })
                    }

                    // this.showData.push(this.getData)
                })
            },
            formatDate(date) {
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate()  < 10 ? '0' + (date.getDate()) : date.getDate())+'   ';
                var h = (date.getHours()  < 10 ? '0' + (date.getHours()) : date.getHours())+ ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds()  < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                return Y + M + D + h + m + s;
            }
        },
        mounted() {
            // alert(new Date().getTimezoneOffset()*60)
            // 
            this.FetchGet(this.requestUrl.user.UseruserLoginLog, {}).then(res => {
                let data = [];
                let data1 = [];
                let logintime, time;
                data = res.data.data;
                data.forEach((element, index) => {
                    time = new Date((Number(element.logintime) * 1000));
                    logintime = this.formatDate(time)
                    data1.push({
                        id: element.id,
                        loginip: element.loginip,
                        userid: element.userid,
                        logintime: logintime
                    })
                });
                this.showData = data1;
                // console.log(this.showData)
                // this.showData.push(this.getData)
            })
        }
    }

</script>
<style lang="scss">
    @import "../../assets/css/history.scss"
</style>