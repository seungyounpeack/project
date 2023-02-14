//로딩 객체
var loading = $.loading();

//레이어 리스트
var layerList = [];



//레이어 소스 리스트
var sourceList = [];


$(function(){
	document.body.style.zoom = "100%";
	//날짜
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	function fn_param(){
		var param = {};
		var date = $("#startDate").val();
		var condition = "";
		if( date != null ){
			
			condition += "AND crtr_ym = "+ date +"::text";
		}
		param.sort = $("input[name='iptMove']:checked").val();
		param.condition = "AND crtr_ym = "+ date +"::text";
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//인구 통계 데이터 호출 함수
	function fn_popMoveData(){
		
		var param = fn_param();
		
			console.log("실행")
		
		var url = "/dashBoard/population/populationMoveData.do";
		
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//popMoveStatus , popIncomeStatus, popOutcomeStatus, popMoveYear
			
			//전입전출 순이동 현황 함수 호출
			if(resultData.popMoveStatus.length > 0)  fn_popMoveStatus(resultData.popMoveStatus[0]);
			
			//전입 현황 차트 함수 호출
			fn_popIncomeStatusChart(resultData.popIncomeStatus);
			
			//전출 현황 차트 함수 호출
			fn_popOutcomeStatusChart(resultData.popOutcomeStatus);
			
			//10년 전입, 전출 현황
			fn_popMoveYearChart(resultData.popMoveYear);
			
			console.log("JSON.parse(resultData.popMoveMap.jsonBuildObject.value) :", JSON.parse(resultData.popMoveMap.jsonBuildObject.value))
			//전입, 전출 지도차트 함수 호출
			if( JSON.parse(resultData.popMoveMap.jsonBuildObject.value).features != null ) {
				
				fn_popMoveMapChart(JSON.parse(resultData.popMoveMap.jsonBuildObject.value), resultData.popMoveMapData, resultData.popMoveMapRange, param.sort);
			}else{
				var layerId = "result";
				
				$("#mapLegend").html('');
				map.setLayoutProperty(layerId, 'visibility', 'none');
				map.setLayoutProperty("result_text", 'visibility', 'none');
				alert("전입, 전출 지도 데이터가 없습니다.	");
			}
				
		})
		
	}
	
	fn_popMoveData();
	
	
	//전집, 전출 지도 차트 함수
	function fn_popMoveMapChart(mapData, data, range, sort){
		
		//지오서버 행정동 경계 데이터 가져오기
		//mapUtil.addGeoServerLayer('cmm_admd_area', 'cmm_admd_area', 'cmm_admd_area', '', '', 'admd_nm')
		var column = "";
		var areaNm = ""
		if( sort == 1 ){
			column = 'trrn_pop_cnt';
		}else{
			column = 'mvt_pop_cnt';
			
		}
		var style = fn_getStyle(column, range);
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'admd_nm');
		map.moveLayer('result' , 'result_text');
		map.setLayoutProperty('vworld', 'visibility', 'none');
	}
	
	//10년 전입, 전출 현황
	function fn_popMoveYearChart(data){
		//chart data 객체
    	var popMoveYearData = {};
    	
    	var resultData = [];
    	
    	for( var i = data.length-1 ; i > -1; i-- ){
    		resultData.push(data[i]);
    	}
    	
    	popMoveYearData.data = resultData;
    	console.log("resultData : ", resultData)
    	popMoveYearData.dataFieldsCategory = "stacYmd";
    	popMoveYearData.dataFieldsValue1 = "atrb01";
    	popMoveYearData.dataFieldsValue2 = "atrb02";
    	popMoveYearData.dataFieldsValue3 = "atrb03";
		var popMoveYearChart = CHART.dashBoard_pop_moveYearStatus("popMoveYear", popMoveYearData);
	}
	
	
	//전입전출 순이동 현황 차트 함수
	function fn_popMoveStatus(data){
		
		$("#moveIn")[0].innerHTML = data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		$("#moveInRate")[0].innerHTML = data.atrb02 + "%";
		$("#move")[0].innerHTML = data.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		$("#moveRate")[0].innerHTML = data.atrb04+ "%";
		$("#moveOut")[0].innerHTML = data.atrb05.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		$("#moveOutRate")[0].innerHTML = data.atrb06+ "%";
	}
	
	
	//전입 현황 차트 함수 호출
	function fn_popIncomeStatusChart(data){
		//chart data 객체
		var popIncomeStatusData = {};
		
		popIncomeStatusData.data = data;
		popIncomeStatusData.dataFieldsCategory = "stacSe";
		popIncomeStatusData.dataFieldsValue = "atrb01";
		
		var popIncomeChart = CHART.dashBoard_pop_incomeStatus("popIncomeStatus", popIncomeStatusData);
		
	};
	
	//전출 현황 차트 함수 호출
	function fn_popOutcomeStatusChart(data){
		//chart data 객체
		var popOutcomeStatusData = {};
		popOutcomeStatusData.data = data;
		popOutcomeStatusData.dataFieldsCategory = "stacSe";
		popOutcomeStatusData.dataFieldsValue = "atrb01";
		
		var popOutcomeChart = CHART.dashBoard_pop_outcomeStatus("popOutcomeStatus", popOutcomeStatusData);
		
	};
	
	//radio button 클릭시 데이터 조회함수
	function fn_popInOutData(){
		var param = fn_param();
		
		var url = "/dashBoard/population/populationMoveChange.do";
		Util.request(url, param, function(resultData){
			
			if( JSON.parse(resultData.popMoveMap.jsonBuildObject.value).features != null ) {
				//전입, 전출 지도차트 함수 호출
				fn_popMoveMapChart(JSON.parse(resultData.popMoveMap.jsonBuildObject.value), resultData.popMoveMapData, resultData.popMoveMapRange, param.sort);
			}else{
				var layerId = "result";
				
				$("#mapLegend").html('');
				map.setLayoutProperty(layerId, 'visibility', 'none');
				map.setLayoutProperty("result_text", 'visibility', 'none');
				alert("전입, 전출 지도 데이터가 없습니다.	");
			}
			
			//fn_popMoveMapChart(JSON.parse(resultData.popMoveMap.jsonBuildObject.value), resultData.popMoveMapData, resultData.popMoveMapRange, param.sort);
			
		})
	}
	
	//전입 라디오버튼 클릭시
	$("#iptIn").on("click", function(){
		fn_popInOutData();
	})
	
	//전출 라디오 버튼 클릭시
	$("#iptOut").on("click", function(){
		fn_popInOutData();
	})
	
	//권외 버튼 클릭시
	$("#btnExtend").on("click", function(){
		
		//winObject = window.open(popupUrl,'GISFULL','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
		
		//winObject.focus();
		
		var _width = screen.height;
	    var _height = screen.width;
	    console.log("width : ", _width);
	    console.log("_height : ", _height);
	    
	    // 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
	    var _left = Math.ceil(( window.screen.width - _width )/2);
	    var _top = Math.ceil(( window.screen.width - _height )/2); 

	    //bottom=100, right=70, width=810, height=536, status=no, menubar=no, toolbar=no, resizable=no
		var sort = $("input[name='iptMove']:checked").val();
		var url = "/dashBoard/population/populationMovePopup.do";
		url += "?sort="+ sort; 
		url += "&startDate="+ $("#startDate").val(); 
		console.log("url : ", url);
	    var name = "상세정보보기";
	    //내부망이므로 업무상 제외
	  	window.open(url, name, 'width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes,resizable=no');
	    console.log("option : ", 'height=' + screen.height + ',width=' + screen.width + ',fullscreen=yes')
	    window.moveTo(0,0); //창위치
	    window.focus();
	})
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_popMoveData();
    });
	
})

var map = new mapboxgl.Map({
	container: 'popMoveMap',
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
		"#dceff0",
		"#a0d7d3",
		"#56b6bb",
		"#5691bb",
		"#5677bb"
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
			"fill-outline-color" : '#c3c3c3',
			// "fill-antialias" : true,
	        'fill-opacity': 1,
	        //'fill-antialias':false
           };
	
	return style;
}

//범례생성함수 
function fn_createLegend(range, color){
	var html = '';
	$("#mapLegend").html(html);
	html += '<ul>';
	for( var i = 0 ; i < range.length; i++ ){
		html +='<li><span class="rm0'+(i+1)+'"></span>' + range[i].fromValue.toFixed(0) + ' ~ ' + range[i].toValue.toFixed(0) + ' (명)</li>';
		/*html += '<div style="margin-bottom : 5px; width: 15px; height: 15px; margin-left: 10px; background-color: ' + color[i] + ';">';
		html += '<span style="display: inline=block; margin-left: 20px; font-size:12px; width:100px;">' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</span>';
		html += '</div>';*/
	}
	
	html += '</ul>';
	
	$("#mapLegend").html(html);
}
