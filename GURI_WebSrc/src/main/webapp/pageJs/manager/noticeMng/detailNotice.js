var loading = $.loading();
$(function () {
//	$("#detail_title").val($("#bsctSe").val());
	fn_loadWord();
	//데이터 로딩
	function fn_loadWord(){
		var param = {};
		var html1 ='';
		//게시글 고유번호 = int형
		param.noticePk = Number($("#noticePk").val());
		param.bsctSe = $("#bsctSe").val();

		Util.request("/mamager/noticeMng/detailList.ajax", param, function(resultData){
			if( resultData.resultValue == "Y" ){
				//게시판 title
				if ($("#bsctSe").val() == "OFA") {
					html1 += '<p><h2>공지사항 관리</h2></p>'
				}else if ($("#bsctSe").val()=="DTR") {
					html1 += '<h2>자료실 관리</h2>'
				}else if ($("#bsctSe").val()=="GLLY") {
					html1 += '<h2>데이터 갤러리 관리</h2>'
				}else if ($("#bsctSe").val()=="ANLS") {
					html1 += '<h2>빅데이터 분석사례 관리</h2>'
				}else if ($("#bsctSe").val()=="PWWK") {
					html1 += '<h2>경진대회 수상작 관리</h2>'
				}
				$("#detailMng_title").html(html1);
				//공지사항 테이블 리스트 함수 호출
				console.log("resultData.detailList : " , resultData.detailList)
				console.log("resultData.detailList : " , resultData.detailList['fileCount'])
				 $("#title").text(resultData.detailList['title']);
		          $("#regId").text(resultData.detailList['regId']);
		          $("#contents").text(resultData.detailList['contents']);
		          $("#regDate").text(resultData.detailList['regDate']);
		          
		          var fileCount = resultData.detailList['fileCount'].toString()
		          
		          // 파일값이 존재한다면
		          if(fileCount > 0){
//		          if(resultData.detailList['filePk'] != null && resultData.detailList['filePk'] != ''){
//		        	  var filePk = resultData.detailList['filePk'];
		        	  	for(var i=0; i< fileCount; i++){
		        	  		console.log('filePk_'+i);
		        	  		console.log('fileNm_'+i);
		        	  		filePk = resultData.detailList['filePk_'+i].toString();
		        	  		fileNm = resultData.detailList['fileNm_'+i].toString();
		        	  		
//		    				  fileNameOrgn = fileInfo[i]['origAtchFileNm'];
//		    				  console.log("fileNameOrgn" + fileNameOrgn);
//		    				  fileNameChng = fileInfo[i]['chgAtchFileNm'];
//		    				  console.log("fileNameChng" + fileNameChng);
		        	  		if(i>0){
		        	  			$("#fileDiv").append('<br />');
		        	  		}
		        	  		$("#fileDiv").append('<a href=javascript:fn_fileDown("'+filePk+'");>'+fileNm+'</a>');
		        	  		
//		    				  $("#fileDiv").html( "<a href=javascript:fn_fileDown("'+filePk+'_'+i+'");>'+resultData.detailList['fileNm_'+i+]'</a>");
		    			   }
		    	  } 
		          else {
 				   $("#fileDiv").html("파일없음");
		    	  }
				console.log("hello")
			}else{
				alert(resultData.resultMsg);
				location.href="/mamager/noticeMng/noticeMng.do";
			}
		});
	};  
	
	
	
	  //취소버튼 이벤트
	  $("#noticeList").on("click", function(){
		  location.href="/mamager/noticeMng/noticeMng.do";
	  });
	  
	//수정버튼 이벤트
	  $("#noticeUpdate").on("click", function(){
			$("#noticePk").val(noticePk);
			$("#dsctSe").val();
		  $("#detailForm").attr("action", "/mamager/noticeMng/updateNotice.do");
			$("#detailForm").attr("method", "post");
			$("#detailForm").submit();
	  });
});


//다운로드 파일
function fn_fileDown(filePk){
	  location.href = "/mamager/noticeMng/fileDown.do?filePk="+encodeURIComponent(filePk);
}