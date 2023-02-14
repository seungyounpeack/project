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
    
    // 데이터 내용 Grid 객체 선언
    var ax5GridViewUploadDataList = null;
    
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
    	});
    	
    	
		$("#btnDldFile").css("display", "none");
		$("#data-content-rad").css("display", "none");
		$("#year").css("display", "none");
		$("#yearMonth").css("display", "none");
		$("#btnSearch").css("display", "none");
		$('#btnBasFile').css("display", "none");

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
    		// 테이블명 안보이게 하기 주석처리필요 ==========================
//    		{key: "codeDesc", 				label: "테이블명",		width: 170,		align: "left"},
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
	    	
	    	// 수정진행중
	    	fn_getDepList();
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
		
		var formInfo = currForm.getFormValue();

		// History 탭이 활성화 되었을때만 조회
		if($('#tab2').hasClass('on')){
			// History 목록 데이터 가져오기
			fn_getUploadHistoryList(formInfo);
		}
		
		// 버튼 활성화
		fn_disableButton(selectRowValues);

		// 테이블별 파일 양식 다운로드 처리
		fn_BasFileDownload(selectRowValues);
		
		$('#btnBasFile').css('display', '');
		
		$("input:radio[name='list']").prop('checked', false);
		$("#btnSearch").css("display", "none");
		$('#btnExcelDownload').css("display", "none");

		// 데이터 내용 그리드 형성
		fn_uploadDataGrid(formInfo);
		
		// 수정진행중
    	fn_getDepList();
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
		
