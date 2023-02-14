var loading = $.loading();

var layerList = [];
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	/*map.on("load", function(){
		map.setLayoutProperty('vworld', 'visibility', 'none');
	})*/
	
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});

	// 의정부시 전체 데이터 조회
	$("#btnTotalSearch").click(function() {
		fn_popFlowData();
		
		var param = {admdName: "의정부시"};
		fn_changeName(param)
	});
	
	 //$( "#startDate" ).datepicker( "option", "minDate", '201901' );
     //$( "#startDate" ).datepicker( "option", "maxDate", '202003' );
     //console.log('$( "#startDate" ).datepicker() : ', $( "#startDate" ).datepicker())
     	
	
	function fn_param(){
		var param = {};
		param.startDate = $("#startDate").val();
		return param;
	}
	
	
	//인구 통계 데이터 호출 함수
	function fn_popFlowData(){
		
		var param = fn_param();
			console.log("실행")
		
		var url = "/dashBoard/population/populationFlowData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//popEmdTime, popDayFlow, popGenderFlow, popRegService
			
			//유동인구 지도 
			fn_popEmdTime(JSON.parse(resultData.popEmdTime.jsonBuildObject.value), resultData.popEmdTimeRange);
			//요일별 인구
			fn_popDayFlowChart(resultData.popDayFlow);
			
			//성 연령별 유동 인구
			fn_popGenderFlowChart(resultData.popGenderFlow, resultData.sum);
			
			//거주지별 생활인구/서비스 인구
			fn_popRegServiceChart(resultData.popRegService);
			map.setLayoutProperty('vworld', 'visibility', 'none');
		})
		
	}
	
	fn_popFlowData();
	
	//전입전출 순이동 현황 차트 함수
	function fn_popEmdTime(mapData, range ){
		//sourceId, layerId, layerType, sourceType, style, columnNm
		map.setCenter([127.06842172797701, 37.73619329481321]);
		
		var style = fn_getStyle('flow_nope', range);
		console.log("style : ", style)
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'admd_nm');
		//mapUtil.addGeoServerLayer('cmm_admd_area', 'cmm_admd_area', 'cmm_admd_area', '', '', 'admd_nm')
		map.moveLayer('result' , 'result_text');
		
		
		//mapUtil.removeEvent(map, 'result');
		map.off('click', 'result', fn_mapPictureLayerFeature);
		mapUtil.mapFeatureClick(map, true, 'result', fn_mapPictureLayerFeature);
	}
	
	/*fn_test();
	function fn_test(){
		var data = {
			    "WH_CODE":"SM01"
			        ,"OPEN_API_YN":"Y"
			        ,"DATA":{
			            "VENDOR_CODE": decoding(encodeURI("54846"))
			            ,"ITEM_CODE":decoding(encodeURI("B01012"))
			            ,"ITEM_NAME":decoding(encodeURI("아이템이름"))
			            ,"WIDTH":decoding(encodeURI(12))
			            ,"LENGTH":decoding(encodeURI(5))
			            ,"HEIGHT":decoding(encodeURI(3))
			            ,"WEIGHT":decoding(encodeURI(40))
			            ,"BARCODE":decoding(encodeURI("852524"))
			            ,"BASE_UNIT":decoding(encodeURI(""))
			            ,"BASE_QTY":decoding(encodeURI(10))
			            ,"SAFETY_STOCK":decoding(encodeURI(""))
			        }
			    };
		
		var key = "aw5eik2fi8nsa8j6";
		console.log("data : ", data.toString());
		
	}
	
	function decoding(str){
		var key = "aw5eik2fi8nsa8j6";
		//var encrypt = CryptoJS.AES.encrypt(str, key);
		//console.log("encrypt : ", encrypt)
		var encrypt = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
    			iv: CryptoJS.enc.Utf8.parse(''), // [Enter IV (Optional) 지정 방식]
    			padding: CryptoJS.pad.Pkcs7,
    			mode: CryptoJS.mode.CBC // [cbc 모드 선택]
    		});

    		// [인코딩 된 데이터 확인 실시]
    	var 	aes128EncodeData = encrypt.toString();
    	console.log("aes128EncodeData : ", aes128EncodeData)
    	
    	var decrypt = CryptoJS.AES.decrypt(aes128EncodeData, CryptoJS.enc.Utf8.parse(key), {
    			iv: CryptoJS.enc.Utf8.parse(''), // [Enter IV (Optional) 지정 방식]
    			padding: CryptoJS.pad.Pkcs7,
    			mode: CryptoJS.mode.CBC // [cbc 모드 선택]
    		});

    		// [인코딩 된 데이터 확인 실시]
    		var aes128DecodeData = decrypt.toString(CryptoJS.enc.Utf8);   
    		console.log("aes128DecodeData : ", aes128DecodeData)
    	
		return aes128EncodeData;
	    //var decrypted = CryptoJS.AES.decrypt(encrypt, passphrase );
		//let cipher = Crypto.createCipheriv("AES-128-ECB", key, "");
	    //let encrypted = cipher.update(text, "", "");
	    //console.log('data :: ', Buffer.concat([encrypted, cipher.final()]).toString("base64"));
	    //return Buffer.concat([encrypted, cipher.final()]).toString("base64");
	}*/
	//요일별 인구 차트 함수 호출
	function fn_popDayFlowChart(data){
		//chart data 객체
		var popDayFlowData = {};
		
		popDayFlowData.data = data;
		popDayFlowData.dataFieldsCategory = "stacSe";
		popDayFlowData.dataFieldsValue1 = "atrb01";
		popDayFlowData.dataFieldsValue2 = "atrb02";
		popDayFlowData.dataFieldsValue3 = "atrb03";
		popDayFlowData.dataFieldsValue4 = "atrb04";
		popDayFlowData.dataFieldsValue5 = "atrb05";
		popDayFlowData.dataFieldsValue6 = "atrb06";
		popDayFlowData.dataFieldsValue7 = "atrb07";
		
		var popDayFlowChart = CHART.dashBoard_pop_dayFlow("popDayFlow", popDayFlowData);
		
	};
	
	//성 연령별 유동 인구 함수 호출
	function fn_popGenderFlowChart(data, sum){
		//chart data 객체
		var popGenderFlowData = {};
		
		var resultData = [];
		var sumMan = parseInt(sum.sumMan);
		var sumWoman = parseInt(sum.sumWoman);
		for( var i = 0 ; i < data.length; i++ ){
			var oneData = {};
			
			oneData.stacSe2 = data[i].stacSe2;
			oneData.atrb01 = "-"+(data[i].atrb01);
			oneData.atrb02 = (data[i].atrb02);
			
			resultData.push(oneData);
		}
		
		
		popGenderFlowData.data = resultData;
		popGenderFlowData.dataFieldsCategory = "stacSe2";
		popGenderFlowData.dataFieldsValue1 = "atrb01";
		popGenderFlowData.dataFieldsValue2 = "atrb02";
		
		var popGenderFlowChart = CHART.dashBoard_pop_genderFlow("popGenderFlow", popGenderFlowData);
		
	};
	
	//거주지별 생활인구/서비스 인구
	function fn_popRegServiceChart(data){
		//chart data 객체
    	var popRegServiceData = {};
    	
    	var resultData = [];
    	//var admdName = [];
    	for( var i = data.length-1 ; i > -1; i-- ){
    		resultData.push(data[i]);
    	}
    	popRegServiceData.data = resultData;
    	popRegServiceData.dataFieldsCategory = "stacSe";
    	//popRegServiceData.dataFieldsCategory2 = "admdNm";
    	popRegServiceData.dataFieldsValue = "atrb01";
		var popRegServiceChart = CHART.dashBoard_pop_regService("popRegService", popRegServiceData);
	}
	
	

	//지도 클릭시 데이터 로딩
	function fn_mapClickData(param){
		console.log("param : ", param)
		var url = "/dashBoard/population/populationFlowSearchData.do";
		Util.request(url, param, function(resultData){
			//요일별 인구
			if(resultData.popDayFlow.length > 0) fn_popDayFlowChart(resultData.popDayFlow);
			
			//성 연령별 유동 인구
			if(resultData.popGenderFlow.length > 0) fn_popGenderFlowChart(resultData.popGenderFlow, resultData.sum);
			
			//거주지별 생활인구/서비스 인구
			if(resultData.popRegService.length > 0) fn_popRegServiceChart(resultData.popRegService);
			
			fn_changeName(param);
		})
	}
	
	
	//span name 변경
	function fn_changeName(data){
		var tag = document.getElementsByClassName('searchName');
		
		if( tag.length > 0 ){
			for( var i = 0 ; i < tag.length; i++ ){
				tag[i].innerHTML = data.admdName;
			}
		}
		
	}

	//지도 클릭 이벤트
	function fn_mapPictureLayerFeature(e) {
		var objectKey = Object.keys(e.features[0].properties);
		var objectValue = Object.values(e.features[0].properties);
		console.log("obejctValue : ", e.features[0].properties.dong_cd);
		
		var param = {};
		param.admdCode = e.features[0].properties.dong_cd;
		param.admdName = e.features[0].properties.admd_nm;
		param.startDate = $("#startDate").val();
		//지도 클릭시 데이터 로딩 함수 호출
		fn_mapClickData(param)
	}	
	
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_popFlowData();
    });
})

