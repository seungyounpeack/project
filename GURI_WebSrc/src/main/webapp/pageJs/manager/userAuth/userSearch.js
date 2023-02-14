var loading = $.loading();
$(function () {
		/***************************************************************************************************
	    * 1. 변수 선언 영역
	    ****************************************************************************************************/
		var currForm = new FORM("formCodeInfo");
		var department       = null;
		var position_id      = null;
		var userName         = null; 
		
		var insertList = new Array();
		var ax5GridView = null;
		var ax5GridViewCheckIdx = -1;
		var gridConfigInfo = {};
		/***************************************************************************************************
	    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
	    ****************************************************************************************************/
		//파라미터 초기화
		fn_initSetParam();
		
		//페이지 로딩 함수 호출
		fn_loadWord();
		
		//페이지 로딩시 
		function fn_loadWord(){
			fn_initSetParam();
			fn_userPositionGird();
			Util.request("/mamager/userSearch/userSearchList.ajax", param, function(resultData){
				
				fn_deptList(resultData.deptAllList);
				fn_positionIdList(resultData.positionList);
				
				if(resultData.userSearchList.length == 0){
	    			alert("조회 결과 데이터가 없습니다.");
	    		}else{
	    			GRID.setGridData(ax5GridView, resultData.userSearchList);
	    		}
			});
		};
		
		//페이지 로딩시 
		function fn_search(){
			fn_initSetParam();
			fn_userPositionGird();
			Util.request("/mamager/userSearch/userSearchList.ajax", param, function(resultData){
				
				fn_positionIdList(resultData.positionList);
				
				if(resultData.userSearchList.length == 0){
					alert("조회 결과 데이터가 없습니다.");
				}else{
					GRID.setGridData(ax5GridView, resultData.userSearchList);
				}
			});
		};
		
		//param 초기화
		function fn_initSetParam(){
			userName    = $('#userName').val();
			department  = $('#department').val();
			position_id = $('#position_id').val();
			param = {
					userName    : userName,
					department  : department,
					position_id : position_id
			};
		}
		
		
		//부서리스트 가져오기
		function fn_deptList(resultList){
		    console.log("resultList :: ",resultList);
		    //부서리스트
		    Util.selectAddOption(resultList, "department", true);
			/*$("#department").select2({
				placeholder: "모두",
				allowClear: true,
				minimumResultsForSearch:-1,
				data:resultList,
				width: 150
			});*/
			
		};
		
		//직위리스트 가져오기
		function fn_positionIdList(resultList){
			
			//직위리스트
			Util.selectAddOption(resultList, "position_id", true);
			/*$("#position_id").select2({
				placeholder: "모두",
				allowClear: true,
				minimumResultsForSearch:-1,
				data:resultList,
				width: 150
			});
			*/
		};
		
		/***************************************************************************************************
	    * 3.Chart 영역
	    ****************************************************************************************************/
	 	
		 /***************************************************************************************************
	    * 4.Grid 영역
	    ****************************************************************************************************/
		 
		//부서/직위 권한 부여 전 그리드
		function fn_userPositionGird(){
			
	    	//그리드 컬럼 정의
	    	gridConfigInfo.columns = [
			    {key: "no"            , label: "No"     , align: "center", width : "10%"},
			    {key: "userId"       , label: "사용자ID" , align: "center", width : "15%"},
			    {key: "userName"     , label: "사용자명"  , align: "center", width : "10%"},
			    {key: "deptName"     , label: "부서명"   , align: "center", width : "25%"},
			    {key: "positionName" , label: "직위명"   , align: "center", width : "25%"},
			    //{key: "gradeName"    , label: "계급명"   , align: "left", width : "10%"},
			    {key: "className"    , label: "직급명"   , align: "center", width : "15%"},
			    //{key: "userStatName", label: "재직여부"  , align: "center", width : "10%"},
			];
	    
	    	//그리드 생성
  			GRID.createGridView("userSearch-grid", gridConfigInfo, function(ax5Grid){	          	
	          	
			//그리드 객체
			ax5GridView = ax5Grid;	          	
			//ax5GridView.config.body.onDataChanged = fn_gridDataChanged;
			//그리드 옵션(sorting기능 & select box) 설정
			//var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
			var configOption2 = {sortable:true};
			
			//GRID.showRowSelector(ax5GridView, configOption);
            GRID.setSortColumnAll(ax5GridView, configOption2);
	            
	  		});
	    };
	    
		/***************************************************************************************************
	    * 6.Popup 영역
	    ****************************************************************************************************/
	    
	    /***************************************************************************************************
	    * 7.일반 Function 영역
	    ****************************************************************************************************/
	    
		/***************************************************************************************************
	    * 8.Button Event 영역
	    ****************************************************************************************************/
	  //검색
	    $("#btnDeptSearch").on("click", function(){
	    	fn_search();
	    });
	    
		
});