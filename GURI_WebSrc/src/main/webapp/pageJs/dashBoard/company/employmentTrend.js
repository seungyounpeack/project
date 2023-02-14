var loading = $.loading();

var layerList = [];
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	/*map.on("load", function(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	})*/
	
	$('.dateSelect').datetimepicker({ 
		format: 'YYYY', 
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	}).on('dp.change', function(e){
		var formatedValue = e.date.format(e.date._f);
		
		var param = {};
		param.year = formatedValue;
		var condition = "";
		if( formatedValue != null ){
			
			condition += "AND crtr_yr = "+ formatedValue +"::text";
		}
		param.condition =  "AND crtr_yr = "+ formatedValue +"::text";
		console.log("formatedValue : ", formatedValue)
		var url = "/dashBoard/company/employmentTrendCntData.do";
		Util.request(url, param, function(resultData){
			fn_emdEmploymentCnt(JSON.parse(resultData.emdEmploymentCnt.jsonBuildObject.value), resultData.emdEmploymentRange);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		});
	});
	
	//지역산업 생태계 > 혁신동향 데이터 조회
	function fn_employmentTrendData(){

		var url = "/dashBoard/company/employmentTrendData.do";
		
		Util.request(url, {}, function(resultData){
			//행정동별 종업원수 지도 
			fn_emdEmploymentCnt(JSON.parse(resultData.emdEmploymentCnt.jsonBuildObject.value), resultData.emdEmploymentRange);
			
			fn_industryAvgPayChart(resultData.industryAvgPay);
			
			fn_entrantRetireesChart(resultData.entrantRetirees);
			
			fn_yearAvgPayChart(resultData.yearAvgPay);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		});
	}
	
	fn_employmentTrendData();
	
	//행정동별 기업체 수 함수
	function fn_emdEmploymentCnt(mapData, range ){
		map.setCenter([127.06842172797701, 37.73619329481321]);
		
		var style = fn_getStyle('emp_cnt', range);
//		mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'dong_nm');
		map.moveLayer('result' , 'result_text');
	}
	
	function fn_industryAvgPayChart(data) {
		
		$("#dateTxt").text("("+data[0].date+" 기준)");

		var chartParams0 = {
			type: 'bar',				// 타입
			elementId: 'industryAvgPayChart',		// 아이디
			animated: true,
			theme: 'dark',
			reverse: true,
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "450",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'stacSe',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryY}</span><br/> <span style="font-size:11px;">{valueX}{additional}천원</span>'
			}],
			unit: '천원',
			// 차트 컬러
			colors: ["#9a47c9"],
			// 데이터
			data: data
		};
		CHART.createBarChart(chartParams0);
	}
	
	function fn_entrantRetireesChart(data) {
		var chartParams = {
			type: 'bar',				// 타입
			elementId: 'entrantRetireesChart',		// 아이디
			animated: true,
			theme: 'dark',
			reverse: false,
			style: {
				height: "300",			// 차트 높이
				fontSize: 12,
			},
			xCategory: 'stacYmd',
			legend: {
				visible: true,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			// 범례
			series: [{
				name: '입사자',
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}, {
				name: '퇴사자',
				value: 'atrb02',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}],
			unit: '명',
			// 차트 컬러
			colors: ["#dc71f5", "#9075f8"],
			// 데이터
			data:  data
		};
		CHART.createBarChart(chartParams);
	}
	function fn_yearAvgPayChart(data) {
		var chartParams = {
			type: 'bar',				// 타입
			elementId: 'yearAvgPayChart',		// 아이디
			animated: true,
			theme: 'dark',
			reverse: false,
			stacked: true,
			style: {
				paddingTop: 30,
				height: "300",			// 차트 높이
				fontSize: 12,
			},
			xCategory: 'stacYmd',
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			// 범례
			series: [{
				name: '평균급여',
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}천원</span>'
			}],
			unit: '천원',
			// 차트 컬러
			colors: ["#dbaf66"],
			// 데이터
			data:  data
		};
		CHART.createBarChart(chartParams);
	}
});


var map = new mapboxgl.Map({
	container: 'employmentMap',
	//center: [127.039054678593,37.7325924013584],
	center: [127.06842172797701, 37.73619329481321],
	zoom: 11,
	//pitch: 40,
	//bearing: 20,
	//antialias: true,
	//화면 기울기설정(2,3D)
	pitchWithRotate: false,
	dragRotate: false,
	dragPan: false,
	preserveDrawingBuffer: false,
	maxBounds : [[126.94653560891015, 37.68550996229325], [127.19030784703307, 37.78684195414009]],
	//maxBounds : [[126.04156324865809, 36.889307844993726], [128.3069929361577, 38.36060217757156]],
    //지도 다운로드 기능 dataURL 설정  -png
	//preserveDrawingBuffer : true,
	//scrollZoom 기능
	scrollZoom: false,
	doubleClickZoom : false,
	//화면창에 따라 지도 크기 조절
	trackResize : true,
	maxZoom : 17.9,
	style: {
		version: 8, 
		sources: {
			vworld: {
				type: "raster", 
				tiles: ['https://g.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'], 
				tileSize: 256, attribution:""
			}
		},
		layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}],
		//"sprite": "http://openmaptiles.org/sprites/",
		"glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
		//glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
	}

});


//스타일 함수
function fn_getStyle(columnNm, colorRange){
	var colorList = [
		"#f5c7fe",
		"#ec97ff",
		"#c967dd",
		"#d147eb",
		"#ca16f1"
	];
	var range = [];
	colorList.forEach(function(item, index){
		var data = [];
		data.push(colorRange[index].fromValue);
		data.push(colorList[index]);
		range.push(data);
	})
	
	//범례 생성 함수 호출
	fn_createLegend(colorRange, colorList);
	
	var style = { 
			"fill-color": {
				"property" : columnNm,
				"stops" : range
			},
			//"fill-outline-color" : 'rgba(' + colorPick.convertToRGB(color)[0] + ',' + colorPick.convertToRGB(color)[1] + ',' + colorPick.convertToRGB(color)[2] + ',1)',
			// "fill-antialias" : true,
	        'fill-opacity': 1,
	        "fill-outline-color" : '#c3c3c3'
         };
	
	return style;
}

//범례생성함수 
function fn_createLegend(range, color){
	$("#mapLegend").html('');
	var html = '';
	html += '<ul style="width:150px;">';
	for( var i = 0 ; i < range.length; i++ ){
		html +='<li><span class="rm0'+(i+1)+'"></span>' + range[i].fromValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ~ ' + range[i].toValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (명)</li>';
	}
	html += '</ul>';
	$("#mapLegend").html(html);
}