<template>
    <div class="I-agreement">
        <div class="nav"> {{$t("index.action6")}}</div>
        <div class="I-info">
            <div v-html="conent" class="info">
               
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        metaInfo(){
            return{
                title:this.title,
            }
        },
        data() {
            return {
                name:this.$t("index.action6"),
                conent:'',
                title:this.$t("seo.a10")
            }
        },
        mounted () {
            let lan=localStorage.getItem("lan") || "zh";
            let type;
            if(lan=='zh'){
                type=0;
            }else{
                type=1;
            }
            this.FetchGet(this.requestUrl.Arts.agreetment, {title:this.name,type:type}).then(res => {
                this.conent=res.data[0].content;
         })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.COM.jumpScroll()
            })
        },
    }
</script>
<style lang="scss">
    .I-agreement {
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        min-height: 500px;
        .nav {
            line-height: 44px;
            height: 44px;
            background: #ffffff;
            font-size: 14px;
            padding-left: 20px;
            font-weight: 600;
        }
        .I-info {
            width: 100%;
            /* height: 600px; */
            margin-top: 20px;
            background: #ffffff;
            .info{
                width: 95%;
                margin:0 auto;
                padding:20px 0;
                p{
                    background: #ffffff!important;
                }
                span{
                    background: #ffffff!important;
                }
            }
        }
    }
</style>