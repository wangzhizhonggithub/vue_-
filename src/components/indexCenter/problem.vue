<template>
    <div class="v-problem">
        <div class="nav">
            <ul>
                <li v-for="(item,index) in navArr" :key="index" :class="currIndex==index?'active':''" @click="seleActive(index)">{{$t(item)}}</li>
            </ul>
        </div>
        <div class="content">
            <div class="info">
                <p v-for="item in data" @click="goDetail(item.id)"> {{item.title}}
                    <span style="float:right">{{item.addtime}}</span>
                </p>
            </div>
        </div>
        <div class="page">
            <Page :total="page" size="small" :current="current" :page-size="10" @on-change="changePage"></Page>
        </div>

    </div>
    </div>
</template>
<script>
    export default {
        name: 'problem',
        props: {
            type: Number
        },
        metaInfo() {
            return {
                title: this.title,
            }
        },
        data() {
            return {
                navArr: [
                    "index.action2",
                    "index.action3",
                    "index.action5",
                ],
                currIndex: 0,
                data: [],
                page: 1,
                current: 1,
                title: this.$t("seo.a9"),
                itype: 0,
            }
        },
        methods: {
            seleActive(index) {

                this.currIndex = index
                sessionStorage.setItem('currIndex', index)
                this.current = 1;
                this.page = 1;
                if (this.currIndex == 0) {
                    this.title = this.$t("seo.a11")
                } else if (this.currIndex == 1) {
                    this.title = this.$t("seo.a12")
                } else if (this.currIndex == 2) {
                    this.title = this.$t("seo.a9")
                }
                this.FetchGet(this.requestUrl.Arts.list, { tb: this.currIndex, type: this.itype }).then(res => {
                    if (res.status == 200) {
                        this.data = res.data[this.currIndex].data.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            return true;
                        });
                        this.page = Number(res.data.count);
                    } else {
                        this.data = [];
                    }

                })
            },
            changePage() {
                sessionStorage.setItem("current", this.current);
                this.FetchGet(this.requestUrl.Arts.list, { tb: this.currIndex, page: this.current, type: this.itype }).then(res => {
                    if (res.status = 200) {
                        this.data = res.data[this.currIndex].data.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            return true;
                        });
                        this.page = Number(res.data[this.currIndex].count);
                    } else {
                        this.current--;
                        sessionStorage.setItem("current", this.current);

                    }

                })
            },
            goDetail(id) {
                let name = this.currIndex
                this.$router.push({
                    name: "Gdetail",
                    query: { id, name }
                })
            },
            changeLo() {
                if (localStorage.getItem("lan")) {
                    this.$i18n.locale = localStorage.getItem("lan");
                } else {
                    this.$i18n.locale = 'zh';
                }
                if (this.$i18n.locale == 'zh') {
                    this.itype = 0;
                } else {
                    this.itype = 1;
                }
                this.currIndex = sessionStorage.getItem("currIndex") || 0;
                this.current = Number(sessionStorage.getItem("current")) || 1;
                if (this.currIndex == 0) {
                    this.title = this.$t("seo.a11")
                } else if (this.currIndex == 1) {
                    this.title = this.$t("seo.a12")
                } else if (this.currIndex == 2) {
                    this.title = this.$t("seo.a9")
                }

                this.FetchGet(this.requestUrl.Arts.list, { tb: this.currIndex, type: this.itype, page: this.current }).then(res => {
                    if (res.status == 200) {
                        this.data = res.data[this.currIndex].data.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            return true;
                        });
                    } else {
                        this.data = [];
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
            }
        },
        created() {

            if (this.$route.params.id) {
                sessionStorage.setItem('currIndex', this.$route.params.id)
            } else {
                if (!sessionStorage.getItem('currIndex')) {
                    sessionStorage.setItem('currIndex', 0)
                }
            }
            this.changeLo();
        },
        watch: {
            type: function () {
                this.changeLo();
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // var query = to.querys
                // vm.btype = query.id
                var osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = -200;
                // var osTop = document.documentElement.scrollTop    //用于FF
                //         || window.pageYOffset
                //         || document.body.scrollTop  
                //         || 0;
                //         // osTop=osTop;
                //
            })
        },

    }
</script>
<style lang="scss">
    .v-problem {
        // width: 100%;
        // height: inherit;
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        min-height: 650px;
        .nav {
            line-height: 44px;
            height: 44px;
            background: #f3f3f3;
            font-size: 14px;
            font-weight: 600;
            ul {
                width: 100%;
                height: 99%;
                li {
                    float: left;
                    width: 160px;
                    height: 100%;
                    text-align: center;
                    background: #e7e7e7;
                    margin-right: 10px;
                    cursor: pointer;
                    &.active {
                        background: #ffffff
                    }
                }
            }
        }
        .content {
            width: 100%;
            height: 100%;
            background: #ffffff;
            min-height: 650px;
            .info {
                width: 100%;
                padding: 0 30px;
                p {
                    height: 70px;
                    line-height: 70px;
                    color: #555555;
                    font-size: 14px;
                    border-bottom: 1px solid #dedede;
                    cursor: pointer;
                }
            }
        }
        .ivu-page {
            width: 100%;
            height: 100%;
            background: #ffffff;
            padding: 15px 0 30px 0;
            text-align: center;
        }

    }

    .ivu-page-item-active {
        background-color: #00adee;
    }

    .ivu-page-item:hover a {
        color: #00aedd;
    }
</style>