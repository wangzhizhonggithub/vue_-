<template>
  <div class="v-divTable">
      <Table  :columns="columns" :data="data" stripe @on-expand="expand"></Table>
  </div>
</template>
<script>
export default {
  name:'divTable',
  props:{
     columns:Array,
     data:Array,
  },
  data(){
      return{

      }
  },
  created(){
      
  },
  mounted(){
      this.initStyle()
  },
  methods:{
    expand(row,status){
        for(let i=0;i<this.data.length;i++){
           if(this.data[i].id==row.id){
               this.data[i]._expanded=true;
               clearInterval(window.countdowns);
           }else{
               this.data[i]._expanded=false;
               clearInterval(window.countdowns);
           }
        }
    },
    initStyle(){
        if(this.data.length>0 && this.data[0].flag){
        for(let i=0;i<this.data.length;i++){
           if(i==0 && this.data[i].status==this.$t('dd.c6')  && this.data[i].flag!=this.$t('dd.c2')){
               this.data[i]._expanded=true;
           }else{
               this.data[i]._expanded=false;
           }
        }
        }

        var userAgent = navigator.userAgent
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 
        
        if(isSafari){
            var style1 = document.createElement('style');
            style1.innerHTML = '.v-divTable .ivu-table-wrapper .ivu-table th{font-size:12px};';
            
            document.head.appendChild(style1);
        }
      
      
    }
  }
}
</script>
<style lang="scss">
.v-divTable{

    td.ivu-table-expanded-cell{
        padding:20px 15px;
        background:#f8fcff!important;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table-wrapper{
        border: none;
        .ivu-table{
            th{
                line-height: 50px;
                font-size: 14px;
                text-align: center;
                
            }
           .ivu-table-cell{
               padding-right: 0;
               padding-left:0;
           }
            td{
                border: none;
                background: url('/static/img/dashed.png') repeat-x bottom;
                text-align: center;
            }
            
        }
        .ivu-table-tip{
            display: none;
        }

        .septh{
            width: 200px;
            color: #00aedd;
        }
    }
}
</style>
