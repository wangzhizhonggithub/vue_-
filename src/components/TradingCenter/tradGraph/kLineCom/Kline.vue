<template>
	<div class="v-kline" style="width:100%;height:100%;">

		<div id="Kline" style="width:100%;height:80%;">

		</div>
	</div>
</template>
<script>
import {FloatCal} from '../../../../lib/floatCal'
let floatCal = new FloatCal()
let echarts = require('echarts');
// require('echarts/lib/chart/bar');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
export default {
  name:'kLine',
    data(){
        return{
			kline: {},
			deep:{},
			deepData:''
        }
	},
	created(){
		//this.init()
	},
    mounted(){
		let _this = this;
		
		this.drawKline()
	},
	methods:{
		init(){
			
		
        },
        getKline(){
           this.kline01 = '[[1517293740000,10999.99,11050.0,10971.02,11050.0,1.6932],[1517293800000,10994.05,11049.99,10994.05,11049.99,0.0080],[1517293860000,11003.94,11040.0,10995.49,11005.06,0.2500],[1517293920000,11003.33,11038.74,11000.0,11035.0,0.3343],[1517293980000,11001.52,11044.14,11000.02,11034.45,2.0828]]'
        },
        mapKline(){

        },
        calMacd(){

        },
		drawKline(){
			this.kline = echarts.init(document.getElementById('Kline'));
//数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
//['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09] 
var data = splitData([
    ['2015-10-16', 18.4, 18.58, 18.33, 18.79, 67.00, 1, 0.04, 0.11, 0.09],
    ['2015-10-19', 18.56, 18.25, 18.19, 18.56, 55.00, 0, -0.00, 0.08, 0.09],
    ['2015-10-20', 18.3, 18.22, 18.05, 18.41, 37.00, 0, 0.01, 0.09, 0.09],
    ['2015-10-21', 18.18, 18.69, 18.02, 18.98, 89.00, 0, 0.03, 0.10, 0.08],
    ['2015-10-22', 18.42, 18.29, 18.22, 18.48, 43.00, 0, -0.06, 0.05, 0.08],
    ['2015-10-23', 18.26, 18.19, 18.08, 18.36, 46.00, 0, -0.10, 0.03, 0.09],
    ['2015-10-26', 18.33, 18.07, 17.98, 18.35, 65.00, 0, -0.15, 0.03, 0.10],
    ['2015-10-27', 18.08, 18.04, 17.88, 18.13, 37.00, 0, -0.19, 0.03, 0.12],
    ['2015-10-28', 17.96, 17.86, 17.82, 17.99, 35.00, 0, -0.24, 0.03, 0.15],
    ['2015-10-29', 17.85, 17.81, 17.8, 17.93, 27.00, 0, -0.24, 0.06, 0.18],
    ['2015-10-30', 17.79, 17.93, 17.78, 18.08, 43.00, 0, -0.22, 0.11, 0.22],
    ['2015-11-02', 17.78, 17.83, 17.78, 18.04, 27.00, 0, -0.20, 0.15, 0.25],
    ['2015-11-03', 17.84, 17.9, 17.84, 18.06, 34.00, 0, -0.12, 0.22, 0.28],
    ['2015-11-04', 17.97, 18.36, 17.85, 18.39, 62.00, 0, -0.00, 0.30, 0.30],
    ['2015-11-05', 18.3, 18.57, 18.18, 19.08, 177.00, 0, 0.07, 0.33, 0.30],
    ['2015-11-06', 18.53, 18.68, 18.3, 18.71, 95.00, 0, 0.12, 0.35, 0.29],
    ['2015-11-09', 18.75, 19.08, 18.75, 19.98, 202.00, 1, 0.16, 0.35, 0.27],
    ['2015-11-10', 18.85, 18.64, 18.56, 18.99, 85.00, 0, 0.09, 0.29, 0.25],
    ['2015-11-11', 18.64, 18.44, 18.31, 18.64, 50.00, 0, 0.06, 0.27, 0.23],
    ['2015-11-12', 18.55, 18.27, 18.17, 18.57, 43.00, 0, 0.05, 0.25, 0.23],
    ['2015-11-13', 18.13, 18.14, 18.09, 18.34, 35.00, 0, 0.05, 0.24, 0.22],
    ['2015-11-16', 18.01, 18.1, 17.93, 18.17, 34.00, 0, 0.07, 0.25, 0.21],
    ['2015-11-17', 18.2, 18.14, 18.08, 18.45, 58.00, 0, 0.11, 0.25, 0.20],
    ['2015-11-18', 18.23, 18.16, 18.0, 18.45, 47.00, 0, 0.13, 0.25, 0.19],
    ['2015-11-19', 18.08, 18.2, 18.05, 18.25, 32.00, 0, 0.15, 0.24, 0.17],
    ['2015-11-20', 18.15, 18.15, 18.11, 18.29, 36.00, 0, 0.13, 0.21, 0.15],
    ['2015-11-23', 18.16, 18.19, 18.12, 18.34, 47.00, 0, 0.11, 0.18, 0.13],
    ['2015-11-24', 18.23, 17.88, 17.7, 18.23, 62.00, 0, 0.03, 0.13, 0.11],
    ['2015-11-25', 17.85, 17.73, 17.56, 17.85, 66.00, 0, -0.03, 0.09, 0.11],
    ['2015-11-26', 17.79, 17.53, 17.5, 17.92, 63.00, 0, -0.10, 0.06, 0.11],
    ['2015-11-27', 17.51, 17.04, 16.9, 17.51, 67.00, 0, -0.16, 0.05, 0.13],
    ['2015-11-30', 17.07, 17.2, 16.98, 17.32, 55.00, 0, -0.12, 0.09, 0.15],
    ['2015-12-01', 17.28, 17.11, 16.91, 17.28, 39.00, 0, -0.09, 0.12, 0.16],
    ['2015-12-02', 17.13, 17.91, 17.05, 17.99, 102.00, 0, -0.01, 0.17, 0.18],
    ['2015-12-03', 17.8, 17.78, 17.61, 17.98, 71.00, 0, -0.09, 0.14, 0.18],
    ['2015-12-04', 17.6, 17.25, 17.13, 17.69, 51.00, 0, -0.18, 0.10, 0.19],
    ['2015-12-07', 17.2, 17.39, 17.15, 17.45, 43.00, 0, -0.19, 0.12, 0.22],
    ['2015-12-08', 17.3, 17.42, 17.18, 17.62, 45.00, 0, -0.23, 0.13, 0.24],
    ['2015-12-09', 17.33, 17.39, 17.32, 17.59, 44.00, 0, -0.29, 0.13, 0.28],
    ['2015-12-10', 17.39, 17.26, 17.21, 17.65, 44.00, 0, -0.37, 0.13, 0.32],
    ['2015-12-11', 17.23, 16.92, 16.66, 17.26, 114.00, 1, -0.44, 0.15, 0.37],
    ['2015-12-14', 16.75, 17.06, 16.5, 17.09, 94.00, 0, -0.44, 0.21, 0.44],
    ['2015-12-15', 17.03, 17.03, 16.9, 17.06, 46.00, 0, -0.44, 0.28, 0.50],
    ['2015-12-16', 17.08, 16.96, 16.87, 17.09, 30.00, 0, -0.40, 0.36, 0.56],
    ['2015-12-17', 17.0, 17.1, 16.95, 17.12, 50.00, 0, -0.30, 0.47, 0.62],
    ['2015-12-18', 17.09, 17.52, 17.04, 18.06, 156.00, 0, -0.14, 0.59, 0.66],
    ['2015-12-21', 17.43, 18.23, 17.35, 18.45, 152.00, 1, 0.02, 0.69, 0.68],
    ['2015-12-22', 18.14, 18.27, 18.06, 18.32, 94.00, 0, 0.08, 0.72, 0.68],
    ['2015-12-23', 18.28, 18.19, 18.17, 18.71, 108.00, 0, 0.13, 0.73, 0.67],
    ['2015-12-24', 18.18, 18.14, 18.01, 18.31, 37.00, 0, 0.19, 0.74, 0.65],
    ['2015-12-25', 18.22, 18.33, 18.2, 18.36, 48.00, 0, 0.26, 0.75, 0.62],
    ['2015-12-28', 18.35, 17.84, 17.8, 18.39, 48.00, 0, 0.27, 0.72, 0.59],
    ['2015-12-29', 17.83, 17.94, 17.71, 17.97, 36.00, 0, 0.36, 0.73, 0.55],
    ['2015-12-30', 17.9, 18.26, 17.55, 18.3, 71.00, 1, 0.43, 0.71, 0.50],
    ['2015-12-31', 18.12, 17.99, 17.91, 18.33, 72.00, 0, 0.40, 0.63, 0.43],
    ['2016-01-04', 17.91, 17.28, 17.16, 17.95, 37.00, 1, 0.34, 0.55, 0.38],
    ['2016-01-05', 17.17, 17.23, 17.0, 17.55, 51.00, 0, 0.37, 0.51, 0.33],
    ['2016-01-06', 17.2, 17.31, 17.06, 17.33, 31.00, 0, 0.37, 0.46, 0.28],
    ['2016-01-07', 17.15, 16.67, 16.51, 17.15, 19.00, 0, 0.30, 0.37, 0.22],
    ['2016-01-08', 16.8, 16.81, 16.61, 17.06, 60.00, 0, 0.29, 0.32, 0.18],
    ['2016-01-11', 16.68, 16.04, 16.0, 16.68, 65.00, 0, 0.20, 0.24, 0.14],
    ['2016-01-12', 16.03, 15.98, 15.88, 16.25, 46.00, 0, 0.20, 0.21, 0.11],
    ['2016-01-13', 16.21, 15.87, 15.78, 16.21, 57.00, 0, 0.20, 0.18, 0.08],
    ['2016-01-14', 15.55, 15.89, 15.52, 15.96, 42.00, 0, 0.20, 0.16, 0.05],
    ['2016-01-15', 15.87, 15.48, 15.45, 15.92, 34.00, 1, 0.17, 0.11, 0.02],
    ['2016-01-18', 15.39, 15.42, 15.36, 15.7, 26.00, 0, 0.21, 0.10, -0.00],
    ['2016-01-19', 15.58, 15.71, 15.35, 15.77, 38.00, 0, 0.25, 0.09, -0.03],
    ['2016-01-20', 15.56, 15.52, 15.24, 15.68, 38.00, 0, 0.23, 0.05, -0.07],
    ['2016-01-21', 15.41, 15.3, 15.28, 15.68, 35.00, 0, 0.21, 0.00, -0.10],
    ['2016-01-22', 15.48, 15.28, 15.13, 15.49, 30.00, 0, 0.21, -0.02, -0.13],
    ['2016-01-25', 15.29, 15.48, 15.2, 15.49, 21.00, 0, 0.20, -0.06, -0.16],
    ['2016-01-26', 15.33, 14.86, 14.78, 15.39, 30.00, 0, 0.12, -0.13, -0.19],
    ['2016-01-27', 14.96, 15.0, 14.84, 15.22, 51.00, 0, 0.13, -0.14, -0.20],
    ['2016-01-28', 14.96, 14.72, 14.62, 15.06, 25.00, 0, 0.10, -0.17, -0.22],
    ['2016-01-29', 14.75, 14.99, 14.62, 15.08, 36.00, 0, 0.13, -0.17, -0.24],
    ['2016-02-01', 14.98, 14.72, 14.48, 15.18, 27.00, 0, 0.10, -0.21, -0.26],
    ['2016-02-02', 14.65, 14.85, 14.65, 14.95, 18.00, 0, 0.11, -0.21, -0.27],
    ['2016-02-03', 14.72, 14.67, 14.55, 14.8, 23.00, 0, 0.10, -0.24, -0.29],
    ['2016-02-04', 14.79, 14.88, 14.69, 14.93, 22.00, 0, 0.13, -0.24, -0.30],
    ['2016-02-05', 14.9, 14.86, 14.78, 14.93, 16.00, 0, 0.12, -0.26, -0.32],
    ['2016-02-15', 14.5, 14.66, 14.47, 14.82, 19.00, 0, 0.11, -0.28, -0.34],
    ['2016-02-16', 14.77, 14.94, 14.72, 15.05, 26.00, 0, 0.14, -0.28, -0.35],
    ['2016-02-17', 14.95, 15.03, 14.88, 15.07, 38.00, 0, 0.12, -0.31, -0.37],
    ['2016-02-18', 14.95, 14.9, 14.87, 15.06, 28.00, 0, 0.07, -0.35, -0.39],
    ['2016-02-19', 14.9, 14.75, 14.68, 14.94, 22.00, 0, 0.03, -0.38, -0.40],
    ['2016-02-22', 14.88, 15.01, 14.79, 15.11, 38.00, 1, 0.01, -0.40, -0.40],
    ['2016-02-23', 15.01, 14.83, 14.72, 15.01, 24.00, 0, -0.09, -0.45, -0.40],
    ['2016-02-24', 14.75, 14.81, 14.67, 14.87, 21.00, 0, -0.17, -0.48, -0.39],
    ['2016-02-25', 14.81, 14.25, 14.21, 14.81, 51.00, 1, -0.27, -0.50, -0.37],
    ['2016-02-26', 14.35, 14.45, 14.28, 14.57, 28.00, 0, -0.26, -0.46, -0.33],
    ['2016-02-29', 14.43, 14.56, 14.04, 14.6, 48.00, 0, -0.25, -0.41, -0.29],
    ['2016-03-01', 14.56, 14.65, 14.36, 14.78, 32.00, 0, -0.21, -0.36, -0.25],
    ['2016-03-02', 14.79, 14.96, 14.72, 14.97, 60.00, 0, -0.13, -0.29, -0.22],
    ['2016-03-03', 14.95, 15.15, 14.91, 15.19, 53.00, 1, -0.05, -0.23, -0.21],
    ['2016-03-04', 15.14, 15.97, 15.02, 16.02, 164.00, 1, 0.06, -0.17, -0.20],
    ['2016-03-07', 15.9, 15.78, 15.65, 16.0, 41.00, 0, 0.04, -0.19, -0.21],
    ['2016-03-08', 15.78, 15.96, 15.21, 15.99, 45.00, 0, 0.05, -0.19, -0.21],
    ['2016-03-09', 15.73, 16.05, 15.41, 16.08, 74.00, 0, 0.03, -0.20, -0.22],
    ['2016-03-10', 15.82, 15.66, 15.65, 15.98, 19.00, 0, -0.02, -0.23, -0.22],
    ['2016-03-11', 15.59, 15.76, 15.42, 15.78, 32.00, 0, 0.01, -0.22, -0.22],
    ['2016-03-14', 15.78, 15.72, 15.65, 16.04, 31.00, 0, 0.03, -0.20, -0.22],
    ['2016-03-15', 15.81, 15.86, 15.6, 15.99, 35.00, 0, 0.10, -0.18, -0.23],
    ['2016-03-16', 15.88, 16.42, 15.79, 16.45, 123.00, 0, 0.17, -0.16, -0.24],
    ['2016-03-17', 16.39, 16.23, 16.11, 16.4, 46.00, 0, 0.14, -0.20, -0.26],
    ['2016-03-18', 16.39, 16.17, 16.04, 16.4, 59.00, 0, 0.13, -0.22, -0.28],
    ['2016-03-21', 16.21, 16.22, 16.11, 16.44, 50.00, 0, 0.12, -0.24, -0.30],
    ['2016-03-22', 16.27, 16.19, 16.16, 16.42, 33.00, 0, 0.10, -0.27, -0.32],
    ['2016-03-23', 16.26, 16.18, 16.18, 16.29, 19.00, 0, 0.08, -0.30, -0.33],
    ['2016-03-24', 16.18, 16.11, 16.01, 16.23, 23.00, 0, 0.04, -0.33, -0.35],
    ['2016-03-25', 16.12, 16.13, 16.1, 16.2, 15.00, 0, 0.00, -0.35, -0.35],
    ['2016-03-28', 16.15, 15.85, 15.81, 16.2, 22.00, 0, -0.06, -0.38, -0.35],
    ['2016-03-29', 15.9, 15.79, 15.76, 16.05, 19.00, 0, -0.06, -0.37, -0.34],
    ['2016-03-30', 15.79, 16.24, 15.78, 16.3, 29.00, 0, -0.03, -0.35, -0.33],
    ['2016-03-31', 16.3, 16.09, 16.02, 16.35, 25.00, 0, -0.07, -0.37, -0.33],
    ['2016-04-01', 16.18, 16.27, 15.98, 16.3, 38.00, 0, -0.08, -0.36, -0.32],
    ['2016-04-05', 16.13, 16.34, 16.07, 16.37, 39.00, 0, -0.13, -0.37, -0.31],
    ['2016-04-06', 16.21, 16.26, 16.19, 16.35, 30.00, 0, -0.20, -0.39, -0.29],
    ['2016-04-07', 16.32, 16.1, 16.05, 16.35, 29.00, 1, -0.26, -0.39, -0.26],
    ['2016-04-08', 16.0, 16.16, 15.98, 16.21, 22.00, 0, -0.28, -0.37, -0.23],
    ['2016-04-11', 16.16, 16.31, 16.15, 16.57, 31.00, 0, -0.30, -0.33, -0.19],
    ['2016-04-12', 16.41, 16.29, 16.12, 16.41, 17.00, 0, -0.31, -0.30, -0.14],
    ['2016-04-13', 16.39, 16.48, 16.0, 16.68, 40.00, 0, -0.30, -0.25, -0.10],
    ['2016-04-14', 16.5, 16.46, 16.37, 16.68, 22.00, 0, -0.27, -0.19, -0.06],
    ['2016-04-15', 16.56, 16.93, 16.46, 17.04, 58.00, 0, -0.20, -0.12, -0.02],
    ['2016-04-18', 16.76, 17.06, 16.72, 17.27, 50.00, 0, -0.16, -0.07, 0.01],
    ['2016-04-19', 17.21, 17.11, 17.02, 17.23, 30.00, 0, -0.12, -0.02, 0.03],
    ['2016-04-20', 17.11, 17.33, 16.8, 17.36, 78.00, 0, -0.04, 0.03, 0.05],
    ['2016-04-21', 17.27, 17.69, 17.17, 17.93, 79.00, 0, 0.05, 0.08, 0.06],
    ['2016-04-22', 17.6, 17.87, 17.56, 18.02, 55.00, 0, 0.09, 0.10, 0.05],
    ['2016-04-25', 17.75, 17.9, 17.41, 17.96, 39.00, 1, 0.11, 0.09, 0.04],
    ['2016-04-26', 17.81, 17.91, 17.6, 17.95, 39.00, 0, 0.12, 0.08, 0.02],
    ['2016-04-27', 17.9, 17.88, 17.81, 17.95, 25.00, 0, 0.12, 0.06, 0.00],
    ['2016-04-28', 17.93, 17.88, 17.67, 17.93, 28.00, 0, 0.11, 0.04, -0.01],
    ['2016-04-29', 17.87, 17.75, 17.73, 17.92, 19.00, 0, 0.08, 0.01, -0.03],
    ['2016-05-03', 17.79, 17.7, 17.56, 17.85, 35.00, 0, 0.05, -0.01, -0.04],
    ['2016-05-04', 17.7, 17.65, 17.59, 17.71, 24.00, 0, 0.02, -0.04, -0.05],
    ['2016-05-05', 17.65, 17.62, 17.46, 17.7, 20.00, 0, -0.03, -0.06, -0.05],
    ['2016-05-06', 17.62, 17.32, 17.3, 17.65, 29.00, 0, -0.10, -0.09, -0.05],
    ['2016-05-09', 17.33, 17.3, 17.21, 17.45, 23.00, 0, -0.13, -0.10, -0.03],
    ['2016-05-10', 17.11, 17.04, 16.98, 17.41, 28.00, 0, -0.15, -0.09, -0.01],
    ['2016-05-11', 17.06, 17.15, 17.06, 17.32, 20.00, 0, -0.12, -0.05, 0.01],
    ['2016-05-12', 17.02, 17.46, 17.02, 17.58, 26.00, 0, -0.07, -0.01, 0.03],
    ['2016-05-13', 17.41, 17.57, 17.34, 17.62, 23.00, 0, -0.06, 0.01, 0.03],
    ['2016-05-16', 17.55, 17.5, 17.48, 17.64, 37.00, 0, -0.06, 0.01, 0.04],
    ['2016-05-17', 17.49, 17.48, 17.39, 17.53, 13.00, 0, -0.03, 0.03, 0.05],
    ['2016-05-18', 17.41, 17.82, 17.39, 17.87, 46.00, 0, 0.01, 0.06, 0.06],
    ['2016-05-19', 17.74, 17.81, 17.67, 17.86, 17.00, 0, -0.01, 0.05, 0.05],
    ['2016-05-20', 17.76, 17.88, 17.7, 17.93, 14.00, 0, -0.03, 0.04, 0.06],
    ['2016-05-23', 17.88, 17.52, 17.48, 17.97, 16.00, 0, -0.09, 0.02, 0.06],
    ['2016-05-24', 17.51, 17.33, 17.32, 17.51, 8.00, 0, -0.09, 0.03, 0.07],
    ['2016-05-25', 17.59, 17.55, 17.44, 17.59, 10.00, 0, -0.03, 0.07, 0.08],
    ['2016-05-26', 17.5, 17.69, 17.5, 17.8, 12.00, 0, 0.00, 0.09, 0.09],
    ['2016-05-27', 17.77, 17.66, 17.62, 17.77, 7.00, 0, 0.03, 0.10, 0.09],
    ['2016-05-30', 17.75, 17.84, 17.62, 17.87, 20.00, 0, 0.08, 0.12, 0.08],
    ['2016-05-31', 17.88, 18.0, 17.81, 18.03, 41.00, 0, 0.10, 0.12, 0.07],
    ['2016-06-01', 18.09, 17.83, 17.73, 18.09, 22.00, 0, 0.08, 0.10, 0.06],
    ['2016-06-02', 17.82, 17.73, 17.66, 17.88, 10.00, 0, 0.07, 0.08, 0.05],
    ['2016-06-03', 17.8, 17.78, 17.71, 17.83, 9.00, 0, 0.08, 0.08, 0.04],
]);

//数组处理
function splitData(rawData) {
    var datas = [];
    var times = [];
    var vols = [];
    var macds = [];
    var difs = [];
    var deas = [];
    for (var i = 0; i < rawData.length; i++) {
        datas.push(rawData[i]);
        times.push(rawData[i].splice(0, 1)[0]);
        vols.push(rawData[i][4]);
        macds.push(rawData[i][6]);
        difs.push(rawData[i][7]);
        deas.push(rawData[i][8]);
    }
    return {
        datas: datas,
        times: times,
        vols: vols,
        macds: macds,
        difs: difs,
        deas: deas
    };
}
//MA计算公式
function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data.times.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.datas[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
    }
    return result;
}

var option = {

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        }
    },
    legend: {
        data: ['KLine', 'MA5']
    },
    grid: [{
        left: '3%',
        right: '1%',
        height: '60%'
    }, {
        left: '3%',
        right: '1%',
        top: '71%',
        height: '10%'
    }, {
        left: '3%',
        right: '1%',
        top: '82%',
        height: '14%'
    }],
    xAxis: [{
        show: false,
        type: 'category',
        data: data.times,
        scale: false,
        boundaryGap: false,
        axisLine: {
            onZero: false
        },
        splitLine: {
            show: false
        },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    }, {
        show: false,
        type: 'category',
        gridIndex: 1,
        data: data.times,
        axisLabel: {
            show: false
        }
    }, {
        show: false,
        type: 'category',
        gridIndex: 2,
        data: data.times,
        axisLabel: {
            show: false
        }
    }],
    yAxis: [{
        scale: true,
        splitArea: {
            show: false
        }
    }, {
        gridIndex: 1,
        splitNumber: 3,
        axisLine: {
            onZero: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true
        }
    }, {
        gridIndex: 2,
        splitNumber: 4,
        axisLine: {
            onZero: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true
        }
    }],
    dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 0],
        start: 50,
        end: 60
    }, {
        show: false,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '97%',
        start: 50,
        end: 60
    }, {
        show: false,
        xAxisIndex: [0, 2],
        type: 'slider',
        start: 50,
        end: 60
    }],
    series: [{
        name: 'cnxm',
        type: 'candlestick',
        data: data.datas,
        itemStyle: {
            normal: {
                color: '#ef232a',
                color0: '#14b143',
                borderColor: '#ef232a',
                borderColor0: '#14b143'
            }
        },
       
        markPoint: {

        },
        markLine: {


        }
    }, {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
            normal: {
                opacity: 0.5
            }
        }
    }, {
        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.vols,
        itemStyle: {
            normal: {
                color: function(params) {
                    var colorList;
                    if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
                        colorList = '#ef232a';
                    } else {
                        colorList = '#14b143';
                    }
                    return colorList;
                },
            }
        }
    }, {
        name: 'MACD',
        type: 'bar',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: data.macds,
        itemStyle: {
            normal: {
                color: function(params) {
                    var colorList;
                    if (params.data >= 0) {
                        colorList = '#ef232a';
                    } else {
                        colorList = '#14b143';
                    }
                    return colorList;
                },
            }
        }
    }, {
        name: 'DIF',
        type: 'line',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: data.difs
    }, {
        name: 'DEA',
        type: 'line',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: data.deas
    }]
};

this.kline.setOption(option)
//
		}
	}
}
</script>
