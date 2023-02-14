//로딩 객체
var loading = $.loading();

////레이어 리스트
//var layerList = [];
//
////레이어 소스 리스트
//var sourceList = [];


$(function(){
	document.body.style.zoom = "100%";
	//레이어 닫기 클릭이벤트
	var layer = document.querySelectorAll(".layerCloseBtn")[0];
	
	layer.addEventListener("click", function () {
        layerOpenClose(false);
    });
    
	fn_getCCTVData();
	
	function fn_getCCTVData() {
		var param = {  };
		var apiUrl = 'https://openapi.its.go.kr:9443/cctvInfo';
		var apiKey = "a8c1789ce3144a1c91cb42883bf1a2f9";
		apiUrl += "?apiKey=" + apiKey; //*공개키*/
		apiUrl += "&type=all"; /*도로유형 ex:고속도로 its:국도*/
		apiUrl += "&cctvType=2"; /*CCTV 유형(1: 실시간 스트리밍(HLS) / 2: 동영상 파일 / 3: 정지 영상)*/
		apiUrl += "&minX=126.998407"; /*최소경도영역*/
		apiUrl += "&maxX=127.150597"; /*최대경도영역*/
		apiUrl += "&minY=37.685728"; /*최소위도영역*/
		apiUrl += "&maxY=37.778504"; /*최대위도영역*/
		apiUrl += "&getType=xml"; /*출력타입*/
//		Util.request(apiUrl,function(resultData){
//			console.log("resultData : " , resultData);
//		});
		//업무상 get밖에 사용할수 없음. api연계쪽에서 get통신만 가능.
		$.ajax({
			method : "get",							// http 요청 방식 (default: ‘GET’)
			type : "get",
			url : apiUrl,							// 요청이 전송될 url
//			data : param.data,								// 서버로 전달될 데이터 JSON 
			dataType : "text",						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
			async : true,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
//			contentType : "application/json",				// 서버에 데이터를 보낼 때 사용 content - type
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
	        	var parser=new DOMParser();
	        	var xmlDoc=parser.parseFromString(resultData,"text/xml");
	        	
	        	// 특정 테그를 기준으로 변수에 담는다
	        	var xml = xmlDoc.getElementsByTagName('data');
	        	var cctvList = [];
	        	for (var i = 0; i < xml.length; i++) {
					var oneCctv = {};
					var cctvurl = xml[i].getElementsByTagName('cctvurl')[0].childNodes[0].nodeValue;
					var cctvname = xml[i].getElementsByTagName('cctvname')[0].childNodes[0].nodeValue;
					var coordx = xml[i].getElementsByTagName('coordx')[0].childNodes[0].nodeValue;
					var coordy = xml[i].getElementsByTagName('coordy')[0].childNodes[0].nodeValue;
					oneCctv.cctvurl = cctvurl;
					oneCctv.cctvname = cctvname;
					oneCctv.coordx = coordx;
					oneCctv.coordy = coordy;
					cctvList.push(oneCctv);
				}
	        	var features = [];
				for (var i = 0; i < cctvList.length; i++) {
					var oneData = cctvList[i];
					var coordi = [Number(oneData['coordx']), Number(oneData['coordy'])];
					var oneFeature = {};
					oneFeature.type = 'Feature';
					oneFeature.geometry = {
							'type' : 'Point'
						  , 'coordinates' : coordi};
					oneFeature.properties = {
							'cctvurl' : oneData['cctvurl']
						  , 'cctvname' : oneData['cctvname']
					  	  , 'coordx' : oneData['coordx']
						  , 'coordy' : oneData['coordy']
					}
					features.push(oneFeature);
				}
				var cctvPointData = {
						'type' : 'FeatureCollection'
					  , 'features': features
				};
				fn_setCCTVLayer(cctvPointData)
	        	
	        },
	        error : function(request,status,error){
	        	console.log("B", request,status,error);
	        	
	        	//$(DEF.controllId.contentWrapper).html(request.responseText);
	        },
	        fail : function() {
	        	
	        	alert("인터넷 연결 상태를 확인해주세요.");
	        }
		});
		
		/*
		var url = "/dashBoard/communication/cctvInfoData.do";
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData);
			var features = [];
			for (var i = 0; i < resultData['cctvData'].length; i++) {
				var oneData = resultData['cctvData'][i];
				var coordi = [Number(oneData['coordx']), Number(oneData['coordy'])];
				console.log("coordi : " , coordi);
				var oneFeature = {};
				oneFeature.type = 'Feature';
				oneFeature.geometry = {
						'type' : 'Point'
					  , 'coordinates' : coordi};
				oneFeature.properties = {
						'cctvurl' : oneData['cctvurl']
					  , 'cctvname' : oneData['cctvname']
				}
				features.push(oneFeature);
			}
			console.log("features :", features);
			var cctvPointData = {
					'type' : 'FeatureCollection'
				  , 'features': features
			};
			console.log("cctvPointData :", cctvPointData);
			fn_setCCTVLayer(cctvPointData)
		});
		*/
	}
//	
//	//설치목적 select box option 값 설정
//	function fn_setSelPurpose(cctvPurposeList) {
//		for (var i = 0; i < cctvPurposeList.length; i++) {
//			var purpose = cctvPurposeList[i]['purp'];
//			var option = '<option value ="' + purpose + '">' + purpose + '</option>';
//			$("#selPurpose").append(option);
//		}
//	}
//	
	
	//좌표값으로 url 구하기
	function fn_getCCTVUrl(xVal, yVal) {
		var x = xVal.split(".");
		var y = yVal.split(".");
		var xZero = "";
		if(x[1].substring(0, 1) == '0') {
			xZero = "0"
		}
		var yZero = "";
		if(y[1].substring(0, 1) == '0') {
			yZero = "0"
		}
		
		var minX = x[0] + "." + xZero + (parseInt(x[1])-1);
		var minY = y[0] + "." + yZero + (parseInt(y[1])-1);
		var maxX = x[0] + "." + xZero + (parseInt(x[1])+1);
		var maxY = y[0] + "." + yZero + (parseInt(y[1])+1);
		
//		console.log("minX : ", minX , ", maxX : ", maxX, "minY : ", minY , ", maxY : ", maxY)
		
		var apiUrl = 'https://openapi.its.go.kr:9443/cctvInfo';
		var apiKey = "a8c1789ce3144a1c91cb42883bf1a2f9";
		apiUrl += "?apiKey=" + apiKey; //*공개키*/
		apiUrl += "&type=all"; /*도로유형 ex:고속도로 its:국도*/
		apiUrl += "&cctvType=2"; /*CCTV 유형(1: 실시간 스트리밍(HLS) / 2: 동영상 파일 / 3: 정지 영상)*/
		apiUrl += "&minX=" + minX; /*최소경도영역*/
		apiUrl += "&maxX=" + maxX; /*최대경도영역*/
		apiUrl += "&minY=" + minY; /*최소위도영역*/
		apiUrl += "&maxY=" + maxY; /*최대위도영역*/
		apiUrl += "&getType=xml"; /*출력타입*/
//		console.log("apiUrl : ", apiUrl);
		//업무상 get밖에 사용할수 없음. api연계쪽에서 get통신만 가능.
		$.ajax({
			method : "get",							// http 요청 방식 (default: ‘GET’)
			type : "get",
			url : apiUrl,							// 요청이 전송될 url
//			data : param.data,								// 서버로 전달될 데이터 JSON 
			dataType : "text",						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
			async : true,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
//			contentType : "application/json",				// 서버에 데이터를 보낼 때 사용 content - type
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
	        	var parser=new DOMParser();
	        	var xmlDoc=parser.parseFromString(resultData,"text/xml");
	        	
	        	// 특정 테그를 기준으로 변수에 담는다
	        	var xml = xmlDoc.getElementsByTagName('data');
	        	for (var i = 0; i < xml.length; i++) {
					var cctvUrl = xml[i].getElementsByTagName('cctvurl')[0].childNodes[0].nodeValue;
					var cctvName = xml[i].getElementsByTagName('cctvname')[0].childNodes[0].nodeValue;
					var coordx = xml[i].getElementsByTagName('coordx')[0].childNodes[0].nodeValue;
					var coordy = xml[i].getElementsByTagName('coordy')[0].childNodes[0].nodeValue;
					if(coordx == xVal && coordy == yVal) {
				        $("#cctvVideo").attr("src", cctvUrl);
						$("#cctvName").text(cctvName);
					}
					else {
					}
				}
	        },
	        error : function(request,status,error){
	        	console.log("B", request,status,error);
	        },
	        fail : function() {
	        	alert("인터넷 연결 상태를 확인해주세요.");
	        }
		});
	}
	
	//지도에 cctv point 레이어 추가
	function fn_setCCTVLayer(cctvPointData) {

		if(map.hasImage('cctvImg')) {
			map.removeImage('cctvImg');
		}
		if(map.getLayer('cctvLayer')) {
			map.removeLayer('cctvLayer');
		}
		if(map.getSource('cctvLayer')) {
			map.removeSource('cctvLayer');
		}
		/////////////////////////////////
		map.loadImage('/dist/images/communication/cctvImg.png', function(error, image) { // ES5 equivalent
			  

			if (error) console.log("error : " , error);
			 
			// Add the image to the map style.
			map.addImage('cctvImg', image);
			 
			map.addSource('cctvLayer', {
				'type' : 'geojson',
				'data' : cctvPointData
			});
			map.addLayer({
				'id': 'cctvLayer',
				'type': 'symbol',
				'source': 'cctvLayer', 
				'layout': {
					'icon-image': 'cctvImg',
					'icon-size': 0.2
					}
			});
			map.on('click', 'cctvLayer', function(e) { // ES5 equivalent
				layerOpenClose(true);
				var coordx = e.features[0].properties['coordx'];
				var coordy = e.features[0].properties['coordy'];
				fn_getCCTVUrl(coordx, coordy);
//				var cctvUrl = e.features[0].properties['cctvurl'];
//				var cctvName = e.features[0].properties['cctvname'];
//				console.log("cctvUrl : " , cctvUrl);
//				console.log("Hls.isSupported() : " , Hls.isSupported());
//		        $("#cctvVideo").attr("src", cctvUrl);
//				$("#cctvName").text(cctvName);
//				$("#cctvVideo").trigger("play");
//				$("#cctvVideo").play();
				document.getElementById('cctvVideo').play();

//				$("#cctvSource").attr('src', cctvUrl);
				/*
				if (Hls.isSupported()) {
					var video = document.getElementById('cctvVideo');
					console.log("video.canPlayType('application/vnd.apple.mpegurl') : " , video.canPlayType('application/vnd.apple.mpegurl'));
					var hls = new Hls();
					// bind them together
					hls.attachMedia(video);
					hls.on(Hls.Events.MEDIA_ATTACHED, function () {
						$("#cctvName").text(cctvName);
						hls.loadSource(cctvUrl);
//						hls.loadSource("http://cctvsec.ktict.co.kr/2/+MAKvmhuhLCng+SmwOzwVRr9ADys3kFBmCW4OGY0XH42/fg2Xx+LaT31c9P6p8B6zeDT2IiT0gnAOHLJlPChPw==");
//						$("#cctvVideo").attr("src", cctvUrl);
						hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
							console.log("event : ", event, ", data  : ", data );
					});
				});
					    video.play();
					  }*/
				});
//			map.on('click', 'cctvLayer', (e) => {
//				layerOpenClose(true);
//				var cctvUrl = e.features[0].properties['cctvurl'];
//				var cctvName = e.features[0].properties['cctvname'];
////				$("#cctvSource").attr('src', cctvUrl);
//				if (Hls.isSupported()) {
//					var video = document.getElementById('cctvVideo');
//					var hls = new Hls();
//					// bind them together
//					hls.attachMedia(video);
//					hls.on(Hls.Events.MEDIA_ATTACHED, function () {
//						$("#cctvName").text(cctvName);
//						hls.loadSource(cctvUrl);
//						hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
//					});
//				});
//					    video.play();
//					  }
//			});
			
//			return {
//			    name: name,
//			    y: cnt[i]
//			  };
		});
//		map.loadImage(
//				'/dist/images/communication/cctvImg.png',
//				(error, image) => {
//					if (error) console.log("error : " , error);
//					 
//					// Add the image to the map style.
//					map.addImage('cctvImg', image);
//					 
//					map.addSource('cctvLayer', {
//						'type' : 'geojson',
//						'data' : cctvPointData
//					});
//					map.addLayer({
//						'id': 'cctvLayer',
//						'type': 'symbol',
//						'source': 'cctvLayer', 
//						'layout': {
//							'icon-image': 'cctvImg',
//							'icon-size': 0.2
//							}
//					});
//
//					map.on('click', 'cctvLayer', (e) => {
//						layerOpenClose(true);
//						var cctvUrl = e.features[0].properties['cctvurl'];
//						var cctvName = e.features[0].properties['cctvname'];
////						$("#cctvSource").attr('src', cctvUrl);
//						if (Hls.isSupported()) {
//							var video = document.getElementById('cctvVideo');
//							var hls = new Hls();
//							// bind them together
//							hls.attachMedia(video);
//							hls.on(Hls.Events.MEDIA_ATTACHED, function () {
//								$("#cctvName").text(cctvName);
//								hls.loadSource(cctvUrl);
//								hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
//							});
//						});
//							    video.play();
//							  }
//					});
//				}
//				
//			);
		
	
	}
	
	
});


//레이어 이동
var layerHead = document.querySelectorAll(".layerWrap > div > .head");
for (var i = 0; i < layerHead.length; i++) {
	var index = i;
 (function (ind) {
	 var positionVertical = { x: 0, y: 0 };
     interact(layerHead[ind]).draggable({
         listeners: {
             move: function (event) {
                 positionVertical.x += event.dx;
                 positionVertical.y += event.dy;
                 event.target.parentNode.style.transform =
                     "translate(" +
                     positionVertical.x +
                     "px, " +
                     positionVertical.y +
                     "px)";
             },
         },
     });
 })(index);
}


//레이어 켜기/끄기
function layerOpenClose(direction) {
	
	var layer = document.getElementById("cctvLayer");
	
	if(direction) {
		if (!layer.classList.contains("on")) {
			layer.classList.add("on");
		}
	}
	else {
		if (layer.classList.contains("on")) {
			layer.classList.remove("on");
		}
	}
}

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
	maxBounds : [[126.94653560891015, 37.65550996229325], [127.19030784703307, 37.78684195414009]],
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
				tileSize: 256, attribution:""
			}
		},
		layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 18}],
		//"sprite": "http://openmaptiles.org/sprites/",
		"glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
		//glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
	}

});

