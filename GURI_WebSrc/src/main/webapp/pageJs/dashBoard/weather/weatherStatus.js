//로딩 객체
var loading = $.loading();

////레이어 리스트
//var layerList = [];
//
////레이어 소스 리스트
//var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	//날짜
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()

	});
	
	//이벤트 처리
	$('.dateSelect').datetimepicker()
    .on('dp.change', function(e) {
    	fn_getData();
    });
	
	fn_getData();
	
});

//param 생성 
function fn_param(){
	var param = {};
	var date = $("#startDate").val();
	param.startDate = date;
	return param;
}

//데이터 호출 함수
function fn_getData(){
	
	var param = fn_param();
	
	var url = "/dashBoard/weather/weatherStatusData.do";
	
	
	Util.request(url, param, function(resultData){
		fn_setStatusData(resultData);
		fn_setPmGrid(resultData);
	})
	
}

//현황 데이터 세팅
function fn_setStatusData(data) {
	$("#dataTimeTxt").text(data['airData']['datatime'] + ' 기준');
	console.log("data : ", data);
	var temperature = data['temperature']['tereVal'];
	console.log("temperature : ", temperature);
	var precipitation = data['precipitation']['tereVal'];
	console.log("precipitation : ", precipitation);
	var pm10Value = data['airData']['pm10value'];
	var pm25Value = data['airData']['pm25value'];
	var o3Value = data['airData']['o3value'];
	var no2Value = data['airData']['no2value'];
	var coValue = data['airData']['covalue'];
	var so2Value = data['airData']['so2value'];
	
	//텍스트 설정
	$("#tempValue").html(temperature);
	$("#rainValue").html(precipitation);
	$("#pm10Value").html(pm10Value);
	$("#pm25Value").html(pm25Value);
	$("#o3Value").html(o3Value);
	$("#no2Value").html(no2Value);
	$("#coValue").html(coValue);
	$("#so2Value").html(so2Value);
	
	//좋음 ~ 매우나쁨 이미지 설정
	
	var imgLevel1 = '/dist/images/weather/weather_level1.png';//좋음
	var imgLevel2 = '/dist/images/weather/weather_level2.png';//보통
	var imgLevel3 = '/dist/images/weather/weather_level3.png';//나쁨
	var imgLevel4 = '/dist/images/weather/weather_level4.png';//매우 나쁨
	
	
	var imgSrc = '';
	
	//미세먼지
	var pm10 = parseFloat(pm10Value);
	if(pm10 <= 30) imgSrc = imgLevel1;
	else if(pm10 <= 80) imgSrc = imgLevel2;
	else if(pm10 <= 150) imgSrc = imgLevel3;
	else if(pm10 > 150) imgSrc = imgLevel4;
	$("#pm10ValueImg").attr('src', imgSrc);
	
	//초미세먼지
	var pm25 = parseFloat(pm25Value);
	if(pm25 <= 15) imgSrc = imgLevel1;
	else if(pm25 <= 35) imgSrc = imgLevel2;
	else if(pm25 <= 75) imgSrc = imgLevel3;
	else if(pm25 > 75) imgSrc = imgLevel4;
	$("#pm25ValueImg").attr('src', imgSrc);
	
	//오존
	var o3 = parseFloat(o3Value);
	if(o3 <= 0.03) imgSrc = imgLevel1;
	else if(o3 <= 0.09) imgSrc = imgLevel2;
	else if(o3 <= 0.15) imgSrc = imgLevel3;
	else if(o3 > 0.15) imgSrc = imgLevel4;
	$("#o3ValueImg").attr('src', imgSrc);
	
	//이산화질소
	var no2 = parseFloat(no2Value);
	if(no2 <= 0.03) imgSrc = imgLevel1;
	else if(no2 <= 0.06) imgSrc = imgLevel2;
	else if(no2 <= 0.2) imgSrc = imgLevel3;
	else if(no2 > 0.2) imgSrc = imgLevel4;
	$("#no2ValueImg").attr('src', imgSrc);
	
	//일산화탄소
	var co = parseFloat(coValue);
	if(co <= 2) imgSrc = imgLevel1;
	else if(co <= 9) imgSrc = imgLevel2;
	else if(co <= 15) imgSrc = imgLevel3;
	else if(co > 15) imgSrc = imgLevel4;
	$("#coValueImg").attr('src', imgSrc);
	
	//아황산가스
	var so2 = parseFloat(so2Value);
	if(so2 <= 0.02) imgSrc = imgLevel1;
	else if(so2 <= 0.05) imgSrc = imgLevel2;
	else if(so2 <= 0.15) imgSrc = imgLevel3;
	else if(so2 > 0.15) imgSrc = imgLevel4;
	$("#so2ValueImg").attr('src', imgSrc);
	
}

