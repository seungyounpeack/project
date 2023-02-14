var loading = $.loading();
$(function () {
	
	"use strict";
	
	 /***************************************************************************************************
    * 1. 변수 선언 영역
    ****************************************************************************************************/
	var goalName    = [];
	var writeForm = new FORM("writeData");
	var update = false;
	/***************************************************************************************************
    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
    ****************************************************************************************************/
	//페이지 로딩 함수 호출
	fn_loadWord();
	
	//페이지 로딩시 
	function fn_loadWord(){
		var param = {};
		Util.request("/mamager/inDataMng/mainBusinessMngInit.ajax", null, function(resultData){
			//$("#targetMonth").val(resultData.date.date);
			goalName = resultData.busiList;
			fn_busiList(resultData.busiList);
			if( resultData.busiDescList.length > 0 ){
				//추진사업 테이블 리스트 함수 호출
				fn_busiDescList(resultData.busiDescList);
				
				//추진사업 상세 데이터 함수 호출
				fn_busiDescData(resultData.busiDescData[0]);
			}
			
		});
	};    
	
	
	//연계리스트 가져오기
	function fn_busiList(resultList, update){
	    //연계주기리스트
		if( update == undefined ){
			
			Util.selectAddOption(resultList, "selectBusiName", false);
		}else{
			Util.selectAddOption(resultList, "busiName1", false);
			
		}
		
	};
	
	//추진사업 상세 데이터 함수 호출
	function fn_busiDescData(resultList, updateParam){
		console.log("resultList : ", resultList)
		if( updateParam == undefined ){
			var fileName = "";
			
			if(resultList.originName != undefined) fileName = resultList.originName;
			
			$("#busiName")[0].innerHTML = resultList.busiName;
			$("#goalName")[0].innerHTML = resultList.goalName;
			$("#term")[0].innerHTML = resultList.term;
			$("#contents")[0].innerHTML = resultList.contents;
			$("#subCost")[0].innerHTML = resultList.subCost;
			$("#totalCost")[0].innerHTML = resultList.totalCost;
			$("#effect")[0].innerHTML = resultList.effect;
			$("#goal")[0].innerHTML = resultList.goal;
			$("#dept")[0].innerHTML = resultList.dept;
			$("#rate")[0].innerHTML = resultList.rate;
			$("#downloadFile")[0].innerHTML = fileName;
			$("#fileNo").val(resultList.no);
		}else{
			console.log("11")
			$("#busiSeq").val(resultList.no) ;
			$("#busiName1").val(resultList.busiName) ;
			$("#goalName1").val(resultList.goalName) ;
			$("#term1").val(resultList.term) ;
			$("#contents1").val(resultList.contents)  ;
			$("#subCost1").val(resultList.subCost)  ;
			$("#totalCost1").val(resultList.totalCost)  ;
			$("#effect1").val(resultList.effect)  ;
			$("#goal1").val(resultList.goal)  ;
			$("#dept1").val(resultList.dept)  ;
			$("#rate1").val(resultList.rate)  ;
		}
	};
	
	//추진사업 테이블 리스트 함수
	function fn_busiDescList(resultList){
		
		var html = '';
		$("#busiDetailList").html('');
		
		for( var i = 0; i < resultList.length; i++ ){
			
			if( i==0 ) {
				html += '<tr class="on">'
			}else{
				
				html += '<tr>';
			}
			html += '<td>' + resultList[i].no + '</td>';
			html += '<td class="t_l">' + resultList[i].goalName + '</td>';
			html += '<td>' + resultList[i].totalCost + '</td>';
			html += '<td>'+ resultList[i].rate +'</td>';
			html += '</tr>';
		}
		
		$("#busiDetailList").html(html);
		
		var tag = document.getElementById("busiDetailList");
		
		console.log("tag : ", tag.children)
		//클릭 이벤트
		if( tag.children.length > 0 ){
			
			$(tag.children).on("click", function(){
				console.log("click : ")
				for( var j = 0 ; j < tag.children.length; j++){
					if($(tag.children[j]).hasClass('on')){
						$(tag.children[j]).removeClass('on');
					}
				}
				console.log("clicl : " , $(this))
				for( var i = 0 ; i < this.children.length; i++ ){
					if($(this.children[i]).hasClass('t_l')){
						$(this).addClass('on');
						console.log("this.children[i] : ", this.children[i])
						console.log("goalName : ", goalName)
						//goalName = this.children[i].innerHTML;
						
					}
					if( i == 0 ){
						fn_clickBusiData(this.children[i].innerHTML);
					}
				}
			})
		}
		
	};
	
	
	//상세 데이터
	function fn_clickBusiData(getName){
		var param = {};
		param.busiName = $("#selectBusiName").val();
		param.no = getName;
		console.log("!!!!!");
		Util.request("/mamager/inDataMng/mainBusinessMngClick.ajax", param, function(resultData){
			if( update ){
				//추진사업 상세 데이터 함수 호출
				fn_busiDescData(resultData.busiDescData[0], "1");
			}else{
				
				//추진사업 상세 데이터 함수 호출
				fn_busiDescData(resultData.busiDescData[0]);
			}
		});
	}
	 /***************************************************************************************************
    * 3.Chart 영역
    ****************************************************************************************************/
	    
    /***************************************************************************************************
    * 4.Grid 영역
    ****************************************************************************************************/
	
	/***************************************************************************************************
    * 6.Popup 영역
    ****************************************************************************************************/
    
    
    
    /***************************************************************************************************
    * 7.일반 Function 영역
    ****************************************************************************************************/
	
	
	//수정시 사업 정보 불러오기
	function fn_clickBusi(){
		var param = {};
		param.busiName = $("#selectBusiName").val();
		var tag = document.getElementById("busiDetailList");
		update = true;
		console.log("tag.length1 : ", tag.children.length)
		//클릭 이벤트
		if( tag.children.length > 0 ){
			console.log("tag.length2 : ", tag.children.length)
			
			for( var j = 0 ; j < tag.children.length; j++){
				if($(tag.children[j]).hasClass('on')){
					console.log("tag.children[j]1 : ", tag.children[j])
					console.log("tag.children[j]2 : ", tag.children[j].children)
					for( var i = 0 ; i < tag.children[j].children.length; i++ ){
						if( i == 1 ) {
							console.log(" tag.children[j].children[i].innerHTML : ",tag.children[j].children[i].innerHTML)
							param.goalName = tag.children[j].children[i].innerHTML;
						}
					}
				}
			}

		}
		
		Util.request("/mamager/inDataMng/mainBusinessMngClick.ajax", param, function(resultData){
			fn_busiList(resultData.busiList, "1");
			//추진사업 상세 데이터 함수 호출
			fn_busiDescData(resultData.busiDescData[0], "1");
		});
	};    
	
	
	//사업구분으로 조회시
	function fn_searchBusi(){
		var param = {};
		param.busiName = $("#selectBusiName").val();
		Util.request("/mamager/inDataMng/mainBusinessMngSearch.ajax", param, function(resultData){
			//$("#targetMonth").val(resultData.date.date);
			//goalName = resultData.busiList;
			if( resultData.busiDescList.length > 0 ){
				//추진사업 테이블 리스트 함수 호출
				fn_busiDescList(resultData.busiDescList);
				
				//추진사업 상세 데이터 함수 호출
				fn_busiDescData(resultData.busiDescData[0]);
			}
			
		});
	};    
	
	//변수 초기화 함수
	function fn_busiSaveParam(){
		
		var param = {};
		var dataName = '';
		var formData = new FormData();
		var uploadFile = $("#uploadFile")[0].files[0];
		
		console.log("uploadFile : ", uploadFile)
		if(uploadFile != undefined)	dataName = uploadFile.name;
		var department = writeForm.getValue("dept1");
		var busiName = writeForm.getValue("busiName1");
		var goalName = writeForm.getValue("goalName1");
		var term = writeForm.getValue("term1");
		var contents = writeForm.getValue("contents1");
		var subCost = writeForm.getValue("subCost1");
		var totalCost = writeForm.getValue("totalCost1");
		var effect = writeForm.getValue("effect1");
		var goal = writeForm.getValue("goal1");
		var rate = writeForm.getValue("rate1");
		var no = writeForm.getValue("busiSeq");
		console.log("department : ", department)
		
		/*param.dataName = dataName;
		param.dept = department;
		param.uploadFile = uploadFile;
		param.busiName = busiName;
		param.goalName = goalName;
		param.term = term;
		param.contents = contents;
		param.subCost = subCost;
		param.totalCost = totalCost;
		param.effect = effect;
		param.goal = goal;
		param.rate = rate;
		console.log("param : ", param)
		return param;*/
		formData.append("dept",department);
		formData.append("uploadFile",uploadFile);
		formData.append("goalName",goalName);
		formData.append("busiName",busiName);
		formData.append("dataName",dataName);
		formData.append("term",term);
		formData.append("contents",contents);
		formData.append("subCost",subCost);
		formData.append("totalCost",totalCost);
		formData.append("effect",effect);
		formData.append("goal",goal);
		formData.append("rate",rate);
		formData.append("busiSeq",no);
		return formData;
	}
	
	//저장함수
	function fn_busiSave(){
		//변수 초기화 함수 호출
		var param = fn_busiSaveParam();
		console.log("param : ", param)
		if( param.get('goalName') == '' ){
			alert("필수 항목(공약사업명) 데이터가 없습니다.")
			return;
		}else if( param.get('term') == '' ){
			alert("필수 항목(공약추진기간) 데이터가 없습니다.")
			return;
			
		}else if( param.get('contents') == '' ){
			alert("필수 항목(공약사업내용) 데이터가 없습니다.")
			return;
			
		}else if( param.get('subCost') == '' ){
			alert("필수 항목(소요예산) 데이터가 없습니다.")
			return;
			
		}else if( param.get('effect') == '' ){
			alert("필수 항목(총사업비) 데이터가 없습니다.")
			return;
			
		}else if( param.get('goal') == '' ){
			alert("필수 항목(정책목표) 데이터가 없습니다.")
			return;
			
		}else if( param.get('dept') == '' ){
			alert("필수 항목(부서) 데이터가 없습니다.")
			return;
			
		}else if( param.get('rate') == '' ){
			alert("필수 항목(추진실적) 데이터가 없습니다.")
			return;
			
		}
		
		
		if( update ){
			//데이터 수정 함수 호출
			fn_updateData(param);
		}else{
			//사업추진 데이터 저장할 시 upload file 호출
			fn_saveInsertData(param);
		}
		
		console.log("22222222 parma : ", param)
	}
	
	//데이터 수정 함수
	function fn_updateData(param){
		// Ajax 방식으로 파일 업로드
		Util.requestFileUplaod("/mamager/inDataMng/mainBusinessUpdate.ajax", param, function(result){
        	if(result.resultValue == "Y"){
        	
        		alert("데이터가 정상적으로 수정 되었습니다.");
        		update = false;
        		$("#selectBusiName").val(param.get('busiName'));
        		
        		// 입력 항목 초기화 하기
				fn_initbusiSaveParam();
				
				$("#readData").css("display", "");
				$("#writeData").css("display", "none");
				fn_searchBusi();
				
        	}else{
				alert("처리중 오류가 발생했습니다.");
			}
        	//fn_disableAnalButton(false);
        });
	}
	
	//사업추진 데이터 저장할 시 upload file
	function fn_saveInsertData(param){
		// Ajax 방식으로 파일 업로드
		Util.requestFileUplaod("/mamager/inDataMng/mainBusinessCreate.ajax", param, function(result){
        	if(result.resultValue == "Y"){
        		update = false;
        		alert("데이터가 정상적으로 생성 되었습니다.");
        		
        		// 입력 항목 초기화 하기
				fn_initbusiSaveParam();
				$("#readData").css("display", "");
				$("#writeData").css("display", "none");
				
        		// 데이터 유형 목록 데이터 가져오기
				fn_searchBusi();
        	}else{
				alert("처리중 오류가 발생했습니다.");
			}
        	//fn_disableAnalButton(false);
        });
	}
	
	//입력 항목 초기화 하기
	function fn_initbusiSaveParam() {
		writeForm.setValue("dept1", "");
		writeForm.setValue("busiName1", "");
		writeForm.setValue("goalName1", "");
		writeForm.setValue("term1", "");
		writeForm.setValue("contents1", "");
		writeForm.setValue("subCost1", "");
		writeForm.setValue("totalCost1", "");
		writeForm.setValue("effect1", "");
		writeForm.setValue("goal1", "");
		writeForm.setValue("rate1", "");
		writeForm.setValue("uploadFile", "");
	};
	
	//파일다운로드 함수
	function fn_fileDownload(no){
		var requestUrl = "/mamager/inDataMng/mainBusinessDwonload.ajax?no="+no;
		/*Util.request(requestUrl, null, function(){
			
		})*/
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
	
	//데이터 삭제
	function fn_busiDelete(){
		var param = {};
		
		var tag = document.getElementById("busiDetailList");
		//클릭 이벤트
		if( tag.children.length > 0 ){
			console.log("tag.length2 : ", tag.children.length)
			
			for( var j = 0 ; j < tag.children.length; j++){
				if($(tag.children[j]).hasClass('on')){
					console.log("tag.children[j]1 : ", tag.children[j])
					console.log("tag.children[j]2 : ", tag.children[j].children)
					for( var i = 0 ; i < tag.children[j].children.length; i++ ){
						if( i == 1 ) {
							param.goalName = tag.children[j].children[i].innerHTML;
						}else if( i == 0 ){
							param.no = tag.children[j].children[i].innerHTML;
						}
					}
				}
			}

		}
		
		Util.request("/mamager/inDataMng/mainBusinessMngDelete.ajax", param, function(resultData){
			if(resultData.resultValue == "Y"){
				alert("삭제 되었습니다.");
				
				//목록 초기화
				fn_searchBusi();
			}else{
				alert("오류가 발생하였습니다.");
			}
		})
		
		console.log("PARAM : ", param)
	}
	
	/***************************************************************************************************
    * 8.Button Event 영역
    ****************************************************************************************************/
	//검색
    $("#btnBusiSearch").on("click", function(){
    	fn_searchBusi();
    });    
    //등록
    $("#btnBusiReg").on("click", function(){
    	//스키마별 검색시 호출
    	$("#readData").css("display", "none");
    	$("#writeData").css("display", "");
    	Util.selectAddOption(goalName, "busiName1", false);
    	console.log("goalName : 	", goalName)
    	
    });  
    //저장
    $("#btnBusiSave").on("click", function(){
    	//저장 함수 호출
    	fn_busiSave();
    	
    });  
    
    //수정
    $("#btnBusiUpdate").on("click", function(){
    	$("#readData").css("display", "none");
    	$("#writeData").css("display", "");
    	//수정클릭시 업데이트 함수 호출
    	fn_clickBusi();
    	
    });    
    
    //취소버튼
    $("#btnBusiCancle").on("click", function(){
    	update = false;
    	$("#readData").css("display", "");
    	$("#writeData").css("display", "none");
    })
    
    //삭제버튼
    $("#btnBusiDelete").on("click", function(){
    	//데이터 삭제 함수 호출
    	fn_busiDelete();
    })
    
    //파일 다운로드 클릭
    $("#downloadFile").on("click", function(){
    	var no = $("#fileNo").val();
    	
    	//파일다운로드 함수 호출
    	fn_fileDownload(no);
    })
    
})

function onlyNumber(){

    if((event.keyCode<48)||(event.keyCode>57))

       event.returnValue=false;

}



