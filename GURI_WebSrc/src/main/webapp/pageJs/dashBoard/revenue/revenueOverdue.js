var loading = $.loading();
//레이어 리스트
var layerList = [];



//레이어 소스 리스트
var sourceList = [];
$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	// 의정부시 전체 데이터 조회
	$("#btnTotalSearch").click(function() {
		fn_revnOverdueData();
		
		var param = {admdName: "의정부시"};
		fn_changeName(param)
	});
	
	function fn_param(){
		var param = {};
		var date = $("#startDate").val();
		var condition = "";
		if( date != null ){
			
			condition += "AND STDR_YM = "+ date +"::text";
		}
		param.startDate = $("#startDate").val();
		param.sort = $("input[name='iptDue']:checked").val();
		param.condition = "AND crtr_ym = "+ date +"::text";
		return param;
	}
	
	//인구 통계 데이터 호출 함수
	function fn_revnOverdueData(){
		
		
		var param = fn_param();
		if( param == null )
		
			console.log("param : ", param)
		
		var url = "/dashBoard/revenue/revenueOverdueData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			var dateString = "";
			if( param.startDate ) {
				dateString += param.startDate.substr(0,4) + "년 ";
				$(".searchYear").text(dateString);
			}
			
			var mapData = JSON.parse(resultData.revnOverdueMap.jsonBuildObject.value);
			//체납 및 수납 현황 지도  데이터 조회
			if( mapData.features != null ){
				
				fn_revnOverdueMap(JSON.parse(resultData.revnOverdueMap.jsonBuildObject.value), JSON.parse(resultData.defaultMap.jsonBuildObject.value), resultData.revnOverdueMapRange);
			}else{
				alert("행정동별 체납 및 수납 현황 데이터가 없습니다.");
			}
			
			//체납 및 수납 현황 테이블 데이터 조회
			fn_revnOverdueTable(resultData.revnOverdueTable);
			
			//연도별 체납/수납 현황 데이터 조회
			fn_revnOverdueYear(resultData.revnOverdueYear);
			
			//세목별 체납/수납 현황  데이터 조회
			fn_revnOverdueStatus(resultData.revnOverdueStatus);
			
			//조건별 name 변경
			fn_changeName(param);
			fn_changeSortName(param);
			
		})
		
	}
	
	fn_revnOverdueData();
	
	//span name 변경
	function fn_changeName(data){
		var tag = document.getElementsByClassName('searchName');
		if( tag.length > 0 ){
			for( var i = 0 ; i < tag.length; i++ ){
				if( data.admdName == undefined ){
					
					tag[i].innerHTML = "의정부시";
				}else{
					
					tag[i].innerHTML = data.admdName;
				}
			}
		}
		
	}
	
	//span name 변경
	function fn_changeSortName(data){
		var tag = document.getElementsByClassName('sortName');
		if( data.sort == 1 ){
			
			if( tag.length > 0 ){
				for( var i = 0 ; i < tag.length; i++ ){
					tag[i].innerHTML = "체납";
				}
			}
		}else{
			if( tag.length > 0 ){
				for( var i = 0 ; i < tag.length; i++ ){
					tag[i].innerHTML = "수납";
				}
			}
		}
		
	}
	
	//지도 클릭시 데이터 로딩
	function fn_mapClickData(param){
		console.log("param : ", param)
		if(param.chkVal == 0 || param.chkVal == undefined || param.chkVal == null){
			alert("데이터가 존재하지 않습니다.");
			return false;
		}else{
		/*if(param.code)*/
		var url = "/dashBoard/revenue/revenueOverdueSearchData.do";
		Util.request(url, param, function(resultData){
			//체납 및 수납 현황 테이블 데이터 조회
			fn_revnOverdueTable(resultData.revnOverdueTable);
			
			//연도별 체납/수납 현황 데이터 조회
			// fn_revnOverdueYear(resultData.revnOverdueYear);
			
			//세목별 체납/수납 현황  데이터 조회
			fn_revnOverdueStatus(resultData.revnOverdueStatus);
			
			fn_changeName(param);
			})
		}
	}
	
	//지도 클릭 이벤트
	function fn_mapPictureLayerFeature(e) {
		var objectKey = Object.keys(e.features[0].properties);
		var objectValue = Object.values(e.features[0].properties);
		console.log("obejctValue : ", e.features[0]);
		console.log("objectKey : ", objectKey);
		console.log("objectValue : ", objectValue);
		var param = {};
		param.chkVal = e.features[0].properties.value;
		param.code = e.features[0].properties.dong_cd;
		param.admdName = e.features[0].properties.admd_nm;
		param.startDate = $("#startDate").val();
		param.sort = $("input[name='iptDue']:checked").val();
		//지도 클릭시 데이터 로딩 함수 호출
		fn_mapClickData(param)
	}	
	
	//체납 및 수납 현황 지도  데이터 조회
	function fn_revnOverdueMap(mapData, defaultData, range){
		var column = "";
		var areaNm = ""
		var style = fn_getStyle('value', range);
		mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'admd_nm');
		map.moveLayer('result' , 'result_text');
		
		map.off('click', 'result', fn_mapPictureLayerFeature);
		mapUtil.mapFeatureClick(map, true, 'result', fn_mapPictureLayerFeature);
		console.log("map.getBounds", map.getBounds())
	}
	
	//체납 및 수납 현황 테이블 데이터 조회
	function fn_revnOverdueTable(data){
		var html = '';
		$("#revnOverdueTable").html('');
		
		html += '<caption>체납현황 리스트 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="10%" />';
		html += '<col width=" " />';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '</colgroup>';
		html += '<tbody>';
		data.forEach(function(item, index){
			
			html += '<tr>';
			html += '<td>'+(index+1)+'</td>';
			html += '<td>'+item.stacTp+'</td>';
			html += '<td class="t_r">'+item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td class="t_r">'+item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td class="t_r">'+item.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		})
		html += '</tbody>';
		html += '';
		html += '';
		html += '';
		html += '';
		html += '';
		html += '';
		html += '';
		$("#revnOverdueTable").html(html);
	}
	
	//연도별 체납/수납 현황 데이터 조회
	function fn_revnOverdueYear(data){

		//연도별 세입징수 추이  chart data 객체
		var revnOverdueYearData = {};
		var resultData = [];
		
		revnOverdueYearData.data = data;
		revnOverdueYearData.dataFieldsCategory = "stacYmd";
		revnOverdueYearData.dataFieldsValue = "atrb01";
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var revnOverdueYearChart = CHART.dashBoard_revn_overdueYear("revnOverdueYear", revnOverdueYearData);
	}
	
	//세목별 체납/수납 현황  데이터 조회
	function fn_revnOverdueStatus(data){
		//chart data 객체
    	var revnOverdueStatuseData = {};
    	
    	var resultData = [];
    	//var admdName = [];
    	for( var i = data.length-1 ; i > -1; i-- ){
    		resultData.push(data[i]);
    	}
    	revnOverdueStatuseData.data = resultData;
    	revnOverdueStatuseData.dataFieldsCategory = "stacTp";
    	//popRegServiceData.dataFieldsCategory2 = "admdNm";
    	revnOverdueStatuseData.dataFieldsValue = "atrb01";
		var revnOverdueStatusChart = CHART.dashBoard_revn_overdueStatus("revnOverdueStatus", revnOverdueStatuseData);
	}
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_revnOverdueData();
    });
	
	//수납 라디오버튼 클릭시
	$("#iptDueIn").on("click", function(){
		fn_revnOverdueData();
	})
	
	//체납 라디오 버튼 클릭시
	$("#iptDueOut").on("click", function(){
		fn_revnOverdueData();
	})
	
	
})


var map = new mapboxgl.Map({
	container: 'revnMap',
	//center: [127.039054678593,37.7325924013584],
	center: [127.06842172797701, 37.73619329481321],
	zoom: 10,
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
	//화면창에 따라 지도 크기 조절
	trackResize : true,
	doubleClickZoom : false,
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
		"#f8d9cd",
		"#efa186",
		"#e6744e",
		"#c7502e",
		"#99381e"
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
		html +='<li><span class="rm0'+(i+1)+'"></span>' + parseInt(range[i].fromValue/1000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '~' + parseInt(range[i].toValue/1000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' (백만)</li>';
		/*html += '<div style="margin-bottom : 5px; width: 15px; height: 15px; margin-left: 10px; background-color: ' + color[i] + ';">';
		html += '<span style="display: inline=block; margin-left: 20px; font-size:12px; width:100px;">' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</span>';
		html += '</div>';*/
	}
	
	html += '</ul>';
	
	$("#mapLegend").html(html);
}