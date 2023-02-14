
//로딩 객체
var loading = $.loading();

//레이어 리스트
var layerList = [];

//레이어 소스 리스트
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	
	$("#btnRefresh").click(function() {
		fn_getTrafficData();
	})
	
	var param = {};
	fn_getTrafficData();
	function fn_getTrafficData() {
		var dataList = [];
		var apiUrl = 'https://openapi.its.go.kr:9443/trafficInfo';
		var apiKey = "a8c1789ce3144a1c91cb42883bf1a2f9";
		apiUrl += "?apiKey=" + apiKey; //*공개키*/
		apiUrl += "&type=all"; 
		apiUrl += "&routeNo=1";
		apiUrl += "&drcType=all";
		apiUrl += "&minX=126.998407"; /*최소경도영역*/
		apiUrl += "&maxX=127.150597"; /*최대경도영역*/
		apiUrl += "&minY=37.685728"; /*최소위도영역*/
		apiUrl += "&maxY=37.778504"; /*최대위도영역*/
		apiUrl += "&getType=xml"; /*출력타입*/
		console.log("apiUrl : ", apiUrl);
		//업무상 get밖에 사용할수 없음. api연계쪽에서 get통신만 가능.
		 $.ajax({
	            method: "get",
	            url: apiUrl,
	            dataType : "text"
	        })
	            .done(function (resultData) {
	                console.log("Data Saved: " , resultData);
	                var parser=new DOMParser();
					var xmlDoc=parser.parseFromString(resultData,"text/xml");
					console.log("xmlDoc : " , xmlDoc);
					// 특정 테그를 기준으로 변수에 담는다
					var xml = xmlDoc.getElementsByTagName('item');
					var createdDate = xml[0].getElementsByTagName('createdDate')[0].childNodes[0].nodeValue;
					var yyyy = createdDate.substring(0,4);
					var mm = createdDate.substr(4,2);
					var dd = createdDate.substr(6,2);
					var hh = createdDate.substr(8,2);
					var min = createdDate.substr(10,2);
					var ss = createdDate.substr(12,2);
					var dateText = "(" + yyyy + "." + mm + "." + dd + ". " + hh + ":" + min + ":" + ss + " 기준)" ;
					$("#createdDate").text("(실시간 교통 현황)" + dateText);
					for (var i = 0; i < xml.length; i++) {
						var oneData = {};
						var roadName = xml[i].getElementsByTagName('roadName')[0].childNodes[0].nodeValue;
						var linkId = xml[i].getElementsByTagName('linkId')[0].childNodes[0].nodeValue;
						var speed = xml[i].getElementsByTagName('speed')[0].childNodes[0].nodeValue;
//						var createdDate = xml[i].getElementsByTagName('createdDate')[0].childNodes[0].nodeValue;
						oneData.roadName = roadName;
						oneData.linkId = linkId;
						oneData.speed = speed;
//						oneData.createdDate = createdDate;
						dataList.push(oneData);
					}
//					console.log("dataList :", dataList);

					var url = "/dashBoard/communication/communInfoData.do";
					Util.request(url, param, function(resultData){
						console.log("dataList : ", dataList);
						var trafficData = dataList;
						var linkData = JSON.parse(resultData['linkData'][0]['jsonBuildObject']['value']);
						fn_setTrafficLayer(trafficData, linkData);
					});
            });
		/*
		$.ajax({
			method : "get",							// http 요청 방식 (default: ‘GET’)
			type : "get",
			url : apiUrl,							// 요청이 전송될 url
//		data : param.data,								// 서버로 전달될 데이터 JSON 
			dataType : "text",						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
			async : true,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
//		contentType : "application/json",				// 서버에 데이터를 보낼 때 사용 content - type
			beforeSend:function(){
				// Loading bar Start
				if(false){
					loading.ajax(true);
					$("#divLoading").show();
				}
			},
			complete:function(){
				if(false){
					loading.close();
					$('#divLoading').hide();
				}
			},
			success : function(resultData){
				console.log("resultData1 : " , resultData);
				var parser=new DOMParser();
				var xmlDoc=parser.parseFromString(resultData,"text/xml");
				console.log("xmlDoc : " , xmlDoc);
				// 특정 테그를 기준으로 변수에 담는다
				var xml = xmlDoc.getElementsByTagName('item');
				for (var i = 0; i < xml.length; i++) {
					var oneData = {};
					var roadName = xml[i].getElementsByTagName('roadName')[0].childNodes[0].nodeValue;
					var linkId = xml[i].getElementsByTagName('linkId')[0].childNodes[0].nodeValue;
					var speed = xml[i].getElementsByTagName('speed')[0].childNodes[0].nodeValue;
					oneData.roadName = roadName;
					oneData.linkId = linkId;
					oneData.speed = speed;
					dataList.push(oneData);
				}
				console.log("dataList :", dataList);

				var url = "/dashBoard/communication/communInfoData.do";
				Util.request(url, param, function(resultData){
					console.log("dataList : ", dataList);
					var trafficData = dataList;
					var linkData = JSON.parse(resultData['linkData'][0]['jsonBuildObject']['value']);
					fn_setTrafficLayer(trafficData, linkData);
				});
			},
			error : function(request,status,error){
				console.log("B", JSON.stringify(request),status,error);
			},
			fail : function() {
				alert("인터넷 연결 상태를 확인해주세요.");
			}
		});
		*/
	}
	
	function fn_setTrafficLayer(trafficData, linkData){
//		console.log("linkData", linkData);
//		console.log("trafficData : ", trafficData);
		if(trafficData.length == 0) {
			alert("조회된 정보가 없습니다.");
			return;
		}
		
		for (var i = 0; i < linkData['features'].length; i++) {
			var linkId = linkData['features'][i]['properties']['link_id'];
			var roadRank = linkData['features'][i]['properties']['road_rank'];
			for (var j = 0; j < trafficData.length; j++) {
				var speed =  trafficData[j]['speed'];
				var apiLinkId =  trafficData[j]['linkId'];
//				console.log("linkId : ", linkId, " , apiLinkId : ", apiLinkId);
				
				if(linkId == apiLinkId) {
					linkData['features'][i]['properties']['speed'] = speed;
					var color = '';
					if(roadRank == "101") {//고속도로
						if(speed < 40) {
							color = '#e20b0b'//정체
						}
						else if(speed < 80) {
							color = '#fdc400'//서행
						}
						else if(speed >= 80) {
							color = '#06cf28'//원활
						}
						else {
							color = '#444'//정보없음
						}
					}
					else if(roadRank == "102") {//도시고속
						if(speed < 30) {
							color = '#e20b0b'//정체
						}
						else if(speed < 50) {
							color = '#fdc400'//서행
						}
						else if(speed >= 50) {
							color = '#06cf28'//원활
						}
						else {
							color = '#444'//정보없음
						}
					}
					else if(roadRank == "103") {//도시부
						if(speed < 15) {
							color = '#e20b0b'//정체
						}
						else if(speed < 25) {
							color = '#fdc400'//서행
						}
						else if(speed >= 25) {
							color = '#06cf28'//원활
						}
						else {
							color = '#444'//정보없음
						}
					}
					else if(roadRank == "107") {//지방부 >> 도시부
						/*if(speed < 30) {
							color = '#e20b0b'//정체
						}
						else if(speed < 50) {
							color = '#fdc400'//서행
						}
						else if(speed >= 50) {
							color = '#06cf28'//원활
						}
						else {
							color = '#444'//정보없음
						}*/
						if(speed < 15) {
							color = '#e20b0b'//정체
						}
						else if(speed < 25) {
							color = '#fdc400'//서행
						}
						else if(speed >= 25) {
							color = '#06cf28'//원활
						}
						else {
							color = '#444'//정보없음
						}
					}
					linkData['features'][i]['properties']['color'] = color;
				}
			}
		}
		console.log("linkData", linkData);
		
		var style = {
				'line-color': ['get', 'color'],
				'line-width': 2.5
		};
		
		mapUtil.addLayer(linkData, 'trafficLayer', 'trafficLayer', 'line', 'geojson', style);
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
	dragPan: true,
	preserveDrawingBuffer: false,
	maxBounds : [[126.94653560891015, 37.68550996229325], [127.19030784703307, 37.78684195414009]],
	//maxBounds : [[126.04156324865809, 36.889307844993726], [128.3069929361577, 38.36060217757156]],
    //지도 다운로드 기능 dataURL 설정  -png
	//preserveDrawingBuffer : true,
	//scrollZoom 기능
	scrollZoom: true,
	doubleClickZoom : false,
	//화면창에 따라 지도 크기 조절
	trackResize : true,
	maxZoom : 17.9,
	style: {
		version: 8, 
		sources: {
			vworld: {
				type: "raster", 
				tiles: ['http://xdworld.vworld.kr:8080/2d/Hybrid/service/{z}/{x}/{y}.png'],
				//http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png
				//https://g.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png
				//http://xdworld.vworld.kr:8080/2d/gray/service/{z}/{x}/{y}.png
				//http://xdworld.vworld.kr:8080/2d/midnight/service/{z}/{x}/{y}.png
				//http://xdworld.vworld.kr:8080/2d/Hybrid/service/{z}/{x}/{y}.png
				tileSize: 256, attribution:""
			}
		},
		layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}],
		//"sprite": "http://openmaptiles.org/sprites/",
		"glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
		//glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
	}

});

