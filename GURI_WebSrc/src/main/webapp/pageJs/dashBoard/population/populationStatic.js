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
	function fn_popData(){
		
		
		var param = fn_param();
		
		
		var url = "/dashBoard/population/populationStaticData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			//인구 현황
			if( resultData.popStatus.length > 0  ) fn_popStatus(resultData.popStatus[0]);
			//총인구별 추이
			fn_popTotalTrendChart(resultData.popTotalTrend);
			
			//연령별 인구현황
			fn_popAgeStatusChart(resultData.popAgeStatus, resultData.sum);
			
			//연령별 인구현황 grid
			fn_popAgeStatusGrid(resultData.popAgeStatus);
			
			//연령대별 남자구성
			fn_popAgeManChart(resultData.popAgeStatus);
			//연령대별 여자구성
			fn_popAgeWomanChart(resultData.popAgeStatus);
		})
		
	}
	
	fn_popData();
	
	function fn_popStatus(data){
		$("#popTotal").html('');
		$("#popGenderRate").html('');
		$("#popTotalIncrease").html('');
		$("#popMan").html('');
		$("#popManMonth").html('');
		$("#popManIncrease").html('');
		$("#popWoman").html('');
		$("#popWomanMonth").html('');
		$("#popWomanIncrease").html('');
		$("#popIncome").html('');
		$("#popIncomeMonth").html('');
		$("#popIncomeIncrease").html('');
		$("#popOut").html('');
		$("#popOutMonth").html('');
		$("#popOutIncrease").html('');
		
		/*$("#popTotal")[0].innerHTML = '';
		$("#popGenderRate")[0].innerHTML = '';
		$("#popTotalIncrease")[0].innerHTML = '';
		$("#popMan")[0].innerHTML = '';
		$("#popManMonth")[0].innerHTML = '';
		$("#popManIncrease")[0].innerHTML = '';
		$("#popWoman")[0].innerHTML = '';
		$("#popWomanMonth")[0].innerHTML = '';
		$("#popWomanIncrease")[0].innerHTML = '';
		$("#popIncome")[0].innerHTML = '';
		$("#popIncomeMonth")[0].innerHTML = '';
		$("#popIncomeIncrease")[0].innerHTML = '';
		$("#popOut")[0].innerHTML = '';
		$("#popOutMonth")[0].innerHTML = '';
		$("#popOutIncrease")[0].innerHTML = '';*/
		
		
		console.log('$("#popTotalIncrease") : ', $("#popTotalIncrease"))
		console.log("data.atrb15 : ", parseInt(data.atrb15))
		$("#popTotal")[0].innerHTML = data.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popGenderRate")[0].innerHTML = data.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popTotalIncrease")[0].innerHTML =data.atrb03;
		$("#popMan")[0].innerHTML = data.atrb04.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popManMonth")[0].innerHTML = data.atrb05.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popManIncrease")[0].innerHTML = data.atrb06;
		$("#popWoman")[0].innerHTML = data.atrb07.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popWomanMonth")[0].innerHTML = data.atrb08.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popWomanIncrease")[0].innerHTML = data.atrb09;
		$("#popIncome")[0].innerHTML = data.atrb10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popIncomeMonth")[0].innerHTML = data.atrb11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popIncomeIncrease")[0].innerHTML = data.atrb12;
		$("#popOut")[0].innerHTML = data.atrb13.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popOutMonth")[0].innerHTML = data.atrb14.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#popOutIncrease")[0].innerHTML = data.atrb15;
		
		if( data.atrb03 < 0 ){
			$($("#popTotalIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png")
			//console.log(' $("#popOutIncrease")[0].parentNode ' , $($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png"));
		}else{
			$($("#popTotalIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_up.png")
		}
		
		if( data.atrb06 < 0 ){
			$($("#popManIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png")
			//console.log(' $("#popOutIncrease")[0].parentNode ' , $($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png"));
		}else{
			$($("#popManIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_up.png")
		}
		
		if( data.atrb09 < 0 ){
			$($("#popWomanIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png")
			//console.log(' $("#popOutIncrease")[0].parentNode ' , $($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png"));
		}else{
			$($("#popWomanIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_up.png")
		}
		
		if( data.atrb12 < 0 ){
			$($("#popIncomeIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png")
			//console.log(' $("#popOutIncrease")[0].parentNode ' , $($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png"));
		}else{
			$($("#popIncomeIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_up.png")
		}
		
		if( data.atrb15 < 0 ){
			$($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png")
			//console.log(' $("#popOutIncrease")[0].parentNode ' , $($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_down.png"));
		}else{
			$($("#popOutIncrease")[0].parentNode.children[0]).attr("src", "/dist/images/population/ico_up.png")
		}
		
		
	}
	
	
	//연령별 인구현황 grid
	function fn_popAgeStatusGrid(data){
		
		$("#popAgeStatusGrid").html('');
		
		var html = '';
		
		html += '<caption>연령별 인구현황 테이블입니다</caption>';
		html += '<colgroup>';
		html += '<col width=" " />';
		html += '<col width="20%" />';
		html += '<col width="18%" />';
		html += '<col width="18%" />';
		html += '<col width="18%" />';
		html += '</colgroup>';
		html += '<thead>';
		html += '<th>구분</th>';
		html += '<th>내국인전체</th>';
		html += '<th>남성</th>';
		html += '<th>여성</th>';
		html += '<th>성비</th>';
		html += '</thead>';
		html += '<tbody>';
		data.forEach(function(item, index){
			
			html += '<tr>';
			html += '<td>'+item.stacSe2+'</td>';
			html += '<td>'+item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+item.atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td>'+item.atrb04+'.5</td>';
			html += '</tr>';
		})
		
		
		html += '</tbody>';
		
		$("#popAgeStatusGrid").html(html);
		/*var height = $('#popAgeStatusGrid').height();
	    var width = 500;
	    //var width = $('#popAgeStatusGrid').width()-10;
		var gridConfig = {};
		var columns = [];
		var resultData = [];
		
		for( var i = 0 ; i < data.length; i++ ){
			var result = {};
			result.atrb01 = data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.atrb02 = data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.atrb03 = data[i].atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.atrb04 = data[i].atrb04;
			result.stacSe = data[i].stacSe;
			result.stacSe2 = data[i].stacSe2;
			resultData.push(result);
		}
		
	    gridConfig.data = resultData;
	    gridConfig.width = width;
	    gridConfig.height = 480;
	    gridConfig.rowHeight = 30;
	    gridConfig.header = {
	    		height : 30
	    };
	    gridConfig.columns = columns;
	    gridConfig.columnOptions = {
	    		resizable: true
	    }
	    gridConfig.columns = [          
	        { header : "구분", name : "stacSe2", align : "center" },
	        { header : "내국인 전체", name : "atrb01", align : "center" },
	        { header : "남성", name : "atrb02", align : "center" },
	        { header : "여성", name : "atrb03", align : "center" },
	        { header : "성비", name : "atrb04", align : "center" }
	    ]
	    $("#popAgeStatusGrid").html("")
	    var grid = resultGrid.grid("popAgeStatusGrid", gridConfig);
	    tui.Grid.applyTheme('default', gridOptions);
	    $(".tui-grid-cell").css("color", "#ffffff");
	    $(".tui-grid-cell-selected").css("backgroundColor", "#222222");
	    $(".tui-grid-cell-header").css("border", "0px");
	    $(".tui-grid-table").css("border", "0px");
	    $(".tui-grid-row-odd").css("color", "#2A2A2A");
	    $(".tui-grid-row-even").css("color", "#323232");
	    $(".tui-grid-row-odd").css("height", "30px");
	    $(".tui-grid-row-even").css("height", "30px");*/
	}
	
	//연령별 인구현황
	function fn_popAgeStatusChart(data, sum){
		//chart data 객체
		var popStatusData = {};
		
		var resultData = [];
		var sumMan = parseInt(sum.sumMan);
		var sumWoman = parseInt(sum.sumWoman);
		for( var i = 0 ; i < data.length; i++ ){
			var oneData = {};
			
			oneData.stacSe2 = data[i].stacSe2;
			oneData.atrb02 = ((data[i].atrb02/sumMan)*100);
			oneData.atrb03 = "-"+((data[i].atrb03/sumWoman)*100);
			
			resultData.push(oneData);
		}
		
		popStatusData.data = resultData;
		popStatusData.dataFieldsCategory = "stacSe2";
		popStatusData.dataFieldsValue1 = "atrb03";
		popStatusData.dataFieldsValue2 = "atrb02";
		
		var ageChart = CHART.dashBoard_pop_ageStatus("popAgeStatus", popStatusData);
		
	}
	
	//연령대별 남자 구성 
	function fn_popAgeManChart(data){
		//chart data 객체
    	var popManStatusData = {};
    	
    	var resultData = [];
    	var colorList = [
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
			]
    	for( var i = 0 ; i < data.length; i++ ){
    		var oneData = {};
    		oneData.stacSe2 = data[i].stacSe2;
    		oneData.atrb02 = data[i].atrb02;
    		oneData.color = colorList[i];
    		resultData.push(oneData);
    	}
    	
    	popManStatusData.data = resultData;
    	popManStatusData.dataFieldsCategory = "stacSe2";
    	popManStatusData.dataFieldsValue = "atrb02";
    	popManStatusData.dataFieldsColor = "color";
		var ageManChart = CHART.dashBoard_pop_ageManStatus("popManStatus", popManStatusData);
	}
	
	//연령대별 여자구성 
	function fn_popAgeWomanChart(data){
		//chart data 객체
    	var popWomanStatusData = {};
    	
    	var resultData = [];
    	var colorList = [
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
			]
    	for( var i = 0 ; i < data.length; i++ ){
    		var oneData = {};
    		oneData.stacSe2 = data[i].stacSe2;
    		oneData.atrb03 = data[i].atrb03;
    		oneData.color = colorList[i];
    		resultData.push(oneData);
    	}
    	
    	popWomanStatusData.data = resultData;
    	popWomanStatusData.dataFieldsCategory = "stacSe2";
    	popWomanStatusData.dataFieldsValue = "atrb03";
    	popWomanStatusData.dataFieldsColor = "color";
		var ageManChart = CHART.dashBoard_pop_ageWomanStatus("popWomanStatus", popWomanStatusData);
	}
	
	//총인구 추이
	function fn_popTotalTrendChart(data){
		//chart data 객체
    	var popTotalTrendData = {};
    	
    	var resultData = [];
    	
    	for( var i = data.length-1 ; i > -1; i-- ){
    		resultData.push(data[i]);
    	}
    	
    	popTotalTrendData.data = resultData;
    	popTotalTrendData.dataFieldsCategory = "stacYmd";
    	popTotalTrendData.dataFieldsValue1 = "atrb01";
    	popTotalTrendData.dataFieldsValue2 = "atrb02";
		var stackChart = CHART.dashBoard_pop_totalTrend("popTotalTrend", popTotalTrendData);
	}
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_popData();
    });
})
