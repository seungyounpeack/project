var loading = $.loading();
$(function () {
	
	"use strict";
	
	 /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
	
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
	//페이지 로딩 함수 호출
	fn_initData();
	
	$('.dateSelect').datetimepicker({ 
		format: 'YYYY-MM',
		minDate : moment($("#start").val()+'-01', 'YYYY-MM-DD').toDate(),
		maxDate : moment($("#end").val()+'-01', 'YYYY-MM-DD').toDate()
	});
	
	//페이지 로딩시 
	function fn_initData(){
		
		var param = {};
		var url = "";
		var sort = $("#sort").val();
		console.log("sort : " , sort)
		if( sort == 'month' ){
			url = '/mamager/logMng/logInitData.ajax';
		}else{
			url = "/mamager/logMng/logSearchData.ajax";
		}
		
		param.startDate = $("#startDate").val().split("-").join("");
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//$("#targetMonth").val(resultData.date.date);
			var result = null;	
			
			//누적 횟수 넣는 함수 호출
			fn_setTotal(resultData.visitor, resultData.visitorCnt, resultData.pageView)
			
			if(resultData.monthCnt != undefined ){
				result = resultData.monthCnt;
				//사용자 유저(월별) 로그 차트 함수 호출
				fn_logMonthChart(result);
			}else{
				result = resultData.dayCnt;
				//사용자 유저(일별) 로그 차트 함수 호출
				fn_logDayChart(result);
			}
			
			//사용자 유저 로그 (페이지 방문 현황) 데이터 함수 호출 
			fn_logPageVistorStatus(resultData.pageData);
			
		});
	};
	
	// 엑셀다운로드
	function fn_excelDownload() {
		var url = "/mamager/logMng/logDetailData.ajax";
		var param = {};
		param.startDate = $("#startDate").val().split("-").join("");
		Util.request(url, param, function(resultData){
			console.log( resultData )
			var header = [
	    		{header: '메뉴명',		key: 'subMenuName',	width: 20},
	    		{header: '메뉴URL', 		key: 'menuLink',	width: 20},
	    		{header: '접속일',		key: 'logDt',		width: 20}
	    	]
	    	commonDownloadExcelFile("페이지 방문자 현황", header, resultData.logData);
		})
	}
	
	
	
	 /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/

	//사용자 유저(요일별) 로그 차트
	function fn_logDayChart(resultList){
		$("#logMonthChart").html('');
		//chart data 객체
		var chartData = {};
		console.log("@@")
		
		chartData.data = resultList;
		
		chartData.dataFieldsCategory = "startDate";
		chartData.dataFieldsValue1 = "pageCnt";
		chartData.dataFieldsValue2 = "visitor";
		chartData.dataFieldsValue3 = "visitorCnt";
		//compAnalysisNpData.dataFieldsColor = "color";
		var chart = CHART.manager_log_dayChart("logMonthChart", chartData);
		
	};
	
	//사용자 유저(월별) 로그 차트
	function fn_logMonthChart(resultList){
		//chart data 객체
    	var chartData = {};
    	console.log("resultList :"  ,resultList)
    	
    	chartData.data = resultList;
    	
    	chartData.dataFieldsCategory = "startDate";
    	chartData.dataFieldsValue1 = "pageCnt";
    	chartData.dataFieldsValue2 = "visitor";
    	chartData.dataFieldsValue3 = "visitorCnt";
    	//compAnalysisNpData.dataFieldsColor = "color";
		var chart = CHART.manager_log_monthChart("logMonthChart", chartData);
		
	};
	/***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/
	//사용자 유저 로그 (페이지 방문 현황) 데이터 함수
	function fn_logPageVistorStatus(resultList){
		
		var html = '';
		$("#logMenuList").html('');
		var sum = 0;
		
		for( var j = 0 ; j < resultList.length; j++ ) {
			sum += resultList[j].cnt;
		}
		
		for( var i = 0; i < resultList.length; i++ ){
			
			html += '<tr>';
			html += '<td>' + (i+1) + '</td>';
			html += '<td>' + resultList[i].subMenuName + '</td>';
			html += '<td class="t_l reduce_t">'+ resultList[i].menuLink +'</td>';
			html += '<td>' + resultList[i].cnt + '</td>';
			html += '<td><div class="tbl_grp" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue ' + (resultList[i].cnt/sum)*100 + '%, #ddd ' + (resultList[i].cnt/sum)*100 + '%, #ddd 100%)"></div> <span class="grp_t">' + ((resultList[i].cnt/sum)*100).toFixed(1) + '%</span></td>';
			html += '</tr>';
		}
		$("#logMenuList").html(html);
		
	};
	
	//누적 횟수 넣는 함수 호출
	function fn_setTotal(visitor, visitorCnt, pageView){
		console.log("visitor : ", visitor)
		console.log("visitorCnt : ", visitorCnt)
		console.log("pageView : ", pageView)
		$("#visitor")[0].innerHTML = visitor.visitor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#visitorCnt")[0].innerHTML = visitorCnt.visitorCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$("#pageView")[0].innerHTML = pageView.pageView.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	
	// 엑셀 다운로드
	function commonDownloadExcelFile(title, header, data, callback) {
		var rowCount = 0;
		var workbook = new ExcelJS.Workbook();
		workbook.creator = '성남시 데이터';
		workbook.lastModifiedBy = '성남시';
		workbook.created = new Date();
		workbook.modified = new Date();
		var sheet = workbook.addWorksheet('Sheet');
		header.unshift({header: '번호', key: 'no', width: 10})
		sheet.columns = header;
		for( var i=0;i<data.length;i++ ) {
			data[i].no = data.length - i;
	    	sheet.addRow(data[i]);
		}
		workbook.xlsx.writeBuffer().then( function(data) {
			var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			saveAs(blob, title+'-'+new Date().valueOf()+'.xlsx');
			if( callback ) callback.call(this);
		});
	} 

	
	
	
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
	//검색
    $("#btnSearch").on("click", function(){
    	//검색시 호출
    	fn_initData();
    });
    
    // 엑셀다운로드
    $("#btnExcelDownload").on("click", function() {
    	fn_excelDownload();
    })
})