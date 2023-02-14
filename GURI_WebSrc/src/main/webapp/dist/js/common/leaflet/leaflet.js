proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs');

function Map(options) {
	this.layers = [];
	this.wmsLayers = [];
	this.draws = [];

	var renderer = L.canvas({ padding: 0.5 });
	
	// 브이월드 기본
	this.vworldBaseLayer = L.tileLayer('http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png', {
		maxZoom: 18,
		id: 'vworldBase'
	});

	// 브이월드 영상
	this.vworldSatelliteLayer = L.tileLayer('http://xdworld.vworld.kr:8080/2d/Satellite/service/{z}/{x}/{y}.jpeg', {
		maxZoom: 18,
		id: 'vworldSatellite'
	});
	this.vworldHybridLayer = L.tileLayer('http://xdworld.vworld.kr:8080/2d/Hybrid/service/{z}/{x}/{y}.png', {
		maxZoom: 18,
		id: 'vworldHybrid'
	});

	// 브이월드 야간
	this.vworldNightLayer = L.tileLayer('http://xdworld.vworld.kr:8080/2d/midnight/service/{z}/{x}/{y}.png', {
		maxZoom: 18,
		id: 'vworldNight'
	});

	// 브이월드 흑백
	this.vworldGrayLayer = L.tileLayer('http://xdworld.vworld.kr:8080/2d/gray/service/{z}/{x}/{y}.png', {
		maxZoom: 18,
		id: 'vworldGray'
	});
	
	var epsg5179 = new L.Proj.CRS(
		'EPSG:5179',
		'+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
		{
			resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
			origin: [90112, 1192896],
			bounds: L.bounds([90112, 1192896], [1990673, 2761664])
		}
	);
	
	this.map = L.map(options.element, {
		renderer: L.canvas(),
		//crs: epsg5179
		crs: L.CRS.EPSG3857
	}).setView([36.6, 127.5], 10);
	
	this.map.addLayer(this.vworldBaseLayer);

	this.addLayer('baseLayer', true);
	this.addLayer('areaLayer', true);
}

// 배경지도 설정
Map.prototype.changeBaseMap = function(layerId) {
	this.map.removeLayer( this.vworldBaseLayer );
	this.map.removeLayer( this.vworldHybridLayer );
	this.map.removeLayer( this.vworldSatelliteLayer );
	this.map.removeLayer( this.vworldNightLayer );
	this.map.removeLayer( this.vworldGrayLayer );
	if( layerId == "base" ) {
		this.map.addLayer( this.vworldBaseLayer );
		this.vworldBaseLayer.bringToBack();
	}
	else if( layerId == "hybrid" ) {
		this.map.addLayer( this.vworldSatelliteLayer );
		this.map.addLayer( this.vworldHybridLayer );
		this.vworldHybridLayer.bringToBack();
		this.vworldSatelliteLayer.bringToBack();
	}
	else if( layerId == "midnight" ) {
		this.map.addLayer( this.vworldNightLayer );
		this.vworldNightLayer.bringToBack();
	}
	else if( layerId == "gray" ) {
		this.map.addLayer( this.vworldGrayLayer );
		this.vworldGrayLayer.bringToBack();	
	}
}

//레이어 선택
Map.prototype.getLayer = function( layerId ) {
	var layer = null;
	$.each( this.layers, function(index, item) {
		if( item.id == layerId ) 
			layer = item;
	})
	return layer;
}

//레이어 추가
Map.prototype.addLayer = function(id, clearEnabled) {
	var layer = L.featureGroup([], {id:id});
	layer.id = id;
	console.log("addLayer", layer);
	this.map.addLayer( layer );
    this.layers.push( layer );
}

//레이어 지우기
Map.prototype.layerClear = function(layerId) {
	$.each( this.layers, function(index, item) {
		if( item.id == layerId ) 
			item.clearLayers();
	})
}

//지도 기본설정
var map = new Map({
	element: "map",
	center: [127.1162364586035, 37.40732846258282],
	extent: [12518550.744433021, 3410925.950197707, 16975135.241571937, 5639218.198767166],
	zoom: 13,
	extentChange: function(zoom) {
		updateBlockArea();
//		console.log("extentChange", visible, $("#chk_area").is(":checked"));
	},
	roadviewStart: function() {
		document.querySelector('.content-wrapper').classList.add('roadViewOn');
		map.updateSize();
	}
});

