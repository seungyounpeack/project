var loading = $.loading();
$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
 	// 권한 리스트 Grid 객체 선언
    var ax5GridViewAuth = null;
    
 	// 메뉴 리스트 Grid 객체 선언
    var ax5GridViewMenu = null;
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
 	// loading 시 입력항목 비활성화 시키기
    fn_disableInputElement(true);
    
    // 권한 목록 그리드 생성
    //fn_initAuthGrid();
	
 	// 메뉴 목록 목록 그리드 생성
    //fn_initMenuGrid();
    
    
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
    
    // 권한 목록 그리드 생성
	function fn_initAuthGrid() {
		
		// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
	    gridConfigInfo.columns = [
    		{key: "roleCode", 		label: "권한 코드", 	width: '30%',		align: "center"},
    		{key: "roleName", 		label: "권한명", 		width: '30%',		align: "left"},
            {key: "roleDesc", 		label: "권한 설명", 	width: '40%',		align: "left"}
        ];
    	
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("auth-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewAuth = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfig();
	    	
	    	// 부서 목록 데이터 가져오기
	    	//fn_getDeptList();
	    });
	};
	
	// Default 옵션 외 Config 설정
	function fn_setExtendConfig() {
		
		// 그리드 Body Click Event 선언
		ax5GridViewAuth.config.body.onClick = fn_gridBodyOnClick;
				
		// 그리드 Header의 Checbox Display
		ax5GridViewAuth.config.header.selector = false;
	
		
		// Row Selector(Row Checkbox) 보이기
		//var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
		
		//GRID.showRowSelector(ax5GridViewDept, configOption);			
	};
	
	
	// 그리드 Body Click Event 선언
	function fn_gridBodyOnClick() {
		
		var selectColumn = this.column;
   		var selectColumnIndex = this.colIndex;
   		var selectColumnValue = this.value;
   		
   		var selectRowValues = this.item;
   		var selectRowIndex = this.dindex;
   		
   		ax5GridViewAuth.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewAuth.select(selectRowIndex, {selected: true});
   		
   		// 권한 목록 데이터 가져오기
   		fn_selectMenuGrid(selectRowValues);
   		$("#btnSaveMenuAuth").attr("disabled", false);
   		
		// 버튼 활성화   		
        //fn_disableInputElement(false);
	};
	

	// 메뉴리스트 그리드 생성
    function fn_initMenuGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "menuCode", 		label: "메뉴 코드", 	width: '20%',		align: "left",	treeControl: true},
    		{key: "menuName", 		label: "메뉴명", 		width: '30%',		align: "left"},
            {key: "menuLink", 		label: "메뉴 링크", 	width: '30%',		align: "left"},
    		{key: "displayYn", 		label: "메뉴 사용유무", 	width: '20%',		align: "left"}
        ];
    	
    	// Tree Option 설정
    	gridConfigInfo.tree = {
            use: true,
            indentWidth: 10,
            arrowWidth: 15,
            iconWidth: 18,
            icons: {
                openedArrow: '<i class="fa-solid fa-caret-down" aria-hidden="true"></i>',
                collapsedArrow: '<i class="fa-solid fa-caret-right" aria-hidden="true"></i>',
                groupIcon: '<i class="fa-solid fa-folder-open" aria-hidden="true"></i>',
                collapsedGroupIcon: '<i class="fa-solid fa-folder" aria-hidden="true"></i>',
                itemIcon: '<i class="fa-solid fa-circle" aria-hidden="true"></i>'
            },
            columnKeys: {
                parentKey: "parentCode",
                selfKey: "menuCode"
            }
        };
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("menu-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewMenu = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigMenu();
	    });
	    
    };
    
    
    
 	// 메뉴 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigMenu() {
 		
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewMenu.config.body.onDataChanged = fn_menuGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewMenu.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewMenu, configOption);
		
	};
	
	// 메뉴 그리드에서 Data Change 가 발생할때
	function fn_menuGridDataChanged(){
		
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
		if(this.key == '__selected__'){
            this.self.updateChildRows(this.dindex, {__selected__: this.item.__selected__});
        }
		
		var parentCode = selectRowValues.parentCode;
		
		var gridMenuList = ax5GridViewMenu.getList();
		
		if(this.item.__selected__){
			
			// 그리드 데이터 수 만큼
			for(var idx = 0 ; idx < gridMenuList.length ; idx++){
				
				var gridInfo = gridMenuList[idx];
				
				// DB Query 에서 menu_selected 값이 'Y' 인 항목은 Select 처리
				if(Util.isEqual(gridInfo.menuCode, parentCode)){
					
					//ax5GridViewMenu.select(idx);
					ax5GridViewMenu.select(idx, {selected: true});
				}
			}
			
		}else{
			
			var childRowChecked = false;
			
			// 그리드 데이터 수 만큼
			for(var idx = 0 ; idx < gridMenuList.length ; idx++){
				
				var gridInfo = gridMenuList[idx];
				
				// DB Query 에서 menu_selected 값이 'Y' 인 항목은 Select 처리
				if(Util.isEqual(gridInfo.parentCode, parentCode) && gridInfo.__selected__){
					
					childRowChecked = true;
					break;
				}
			}
			
			
			if(!childRowChecked){
			
				for(var idx = 0 ; idx < gridMenuList.length ; idx++){
					
					var gridInfo = gridMenuList[idx];
					
					// DB Query 에서 menu_selected 값이 'Y' 인 항목은 Select 처리
					if(Util.isEqual(gridInfo.menuCode, parentCode) && gridInfo.__selected__){
						
						ax5GridViewMenu.select(idx, {selected: false});
					}
				}
			}
		}
		
		
		// selectRowValues.parentCode
		
		
		//ax5GridViewMenu.select(selectRowIndex, {selected: true});
	};
	
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/

	//페이지 로딩 함수 호출
	fn_loadWord();
	
	//페이지 로딩시 
	function fn_loadWord(){
		var param ={};
		// 부서 목록 그리드 생성
	    fn_initAuthGrid();
	 	// 권한 목록 그리드 생성
	    fn_initMenuGrid();
	    
		Util.request("/mamager/menuAuthMng/menuAuthMngList.ajax", param, function(resultData){
			
			//fn_deptList(resultData.deptAllList);
			//fn_positionIdList(resultData.positionList);
			console.log("resultData.authList.length: ", resultData.authList.length)
			if(resultData.authList.length == 0){
    			alert("조회 결과 데이터가 없습니다.");
    		}else{
    			GRID.setGridData(ax5GridViewAuth, resultData.authList);
    			//
    		}
		});
	};
	
    
 	// 부서 목록 데이터 가져오기
	function fn_getDeptList() {
		
		var requestUrl = "/mamager/userAuth/getDeptList.ajax";
		
		var param ={};
		
		param.deptInfo = {};
		param.deptInfo.userName = $("#userName").val();
		param.deptInfo.department = $("#department").val();
		param.deptInfo.positionId = $("#position_id").val();
		
		//GRID.setGridDataAjax(ax5GridViewDept, requestUrl, param);
		// 부서 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			
			GRID.setGridData(ax5GridViewDept, resultData.gridList, null);
		});
	};
	

	// 권한 목록 데이터 가져오기
	function fn_getAuthList(paramDeptInfo) {
		
		var requestUrl = "/mamager/menuAuthMng/menuAuthMngList.ajax";
		
		var param ={};
		
		param.authInfo = paramAuthInfo;
		
		//GRID.setGridDataAjax(ax5GridViewRole, requestUrl, param);
		
		// 권한 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewAuth, resultData.gridList);
		});
	};
	
	
	// 권한 목록에서 Selected 권한에 대해 Checkbox Select 처리
	function fn_selectMenuGrid(param) {
		console.log("param : ", param);
		var requestUrl = "/mamager/menuAuthMng/getMenuAuthMngList.ajax";
		
		/*var param ={};
		
		param.authInfo = paramAuthInfo;*/
		
		//GRID.setGridDataAjax(ax5GridViewRole, requestUrl, param);
		
		// 권한 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			var gridDataList = resultData.menuList;
			console.log("gridDataList : ", gridDataList);
			if( gridDataList.length > 0 ){
				
				GRID.setGridData(ax5GridViewMenu, resultData.menuList);
				//GRID.setGridData(ax5GridViewAuth, resultData.gridList);
				// 그리드 데이터 수 만큼
				for(var idx = 0 ; idx < gridDataList.length ; idx++){
					
					var gridInfo = gridDataList[idx];
					
					// DB Query 에서 role_selected 값이 'Y' 인 항목은 Select 처리
					if(Util.isEqual(gridInfo.menuSelected, "Y")){
						
						ax5GridViewMenu.select(idx);
					}
				}
			}else{
				alert("검색 데이터가 없습니다.");
			}
		});
		
	};
	
	
	// 입력 항목 disabled 설정
	function fn_disableInputElement(disableFlag) {
		
		// Button
		$("#btnSaveAuth").attr("disabled", disableFlag);		// 권한정보 저장 버튼
	};
	
	
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
    * 8.Button Event 영역
    ****************************************************************************************************/
	
	
	$("#btnSearchUser").on("click", function(){
		
		fn_getDeptList();
	});
	
	
 	// 선택한 권한별 메뉴 List 저장하기
	$("#btnSaveMenuAuth").on("click", function(){
	
		// 선택한 권한 정보 List 를 가져온다
		var selectedRoleList = GRID.getSelectedAll(ax5GridViewMenu);
		
		
		//if(selectedRoleList.length <= 0){
			
		//	Util.showAlert("선택한 권한 정보 없습니다.");
			
		//}else{
			
			// 권한 정보 가져오기
			var menuInfo = GRID.getSelectedAll(ax5GridViewMenu);
			var authInfo = GRID.getSelectedAll(ax5GridViewAuth)
			if(menuInfo.length <= 0){
				
				alert("선택한 메뉴 정보가 없습니다.");
				
			}else{
				
				// Parameter 생성
				var param = {};
		    	
		    	param.menuInfo = authInfo[0];				// 부서 정보
		    	param.roleList = selectedRoleList;			// 선택한 메뉴 목록 정보
				console.log("menuInfo : ", menuInfo)
				console.log("selectedRoleList : ", selectedRoleList)
				var requestUrl = "/mamager/menuAuthMng/saveMenuAuthMng.ajax";
				
				Util.saveRequest(requestUrl, param, function(resultData){
					
				});
			}
		//}
	});
	
})