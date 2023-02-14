//로딩 객체
var loading = $.loading();


$(function(){
	document.body.style.zoom = "100%";
	//지도 클릭 이벤트
//	function fn_mapPictureLayerFeature(e) {
//		var objectKey = Object.keys(e.features[0].properties);
//		var objectValue = Object.values(e.features[0].properties);
//		
//		var param = {};
//		param.admdCode = e.features[0].properties.dong_cd;
//		param.admdName = e.features[0].properties.admd_nm;
//		param.startDate = $("#startDate").val();
//		
//		//지도 클릭시 데이터 로딩 함수 호출
////		fn_mapClickData(param)
//	}	
	
//	//날짜
//	$('.dateSelect').datetimepicker({ 
//		format: 'YYYYMM',
////		minDate : $("#start").val(),
////		maxDate : $("#end").val()
//	});
	
//	//이벤트 처리
//	$('.dateSelect').datetimepicker()
//    .on('dp.change', function(e) {
//    	map.on('click', 'admd', fn_mapPictureLayerFeature);
//    });
	
//	map.on('load', function() {
////	mapUtil.mapFeatureClick(map, true, 'admdArea', fn_mapPictureLayerFeature);
//	});
	
	fn_getData();
	
	
	//지도 클릭시 데이터 로딩
	function fn_mapClickData(param){
		console.log("param : ", param)
		var url = "/dashBoard/population/populationFlowSearchData.do";
		Util.request(url, param, function(resultData){
			//요일별 인구
			if(resultData.popDayFlow.length > 0) fn_popDayFlowChart(resultData.popDayFlow);
			
			//성 연령별 유동 인구
			if(resultData.popGenderFlow.length > 0) fn_popGenderFlowChart(resultData.popGenderFlow, resultData.sum);
			
			//거주지별 생활인구/서비스 인구
			if(resultData.popRegService.length > 0) fn_popRegServiceChart(resultData.popRegService);
			
			fn_changeName(param);
		})
	}
	
	//param 생성 
	function fn_param(){
		var param = {};
		var date = $("#startDate").val();
		var condition = "";
		if( date != null ){
			
			condition += "AND STDR_YM = "+ date +"::text";
		}
		param.sort = $("input[name='iptMove']:checked").val();
		param.condition = "AND STDR_YM = "+ date +"::text";
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//데이터 호출 함수
	function fn_getData(){
		
		var param = fn_param();
		
		var url = "/dashBoard/welfare/welfareStatusData.do";
		
		
		Util.request(url, param, function(resultData){
			var admdArea = JSON.parse(resultData['admdArea'][0]['jsonBuildObject']['value']);//의정부 행정동 경계
//			var defaultMap = JSON.parse(r`esultData['defaultMap']['jsonBuildObject']['value']);//지도 배경
			var childFacil = JSON.parse(resultData['childFacil'][0]['jsonBuildObject']['value']);//보육시설 현황
			var oldWfFacil = resultData['oldWfFacil'];//노인복지시설 현황
	//		var oldWfFacilRatio = resultData['oldWfFacilRatio'];//노인복지시설 종류별 비율
	//		var kndgnLimit = resultData['kndgnLimit'];//유형별 유치원 정원 수
	//		var nurseryLimit = resultData['nurseryLimit'];//유형별 어린이집 정원 수
	//		var disDegreeCnt = resultData['disDegreeCnt'];//장애 정도별 수급자 수
	//		var disAgeCnt = resultData['disAgeCnt'];//연령별 수급자 수
		
			//지도 배경 설정
			fn_setMapBackground();
			//의정부 행정동 경계 세팅
			fn_setAdmdArea(admdArea);
			//보육시설 현황 레이어 추가
			fn_setChildFacil(childFacil);
			//노인복지시설현황 그리드
			fn_setOldWfFacilGrid(oldWfFacil);
			//차트 설정
			fn_setCharts(resultData);
			
			//지도 마우스오버 이벤트 설정
//			fn_setMouseOverEvent();
		})
		
	}
	
	
	//범례생성함수 
	function fn_createLegend(tagId, range, color){
		var html = '';
		$("#mapLegend").html(html);
		html += '<ul>';
		for( var i = 0 ; i < range.length; i++ ){
			html +='<li><span class="rm0'+(i+1)+'"></span>' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</li>';
			/*html += '<div style="margin-bottom : 5px; width: 15px; height: 15px; margin-left: 10px; background-color: ' + color[i] + ';">';
			html += '<span style="display: inline=block; margin-left: 20px; font-size:12px; width:100px;">' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</span>';
			html += '</div>';*/
		}
		
		html += '</ul>';
		
		$("#mapLegend").html(html);
	}
	
	
	//지도 배경 설정
	function fn_setMapBackground(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	}
	
	//행정동 경계 추가
	function fn_setAdmdArea(data){
		
		var style = { 
				"fill-color": '#454545',
				"fill-outline-color" : '#BDBDBD',
		        'fill-opacity': 1
	       };
		mapUtil.addLayer(data, 'admd', 'admd', 'fill', 'geojson', style, 'admd_nm', 14);

//		mapUtil.mapFeatureClick(map, true, 'admd', fn_mapPictureLayerFeature);
	}
	
	//보육시설 현황 레이어 추가
	function fn_setChildFacil(data){
		
		var style = { 
				"circle-radius": 3,
				'circle-opacity': 1,
				'circle-color': [
					'match',
					['get', 'se'],
					'유치원', '#FFDE00',
					'어린이집', '#A9FF39',
					 '#ccc'/* other */
					]
		};
		mapUtil.addLayer(data, 'childFacil', 'childFacil', 'circle', 'geojson', style);

	}
	
	//노인복지시설현황 그리드
	function fn_setOldWfFacilGrid(data) {
		html = '';
		html2 = '';
		
		html2 += '1. 행정동별 노인복지시설 현황 (<span class="tiny_12">'+data[0].date + " 기준"+'</span>)';
		$("#OldWfFacilGridP").html(html2);
		console.log("html2 : " + html2);
		for (var i = 0; i < data.length; i++) {
			html += '<tr>';
			html += '<th>' + data[i]['dongNm'] + '</th>';
			html += '<th>' + data[i]['mdlcSnirWlreFctyCnt'] + '</th>';
			html += '<th>' + data[i]['mdlcSnirWlrePrcpCnt'] + '</th>';
			html += '<th>' + data[i]['hmlvSnirWlreFctyCnt'] + '</th>';
			html += '<th>' + data[i]['hmlvSnirWlrePrcpCnt'] + '</th>';
			html += '<th>' + data[i]['snirLesuWlreFctyCnt'] + '</th>';
			html += '<th>' + data[i]['snirLesuWlrePrcpCnt'] + '</th>';
			html += '</tr>';
		}
		$("#oldWfFacilTbody").html(html);
	}
	
	
	function fn_setCharts(data) {
	
		var oldWfFacilRatio = data['oldWfFacilRatio'];//노인복지시설 종류별 비율
		var kndgnLimit = data['kndgnLimit'];//유형별 유치원 정원 수
		var nurseryLimit = data['nurseryLimit'];//유형별 어린이집 정원 수
		var disDegreeCnt = data['disDegreeCnt'];//장애 정도별 수급자 수
		var disAgeCnt = data['disAgeCnt'];//연령별 수급자 수
		
		html1 = '';
		html2 = '';
		html3 = '';
		html4 = '';
		html5 = '';
		
		html1 += '2. 유형별 시설 및 정원 비중 (<span class="tiny_12">'+oldWfFacilRatio[0].date + " 기준"+'</span>)';
    	$("#oldWfFacilRatioChartP").html(html1);
    	
		html2 += '1. 유형별 유치원 정원 수 (<span class="tiny_12">'+kndgnLimit[0].date + " 기준"+'</span>)';
    	$("#kndgdLimitChartP").html(html2);
		
    	html3 += '2. 유형별 어린이집 정원 수 (<span class="tiny_12">'+nurseryLimit[0].date + " 기준"+'</span>)';
    	$("#nurseryLimitChartP").html(html3);
		
    	html4 += '1. 장애정도별 수급자 수 (<span class="tiny_12">'+disDegreeCnt[0].date + "년 기준"+'</span>)';
    	$("#disDegreeCntChartP").html(html4);
		
    	html5 += '2. 연령별 수급자 수 (<span class="tiny_12">'+disAgeCnt[0].date + "년 기준"+'</span>)';
    	$("#disAgeCntChartP").html(html5);
		
		
		var oldWfFacilRatioChart  = CHART.dashBoard_welfare_oldWfFacilRatio("oldWfFacilRatioChart", oldWfFacilRatio);
		var kndgnLimitChart  = CHART.dashBoard_welfare_kndgnLimit("kndgdLimitChart", kndgnLimit);
		var nurseryLimitChart  = CHART.dashBoard_welfare_kndgnLimit("nurseryLimitChart", nurseryLimit);
		var disDegreeCntChart  = CHART.dashBoard_welfare_disCnt("disDegreeCntChart", disDegreeCnt, "#9A47C9");
		var disAgeCntChart  = CHART.dashBoard_welfare_disCnt("disAgeCntChart", disAgeCnt, "#CC59CA");
	
	}


});


//map 객체 생성
var map = new mapboxgl.Map({
	container: 'ujbMap',
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

