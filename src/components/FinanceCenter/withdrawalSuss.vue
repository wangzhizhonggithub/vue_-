<template>
    <div class="emailBox">
            <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
            :clickEffect="true" clickMode="push">
          </vue-particles>
            <div class="set">
                 <h3>{{$t("e.t1")}}</h3>
                 <p><Icon type="checkmark-circled" size="23"></Icon><span style="margin-left:5px">{{$t("e.t3")}}</span></p>
                 <p><span style="color:red">{{count}}</span>{{$t("e.a3")}}<span style="color:#00aedd;cursor:pointer" @click="gologin">{{$t("e.a4")}}</span></p>
            </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                count: '',
                timer: null,
            }
        },
        methods: {
            gologin(){
                this.$router.push("/financial/withdraw")
            },
            getcode(){
                const TIME_COUNT = 5;
                if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                    this.gologin();
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
        }
        },
        created () {
            // let times=60,
            this.getcode();
        }
    }
</script>
<style lang="scss">
    .emailBox{
        width: 100%;
        height: 100%;
        position: relative;
        min-width: 1200px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .set{
            width:26%;
            height:2rem;
            background: #ffffff;
            overflow: auto;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            h3{
                font-size:16px;
                color: #555555;
                text-align:center;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            p{
                margin-bottom: 10px;
                text-align: center;
                color: #555555;
                font-size: 14px;
                i{
                    color:#4baf4f;
                }
            }
        }
    }
</style>