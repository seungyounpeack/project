var loading = $.loading();
$(function(){
	document.body.style.zoom = "100%";
	var deptFinDiv = false;
	var sortFinDiv = false;
	var deptExecDiv = false;
	var deptContDiv = false;
	var nowId = "tab-1";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYY',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	function fn_param(){
		var param = {};
		param.startYear = $("#startDate").val();
		return param;
	}
	
	
	
	//인구 통계 데이터 호출 함수
	function fn_financeStatusData(){
		
		
		var param = fn_param();
		if( param == null )
		
			console.log("param : ", param)
		
		var url = "/dashBoard/finance/financeStatusData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//부서별 예산현황
			if( resultData.finDept.length > 0 ) {
				deptFinDiv = true;
				fn_finStatusDeptChart(resultData.finDept);
				//그리드
				fn_finStatusDeptData(resultData.finDept);
				
			}else{
				deptFinDiv = false;
			}
			
			//분야 부문별 예산 현황 데이터
			if( resultData.finSort.length > 0 ) {
				sortFinDiv = true;
				
				fn_finStatusSortChart(resultData.finSort);
				//그리드
				fn_finStatusSortData(resultData.finSort);
				//재정 약어
				fn_finStatusList(resultData.finSort)
			}else{
				fn_setFirst();
				sortFinDiv = false;
			}
			
			//부서별 집행현황
			if( resultData.finExecution.length > 0 ) {
				deptExecDiv = true;
				//차트
				fn_finStatusExecutionChart(resultData.finExecution);
				
				//그리드
				fn_finStatusExecutionData(resultData.finExecution);
			}else{
				fn_setFirst();
				deptExecDiv = false;
			}
			
			//부서별 계약현황 데이터 조회
			if( resultData.finContract.length > 0 ) {
				deptContDiv = true;
				fn_finContractChart(resultData.finContract);
				//그리드
				fn_finContractData(resultData.finContractList);
			}else{
				fn_setFirst();
				deptContDiv = false;
			}
		})
		
	}
	
	fn_financeStatusData();
	
	//재정 약어 테이블
	function fn_finStatusList(data){
		$("#finStatusSortName").html('');
		
		var html = '';
		html += '<caption>재정 항목 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="40%" />';
		html += '<col width=" " />';
		html += '</colgroup>';
		html += '<tbody>';
		
		data.forEach(function(item, index){
			
			html += '<tr>';
			html += '<td class="c_gray">'+item.category+'</td>';
			html += '<td>'+item.subName+'</td>';
			html += '</tr>';
		})
		html += '</tbody>';
		
		$("#finStatusSortName").html(html);
	}
	
	//부서별 계약현황 데이터 테이블
	function fn_finContractData(data){
		$("#finContracList").html('');
		$("#finContracList2").html('');
		
		var html = '';
		var html2 = '';
		var cnt = Math.ceil(data.length/2);
		html += '<caption>재정 항목 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="6%" />';
		html += '<col width="12%" />';
		html += '<col width=" " />';
		html += '<col width="8%" />';
		html += '<col width="8%" />';
		html += '<col width="15%" />';
		html += '<col width="10%" />';
		html += '<col width="8%" />';
		html += '<col width="12%" />';
		html += '</colgroup>';
		html += '<tbody>';
		html2 += '<caption>재정 항목 설명 테이블</caption>';
		html2 += '<colgroup>';
		html2 += '<col width="6%" />';
		html2 += '<col width="12%" />';
		html2 += '<col width=" " />';
		html2 += '<col width="8%" />';
		html2 += '<col width="8%" />';
		html2 += '<col width="15%" />';
		html2 += '<col width="10%" />';
		html2 += '<col width="8%" />';
		html2 += '<col width="12%" />';
		html2 += '</colgroup>';
		html2 += '<tbody>';
		console.log("lsit : ", data)
			
		for( var i = 0 ; i < cnt ; i++ ){
			
			html += '<tr>';
			html += '<td>'+(i+1)+'</td>';
			html += '<td>'+data[i].deptNm+'</td>';
			html += '<td>'+data[i].title+'</td>';
			html += '<td>'+data[i].sort+'</td>';
			html += '<td>'+data[i].year+'</td>';
			html += '<td>'+data[i].term+'</td>';
			html += '<td>'+data[i].date+'</td>';
			html += '<td>'+data[i].progDe+'</td>';
			html += '<td class="t_r">'+data[i].money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		}
		
		
		for( var i = cnt ; i < data.length ; i++ ){
			
			html2 += '<tr>';
			html2 += '<td>'+(i+1)+'</td>';
			html2 += '<td>'+data[i].deptNm+'</td>';
			html2 += '<td>'+data[i].title+'</td>';
			html2 += '<td>'+data[i].sort+'</td>';
			html2 += '<td>'+data[i].year+'</td>';
			html2 += '<td>'+data[i].term+'</td>';
			html2 += '<td>'+data[i].date+'</td>';
			html2 += '<td>'+data[i].progDe+'</td>';
			html2 += '<td class="t_r">'+data[i].money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html2 += '</tr>';
		}
		
		html += '</tbody>';
		html2 += '</tbody>';
		$("#finContracList").html(html);
		$("#finContracList2").html(html2);
		
	}
	
	//부서별 집행현황 테이블
	function fn_finStatusExecutionData(data){
		$("#finExecutionList").html('');
		$("#finExecutionList2").html('');
		
		
		var html = '';
		var html2 = '';
		var cnt = Math.ceil(data.length/2);
		if( data.length%2 == 1 ){
			
		} 
		html += '<caption>재정 항목 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="19.6%" />';
		html += '<col width="29.7%" />';
		html += '<col width="29.7%" />';
		html += '<col width="29.7%" />';
		html += '<col width="" />';
		html += '</colgroup>';
		html += '<tbody>';
		html2 += '<caption>재정 항목 설명 테이블</caption>';
		html2 += '<colgroup>';
		html2 += '<col width="19.6%" />';
		html2 += '<col width="29.7%" />';
		html2 += '<col width="29.7%" />';
		html2 += '<col width="29.7%" />';
		html2 += '<col width="" />';
		html2 += '</colgroup>';
		html2 += '<tbody>';
		for( var i = 0 ; i < cnt ; i++ ){
			
			html += '<tr>';
			html += '<td>' + (i+1) + '</td>';
			html += '<td>' + data[i].category +  '</td>';
			html += '<td class="budget">' + data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html += '<td class="action">' + data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html += '</tr>';
		}
		
		
		for( var i = cnt ; i < data.length ; i++ ){
			
			html2 += '<tr>';
			html2 += '<td>' + (i+1) + '</td>';
			html2 += '<td>' + data[i].category +  '</td>';
			html2 += '<td class="budget">' + data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html2 += '<td class="action">' + data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html2 += '</tr>';
		}
		
		html += '</tbody>';
		html2 += '</tbody>';
		$("#finExecutionList").html(html);
		$("#finExecutionList2").html(html2);
	}
	
	//분야 부문별 예산 현황 테이블
	function fn_finStatusSortData(data){
		$("#finStatusSortList").html('');
		$("#finStatusSortList2").html('');
		
		var html = '';
		var html2 = '';
		
		var cnt = Math.ceil(data.length/2);
		console.log("cnt : ", cnt)
		html += '<caption>재정 항목 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="10.5%" />';
		html += '<col width="20.5%" />';
		html += '<col width="22.5%" />';
		html += '<col width=" " />';
		html += '<col width="22.5%" />';
		//html += '<col width="11%" />';
		html += '</colgroup>';
		html += '<tbody>';
		html2 += '<caption>재정 항목 설명 테이블</caption>';
		html2 += '<colgroup>';
		html2 += '<col width="10.5%" />';
		html2 += '<col width="20.5%" />';
		html2 += '<col width="22.5%" />';
		html2 += '<col width=" " />';
		html2 += '<col width="22.5%" />';
		//html2 += '<col width="11%" />';
		html2 += '</colgroup>';
		html2 += '<tbody>';
		for( var i = 0 ; i < cnt ; i++ ){
			
			html += '<tr>';
			html += '<td>'+(i+1)+'</td>';
			html += '<td>'+data[i].fullName+'</td>';
			html += '<td>'+data[i].subName+'</td>';
			html += '<td class="budget">'+data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td class="spend">'+data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		}
		
		
		for( var j = cnt ; j < data.length ; j++ ){
			
			html2 += '<tr>';
			html2 += '<td>'+(j+1)+'</td>';
			html2 += '<td>'+data[j].fullName+'</td>';
			html2 += '<td>'+data[j].subName+'</td>';
			html2 += '<td class="budget">'+data[j].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html2 += '<td class="spend">'+data[j].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html2 += '</tr>';
		}
		
		html += '</tbody>';
		html2 += '</tbody>';
		
		$("#finStatusSortList").html(html);
		$("#finStatusSortList2").html(html2);
		
		
	}
	
	//부서별 예산현황 테이블
	function fn_finStatusDeptData(data){
		$("#finStatusList").html('');
		$("#finStatusList2").html('');
		
		
		var html = '';
		var html2 = '';
		var cnt = Math.ceil(data.length/2);
		html += '<caption>재정 항목 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="12.1%" />';
		html += '<col width="22.2%" />';
		html += '<col width="22.2%" />';
		html += '<col width="22.5%" />';
		html += '<col width="" />';
		html += '</colgroup>';
		html += '<tbody>';
		html2 += '<caption>재정 항목 설명 테이블</caption>';
		html2 += '<colgroup>';
		html2 += '<col width="12.1%" />';
		html2 += '<col width="22.2%" />';
		html2 += '<col width="22.2%" />';
		html2 += '<col width="22.5%" />';
		html2 += '<col width="" />';
		html2 += '</colgroup>';
		html2 += '<tbody>';
		for( var i = 0 ; i < cnt ; i++ ){
			
			html += '<tr>';
			html += '<td>' + (i+1) + '</td>';
			html += '<td>' + data[i].category +  '</td>';
			html += '<td class="budget">' + data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html += '<td class="action">' + data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html += '<td class="spend">' + data[i].atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html += '</tr>';
		}
		
		
		for( var i = cnt ; i < data.length ; i++ ){
			
			html2 += '<tr>';
			html2 += '<td>' + (i+1) + '</td>';
			html2 += '<td>' + data[i].category +  '</td>';
			html2 += '<td class="budget">' + data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html2 += '<td class="action">' + data[i].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html2 += '<td class="spend">' + data[i].atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  '</td>';
			html2 += '</tr>';
		}
		
		html += '</tbody>';
		html2 += '</tbody>';
		$("#finStatusList").html(html);
		$("#finStatusList2").html(html2);
	}
	
	//부서별 예산현황 차트
	function fn_finStatusDeptChart(data){
		
		//부서별 예산 현황chart data 객체
		var finStatusDeptData = {};
    	var resultData = [];
    	
    	for( var i = 0 ; i < data.length; i++ ){
    		if( data.length > 30 ){
    			
    			if( i < 30 ){
    				resultData.push(data[i]);
    			}
    		}else{
    			resultData.push(data[i]);
    			
    		}
    		
    	}
    	console.log("resultDAta :: ", resultData)
    	finStatusDeptData.data = resultData;
    	finStatusDeptData.dataFieldsCategory = "category";
    	finStatusDeptData.dataFieldsValue1 = "atrb01";
    	finStatusDeptData.dataFieldsValue2 = "atrb02";
    	finStatusDeptData.dataFieldsValue3 = "atrb03";
    	
    	
		var finStatusDeptChart = CHART.dashBoard_fin_statusDept("finStatusDept", finStatusDeptData);
	}
	
	//분야 부문별 예산 현황 데이터
	function fn_finStatusSortChart(data){

		//분야 부문별 예산 현황 데이터chart data 객체
		var finStatusSortData = {};
		var resultData = [];
    	
    	for( var i = 0 ; i < data.length; i++ ){
    		
    		if( data.length > 30 ){
    			
    			if( i < 30 ){
    				resultData.push(data[i]);
    			}
    		}else{
    			
    			resultData.push(data[i]);
    		}
    		
    	}
    	finStatusSortData.data = resultData;
    	finStatusSortData.dataFieldsCategory = "category";
    	finStatusSortData.dataFieldsValue1 = "atrb01";
    	finStatusSortData.dataFieldsValue2 = "atrb02";
    	//finStatusSortData.dataFieldsValue3 = "atrb03";
    	console.log("6data : ", resultData)
		var finStatusSortChart = CHART.dashBoard_fin_statusSort("finStatusSort", finStatusSortData);
	}
	
	//부서별 집행현황
	function fn_finStatusExecutionChart(data){

		//부서별 집행현황 chart data 객체
		var finStatusExecutionData = {};
		var resultData = [];
    	
    	for( var i = 0 ; i < data.length; i++ ){
    		
    		if( data.length > 30 ){
    			
    			if( i < 12 ){
    				resultData.push(data[i]);
    			}
    		}else{
    			resultData.push(data[i]);
    			
    		}
    		
    	}
    	finStatusExecutionData.data = resultData;
    	finStatusExecutionData.dataFieldsCategory = "category";
    	finStatusExecutionData.dataFieldsValue1 = "atrb01";
    	finStatusExecutionData.dataFieldsValue2 = "atrb02";
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var finStatusExecutionChart = CHART.dashBoard_fin_statusExecution("finStatusExecution", finStatusExecutionData);
	}
	
	//부서별 계약현황 데이터 조회
	function fn_finContractChart(data){
		//chart data 객체
    	var finContractData = {};
    	
    	var resultData = [];
    	
    	for( var i = 0 ; i < data.length; i++ ){
    		if( data.length > 30 ){
    			
    			if( i < 12 ){
    				resultData.push(data[i]);
    			}
    		}else{
    			resultData.push(data[i]);
    			
    		}
    		
    	}
    	
    	finContractData.data = resultData;
    	
    	finContractData.dataFieldsCategory = "category";
    	finContractData.dataFieldsValue1 = "atrb01";
    	//finContractData.dataFieldsValue2 = "atrb02";
    	//finContractData.dataFieldsValue3 = "atrb03";
    	//compAnalysisNpData.dataFieldsColor = "color";
		var finContractChart = CHART.dashBoard_fin_statusContract("finContract", finContractData);
	}
	
	function fn_setFirst(){
		$('.tab_link').removeClass('on');
		$('.tab_content').removeClass('on');
		
		var tag = document.getElementsByClassName('tab_link');//$(this).attr('data-tab');
		for( var i = 0 ; i < tag.length; i++ ){
			if( $(tag[i]).attr('data-tab') == 'tab-1' )  $(tag[i]).addClass('on');
		}
		$("#tab-1").addClass('on');
		
		nowId = "tab-1";
	}
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_financeStatusData();
    });
	
	$('.tab_link').click(function () {
		var tab_id = $(this).attr('data-tab');
		var active = true;
		console.log("tab_id : ", tab_id);
		console.log("deptContDiv : ", deptContDiv);
		$('.tab_link').removeClass('on');
		$('.tab_content').removeClass('on');
		if( tab_id == 'tab-1' ) {
			active =  deptFinDiv;
		}else if( tab_id == 'tab-2' ) {
			active =  sortFinDiv;
		}else if( tab_id == 'tab-3' ) {
			active =  deptExecDiv;
		}else{
			active =  deptContDiv;
		}
		
		if( active ){
			nowId = tab_id;
			console.log("this : ", $(this))
			$(this).addClass('on');
			$("#" + tab_id).addClass('on');
		}else{
			var tag = document.getElementsByClassName('tab_link');//$(this).attr('data-tab');
			for( var i = 0 ; i < tag.length; i++ ){
				console.log("nowId : ", nowId)
				console.log("$(tag[i]).attr('data-tab') : ", $(tag[i]).attr('data-tab'))
				if( $(tag[i]).attr('data-tab') == nowId )  $(tag[i]).addClass('on');
			}
			$("#" + nowId).addClass('on');
			alert("조회하신 결과 데이터가 없습니다.");
			return;
		}

	});
	
})
