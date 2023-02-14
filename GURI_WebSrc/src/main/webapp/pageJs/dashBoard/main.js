var loading = $.loading();

var layerList = [];
var sourceList = [];
var markerList = [];
var attribute = [];

$(function(){
	document.body.style.zoom = "100%";
	var tpDataList = [];
	function fn_mainData(){

		var url = "/dashBoard/mainData.do";
		
		Util.request(url, {}, function(resultData){

			//mapUtil.addLayer(null, 'tpList', 'tpList', 'circle', 'geojson', {});
			
			fn_categoryList(resultData.categoryList);
			//fn_createMap(resultData.admdArea);
			
			fn_covidInfo(resultData.covidInfo);
			fn_populationInfo(resultData.populationInfo);
			fn_populationFlowInfo(resultData.populationFlowInfo);
			//fn_businessList(resultData.businessList);
			
			//fn_complaintList(resultData.complaintList);
			//fn_opinionList(resultData.opinionList);
			fn_complaintReceived(resultData.complaintReceived);
			fn_newsList(resultData.newsList);

			fn_weatherInfo(resultData.weatherInfo);
			fn_airInfo(resultData.airInfo);
			tpDataList = resultData.tpList;
			attribute = resultData.attribute;
			fn_wordCloud(resultData.wordCloud);
			
			fn_compAnalysisStatus(resultData.selectCompStatus);
			
			//민원 접수 현황 함수 호출
			//if( resultData.complainReceipt.length > 0 ) fn_complainReceiptData(resultData.complainReceipt);
			
			fn_getWeather();
			$(".mid_menu a:eq(0)").click();
			/*map.setZoom(11);
			map.setCenter([127.06842172797701, 37.73619329481321]);*/
			//map.triggerRepaint();
			/*map.flyTo({
				center: [127.039054678593,37.7325924013584]
				});*/
		});
	}
	
	fn_mainData();
	
	//민원 접수 현황 함수  ATRB_01, ATRB_02, ATRB_03, ATRB_04
	function fn_complainReceiptData(data){
		console.log("data : ", data)
		$("#spnText1").html(data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText2").html(data.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText3").html(data.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText4").html(data.atrb04.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
	};
	
	//실시간 기상현황
	function fn_getWeather(){
		
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=37.738089&lon=127.033733&appid=1b9d06fd87a5db2f445a1c15c771cfe9&units=metric'
				,function(data){
			if( data.main != null ){
				
				var minTemp = data.main.temp_min;
				var maxTemp = data.main.temp_max;
				var temp = data.main.temp;
				var humidity = data.main.humidity;
				var type = data.weather[0].description;
				var sky = data.weather[0].main;
				var probability = data.clouds.all;
				var degree = parseInt(data.wind.deg);
				var speed = data.wind.speed;
				var result = parseInt(((degree + 22.5 * 0.5) / 22.5));
				var img = "/dist/images/main/";
				var wind = fn_getResultData(result);
				console.log("wind : ", wind)
				var resultSpeed = "(" + wind + "풍) " + speed + "m/s";
				console.log("type : ", type.indexOf("clouds"))
				if( type.indexOf("clouds") > 0){
					img += "icon_flat_cloudy.svg";
					type = "구름";
				}
				else if(type.indexOf("rain") > 0){
					img += "icon_flat_rainy.svg";
					type = "비";
				}
				else{
					img += "icon_flat_sunny.svg";
					type = "맑음";
				}
				console.log("img : ", img)
				//$('#weatherTemp').html(temp + "°C");
				$('#weatherTemp').html(Util.XSSCheck(temp, 1) + "°C");
				$("#weatherSpeed").html(Util.XSSCheck(resultSpeed, 1));
				$('#weatherType').html(Util.XSSCheck(type, 1));
				$('#humidity').html(Util.XSSCheck(humidity, 1) + "%");
				document.getElementById("weatherIcon").src = img;
			}
		});
		
		
		$("#weather").on("click", function(){
			 var url = "https://www.weather.go.kr/w/index.do";
	         var name = "기상청";
	 		var winObject = null;
	         //var option = "width = 500, height = 500, top = 100, left = 200, location = no"
	         
	 		winObject = window.open(url, name,'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
				
			winObject.moveTo(0,0); //창위치
			winObject.focus();
		})
	}
	
	function fn_getResultData(data){
		var result = "";
		console.log("resultData : ", data)
		if( data == "0" ) result = "북";
		else if(  data == "1"  ) result = "북북동";
		else if(  data == "2"  ) result = "북동";
		else if(  data == "3"  ) result = "동북동";
		else if(  data == "4"  ) result = "동";
		else if(  data == "5"  ) result = "동남동";
		else if(  data == "6"  ) result = "남동";
		else if(  data == "7"  ) result = "남남동";
		else if(  data == "8"  ) result = "남";
		else if(  data == "9"  ) result = "남남서";
		else if(  data == "10"  ) result = "남서";
		else if(  data == "11"  ) result = "서남서";
		else if(  data == "12"  ) result = "서";
		else if(  data == "13"  ) result = "서북서";
		else if(  data == "14"  ) result = "북서";
		else if(  data == "15"  ) result = "북북서";
		else if(  data == "16"  ) result = "북";
		
		return result;
	}
	//민원 현황
	function fn_compAnalysisStatus(data){
		$("#complainTopThree").html('');
		var html = '';
		
		
		data.forEach(function(item, index){
			
			html += '<div class="top3_box">';
			html += '<p class="tbox_num">' + (index+1) + '</p>';
			html += '<div class="top3_desc">';
			html += '<dl class="tb_100">';
			html += '<dt>'+item.keyword+'</dt>';
			html += '<dd>'+item.totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'<span class=""mn_unit"">건</span></dd>';
			html += '</dl>';
			html += '<dl class="tb_50 dotline_r">';
			html += '<dt>긍정률</dt>';
			html += '<dd class="c_orange">' + item.positiveCnt + ' <span class="mn_12">%</span></dd>';
			html += '</dl>';
			html += '<dl class="kw_50">';
			html += '<dt>부정률</dt>';
			html += '<dd class="c_aqua">' + item.negativeCnt + ' <span class="mn_12">%</span></dd>';
			html += '</dl>';
			html += '</div>';
			html += '</div>';
			
		})
		
		if( data.length > 0 ){
			
			$("#complainTop .maintxt_sm").text("(" + data[0].stacYmd + " 기준)");
		}else{
			
			//$("#complainTop .maintxt_sm").text("(" + data.stacYmd + " / 단위:천명)");
		}
		
		$("#complainTopThree").html(html);
		
	}
	
	//여론분석 워드클라우드 함수
	function fn_wordCloud(data){
		//chart data 객체
    	var compPublicWordcloudData = {};
    	$("#compPublicWordcloud").html('');
    	
    	compPublicWordcloudData.data = data;
    	compPublicWordcloudData.dataFieldsCategory = "keyword";
    	compPublicWordcloudData.dataFieldsValue = "cnt";
		var compPublicWordcloudChart = CHART.dashBoard_comp_publicWorldcloud("wordCloud", compPublicWordcloudData);
		if( data.length > 0 ){
			
			$("#compPublic .maintxt_sm").text("(" + data[0].stacYmd + " 기준)");
		}else{
			
			//$("#complainTop .maintxt_sm").text("(" + data.stacYmd + " / 단위:천명)");
		}
	}
	
	function fn_mainTpData(index){
		for( var i=0;i<markerList.length;i++){
			markerList[i].remove();
		}
		console.log("tpDataList : ", tpDataList)
		var tpLayer = tpDataList[index];
		//var tpLayer = JSON.parse(tpDataList[index][0]['jsonBuildObject']['value']);
		console.log("tpLayer : 	" , tpLayer)
		
		//popup창 데이터 생성
		$("#mini_wrap").css("display", "none");
		//마커생성
		fn_createMarker(tpLayer, "tpList", tpDataList);
		$(".main_rm").html("");
		console.log("tpLayer[0] : " , tpLayer[0])
		if( tpLayer[0] == null ) {
			return;
		}else{
			
			fn_createLegend(tpLayer[0].typeno, tpDataList);
		}
		
	}
	
	
/*	function fn_mainTpData(index){
		for( var i=0;i<markerList.length;i++){
			markerList[i].remove();
		}
		var tpLayer = JSON.parse(tpDataList[index][0]['jsonBuildObject']['value']);
		fn_createMarker(tpLayer, "tpList", map);
		$(".main_rm").html("");
		if( tpLayer.features.length == 0 ) return;
		fn_createLegend(tpLayer.features[0].properties.typeNo);
		
	}
	
*/	function fn_createLegend(no, data) {
	var icons = ["cctv", "tree", "tree", "wifi", "firewater", "traffic_light", "emergency_bell", "safety_sign", "children_safety", "nursery", "parking", "crosswalk", "guide_sign"];
		//var steps = [];
		/*data.forEach(function(item, index){
			if( item.length > 0 ){
				var maxValue = 0;
				var minValue = 9999999;
				var iconName = "";
				var range = [];
				item.forEach(function(subItem, subIndex){
					iconName = subItem.enTp;
					if( maxValue < subItem.cnt ) maxValue = subItem.cnt;
					if( minValue > subItem.cnt ) minValue = subItem.cnt;
				})
				icons.push(iconName);
				var rangeValue = parseInt(maxValue) - parseInt(minValue);
				for( var i = 1; i < 5; i++ ){
					if( i < 4 ) range.push(minValue+((rangeValue/5)*i)+"이하");
					if( i == 4 ) range.push(minValue+((rangeValue/5)*i)+"이상");
				}
				//steps.push(range);
			}
 		})*/
 		console.log("icons : ", icons)
		var steps = [
			["30기 이하", "60기 미만", "60기 이상", "90기 이상"],
			["700그루 이하", "1400그루 미만", "1400그루 이상", "2100그루 이상"],
			["700그루 이하", "1400그루 미만", "1400그루 이상", "2100그루 이상"],
			["1기 이하", "2기 미만", "2기 이상", "3기 이상"],
			["8기 이하", "16기 미만", "16기 이상", "24기 이상"],
			["80기 이하", "160기 미만", "160기 이상", "240기 이상"],
			["10기 이하", "20기 미만", "20기 이상", "30기 이상"],
			["60기 이하", "120기 미만", "120기 이상", "180기 이상"],
			["3기 이하", "6기 미만", "6기 이상", "9기 이상"],
			["13기 이하", "26기 미만", "26기 이상", "39기 이상"],
			["8기 이하", "16기 미만", "16기 이상", "24기 이상"],
			["60기 이하", "120기 미만", "120기 이상", "180기 이상"],
			["80기 미만", "160기 이하", "160기 이상", "240기 이상"]
		];
		console.log("no :::: ", no)
		var html = "";
		for( var i=1;i<5;i++) {
			html += '<li><span class="rm_lv'+i+'">';
			html += '<img src="/dist/images/main/'+icons[(no-1)]+'_lv'+i+'.svg" alt="">';
			html += '</span><br /><span class="rm_text">';
			html += steps[no-1][(i-1)];
			html += '</span></li>';
		}
/*		for( var i=1;i<5;i++) {
			html += '<li><span class="rm_lv'+i+'">';
			html += '<img src="/dist/images/main/'+icons[(no-1)]+'_lv'+i+'.svg" alt="">';
			html += '</span><br /><span class="rm_text">';
			html += steps[no-1][(i-1)];
			html += '</span></li>';
		}
*/		$(".main_rm").html(html);
	}
	
	function fn_categoryList(data) {
		var html = "";
		var className = "";
		for( var i = 0 ; i < data.length ; i++ ){
			className = "";
			if( i == 0 ) className = "on";
			html += '<li><a class="" style="cursor:pointer">'+data[i].tp+'</a></li>';
		}
		
		$(".mid_menu").html(html);
		
		$(".mid_menu a").click(function() {
			$(".mid_menu a").removeClass("on");
			$(".cont_title").text($(this).text())
			$(this).addClass("on");
			console.log("$(this).parent().index() : ", $(this).parent().index())
			fn_mainTpData($(this).parent().index());
			current = $(this).parent().index();
		});
	}
	
	function fn_createMap(data) {
		var admdArea = JSON.parse(data[0]['jsonBuildObject']['value']);
		var style = { 
			"fill-color": '#454545',
			"fill-outline-color" : '#BDBDBD',
			'fill-opacity': 1
		};
		mapUtil.addLayer(admdArea, 'admd', 'admd', 'fill', 'geojson', style, 'admd_nm', 14);
	}
	
	function fn_covidInfo(data) {
		$(".covid_date").text("("+data.dataStdrDe+" 기준)");
		$(".covid_cnfd").html(data.cnfdPop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'<span class="txt18">명</span>');
		$(".covid_thrp").text(data.undrThrpPop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$(".covid_recv").text(data.cmplRecvPop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$(".covid_dead").text(data.deadPop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
	}
	
	function fn_populationInfo(data) {
		$("#populationInfoContainer .maintxt_sm").text("(" + data.stacYmd + " / 단위:천명)");
		$("#populationInfoContainer .all_people dd").text(data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#populationInfoContainer .people_man dd").text(data.atrb04.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#populationInfoContainer .people_woman dd").text(data.atrb07.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
	}
	
	function fn_populationFlowInfo(data) {
		$(".move_population li:eq(0) b").text(data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+" 명");
		$(".move_population li:eq(2) b").text(data.atrb05.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+" 명");
		$(".move_population li:eq(4) b").text(data.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+" 명");
	}
	
	function fn_businessList(data) {
		var html = "";
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<div class="bui_area">';
			if( data[i].percent == 100 )
				html += '	<p class="complete">추진완료</p>';
			html += '	<dl class="bui_box">';
			html += '		<dt>' + data[i].stacSe + '</dt>';
			html += '		<dd>' + data[i].percent + '<span class="txt16">%</span></dd>';
			html += '	</dl>';
			html += '</div>';
		}
		$("#businessInfoContainer").html(html);
	}
	
	function fn_complaintList(data) {
		var html = "";
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<a class="keyword_st';
			if( i < 3 ) html += ' st_blue';
			html += '" href="#">#'+data[i].stacSe+'</a>';
			if( i == 2 || i == 6 ) html += '<br/>'
		}
		$("#complaintContainer").html(html);
	}
	
	function fn_opinionList(data) {
		var html = "";
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<a class="keyword_st';
			if( i < 3 ) html += ' st_blue';
			html += '" href="#">#'+data[i].stacSe+'</a>';
			if( i == 2 || i == 6 ) html += '<br/>'
		}
		$("#opinionContainer").html(html);
	}
	
	function fn_complaintReceived(data) {
		//$("#complaintReceivedContainer .maintxt_sm").text("(" + data.stacYmd + ")");
		$("#complaintReceivedContainer .state_bx:eq(0) dd").text(data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#complaintReceivedContainer .state_bx:eq(1) dd").text(data.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#complaintReceivedContainer .state_bx:eq(2) dd").text(data.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#complaintReceivedContainer .state_bx:eq(3) dd").text(data.atrb04.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		
	}
	
	function fn_newsList(data) {
		var html = "";
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<li><a href="'+data[i].newsUrl+'" target="_blank">'+data[i].newsSj+'<br /><span class="news_date">['+data[i].colcPath+'] '+data[i].colcDe+'</span></a></li>';
		}
		$("#newsContainer").html(html);
		
	}
	
	function fn_weatherInfo(data) {
		$("#weatherContainer .maintxt_sm").text("(" + data.basedate + " " + data.basetime + ")");
		$("#weatherContainer .w_box:eq(0) dd").text(data.temperature+"˚");
		$("#weatherContainer .w_box:eq(1) dd").text(data.rain + "mm");
	}
	
	function fn_airInfo(data) {
		$("#weatherContainer .w_box:eq(2) dd").html( getIconImage(data.pm10grade1h) );
		$("#weatherContainer .w_box:eq(3) dd").html( getIconImage(data.pm25grade1h) );
		
		function getIconImage(value) {
			if( value == 1 ) return '<span class="weather_1">좋음</span>';
			else if( value == 2 ) return '<span class="weather_2">보통</span>';
			else if( value == 3 ) return '<span class="weather_3">나쁨</span>';
			else if( value == 4 ) return '<span class="weather_4">매우나쁨</span>';
		}
	}
	
	//행정동별 기업체 수 함수
	function fn_emdCompanyCnt(mapData, range ){
		map.setCenter([127.06842172797701, 37.73619329481321]);
		
		var style = fn_getStyle('ent_cnt', range);
		//mapUtil.addLayer(defaultData, 'default', 'default', 'fill', 'geojson', {'fill-color' : '#2a2a2a'}, '');
		mapUtil.addLayer(mapData, 'result', 'result', 'fill', 'geojson', style, 'dong_nm');
		map.moveLayer('result' , 'result_text');
		
		map.off('click', 'result', mapFeatureClick);
		mapUtil.mapFeatureClick(map, true, 'result', mapFeatureClick);
	}
	
	function fn_emdCompanyStatsChart(data) {
		var params = {
			type: 'bar',				// 타입
			elementId: 'emdCompanyStatsChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				paddingTop: 30,
				fontSize: 14,
				height: "370",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '억',
			xCategory: 'stacYmd',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}년</span><br/> <span style="font-size:11px;">{valueY}{additional}억</span>'
			}],
			// 차트 컬러
			colors: ["#ebbb13"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_yearCompanySalesTable(data) {
		$("#yearCompanySalesList").html('');
		
		var html = '';
		html += '<caption>행정동별 기업동향 통계 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="10%" />';
		html += '<col width="10%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="11%" />';
		html += '<col width="12%" />';
		html += '<col width="12%" />';
		html += '<col width="" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		var rowTitle = {}, lastDongNm;
		for( var i = 0 ; i < data.length ; i++ ){
			if( rowTitle[data[i].dongNm] == undefined ) rowTitle[data[i].dongNm] = 0;
			rowTitle[data[i].dongNm]++;
		}
		
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<tr>';
			if( lastDongNm != data[i].dongNm) { 
				html += '<td rowspan="'+rowTitle[data[i].dongNm]+'" style="vertical-align: middle;">'+data[i].dongNm+'</td>';
				lastDongNm = data[i].dongNm;
			}
			html += '<td>'+data[i].crtrYr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].slsAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].bsnPrit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].caplTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].asetTot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].empCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].avgSary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+data[i].totSary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#yearCompanySalesList").html(html);
	}
	
	/*function fn_industryRateChart(data) {
		var params = {
			type: 'pie',				// 타입
			elementId: 'industryRateChart',		// 아이디
			animated: true,
			style: {
				height: "430",
				fontSize: 12,
				radius: 100,
				innerRadius: 30
			},
			legend: {
				visible: false,
				position: 'bottom',
				template: '[bold {color}]{name}[/]'
			},
			dataFields: {
				value: 'atrb01',
				category: 'stacSe',
				//tooltip: '{category}\n[bold]{value.percent}[/]'
				//tooltip: '<span style="font-size:12px;font-weight:bold;">{country}</span><br/> <span style="font-size:11px;">{value}</span>'
			},
			data: data
		};
		CHART.createPieChart(params);
	}
	function fn_industryProfitChart(data) {
		var params = {
			type: 'bar',				// 타입
			elementId: 'industryProfitChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "430",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '천원',
			xCategory: 'stacSe',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}천원</span>'
			}],
			// 차트 컬러
			colors: ["#79c7e5", "#79a7e5", "#7983e5", "#9379e6", "#b479e5", "#d579e6", "#e479d9", "#e57abc", "#eb7b9e", "#ff7b7c"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	*/
	//지도 클릭 이벤트
	function mapFeatureClick(e) {
		var objectKey = Object.keys(e.features[0].properties);
		var objectValue = Object.values(e.features[0].properties);
		
		var param = {};
		param.dongCd = e.features[0].properties.dong_cd;
		var url = "/dashBoard/company/companyTrendCompanySalesData.do";
		Util.request(url, param, function(resultData){
			fn_yearCompanySalesTable(resultData.yearCompanySales);
		});
	}
	
	
	$(".covid_19").on("click", function(){
		 var url = "https://www.ui4u.go.kr/corona_index.jsp";
         var name = "코로나 현황";
 		var winObject = null;
         //var option = "width = 500, height = 500, top = 100, left = 200, location = no"
         
 		winObject = window.open(url, name,'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
			
		winObject.moveTo(0,0); //창위치
		winObject.focus();
         
	});
	
});

