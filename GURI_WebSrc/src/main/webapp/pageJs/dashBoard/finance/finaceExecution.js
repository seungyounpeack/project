var loading = $.loading();
$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYY',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	function fn_param(){
		var param = {};
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//인구 통계 데이터 호출 함수
	function fn_finExecutionData(){
		
		
		var param = fn_param();
		if( param == null )
		
			console.log("param : ", param)
		
		var url = "/dashBoard/finance/financeExecutionData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			//부서별 신속집행 데이터 조회
			fn_finExecutionDeptChart(resultData.finExecutionDept);
			
			//부서별 신속집행 데이터 조회 함수 호출
			fn_finExecutionSortChart(resultData.finExecutionSort);
			
		})
		
	}
	
	fn_finExecutionData();
	
	//부서별 신속집행 데이터 조회
	function fn_finExecutionDeptChart(data){
		//chart data 객체
    	var finExecutionDeptData = {};
    	
    	var max = 0;
    	
    	
    	//최대값 구하기
    	data.forEach(function(item, index){
    		if( item.atrb01 > max ) max = item.atrb01;
    	})
    	
    	console.log("max : ", max)
    	finExecutionDeptData.data = data;
    	finExecutionDeptData.max = max;
    	finExecutionDeptData.dataFieldsCategory = "name";
    	finExecutionDeptData.dataFieldsValue1 = "atrb01";
    	finExecutionDeptData.dataFieldsValue2 = "atrb02";
    	finExecutionDeptData.dataFieldsValue3 = "atrb03";
    	console.log("data : ", data)
		var finExecutionDeptChart = CHART.dashBoard_fin_executionDept("executionDept", finExecutionDeptData);
		
	}
	
	//분야별 신속집행 데이터 조회 함수 호출
	function fn_finExecutionSortChart(data){
		//chart data 객체
    	var finExecutionSortData = {};
    	
    	var max = 0;
    	
    	
    	//최대값 구하기
    	data.forEach(function(item, index){
    		if( item.atrb01 > max ) max = item.atrb01;
    	})
    	
    	finExecutionSortData.data = data;
    	finExecutionSortData.max = max;
    	finExecutionSortData.dataFieldsCategory = "name";
    	finExecutionSortData.dataFieldsValue1 = "atrb01";
    	finExecutionSortData.dataFieldsValue2 = "atrb02";
    	finExecutionSortData.dataFieldsValue3 = "atrb03";
    	console.log("data : ", data)
		var finExecutionSortChart = CHART.dashBoard_fin_executionSort("executionSort", finExecutionSortData);
	}
	
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_finExecutionData();
    });
})
