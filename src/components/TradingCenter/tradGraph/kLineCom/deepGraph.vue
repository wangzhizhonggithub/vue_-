<template>
    <div class="v-graph">
		<div id="deep" class="deep" ref="deep">

		</div>
    </div>
</template>
<script>
// import API from '@/api/index.js'
let echarts = require('echarts');
// require('echarts/lib/chart/bar');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
export default {
  name:'deepGraph',
	props:{
		depth:Object
	},
    data(){
        return{
			deep:{},
        }
	},
	created(){
		//this.init()
		
	},
    mounted(){
		let _this = this
		// 	,dom = this.$refs.deep
		// 	,domWidth
		// 	,domHeight;
		// // dom.style.width ='300%';
		// // domWidth = dom.offsetWidth
		// // dom.style.height = '150%'
		// // domHeight =  dom.offsetHeight ;
		// dom.style.width  = '490px';
		// dom.style.height = '300px';
		this.drawDeep(this.depth)
	},
	methods:{
		init(){
			
			this.getDepth()
		},
		drawDeep(deepData){
		
			this.deep = echarts.init(document.getElementById('deep'))
			var date = [];
			var data = []
			//价格从低到高
			//Y 1-0-1 累加量 中间向2侧累加
			var currDate = [];
			var asksCountArr = [];
			var bidsCountArr = [];
			var asksCurr = 0;
			var bidsCurr = 0;
			deepData.asks.forEach(element => {
				date.push(element[0]) //x
				asksCountArr.push(Number(element[1]))
			});
			asksCountArr.reverse()
			asksCountArr.forEach(element => {
				asksCurr = asksCurr + element
				currDate.push(Number(asksCurr).toFixed(2))
			})
			currDate.reverse()
			//相加完成还得反转
			
			deepData.bids.forEach(element => {
				date.push(element[0]) //x 
				bidsCountArr.push(Number(element[1]))
			});
			bidsCountArr.forEach(element => {
				bidsCurr = bidsCurr + element
				currDate.push(Number(bidsCurr).toFixed(2))
			})
			// console.log(currDate)
			var middleNum = Math.ceil(currDate.length/2)  
			// console.log(middleNum)
			var currDate1 = currDate.slice(0,middleNum+1) 
			var currDate2 = []
			for(var n = 0 ; n <middleNum ; n ++){
				currDate2.push('-')
			}
			currDate2 = currDate2.concat(currDate.slice(middleNum))
			date.reverse()
			var option = {
				tooltip: {
					trigger: 'axis',
					
				},
				// title: {
				// 	left: 'center',
				// 	text: '大数据量面积图',
				// },
				// toolbox: {
				// 	feature: {
				// 		dataZoom: {
				// 			yAxisIndex: 'none',
				// 			xAxisIndex: 'none'
				// 		},
				// 		restore: {},
				// 		saveAsImage: {}
				// 	}
				// },
				xAxis: {
					show:false,
					splitLine:{
				　　　　 show:true,
						interval:3
				　　},
					axisLine: {
						show: true
					}, 
					axisLabel:{
						// rotate:45
					},
					axisTick:{
						show:true 
					},
					type: 'category',
					boundaryGap: false,
					data: date
				},
				yAxis: {
					show:false,
					axisLabel:{						
						//rotate:45
					},
					axisTick:{
						show:false 
					},
					yxisLine: {
						show: true

					}, 
					type: 'value',
					boundaryGap:false,
					splitLine:{
				　　　　 show:true,
						interval:3
				　　}
				},
				dataZoom: [{
					type: 'inside',
				}],
				series: [
					{
						name:'委托',
						type:'line',
						smooth:true,
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							normal: {
								color: 'rgb(252, 108 , 108)'
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgb(252, 108 , 108)'
								}, {
									offset: 1,
									color: 'rgb(252, 108 ,108)'
								}])
							}
						},
						data: currDate1
					},
					{
						name:'委托',
						type:'line',
						smooth:true,
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							normal: {
								color: 'rgb(102, 192, 105)'
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgb(102, 192, 105)'
								}, {
									offset: 1,
									color: 'rgb(102, 192, 105)'
								}])
							}
						},
						data: currDate2
					},
				]
			};
			this.deep.setOption(option)

		}
	}
}
</script>
<style lang="scss" >
	.v-graph{
		width: 45%;
		height: 100%;
		float: left;
		position: relative;
		.deep{
			width: 450px;
			height: 300px;
			position: absolute;
			left: -135px;
			top: 57px;
			transform: rotate(90deg);
			div:nth-child(1){
				z-index: 1;
			}
		}
		
	}
</style>
