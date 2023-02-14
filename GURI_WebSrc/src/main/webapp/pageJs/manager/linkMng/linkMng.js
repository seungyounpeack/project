var loading = $.loading();
$(function () {
	
	"use strict";
	
	 /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
	var linkName    = null;
	
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
	//페이지 로딩 함수 호출
	fn_loadWord();
	
	//페이지 로딩시 
	function fn_loadWord(){
		$('.dateSelect').datetimepicker({
			format: 'YYYYMMDD',
		});
		
		Util.request("/mamager/linkMng/linkMngCycleList.do", null, function(resultData){
			/*
			
			*/
			//$("#targetMonth").val(resultData.date.date);
			fn_cycleList(resultData.cycleList);
			fn_cycleStatusList(resultData.cycleStatusList);
			if( resultData.cycleDataList.length > 0 ){
				
				fn_cycleDataList(resultData.cycleDataList);
//				fn_cycleDataLogList(resultData.cycleDataLogList);
			}
		});
	};    
	
	
	//연계주기리스트 가져오기
	function fn_cycleList(resultList){
	    //연계주기리스트
	    Util.selectAddOption(resultList, "cycle", true);
		
	};
	
	//연계상태리스트 가져오기
	function fn_cycleStatusList(resultList){
		//연계주기리스트
		Util.selectAddOption(resultList, "statusList", true);
		
	};
	
	//연계주기리스트 가져오기
	function fn_cycleDataList(resultList){
		
		var html = '';
		$("#cycleDataList").html('');
		
		for( var i = 0; i < resultList.length; i++ ){
			html += '<tr data-eventtm="'+resultList[i].evtTm+'">';
			html += '<td>' + resultList[i].no + '</td>';
			html += '<td class="t_l">'+ resultList[i].title +'</td>';
			html += '<td>'+ resultList[i].cycle +'</td>';
			html += '<td>'+ resultList[i].name +'</td>';
			html += '<td>'+ resultList[i].evtCf +'</td>';
			html += '</tr>';
		}
		
		$("#cycleDataList").html(html);
		
		var tag = document.getElementById("cycleDataList");
		
		//클릭 이벤트
		if( tag.children.length > 0 ){
			
			$(tag.children).on("click", function(){
				var selectDate = $(this).data("eventtm") + "";
				$('.dateSelect').val(selectDate)
					
				for( var j = 0 ; j < tag.children.length; j++){
					if($(tag.children[j]).hasClass('on')){
						$(tag.children[j]).removeClass('on');
					}
				}

				for( var i = 0 ; i < this.children.length; i++ ){
					if($(this.children[i]).hasClass('t_l')){
						$(this).addClass('on');
						linkName = this.children[i].innerHTML;
						fn_searchStatusCycle(this.children[i].innerHTML);
					}
				}
			})
			
			$(tag.children)[0].click();
		}
		/*if( $(tag)[0].childNode.length > 0 ){
			for( var i = 0 ; i < $(tag)[0].childNode.length; i++ ){
				$(tag)[0].childNode.
			}
		}*/
		
	};
	//연계로그 리스트 가져오기
	function fn_cycleDataLogList(resultList){
		
		var html = '';
		$("#logList").html('');
		
		for( var i = 0; i < resultList.length; i++ ){
			html += '<tr>';
			html += '<td class="t_l lh_160" >' + resultList[i].title + '</td>';
			html += '<td>'+ resultList[i].status +'</td>';
			html += '<td>'+ resultList[i].date +'</td>';
			html += '<td>'+ resultList[i].time +'</td>';
			html += '</tr>';
		}
		
		$("#logList").html(html);
		
	};
	 /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
	    
	    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
	    	
	/*$('.dateSelect').datetimepicker({
		format: 'YYYYMMDD',
		//defaultDate: moment(new Date('2018-01-01'))  
		defaultDate: moment().add(0, 'day')
	});
	*/
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/
	
	//연계주기 검색시
	function fn_searchCycle(){
		var param = {};
		param.code = $("#cycle").val();
		
		Util.request("/mamager/linkMng/linkMngCycleSearch.do", param, function(resultData){
			
			$('.dateSelect').datetimepicker({
				format: 'YYYYMMDD',
				//defaultDate: moment(new Date('2018-01-01'))  
				defaultDate: resultData.date.date,
				maxDate :resultData.date.date
			});
			//$("#targetMonth").val(resultData.date.date);
			fn_cycleStatusList(resultData.cycleStatusList);
			if( resultData.cycleDataList.length > 0 ){
				
				fn_cycleDataList(resultData.cycleDataList);
				fn_cycleDataLogList(resultData.cycleDataLogList);
			}
		});
	};    
	
	
	//연계주기 검색시
	function fn_searchStatusCycle(logName){
		var param = {};
		param.code = $("#cycle").val();
		param.date = $("#targetMonth").val();
		param.statusList = $("#statusList").val();
		if( logName == undefined ){
			
			param.name = linkName;
		}else{
			
			param.name = logName;
		}
		Util.request("/mamager/linkMng/linkMngCycleLog.do", param, function(resultData){
			
			if( resultData.cycleDataLogList.length > 0 ){
				
				fn_cycleDataLogList(resultData.cycleDataLogList);
			}else{
				alert("검색하신 로그가 없습니다.");
				$("#logList").html('');
			}
		});
	};    
	
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
	//검색
    $("#btnCycleSearch").on("click", function(){
    	fn_searchCycle();
    });    
    //상세 로그 검색
    $("#btnLogSearch").on("click", function(){
    	fn_searchStatusCycle();
    });    
	
})