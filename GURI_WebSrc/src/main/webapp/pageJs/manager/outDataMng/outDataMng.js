var loading = $.loading();
$(function () {
    "use strict";
    
    /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
    var currForm = new FORM("tab-1");

    // 데이터 유형 Grid 객체 선언
    var ax5GridViewUploadData = null;
    
    // 데이터 History Grid 객체 선언
    var ax5GridViewUploadDataHis = null;
    
    
    // History Tab 그리드 생성을 위한 Flag 
    var firstLoadHistoryTab = false;
    
    
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
    
    // Element Default 값 설정 
    fn_initDefaultElement();
    
    
    // Element Default 값 설정 
    function fn_initDefaultElement() {
    	
    	/* 월별 분석 Default 설정			*/
    	$('.dateSelect').datetimepicker({
    		format: 'YYYYMM',
    		//defaultDate: moment(new Date('2018-01-01'))  
    		defaultDate: moment().add(-2, 'month')
    	});
    }
    
    // 데이터 유형 목록 그리드 생성
    fn_initDataTypeGrid();
    
    
    // 데이터 유형별 History 그리드 생성
    fn_initDataHistoryGrid();
    
    
    // 입력 항목 초기화 하기
    fn_initFormData();
    
    /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
     
    
    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/

    // 데이터 유형 목록 그리드 생성
    function fn_initDataTypeGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "gubunName", 				label: "구분", 			width: 70,		align: "center"},
    		{key: "codeName", 				label: "데이터 유형", 	width: 300,		align: "left"},
    		{key: "codeDesc", 				label: "테이블명",		width: 170,		align: "left"},
    		{key: "targetMonth", 			label: "대상 년월", 	width: 80,		align: "center"},
    		{key: "createStartDate", 		label: "데이터 시작 시간", 	width: 130,		align: "center"},
    		{key: "createEndDate", 			label: "데이터 종료 시간", 	width: 130,		align: "center"}
        ];
    	
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	gridConfigInfo.grouping = {display:false};
    	
    	
    	// 그리드 생성하기
	    GRID.createGridView("upload-data-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewUploadData = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigData();
	    	
	    	// 데이터 유형 목록 데이터 가져오기
	    	fn_getUploadDataList();
	    });
    };
    
    
    // 데이터 유형 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigData() {
 		
		// 데이터 유형 그리드 Body Click Event 선언
		ax5GridViewUploadData.config.body.onClick = fn_dataTypeGridBodyOnClick;
		
		// 그리드 Checkbox Click Event 선언
		ax5GridViewUploadData.config.body.onDataChanged = fn_dataTypeGridDataChanged;
		
		// 그리드 Header의 Checbox Display
		ax5GridViewUploadData.config.header.selector = false;
		
		// Row Selector(Row Checkbox) 보이기
		var configOption = {showRowSelector:true, multipleSelect:true, rowSelectorColumnWidth:25};
		
		GRID.showRowSelector(ax5GridViewUploadData, configOption);	
		
		GRID.setMergeColumn(ax5GridViewUploadData, ['gubunName']);
	};
	
	// 데이터 유형 그리드 Body Click Event 선언
	function fn_dataTypeGridBodyOnClick(){
		
		var selectColumn = this.column;				// 선택한 Column
   		var selectColumnIndex = this.colIndex;		// 선택한 Column Index
   		var selectColumnValue = this.value;			// 선택한 Column Value
   		
   		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
   		
   		// 전체 checkbox unchecked
   		ax5GridViewUploadData.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewUploadData.select(selectRowIndex, {selected: true});
   		
   		// 선택한 Row 정보를 정보에 표시
   		var uploadDataInfo = {};
   		uploadDataInfo.setForm = selectRowValues;
   		console.log("selectRowValues: ", selectRowValues)
   		
		currForm.setFormValue(uploadDataInfo);
		currForm.setValue("uploadFiles", "");
		
		// History 탭이 활성화 되었을때만 조회
		if($("#tabHistory").attr("class") == "active"){
			// History 목록 데이터 가져오기
			fn_getUploadHistoryList(selectRowValues);
		}
		
		// 버튼 활성화
		fn_disableButton(selectRowValues);
	};
	
	
	
	// 목록 그리드 Checkbox Click Event
	function fn_dataTypeGridDataChanged() {
		
		var selectRowValues = this.item;			// 선택한 전체 Row Value
   		var selectRowIndex = this.dindex;			// 선택한 Row Index
		
   		ax5GridViewUploadData.selectAll({selected: false});
   		
   		// 선택한 Row의 Checkbox Select 처리
   		ax5GridViewUploadData.select(selectRowIndex, {selected: true});
		
   		// 선택한 Row 정보를 권한 정보에 표시
   		var roleInfo = {};
   		roleInfo.setForm = selectRowValues;
   		
		currForm.setFormValue(roleInfo);
		
		currForm.setValue("orignlFileNm", "");
		currForm.setValue("uploadFiles", "");
		
		// History 목록 데이터 가져오기
		fn_getUploadHistoryList(selectRowValues);
		
		// 버튼 활성화
		fn_disableButton(selectRowValues);
	};
	
	
	// 데이터 유형별 History 그리드 생성
	function fn_initDataHistoryGrid() {
    	
    	// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
		
    	// Columns 정보 설정
    	gridConfigInfo.columns = [
    		{key: "targetMonth", 		label: "대상 년월", 	width: 70,		align: "center"},
    		{key: "gubunName", 			label: "구분", 			width: 70,		align: "center"},
    		{key: "procStartTime", 		label: "시작 시간", 	width: 130,		align: "center"},
    		{key: "procEndTime", 		label: "종료 시간", 	width: 130,		align: "center"},
    		//{key: "createDate", 		label: "완료 날짜", 	width: 130,		align: "center"},
            {key: "procDesc", 			label: "Desc", 			width: 300,		align: "left"}
        ];
    	
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};
    	
    	// 그리드 생성하기
	    GRID.createGridView("upload-history-grid", gridConfigInfo, function(ax5Grid){
	    	
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewUploadDataHis = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    	fn_setExtendConfigDataHis();
	    });
    };
    
    
    // 데이터 History 그리드 Default 옵션 외 Config 설정
	function fn_setExtendConfigDataHis() {
		
		GRID.setMergeColumn(ax5GridViewUploadDataHis, ['targetMonth']);
	};
    
	/***************************************************************************************************
    * 5.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 6.일반 Function 영역
    ****************************************************************************************************/

	// 데이터 유형 목록 데이터 가져오기
	function fn_getUploadDataList() {
		
		var requestUrl = "/mamager/uploadDataMng/getUploadDataList.do";
		
		var param ={};
		
		param.paramInfo = {};
		
		//GRID.setGridDataAjax(ax5GridViewRole, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewUploadData, resultData.gridList);
		});
	};
	
	
	
	// 데이터 유형별 History 데이터 가져오기
	function fn_getUploadHistoryList(paramInfo) {
		
		var requestUrl = "/mamager/uploadDataMng/getUploadDataHisList.do";
		
		var param ={};
		
		param.paramInfo = paramInfo;
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			
			GRID.setGridData(ax5GridViewUploadDataHis, resultData.gridList);
		});
	};
	
	
	// 버튼 Disabled 처리
	function fn_disableButton(paramUploadInfo) {
		
		//$("#btnSaveUploadInfo").attr("disabled", false);
		
		// 데이터 생성 버튼 활성화
		//if(!Util.isEmpty(paramUploadInfo.fileUploadDate)){
		if(!Util.isEmpty(paramUploadInfo.codeId)){
			$("#btnCreateData").attr("disabled", false);	
			$("#targetMonth").attr("disabled", false);
			$("#uploadFiles").attr("disabled", false);
						
		}else{
			$("#btnCreateData").attr("disabled", true);
			$("#targetMonth").attr("disabled", true);
			$("#uploadFiles").attr("disabled", true);
		}
		
		// 통계 생성 버튼 활성화
		/*
		if(!Util.isEmpty(paramUploadInfo.createDataDate)){
		
			$("#btnCreateAnalysis").attr("disabled", false);
		}else{
			$("#btnCreateAnalysis").attr("disabled", true);
		}
		*/
		
	};
	
	
	// 입력 항목 초기화 하기
	function fn_initFormData() {

		currForm.setValue("codeId", "");
		currForm.setValue("atchFileId", "");
		currForm.setValue("gubunName", "");
		currForm.setValue("codeName", "");
		currForm.setValue("orignlFileNm", "");
		currForm.setValue("targetMonth", "");
		currForm.setValue("uploadFiles", "");
		
		GRID.setGridData(ax5GridViewUploadDataHis, []);
		
		$("#btnSaveUploadInfo").attr("disabled", true);
		$("#btnCreateData").attr("disabled", true);
		$("#btnCreateAnalysis").attr("disabled", true);
	};
	
	/***************************************************************************************************
    * 7.Button Event 영역
    ****************************************************************************************************/
    // 저장 버튼 Click Event
	$("#btnCreateData").on("click", function(){
		
		var validationItems = {
    			showType : 'top', 				// "top", "bottom"
    			rules : [
    				{fieldName:'gubunName', 	fieldTitle:'구분', 				ruleOption:["required"]},
    				{fieldName:'codeName', 		fieldTitle:'데이터 유형', 		ruleOption:["required"]},
    				{fieldName:'targetMonth', 	fieldTitle:'대상 년월', 		ruleOption:["required"]},
    				{fieldName:'uploadFiles', 	fieldTitle:'업로드 파일', 		ruleOption:["required"]}
    			]
    	};
		
		// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
				
				// DEF.messages.saveConfirm
				//Util.showConfirm(DEF.messages.saveConfirm, function(){
				//Util.showConfirm("데이터를 생성하시겠습니까? 데이터 유형에 따라 시간이 오래 걸릴수도 있습니다.", function(){
					
					//Util.showLoading();
					
					setTimeout(function(){
						
						/*
						var ext = $('#uploadFiles').val().split('.').pop().toLowerCase();

						if($.inArray(ext, ['txt','csv']) == -1) {

						 Util.showAlert("txt, csv 파일만 업로드 할수 있습니다.");
 
						 return;

						};
						*/

						
						var formData = new FormData();
						
						var uploadFile = $("#uploadFiles")[0].files[0];
						
						var codeId = currForm.getValue("codeId");
						var atchFileId = currForm.getValue("atchFileId");
						var targetMonth = currForm.getValue("targetMonth");
						
						formData.append("codeId", codeId);
						formData.append("atchFileId", atchFileId);
						formData.append("targetMonth", targetMonth);
						formData.append("uploadFile", uploadFile);
						console.log("uploadFile", uploadFile);
						console.log("formData", formData);
						// Ajax 방식으로 파일 업로드
						Util.requestFileUplaod("/mamager/uploadDataMng/createUploadData.do", formData, function(result){
							
							//console.log(result);

				        	if(result.resultValue == "Y"){
				        		console.log("uploadFile", uploadFile);
								console.log("formData", formData); 
				        		alert("데이터가 정상적으로 생성 되었습니다.");
				        		
				        		// 입력 항목 초기화 하기
								fn_initFormData();
								
				        		// 데이터 유형 목록 데이터 가져오기
				    	    	fn_getUploadDataList();
				        	}else{
								alert("처리중 오류가 발생했습니다.");
							}
				        });

					}, 500);
				//});
			};
			
		});
	});
	
	
	// 데이터 생성 버튼 Click Event
	/*
	$("#btnCreateData").on("click", function(){
				
		Util.showConfirm("데이터를 생성하시겠습니까? 데이터 유형에 따라 시간이 오래 걸릴수도 있습니다.", function(){
			
			Util.showLoading();
					
			setTimeout(function(){
			
				var formInfo = currForm.getFormValue();
				var uploadInfo = formInfo.formUploadInfo;
				
				var requestUrl = "/mamager/uploadDataMng/createUploadData.do";
				
				var param ={};
				
				param.paramInfo = uploadInfo;
				
				// Loading bar를 보여주기 위해 Util.requestDataCreate 사용
				Util.requestDataCreate(requestUrl, param, function(resultData){
					
					console.log(resultData);
					
					if(resultData.resultValue == "Y"){
					
						Util.showAlert("데이터가 정상적으로 생성 되었습니다.");
						
						// 입력 항목 초기화 하기
						fn_initFormData();
						
						// 데이터 유형 목록 데이터 가져오기
		    	    	fn_getUploadDataList();
		    	    	
		    	    	// History 목록 데이터 가져오기
		    	    	//fn_getUploadHistoryList(uploadInfo);
					}else{
						Util.showAlert("처리중 오류가 발생했습니다.");
					}
				});

			}, 500);
		});
	});
	
	
	// 통계 생성 버튼 Click Event
	$("#btnCreateAnalysis").on("click", function(){
		
		Util.showConfirm("통계 데이터를 생성하시겠습니까? 데이터 유형에 따라 시간이 오래 걸릴수도 있습니다.", function(){
			
			Util.showLoading();
			
			setTimeout(function(){
				
				var formInfo = currForm.getFormValue();
				var uploadInfo = formInfo.formUploadInfo;
				
				var requestUrl = "/mamager/uploadDataMng/createAnalysisData.do";
				
				var param ={};
				
				param.paramInfo = uploadInfo;
				
				// Loading bar를 보여주기 위해 Util.requestDataCreate 사용
				Util.requestDataCreate(requestUrl, param, function(resultData){
					
				});
				
			}, 500);
		});
	});
	*/
	
	
	
	
	// Tab Click Event 선언
    $("li[data-tab=tab-2]").on("click", function(){
    	
    	// 메뉴 목록 Tab의 그리드 안보임 현상으로 setTimeout 적용해서 그리드를 생성한다
    	// 최초 load 시 적용
    	if(!firstLoadHistoryTab){
    	
    		setTimeout(function(){
        		
    			firstLoadHistoryTab = true;
    			
    			fn_initDataHistoryGrid();		// 데이터 유형별 History 그리드 생성
    			
        		var formInfo = currForm.getFormValue();
				var uploadInfo = formInfo.formUploadInfo;
				
				// 선택한 권한 정보가 있을때만
				if(!Util.isEmpty(uploadInfo.codeId)){

					// History 목록 데이터 가져오기
					fn_getUploadHistoryList(uploadInfo);
				}
				
    		}, 50);
    		
    	}else{
    		
    		// History 탭 Click 시 데이터 조회
    		if($(this).attr("href") == "#tab_2"){
    			
	    		var formInfo = currForm.getFormValue();
				var uploadInfo = formInfo.formUploadInfo;
				
				// 선택한 권한 정보가 있을때만
				if(!Util.isEmpty(uploadInfo.codeId)){
	
					// History 목록 데이터 가져오기
					fn_getUploadHistoryList(uploadInfo);
				}
    		}
    	}
    });
})