var map = new mapboxgl.Map({
	container: 'popEmdTime',
	center: [127.039054678593,37.7325924013584],
	zoom: 11.1,
	//pitch: 40,
	//bearing: 20,
	//antialias: true,
	//화면 기울기설정(2,3D)
	pitchWithRotate: false,
	dragRotate: false,
	dragPan: false,
	preserveDrawingBuffer: false,
	maxBounds : [[126.89775478671477, 37.68550996229325], [127.20908866924005, 37.77684195414009]],
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
	console.log("colorRange : ", colorRange)
	var colorList = [
		"#e5eece",
		"#c3d682",
		"#96c64a",
		"#4aa83d",
		"#29762b"
		
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

//범례생성함수 
function fn_createLegend(range, color){
	$("#mapLegend").html('');
	var html = '';
	html += '<ul style="width:150px;">';
	for( var i = 0 ; i < range.length; i++ ){
		html +='<li><span class="rm0'+(i+1)+'"></span>' + range[i].fromValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ~ ' + range[i].toValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</li>';
		/*html += '<div style="margin-bottom : 5px; width: 15px; height: 15px; margin-left: 10px; background-color: ' + color[i] + ';">';
		html += '<span style="display: inline=block; margin-left: 20px; font-size:12px; width:100px;">' + range[i].fromValue.toFixed(0) + '~' + range[i].toValue.toFixed(0) + '</span>';
		html += '</div>';*/
	}
	
	html += '</ul>';
	
	
	$("#mapLegend").html(html);
}