//		currForm.setValue("orignlFileNm", "");
		currForm.setValue("uploadFiles", "");
		
		var formInfo = currForm.getFormValue();

		// History 목록 데이터 가져오기
		fn_getUploadHistoryList(formInfo);
		
		// 버튼 활성화
		fn_disableButton(selectRowValues);
		
		// 수정진행중
    	fn_getDepList();
		
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
            {key: "procDesc", 			label: "Desc", 			width: 180,		align: "left"},
    		{key: "resultMsg", 			label: "Msg", 			width: 300,		align: "left"},
            //{key: "",  label:"다운로드", width: 100,		align: "center", formatter: function () {
            //    return '<button type="button" class="btn btn-xs" onclick="fn_downloadInDataFile(\''+this.item.seq+'\');">다운로드</button>';
            //}},
    		
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
	
	
	function fn_initDataContentGrid(resultData) {
		// 데이터 건수 화면 출력 
		
		// 컬럼 정보
//		for (var i = 0; i < resultData.tableColumn.length; i++){
//			console.log(Util.toCamelCase(resultData.tableColumn[i].columnName))
//	    }
		
		// 컬럼 데이터타입
//		console.log(' resultData.tableAttr ==============' + JSON.stringify(resultData.tableAttr));
		
		// 그리드 정보 
//		console.log(" resultData.gridList========"  + JSON.stringify(resultData.gridList));

		// 데이터 총 건수 
//		console.log(" resultData.ContentAllCount =====" , resultData.ContentAllCount);
		
		// 해당 테이블의 년도 값 
//		console.log(' resultData.selectYearAll ======', resultData.selectYearAll);
		
		//selectBox 년도 데이터 넣기
		// 중복 생성을 막기위해서 year 데이터 다 날리고 시작 
		$("#year").empty();
		for (var y = 0; y < resultData.selectYearAll.length; y++) {
			$("#year").append("<option value='" + resultData.selectYearAll[y].year + "'>" + resultData.selectYearAll[y].year + " 년" + "</option>");
		}
		$('#data_count').html('<span style="font-weight: bold; float: right"> 총 데이터 : '+ resultData.ContentAllCount.count +' 건  </span>')
    	

		
		// 그리드 설정을 위한 Config 정보 객체
	    var gridConfigInfo = {};
	    gridConfigInfo.columns = [
	    	{key: "no", 		label: "번호", 	width: '5%',		align: "center"},
	    	
	    ];
	    for (var i = 0; i < resultData.tableColumn.length; i++){
	    	// key(원본 컬럼명 ), label(comment), width, align
	    	var headColumn = {};
	    	// 컬럼명 
	    	headColumn.key = Util.toCamelCase(resultData.tableColumn[i].columnName);
	    	// comment
	    	headColumn.label = resultData.tableColumn[i].columnComment;
	    	headColumn.width = '20%';
	    	headColumn.align = "center";
	    	if(resultData.tableAttr[i].code == 'timestamp' || resultData.tableAttr[i].code == 'date' ){
	    	
	    	}
	    	gridConfigInfo.columns.push(headColumn);
	    }

	    
		// Page Display 옵션
    	gridConfigInfo.page = {display:false};

    	// 그리드 생성하기
	    GRID.createGridView("upload-data-list-grid", gridConfigInfo, function(ax5Grid){
	    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
	    	ax5GridViewUploadDataList = ax5Grid;
	    	
	    	// Default 옵션 외 Config 설정
	    });
    };
    
	/***************************************************************************************************
    * 5.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 6.일반 Function 영역
    ****************************************************************************************************/

	// 데이터 유형 목록 데이터 가져오기
	function fn_getUploadDataList() {
		
		var requestUrl = "/mamager/dataMng/dataReg/getDataList.ajax";
		
		var param ={};
		
		param.paramInfo = {};
		
		//GRID.setGridDataAjax(ax5GridViewRole, requestUrl, param);
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewUploadData, resultData.gridList);
		});
	};
	
	
	function fn_getDepList() {
		
		var requestUrl = "/mamager/dataMng/dataReg/getDepList.ajax";
		
		var param = {};
		
		param.paramInfo = {};
		
		Util.request(requestUrl, param, function(resultData){
			for (var i = 0; i < resultData.depList.length; i++) {
				$("#dpetName").append("<option value='" + resultData.depList[i].cdId + "'>" + resultData.depList[i].cdNm +"</option>");
			}
	    	
		})
	}
	
	// 데이터 유형별 History 데이터 가져오기
	function fn_getUploadHistoryList(paramInfo) {
		
		var requestUrl = "/mamager/dataMng/dataReg/getDataHisList.ajax";
		
		var param ={};
		
		param = paramInfo;
		
		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			GRID.setGridData(ax5GridViewUploadDataHis, resultData.gridList);
		});
	};
	
    // 파일 양식 다운로드 처리 
    function fn_BasFileDownload(paramInfo) {
    	
    	// 코드 구분값에 따라서 처리..
    	if (paramInfo.codeId == 'TEST_00003'){
    		var no = 'FILE_000000000000034';
    	}
    	else if (paramInfo.codeId == 'TEST_00004'){
    		var no = 'FILE_000000000000009';
    	}
 	   
    	
    	$('#btnBasFile').on("click", function(){
    		fn_fileDownload(no);
    		// 목록에서 클릭한 데이터 넘어옴 
//        	console.log('fn_BasFileDownload =====' , paramInfo);
    		
    	})
    	
    	
    }
    
	// 그리드 선택 데이터 내용 가져오기
    function fn_uploadDataGrid(paramInfo, searchDate) {

    	$("#content").html('<p><h3 id="data-content">데이터 내용</h3>(최대 100건의 데이터가 보여집니다.)</p> ');
    	// 데이터 내용 확인 그리드 생성
    	var requestUrl = "/mamager/dataMng/dataReg/getDataContentList.ajax";
		
		var param ={};
		
		
		param = paramInfo;

		if (searchDate != undefined) {
			param.date = searchDate;
    	}	
		// 선택 데이터 100건 처리 하기위해서 param 데이터에 flag 값 넣어줘야함 
		param.flag = "1";

		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
		Util.request(requestUrl, param, function(resultData){
			fn_initDataContentGrid(resultData);
			GRID.setGridData(ax5GridViewUploadDataList, resultData.content);
		});
    };
    
    //엑셀 다운로드 처리
    function fn_excelDownload(paramInfo, searchdate){
    	var requestUrl = "/mamager/dataMng/dataReg/getDataContentList.ajax";
    	var param = {};
    	// paramInfo 테이블 정보 데이터만 가지고있음
    	param = paramInfo;

    	if (searchdate != undefined) {
			param.date = searchdate;
    	}	
    	
//    	console.log(' param ==== ', param)
		Util.request(requestUrl, param, function(resultData){
			// gridList, tableAttr, tableColumn
			
	    	// 그리드 설정을 위한 Config 정보 객체
		    var header = {};
		    header.columns = [];
		    for (var i = 0; i < resultData.tableColumn.length; i++){
		    	// key(원본 컬럼명 ), label(comment), width, align
		    	var headColumn = {};
		    	// 컬럼명 
		    	headColumn.header = resultData.tableColumn[i].columnComment;
		    	headColumn.key = Util.toCamelCase(resultData.tableColumn[i].columnName);
		    	// comment
		    	headColumn.width = 20;
		    	header.columns.push(headColumn);
		    }
		
//		    console.log( 'resultData ====' , resultData);
//		    console.log('resultData.contentAll' , resultData.contentAll)
		    commonDownloadExcelFile(resultData.param.codeName, header, resultData.content); 
		})
    	
    }
    
    // 엑셀 다운로드
	function commonDownloadExcelFile(title, header, data, callback) {
		
		var rowCount = 0;
		var workbook = new ExcelJS.Workbook();
		workbook.creator = '구리시 데이터';
		workbook.lastModifiedBy = '구리시';
		workbook.created = new Date();
		workbook.modified = new Date();
		var sheet = workbook.addWorksheet('Sheet');

//		sheet.columns = header;
		sheet.columns = header.columns;
		
		for( var i=0;i<data.length;i++ ) {
			data[i].no = data.length - i;
	    	sheet.addRow(data[i]);
		}

		workbook.xlsx.writeBuffer().then( function(data) {
			var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			saveAs(blob, title+'-'+new Date().valueOf()+'.xlsx');
			if( callback ) callback.call(this);
		});
	} 
    
	// 버튼 Disabled 처리
	function fn_disableButton(paramUploadInfo) {
		
		//$("#btnSaveUploadInfo").attr("disabled", false);
		
		// 데이터 생성 버튼 활성화
		//if(!Util.isEmpty(paramUploadInfo.fileUploadDate)){
		
		// disabled 처리 부분  
		if(!Util.isEmpty(paramUploadInfo.codeId)){
			$("#btnCreateData").attr("disabled", false);	
			$("#targetMonth").attr("disabled", false);
			$("#uploadFiles").attr("disabled", false);
			$("#dpetName").attr("disabled", false);
			
			$("#data-content-rad").css("display", "");
			$("#year").css("display", "none");
			$("#yearMonth").css("display", "none");


		}else{
			$("#btnCreateData").attr("disabled", true);
			$("#targetMonth").attr("disabled", true);
			$("#uploadFiles").attr("disabled", true);
			$("#dpetName").attr("disabled", true);
			
			$("#data-content-rad").css("display", "none");
			$("#year").css("display", "none");
			$("#yearMonth").css("display", "none");
		}
		
		// 파일 다운로드 버튼 생성 여부 
//		if(!Util.isEmpty(paramUploadInfo.orignlFileNm)){
//			$("#btnDldFile").css("display", "");
//		} else {
//			$("#btnDldFile").css("display", "none");
//		}
//		
		//var listVar = $('input[name=list]:checked').val();

		//데이터 내용 라디오 버튼 유무
		// codeId 값이 있는경우에만 보여주도록 하자 !
		
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
		currForm.setValue("codeDesc", "");
//		currForm.setValue("orignlFileNm", "");
		currForm.setValue("targetMonth", "");
		currForm.setValue("uploadFiles", "");
//		$('input[name=headerYn]').prop("checked", false);
//		currForm.setValue("headerYn", "");
		
		GRID.setGridData(ax5GridViewUploadDataHis, []);
		
		$("#btnSaveUploadInfo").attr("disabled", true);
		$("#btnCreateData").attr("disabled", true);
		$("#btnCreateAnalysis").attr("disabled", true);
	};
	
	/***************************************************************************************************
    * 7.Button Event 영역
    ****************************************************************************************************/
