var loading = $.loading();
$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
 	// 권한 Grid 객체 선언
    var ax5GridViewUser = null;
 	
 	// 메뉴 Grid 객체 선언
    var ax5GridViewSolution = null;
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
    
    // 솔루션 사용자 그리드 생성
    fn_initSolutionGrid();
    
 	// 사용자 목록 그리드 생성
    fn_initUserGrid();
    
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
    
    // 권한 그리드 생성
    function fn_initUserGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
	    gridConfigInfo.columns = [
    		{key: "userId", 		label: "사용자ID", 		width: '30%',		align: "center"},
    		{key: "userName", 		label: "사용자명", 		width: '20%',		align: "center"},
    		{key: "deptName", 		label: "부서명", 		width: '20%',		align: "left"},
    		{key: "posName", 		label: "직급명", 		width: '30%',		align: "left"},
        ];
	    
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("role-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewUser = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigRole();
	    	
	    	// 부서 목록 가져오기
	    	// 직위 목록 가져오기
	    	
	    	// 권한 목록 데이터 가져오기
	    	fn_getSolutionUserList();
	    });
    };
    
    
 	// 권한 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigRole() {
 		
		// 권한 그리드 Body Click Event 선언
		ax5GridViewUser.config.body.onClick = fn_roleGridBodyOnClick;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewUser.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {sortable:true, showRowSelector:true, multipleSelect:false, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewUser, configOption);			
	};
	
	
	// 권한 그리드 Body Click Event 선언
	function fn_roleGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		ax5GridViewUser.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewUser.select(selectRowIndex, {selected: true});
   		
	};
	
	
    
    // 솔루션 권한 유저 그리드 생성
	function fn_initSolutionGrid() {
    	
		// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
	    gridConfigInfo.columns = [
    		{key: "userId", 		label: "사용자ID", 		width: '30%',		align: "center"},
    		{key: "userName", 		label: "사용자명", 		width: '20%',		align: "center"},
    		{key: "deptName", 		label: "부서명", 		width: '20%',		align: "center"},
    		{key: "posName", 		label: "직급명", 		width: '30%',		align: "center"},
    		//{key: "roleName", 		label: "권한명", 		width: '20%',		align: "left"}
        ];
    	

		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("menu-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewSolution = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigMenu();
	    	
	    	// 메뉴 목록 데이터 가져오기
	    	//fn_getSolutionUserList();
	    });
    	
	};
	
	// 메뉴 목록 Default 옵션 외 Config 설정
	function fn_setExtendConfigMenu() {
		
		// 권한 그리드 Body Click Event 선언
		ax5GridViewSolution.config.body.onClick = fn_menuGridBodyOnClick;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewSolution.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:false, rowSelectorColumnWidth:25, sortable:true};
		
		GRID.showRowSelector(ax5GridViewSolution, configOption);			
	};
	
	
	//
	function fn_menuGridBodyOnClick(){
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		ax5GridViewSolution.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewSolution.select(selectRowIndex, {selected: true});
   		
	}
	
	
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/
	
	fn_loadWord();
	
	//페이지 로딩시 
	function fn_loadWord(){
		var param ={};
	    
		Util.request("/mamager/userAuth/selectAuthUserInfo.ajax", param, function(resultData){
			console.log("resultData", resultData)
			fn_deptList(resultData.deptAllList);
			fn_positionIdList(resultData.positionList);
		});
	};
	
	// 솔루션 사용자 목록 데이터 가져오기
	function fn_getSolutionUserList() {
		
		var requestUrl = "/mamager/userAuth/selectAuthUserList.ajax";
		
		var param ={};
		param.userName = $("#userName").val();
		param.department = $("#department").val();
		param.positionId = $("#position_id").val();
		
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			
			GRID.setGridData(ax5GridViewUser, resultData.userList);
			GRID.setGridData(ax5GridViewSolution, resultData.userSolutionList);
		});
	};
	
	//부서리스트 가져오기
	function fn_deptList(resultList){
	    //부서리스트
	    Util.selectAddOption(resultList, "department", true);
	};
	
	//직위리스트 가져오기
	function fn_positionIdList(resultList){
		//직위리스트
		Util.selectAddOption(resultList, "position_id", true);
	};
 	    
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
    
	$("#btnSearchRole").on("click", function(){
		fn_getSolutionUserList();
	});
    
    // 권한 생성 Button Click Event
	$("#btnCreateRole").on("click", function(){
		var userInfo = GRID.getSelectedAll(ax5GridViewUser);
		var param = {};
		    	
    	console.log("userInfo : ", userInfo)
    	if(userInfo.length > 0){
    		
    		param.userId = userInfo[0].userId;
    		var requestUrl = "/mamager/userAuth/userAuthSolutionInsert.ajax";
    		
    		// Request Save
    		Util.saveRequest(requestUrl, param, function(resultData){
        		if( resultData.resultValue == "Y" ){
        			
        			// 생성 완류 후 권한 목록 재조회
        			fn_getSolutionUserList();
        		}else{
        			alert("솔루션 권한을 부여할 수 없습니다.");
        		}
        	});
    		
    	}else{
    		
    		alert("솔루션 권한을 부여할 유저를 선택해주세요");
    	}
    });
    
    // 선택한 권한별 메뉴 List 저장하기
	$("#btnSaveRoleMenu").on("click", function(){
		
		// 선택한 메뉴 정보 List 를 가져온다
		var userInfo = GRID.getSelectedAll(ax5GridViewSolution);
		console.log("userInfo : ", userInfo)
		// Parameter 생성
		var param = {};
		
    	if(userInfo.length > 0){
    		param = userInfo[0];
	    	var requestUrl = "/mamager/userAuth/userAuthSolutionDelete.ajax";
			
	    	// Request Save
    		Util.saveRequest(requestUrl, param, function(resultData){
        		if( resultData.resultValue == "Y" ){
        			
        			// 생성 완류 후 권한 목록 재조회
        			fn_getSolutionUserList();
        		}else{
        			alert("솔루션 권한을 해제할 수 없습니다.");
        		}
        	});
		
	    	}else{
    		
    		alert("솔루션 권한을 해제할 유저를 선택해주세요");
		}
	});
	
    
    
});