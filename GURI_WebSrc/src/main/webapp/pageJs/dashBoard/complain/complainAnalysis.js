var loading = $.loading();
$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	function fn_param(){
		var param = {};
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//인구 통계 데이터 호출 함수
	function fn_complainAnalysisData(){
		
		
		var param = fn_param();
			console.log("param : ", param)
		
		var url = "/dashBoard/complain/complainAnalysisData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//민원 현황
			fn_compAnalysisStatus(resultData.compAnalysisStatus, resultData.keyword);
			
			//행정동별 민원 상위
			fn_compAnalysisRankChart(resultData.compAnalysisRank);
			
			//일별 언급량 추이
			fn_compAnalysisDayChart(resultData.compAnalysisDay);
			
			//긍정 부정분석
			fn_compAnalysisNpChart(resultData.compAnalysisNp);
			//연관어 분석
			fn_compAnalysisRelateChart(resultData.compAnalysisRelate, resultData.keyword);
		})
		
	}
	
	fn_complainAnalysisData();
	
	//민원 현황
	function fn_compAnalysisStatus(data, keyword){
		$("#compAnalysisStatus").html('');
		var html = '';
		
		
		data.forEach(function(item, index){
			
			html += '<div class="keyword_area">';
			html += '<p class="box_num">' + (index+1) + '</p>';
			html += '<div class="keyword_box">';
			html += '<dl class="kw_100">';
			html += '<dt>'+item.keyword+'</dt>';
			html += '<dd>'+item.totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'<span class="add_unit">건</span></dd>';
			html += '</dl>';
			html += '<dl class="kw_50 dotline_r">';
			html += '<dt>긍정률</dt>';
			html += '<dd class="c_orange">' + item.positiveCnt + ' %</dd>';
			html += '</dl>';
			html += '<dl class="kw_50">';
			html += '<dt>부정률</dt>';
			html += '<dd class="c_aqua">' + item.negativeCnt + ' %</dd>';
			html += '</dl>';
			html += '</div>';
			html += '</div>';
			
		})
		
		
		$("#compAnalysisStatus").html(html);
		
		var listTag = document.getElementsByClassName("keyword_box");
		
		if( keyword != undefined ) $(listTag[0]).addClass("on");
		
			
		$(".keyword_box").on("click", function(){
			var no = 0;
			for( var i = 0 ; i < listTag.length; i++ ){
				if( listTag[i] == this ) no = i;
				$(listTag[i]).removeClass("on");
			}
			$(this).addClass("on");
			//console.log("$(listTag[i]).hasClass('on'): ",$(listTag[i]).hasClass('on'))
			
			var param = {};
			param.keyword = listTag[no].children[0].children[0].innerHTML;
			param.startDate = $("#startDate").val();
			
			//키워드 클릭 함수 호출
			fn_clickKeyword(param);
		})
		
	}
	
	//키워드 클릭시 함수
	function fn_clickKeyword(param){
		
		var url = "/dashBoard/complain/complainAnalysisSearchData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			//행정동별 민원 상위
			if( resultData.compAnalysisRank.length > 0 ) fn_compAnalysisRankChart(resultData.compAnalysisRank);
			
			//일별 언급량 추이
			if( resultData.compAnalysisDay.length > 0 ) fn_compAnalysisDayChart(resultData.compAnalysisDay);
			
			//긍정 부정분석
			if( resultData.compAnalysisNp.length > 0 ) fn_compAnalysisNpChart(resultData.compAnalysisNp);
			//연관어 분석
			if( resultData.compAnalysisRelate.length > 0 ) fn_compAnalysisRelateChart(resultData.compAnalysisRelate, param.keyword);
			
		})
		
	}
	
	//행정동별 민원 상위
	function fn_compAnalysisRankChart(data){
		//chart data 객체
    	var compAnalysisRankData = {};
    	
    	
    	compAnalysisRankData.data = data;
    	compAnalysisRankData.dataFieldsCategory = "name";
    	compAnalysisRankData.dataFieldsValue = "atrb01";
    	console.log("data : ", data)
		var compAnalysisRankChart = CHART.dashBoard_comp_AnalysisRank("compAnalysisRank", compAnalysisRankData);
	}
	
	
	//일별 언급량 추이
	function fn_compAnalysisDayChart(data){
		//chart data 객체
    	var compAnalysisDayData = {};
    	
    	
    	compAnalysisDayData.data = data;
    	compAnalysisDayData.dataFieldsCategory = "date";
    	compAnalysisDayData.dataFieldsValue = "cnt";
		var compAnalysisDayChart = CHART.dashBoard_comp_AnalysisDay("compAnalysisDay", compAnalysisDayData);
	}
	
	//긍정 부정분석
	function fn_compAnalysisNpChart(data){
		//chart data 객체
    	var compAnalysisNpData = {};
    	
    	var resultData = [];
    	/*var colorList = [
			am4core.color("#66DC8F"),
			am4core.color("#67DCA7"),
			am4core.color("#65DCBE"),
			am4core.color("#66DDDB"),
			am4core.color("#67B6DC"),
			am4core.color("#6A92DD"),
			am4core.color("#6672DC"),
			am4core.color("#7F66DC"),
			am4core.color("#A267DB"),
			am4core.color("#C866DD"),
			am4core.color("#DB66CF"),
			]*/
    	/*for( var i = 0 ; i < data.length; i++ ){
    		var oneData = {};
    		oneData.stacSe2 = data[i].stacSe2;
    		oneData.atrb03 = data[i].atrb03;
    		oneData.color = colorList[i];
    		resultData.push(oneData);
    	}*/
    	
    	compAnalysisNpData.data = data;
    	compAnalysisNpData.dataFieldsCategory = "atrb01";
    	compAnalysisNpData.dataFieldsValue = "cnt";
    	//compAnalysisNpData.dataFieldsColor = "color";
		var compAnalysisNpChart = CHART.dashBoard_comp_AnalysisNp("compAnalysisNp", compAnalysisNpData);
	}
	
	//연관어 분석
	function fn_compAnalysisRelateChart(data, keyword){
		//chart data 객체
    	var compAnalysisRelateData = {};
    	$("#compAnalysisRelate").html('');
    	compAnalysisRelateData.data = [{
    		cnt : "연관어 분석",
    		color : "#ffffff",
    		name : keyword,
    		children : data
    	}];
    	
    	//compAnalysisRelateData.data = data;
    	compAnalysisRelateData.dataFieldsCategory = "keyword";
    	compAnalysisRelateData.dataFieldsValue = "cnt";
    	compAnalysisRelateData.dataFieldsColor = "color";
    	compAnalysisRelateData.dataFieldsChildren = "children";
		var stackChart = CHART.dashBoard_comp_AnalysisRelate("compAnalysisRelate", compAnalysisRelateData);
	}
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_complainAnalysisData();
    });
})
