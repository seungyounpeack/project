"use strict";

/**
 * 공통으로 사용할 속성 및 Message 정의
 */
var DEF = {
	
		// 화면에서 공통으로 사용할 Control ID 값 정의
		controllId : {
			contentWrapper : ".contents",
			contentWrapper2 : "#full_pop",
			validateLayerId	: ".popover",					// Validate Layer ID
			//alertLayerId 	: "#dialog-alertMsg",			// Alert Message Layer ID
			//confirmLayerId 	: "#dialog-confirmMsg",		// Alert Message Layer ID
			loadingId 		: "#ajaxLoading",				// Loading Layer ID
			//selectTagClass  : ".select2"					// Select Tag Css
		},
		
		
		// Validate 에서 사용할 Message 정의
		messages : {
				required 	: " 필수 입력 항목입니다.", 
				number 		: " 숫자만 가능 합니다.",
				email 		: " 이메일 형식과 다릅니다.",
				phoneNum 	: " 전화번호 형식과 다릅니다.",
				decimal 	: " 소수점 형식과 다릅니다.",
				date		: " 날짜 형식과 다릅니다.",
				minLength 	: " 자리 이상이어야 합니다.",
				maxLength 	: " 자리 이하이어야 합니다.",
				format : function(text, sort){
					return text + sort;
				},
				saveConfirm : "",
				updateConfirm : "",
				deleteConfirm : "",
				saveComplete  : "",
				updateComplete : "",
				deleteComplete : ""
					
		},
		
		// AX5UI GRID Default 설정 값
		gridConfig : {
			frozenColumnIndex: 0,
		    frozenRowIndex: 0,
		    showLineNumber: false,
		    showRowSelector: false,
		    multipleSelect: true,
		    lineNumberColumnWidth: 30,
		    rowSelectorColumnWidth: 25,
		    sortable: false, 
		    multiSort: false
		},
};
