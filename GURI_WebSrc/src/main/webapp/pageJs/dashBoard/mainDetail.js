//로딩 객체
var loading = $.loading();

var markerList = [];

////레이어 리스트
var layerList = [];
//
////레이어 소스 리스트
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	
	//초기 레이어 데이터 호출
	fn_initLayerData();
	
	//초기 레이어 데이터 함수
	function fn_initLayerData(){
		
		var url = "/dashBoard/main/mainDetailData.do";
		var param = {};
		param.dongName = $("#dongName").val();
		var tp = $("#tp").val();
		console.log("!!!! tp : " , tp);
		Util.request(url, param, function(resultData){
			
			//행정동 경계 함수 호출
			fn_createMap(resultData.admdArea.data);
			
			//select tag
			fn_dongList(resultData.dongList);
			
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.treeData.data.value), "tree_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.treeParkData.data.value), "treePark_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.childData.data.value), "child_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.trafficData.data.value), "traffic_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.crossWalkData.data.value), "crossWalk_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.safetyData.data.value), "safety_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.bellData.data.value), "bell_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.cctvData.data.value), "cctv_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.wifiData.data.value), "wifi_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.parkData.data.value), "park_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.fireData.data.value), "fire_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.childAreaData.data.value), "childArea_detail", map, tp)
			fn_createMarker(JSON.parse(resultData.guideSignData.data.value), "guide_sign_detail", map, tp)
			console.log("resultData.centerPoint.geom :", resultData.centerPoint.geom)
			console.log("resultData.childAreaData.data.value :", tp)
			if( resultData.centerPoint != null ){
				
				map.flyTo({
					center: [resultData.centerPoint.x, resultData.centerPoint.y],
					zoom : 13.5
				})
			}
			
			$("#dongList").val(resultData.centerPoint.dongCd);
		})
	}
	
	//초기 레이어 데이터 함수
	function fn_changeData(){
		
		var url = "/dashBoard/main/mainDetailData.do";
		var param = {};
		
		var dongSelect = document.querySelector('#dongList');
		param.dongName = dongSelect.options[dongSelect.selectedIndex].text;
		var tp = $("#tp").val();
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData.cctvData.data)
			console.log("resultData treeData: ", resultData.cctvData.data.value)
			console.log("resultData treeData json: ", JSON.parse(resultData.cctvData.data.value))
			
			for( var i=0;i<markerList.length;i++){
				markerList[i].remove();
			}
			
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.treeData.data.value), "tree_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.treeParkData.data.value), "treePark_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.childData.data.value), "child_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.trafficData.data.value), "traffic_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.crossWalkData.data.value), "crossWalk_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.safetyData.data.value), "safety_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.bellData.data.value), "bell_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.cctvData.data.value), "cctv_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.wifiData.data.value), "wifi_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.parkData.data.value), "park_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.fireData.data.value), "fire_detail", map, tp)
			//마커 함수 호출JSON.parse(data['value']
			fn_createMarker(JSON.parse(resultData.childAreaData.data.value), "childArea_detail", map, tp)
			fn_createMarker(JSON.parse(resultData.guideSignData.data.value), "guide_sign_detail", map, tp)
			
			if( resultData.centerPoint != null ){
				
				map.flyTo({
					center: [resultData.centerPoint.x, resultData.centerPoint.y],
					zoom : 13.5
				})
			}
			
		})
	}
	
	//마커 함수 호출
	function fn_createMarker(geojson, layerIdMap, mapObject, sort){
		var active = "none";
		console.log("sort :::: " ,sort=="CCTV")
		if( sort == "가로수" ){
			if( layerIdMap == "tree_detail" ){
				active = "";
			}
		}
		else if( sort == "공원수목" ){
			if( layerIdMap == "treePark_detail" ){
				active = "";
			}
		}
		else if( sort == "횡단보도" ){
			if( layerIdMap == "crossWalk_detail" ){
				active = "";
			}
		}
		else if( sort == "신호등" ){
			if( layerIdMap == "traffic_detail" ){
				active = "";
			}
		}
		else if( sort == "안전표지" ){
			if( layerIdMap == "safety_detail" ){
				active = "";
			}
		}
		else if( sort == "안전비상벨" ){
			if( layerIdMap == "bell_detail" ){
				active = "";
			}
		}
		else if( sort == "CCTV" ){
			if( layerIdMap == "cctv_detail" ){
				active = "";
			}
		}
		else if( sort == "어린이집" ){
			if( layerIdMap == "child_detail" ){
				active = "";
			}
		}
		else if( sort == "어린이 보호구역" ){
			if( layerIdMap == "childArea_detail" ){
				active = "";
			}
		}
		else if( sort == "소방용수시설" ){
			if( layerIdMap == "fire_detail" ){
				active = "";
			}
		}
		else if( sort == "주차장" ){
			if( layerIdMap == "park_detail" ){
				active = "";
			}
		}
		else if( sort == "무료와이파이" ){
			if( layerIdMap == "wifi_detail" ){
				active = "";
			}
		}
		else if( sort == "안내표지" ){
			if( layerIdMap == "guide_sign_detail" ){
				active = "";
			}
		}
		
		if( geojson.features != null ){
			
			geojson.features.forEach(function (marker) {
				
				var html = '';
	    		var el = document.createElement('div');
				el.className = layerIdMap;
				console.log("el.className ::::::", el.className)
				console.log("el ::::::", el)
				var coordinate = JSON.parse(marker.geometry).coordinates;
				var createMarker = new mapboxgl.Marker(el)
				.setLngLat(coordinate)
				.addTo(mapObject);
				markerList.push(createMarker);
				
				el.addEventListener('click', function () {
					var properties =  marker.properties;
					var attributeKey = Object.keys(properties);
					var attributeValue = Object.values(properties);
					html = '';
					html += '<p class="mini_title">' + attributeValue[0] + ' 속성정보</p>';
					html += '<ul class="mini_desc">';
					for( var i = 0 ; i < attributeKey.length; i++  ){
		    			if( attributeKey[i] != "유형" ){
		    				html += '<li>' + attributeKey[i] + ' : ' + attributeValue[i] + '</li>';
		    			}
		    		}
					
		    		html += '</ul>';
				    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
						html
					);    
				    
				    createMarker.setPopup(popup);
				    //fn_franchiseeDetail();
					//mapApi.removeEvent(mapObject, layerIdMap[0]);
				});
				
				
			});
			$("."+layerIdMap).css("display", active);
			
			
			var side = document.querySelectorAll('.selc_list li');
			// ul > li 전체 조회
			for(var i = 0; i < side.length; i++) {
					
				var tagLi = $(side[i]);
				
				// active 인 메뉴 속성을 지운다
				if ( tagLi[0].children[0].innerHTML != sort  ) {
					tagLi.removeClass("on");
					
				}
			}
		}else{
			
		}
	}
	
	
	
	//행정동경계
	function fn_createMap(data) {
		var admdArea = JSON.parse(data['value']);
		var style = { 
			"line-color": '#2A2A2A',
			//"line-outline-color" : '#BDBDBD',
			'line-opacity': 1,
			'line-width': 2.5
		};
		//mapUtil.addLayer(layerMap.nowLayer, 'geojson', data, layerMap.nowLayer, 'line', styleLine);
		mapUtil.addLayer(admdArea, 'admd', 'admd', 'line', 'geojson', style, 'admd_nm', 14);
	}
	
	//행정동리스트
	function fn_dongList(data){
		
		Util.selectAddOption(data, "dongList", false);
		
	}
	
	
	$("#dongList").on("change", function(){
		fn_changeData();
	})
	
	$(".selc_list li").on("click", function(){
		var display = "";
		if( $(this).hasClass("on") ){
			display = "none";
			$(this).removeClass("on");
		}else{
			display = "";
			$(this).addClass("on");
			
		}
		console.log("display : ", display)
			
		if( this.children[0].className == "d_treePark" ) $(".treePark_detail").css("display", display);
		else if(  this.children[0].className == "d_tree"  ) $(".tree_detail").css("display", display);
		else if(  this.children[0].className == "d_crosswalk"  ) $(".crossWalk_detail").css("display", display);
		else if(  this.children[0].className == "d_traffic_light"  ) $(".traffic_detail").css("display", display);
		else if(  this.children[0].className == "d_safety"  ) $(".safety_detail").css("display", display);
		else if(  this.children[0].className == "d_emergency_bell"  ) $(".bell_detail").css("display", display);
		else if(  this.children[0].className == "d_nursery"  ) $(".child_detail").css("display", display);
		else if(  this.children[0].className == "d_children_safety"  ) $(".childArea_detail").css("display", display);
		else if(  this.children[0].className == "d_firewater"  ) $(".fire_detail").css("display", display);
		else if(  this.children[0].className == "d_parking"  ) $(".park_detail").css("display", display);
		else if(  this.children[0].className == "d_wifi"  ) $(".wifi_detail").css("display", display);
		else if(  this.children[0].className == "d_cctv"  ) $(".cctv_detail").css("display", display);
		else if(  this.children[0].className == "d_guide_sign"  ) $(".guide_sign_detail").css("display", display);
	})
	
	
	//지도 클릭 이벤트
	function mapFeatureClick(e) {
		var objectKey = Object.keys(e.features[0].properties);
		var objectValue = Object.values(e.features[0].properties);
		console.log("!!! e : ", e)
		var param = {};
		param.dongCd = e.features[0].properties.dong_cd;
	}
	
})

//map 객체 생성
var map = new mapboxgl.Map({
	container: 'detailMap',
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
	minZoom : 10,
	style: {
		version: 8, 
		sources: {
			vworld: {
				type: "raster", 
				tiles: ['http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png'], 
				tileSize: 256, attribution:""
			}
		},
		layers: [{id: "vworld", type: "raster", source: "vworld", minzoom: 0, maxzoom: 20}],
		//"sprite": "http://openmaptiles.org/sprites/",
		"glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
		//glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
	}

});
