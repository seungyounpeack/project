var loading = $.loading();
$(function(){
	function fn_chartData(){
		
		var param = {};
		Util.request("/dashBoardTest/chartData.ajax", param, function(resultData){
			fn_lineChart(resultData.lineChartList);
			fn_barChart(resultData.chartDateList);
			fn_pieChart(resultData.chartDateList);
			fn_wordCloud(resultData.wordCloudList);
		})
	};
	fn_chartData();
	
	function fn_lineChart(data){
		var param ={
				targetId:"leftTop", //div ID
				type:"X", //의미없음
				category:"startDate", //x축 컬럼명
				column:["count"], //Y축 컬럼명
				value:["count"], //Y축 컬럼명
				columnKr:["갯수"],//Y축 한글컬럼명
				bullet:["circle"],//라인  꼭지점(cirlce, triangle, rectangle) list[]
				color:[ am4core.color("#01F1FF")], // 라인 list[]
				position : "top",//범례 위치
				minGridDistance:0,// 다중라인 최소거리
				fontSize:8,//폰트 사이즈
				dateFormats:"month",// x축 날자 컬럼 dateformat
				setKey:'MM',// format key(yyyy or MM or yyyy-mm 등등)
				tooltip:{
					fontSize : 8, //툴팁 폰트 사이즈
				}
		}
		
		var params = CHART.lineParam(param,'개'); //(param , y축 data title, tooltip fontSize)
		CHART.dashBoard_lineChart(data,params)
		
	}
	
	function fn_barChart(data){
		var param ={
				targetId:"rightTop", //div ID
				type:"X", //X면 가로 차트 and 없으면 세로 차트 
				stack:false, // true = stack 차트
				category:"department",// 
				column:["count"],//값 컬럼
				value:["count"],//값 컬럼
				columnKr:["갯수"],//값 컬럼 한글명
				color:[am4core.color("#FE0000"),
					am4core.color("#FE6002"),
					am4core.color("#FEF600"),
					am4core.color("#30E400"),
					am4core.color("#0078FF"),
					am4core.color("#0A0071"),
					am4core.color("#9300EF"),
					am4core.color("#FE0000"),
					am4core.color("#FE6002"),
					am4core.color("#FEF600"),
					am4core.color("#30E400"),
					am4core.color("#0078FF"),
					am4core.color("#0A0071"),
					am4core.color("#9300EF"),
					am4core.color("#0078FF"),], //bar컬러 리스트(다중 차트시 ???)
				legend:{
					position : "top", //범례 위치
					fontSize : 8,
				},
				minGridDistance:0,
				fontSize:12,// 전체 폰트사이즈
				tooltip : {
					fontSize : 8, //툴팁 폰트사이즈
				},
		}
		
		var params = CHART.barParam(param,'개');
		params.eachColor = true;//각각 색상 주기
		CHART.dashBoard_barChart(data,params)
	}
	
	function fn_pieChart(data){
		var param ={
				targetId:"leftBot", //div ID
				type:"2D", //파이차트 타입 (2D, 3D)
				category:"department",
				column:["count"],
				value:["count"],
				columnKr:["갯수"],
				size:100, //차트 사이즈
				innerRadius : 20,//내부 원 사이즈
				color:[am4core.color("#FE0000"),
					am4core.color("#FE6002"),
					am4core.color("#FEF600"),
					am4core.color("#30E400"),
					am4core.color("#0078FF"),
					am4core.color("#0A0071"),
					am4core.color("#9300EF"),
					am4core.color("#FE0000"),
					am4core.color("#FE6002"),
					am4core.color("#FEF600"),
					am4core.color("#30E400"),
					am4core.color("#0078FF"),
					am4core.color("#0A0071"),
					am4core.color("#9300EF"),
					am4core.color("#0078FF"),], //색상 리스트
				legend:{
					position : "top", //범례위치
					fontSize: 12, //범례 폰트사이즈
				},
				minGridDistance:0,
				fontSize:12,//전체 폰트사이즈
				lable:{
					disabled : true //차트 설명 라벨 안보이게(보이면 지저분함)
				}
		}
		
		var params = CHART.pieParam(param,'개',12);
		CHART.dashBoard_pieChart(data,params)
	}
	
	function fn_wordCloud(data){
		var param ={
				targetId:"rightBot", //div ID
				category:"keyword",
				column:["keywordCount"],
				step : 15, 
				minFontSize:10,
				maxFontSize:30,
		}
		
		var params = CHART.wcParam(param);
		CHART.dashBoard_wordcloudChart(data,params)
	}
	
});
//다운로드 파일
function fn_fileDown(filePk, division){
	  location.href = "/dashBoardTest/fileDown.do?filePk="+filePk+"&division="+division;
}
