<template>
    <div class="I-agreement">
        <div class="nav" v-if="titlename">
            <span @click="goBack" style="cursor:pointer">{{$t(titlename)}}</span>
            <span>>{{name}}</span>
        </div>
        <div class="I-info">
            <div class="info">
                <h1 style="text-align:center;font-size:18px;">{{name}}</h1>
                <p style="text-align:center;font-size:14px;color:#999999;margin-top:15px;margin-bottom:20px;">{{addtime}}</p>
                <div v-html="conent" class="width:100%;height:100%;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {  
                name: "",
                conent: '',
                titlename: '',
                addtime: '',
            }
        },
        methods: {
            goBack() {
                let nameIndex = this.$route.query.name
                this.$router.push({
                    name:'problem',
                    params: {
                        id:nameIndex
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
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.documentElement.scrollTop = document.body.scrollTop = -200;
            let id
                ,isNew;
             //  index.action3 新闻  2是公告;
            this.id = this.$route.query.id
            isNew = Number( this.$route.query.name )            
            if(isNew == 0){
                this.titlename = 'index.action2'
            }else if(isNew == 1){
                this.titlename = 'index.action3'
            }else if( isNew == 2 ){
                this.titlename = 'index.action5'
            }
            this.FetchGet(this.requestUrl.Arts.artCon, { id: this.id,}).then(res => {
 
                this.conent = res.data.content;
                this.name = res.data.title;
                let addtime = new Date((Number(res.data.addtime) * 1000));
                this.addtime = this.formatDate(addtime);
               
            })
        },
        activated() {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.documentElement.scrollTop = document.body.scrollTop = -200;
             let id
                ,isNew;
             //  index.action3 新闻  2是公告;
            this.id = this.$route.query.id
           
            isNew = Number( this.$route.query.name)
            if(isNew == 0){
                this.titlename = 'index.action2'
            }else if(isNew == 1){
                this.titlename = 'index.action3'                
            }else if( isNew == 2 ){
                this.titlename = 'index.action5'
            }
            this.FetchGet(this.requestUrl.Arts.artCon, { id:this.id }).then(res => {
                this.conent = res.data.content;
                this.name = res.data.title;
                let addtime = new Date((Number(res.data.addtime) * 1000));
                this.addtime = this.formatDate(addtime);
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
        min-height: 650px;
        .nav {
            line-height: 44px;
            height: 44px;
            background: #ffffff;
            font-size: 14px;
            padding-left: 20px;
        }
        .I-info {
            width: 100%;
            /* height: 600px; */
            margin-top: 20px;
            background: #ffffff;
            min-height: 650px;
            .info {
                width: 95%;
                margin: 0 auto;
                padding: 20px 0;
                p {
                    background: #ffffff!important;
                    font-size: 14px;
                }
                span {
                    background: #ffffff!important;
                    font-size: 14px;
                }
            }
        }
    }
</style>