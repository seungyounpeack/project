var loading = $.loading();

$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
    var currForm = new FORM("formMenuInfo");
    
 	// 그룹 공통코드 Grid 객체 선언
    var ax5GridViewMenu = null;
 	
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
 	// 메뉴 목록 그리드 생성
    fn_initMenuGrid();
    fn_disableButtonModElement(true, "menu");
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
    
    // 메뉴 그리드 생성
    function fn_initMenuGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "menuName", 		label: "메뉴명", 		width: '20%',		align: "left",	treeControl: true},
    		{key: "menuCode", 		label: "메뉴 ID", 	width: '20%',		align: "left"},
    		{key: "menuUrl", 		label: "메뉴 URL", 	width: '20%',		align: "left"},
    		{key: "menuOrder", 		label: "메뉴순서", 		width: '12.5%',		align: "center"},
            {key: "displayYn", 		label: "표시유무", 	width: '12.5%',		align: "center"},
    		{key: "useYn", 		label: "사용유무", 	width: '12.5%',		align: "center"}
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
	    	
	    	// 메뉴 목록 데이터 가져오기
	    	fn_getMenuList();
	    });
    };
    
 	// 메뉴 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigMenu() {
 		
		// 그리드 Body Click Event 선언
		ax5GridViewMenu.config.body.onClick = fn_menuGridBodyOnClick;
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewMenu.config.body.onDataChanged = fn_menuGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewMenu.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:false, multipleSelect:false, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewMenu, configOption);			
	};
	
	
	// 메뉴 코드 그리드 Body Click Event 선언
	function fn_menuGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		//ax5GridViewMenu.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		//ax5GridViewMenu.select(selectRowIndex, {selected: false});

   		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var menuInfo = {};
   		menuInfo.setForm = {};
   		if( selectRowValues != null && selectRowValues.parentCode == "top" ){
   			selectRowValues.parentCode = "ROOT";
   		}
   		
   		$("#btnCreateMenu").attr("disabled", false);	
   		$("#btnModifyMenuInfo").attr("disabled", false);	
   		menuInfo.setForm = selectRowValues;
   		
   		console.log("selectRowValues : 	" , selectRowValues)
   		
		currForm.setFormValue(menuInfo);
		console.log("click")
	};
	
	
	// 공통코드 그리드 Checkbox Click Event
	function fn_menuGridDataChanged() {
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
   		ax5GridViewMenu.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewMenu.select(selectRowIndex, {selected: true});
		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var menuInfo = {};
   		menuInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(menuInfo);
		
		
		// 입력 항목 및 버튼 활성화
		//$("#btnModifyCodeInfo").attr("disabled", false);
		
		//버튼 수정
		fn_disableButtonModElement(true, "menu");
		
		//메뉴 정보 수정
		fn_disableInputElement(false, "menu");
		//fn_disableButtonModElement(false, "menu");
	};
    
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/

    // 메뉴 목록 데이터 가져오기
	function fn_getMenuList() {
		
		var requestUrl = "/mamager/menuMng/getMenuList.ajax";
		
		var param ={};
		
		param.menuInfo = {};
		
		//GRID.setGridDataAjax(ax5GridViewCode, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			console.log("resultData.gridList : ", resultData.gridList)
			GRID.setGridData(ax5GridViewMenu, resultData.gridList);
		});
	};
	
	
	
	
	// 버튼 항목 disabled 설정
	function fn_disableButtonModElement(disableFlag, id) {
		if( id == "menu" ){
			//$("#codeId").attr("disabled", disableFlag);				// 코드 ID
			$("#btnCreateMenu").attr("disabled", disableFlag);				// 코드명
			$("#btnModifyMenuInfo").attr("disabled", disableFlag);				// 코드설명
			$("#btnCancleMenuInfo").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			$("input[name=displayYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSaveMenuInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			$("#btnCancleMenuInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}
	};
	
	
	// 입력 항목 disabled 설정
	function fn_disableInputElement(disableFlag, id) {
		if( id == "menu" ){
			//$("#menuCode").attr("disabled", disableFlag);				// 코드 ID
			$("#menuName").attr("disabled", disableFlag);				// 코드명
			//$("#menuOrder").attr("disabled", disableFlag);				// 정렬순서
			$("#menuUrl").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			$("input[name=visibleYn]").attr("disabled", disableFlag);		// 사용유무
			
		}else{
			$("#menuName").attr("disabled", disableFlag);				// 코드명
			$("#menuUrl").attr("disabled", disableFlag);				// 정렬순서
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			$("input[name=visibleYn]").attr("disabled", disableFlag);		// 사용유무
			
		}
		// Button
		$("#btnSaveMenuInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
		$("#btnCancleMenuInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
	};
	
	
 	    
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
    
	// 그룹 공통코드 생성 Button Click Event
    $("#btnCreateMenu").on("click", function(){
    	$("#menuMode").val("false");
		var menuInfo = {};
		console.log("ddd")
		menuInfo.setForm = {};
		console.log('$("#menuMode").val() : ', $("#menuMode").val())
		menuInfo.setForm.menuName = "";
		menuInfo.setForm.menuUrl = "";
		menuInfo.setForm.menuOrder = "";
		menuInfo.setForm.useYn = "Y";
		menuInfo.setForm.visibleYn = "Y";
		var menuInfo = menuInfo.setForm;
		
		
		var param = {};
    	
    	param.menuInfo = { 'parentCode' : $("#menuCode").val()};
    	console.log("param : ", param)
		var requestUrl = "/mamager/menuMng/selectMenuNext.ajax";
		Util.request(requestUrl, param, function(resultData){
			if( resultData.resultValue == "Y" ){
				var next = resultData.menuNext;
				console.log("next : ", next);
				console.log(" next[0].menuCode : ",  next[0].menuCode)
				//menuInfo.setForm.menuCode = next[0].menuCode;
				//menuInfo.setForm.menuOrder = next[0].menuOrder;
				//menuInfo.setForm.parentCode = $("#menuCode").val();
				$("#parentCode").val($("#menuCode").val());
				$("#menuCode").val(next[0].menuCode);
				$("#menuOrder").val(next[0].menuOrder);
				$("#menuName").val('');
			}else{
				alert("오류가 발생하였습니다.");
			}
		});
		console.log("menuInfo : ", menuInfo);
		currForm.setFormValue(menuInfo);
		
		// 입력 항목 및 버튼 활성화
		fn_disableInputElement(false, "menu");
    });
    
    
    // 그룹 공통코드 수정 Button Click Event
    $("#btnModifyMenuInfo").on("click", function(){
    	$("#menuMode").val("true");
    	// 입력 항목 및 버튼 활성화
    	fn_disableInputElement(false);
    });
    
    // 그룹 공통코드 취소 Button Click Event
    $("#btnCancleMenuInfo").on("click", function(){
    	
    	// 입력 항목 및 버튼 활성화
    	fn_disableInputElement(true, "menu");
    	fn_disableButtonModElement(true, "menu");
    	//}
    });
    
    // 그룹 공통코드 정보 저장하기
	$("#btnSaveMenuInfo").on("click", function(){
    	
    	// Validation Check Role 설정
    	var validationItems = {
    			showType : 'ROOT', 				// "top", "bottom"
    			rules : [
    				{fieldName:'parentCode', 		fieldTitle:'상위 메뉴명', 		ruleOption:["required"]},
    				{fieldName:'menuCode', 		fieldTitle:'메뉴 ID', 		ruleOption:["required"]},
    				{fieldName:'menuName', 		fieldTitle:'메뉴명', 		ruleOption:["required"]},
    				{fieldName:'menuUrl', 		fieldTitle:'메뉴 URL', 		ruleOption:[""]},
    				{fieldName:'menuOrder', 		fieldTitle:'정렬순서', 		ruleOption:["required"]},
    				{fieldName:'visibleYn', 		fieldTitle:'display유무', 		ruleOption:["required"]},
    				{fieldName:'useYn', 		fieldTitle:'사용유무', 		ruleOption:["required"]}
    				
    			]
    	};
    	console.log("formInfo : ", currForm.getFormValue())
    	// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
				
				var formInfo = currForm.getFormValue();
				
				var menuInfo = formInfo.formMenuInfo;
				
				var param = {};
		    	
		    	param.menuInfo = menuInfo;
		    	console.log("param : ", param)
		    	
		    	var mode = $("#menuMode").val();
		    	
		    	
		    	if( mode == "true" )	{
		    		console.log("수정 : ", mode)
		    		var requestUrl = "/mamager/menuMng/updateMenuList.ajax";
		    		
		    		// Request save
		    		Util.saveRequest(requestUrl, param, function(resultData){
		    			
		    			// 수정 완료 후 권한 목록 재조회
		    			fn_getMenuList();
		    			fn_disableButtonModElement(true, "menu");
		    			// 입력 항목 및 버튼 활성화
		    			fn_disableInputElement(true, "menu");
		    		});
		    	}else{
		    		console.log("insert : ", mode)
		    		var requestUrl = "/mamager/menuMng/insertMenuList.ajax";
		    		
		    		// Request save
		    		Util.saveRequest(requestUrl, param, function(resultData){
		    			
		    			// 수정 완료 후 권한 목록 재조회
		    			fn_getMenuList();
		    			fn_disableButtonModElement(true, "menu");
		    			// 입력 항목 및 버튼 활성화
		    			fn_disableInputElement(true, "menu");
		    		});
		    		
		    	}
		    	/*if(Util.isEmpty(menuInfo.menuId)){
		    		
		    		var requestUrl = "/mamager/menuMng/insertCommonCodeList.do";
		    		
		    		// Request Save
		    		Util.saveRequest(requestUrl, param, function(resultData){
		        		
		        		// 생성 완류 후 권한 목록 재조회
		        		fn_getCodeList();
		        		fn_disableButtonModElement(true, "menu");
		        	});
		    		
		    	}else{
		    		
		    		
		    	}*/
			}
		});
    });
    
});