/*var map = new mapboxgl.Map({
	container: 'mainMap',
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
	maxZoom : 11.1,
	style: {
		version: 8, 
		sources: {
			
			vworld: {
				type: "raster", 
				tiles: ['https://g.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'], 
				tileSize: 256, attribution:""
			}
			
		},
		layers: [],
		//"sprite": "http://openmaptiles.org/sprites/",
		"glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
		//glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
	}

});*/
//프렌차이즈 마커 생성
//geojson : data
//layerIdMap ; layerId
//mapObject : map객체
function fn_createMarker(geojson, layerIdMap, totalData){
	console.log("geojson : ", geojson)
	$("#markerTag").html("");
	 geojson.forEach(function (item, index) {
	    // create a DOM element for the marker
	    var el = document.createElement('p');
	    var input = document.createElement('input');
	    var img = document.createElement('img'); // 이미지 객체 생성
	    var cnt = item.cnt;
	    //if( cnt >= 90 )
	    //var className = "main_marker main_marker"+marker.properties.typeNo;
	    var sort = item.typeno;
	    var dongCode = item.dongCd;
	    var pert = item.pert;
	    var imgUrl = "/dist/images/main/";
	    var className = "";
	    console.log("itemitemitem : ", item)
	    console.log("dongCode : ", dongCode)
	    if( dongCode == "4115051000" ) className += "uijeongbu1 img_lv";     // 의정부1동
	    else if( dongCode == "4115052000" )	className += "uijeongbu2 img_lv";    // 의정부 1동
	    else if( dongCode == "4115054500" )	className += "howon1 img_lv";    // 호원 1동
	    else if( dongCode == "4115055500" )	className += "howon2 img_lv";    // 호원 2동
	    else if( dongCode == "4115056100" )	className += "jangam img_lv";    // 장암동
	    else if( dongCode == "4115056700" )	className += "singok1 img_lv";   //신곡1동
	    else if( dongCode == "4115056800" )	className += "singok2 img_lv";   //신곡 2동
	    else if( dongCode == "4115057300" )	className += "songsan1 img_lv";  //송산1동
	    else if( dongCode == "4115057600" )	className += "songsan2 img_lv";  //송산2동
	    else if( dongCode == "4115057800" )	className += "songsan3 img_lv";  //송산3동
	    else if( dongCode == "4115058000" )	className += "jakeum img_lv";    //자금동
	    else if( dongCode == "4115059500" )	className += "ganeung img_lv";    //가능동
	    else if( dongCode == "4115061500" )	className += "heungsun img_lv";   //흥선동
	    else if( dongCode == "4115062000" )	className += "nokyang img_lv";    //녹양동
	    
	    console.log(" geojson: ", geojson)
	    
	    console.log("sort :sort", sort)
	    
	    if( sort == "1" && cnt >= 90 ) {
	    	className += "4";
	    	imgUrl += "cctv_lv4.svg";
	    }
	    else if( sort == "1" && cnt >= 60 ) {
	    	className += "3";
	    	imgUrl += "cctv_lv3.svg";
	    }
	    else if( sort == "1" && cnt <= 30 ) {
	    	className += "1";
	    	imgUrl += "cctv_lv1.svg";
	    }
	    else if( sort == "1" && cnt < 60 ) {
	    	className += "2";
	    	imgUrl += "cctv_lv2.svg";
	    }
	    else if( sort == "2" && cnt >= 2100 ) {
	    	className += "4";
	    	imgUrl += "tree_lv4.svg";
	    }
	    else if( sort == "2" && cnt >= 1400 ) {
	    	className += "3";
	    	imgUrl += "tree_lv3.svg";
	    }
	    else if( sort == "2" && cnt <= 700 ) {
	    	className += "1";
	    	imgUrl += "tree_lv1.svg";
	    }
	    else if( sort == "2" && cnt < 1400 ) {
	    	className += "2";
	    	imgUrl += "tree_lv2.svg";
	    }
	    else if( sort == "3" && cnt >= 2100 ) {
	    	className += "4";
	    	imgUrl += "tree_lv4.svg";
	    }
	    else if( sort == "3" && cnt >= 1400 ) {
	    	className += "3";
	    	imgUrl += "tree_lv3.svg";
	    }
	    else if( sort == "3" && cnt <= 700 ) {
	    	className += "1";
	    	imgUrl += "tree_lv1.svg";
	    }
	    else if( sort == "3" && cnt < 1400 ) {
	    	className += "2";
	    	imgUrl += "tree_lv2.svg";
	    }

	    else if( sort == "4" && cnt >= 3 ) {
	    	className += "4";
	    	imgUrl += "wifi_lv4.svg";
	    }
	    else if( sort == "4" && cnt >= 2 ) {
	    	className += "3";
	    	imgUrl += "wifi_lv3.svg";
	    }
	    else if( sort == "4" && cnt <= 1 ) {
	    	className += "1";
	    	imgUrl += "wifi_lv1.svg";
	    }
	    else if( sort == "4" && cnt < 2 ) {
	    	className += "2";
	    	imgUrl += "wifi_lv2.svg";
	    }
	    else if( sort == "5" && cnt >= 24 ) {
	    	className += "4";
	    	imgUrl += "firewater_lv4.svg";
	    }
	    else if( sort == "5" && cnt >= 16 ) {
	    	className += "3";
	    	imgUrl += "firewater_lv3.svg";
	    }
	    else if( sort == "5" && cnt <= 8 ) {
	    	className += "1";
	    	imgUrl += "firewater_lv1.svg";
	    }
	    else if( sort == "5" && cnt < 16 ) {
	    	className += "2";
	    	imgUrl += "firewater_lv2.svg";
	    }

	    else if( sort == "6" && cnt >= 240 ) {
	    	className += "4";
	    	imgUrl += "traffic_light_lv4.svg";
	    }
	    else if( sort == "6" && cnt >= 160 ) {
	    	className += "3";
	    	imgUrl += "traffic_light_lv3.svg";
	    }
	    else if( sort == "6" && cnt <= 80 ) {
	    	className += "1";
	    	imgUrl += "traffic_light_lv1.svg";
	    }
	    else if( sort == "6" && cnt < 160 ) {
	    	className += "2";
	    	imgUrl += "traffic_light_lv2.svg";
	    }

	    else if( sort == "7" && cnt >= 30 ) {
	    	className += "4";
	    	imgUrl += "emergency_bell_lv4.svg";
	    }
	    else if( sort == "7" && cnt >= 20 ) {
	    	className += "3";
	    	imgUrl += "emergency_bell_lv3.svg";
	    }
	    else if( sort == "7" && cnt <= 10 ) {
	    	className += "1";
	    	imgUrl += "emergency_bell_lv1.svg";
	    }
	    else if( sort == "7" && cnt < 20 ) {
	    	className += "2";
	    	imgUrl += "emergency_bell_lv2.svg";
	    }

	    else if( sort == "8" && cnt >= 180 ) {
	    	className += "4";
	    	imgUrl += "safety_sign_lv4.svg";
	    }
	    else if( sort == "8" && cnt >= 120 ) {
	    	className += "3";
	    	imgUrl += "safety_sign_lv3.svg";
	    }
	    else if( sort == "8" && cnt <= 60 ) {
	    	className += "1";
	    	imgUrl += "safety_sign_lv1.svg";
	    }
	    else if( sort == "8" && cnt < 120 ) {
	    	className += "2";
	    	imgUrl += "safety_sign_lv2.svg";
	    }

	    else if( sort == "9" && cnt >= 9 ) {
	    	className += "4";
	    	imgUrl += "children_safety_lv4.svg";
	    }
	    else if( sort == "9" && cnt >= 6 ) {
	    	className += "3";
	    	imgUrl += "children_safety_lv3.svg";
	    }
	    else if( sort == "9" && cnt <= 3 ) {
	    	className += "1";
	    	imgUrl += "children_safety_lv1.svg";
	    }
	    else if( sort == "9" && cnt < 6 ) {
	    	className += "2";
	    	imgUrl += "children_safety_lv2.svg";
	    }

	    else if( sort == "10" && cnt >= 39 ) {
	    	className += "4";
	    	imgUrl += "nursery_lv4.svg";
	    }
	    else if( sort == "10" && cnt >= 26 ) {
	    	className += "3";
	    	imgUrl += "nursery_lv3.svg";
	    }
	    else if( sort == "10" && cnt <= 13 ) {
	    	className += "1";
	    	imgUrl += "nursery_lv1.svg";
	    }
	    else if( sort == "10" && cnt < 26 ) {
	    	className += "2";
	    	imgUrl += "nursery_lv2.svg";
	    }

	    else if( sort == "11" && cnt >= 24 ) {
	    	className += "4";
	    	imgUrl += "parking_lv4.svg";
	    }
	    else if( sort == "11" && cnt >= 16 ) {
	    	className += "3";
	    	imgUrl += "parking_lv3.svg";
	    }
	    else if( sort == "11" && cnt <= 8 ) {
	    	className += "1";
	    	imgUrl += "parking_lv1.svg";
	    }
	    else if( sort == "11" && cnt < 16 ) {
	    	className += "2";
	    	imgUrl += "parking_lv2.svg";
	    }

	    else if( sort == "12" && cnt >= 24 ) {
	    	className += "4";
	    	imgUrl += "crosswalk_lv4.svg";
	    }
	    else if( sort == "12" && cnt >= 16 ) {
	    	className += "3";
	    	imgUrl += "crosswalk_lv3.svg";
	    }
	    else if( sort == "12" && cnt <= 8 ) {
	    	className += "1";
	    	imgUrl += "crosswalk_lv1.svg";
	    }
	    else if( sort == "12" && cnt < 16 ) {
	    	className += "2";
	    	imgUrl += "crosswalk_lv2.svg";
	    }
	    
	    else if( sort == "13" && cnt >= 240 ) {
	    	className += "4";
	    	imgUrl += "guide_sign_lv4.svg";
	    }
	    else if( sort == "13" && cnt >= 160 ) {
	    	className += "3";
	    	imgUrl += "guide_sign_lv3.svg";
	    }
	    else if( sort == "13" && cnt <= 80 ) {
	    	className += "1";
	    	imgUrl += "guide_sign_lv1.svg";
	    }
	    else if( sort == "13" && cnt < 160 ) {
	    	className += "2";
	    	imgUrl += "guide_sign_lv2.svg";
	    }

	    
	    console.log("className : ", className)
	    img.src = imgUrl; 
	    img.style.cursor = 'pointer'; // 커서 지정
	    img.className = "mapEmd";
	    input.type = "hidden";
	    input.value = item.dongNm;
	    el.className = className;
	    //el.textContent = cnt;
	    if( pert > 50 )
	    el.style.width = pert + "px";
	    el.style.height = pert + "px";
	    el.appendChild(img); 
	    el.appendChild(input); 
	    document.getElementById("markerTag").appendChild(el);
	    //el.style.paddingTop = marker.properties.pert + "px";
	    //el.innerHTML = '';
	    
	    $(".mapEmd").on("click", function(){
	    	var html = '';
	    	var dongCd = '';
	    	console.log("this : " , $(this.parentNode.children[1]).val());
	    	if( attribute.length > 0 ) {
	    		html += '<a id="mini_close" class="mini_close" href="javascript:;">닫기</a>';
	    		html += '<p class="mini_title">' + $(this.parentNode.children[1]).val() + ' 도시 현황</p>';
	    		html += '<ul class="mini_desc">';
	    		for( var i = 0 ; i < attribute.length; i++ ){
	    			if( attribute[i].dongNm == $(this.parentNode.children[1]).val() ){
	    				html += '<li>' + attribute[i].tp + ' : ' + attribute[i].cnt + '</li>';
	    				dongCd = attribute[i].dongCd;
	    			}
	    		}
	    		html += '</ul>';
	    		html += '<p class="go_detail"><a href="javascript:fn_detailAttribute('+dongCd+');" class="bt_detail">자세히 보기</a></p>';
	    		$("#attributePopup").html(html);
	    		
	    		$("#mini_wrap").css("display", "");
	    	}
	    	$("#mini_close").on("click", function(){
	    		$("#mini_wrap").css("display", "none");
	    		
	    	})
	    })
	 });
}