//미세먼지 표 채우기
function fn_setPmGrid(resultData) {
	var data = resultData['airGridData']//미세먼지, 초미세먼지 데이터
	var pm10Obsrvty = resultData['pm10Obsrvty']//미세먼지 관측소
	var pm25Obsrvty = resultData['pm25Obsrvty']//초미세먼지 관측소
	var pm10ObsrDate = resultData['pm10ObsrDate']//미세먼지 관측일
	var pm25ObsrDate = resultData['pm25ObsrDate']//초미세먼지 관측일
	
	var pm10Data = [];//미세먼지 그리드 데이터
	var pm25Data = [];//초미세먼지 그리드 데이터
	
	for (var i = 0; i < data.length; i++) {
		var oneData = {};
		oneData.stacDate = data[i]['stacDate'];
		oneData.val = data[i]['val'];
		oneData.stacSe = data[i]['stacSe'];
		if(data[i]['stacCd'] == 'WT_STT_002') pm10Data.push(oneData);
		else if(data[i]['stacCd'] == 'WT_STT_003') pm25Data.push(oneData);
	}

	var date = $("#startDate").val();
	var year = parseInt(date.substring(0,4));
	var month = parseInt(date.substring(4,6));
	var lastDate = (new Date(year, month, 0)).getDate();

	var pm10Html = '';
	pm10Html += '<tr>';
	pm10Html += '<th rowspan="4">미세먼지</th>';
	pm10Html += '<th>관측소</th>';
	for (var i = 0; i < lastDate; i++) {//31
		if(i >= lastDate) {
			pm10Html += '<th></th>';
		}
		else {
			pm10Html += '<th>';
			pm10Html += ('0' + (i+1)).slice(-2);
			pm10Html += '</th>';
		}
	}
	pm10Html += '</tr>';
	for (var i = 0; i < pm10Obsrvty.length; i++) {
		pm10Html += '<tr>';
		pm10Html += '<th>' + pm10Obsrvty[i]['stacSe'] + '</th>';
		for (var j = 0; j < lastDate; j++) {//31
			var check = false; //td태그 생성시 true
			for (var x = 0; x < pm10Data.length; x++) {
				if(pm10Obsrvty[i]['stacSe']  == pm10Data[x]['stacSe']) {
					if(pm10Data[x]['stacDate'] == ('0' + (j+1)).slice(-2)) {
						if(!check) {
							var tdClass = '';
							if(pm10Data[x]['val'] <= 30) tdClass = 'td_lv1';
							else if(pm10Data[x]['val'] <= 80) tdClass = 'td_lv2';
							else if(pm10Data[x]['val'] <= 150) tdClass = 'td_lv3';
							else if(pm10Data[x]['val'] > 150) tdClass = 'td_lv4';
							pm10Html += '<td class="' + tdClass + '">' + pm10Data[x]['val'] + '</td>';
							check = true;
						}
					}
				}
			}
			if(!check) {
				pm10Html += '<td></td>';
			}
		}
		pm10Html += '</tr>';
	}
	$("#pm10Tbody").html(pm10Html);
	///////////////////////////////////////////////////////////
	
	//colgroup 설정
	var colHtml = '';
	colHtml += '<col width="7.5%" /><col width="7.5%" />';
	for (var i = 0; i < lastDate; i++) {
		colHtml += '<col width="" />';
	}
	$(".colgroups").html(colHtml);
	
	var pm25Html = '';
	
	pm25Html += '<tr>';
	pm25Html += '<th rowspan="4">초미세먼지</th>';
	pm25Html += '<th>관측소</th>';
	for (var i = 0; i < lastDate; i++) {
		if(i >= lastDate) {
			pm25Html += '<th></th>';
		}
		else {
			pm25Html += '<th>';
			pm25Html += ('0' + (i+1)).slice(-2);
			pm25Html += '</th>';
		}
	}
	pm25Html += '</tr>';
	for (var i = 0; i < pm25Obsrvty.length; i++) {
		pm25Html += '<tr>';
		pm25Html += '<th>' + pm25Obsrvty[i]['stacSe'] + '</th>';
		for (var j = 0; j < lastDate; j++) {
			var check = false; //td태그 생성시 true
			for (var x = 0; x < pm25Data.length; x++) {
				if(pm25Obsrvty[i]['stacSe']  == pm25Data[x]['stacSe']) {
					if(pm25Data[x]['stacDate'] == ('0' + (j+1)).slice(-2)) {
						if(!check) {
							var tdClass = '';
							if(pm25Data[x]['val'] <= 30) tdClass = 'td_lv1';
							else if(pm25Data[x]['val'] <= 80) tdClass = 'td_lv2';
							else if(pm25Data[x]['val'] <= 150) tdClass = 'td_lv3';
							else if(pm25Data[x]['val'] > 150) tdClass = 'td_lv4';
							pm25Html += '<td class="' + tdClass + '">' + pm25Data[x]['val'] + '</td>';
							check = true;
						}
					}
				}
			}
			if(!check) {
				pm25Html += '<td></td>';
			}
		}
		pm25Html += '</tr>';
	}
	$("#pm25Tbody").html(pm25Html);
}
