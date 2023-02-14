
//마커 객체 생성


//지도 공통 함수
var mapUtil = {
		//줌 함수
		zoomEvent : function(e){
			var nowLevel = map.getZoom();
			if( e == '+' ) {
				
				var setLevel = (nowLevel + 1);
				map.setZoom(setLevel);
			}else if( e == '-' ) {
				var setLevel = (nowLevel - 1);
				map.setZoom(setLevel);
			}
		},
		/**
		 * add/remove layerId, sourceId
		 */
		manageMapId : function(layerId, sourceId, txtLayerId){
			if( map.getLayer(layerId+"_un") != undefined || map.getLayer(layerId+"_sumTxt") != undefined ) {
				map.removeLayer(layerId+"_un");
				map.removeLayer(layerId+"_sumTxt");
			}
			if( map.getLayer(layerId) != undefined ||  map.getSource(layerId) != undefined ){
				var txtId = Util.getListText(layerMap.txtLayerList, layerId) ; 
				console.log("111 layerMap.txtLayerList : ", layerMap.txtLayerList)
				console.log("111 txtId : ", txtId)
				if( txtId != '' && map.getLayer(txtId) != undefined ){
					
					if( txtId != '' && layerMap.txtLayerList.length > 0 ) Util.removeAttribute(layerMap.txtLayerList, txtId);	
					map.removeLayer(txtId);
				}
				map.removeLayer(layerId);
				map.removeSource(sourceId);
				
			}else{
				
				//레이어 정보 저장 함수 호출
				this.addLayerInfo(layerId, sourceId);
			}
		},
		/**
		 * 레이어 생성함수
		 * sourceId : 레이어 sourceID
		 * sourceType : 레이어 source type
		 * data      : geojson 결과 데이터
		 * layerId   : 레이어 ID
		 * layerType : 레이어 타입
		 * style     : 스타일 정보
		 */
		addLayer : function(data, sourceId, layerId, layerType, sourceType, style, columnNm, fontSize) {
			if( map.getLayer(layerId) != undefined ){
				map.removeLayer(layerId);
				map.removeLayer(layerId+"_text");
				map.removeSource(sourceId);
				Util.removeAttribute(layerList, layerId);
				Util.removeAttribute(layerList, layerId+"_text");
				Util.removeAttribute(sourceList, sourceId);
			}else{
				
				//레이어 정보 저장 함수 호출
				layerList.push(layerId);
				layerList.push(layerId+"_text");
				sourceList.push(sourceId);
			}
			map.addSource(sourceId, {
				type: sourceType,
				data: data
			}, layerId);
			map.addLayer({		
				'id': layerId,
				'type': layerType,
				'source': sourceId,			
				'paint': style
			});
			var textSize = fontSize;
			if(textSize == null || textSize == undefined) textSize = 11;
			if(columnNm != undefined || columnNm != null){
				map.addLayer({
					id: layerId+"_text",
					type: 'symbol',
					source: sourceId,
					// filter: ['has', 'point_count'],
					layout: {
						'text-field': ["get", columnNm],
						'text-font': ['Roboto Regular'],
						'text-offset': [0, 0],
						'text-size': textSize
					},
					'paint': {
						'text-color': '#fff',
						'text-halo-color': '#202',
						'text-halo-width': 1
					}
				});
			}
			
		},
		/*addTxtLayer : function(layerId, sourceId, columnName){
			if( map.getLayer(layerId) != undefined ){
				map.removeLayer(layerId);
				//map.removeSource(sourceId);
			}else{
				
			}
			map.addLayer({
	            id: layerId,
	            type: 'symbol',
	            source: sourceId,
	           // filter: ['has', 'point_count'],
	            layout: {
	                'text-field': ["get", columnName],
	                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
	                'text-size': 12
	            },
	            
	        });
		},*/
		/**
		 * 지오서버 레이어 생성 함수
		 * tableNm : 테이블명
		 * isCluster, columnNm, style2, txtLayerId, txtColumn
		 */
		addGeoServerLayer : function(sourceId, tableNm, layerId, layerType, style, columnNm){
			if( map.getLayer(layerId) != undefined ){
				map.removeLayer(layerId);
				//map.removeLayer(layerId+"_text");
				map.removeSource(sourceId);
				Util.removeAttribute(layerList, layerId);
				//Util.removeAttribute(layerList, layerId+"_text");
				Util.removeAttribute(sourceList, sourceId);
			}else{
				
				//레이어 정보 저장 함수 호출
				layerList.push(layerId);
				//layerList.push(layerId+"_text");
				sourceList.push(sourceId);
			}
			
			//var	tiles = "http://192.168.1.231:8900/geoserver/gwc/service/wmts?"
			var type = 'vector';
			var type2 = 'raster';
			var	tiles = "http://202.68.229.241:8900/geoserver/gwc/service/wmts?"
				+ "REQUEST=GetTile&SERVICE=WMTS"
				+ "&VERSION=1.0.0"
				+ "&LAYER=UJB_DID_WS:"+tableNm
				+ "&STYLE=&TILEMATRIX=EPSG:900913:{z}"
				+ "&TILEMATRIXSET=EPSG:900913"
				+ "&FORMAT=application/vnd.mapbox-vector-tile"
				+ "&TILECOL={x}&TILEROW={y}";
			var tiles2 = 'http://202.68.229.241:8900/geoserver/UJB_DID_WS/wms?service=WMS&VERSION=1.1.1&REQUEST=GetMap&layers=UJB_DID_WS:' +tableNm + '&STYLES=' + tableNm + '&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png&TRANSPARENT=TRUE';
				/*map.addSource(sourceId, {
					type: type2,
					// use the tiles option to specify a WMS tile source URL
					// https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
					tiles: [
						tiles2
						],
//						'minZoom': 0,
//						'maxZoom': 20,
				});*/
			map.addLayer({
		        'id': layerId,
		        'type': type2,
		        'source': {
		            'type': type2,
		            'tiles': [ tiles2
		            ],
		            'tileSize': 256
		        },
		        'paint': {},
		        //'filter': filter
		    });
					/*map.addLayer({		
						'id': layerId,
						'type': 'line',
						'source': sourceId,		
						'source-layer': tableNm,
						'paint': { 
							"line-color": '#ffffff',
							// "fill-antialias" : true,
					        'line-opacity': 0,
					        'line-width' : 2
					           }
					});
					map.addLayer({
			            'id': layerId+"_text",
			            'type': 'symbol',
			            'source': sourceId,
			            'source-layer': tableNm,
			           // filter: ['has', 'point_count'],
			            'layout': {
			                'text-field': ["get", columnNm],
			                'text-offset': [0, 0.1],
			                'text-font': ['Roboto Regular'],
			                'text-size': 15
			            },
			            'paint': {
			                'text-color': '#fff',
			                'text-halo-color': '#202',
			                'text-halo-width': 2
			                }
			        });*/
			
		},
		/**
		 * 레이어 정보 저장
		 * layerId   : 레이어 ID
		 * sourceId : 레이어 sourceID
		 */
		addLayerInfo : function(layerId, sourceId) {
			
			
			layerMap.layerList.push(layerId);
			styleMap.sourceList.push(sourceId);
			//console.log("mapUtil layerMap.layerList : ",layerMap.layerList)
		},
		/**
		 * 레이어 단일 색상 변경시 적용
		 */
		changeStyle : function(layerId, type, value){
			//console.log("1111111111111111111 : " , type)
			map.setPaintProperty(layerId, type, value);
			/*if( type == 'fill-opacity' && value == 0 ){
				map.setPaintProperty(layerId+'-line', 'line-width', 2);
				//console.log("22222222222222222222222")
				//console.log("222222222222   value : " , value)
				//var rgba = 'rgba(' + colorPick.convertToRGB(colorPick.rgbaArray($('#'+tagID.styleColorInfo).css('color')))[0] + ',' + colorPick.convertToRGB(colorPick.rgbaArray($('#'+tagID.styleColorInfo).css('color')))[1] + ',' + colorPick.convertToRGB(colorPick.rgbaArray($('#'+tagID.styleColorInfo).css('color')))[2] + ',1)';
				//console.log("222222222222   colorPick.convertToRGB(value) : " , colorPick.convertToRGB(value))
				//console.log("222222222222   rgba : " , rgba)
				//map.setPaintProperty(layerId, 'fill-outline-color', 'rgba(142, 68, 173, 1)')
				//map.setPaintProperty(layerId, 'fill-antialias', false)
			}*/
		},
		/**
		 * 범례에 따른 색상 변경 적용함수
		 */
		changeMultiStyle: function(param, changeType, colorRange){
			//범례 컬럼값이 있을 존재 할 경우
			//console.log("changeMultiStyle changeType: ", map.getPaintProperty(layerMap.nowLayer))
			//console.log("changeMultiStyle map.getPaintProperty(layerMap.nowLayer, changeType): ", map.getPaintProperty(layerMap.nowLayer, changeType))
    		if( param.columnNm != '' /*&&  map.getPaintProperty(layerMap.nowLayer, changeType).property != undefined*/ ){
    			console.log("changeMultiStyle : ", styleMap.setDefalutStyle(param.geomType, param, colorRange))
    			console.log("changeMultiStyle : styleMap.setDefalutStyle(param.geomType, param, colorRange)[changeType]", styleMap.setDefalutStyle(param.geomType, param, colorRange)[changeType])
    			mapUtil.changeStyle(layerMap.nowLayer, changeType, styleMap.setDefalutStyle(param.geomType, param, colorRange)[changeType]);
    		}
		},
		/**
		 * 레이어 소스 데이터 가져오는 함수
		 */
		getSourceData : function(sourceName){
			var data = {};
			data = map.getSource(sourceName)._options.data;
			
			return data;
		},
		
		/**
		 * 레이어 visible 설정
		 * layerId : 레이어 ID
		 * active : visible, none
		 */
		visible : function(layerId, active) {
			map.setLayoutProperty(layerId, 'visibility', active);
		},
		/**
		 * 지도 자연스러운 이동
		 * point : 좌표
		 * zoomLevel : 줌레벨 설정
		 * speed : 이동속도
		 */
		mapFlyMove : function(point, zoomLevel,  speed) {
			//point : [x, y] , speed : numeric
		  	map.flyTo({
		                center: point,
		                zoom: zoomLevel,
		                //bearing: bearing,  //화면 각도
		                //curve: curve, // change the speed at which it zooms out
		            	speed: speed
		  	});
		},
		/**
		 * 마커지우는 함수
		 */
		removeMarker : function	(){
			//marker.remove();
			markerList = [];
			if (markerList!==null) {
			    for (var i = markerList.length - 1; i >= 0; i--) {
			    	markerList[i].remove();
			    	
			    }
			}
		},
		/**
		 * 포인트 마커 생성
		 * 
		 */
		createPointMarker : function ( point )	{
			console.log("marker ::: ", marker)
			//point : [127.126727033947,35.8638780089473]
			marker.setLngLat(point).addTo(map);
			map.scrollZoom.enable({around: 'cneter'});
			markerList.push(marker);
		},
		/**
		 * 지도 순서 변경 함수(위아래 버튼)
		 * nowLayerId : 순서 변경 하는 기준 레이어
		 * beforeLayerId : 아래로 가는 레이어
		 */
		moveLayer : function(nowLayerId, beforeLayerId) {
			console.log("!레이어 nowLayerId : " , nowLayerId)
			console.log("!레이어 beforeLayerId : " , beforeLayerId)
			console.log("!레이어 layerMap.viewNo : " , layerMap.viewNo)
			console.log("!레이어 layerMap.overLayNo : " , layerMap.overLayNo)
			console.log("!레이어 layerMap.layerList : " , layerMap.layerList)
			console.log("!레이어 layerMap.addLayerList : " , layerMap.addLayerList)
			console.log("!레이어 layerMap.overlayNoList : " , layerMap.overlayNoList)
			if( layerMap.orderValue == 'm' ){
				console.log("! 레이어 내리기")
				console.log("! 레이어 layerMap.txtLayerList : " , layerMap.txtLayerList)
				console.log("! 레이어 layerMap.txtLayerList.length : " , layerMap.txtLayerList.length)
				//console.log("레이어1")
				if( layerMap.txtLayerList.length > 0 ){
					//var textLayer = Util.getListText(layerMap.txtLayerList, beforeLayerId);
					//if( textLayer != '') map.moveLayer(nowLayerId, textLayer);
					console.log("! 레이어 Util.getListText(layerMap.txtLayerList, beforeLayerId) : " ,Util.getListText(layerMap.txtLayerList, beforeLayerId))
					console.log("! 레이어 Util.getListText(layerMap.txtLayerList, nowLayerId) : ", Util.getListText(layerMap.txtLayerList, nowLayerId))
					
					if( Util.getListText(layerMap.txtLayerList, beforeLayerId) != '' && Util.getListText(layerMap.txtLayerList, nowLayerId) != '' ){
						console.log("!레이어 000000000000 : ")
						//map.moveLayer( Util.getListText(layerMap.txtLayerList, nowLayerId), beforeLayerId);
						map.moveLayer(nowLayerId, beforeLayerId);
						if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(nowLayerId+"_un", beforeLayerId);
						map.moveLayer(Util.getListText(layerMap.txtLayerList, nowLayerId), beforeLayerId);
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(nowLayerId+"_sumTxt", beforeLayerId);
						//map.moveLayer( nowLayerId, beforeLayerId );
					}else if( Util.getListText(layerMap.txtLayerList, beforeLayerId) != '' ) {
						console.log("!레이어 111111111111 : ")
						map.moveLayer( nowLayerId, Util.getListText(layerMap.txtLayerList, beforeLayerId));
						if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer( nowLayerId+"_un", beforeLayerId);
						map.moveLayer( nowLayerId, beforeLayerId );
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer( nowLayerId+"_sumTxt", beforeLayerId);
					
					}else if( Util.getListText(layerMap.txtLayerList, nowLayerId) != '') {
						console.log("!레이어 222222222222222 : ")
						map.moveLayer(nowLayerId, beforeLayerId);
						if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(nowLayerId+"_un", beforeLayerId);
						map.moveLayer( Util.getListText(layerMap.txtLayerList, nowLayerId), beforeLayerId);
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(nowLayerId+"_sumTxt", beforeLayerId);
					}else{
						console.log("!레이어 3333333333333333 : ")
						console.log("!레이어 3333333333333333 : nowLayerId " ,nowLayerId)
						console.log("!레이어 3333333333333333 : beforeLayerId ", beforeLayerId)
						if( beforeLayerId == undefined ){
							//mapUtil.changeOverlay();
							var cnt = parseInt(layerMap.overLayList.length)-2;
							beforeLayerId = layerMap.overLayList[cnt];
							console.log("!레이어 3333333333333333 : beforeLayerId" , beforeLayerId)
							map.moveLayer(nowLayerId, beforeLayerId);
							if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) {
								console.log("!레이어 3333333333333333 : 33")
								map.moveLayer(nowLayerId+"_sumTxt", beforeLayerId);
							}else if( map.getLayer(beforeLayerId+"_sumTxt") != undefined ){
								console.log("!레이어 3333333333333333 : 44")
								map.moveLayer(nowLayerId, beforeLayerId+"_sumTxt");
							}
							if(  map.getLayer(nowLayerId+"_un") != undefined ) {
								map.moveLayer(nowLayerId+"_un", beforeLayerId);
								console.log("!레이어 3333333333333333 : 11")
							}else if( map.getLayer(beforeLayerId+"_un") != undefined ){
								map.moveLayer(nowLayerId, beforeLayerId+"_un");
								console.log("!레이어 3333333333333333 : 22")
								
							}
							console.log("#### layerMap : ", layerMap)
							
						}else{
							map.moveLayer(nowLayerId, beforeLayerId);
							if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) {
								console.log("!레이어 3333333333333333 : 33")
								map.moveLayer(nowLayerId+"_sumTxt", beforeLayerId);
							}else if( map.getLayer(beforeLayerId+"_sumTxt") != undefined ){
								console.log("!레이어 3333333333333333 : 44")
								map.moveLayer(nowLayerId, beforeLayerId+"_sumTxt");
							}
							if(  map.getLayer(nowLayerId+"_un") != undefined ) {
								map.moveLayer(nowLayerId+"_un", beforeLayerId);
								console.log("!레이어 3333333333333333 : 11")
							}else if( map.getLayer(beforeLayerId+"_un") != undefined ){
								map.moveLayer(nowLayerId, beforeLayerId+"_un");
								console.log("!레이어 3333333333333333 : 22")
								
							}
						}
						//if( beforeLayerId != undefined ){
							
						/*}else{
							mapUtil.changeOverlay();
							map.moveLayer(nowLayerId);
							if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) {
								console.log("!레이어 3333333333333333 : 33")
								map.moveLayer(nowLayerId+"_sumTxt");
							}
							//map.moveLayer(nowLayerId);
							if(  map.getLayer(nowLayerId+"_un") != undefined ) {
								map.moveLayer(nowLayerId+"_un");
								console.log("!레이어 3333333333333333 : 11")
							}
							//map.moveLayer(nowLayerId);
						}
						*/
						
						
					}
					
					//map.moveLayer(textLayer);
				}else{
					console.log("!레이어 121212121212 : ")
					if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(nowLayerId+"_un", beforeLayerId);
					map.moveLayer(nowLayerId, beforeLayerId);
					if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(nowLayerId+"_sumTxt", beforeLayerId);
				}
				//map.moveLayer(nowLayerId, beforeLayerId);
				/*if( layerMap.txtLayerList.length > 0 ){
					console.log("******************* 2 mapUtil.getLayersId() : ", mapUtil.getLayersId())
					var textLayer = Util.getListText(layerMap.txtLayerList, nowLayerId);
					if( textLayer != '') map.moveLayer(nowLayerId, textLayer);
					
					//map.moveLayer(textLayer);
				}*/
			}else{
				console.log("! 레이어 올리기")
				console.log("! 레이어 layerMap.txtLayerList.length : " , layerMap.txtLayerList.length)
				if( layerMap.txtLayerList.length > 0 ){
					//var textLayer = Util.getListText(layerMap.txtLayerList, nowLayerId);
					
					//beforelayer에 txt레이어 있는지 확인
					
					if( Util.getListText(layerMap.txtLayerList, beforeLayerId) != '' && Util.getListText(layerMap.txtLayerList, nowLayerId) != '' ){
						console.log("!레이어 44444 : ")
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) {
							map.moveLayer(beforeLayerId, nowLayerId+'_sumTxt');
						}
						if(  map.getLayer(nowLayerId+"_un") != undefined ) {
							map.moveLayer(beforeLayerId, nowLayerId+'_un');
						}
						map.moveLayer(beforeLayerId, nowLayerId);
						map.moveLayer(Util.getListText(layerMap.txtLayerList, beforeLayerId), nowLayerId);
					}else if( Util.getListText(layerMap.txtLayerList, beforeLayerId) != '' ) {
						console.log("!레이어 555555 : ")
						console.log("!레이어 555555 : beforeLayerId", beforeLayerId)
						console.log("!레이어 555555 : nowLayerId", nowLayerId)
						if( beforeLayerId != '' ){
							
							if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(beforeLayerId, nowLayerId+'_un');
							if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(beforeLayerId, nowLayerId+'_sumTxt');
							map.moveLayer(beforeLayerId, nowLayerId);
							map.moveLayer(Util.getListText(layerMap.txtLayerList, beforeLayerId), nowLayerId);
						}else{
							/*if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(nowLayerId+'_un');
							if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(nowLayerId+'_sumTxt');
							map.moveLayer(nowLayerId);*/
							//map.moveLayer(nowLayerId);
							mapUtil.changeOverlay();
						}
					
					}else if( Util.getListText(layerMap.txtLayerList, nowLayerId) != '') {
						console.log("!레이어 666666 : ")
						if(  map.getLayer(nowLayerId+"_un") != undefined )  {
							map.moveLayer(beforeLayerId, Util.getListText(layerMap.txtLayerList, nowLayerId+"_un"));
						}
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined )  map.moveLayer(beforeLayerId, Util.getListText(layerMap.txtLayerList, nowLayerId+"_sumTxt"));
						map.moveLayer(beforeLayerId, nowLayerId);
						map.moveLayer(beforeLayerId, Util.getListText(layerMap.txtLayerList, nowLayerId));
					}else{
						console.log("!레이어 777777777777 : ")
						console.log("!레이어 777777777777 : beforeLayerId : ", beforeLayerId)
						console.log("!레이어 777777777777 : nowLayerId", nowLayerId)
						if(  map.getLayer(nowLayerId+"_un") != undefined )  {
							map.moveLayer(beforeLayerId, nowLayerId+"_un"); 
						}else if(  map.getLayer(beforeLayerId+"_un") != undefined ){
							
							map.moveLayer(beforeLayerId+"_un", nowLayerId); 
						}
						map.moveLayer(beforeLayerId, nowLayerId); 
						if(  map.getLayer(nowLayerId+"_sumTxt") != undefined )  {
							
							map.moveLayer(beforeLayerId, nowLayerId+"_sumTxt"); 
						}else if( map.getLayer(beforeLayerId+"_sumTxt") != undefined ){
							
							map.moveLayer(beforeLayerId+"_sumTxt", nowLayerId); 
							
						}
						
					}
					
					//map.moveLayer(textLayer);
				}else{
					map.moveLayer(beforeLayerId, nowLayerId); 
					if(  map.getLayer(nowLayerId+"_un") != undefined ) map.moveLayer(beforeLayerId, nowLayerId+"_un"); 
					if(  map.getLayer(nowLayerId+"_sumTxt") != undefined ) map.moveLayer(beforeLayerId, nowLayerId+"_sumTxt"); 
				}
			}
		},
		//지도상의 레이어명 가져오기
		getLayersId : function(){
			var layers = map.getStyle().layers;      
			var layerList = [];
			layers.forEach(function(item, index){
				//console.log("레이어 등록 후 불러오기 layers.id : ", layers[index].id)
				
				//현재 지도상에 표현된 레이어 리스트를 객체에 넣기
				for( var i = 0 ; i < layerMap.layerList.length; i++ ) {
					if( layers[index].id == layerMap.layerList[i] ) {
						layerList.push(layers[index].id)
					}
				}
				
			})
			
			return layerList;
			
		},
		//레이어 있는지 확인
		checkLayers : function(nowLayer){
			
			var check = false;
			
			var layers = map.getStyle().layers;      
			layers.forEach(function(item, index){
				//console.log("레이어 등록 후 불러오기 layers.id : ", layers[index].id)
				
				//현재 지도상에 표현된 레이어 리스트를 객체에 넣기
				for( var i = 0 ; i < layerMap.layerList.length; i++ ) {
					if( layers[index].id == nowLayer ) {
						check = true;
					}
				}
				
			})
			return check;
		},
		//레이어 등록시 레이어 오버레이 순서에 맞게 함수
		changeOverlay : function(){
			var layerList = mapUtil.getLayersId();                                  //지도 상의 생성된 레이어명 리스트
			console.log(" changeOverlay overlayList : ", layerMap.overLayList)
			var overlayList = layerMap.overLayList;              //실제 반영이 되어야 할 순서의 레이어명
			
			for( var i = overlayList.length-1 ; i > -1 ; i-- ){
				
				for( var j = 0 ; j < layerList.length; j++ ){
					
					if( overlayList[i] == layerList[j] ) {
						
						//map.moveLayer(overlayList[i]);
						if(  map.getLayer(overlayList[i]+"_un") != undefined ||  map.getLayer(overlayList[i]+"_sumTxt") != undefined ){
							map.moveLayer(overlayList[i]+"_un");
							map.moveLayer(overlayList[i]);
							map.moveLayer(overlayList[i]+"_sumTxt");
						}else{
							map.moveLayer(overlayList[i]);
							
						}
						if( layerMap.txtLayerList.length > 0 ){
							
							var textLayer = Util.getListText(layerMap.txtLayerList, overlayList[i]);
							
							if( textLayer != "" ) map.moveLayer(textLayer);
							//map.moveLayer(textLayer);
						}
						
						//if( layerMap.txtLayerList )
					}
				}
			}
		},
		/**
		 * input range tag change function 
		 * sort : opacity , width ...
		 * val : value
		 */
		changeRangeValue : function(sort, val){
			//console.log("실행 : ")
			//console.log("실행 layerMap.viewNo : ", layerMap.viewNo)
			//console.log("실행 layerMap.nowLayer : ", layerMap.nowLayer)
			//console.log("실행 mapUtil.getLayersId : ", mapUtil.getLayersId())
			//console.log("실행 sort : ", sort)
			//console.log("실행 val : ", val)
			//console.log("실행 layerMap.viewNo=='' : ", layerMap.viewNo=='')
			
			if(layerMap.viewNo==''){
				return;
			}else{
				//console.log("실행2 : ")
				switch(sort) {
				case "opacity" :
					var geoType = $("#"+tagID.setlayerList+layerMap.viewNo).attr(tagID.geometryType);
					var changeType = styleMap.getStyleType(geoType, sort);
					mapUtil.changeStyle(layerMap.nowLayer, changeType, val);
					break;
				case "width" :
					var geoType = $("#"+tagID.setlayerList+layerMap.viewNo).attr(tagID.geometryType);
					var changeType = styleMap.getStyleType(geoType, sort);
					//console.log("실행 geoType : ", geoType)
					//console.log("실행 changeType : ", changeType)
					mapUtil.changeStyle(layerMap.nowLayer, changeType, val)
					break;
				case "radius" :
					var geoType = $("#"+tagID.setlayerList+layerMap.viewNo).attr(tagID.geometryType);
					var changeType = styleMap.getStyleType(geoType, sort);
					//console.log("실행 geoType : ", geoType)
					//console.log("실행 changeType : ", changeType)
					mapUtil.changeStyle(layerMap.nowLayer, changeType, val)
					break;
				}
			}
		},
		/**
		 * 색상 변경 함수
		 * 
		 */
		changeDirectStyle : function(){
			//변수 호출
			var param = fn_getParam();
			console.log("!! param.styleCode : ", param.styleCode)
			if( layerMap.viewNo == '' ){
				return;
			}else if( param.styleCode == '1' ){
				//console.log("!! layerMap.layerNm", layerMap.nowLayer)
				//console.log("!!  param.color: ",  param.color)
				//console.log("!!  getLayersId: ",  this.getLayersId())
				console.log("changeDirectStyle param : ", param)
				console.log("changeDirectStyle styleMap.setDefalutStyleType(param.geomType)+'-color' : ", styleMap.setDefalutStyleType(param.geomType)+'-color')
				console.log("changeDirectStyle layerMap.nowLayer : ", layerMap.nowLayer)
				console.log("changeDirectStyle param.color : ", param.color)
				//현재 레이어 스타일변경 
				map.setPaintProperty(layerMap.nowLayer, styleMap.setDefalutStyleType(param.geomType)+'-color', param.color);
				
				
			//컬럼 및 스타일 종류 존재시 범위값 연동	
			}
		}, 
		// layer 클릭이벤트
		mapFeatureClick : function(mapObject, active, layerId, callback){
			if( active ) {
				//this.mapClickEvent = callback;
				//this.removeEvent(mapObject);
				mapObject.on('click', layerId, callback);
				
			}
		},
		
		//레이어 이벤트 제거
		/*removeEvent : function(mapObject, layerId){
			mapObject.off('click', layerId, fn_mapPictureLayerFeature);
		},*/
		
}