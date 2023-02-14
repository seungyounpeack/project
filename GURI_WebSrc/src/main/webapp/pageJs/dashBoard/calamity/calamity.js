var loading = $.loading();

//레이어 리스트
var layerList = [];

//레이어 소스 리스트
var sourceList = [];

$(function(){
	
	document.body.style.zoom = "100%";
	//인구 통계 데이터 호출 함수
	function fn_calamityStatusData(){
		
		
		var url = "/dashBoard/calamity/calamityStatusData.do";
		
		Util.request(url, null, function(resultData){
			console.log("resultData : ", resultData)
			//재난 돌발상황정보 데이터 조회
			fn_calaStatusMap(JSON.parse(resultData.calaStatusMap.jsonBuildObject.value), JSON.parse(resultData.calaAdmdMap.jsonBuildObject.value), JSON.parse(resultData.defaultMap.jsonBuildObject.value));
			
			//재난 돌발상황정보 텍스트 데이터 조회
			if( resultData.calaStatusData ) fn_calaStatusData(resultData.calaStatusData);
			//재난 유형별 구조수 데이터 조회
			if(resultData.calaCaseCnt.length > 0) fn_calaCaseCntChart(resultData.calaCaseCnt);
			
			//재난 발화장소별 화재 발생 누적현황 데이터 조회
			if( resultData.calaPlaceTotal ) fn_calaPlaceTotalChart(resultData.calaPlaceTotal);
			
			//재난 발화요인별 화재 발생 누적현황 데이터 조회
			if( resultData.calaFactorTotal ) fn_calaFactorTotalChart(resultData.calaFactorTotal);
		})
		
	}
	
	fn_calamityStatusData();

	//재난 돌발상황정보 텍스트 데이터 조회
	function fn_calaStatusData(data){
		var html = '';
		$("#dataTimeTxt").html("("+data[0].date + " 기준)");
		$("#calaStatusData").html('');
		data.forEach(function(item, index){
			
			html += '<li>'+item.tp+" - "+item.info+'</li>';
		})
		
		
		$("#calaStatusData").html(html);
	}
	
	//재난 유형별 구조수  차트
	function fn_calaCaseCntChart(data){
		//재난 유형별 구조수 chart data 객체
		var calaCaseCntData = {};
    	var resultData = [];
    	var html = '';
    	
    	html += '유형별 긴급 구조 수 (<span class="tiny_12">'+data[0].date + " 기준"+'</span>)';
    	
    	$("#calaCaseCntP").html(html);
    	
    	calaCaseCntData.data = data;
    	calaCaseCntData.dataFieldsCategory = "stacSe";
    	calaCaseCntData.dataFieldsValue = "atrb01";
    	
    	
		var calaCaseCntChart = CHART.dashBoard_cala_caseCnt("calaCaseCnt", calaCaseCntData);
	}
	
	//재난 발화장소별 화재 발생 누적현황 데이터 조회
	function fn_calaPlaceTotalChart(data){

		//재난 발화장소별 화재 발생 누적현황 chart data 객체
		var calaPlaceTotalData = {};
		var resultData = [];
		var html = '';
    	
		html += '1. 발화장소별 화재 발생 누적 현황 (<span class="tiny_12">'+data[0].date + "년 기준"+'</span>)';
		
    	$("#calaPlaceTotalP").html(html);
    	
		calaPlaceTotalData.data = data;
		calaPlaceTotalData.dataFieldsCategory = "stacSe";
		calaPlaceTotalData.dataFieldsValue = "atrb01";
		var calaPlaceTotalChart = CHART.dashBoard_cala_placeTotal("calaPlaceTotal", calaPlaceTotalData);
	}
	
	//재난 발화요인별 화재 발생 누적현황 데이터 조회
	function fn_calaFactorTotalChart(data){

		var html = '';
    	
		html += '2. 발화요인별 화재 발생 누적 현황 (<span class="tiny_12">'+data[0].date + "년 기준"+'</span>)';
		
    	$("#calaFactorTotalP").html(html);
		//재난 발화요인별 화재 발생 누적현황 chart data 객체
		var calaFactorTotalData = {};
		calaFactorTotalData.data = data;
		calaFactorTotalData.dataFieldsCategory = "stacSe";
		calaFactorTotalData.dataFieldsValue = "atrb01";
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var calaFactorTotalChart = CHART.dashBoard_cala_factorTotal("calaFactorTotal", calaFactorTotalData);
	}
	
	//부서별 계약현황 데이터 조회
	function fn_calaStatusMap(mapData, admdData, defaultData){
		
		var style = {
					'circle-radius': 10,
					'circle-opacity': 1,
					//'circle-color': 'red',
					'circle-color': ['match',
	                    ['get', 'tp'],
	                    '사고',
	                    'red',
	                    '공사',
	                    'yellow',
	                    /* other */ '#00FA00']
		}
		
		mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(admdData, 'cmm_admd_area', 'cmm_admd_area', 'fill', 'geojson', {'fill-color' : '#5f5f5f', "fill-outline-color" : '#c3c3c3'}, 'admd_nm');
		mapUtil.addLayer(mapData, 'result', 'result', 'circle', 'geojson', style, '');
		//mapUtil.addGeoServerLayer('cmm_admd_area', 'cmm_admd_area', 'cmm_admd_area', '', '', 'admd_nm')
		console.log("point : ", map.getBounds())
	}
})

var map = new mapboxgl.Map({
	container: 'map',
	//center: [127.039054678593,37.7325924013584],
	center: [127.06842172797701, 37.73619329481321],
	zoom: 7,
	//pitch: 40,
	//bearing: 20,
	//antialias: true,
	//화면 기울기설정(2,3D)
	pitchWithRotate: false,
	dragRotate: false,
	dragPan: false,
	preserveDrawingBuffer: false,
	maxBounds : [[126.85653560891015, 37.66550996229325], [127.30030784703307, 37.80684195414009]],
	//maxBounds : [[126.54156324865809, 37.289307844993726], [127.9069929361577, 37.66060217757156]],
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