//   $('#uploadFiles').change(function(){
//	    var orignlFile = $('#uploadFiles')[0].files[0].name;
//		currForm.setValue("orignlFileNm", orignlFile);
//   }) 

   // 파일 다운로드 Click Event
//   $("#btnBasFile").on("click", function(){
//	   var no = 'FILE_000000000000009';
//	   
//	   fn_fileDownload(no);
//	   var param = {};
//	   
//	   //변경된 파일 명
//	   var atchFileId = currForm.getValue("atchFileId");
//	   
//	   //원본 파일 명 
//	   var orignlFileNm = currForm.getValue("orignlFileNm");
//	   
//	   console.log('atchFileId ====' + atchFileId);
//	   console.log('orignlFileNm ==== ' + orignlFileNm);
//
//	   param.atchFileId = atchFileId;
//	   param.orignlFileNm = orignlFileNm;
//
//		// 메뉴 목록 조회하기 Loading bar를 보여주기 위해 Util.Request 사용
//		Util.request("/mamager/dataMng/dataReg/selectDldFile.ajax", param, function(resultData){
//			console.log("데이터 호출 했다")
//			if(resultData.resultValue == "Y"){
//				console.log('성공')
//			} else {
//				console.log('실패')
//			}
//			
//		});
	   
//   })
   
   function fn_fileDownload(no) {
	   var requestUrl = "/mamager/dataMng/dataReg/selectDldFile.ajax?no="+no;
		// iframe 동적생성
		$("iframe[name='submitIframe']").remove();
		var iframe = $('<iframe name="submitIframe" style="width:1px;height:1px;border:none;display:none;"></iframe>').appendTo($('body'));
		iframe.on("load", function() {
			iframe.remove();
		});
		// form 동적생성
		var frm = $('<form></form>').appendTo($('body'));
		frm.attr("method", "post").attr("action", requestUrl).attr("target", "submitIframe");
		frm.submit().remove();
	   
   }
   
	// 저장 버튼 Click Event
	$("#btnCreateData").on("click", function(){
		
		var validationItems = {
    			showType : 'top', 				// "top", "bottom"
    			rules : [
    				{fieldName:'gubunName', 	fieldTitle:'구분', 				ruleOption:["required"]},
    				{fieldName:'codeName', 		fieldTitle:'데이터 유형', 		ruleOption:["required"]},
//    				{fieldName:'codeDesc', 		fieldTitle:'테이블 명', 		ruleOption:["required"]},
    				{fieldName:'targetMonth', 	fieldTitle:'대상 년월', 		ruleOption:["required"]},
    				{fieldName:'uploadFiles', 	fieldTitle:'업로드 파일', 		ruleOption:["required"]}
//    				{fieldName:'headerYn',      fieldTitle:'헤더',           ruleOption:["required"]}
    			]
    	};
		
		// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Success
			if(validSuccess){
					
					setTimeout(function(){
						
						var formData = new FormData();

						// 물리적 테이블명
//						var codeDesc = currForm.getValue("codeDesc");
//						var codeDescSplit = codeDesc.split('.');
//						var schema = codeDescSplit[0];
//						var tableName = codeDescSplit[1];
						
						// 업로드 파일
						var uploadFile = $("#uploadFiles")[0].files[0];
						// 파일존재시 파일 코드 값
						var atchFileId = currForm.getValue("atchFileId");
						// 대상년월 
						var targetMonth = currForm.getValue("targetMonth");
						// 헤더유무
//						var headerYn = currForm.getValue("headerYn");
						
						var codeId = currForm.getValue("codeId");
						
						var orignlFile = $('#uploadFiles')[0].files[0].name;

						//추가
						formData.append("codeId", codeId);
						formData.append("atchFileId", atchFileId);
//						formData.append("codeDesc", codeDesc);
//						
//						formData.append("schema", schema);
//						formData.append("tableName", tableName);
						
						formData.append("targetMonth", targetMonth);
//						formData.append("headerYn", headerYn);
						formData.append("uploadFile", uploadFile);
						
						formData.append("orignlFile", orignlFile);
						
						// Ajax 방식으로 파일 업로드
						Util.requestFileUplaod("/mamager/dataMng/dataReg/dataRegInsert.ajax", formData, function(result){
							
				        	if(result.resultValue == "Y"){
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
	
	// 데이터 내용
	// 대상년도, 대상년월 데이터 선택 값
	$("input[name=list]").on("click", function(){
		var check = $('input[name=list]:checked').val()
		if (check == 'year'){
			
			$("#year").css("display", "");
			$('#yearMonth').css("display", "none");
			$("#btnSearch").css("display", "");
			
			//버튼 변경시 대상년월 값 초기화
			$('#yearMonth').val('');
		    
		} else if (check == 'yearMonth'){
			
			// 수정 진행중 
			$("#year").css("display", "none");
			$('#yearMonth').css("display", "");
			$("#btnSearch").css("display", "");
			
			//기존에 가지고있던 대상년월 데이터 가져와서 넣어주기
			$('#yearMonth').val($("#targetMonth").val());
			//버튼 변경시 대상년도 값 초기화
			$('#year').val('');
		}
	})

	$('#btnSearch').on("click", function (){
		var formInfo = '';
		var count = 0;
		
		var year = $('#year').val();
		var yearMonth = $('#yearMonth').val();
		
		// 대상년도 인지 대상년월 로 체크 되어있는지 구분하고 데이터 가져가야함
		var listVar = $('input[name=list]:checked').val();

		formInfo = currForm.getFormValue();
		
		// 사용자 검색 날짜 데이터 
		var date;
		if( listVar == 'year'){
			date = year;
		} else if (listVar == 'yearMonth') {
			date = yearMonth;
		}
		
		if(date != ''){
	    	$("#excel").html('<a href="#" id="btnExcelDownload" class="bt_xs b_green" style="cursor : pointer">엑셀 다운로드</a>');
		}
		//----------------------- 이상 무
		//엑셀 다운로드 버튼 클릭시 해당 데이터 내용 엑셀 파일로 다운로드 처리
		
		// click 한번으로 처리 되도록함 
		$('#excel').one('click', function (){
			fn_excelDownload(formInfo, date);
			
			// 100건 처리하는 ajax로 이동
		})
		
		fn_uploadDataGrid(formInfo, date);
		
		
	
	})
	
	
	
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

	        	var code = $('#codeId').val();

				// 선택한 권한 정보가 있을때만
				if(!Util.isEmpty(code)){

					// History 목록 데이터 가져오기
					fn_getUploadHistoryList(formInfo);
				}
				
    		}, 50);
    		
    	}else{
    		// History 탭 Click 시 데이터 조회
    		if($(this).attr('data-tab') == "tab-2"){
	    		var formInfo = currForm.getFormValue();
				var uploadInfo = formInfo.formUploadInfo;
	        	
	        	var code = $('#codeId').val();
				// 선택한 권한 정보가 있을때만
				if(!Util.isEmpty(code)){
	
					// History 목록 데이터 가져오기
					fn_getUploadHistoryList(formInfo);
				}
    		}
    	}
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
//		    	    	fn_getUploadHistoryList(uploadInfo);
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

})