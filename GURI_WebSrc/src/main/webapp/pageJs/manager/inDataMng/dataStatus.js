var loading = $.loading();
$(function () {
	
	"use strict";
	
	 /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
	var logName    = null;
	
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
	//페이지 로딩 함수 호출
	fn_loadWord();
	
	//페이지 로딩시 
	function fn_loadWord(){
		var param = {};
		param.name = $("#schmaName").val();
		param.nowPageCnt = 10;
		param.nextNo = 0;
		Util.request("/mamager/inDataMng/dataStatusInit.ajax", param, function(resultData){
			//$("#targetMonth").val(resultData.date.date);
			fn_schmaList(resultData.scmaList);
			if( resultData.scmaStatusList.length > 0 ){
				//스키마 검색 테이블 리스트 함수 호출
				fn_schmaTableList(resultData.scmaStatusList);
				
				//페이지함수 호출
				fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
			}
			
			//스키마별 데이터 차트 함수 호출
			fn_schmaChart(resultData.scmaDataCnt);
		});
	};    
	
	
	//스키마리스트 가져오기
	function fn_schmaList(resultList){
	    //연계주기리스트
	    Util.selectAddOption(resultList, "schmaName", false);
		
	};
	
	
	//스키마 검색 테이블 리스트 가져오기
	function fn_schmaTableList(resultList){
		
		var html = '';
		$("#schmaTableList").html('');
		
		for( var i = 0; i < resultList.length; i++ ){
			
			html += '<tr>';
			html += '<td class="t_l">' + resultList[i].tableName + '</td>';
			html += '<td class="t_l">'+ resultList[i].tableDesc +'</td>';
			html += '</tr>';
		}
		
		$("#schmaTableList").html(html);
		
	};
	 /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
	//스키마별 데이터 개수 차트 
	function fn_schmaChart(resultList){
		//chart data 객체
    	var chartData = {};
    	
    	
    	chartData.data = resultList;
    	
    	chartData.dataFieldsCategory = "scmaNm";
    	chartData.dataFieldsValue = "cnt";
    	//finContractData.dataFieldsValue2 = "atrb02";
    	//finContractData.dataFieldsValue3 = "atrb03";
    	//compAnalysisNpData.dataFieldsColor = "color";
		var chart = CHART.manage_data_statusChart("schmaChart", chartData);
	}
	    
	    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/
	//페이지 데이터 호출 함수 
	function fn_pageData(nowPage){
		var param = {};
		if( nowPage == undefined ){
			
			param.nowPage = 1;
		}else{
			param.nowPage = nowPage;
			
		}
		param.name = $("#schmaName").val();
		param.nowPageCnt = 10;
		Util.request("/mamager/inDataMng/dataStatusInit.ajax", param, function(resultData){
			if( resultData.scmaStatusList.length > 0 ){
				//스키마 검색 테이블 리스트 함수 호출
				fn_schmaTableList(resultData.scmaStatusList);
				
				//페이지함수 호출
				fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
			}
		});
	};    
	
	
	
	//페이지 번호 클릭 콜백
	var addLayerPageEvent = function() {
	    	
		
		var nowPage = parseInt(this.innerText) ;
		if( $(this).hasClass('prev') ) {
			
			if( $(this).val() > 0 ) {  
				nowPage = (parseInt($(this).val())-1)*10+1;
			}else{
				nowPage = 1;
			}
		}else if( $(this).hasClass('next') ) {
			nowPage = parseInt($(this).val()+1)*10+1;
		}
		
		/*var param = {};
		param.nowPage = nowPage;
		param.nowPageCnt = 3;*/
		$(this.children).addClass('on');
		//fn_commonTable(param);
		//데이터 검색 함수 호출
		fn_pageData(nowPage);
	}

	
	//페이징 함수 
	function fn_addPageNumber(tagId, page, pageLimit, callback) {
		//페이지 태그 초기화
		$( tagId ).html('');
		var html = '';
		
		var nowPage = 1;
		var preNo = 0;
		var nextNo = 1;
		if( page.pageNo != undefined ) nowPage = page.nowPage;
		//페이지 전체 그룹
		var pageGroup = Math.floor((parseInt(page.totalPage)-1)/parseInt(pageLimit));
		//현재 페이지 그룹
		var nowGroup = Math.floor((parseInt(page.nowPage)-1)/parseInt(pageLimit));
		
		//마지막 페이지 번호
		var endPageNo = parseInt(page.totalPage);
		console.log("pageLimit : ", pageLimit)
		if( parseInt(page.totalPage) > (parseInt(nowGroup)+1)*parseInt(pageLimit) ) endPageNo = (parseInt(nowGroup)+1)*parseInt(pageLimit);
		//페이지 개수가 5를 초과할 경우
		if( page.totalPage > pageLimit ) {
			
			if( nowGroup > 0 ) {
				
				html += '<a href="#" class="prev" value=' + nowGroup + '>처음페이지</a>';
			}
			
			for( var i = (nowGroup*pageLimit) + 1 ; i < endPageNo+1; i++ ){
				html += '<a href="#">' + i + '</a>';
			}
			if( nowGroup < pageGroup ){
				
				html += '<a href="#" class="next" value=' + nowGroup + '>다음페이지</a>';
			}
		//페이지 개수가 5미만	
		}else{
			
			for( var i = 1 ; i < parseInt(page.totalPage)+1; i++ ){
				html += '<a href="#">' + i + '</a>';
				
			}
		}
		
		$( tagId ).append(html);
		
		var listItems = document.querySelectorAll( tagId + " a" );
		var layersArray= Array.prototype.slice.call(listItems);
		layersArray.forEach(function(item, index){
			
			if( nowGroup > 0 && nowGroup == pageGroup ){
//				if( (index+pageLimit) == page.nowPage) {
				if( (index) == (page.nowPage-nowGroup*pageLimit) ) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
				}
			}else if( nowGroup > 0 ) {
				
				if( (index) == (page.nowPage-nowGroup*pageLimit)) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
					
				}
			}else if( nowGroup < pageGroup ) {
				console.log("page.nowPa  : ", page.nowPage)
				console.log("nowGroup  : ", nowGroup)
				console.log("pageGroup  : ", pageGroup)
				console.log("endPageNo  : ", nowGroup)
				console.log("index : " + index)
				if( (index+1) == page.nowPage) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item.children).addClass('on');
					}else{
						$(item.children).removeClass('on');
					}
					
				}
			}else {
				if( (index+1) == page.nowPage) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
					
				}
			}
			
			item.addEventListener('click', callback);
		})
	};
	
	//스키마별 검색시
	function fn_searchSchma(){
		var param = {};
		param.name = $("#schmaName").val();
		param.date = $("#targetMonth").val();
		param.tableName = $("#tableName").val();
		param.nowPageCnt = 10;
		param.nextNo = 0;
		Util.request("/mamager/inDataMng/dataStatusSearch.ajax", param, function(resultData){
			if( resultData.scmaStatusList.length > 0 ){
				//스키마 검색 테이블 리스트 함수 호출
				fn_schmaTableList(resultData.scmaStatusList);
				
				//페이지함수 호출
				fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
			}else{
				alert("검색하신 로그가 없습니다.");
				$("#schmaTableList").html('');
			}
		});
	};    
	
	
	
	//스키마별 검색 paging시
	/*function fn_searchSchmaPaging(nowPage){
		var param = {};
		var page = 1;
		param.name = $("#schmaName").val();
		param.date = $("#targetMonth").val();
		param.tableName = $("#tableName").val();
		if( nowPage != undefined ){
			page = nowPage;
		}
		param.nowPageCnt = 10;
		param.nowPage = page;
		Util.request("/mamager/inDataMng/dataStatusSearchPage.do", param, function(resultData){
			if( resultData.scmaStatusList.length > 0 ){
				//스키마 검색 테이블 리스트 함수 호출
				fn_schmaTableList(resultData.scmaStatusList);
			}else{
				alert("검색하신 로그가 없습니다.");
				$("#schmaTableList").html('');
			}
		});
	};    */
	
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
	//검색
    $("#btnTableSearch").on("click", function(){
    	//스키마별 검색시 호출
    	fn_searchSchma();
    });    
})