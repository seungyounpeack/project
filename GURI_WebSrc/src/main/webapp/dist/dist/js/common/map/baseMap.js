//지도 객체 정의
var baseMap = {
		vworldBase :  {
			version: 8, 
			sources: {
				vworld: {
					type: "raster", 
					tiles: ['https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png'], 
					tileSize: 256, attribution:""
						}
					},
			layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}]
	},
	vworldGray :  {
			version: 8, 
			sources: {
				vworld: {
					type: "raster", 
					tiles: ['https://xdworld.vworld.kr/2d/gray/service/{z}/{x}/{y}.png'], 
					tileSize: 256, attribution:""
						}
					},
			layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}]
	},
	vworldSatellite :  {
			version: 8, 
			sources: {
				vworld: {
					type: "raster", 
					tiles: ['https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg'], 
					tileSize: 256, attribution:""
				}
			},
			layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}]
	},
	vworldHybrid :  {
			version: 8, 
			sources: {
				vworld: {
					type: "raster", 
					tiles: ['https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png'], 
					tileSize: 256, attribution:""
				}
			},
			layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}]
	}
}


//배경지도 변경
function fn_changeBaseMap(layerId) {
	var mapId = layerId.replace("vworld", "");
	var url = "http://xdworld.vworld.kr:8080/2d/" + mapId + "/service/{z}/{x}/{y}";
	if( mapId == 'Satellite' || mapId == 'Hybrid' ) {
		url += ".jpeg";
	}else if( mapId == 'dark_all' ){
		url = "https://x.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png";
	}else{
		url += ".png";
	}
	
	
	map.style.getSource("vworld").tiles = [url];
	map.style.sourceCaches['vworld'].clearTiles();
	map.style.sourceCaches['vworld'].update(map.transform);
	map.triggerRepaint();
	
	var imgUrl = $("#"+layerId).attr("src");
	
	$("#"+tagID.mapNowInfo).attr("src", imgUrl);
	
	if( $(".mapTypeBox").hasClass('on') ) {
		$(".mapTypeBox").removeClass('on');
	}
}

//지도 변경 옵션 오픈
$("#"+tagID.mapChangeInfo).on('click', function clickHandler(e) {
	console.log("this : ", $(this).attr('class'))
    $('.map_select_box').toggleClass('closed');
});