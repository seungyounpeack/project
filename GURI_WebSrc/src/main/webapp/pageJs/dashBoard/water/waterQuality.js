var loading = $.loading();
//레이어 리스트
var layerList = [];



//레이어 소스 리스트
var sourceList = [];
$(function(){
	document.body.style.zoom = "100%";
	/*map.on("load", function(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	})*/
	
	function fn_param(){
		var param = {};
		var condition = "";
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//누적 통계  변경시 수질 데이터 불러오기
	function fn_waterQualityData(){
		var url = "/dashBoard/water/waterQualityData.do";
		
		Util.request(url, null, function(resultData){
			console.log("resultData : ", resultData)
			
			//수질 현황 지도  데이터 조회
			fn_waterQualityMap(JSON.parse(resultData.waterQualityMap.jsonBuildObject.value));
			
			//수질현황 데이터 조회
			fn_waterQualityStatus(resultData.waterQualityStatus);
			
			//누적 통계 수질 데이터 조회
			fn_waterQualityTotal(resultData.waterQualityTotal);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		})
	}
	//누적 통계 수질 데이터 불러오기
	function fn_waterQualitySearchData(){
		
		
		var param = fn_param();
		if( param == null )
		
			console.log("param : ", param)
		var url = "/dashBoard/water/waterQualitySearchData.do";
		
		Util.request(url, param, function(resultData){
			
			
			//누적 통계 수질 데이터 조회
			fn_waterQualityTotal(resultData.waterQualityTotal);
			
		})
	}
	
	fn_waterQualityData();
	
	//수질 현황 지도  데이터 조회
	function fn_waterQualityMap(mapData, range){
		var column = "";
		var areaNm = ""
		var style = fn_getStyle('sort', range);
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'admd_nm');
		map.moveLayer('result' , 'result_text');
		
		console.log("map.getBounds", map.getBounds())
	}
	
	////수질현황 데이터 조회
	function fn_waterQualityStatus(data){
		var html = '';
		var html2 = '';
		$("#sort1").html('');
		$("#sort2").html('');
		
		console.log("수질현황 data : ", data)
		
		if( data.length > 0 ){
			var img1 = "";
			var img2 = "";
			var img3 = "";
			for( var i = 0 ; i < data.length; i++ ){
				
				if( data[i].atrb04 == 1 ) {
					img1 = "ico_water_good.svg";
				}else if( data[i].atrb04 == 2 ){
					img1 = "ico_water_bad.svg";
					
				}else{
					img1 = "ico_water_un.svg";
					
				}
				
				if( data[i].atrb05 == 1 ) {
					img2 = "ico_water_good.svg";
				}else if( data[i].atrb05 == 2 ){
					img2 = "ico_water_bad.svg";
					
				}else{
					img2 = "ico_water_un.svg";
				}
				
				if( data[i].atrb06 == 1 ) {
					img3 = "ico_water_good.svg";
				}else if( data[i].atrb06 == 2 ){
					img3 = "ico_water_bad.svg";
					
				}else{
					img3 = "ico_water_un.svg";
				}
				
				
				if( data[i].stacSe == "덕소정수장" ){
					html2 += '<dt>'+data[i].stacSe+'<br><span class="tiny_12 c_gray">측정일시 : '+data[i].stacYmd+'</span></dt>';
					html2 += '<dd><img src="/dist/images/water/'+img1+'" alt="" /><br><span class="wq_stitle">잔류염소 ('+data[i].atrb01+')</span></dd>';
					html2 += '<dd><img src="/dist/images/water/'+img2+'" alt="" /><br><span class="wq_stitle">Ph ('+data[i].atrb02+')</span></dd>';
					html2 += '<dd><img src="/dist/images/water/'+img3+'" alt="" /><br><span class="wq_stitle">탁도 ('+data[i].atrb03+')</span></dd>';
				}else{
					html += '<dt>'+data[i].stacSe+'<br><span class="tiny_12 c_gray">측정일시 : '+data[i].stacYmd+'</span></dt>';
					html += '<dd><img src="/dist/images/water/'+img1+'" alt="" /><br><span class="wq_stitle">잔류염소 ('+data[i].atrb01+')</span></dd>';
					html += '<dd><img src="/dist/images/water/'+img2+'" alt="" /><br><span class="wq_stitle">Ph ('+data[i].atrb02+')</span></dd>';
					html += '<dd><img src="/dist/images/water/'+img3+'" alt="" /><br><span class="wq_stitle">탁도 ('+data[i].atrb03+')</span></dd>';
					
				}
			}
		}
		$("#sort1").html(html2);
		$("#sort2").html(html);
	}
	
	//누적 통계 수질 데이터 조회
	function fn_waterQualityTotal(data){
		
		$(".add_note").text("(" + data[0].stacYmd + ")");
		
		//누적 통계 수질   chart data 객체 - 덕소정수장 
		var waterQualityTotalData = {};
		//누적 통계 수질   chart data 객체 - 와부정수장 
		var waterQualityTotalData2 = {};
		var resultData1 = [];
		var resultData2 = [];
		
		for( var i = 0 ; i < data.length; i++ ){
			
			if( data[i].stacSe == '덕소정수장' ){
				resultData1.push(data[i]);
			}else{
				resultData2.push(data[i]);
			}
			
		}
		console.log("resultData : ", resultData1)
		waterQualityTotalData.data = resultData1;
		waterQualityTotalData.dataFieldsCategory = "stacTp";
		waterQualityTotalData.dataFieldsValue = "atrb01";
		waterQualityTotalData.dataFieldsValue2 = "atrb02";
		waterQualityTotalData.dataFieldsValue3 = "atrb03";
		
		waterQualityTotalData2.data = resultData2;
		waterQualityTotalData2.dataFieldsCategory = "stacTp";
		waterQualityTotalData2.dataFieldsValue = "atrb01";
		waterQualityTotalData2.dataFieldsValue2 = "atrb02";
		waterQualityTotalData2.dataFieldsValue3 = "atrb03";
		var waterQualityTotalChChart = CHART.dashBoard_water_qualityTotalCh("waterQualityTotalCh", waterQualityTotalData);
		var waterQualityTotalAcChart = CHART.dashBoard_water_qualityTotalAc("waterQualityTotalAc", waterQualityTotalData);
		var waterQualityTotalTuChart = CHART.dashBoard_water_qualityTotalTu("waterQualityTotalTu", waterQualityTotalData);
		var waterQualityTotalChChart2 = CHART.dashBoard_water_qualityTotalCh("waterQualityTotalCh2", waterQualityTotalData2);
		var waterQualityTotalAcChart2 = CHART.dashBoard_water_qualityTotalAc("waterQualityTotalAc2", waterQualityTotalData2);
		var waterQualityTotalTuChart2 = CHART.dashBoard_water_qualityTotalTu("waterQualityTotalTu2", waterQualityTotalData2);
	}
	
	$('.stab_link').click(function () {
		var tab_id = $(this).attr('data-tab');

		$('.stab_link').removeClass('on');
		$('.stab_content').removeClass('on');

		$(this).addClass('on');
		$("#" + tab_id).addClass('on');
		
		//누적통계 데이터 함수 호출
		fn_waterQualitySearchData();
	});
	
})


var map = new mapboxgl.Map({
	container: 'waterMap',
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
		"#3bbdc8",
		"#3a8db6",
		"#f5ce7d",
	];
	var range = [];
	
	colorList.forEach(function(item, index){
		
		var data = [];
		data.push((index+1));
		data.push(colorList[index]);
		
		range.push(data);
	})
	//범례 생성 함수 호출
	fn_createLegend(colorList);
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
	console.log("style : ", style)
	return style;
}

//범례생성함수 
function fn_createLegend(color){
	var html = '';
	$("#mapLegend").html(html);
	html += '<ul>';
	html +='<li><span class="rm01"></span>덕소정수장</li>';
	html +='<li><span class="rm02"></span>와부정수장</li>';
	html +='<li><span class="rm03"></span>기타</li>';
		/*html += '<div style="margin-bottom : 5px; width: 15px; height: 15px; margin-left: 10px; background-color: ' + color[i] + ';">';
		html += '<span style="display: inline=block; margin-left: 20px; font-size:12px; width:100px;">' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</span>';
		html += '</div>';*/
	
	html += '</ul>';
	
	$("#mapLegend").html(html);
}