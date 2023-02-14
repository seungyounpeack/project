var modes = MapboxDraw.modes;
	//modes = MapboxDrawGeodesic.enable(modes);
	/*modes.draw_rectangle = DrawRectangle.default;*/
	//modes.draw_circle = DrawCircle.default;
	
	//modes.draw_circle = DrawCircle.default;
const RadiusMode = MapboxDraw.modes.draw_line_string;
//draw 기능
var draw = new MapboxDraw({
	modes: modes,
	displayControlsDefault: false,
	controls: {
	//draw_rectangle: true,
	polygon: true,
	line_string: true,
	draw_circle: true,
	trash: true,
	}


});

var roadViewMarker = null;
var popup = new mapboxgl.Popup({ closeOnClick: false });
var marker = new mapboxgl.Marker({
	//색상
	color : 'red' ,
	//크기
	scale : 1 ,
	//그래그 설정
	draggable : false,
});
console.log("marker : ", marker)
var markerList = [];
/** **************************** 2. 지도 영역 ***************************** */
map.on('load', function () {
	//그리기 객체 삽입
	map.addControl(draw);
	//그린 후 콜백 함수 호출
	map.on('draw.update', fn_getAll);
	map.on('draw.modechange', fn_getAll);
	/*draw.options.boxSelect = false;
	draw.options.touchEnabled = false;
	draw.options.keybindings = false;
	draw.options.defaultMode = '';
	draw.options.touchBuffer = 0;
	draw.options.clickBuffer = 0;
	draw.options.clickBuffer = 0;
	
	delete draw.modes.DIRECT_SELECT;
	//delete draw.modes.SIMPLE_SELECT;
	delete draw.options.modes.simple_select;
	delete draw.options.modes.direct_select;*/
	//draw컨트롤러 숨김
	$(".mapboxgl-ctrl-top-right").css("display", "none");
	
});


//그리기 데이터 콜백함수
function fn_getAll(e){
	
	var data = draw.getAll();
	var drawCnt = draw.getAll().features.length;
	var type = draw.getAll().features[drawCnt-1].geometry.type;
	console.log("data : ", data)
	console.log("type : ", type)
	//그린 영역 geometry
	var coordinate = null;
	
	//그리기 마지막 포인트
	var labelPoint = null;
	
	//geometry 개수
	var coordinateCnt = null;
	
	

	if( type == 'Polygon' ) {
		coordinate = draw.getAll().features[drawCnt-1].geometry.coordinates[0];
		coordinateCnt = draw.getAll().features[drawCnt-1].geometry.coordinates[0].length;
		labelPoint = coordinate[coordinateCnt-2];
	}else if( type == 'LineString' ){
		coordinate = draw.getAll().features[drawCnt-1].geometry.coordinates;
		coordinateCnt = draw.getAll().features[drawCnt-1].geometry.coordinates.length;
		labelPoint = coordinate[coordinateCnt-1];
	}
	
	var lngLat = new mapboxgl.LngLat(labelPoint[0], labelPoint[1]);
	popup.remove();
	
	//console.log("popup" , popup)
	switch(type){
		case "Polygon" :
			//polygon 면적 구하는 함수 호출
			fn_calculationPolygon(data, lngLat)
			break;
		case "LineString" : 
			
			//line 길이 구하는 함수 호출
			fn_calculationLine(coordinate, lngLat);
			break;
	}
}

//draw line 거리 계산
/**
* draw line 거리 계산
* @param data : line geometry
* @param point : 팝업 위치
* @returns
*/
function fn_calculationLine(data, point){
	var line = turf.lineString(data);
	var length = turf.length(line, {units: 'kilometers'}).toFixed(2);
	var html = length+' Km</sup>';
	
	popup.setLngLat(point)
	.setHTML(html)
	.addTo(map);
	console.log("data : ", data);
	console.log("length : ", length)
}

