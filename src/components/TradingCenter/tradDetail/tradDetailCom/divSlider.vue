<template>
  <div class="slider" @mousedown ='openSlider()'>
        <Slider :disabled='this.dataObj.disabled' v-model="buySlider" @change='stepChange()' @input="currStep()"  show-tip='never'></Slider>
        <div class="pre">{{this.dataObj.buyPre}}</div>
        <div class="warpStep">
        <div  v-for='(item,index) in stepArr' :style="{left:item.pre}"  :class="[ item.active,'clireStep']" @click="jumpStep(item.num,index)" ></div>
        
        </div>
</div>
</template>
<script>
export default {
  name:'divSlider',
  props:{
    dataObj:Object,
    sliderCallback:Function
  },
  data(){
      return{
        stepArr:[],
        buySlider:0,
        buyPre:'0.00%',
      }
  },
  updated(){
  },
  created(){
    
      this.buySlider = this.dataObj.buySlider;
  
      this.stepArr = this.dataObj.stepArr;
  },
  methods:{
    openSlider(){
      this.dataObj.conSliderCall = true
    },
    stepChange(){
      //没用 进度是自己加的
    },
    updateSlider(){
      this.buySlider = this.dataObj.buySlider
    },
    jumpStep(num,l){
      if(this.dataObj.disabled){
        return false
      }
      this.buySlider = num;
      this.initBtnClass();
      for (let index = 0; index <= l; index++) {
        let stepNum = this.stepArr[index].num
        if(this.buySlider > stepNum+3){
          this.stepArr[index].active = 'active'
        }else if(this.buySlider = stepNum){
          this.stepArr[index].active = 'curr'
        }
      }
    },
    initBtnClass(){
      for (let i = 0; i < this.stepArr.length; i++) {
        this.stepArr[i].active = ''
      } 
    },
    currStep(){
      
    }
  },
  watch:{
   
    buySlider(newVal,oldVal){
      //百分比计算
      //百分比的值由父组件控制 ！！！
     //通过变量控制 是跳还是划  跳 划 通过时间 input 与 change 顺序控制
     // change 必须 点击 后改用 slider 的 mouseDown 开启滑块控制
     // 希望你可以找到比我更好的办法 致敬下一位
      if(this.dataObj.conSliderCall){
       //是否是input控制 slider回调
        if(this.dataObj.way=='market'){
          //市价
          if(this.dataObj.type == 'left'){
            this.sliderCallback('mbuy',this.buySlider)
          }else{
            this.sliderCallback('msell',this.buySlider)            
          }
        }else{
          //limit 限价
          if(this.dataObj.type=='left'){
            this.sliderCallback('buy',this.buySlider)
          }else{
            this.sliderCallback('sell',this.buySlider)
          }
        }
        
      }
      if(newVal == 0){
        this.initBtnClass();
      }
      if(newVal <= 20 || newVal>20){
        let arr = this.stepArr
            ,l = arr.length;
         for (let n = 0; n < l; n++) {
            let stepNum = arr[n].num
            // +-3之外在恢复颜色
            if( (stepNum-1) < newVal && newVal <( stepNum+1) ){
              arr[n].active = 'curr'
            }else if(newVal > (stepNum+1) ){
              arr[n].active = 'active'
            }else if(newVal < (stepNum-1) ){
              arr[n].active = ''
            }
            
         }
      }
      if( newVal == 100){
        this.stepArr[this.stepArr.length-1].active='curr'
      }
     
    }
  }
}
</script>

<style lang="scss">
.slider{
      position: relative;
      margin-left: .1rem;
      .warpStep{
        width: 80%;
        position: absolute;
        top: 0;
        left: 0;
        .clireStep{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: -4px;
          top: -2px;
          background: #ededed;
          position: absolute;
          cursor: pointer;
          &.active{
            background: red;
          }
          &.curr{
            background: #ffffff;
          }
        }
        
      }
      
      .pre{
        position: absolute;
        right: 0;
        top: -9px;
        color: rgba(157,172,184,0.7); 
      }

    }
    .ivu-slider{
      .ivu-input-number{
        width: 42px;
        border:none;
       
      }
      .ivu-input-number:focus{
        box-shadow: none;
      }
      .ivu-input-number-handler-wrap{
        display: none;
        box-shadow:none;
      }
      .ivu-slider-wrap{
        height: 2px;
        width: 80%;
        .ivu-slider-bar{
          background: red;
        }
      }
      .ivu-slider-button  {
        margin-top: -2px;
        width: 15px;
        height: 15px;
        border-color: #ededed;
        &:hover{
          border-color:red;
          -webkit-transform: none;
          transform: none;
        }
        &:active{
          border: 2px solid red;
        }
        &.isRang{
          border-color: red;
        }
      }
    }
</style>
