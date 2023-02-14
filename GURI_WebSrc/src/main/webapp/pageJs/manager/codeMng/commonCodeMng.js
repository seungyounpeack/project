var loading = $.loading();

$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
    var currForm = new FORM("formCodeInfo");
    var currSubForm = new FORM("formSubCodeInfo");
    
 	// 그룹 공통코드 Grid 객체 선언
    var ax5GridViewCode = null;
 	
 	// 하위 공통코드 Grid 객체 선언
    var ax5GridViewSubCode = null;
    
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
    // 입력 항목 및 버튼 비활성화
    //fn_disableInputElement(true);
    
 	// 그룹 공통코드 목록 그리드 생성
    fn_initCodeGrid();
    
    // 하위 공통코드 목록 그리드 생성
    fn_initSubCodeGrid();
    
    // 공통코드 목록 그리드 생성
    //fn_initMenuGrid();
    
	// loading 시 입력항목 비활성화 시키기
    //fn_disableInputElement(true);
    
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
    
    // 공통코드 그리드 생성
    function fn_initCodeGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "codeId", 		label: "코드 ID", 	width: '25%',		align: "left"},
    		{key: "codeName", 		label: "코드명", 		width: '25%',		align: "left"},
    		{key: "codeDesc", 		label: "코드 설명", 	width: '25%',		align: "left"},
    		{key: "codeOrder", 		label: "정렬순서", 		width: '12.5%',		align: "center"},
            {key: "useYn", 		label: "사용유무", 	width: '12.5%',		align: "center"}
        ];
    	
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("code-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewCode = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigCode();
	    	
	    	// 권한 목록 데이터 가져오기
	    	fn_getCodeList();
	    });
    };
    
    // 하위 공통코드 그리드 생성
    function fn_initSubCodeGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
    	var gridConfigInfo = {};
    	
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "subCodeId", 		label: "코드 ID", 	width: '25%',		align: "left"},
    		{key: "subCodeName", 		label: "코드명", 		width: '25%',		align: "left"},
    		{key: "subCodeDesc", 		label: "코드 설명", 	width: '25%',		align: "left"},
    		{key: "subCodeOrder", 		label: "정렬순서", 		width: '12.5%',		align: "center"},
    		{key: "subUseYn", 		label: "사용유무", 	width: '12.5%',		align: "center"}
    		];
    	
    	// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
    	GRID.createGridView("subCode-grid", gridConfigInfo, function(ax5Grid){
    		
    		// 화면별 그리드 사용을 위해 객체를 Return 받는다
    		ax5GridViewSubCode = ax5Grid;
    		
    		// Default 옵션 외 Config 설정
    		//fn_setExtendConfigSubCode();
    		
    		// 권한 목록 데이터 가져오기
    		//fn_getSubCodeList();
    	});
    };
    
    
 	// 그룹공통코드 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigCode() {
 		
		// 그리드 Body Click Event 선언
		ax5GridViewCode.config.body.onClick = fn_codeGridBodyOnClick;
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewCode.config.body.onDataChanged = fn_codeGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewCode.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:false, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewCode, configOption);			
	};
	
	// 하위 공통코드 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigSubCode() {
		console.log("ax5GridViewSubCode.config.body : ", ax5GridViewSubCode.config.body)
		// 하위공통코드  그리드 Body Click Event 선언
		ax5GridViewSubCode.config.body.onClick = fn_subCodeGridBodyOnClick;
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewSubCode.config.body.onDataChanged = fn_subCodeGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewSubCode.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:false, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewSubCode, configOption);			
	};
	
	
	// 그룹 공통코드 그리드 Body Click Event 선언
	function fn_codeGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		ax5GridViewCode.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewCode.select(selectRowIndex, {selected: true});
   		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var codeInfo = {};
   		codeInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(codeInfo);
		
		var param = {};
		
		param.codeInfo = selectRowValues;
		console.log("param : ", param)
		var getSubUrl = "/mamager/commonCodeMng/getCommonSubCodeList.ajax";
		
		Util.request(getSubUrl, param, function(resultData){
			
			if( resultData.gridList.length >= 0 ){
				//fn_initSubCodeGrid();
				// 그리드 생성하기
				GRID.setGridData(ax5GridViewSubCode, resultData.gridList);
				
				// Default 옵션 외 Config 설정
	    		if( resultData.gridList.length > 0 )fn_setExtendConfigSubCode();
	    		
			}
		});
		$("#btnCreateSubCode").attr("disabled", false);
		
		// 입력 항목 및 버튼 활성화
		$("#btnModifyCodeInfo").attr("disabled", false);
		fn_disableButtonModElement(true, "group");
		//fn_disableButtonElement(false, "group");
	};
	
	// 하위 공통코드 그리드 Body Click Event 선언
	function fn_subCodeGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
		var selectColumnValue = this.value;			// 선택한 Column Value
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
		// 전체 checkbox unchecked
		ax5GridViewSubCode.selectAll({selected: false});
		
		// 선택한 Row의 Checkbox Select 처리
		ax5GridViewSubCode.select(selectRowIndex, {selected: true});
		
		// 선택한 Row 정보를 권한 정보에 표시
		var subCodeInfo = {};
		subCodeInfo.setForm = selectRowValues;
		
		currSubForm.setFormValue(subCodeInfo);
		
		// 입력 항목 및 버튼 활성화
		$("#btnModifySubCodeInfo").attr("disabled", false);
		fn_disableButtonModElement(true, "sub");
		//fn_disableButtonElement(false, "sub");
	};
	
	
	// 공통코드 그리드 Checkbox Click Event
	function fn_codeGridDataChanged() {
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
   		ax5GridViewCode.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewCode.select(selectRowIndex, {selected: true});
		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var codeInfo = {};
   		codeInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(codeInfo);
		
		
		// 입력 항목 및 버튼 활성화
		$("#btnModifyCodeInfo").attr("disabled", false);
		fn_disableButtonModElement(true, "group");
		//fn_disableButtonElement(false, "group");
	};
	
	// 하위코드 그리드 Checkbox Click Event
	function fn_subCodeGridDataChanged() {
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
		ax5GridViewSubCode.selectAll({selected: false});
		
		// 선택한 Row의 Checkbox Select 처리
		ax5GridViewSubCode.select(selectRowIndex, {selected: true});
		
		// 선택한 Row 정보를 권한 정보에 표시
		var subCodeInfo = {};
		subCodeInfo.setForm = selectRowValues;
		
		currSubForm.setFormValue(subCodeInfo);
		
		
		// 수정 항목 및 버튼 활성화
		$("#btnModifySubCodeInfo").attr("disabled", false);
		fn_disableButtonModElement(true, "sub");
		$("#btnCreateSubCode").attr("disabled", false);
		//fn_disableButtonElement(false, "group");
	};
	
    
    
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/

    // 그룹 공통코드 목록 데이터 가져오기
	function fn_getCodeList() {
		
		var requestUrl = "/mamager/commonCodeMng/getCommonCodeList.ajax";
		
		var param ={};
		
		param.codeInfo = {};
		
		//GRID.setGridDataAjax(ax5GridViewCode, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewCode, resultData.gridList);
		});
	};
	
	// 하위 공통코드 목록 데이터 가져오기
	function fn_getSubCodeList(code) {
		
		var requestUrl = "/mamager/commonCodeMng/getCommonSubCodeList.ajax";
		
		var param ={};
		
		param.codeInfo = {codeId : code};
		
		//GRID.setGridDataAjax(ax5GridViewCode, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewSubCode, resultData.gridList);
		});
	};
	
	
	
	
	// 버튼 항목(수정제외) disabled 설정
	function fn_disableButtonModElement(disableFlag, id) {
		if( id == "group" ){
			//$("#codeId").attr("disabled", disableFlag);				// 코드 ID
			$("#btnSaveCodeInfo").attr("disabled", disableFlag);				// 코드명
			//$("#btnModifyCodeInfo").attr("disabled", disableFlag);				// 코드설명
			$("#btnCancleCodeInfo").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}else if( id == "sub" ){
			$("#btnSaveSubCodeInfo").attr("disabled", disableFlag);				// 코드명
			//$("#btnModifySubCodeInfo").attr("disabled", disableFlag);				// 코드설명
			$("#btnCancleSubCodeInfo").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=subUseYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}
	};
	
	// 버튼 항목 disabled 설정
	function fn_disableButtonElement(disableFlag, id) {
		if( id == "group" ){
			//$("#codeId").attr("disabled", disableFlag);				// 코드 ID
			$("#btnSaveCodeInfo").attr("disabled", disableFlag);				// 코드명
			$("#btnModifyCodeInfo").attr("disabled", disableFlag);				// 코드설명
			$("#btnCancleCodeInfo").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}else if( id == "sub" ){
			$("#btnSaveSubCodeInfo").attr("disabled", disableFlag);				// 코드명
			$("#btnModifySubCodeInfo").attr("disabled", disableFlag);				// 코드설명
			$("#btnCancleSubCodeInfo").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=subUseYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}
	};
	
	// 입력 항목 disabled 설정
	function fn_disableInputElement(disableFlag, id) {
		if( id == "group" ){
			//$("#codeId").attr("disabled", disableFlag);				// 코드 ID
			$("#codeName").attr("disabled", disableFlag);				// 코드명
			$("#codeDesc").attr("disabled", disableFlag);				// 코드설명
			//$("#codeOrder").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=useYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}else if( id == "sub" ){
			$("#subCodeId").attr("disabled", disableFlag);				// 코드 ID
			$("#subCodeName").attr("disabled", disableFlag);				// 코드명
			$("#subCodeDesc").attr("disabled", disableFlag);				// 코드설명
			//$("#subCodeOrder").attr("disabled", disableFlag);				// 정렬순서
			
			$("input[name=subUseYn]").attr("disabled", disableFlag);		// 사용유무
			
			// Button
			$("#btnSavecodeInfo").attr("disabled", disableFlag);		// 코드정보 저장 버튼
			
		}
	};
	
	
 	    
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
    
	// 그룹 공통코드 생성 Button Click Event
    $("#btnCreateCode").on("click", function(){
    	
		var codeInfo = {};
		console.log("ddd")
		codeInfo.setForm = {};
		
		/*codeInfo.setForm.codeId = "";
		codeInfo.setForm.codeOrder = "";*/
		codeInfo.setForm.codeName = "";
		codeInfo.setForm.codeDesc = "";
		codeInfo.setForm.useYn = "Y";
		
		currForm.setFormValue(codeInfo);
		var param = {};
		param.codeInfo = currForm.getFormValue().formCodeInfo;
		console.log("currForm : " , currForm.getFormValue())
		Util.request("/mamager/commonCodeMng/getCommonTopCodeNext.ajax", param, function(resultData){
			if( !Util.isEmpty(resultData.codeNext) ){
				$("#codeId").val(resultData.codeNext.codeNextInfo);
				$("#codeOrder").val(resultData.codeNext.codeNextSqe);
				console.log("resultData.codeNext : ", resultData.codeNext)
			}
		})
		
		// 입력 항목 및 버튼 활성화
		fn_disableInputElement(false, "group");
		fn_disableButtonModElement(false, "group");
    });
    
    // 하위 공통코드 생성 Button Click Event
    $("#btnCreateSubCode").on("click", function(){
    	$("#btnCreateSubCode").attr("disabled", true);
    	$("#groupCode").val($("#codeId").val());
    	
    	//var selectedList = GRID.getSelectedList(ax5GridViewCode);
    	
    	// 선택한 Row 가 있는지 체크
    	//if(selectedList.length > 0){
    	
    	//var selectedInfo = selectedList[0];
    	
    	var subCodeInfo = {};
    	
    	subCodeInfo.setForm = {};
    	
    	subCodeInfo.setForm.subCodeId = "";
    	subCodeInfo.setForm.subCodeName = "";
    	subCodeInfo.setForm.subCodeDesc = "";
    	subCodeInfo.setForm.subCodeOrder = "";
    	subCodeInfo.setForm.subUseYn = "Y";
    	
    	currSubForm.setFormValue(subCodeInfo);
    	
    	var param = {};
		param.subCodeInfo = currSubForm.getFormValue().formSubCodeInfo;
		console.log("currSubForm : " , currSubForm.getFormValue())
		Util.request("/mamager/commonCodeMng/getCommonSubCodeNext.ajax", param, function(resultData){
			if( !Util.isEmpty(resultData.codeNextSqe) ){
				$("#subCodeOrder").val(resultData.codeNextSqe);
				console.log("resultData.codeNextSqe : ", resultData.codeNextSqe)
			}
		})
		
    	// 입력 항목 및 버튼 활성화
    	fn_disableInputElement(false, "sub");
    	fn_disableButtonModElement(false, "sub");
    	//}
    });
    
    // 그룹 공통코드 수정 Button Click Event
    $("#btnModifyCodeInfo").on("click", function(){
    	
    	// 입력 항목 및 버튼 활성화
    	$("#btnModifyCodeInfo").attr("disabled", true);
		fn_disableButtonModElement(false, "group");
    	fn_disableInputElement(false, "group");
    	//}
    });
    
    // 하위 공통코드 수정 Button Click Event
    $("#btnModifySubCodeInfo").on("click", function(){
    	
    	// 입력 항목 및 버튼 활성화
    	$("#btnModifyCodeInfo").attr("disabled", true);
		fn_disableButtonModElement(false, "sub");
    	fn_disableInputElement(false, "sub");
    	//}
    });
    
    // 그룹 공통코드 취소 Button Click Event
    $("#btnCancleCodeInfo").on("click", function(){
    	
    	// 입력 항목 및 버튼 활성화
    	fn_disableInputElement(true, "group");
    	fn_disableButtonElement(true, "group");
    	//}
    });
    
    // 하위 공통코드 취소 Button Click Event
    $("#btnCancleSubCodeInfo").on("click", function(){
    	
    	// 입력 항목 및 버튼 활성화
    	fn_disableInputElement(true, "sub");
    	fn_disableButtonElement(true, "sub");
    	$("#btnCreateSubCode").attr("disabled", false);
    });
    
    
    // 그룹 공통코드 정보 저장하기
	$("#btnSaveCodeInfo").on("click", function(){
    	
    	// Validation Check Role 설정
    	var validationItems = {
    			showType : 'top', 				// "top", "bottom"
    			rules : [
    				{fieldName:'codeId', 		fieldTitle:'코드 ID', 		ruleOption:["required"]},
    				{fieldName:'codeName', 		fieldTitle:'코드명', 		ruleOption:["required"]},
    				{fieldName:'codeDesc', 		fieldTitle:'코드 설명', 		ruleOption:["required"]},
    				{fieldName:'codeOrder', 		fieldTitle:'정렬순서', 		ruleOption:["required"]},
    				{fieldName:'useYn', 		fieldTitle:'사용유무', 		ruleOption:["required"]}
    				
    			]
    	};
    	console.log("formInfo : ", currForm.getFormValue())
    	// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
				
				var formInfo = currForm.getFormValue();
				
				var codeInfo = formInfo.formCodeInfo;
				
				var param = {};
		    	
		    	param.codeInfo = codeInfo;
		    	console.log("param : ", param)
		    	var requestUrl = "/mamager/commonCodeMng/insertCommonTopCodeList.ajax";
	    		
	    		// Request Save
	    		Util.saveRequest(requestUrl, param, function(resultData){
	        		
	    			if( resultData.resultCnt > 0 ){
	    				
	    				// 생성 완류 후 권한 목록 재조회
	    				fn_getCodeList();
	    				fn_disableButtonElement(true, "group");
	    			}
	        	});
		    	/*if(Util.isEmpty(codeInfo.codeId)){
		    		
		    		var requestUrl = "/mamager/commonCodeMng/insertCommonCodeList.do";
		    		
		    		// Request Save
		    		Util.saveRequest(requestUrl, param, function(resultData){
		        		
		        		// 생성 완류 후 권한 목록 재조회
		        		fn_getCodeList();
		        		fn_disableButtonElement(true, "group");
		        	});
		    		
		    	}else{
		    		
		    		var requestUrl = "/mamager/commonCodeMng/updateCommonCodeList.do";
		    		
		    		// Request Update
		    		Util.updateRequest(requestUrl, param, function(resultData){
		        		
		        		// 수정 완료 후 권한 목록 재조회
		        		fn_getCodeList();
		        		fn_disableButtonElement(true, "group");
		        	});
		    	}*/
			}
		});
    });
   
	// 하위 공통코드 정보 저장하기
	$("#btnSaveSubCodeInfo").on("click", function(){
		
		// Validation Check Role 설정
		var validationItems = {
				showType : 'top', 				// "top", "bottom"
				rules : [
					{fieldName:'groupCode', 		fieldTitle:'상위 코드 ID', 		ruleOption:["required"]},
					{fieldName:'subCodeId', 		fieldTitle:'코드 ID', 		ruleOption:["required"]},
					{fieldName:'subCodeName', 		fieldTitle:'코드명', 		ruleOption:["required"]},
					{fieldName:'subCodeDesc', 		fieldTitle:'코드 설명', 		ruleOption:["required"]},
					{fieldName:'subCodeOrder', 		fieldTitle:'정렬순서', 		ruleOption:["required"]},
					{fieldName:'subUseYn', 		fieldTitle:'사용유무', 		ruleOption:["required"]}
					
					]
		};
		
		// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
				
				var formInfo = currSubForm.getFormValue();
				var subCodeInfo = formInfo.formSubCodeInfo;
				
				var param = {};
				console.log("formInfo : ", formInfo)
				param.subCodeInfo = subCodeInfo;
				
				if( $("#btnModifySubCodeInfo").attr("disabled") == "disabled" ){
					var requestUrl = "/mamager/commonCodeMng/insertCommonSubCodeList.ajax";
					
					// Request Save
					Util.saveRequest(requestUrl, param, function(resultData){
						
						// 생성 완류 후  목록 재조회
						fn_getSubCodeList(subCodeInfo.groupCode);
						//버튼 disable 처리
						fn_disableButtonElement(true, "sub");
					});
				}else{
					var requestUrl = "/mamager/commonCodeMng/updateCommonSubCodeList.ajax";
					// Request Save
					Util.saveRequest(requestUrl, param, function(resultData){
						
						// 생성 완류 후  목록 재조회
						fn_getSubCodeList(subCodeInfo.groupCode);
						//버튼 disable 처리
						fn_disableButtonElement(true, "sub");
					});
				}
				
				/*if(Util.isEmpty(subCodeInfo.subCodeId)){
					
					var requestUrl = "/mamager/commonCodeMng/insertCommonSubCodeList.do";
					
					// Request Save
					Util.saveRequest(requestUrl, param, function(resultData){
						
						// 생성 완류 후 권한 목록 재조회
						//fn_getSubCodeList();
						//버튼 disable 처리
						fn_disableButtonElement(true, "sub");
					});
					
				}else{
					
					var requestUrl = "/mamager/commonCodeMng/updateCommonSubCodeList.do";
					
					// Request Update
					Util.updateRequest(requestUrl, param, function(resultData){
						
						// 수정 완료 후 권한 목록 재조회
						//fn_getSubCodeList();
						//버튼 disable 처리
						fn_disableButtonElement(true, "sub");
					});
				}*/
			}
		});
	});
	
    
    
});