//배경지도 선택 이벤트
$("#sel_baseMap").change(function() {
	map.changeBaseMap( $(this).val() );
});

//시군구 조회
var paramCode = {};
paramCode = [{codeType:"SIG",  groupCode:"",    parentCode:"", defaultValue:"",  defaultText:"모두"}];

UT.getCommonCode(paramCode, function(resultList){
	var html = "";
	html += '<option value="">-시군구-</option>';
	$.each(resultList.SIG, function(index, item) {
		html += '<option value="'+item.id+'">'+item.text+'</option>';
	})
	$(".sel_sig").html(html);
	/*
    $(".sel_sig").select2({
    	placeholder: "모두",
    	allowClear: true,
    	minimumResultsForSearch:-1,
    	data:resultList.SIG
    });
    */
});

//시군구 선택 이벤트
$(".sel_sig").change(function() {
	$(".sel_sig").val( $(this).val() );
	map.layerClear("areaLayer");
	
	// 공통 코드 조회
	var paramCode = {};
	paramCode = [{codeType:"ADM", groupCode:"", parentCode:$(this).val(), defaultValue:"", defaultText:"전체"}];
	
    UT.getCommonCode(paramCode, function(resultList){
    	var html = "";
    	html += '<option value="">-읍면동-</option>';
    	$.each(resultList.ADM, function(index, item) {
			html += '<option value="'+item.id+'">'+item.text+'</option>';
		})
		$(".sel_emd").html(html);
    	/*
        $(".sel_emd").select2({
        	placeholder: "모두",
        	allowClear: true,
        	minimumResultsForSearch:-1,
        	data:resultList.ADM
        });
        */
    });
});

//이동 클릭 이벤트
$("#btn_move").click(function() {
	// 읍면동 선택시
	map.layerClear("areaLayer");
	if( $(".sel_emd").val() != "" ) {
		UT.request('/gis/selectEMDWkt.do', {hcode: $(".sel_emd").val()}, function(resultData){
			var layer = map.getLayer('areaLayer');

            var geojson = Terraformer.WKT.parse(resultData.emdWkt.wkt);
            console.log("geojson", geojson);
			var feature = { "type": "Feature", 'properties': {}, "geometry": geojson };
			feature.crs = {
				type: "name",
			    properties: {
			    	name: "EPSG:3857"
			    }
			}
			L.Proj.geoJson(feature).addTo(map);
			
//			layer.addLayer(feature);

            console.log("map", map.map);
	            console.log("feature", feature);

            // Create a geojson layer with our new geojson object

//            var bounds = geojson.bbox();

            // fit the map tp the bounds of the fire.
//            map.map.fitBounds([ [bounds[1], bounds[0]], [bounds[3], bounds[2]] ]);
			
//			var wicket = new Wkt.Wkt();
//			wicket.read(resultData.emdWkt.wkt);
//			console.log("wicket", wicket);
//			var feature = { "type": "Feature", 'properties': {}, "geometry": wicket.toJson() };
////
//			console.log("feature", feature);
//			//layer.addLayer(feature);
//			feature.addTo(map.map);
////			layer.addTo(feature);

			// "greenIcon from official documentation noted above.
			
			
//			var feature = map.wktToFeature( resultData.emdWkt.wkt );
//	    	layer.getSource().addFeature(feature);
//			map.map.getView().fit(feature.getGeometry().getExtent());
		})
		return;
	}
	
	// 시군구 선택시
	if( $(".sel_sig").val() != "" ) {
		UT.request('/gis/selectSIGWkt.do', {sigCd: $(".sel_sig").val()}, function(resultData){
			var layer = map.getLayer('areaLayer');
			console.log("layer", layer);
//			var feature = map.wktToFeature( resultData.sigWkt.wkt );
//	    	layer.getSource().addFeature(feature);
//			map.map.getView().fit(feature.getGeometry().getExtent());
		})
		return;
	}
	UT.showAlert("분석영역을 선택해주세요");
});