function fn_detailAttribute(code) {

	var sideMenu = document.querySelectorAll('.mid_menu a');
	var tp = "";
	// ul > li 전체 조회
	for(var i = 0; i < sideMenu.length; i++) {
			
		var tagLi = $(sideMenu[i]);
		// active 인 메뉴 속성을 지운다
		if (tagLi.hasClass("on") ) {
			tp = tagLi[0].innerHTML;
		}
	}
	var param = {};
	param.dongCode = code;
	param.tp = tp;
	//location.href = "/dashBoard/mainDetail.do?" + "dongCode=" + code;
	var menuParam = "MENU_00059";
	Util.loadContentPage(menuParam, undefined, param);
}
/*function fn_createMarker(geojson, layerIdMap, mapObject){
	geojson.features.forEach(function (marker) {
		// create a DOM element for the marker
		var el = document.createElement('div');
		var cnt = marker.properties.cnt;
		var className = "main_marker main_marker"+marker.properties.typeNo;
		console.log(" geojson: ", geojson)
		console.log(" marker.geometry: ", marker.geometry)
		if( marker.properties.typeNo == "1" && cnt >= 90 ) className += "_4";
		else if( marker.properties.typeNo == "1" && cnt >= 60 ) className += "_3";
		else if( marker.properties.typeNo == "1" && cnt <= 30 ) className += "_1";
		else if( marker.properties.typeNo == "1" && cnt < 60 ) className += "_2";
		
		else if( marker.properties.typeNo == "2" && cnt >= 2100 ) className += "_4";
		else if( marker.properties.typeNo == "2" && cnt >= 1400 ) className += "_3";
		else if( marker.properties.typeNo == "2" && cnt <= 700 ) className += "_1";
		else if( marker.properties.typeNo == "2" && cnt < 1400 ) className += "_2";
		
		else if( marker.properties.typeNo == "3" && cnt >= 2100 ) className += "_4";
		else if( marker.properties.typeNo == "3" && cnt >= 1400 ) className += "_3";
		else if( marker.properties.typeNo == "3" && cnt <= 700 ) className += "_1";
		else if( marker.properties.typeNo == "3" && cnt < 1400 ) className += "_2";
		
		else if( marker.properties.typeNo == "4" && cnt >= 3 ) className += "_4";
		else if( marker.properties.typeNo == "4" && cnt >= 2 ) className += "_3";
		else if( marker.properties.typeNo == "4" && cnt <= 1 ) className += "_1";
		else if( marker.properties.typeNo == "4" && cnt < 2 ) className += "_2";
		
		else if( marker.properties.typeNo == "5" && cnt >= 24 ) className += "_4";
		else if( marker.properties.typeNo == "5" && cnt >= 16 ) className += "_3";
		else if( marker.properties.typeNo == "5" && cnt <= 8 ) className += "_1";
		else if( marker.properties.typeNo == "5" && cnt < 16 ) className += "_2";
		
		else if( marker.properties.typeNo == "6" && cnt >= 240 ) className += "_4";
		else if( marker.properties.typeNo == "6" && cnt >= 160 ) className += "_3";
		else if( marker.properties.typeNo == "6" && cnt <= 80 ) className += "_1";
		else if( marker.properties.typeNo == "6" && cnt < 160 ) className += "_2";
		
		else if( marker.properties.typeNo == "7" && cnt >= 30 ) className += "_4";
		else if( marker.properties.typeNo == "7" && cnt >= 20 ) className += "_3";
		else if( marker.properties.typeNo == "7" && cnt <= 10 ) className += "_1";
		else if( marker.properties.typeNo == "7" && cnt < 20 ) className += "_2";
		
		else if( marker.properties.typeNo == "8" && cnt >= 180 ) className += "_4";
		else if( marker.properties.typeNo == "8" && cnt >= 120 ) className += "_3";
		else if( marker.properties.typeNo == "8" && cnt <= 60 ) className += "_1";
		else if( marker.properties.typeNo == "8" && cnt < 120 ) className += "_2";
		
		else if( marker.properties.typeNo == "9" && cnt >= 9 ) className += "_4";
		else if( marker.properties.typeNo == "9" && cnt >= 6 ) className += "_3";
		else if( marker.properties.typeNo == "9" && cnt <= 3 ) className += "_1";
		else if( marker.properties.typeNo == "9" && cnt < 6 ) className += "_2";
		
		else if( marker.properties.typeNo == "10" && cnt >= 39 ) className += "_4";
		else if( marker.properties.typeNo == "10" && cnt >= 26 ) className += "_3";
		else if( marker.properties.typeNo == "10" && cnt <= 13 ) className += "_1";
		else if( marker.properties.typeNo == "10" && cnt < 26 ) className += "_2";
		
		else if( marker.properties.typeNo == "11" && cnt >= 24 ) className += "_4";
		else if( marker.properties.typeNo == "11" && cnt >= 16 ) className += "_3";
		else if( marker.properties.typeNo == "11" && cnt <= 8 ) className += "_1";
		else if( marker.properties.typeNo == "11" && cnt < 16 ) className += "_2";
		
		else if( marker.properties.typeNo == "12" && cnt >= 24 ) className += "_4";
		else if( marker.properties.typeNo == "12" && cnt >= 16 ) className += "_3";
		else if( marker.properties.typeNo == "12" && cnt <= 8 ) className += "_1";
		else if( marker.properties.typeNo == "12" && cnt < 16 ) className += "_2";
		
		
		
		
		el.className = className;
		el.textContent = marker.properties.cnt;
		//el.style.width = marker.properties.pert + "px";
		//el.style.height = marker.properties.pert + "px";
		//el.style.paddingTop = marker.properties.pert + "px";
		
		var html = '';
		
		var createMarker = new mapboxgl.Marker(el)
		.setLngLat(marker.geometry.coordinates)
		.addTo(mapObject);
		markerList.push(createMarker);
	});
}
*/
var interval;
var current = 0;
function startInterval() {
	stopInterval();
	interval = setInterval(function() {
		current++;
		if( current > 11 ) current = 0;
		$(".roll_menu li:eq("+current+") a").click();
		$(".roll_menu").scrollTop(current*35);
	}, 5000);
	$(".m_play").hide();
	$(".m_stop").show();
}

function stopInterval() {
	clearInterval(interval);
	$(".m_play").show();
	$(".m_stop").hide();
}

function fn_movePage(menuCode){
	var menuParam = menuCode;
	Util.loadContentPage(menuParam);
}