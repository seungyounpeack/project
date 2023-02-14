var loading = $.loading();

var ansData='';
var ansDate='';
$(function () {
	
	fn_loadWord();
	//데이터 로딩
	function fn_loadWord(){
		var param = {};
		var html = '';
		//게시글 고유번호 = int형
		param.inquiryPk = Number($("#inquiryPk").val());
		Util.request("/mamager/inquiryMng/detailList.ajax", param, function(resultData){
			if( resultData.resultValue == "Y" ){
				//공지사항 테이블 리스트 함수 호출
				console.log("resultData.detailList : " , resultData.detailList['bbsNo'])
				 $("#title").text(resultData.detailList['title']);
		          $("#regId").text(resultData.detailList['regId']);
		          $("#contents").text(resultData.detailList['contents']);
		          $("#regDate").text(resultData.detailList['regDate']);
		          // 파일값이 존재한다면
		          if(resultData.detailList['ansCn']!= null && resultData.detailList['ansCn'] != ''){
			          html +="<textarea class='ansCn' id='ansCn' disabled>"+resultData.detailList['ansCn']+"</textarea>"
			          html +="<div class='ansBtn'>"
			          html +="<a href='#' id='updateAns' class='bt_bigAn b_blue' style='vertical-align: bottom; margin-right: 5px;'>"+"수정"+"</a>"
			          html +="<a href='#' id='deleteAns' class='bt_bigAn btn_red' style='vertical-align: bottom;'>"+"삭제"+"</a>"
			          html +="<span class='ansDate'>"+resultData.detailList['ansDate']+"</span>"
			          html +="</div>"
		        	  	$("#ansDiv").append(html);
		          }else{
		        	  html +="<textarea class='ansCn' id='ansCn'/> <div class='ansBtn'><a href='#' class='bt_bigAn b_blue' style='vertical-align: bottom; margin-right: 5px;' id='insertAns'>";
		        	  html +="등록"
		        	  html +="</a>"
		        	  html +="</div>"
		        		$("#ansDiv").append(html);
		          }
				
		          ansData=resultData.detailList['ansCn'];
		          ansDate=resultData.detailList['ansDate'];
		          
			}else{
				alert(resultData.resultMsg);
				location.href="/mamager/noticeMng/inquiryMng.do";
			}
		});
	};  
	
	  //목록버튼 이벤트
	  $("#inquiryList").on("click", function(){
		  location.href="/mamager/inquiryMng/inquiryMng.do";
	  });
	  
	
	  
});
	//수정버튼 이벤트
	$(document).on('click','#updateAns',function(){
		  var html = '';
		  $("#ansDiv").empty();
		  	html +=  "<textarea class='ansCn' id='ansCn'>"+ansData+"</textarea><div class='ansBtn'><a href='#' class='bt_bigAn b_blue' style='vertical-align: bottom; margin-right: 5px;' id='update'>";
		  	html += "등록"
		    html += "</a>"
	        html += "<a href='#' class='bt_bigAn btn_red' style='vertical-align: bottom;' id='cancelAns'>"
		    html += "취소"
		    html += "</a>"
			html += "</div>"
    	  $("#ansDiv").append(html);
	});
	
	//수정버튼 이벤트
	$(document).on('click','#update',function(){
		var param = {};
		//게시글 고유번호 = int형
		param.delYn = 'N';
		param.inquiryPk = Number($("#inquiryPk").val());
		 var scriptTag = /[~^&()|<>?]/;
			//========== 제목
			  if($("#ansCn").val() == ''){
					alert("답변을 입력해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if($("#ansCn").val().length > 500){
					alert("답변을 500글자 이내로 작성해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if(scriptTag.test($("#ansCn").val()) == true){
					alert("스크립트 태그는 들어갈 수 없습니다."); 
					$("#bbsSj").focus();
					return false;
				}
		param.inquiryCn =$("#ansCn").val();
		Util.request("/mamager/inquiryMng/answerUpdate.ajax", param, function(resultData){
			if( resultData.resultValue == "Y" ){
					location.reload();
					alert(resultData.resultMsg);
				}else{
					alert(resultData.resultMsg);
				}
			});
	});
	
	//수정버튼 이벤트
	$(document).on('click','#insertAns',function(){
		var param = {};
		//게시글 고유번호 = int형
		param.delYn = 'I';
		param.inquiryPk = Number($("#inquiryPk").val());
		 var scriptTag = /[~^&()|<>?]/;
			//========== 제목
			  if($("#ansCn").val() == ''){
					alert("답변을 입력해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if($("#ansCn").val().length > 500){
					alert("답변을 500글자 이내로 작성해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if(scriptTag.test($("#ansCn").val()) == true){
					alert("스크립트 태그는 들어갈 수 없습니다."); 
					$("#bbsSj").focus();
					return false;
				}
		param.inquiryCn =$("#ansCn").val();
		Util.request("/mamager/inquiryMng/answerUpdate.ajax", param, function(resultData){
			if( resultData.resultValue == "Y" ){
					location.reload();
					alert(resultData.resultMsg);
				}else{
					alert(resultData.resultMsg);
				}
			});
	});
	
	//삭제버튼 이벤트
	$(document).on('click','#deleteAns',function(){
		 if (!confirm("답변을 삭제하시겠습니까??")) {
			 return false;
		 }else{
		var param = {};
		//게시글 고유번호 = int형
		param.delYn = 'Y';
		param.inquiryPk = Number($("#inquiryPk").val());
		console.log("param.inquiryPk : " , param.inquiryPk.valueOf())
		Util.request("/mamager/inquiryMng/answerUpdate.ajax", param, function(resultData){
			if( resultData.resultValue == "Y" ){
					location.reload();
					alert(resultData.resultMsg);
				}else{
					alert(resultData.resultMsg);
				}
			});
		 }
	});
	
	//취소버튼 이벤트
	$(document).on('click','#cancelAns',function(){
		var html = '';
		console.log("ansData : " ,ansData);
		console.log("ansDate : " ,ansDate);
		$("#ansDiv").empty();
		  html +="<textarea class='ansCn' id='ansCn' disabled>"+ansData+"</textarea>"
		  html +="<div class='ansBtn'>"
		  html +="<a href='#' id='updateAns' class='bt_bigAn b_blue' style='vertical-align: bottom; margin-right: 5px;'>"+"수정"+"</a>"
       	  html +="<a href='#' id='deleteAns' class='bt_bigAn btn_red' style='vertical-align: bottom;'>"+"삭제"+"</a>"
       	  html +="<p class='ansDate'>"+ansDate+"</p>"
       	  html +="</div'>"
       	  	$("#ansDiv").append(html);
	});