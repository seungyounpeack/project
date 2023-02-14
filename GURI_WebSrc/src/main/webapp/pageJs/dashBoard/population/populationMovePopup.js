//로딩 객체
var loading = $.loading();

//레이어 리스트
var layerList = [];

//레이어 소스 리스트
var sourceList = [];

$(function(){
	//document.body.style.zoom = "100%";
	function fn_param(){
		var param = {};
		var date = $("#startDate").val();
		var condition = "";
		if( date != null ){
			
			condition += "AND crtr_ym = "+ date +"::text";
		}
		param.sort = $("#sort").val();
		param.condition = "AND crtr_ym = "+ date +"::text";
		param.startDate = $("#startDate").val();
		return param;
	}
	
	
	//radio button 클릭시 데이터 조회함수
	function fn_popInOutData(){
		var param = fn_param();
		
		var url = "/dashBoard/population/populationMoveSggChange.do";
		console.log("param: ", param)
		Util.request(url, param, function(resultData){
			
			if( JSON.parse(resultData.popMoveMap.jsonBuildObject.value).features != null ) {
				console.log("resultData.popMoveDefaultMap : ", resultData.popMoveDefaultMap)
				//전입, 전출 지도차트 함수 호출
				fn_popMoveMapSgguChart(JSON.parse(resultData.popMoveMap.jsonBuildObject.value), resultData.popMoveMapData, resultData.popMoveMapRange, param.sort, JSON.parse(resultData.popMoveDefaultMap.jsonBuildObject.value));
			}else{
				var layerId = "result";
				
				$("#mapLegend").html('');
				alert("지도 데이터가 없습니다.	");
			}
			map.setLayoutProperty('vworld', 'visibility', 'none');
		})
	}
	
	//전집, 전출 지도 차트 함수
	function fn_popMoveMapSgguChart(mapData, data, range, sort, ujbMap){
		var column = "";
		var areaNm = ""
		if( sort == 1 ){
			column = 'trrn_pop_cnt';
			$("#sortText")[0].innerHTML = "전입";
		}else{
			column = 'mvt_pop_cnt';
			$("#sortText")[0].innerHTML = "전출";
			
		}
		//
		map.setCenter([127.1742780924096, 37.526227059013635]);
		//sourceId, layerId, layerType, sourceType, style, columnNm
		console.log("map.getBounds(): ", map.getBounds())
		var style = fn_getStyle(column, range);
		var ujbStyle = { 
				"fill-color": "red",
				//"fill-outline-color" : 'rgba(' + colorPick.convertToRGB(color)[0] + ',' + colorPick.convertToRGB(color)[1] + ',' + colorPick.convertToRGB(color)[2] + ',1)',
				// "fill-antialias" : true,
		        'fill-opacity': 0.5,
		        "fill-outline-color" : '#c3c3c3',
	           };
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'sggu_nm');
		mapUtil.addLayer(ujbMap, 'ujb', 'ujb', 'fill', 'geojson', ujbStyle, 'sggu_nm');
		//mapUtil.addGeoServerLayer('cmm_sgg_bndr', 'cmm_sgg_bndr', 'cmm_sgg_bndr', '', '', 'sgg_nm')
		map.moveLayer('result' , 'result_text');
		map.moveLayer('ujb' , 'ujb_text');
	}
	
	fn_popInOutData()
})



var map = new mapboxgl.Map({
	container: 'extendMap',
	//center: [127.039054678593,37.7325924013584],
	center: [127.06842172797701, 37.63619329481321],
	zoom: 8.6,
	//pitch: 40,
	//bearing: 20,
	//antialias: true,
	//화면 기울기설정(2,3D)
	pitchWithRotate: false,
	dragRotate: false,
	dragPan: false,
	preserveDrawingBuffer: false,
	//maxBounds : [[126.88775478671477, 37.68550996229325], [127.24908866924005, 37.78684195414009]],
	//maxBounds : [[126.14540274682334, 36.889307844993056], [128.20315343799994, 39.06060217757105]],
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
			},
			//visibility: "none"
		},
		layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18, visibility: "none"}],
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
			//"fill-outline-color" : 'rgba(' + colorPick.convertToRGB(color)[0] + ',' + colorPick.convertToRGB(color)[1] + ',' + colorPick.convertToRGB(color)[2] + ',1)',
			// "fill-antialias" : true,
	        'fill-opacity': 1,
	        "fill-outline-color" : '#c3c3c3',
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
