<template>
    <div class="v-tradModule">

        <Modal v-model="tradModalCon.con" width="600" :closable="false" class-name="tradModule">

            <div style="text-align:center">
                <div-table :columns="columns" :data="detailData"></div-table>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" style="width:130px;" size="large" @click='tradModalCon.con=false'>{{$t("fu.a10")}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import divTable from './jyTable.vue'

    export default {
        name: 'tradModule',
        components: {
            divTable
        },
        props: {
            //columns:Array,
            //data:Array
            tradModalCon: Object,
            btype:Number,
            areaIndex:Number,
        },
        data() {
            return {
                tradModalData: Object,
                columns: [
                    {
                        title: this.$t('de.a5'),
                        key: 'time'
                    },
                    {
                        title: this.$t('hh.c3'),
                        key: 'dealDone'
                    },
                    {
                        title: this.$t('re.a6') + '(CNHA)',
                        key: 'dealPrice'
                    },
                    {
                        title: this.$t('re.a7'),
                        key: 'fee'
                    },
                ],
                detailData: [],
            }
            
        },
        created() {
            // this.mapCurArr(this.tradModalData)  //当前点击的数据
 
            this.$eventBus.$on('GetDetail', function (data) {
                let sucprice = 0
                    , name = data.name
                    , fee = data.fee + "00"
                    , flag = data.flag;

                if ((flag == 0 && this.areaIndex==1)) {
                    name = 'ETF'
                } else  if((flag == 1 && this.areaIndex==1)){
                    name = data.name
                }else if((flag == 0 && this.areaIndex==0)){
                    name = 'CNHA'
                }else if((flag == 1 && this.areaIndex==0)){
                    name =data.name
                }else if((flag == 0 && this.areaIndex==2)){
                    name = 'ETH'
                }else if((flag == 1 && this.areaIndex==2)){
                    name =data.name
                }else if((flag == 0 && this.areaIndex==3)){
                    name = 'AIRDROP'
                }else if((flag == 1 && this.areaIndex==3)){
                    name =data.name
                }

                var _tmp = fee.match(/\.\d+0+/)[0].replace(/0+$/, '');
                if (_tmp == '.') {
                    _tmp = '.00'
                }
                fee = fee.replace(/\.\d+0+/, _tmp);
                if(flag==0){
                    if(Number(data.jFloal)){
                        fee = fee.toString().delFixed(data.jFloal)
                    }else{
                        fee =  parseInt(fee)
                    }
   
                }else{
                    fee = fee
                }
                if(Number(data.jFloal)){
                    sucprice = data.sucprice.toString().delFixed(data.jFloal)
                    }else{
                        sucprice =parseInt(data.sucprice)
                    }
              
                
                this.detailData = [
                    {
                        time: data.time,
                        dealDone: data.dealDone,
                        dealPrice: sucprice,
                        fee: fee + name,
                    }
                ]
            }.bind(this))
              if (this.areaIndex==1) {
                this.columns[2].title =this.$t('re.a6')+ '(ETF)';
            } else if(this.areaIndex==2){
                this.columns[2].title = this.$t('re.a6')+ '(ETH)'
            } else if(this.areaIndex==0){
                this.columns[2].title = this.$t('re.a6') + '(CNHA)'
            } else if(this.areaIndex==3){
                this.columns[2].title = this.$t('re.a6') + '(AIRDROP)'
            } 
             
       
        },
        methods: {
        },
        watch: {
            areaIndex(){
    
                if (this.areaIndex==1) {
                this.columns[2].title =this.$t('re.a6')+ '(ETF)';
            } else if(this.areaIndex==2){
                this.columns[2].title = this.$t('re.a6')+ '(ETH)'
            } else if(this.areaIndex==0){
                this.columns[2].title = this.$t('re.a6') + '(CNHA)'
            } else if(this.areaIndex==3){
                this.columns[2].title = this.$t('re.a6') + '(AIRDROP)'
            } 
             }
        },
        updated() {
        }
    }
</script>
<style lang="scss">
    .tradModule {
        .ivu-modal {
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: -154px;
        }
        .ivu-modal-content {
            height: 200px;
            border-radius: 3px;
        }
        .ivu-modal-body {
            padding: 0;
            padding-top: 20px;
            height: 130px;
        }
        .ivu-modal-footer {
            border-top: none;
        }
    }
</style>