//draw polygon 면적 계산
/**
* draw polygon 면적 계산
* @param data : polygon geometry
* @param point : 팝업 위치
* @returns
*/
function fn_calculationPolygon(data, point){
	var area = turf.area(data);
	// restrict to area to 2 decimal points
	var roundedArea = (Math.round(area * 100) / 100)/1000000;
	var html = roundedArea.toFixed(2)+' Km<sup>2</sup>';
	//var popup = new mapboxgl.Popup({ closeOnClick: false })
	popup.setLngLat(point)
	.setHTML(html)
	.addTo(map);
	console.log("roundedArea : ", roundedArea);
}

//지도 새로고침 지도 마커 지우기
$("#"+tagID.mapClearInfo).on('click', function(){
	marker.remove();
	roadViewMarker.remove();
})



/*//지도 줌레벨 확대
$("#"+tagID.mapZoomIncreInfo).click(function(){
	mapUtil.zoomEvent('+');
});

//지도 줌레벨 축소
$("#"+tagID.mapZoomDecreInfo).click(function(){
	mapUtil.zoomEvent('-');
});



//line 그리기
$("#"+tagID.mapDrawLineInfo).click(function(){
	
	draw.changeMode('draw_line_string');
	
});

//다각형 그리기
$("#"+tagID.mapDrawPolyInfo).click(function(){
	
	draw.changeMode('draw_polygon');
});

//원 그리기
$("#"+tagID.mapDrawCircleInfo).click(function(){
	
	draw.changeMode('draw_circle');
});

//사각형 그리기
$("#"+tagID.mapDrawRectInfo).click(function(){
	
	draw.changeMode('draw_rectangle');
	//map.on('draw.modechange', fn_getAll);
});

//도형 지우기
$("#"+tagID.mapDrawRemoveInfo).click(function(){
	// 선택한 도형 지우기
	// draw.trash();
	
	// 도형 전체 지우기
	console.log("draw : ", draw.options.touchEnabled)
	draw.deleteAll();
	popup.remove();
});

//도형 지우기
$("#"+tagID.mapClearInfo).click(function(){
	// 선택한 도형 지우기
	// draw.trash();
	
	// 도형 전체 지우기
	//draw.deleteAll();
});
*/
//지도 다운로드 함수
$("#"+tagID.mapSaveInfo).click(function(){
	var today = new Date();   

	var year = today.getFullYear(); // 년도
	var month = Util.addZero(today.getMonth() + 1);  // 월
	var date = Util.addZero(today.getDate());  // 날짜
	//var day = Util.addZero(today.getDay());  // 요일
	var hours = Util.addZero(today.getHours()); // 시
	var minutes = Util.addZero(today.getMinutes());  // 분
	var seconds = Util.addZero(today.getSeconds());  // 초
	
	var link = document.createElement("a");
	//지도 img 객체
    link.href = map.getCanvas().toDataURL();
    link.download =  "screenshot_" + year + month + date + hours + minutes + seconds +".png";
    link.click();
})


//map 클릭하면 마커 추가 + 로드뷰 함수 호출 
function fn_mapClick(){
	$("#btnRoadView").attr('disabled', true);
	var lng;
	var lat;
	
	map.once('click',function(e){
		$("#btnRoadView").attr('disabled', false);
		lng = e.lngLat.lng;
		lat = e.lngLat.lat;
		if(roadViewMarker != null){
			roadViewMarker.remove();
		}
		roadViewMarker = new mapboxgl.Marker()
		.setLngLat([lng, lat])
		.addTo(map);
		fn_showRoadView(lng, lat);
		
	});
	
}

//로드뷰 생성
function fn_showRoadView(lng, lat){

//	map.setCenter(lng, lat);
	map.flyTo({
		center: [lng, lat]
	});
	var roadviewContainer = document.getElementById('roadViewDiv'); //로드뷰를 표시할 div
	var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
	var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

	var position = new kakao.maps.LatLng(lat, lng);

	// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
	roadviewClient.getNearestPanoId(position, 50, function(panoId) {
		if(panoId == null) {
			alert("해당 지역의 로드뷰가 없습니다.");
			layerOpenClose('showRoadView', false);
			return;
		}
	    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
	    layerOpenClose('showRoadView', true);
	});
	
	/////////////////////////////////////////////////////
}
