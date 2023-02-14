var loading = $.loading();

var layerList = [];
var sourceList = [];
$(function(){
	/*map.on("load", function(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	})*/
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	$('.dateSelect').on('dp.change', function(e){
		fn_economyCardData()
	})
	
	//지역산업 생태계 > 혁신동향 데이터 조회
	function fn_localEconomyData(){
		var url = "/dashBoard/economy/localEconomyData.do";
		Util.request(url, {dateYm: $("#startDate").val()}, function(resultData){
			fn_localEconomyCnt(JSON.parse(resultData.localEconomyCnt.jsonBuildObject.value), resultData.localEconomyRange, JSON.parse(resultData.localEconomyDefaultMap.jsonBuildObject.value));
			fn_localEconomyList(resultData.localEconomyList);
			fn_emdEconomy(resultData.emdEconomy);
			fn_emdStore(resultData.emdStore);
			fn_typeStore(resultData.typeStore);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		});
	}
	
	function fn_localEconomyCnt(mapData, range, defaultData ){
		map.setCenter([127.06842172797701, 37.73619329481321]);
		
		var style = fn_getStyle('shop_cnt', range);
		var highlightStyle = fn_getHighlightStyle('shop_cnt', range);
		mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#ffffff', 'fill-outline-color': '#000000'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'dong_nm');
		
		var selectedData = {
				"type": "FeatureCollection",
				"features": []
			};
		mapUtil.addLayer(selectedData, 'selectedLayer', 'selectedLayer', 'line', 'geojson', highlightStyle, 'dong_nm');
		map.moveLayer('result' , 'result_text');
	}
	
	function fn_localEconomyList(data) {
		$("#localEconomyList").html('');
		
		var html = '';
		html += '<caption>지역경제 상권 리스트 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="8%" />';
		html += '<col width="15%" />';
		html += '<col width="15%" />';
		html += '<col width="47%" />';
		html += '<col width="15%" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<tr style="cursor:pointer" data-trdanm="'+data[i].trdaNm+'">';
			html += '<td>'+(data.length-i)+'</td>';
			html += '<td>'+data[i].trdaNm+'</td>';
			html += '<td>'+data[i].trdaKd+'</td>';
			html += '<td class="t_l">'+data[i].toiInfo+'</td>';
			html += '<td>'+data[i].shopCnt+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#localEconomyList").html(html);
		$("#localEconomyList tr").click(function() {
			var trdanm = $(this).data("trdanm");
			
			var selectedData = {
				"type": "FeatureCollection",
				"features": []
			};
			var source = mapUtil.getSourceData("result");
			$.each(source.features, function(index, feature) {
				var attributes = feature.properties;
				if( attributes.trda_nm == trdanm ) {
					selectedData.features.push(feature);
				}
			});
			map.getSource('selectedLayer').setData(selectedData);
		})
	}
	
	function fn_emdEconomy(data) {
		var params = {
			type: 'bar',
			elementId: 'emdEconomy',
			animated: true,
			theme: 'dark',
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "270",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'stacSe',
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}%</span>'
			}],
			unit: '%',
			colors: ["#b07aa1"],
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_emdStore(data) {
		var params = {
			type: 'bar',
			elementId: 'emdStore',
			animated: true,
			theme: 'dark',
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "270",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'stacSe',
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}건</span>'
			}],
			unit: '%',
			colors: ["#b07aa1"],
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_typeStore(data) {
		var typeStatusData = {};
		typeStatusData.data = data;
		typeStatusData.dataFieldsCategory = "mainName";
		typeStatusData.dataFieldsValue = "sum";
		typeStatusData.dataFieldsCategory2 = "name";
		typeStatusData.dataFieldsValue2 = "value";
		CHART.dashBoard_revn_statusPie("typeStore", typeStatusData);
	}
	
	fn_localEconomyData();
})


var map = new mapboxgl.Map({
	container: 'localEconomyMap',
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
		"#003fde",
		"#34de00",
		"#f3f066",
		"#ff9331",
		"#d10003"
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

function fn_getHighlightStyle(columnNm, colorRange){
	var style = { 
		'line-color': 'rgba(0, 0, 0, 1)',
		'line-width': 2
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