var loading = $.loading();
$(function () {
		/***************************************************************************************************
	    * 1. 변수 선언 영역
	    ****************************************************************************************************/
		var currForm = new FORM("keywordInfo");
		var start_date    = null;
		var end_date      = null;
		var word          = null;
		var wordType      = null;
		
		var insertList = new Array();
		var ax5GridView = null;
		var ax5GridViewCheckIdx = -1;
		var gridConfigInfo = {};
		/***************************************************************************************************
	    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
	    ****************************************************************************************************/
		
		//날짜
		fn_initDate();
		
		//파라미터 초기화
		fn_initSetParam();
		
		//페이지 로딩 함수 호출
		fn_loadWord();
		
		//페이지 로딩시 
		function fn_loadWord(){
			fn_initDate();
			fn_initSetParam();
			fn_stopwordGird();
			
			Util.request("/mamager/stopword/stopwordList.ajax", params, function(resultData){
				if(resultData.wordList.length == 0){
					alert("조회 결과 데이터가 없습니다.");
	    		}else{
	    			GRID.setGridData(ax5GridView, resultData.wordList);
	    		}
			});
			
			
		};
		
		function fn_initDate(){
			$('#iptstart_date').datetimepicker({
	    		format: 'YYYY-MM-DD',
	    		//defaultDate: moment().add(-6, 'month')
	    	});
	    	
	    	$('#iptend_date').datetimepicker({
	    		format: 'YYYY-MM-DD'
	    	});
		}
		
	
		//param 초기화
		function fn_initSetParam(){
			start_date = $('#iptstart_date').val();
			end_date = $('#iptend_date').val();
			searchWord = $('#searchWord').val();
			
			word    = $('#word').val();
			wordType  = $('input[name="wordTp"]:checked').val()
			
			
			console.log("searchWord 확인 중 ==============" , searchWord);
			
			// 리스트 검색용 params
			params = {
				start_date : start_date,
				end_date : end_date,
				searchWord : searchWord
			}
			// 키워드 추가 params
			param = {
		 	    	word    : word,
					wordType  : wordType
			};
		}
	
		/***************************************************************************************************
	    * 4.Grid 영역
	    ****************************************************************************************************/
		 
		//키워드 확인 그리드
		function fn_stopwordGird(){
			
	    	//그리드 컬럼 정의
	    	gridConfigInfo.columns = [
			    {key: "word"       , label: "키워드" , align: "center", width : "20%"},
			    {key: "wordTp"     , label: "분류"  , align: "center", width : "20%"},
			    {key: "regYmd" , label: "등록 날짜"   , align: "center", width : "25%"},
			];
	    
	    	//그리드 생성
			GRID.createGridView("stopword-grid", gridConfigInfo, function(ax5Grid){	          	
	          	
			//그리드 객체
			ax5GridView = ax5Grid;	          	
			//ax5GridView.config.body.onDataChanged = fn_gridDataChanged;
			//그리드 옵션(sorting기능 & select box) 설정
		    var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
			var configOption2 = {sortable:true};
			
			GRID.showRowSelector(ax5GridView, configOption);
        	GRID.setSortColumnAll(ax5GridView, configOption2);
	            
	  		});
	    };
	    
	    
	    	/***************************************************************************************************
		    * 8.Button Event 영역
		    ****************************************************************************************************/
	    	//키워드 검색
		    $("#btnAnalysisStopword").on("click", function(){
		    	fn_loadWord();
		    });

		    //키워드 삭제
		    $("#btnDeleteStopword").on("click", function(){
		    	if(ax5GridView.getList("selected").length == 0 || ax5GridView.getList("allselected").length == 0){
		    		alert("삭제할 키워드를 선택하세요")
		    	}else{
		    		for( var i = 0 ; i < ax5GridView.getList("selected").length; i++){
			    		param.deleteWord = ax5GridView.getList("selected")[i].word;
			    		Util.request("/mamager/stopword/stopwordDelete.ajax", param, function(resultData){
				    		if(resultData.wordDelete == 1){
					    		alert("삭제 성공")
				    		}
				    	})
			    	}
		    		fn_loadWord();
		    	}
		    });
		    
		    //키워드 추가
		    $("#btnSaveInfo").on("click", function(){
		    	//변수 초기화
		    	fn_initSetParam();
		    	// 불용어 Validation Check
		    	currForm.validate(param, function(returnValidData, validSuccess){
		    		
		    		console.log('param=======' , param);
		    		// Validate Success
		    		if(validSuccess){
		    			if(Util.isEmpty(param.word)){
		    				alert("추가할 키워드를 입력하세요");
		    			} else if (Util.isEmpty(param.wordType)){
		    				alert("분류를 선택 하세요")
		    			}
		    			else{
		    				Util.request("/mamager/stopword/stopwordInsert.ajax", param, function(resultData){
					    		fn_loadWord();
					            var radioVal = $('input[name="wordTp"]:checked').val();
					    		var word = document.getElementById("word");
					    		
					    		start_date =  document.getElementById("iptstart_date");
					    		end_date =  document.getElementById("iptend_date");
					    		
					    		radioVal.value = "";
					    		word.value = "";
					    		
					    	})
		    			}
		    		}
		    	})
		    
		    });
	    
	    
	    
})