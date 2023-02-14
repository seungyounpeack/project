var loading = $.loading();

var layerList = [];
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	/*map.on("load", function(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	})*/
	
	//지역산업 생태계 > 기업동향 데이터 조회
	function fn_companyTrendData(){

		var url = "/dashBoard/company/companyTrendData.do";
		
		Util.request(url, {}, function(resultData){
			//행정동별 기업체 수 지도 
			fn_emdCompanyCnt(JSON.parse(resultData.emdCompanyCnt.jsonBuildObject.value), resultData.emdCompanyRange);
			
			fn_emdCompanyStatsChart(resultData.emdCompanyStats);
			fn_yearCompanySalesTable(resultData.yearCompanySales);
			fn_industryRateChart(resultData.industryRate);
			fn_industryProfitChart(resultData.industryProfit);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		});
	}
	
	fn_companyTrendData();
	
	//행정동별 기업체 수 함수
	function fn_emdCompanyCnt(mapData, range ){
		map.setCenter([127.06842172797701, 37.73619329481321]);
		
		var style = fn_getStyle('ent_cnt', range);
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'dong_nm');
		map.moveLayer('result' , 'result_text');
		
		map.off('click', 'result', mapFeatureClick);
		mapUtil.mapFeatureClick(map, true, 'result', mapFeatureClick);
	}
	
	function fn_emdCompanyStatsChart(data) {
		var params = {
			type: 'bar',				// 타입
			elementId: 'emdCompanyStatsChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				paddingTop: 30,
				fontSize: 14,
				height: "370",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '억',
			xCategory: 'stacYmd',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}년</span><br/> <span style="font-size:11px;">{valueY}{additional}억</span>'
			}],
			// 차트 컬러
			colors: ["#C767DC"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_yearCompanySalesTable(data) {
		$("#yearCompanySalesList").html('');
		
		var html = '';
		html += '<caption>행정동별 기업동향 통계 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="10%" />';
		html += '<col width="10%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="12%" />';
		html += '<col width="12%" />';
		html += '<col width="" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		var rowTitle = {}, lastDongNm;
		for( var i = 0 ; i < data.length ; i++ ){
			if( rowTitle[data[i].dongNm] == undefined ) rowTitle[data[i].dongNm] = 0;
			rowTitle[data[i].dongNm]++;
		}
		
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<tr>';
			if( lastDongNm != data[i].dongNm) { 
				html += '<td rowspan="'+rowTitle[data[i].dongNm]+'" style="vertical-align: middle;">'+data[i].dongNm+'</td>';
				lastDongNm = data[i].dongNm;
			}
			html += '<td>'+data[i].crtrYr.toString()+'</td>';
			html += '<td style="text-align: right;">'+data[i].slsAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].bsnPrit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].caplTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].asetTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].empCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].avgSary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align: right;">'+data[i].totSary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#yearCompanySalesList").html(html);
	}
	
	function fn_industryRateChart(data) {
		
		$("#dateTxt").text("("+data[0].date+" 기준)");

		var params = {
			type: 'pie',				// 타입
			elementId: 'industryRateChart',		// 아이디
			animated: true,
			style: {
				height: "430",
				fontSize: 12,
				radius: 100,
				innerRadius: 30
			},
			legend: {
				visible: false,
				position: 'bottom',
				template: '[bold {color}]{name}[/]'
			},
			dataFields: {
				value: 'atrb01',
				category: 'stacSe',
				//tooltip: '{category}\n[bold]{value.percent}[/]'
				//tooltip: '<span style="font-size:12px;font-weight:bold;">{country}</span><br/> <span style="font-size:11px;">{value}</span>'
			},
			data: data
		};
		CHART.createPieChart(params);
	}
	function fn_industryProfitChart(data) {
		
		$("#dateTxt2").text("("+data[0].date+" 기준)");

		var params = {
			type: 'bar',				// 타입
			elementId: 'industryProfitChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "430",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '천원',
			xCategory: 'stacSe',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}천원</span>'
			}],
			// 차트 컬러
			colors: ["#79c7e5", "#79a7e5", "#7983e5", "#9379e6", "#b479e5", "#d579e6", "#e479d9", "#e57abc", "#eb7b9e", "#ff7b7c"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	
	//지도 클릭 이벤트
	function mapFeatureClick(e) {
		var objectKey = Object.keys(e.features[0].properties);
		var objectValue = Object.values(e.features[0].properties);
		
		var param = {};
		param.dongCd = e.features[0].properties.dong_cd;
		var url = "/dashBoard/company/companyTrendCompanySalesData.do";
		Util.request(url, param, function(resultData){
			fn_yearCompanySalesTable(resultData.yearCompanySales);
		});
	}
});

var map = new mapboxgl.Map({
	container: 'companyMap',
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
		"#fff59b",
		"#ffe933",
		"#fddb10",
		"#e9b500",
		"#a17f03"
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
		html +='<li><span class="rm0'+(i+1)+'"></span>' + range[i].fromValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ~ ' + range[i].toValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</li>';
	}
	html += '</ul>';
	$("#mapLegend").html(html);
}