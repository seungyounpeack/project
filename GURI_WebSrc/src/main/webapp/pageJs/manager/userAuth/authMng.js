var loading = $.loading();
$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
    var currForm = new FORM("formRoleInfo");
    
 	// 권한 Grid 객체 선언
    var ax5GridViewRole = null;
 	
 	// 메뉴 Grid 객체 선언
    var ax5GridViewMenu = null;
    
 	var firstLoadMenuTab = false;
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
    // 입력 항목 및 버튼 비활성화
    fn_disableInputElement(true);
    
 	// 권한 목록 그리드 생성
    fn_initRoleGrid();
    
    // 메뉴 목록 그리드 생성
    fn_initMenuGrid();
    
	// loading 시 입력항목 비활성화 시키기
    //fn_disableInputElement(true);
    
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
    
    // 권한 그리드 생성
    function fn_initRoleGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "roleCode", 		label: "권한 코드", 	width: '25%',		align: "center"},
    		{key: "roleName", 		label: "권한명", 		width: '25%',		align: "left"},
            {key: "roleDesc", 		label: "권한 설명", 	width: '50%',		align: "left"}
        ];
    	
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("role-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewRole = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigRole();
	    	
	    	// 권한 목록 데이터 가져오기
	    	fn_getRoleList();
	    });
    };
    
    
 	// 권한 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigRole() {
 		
		// 권한 그리드 Body Click Event 선언
		ax5GridViewRole.config.body.onClick = fn_roleGridBodyOnClick;
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewRole.config.body.onDataChanged = fn_roleGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewRole.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:false, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewRole, configOption);			
	};
	
	
	// 권한 그리드 Body Click Event 선언
	function fn_roleGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		ax5GridViewRole.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewRole.select(selectRowIndex, {selected: true});
   		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var roleInfo = {};
   		roleInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(roleInfo);
		
		// 메뉴 목록 데이터 가져오기
		fn_getMenuList(selectRowValues);
		
		
		// 입력 항목 및 버튼 활성화
		fn_disableInputElement(false);
	};
	
	
	// 권한 그리드 Checkbox Click Event
	function fn_roleGridDataChanged() {
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
   		ax5GridViewRole.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewRole.select(selectRowIndex, {selected: true});
		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var roleInfo = {};
   		roleInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(roleInfo);
		
		
		// 입력 항목 및 버튼 활성화
		fn_disableInputElement(false);
	};
	
    
    
    // 메뉴 목록 그리드 생성
	function fn_initMenuGrid() {
    	
		// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		/*
    		{key: "menuSelected", label: "선택", width: 50, sortable: false, align: "center", 
            	editor: {
            		type: "checkbox", config: {height: 17, trueValue: "Y", falseValue: "N"}
    			}
            },
            */
    		{key: "menuName", 		label: "메뉴명", 		width: 150,		align: "left",	treeControl: true},
    		{key: "menuLink", 		label: "Link Url", 		width: 300,		align: "left"},
    		{key: "menuTypeName", 	label: "구분", 			width: 70,		align: "center"}
    		
        ];
    	
    	// Tree Option 설정
    	gridConfigInfo.tree = {
            use: true,
            indentWidth: 10,
            arrowWidth: 15,
            iconWidth: 18,
            icons: {
                openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
                collapsedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
                groupIcon: '<i class="fa fa-folder-open" aria-hidden="true"></i>',
                collapsedGroupIcon: '<i class="fa fa-folder" aria-hidden="true"></i>',
                itemIcon: '<i class="fa fa-circle" aria-hidden="true"></i>'
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
	    	
	    	// 메뉴 목록 데이터 가져오기
	    	//fn_getMenuList();
	    });
    	
	};
	
	// 메뉴 목록 Default 옵션 외 Config 설정
	function fn_setExtendConfigMenu() {
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewMenu.config.body.onDataChanged = fn_menuGridDataChanged;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewMenu, configOption);			
	};
	
	
	// 메뉴 그리드에서 Data Change 가 발생할때
	function fn_menuGridDataChanged(){
		
		/*
		if (this.key == 'menuSelected') {
            this.self.updateChildRows(this.dindex, {menuSelected: this.item.menuSelected});
        }
		*/
		
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

    // 권한 목록 데이터 가져오기
	function fn_getRoleList() {
		
		var requestUrl = "/mamager/authMng/getAuthList.ajax";
		
		var param ={};
		
		param.roleInfo = {};
		
		//GRID.setGridDataAjax(ax5GridViewRole, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewRole, resultData.gridList);
		});
	};
	
	
	
	// 메뉴 목록 데이터 가져오기
	function fn_getMenuList(paramRoleInfo) {
		
		var requestUrl = "/mamager/authMng/selectAuthMenuList.do";
		
		var param ={};
		
		param.roleInfo = paramRoleInfo;
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			
			GRID.setGridData(ax5GridViewMenu, resultData.gridList, fn_selectMenuGrid);
		});
	};
	
	
	// 메뉴 목록에서 Selected 메뉴에 대해 Checkbox Select 처리
	function fn_selectMenuGrid(gridDataList) {
		
		// 그리드 데이터 수 만큼
		for(var idx = 0 ; idx < gridDataList.length ; idx++){
			
			var gridInfo = gridDataList[idx];
			
			// DB Query 에서 menu_selected 값이 'Y' 인 항목은 Select 처리
			if(Util.isEqual(gridInfo.menuSelected, "Y")){
				
				ax5GridViewMenu.select(idx);
			}
		}
	};
	
	
	
	// 입력 항목 disabled 설정
	function fn_disableInputElement(disableFlag) {
		
		$("#roleName").attr("disabled", disableFlag);				// 권한 명
		$("#roleDesc").attr("disabled", disableFlag);				// 권한 설명
		
		$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
		
		// Button
		$("#btnSaveRoleInfo").attr("disabled", disableFlag);		// 권한정보 저장 버튼
		$("#btnSaveRoleMenu").attr("disabled", disableFlag);		// 메뉴 목록 저장 버튼
	};
	
	
 	    
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
    
	// 권한 생성 Button Click Event
    $("#btnCreateRole").on("click", function(){
    	
    	//var selectedList = GRID.getSelectedList(ax5GridViewRole);
    	
    	// 선택한 Row 가 있는지 체크
    	//if(selectedList.length > 0){
    		
    		//var selectedInfo = selectedList[0];
    		
    		var roleInfo = {};
    		
    		roleInfo.setForm = {};
    		
    		roleInfo.setForm.roleCode = "";
    		roleInfo.setForm.roleName = "";
    		roleInfo.setForm.roleDesc = "";
    		roleInfo.setForm.useYn = "Y";
    		
    		currForm.setFormValue(roleInfo);
    		
    		
    		// 입력 항목 및 버튼 활성화
    		fn_disableInputElement(false);
    	//}
    });
    
    
    // 권한 정보 저장하기
	$("#btnSaveRoleInfo").on("click", function(){
    	
    	// Validation Check Role 설정
    	var validationItems = {
    			showType : 'top', 				// "top", "bottom"
    			rules : [
    				{fieldName:'roleName', 		fieldTitle:'권한명', 		ruleOption:["required"]},
    				{fieldName:'roleDesc', 		fieldTitle:'권한설명', 		ruleOption:["required"]},
    				{fieldName:'useYn', 		fieldTitle:'사용유무', 		ruleOption:["required"]}
    			]
    	};
    	
    	// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
				
				var formInfo = currForm.getFormValue();
				var roleInfo = formInfo.formRoleInfo;
				
				var param = {};
		    	
		    	param.roleInfo = roleInfo;
		    	
		    	if(Util.isEmpty(roleInfo.roleCode)){
		    		
		    		var requestUrl = "/mamager/authMng/insertAuthList.ajax";
		    		
		    		// Request Save
		    		Util.saveRequest(requestUrl, param, function(resultData){
		        		
		        		// 생성 완류 후 권한 목록 재조회
		        		fn_getRoleList();
		        	});
		    		
		    	}else{
		    		
		    		var requestUrl = "/mamager/authMng/updateAuthList.ajax";
		    		
		    		// Request Update
		    		Util.updateRequest(requestUrl, param, function(resultData){
		        		
		        		// 수정 완료 후 권한 목록 재조회
		        		fn_getRoleList();
		        	});
		    	}
			}
		});
    });
    
    // 선택한 권한별 메뉴 List 저장하기
	$("#btnSaveRoleMenu").on("click", function(){
		
		// 선택한 메뉴 정보 List 를 가져온다
		var selectedMenuList = GRID.getSelectedAll(ax5GridViewMenu);
		
		if(selectedMenuList.length <= 0){
			
			alert("선택한 메뉴가 없습니다.");
			
		}else{
			
			// 권한 정보 가져오기
			var formInfo = currForm.getFormValue();
			var roleInfo = formInfo.formRoleInfo;
			
			// Parameter 생성
			var param = {};
	    	
	    	param.roleInfo = roleInfo;				// 권한 정보
	    	param.menuList = selectedMenuList;		// 선택한 메뉴 목록 정보
	    	
			var requestUrl = "/mamager/authMng/updateAuthMenuList.ajax";
			
			Util.saveRequest(requestUrl, param, function(resultData){
				
				
			});
		}
	});
	
    
    
	// Tab Click Event 선언
    $("li[data-tab=tab-2]").on("click", function(){
    	
    	// 메뉴 목록 Tab의 그리드 안보임 현상으로 setTimeout 적용해서 그리드를 생성한다
    	// 최초 load 시 적용
    	if(!firstLoadMenuTab){
    	
    		setTimeout(function(){
        		
    			firstLoadMenuTab = true;
    			
    			fn_initMenuGrid();
        		
        		var formInfo = currForm.getFormValue();
				var roleInfo = formInfo.formRoleInfo;
				console.log("formInfo : ", formInfo)
				console.log("roleInfo : ", roleInfo)
				// 선택한 권한 정보가 있을때만
				if(!Util.isEmpty(roleInfo.roleCode)){
				
					// 메뉴 목록 데이터 가져오기
	        		fn_getMenuList(roleInfo);
				}
    		}, 50);
    	}
    });
    
    
});