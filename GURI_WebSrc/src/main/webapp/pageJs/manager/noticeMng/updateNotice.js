var loading = $.loading();

//파일 번호 부여

//원래 게시물 상에 가지고있던 파일 배열
var filesArr = new Array();

//파일 삭제할 데이터 배열  
var filesDelArr = new Array();

// 새로 추가할 파일 데이터 배열 
var filesNewArr = new Array();

//최대 첨부파일 개수 설정  (임의로 두개의 파일 까지 업로드 처리 )
var maxFileCnt = 2;

function fn_deleteFile(filePk, fileNo){
	//삭제 선택한 파일들 담기
	console.log( 'filePk =====' + filePk);
	console.log(' fileNo =====' + fileNo)
	// 삭제 선택한 파일들 리스트에 담기
	// 삭제할 파일 pk 담기
	filesDelArr.push(filePk);
	console.log(' filesDelArr ====' + filesDelArr[0]);
	console.log(' filesDelArr ====' + filesDelArr[1]);
	
	//기존 파일리스트 배열 확인
	//넘겨온 파일 리스트에서 삭제
	filesArr.splice(fileNo-1,1);
	console.log(' filesArr ====' + filesArr[0]);
	console.log(' filesArr ====' + filesArr[1]);
	$("#file"+fileNo).remove();
	fileNo--;

	console.log('filesArr.length 파일 삭제 후 길이==== ' + filesArr.length);
//	//div 에서 삭제
}


$(function () {
	
fn_loadWord();
	//데이터 로드
	function fn_loadWord(){
		var param = {};
		param.noticePk = Number($("#noticePk").val());
		param.bsctSe = $("#bsctSe").val();
		console.log("11111111111", $("#bsctSe").val());
		Util.request("/mamager/noticeMng/updateList.ajax", param, function(resultData){
			console.log("333333333333333333333333333333333333333333");
			if( resultData.resultValue == "Y" ){
				console.log("resultData.updateList : " , resultData.updateList)
				
				  $("#bbsSj").val(resultData.updateList['title']);
		          $("#bbsCn").val(resultData.updateList['contents']);
		          
		          var fileCount = resultData.updateList['fileCount'].toString()
		          
		          // 파일값이 존재한다면
		          if(fileCount > 0){
		        	  	for(var i=0; i< fileCount; i++){
		        	  		filePk = resultData.updateList['filePk_'+i].toString();
		        	  		fileNm = resultData.updateList['fileNm_'+i].toString();
		        	  		
		        	  		console.log('filePk =====' + filePk);
		        	  		console.log('fileNm =====' + fileNm);
		        	  		if(i>0){
		        	  			$("#fileDiv").append('<br />');
		        	  		}
		        	  		var fileNo = (Number(i)+1);
		        	  		// 파일 리스트 추가 
			      			  var htmlData = '';
			      			  htmlData += '<div id="file' + fileNo + '" class="filebox">';
			      			  htmlData += '<p class="name">' + fileNm + '</p>'; 
//			    			  htmlData += '<a class="delete" onclick="deleteFile(' + filePk + ');"> <div>삭제</div> </a>';
			    			  htmlData += '<a class="delete" href=javascript:fn_deleteFile("'+filePk+'","'+fileNo+'")>삭제</a>';
			    			  htmlData += '</div>';
			    			  $('.file-list').append(htmlData);
			    			  
			    			  filesArr.push(filePk);
			    			  
			    			  console.log(' 초기 filesArr 값 확인 =====' + filesArr.length)

		    			   }
		    	  } 
		          else {
 				   $("#fileDiv").html("파일없음");
		    	  }
				
			}
			});
	}
	
	 // 첨부 파일 등록 
	  $('#postFile').change(function(){
		  //현재 파일리스트 길이
		  // 파일 갯수 1개면 1, 파일 갯수 2개면 2
		  
		  // 처음가지고있었던 파일 길이
		  var length = filesArr.length;
		  //현재 파일 갯수 보다 무조건 +1 처리된 값으로 id 값 만들어줘야함 
	  	  var fileNo = (Number(length)+1);


		  //등록한 파일정보 가져오기		  
		  var inputFile = $("input[name='postFile']");
		  console.log(' inputFile ====' , inputFile )
		  var uploadFile = inputFile[0].files[0];

		  console.log('length ==='+ length );
		  console.log('fileNo ====' + fileNo);
		  console.log('maxFileCnt =====' + maxFileCnt);

		  
		  if(length > maxFileCnt-1){
			  alert("첨부파일 은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
			  $("#postFile").val("");
		  }else {
			  //첨부파일 등록될 경우 기존 파일 갯수 +1의 값으로 fileNo값 생성
			  var htmlData = '';
			  htmlData += '<div id="file' + fileNo + '" class="filebox">';
			  htmlData += '<p class="name">' + uploadFile.name + '</p>'; 
			  htmlData += '<a class="delete" href=javascript:fn_deleteFile("","'+fileNo+'")>삭제</a>';
			  htmlData += '</div>';
			  $('.file-list').append(htmlData);
			  filesNewArr.push(uploadFile);
			  filesArr.push(uploadFile)
			  // 파일선택란 비워주기
			  $("#postFile").val("");
			  
			  console.log('filesArr.length 파일 추가 후 길이==== ' + filesArr.length);

			  //새로 추가된 파일 확인하기
			  console.log('첨부파일등록 === filesNewArr ====' , filesNewArr[0]);
			  console.log('첨부파일등록 === filesNewArr ====' , filesNewArr[1]);
		  }

		  
		  
		  
		  //현재 가지고있는 파일 값
		  
		  // 새로 추가할 파일 값
		  // append 시켜주고
		  
		 
		  
//		  
//		  var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
//		  var attFileCnt = $('.filebox').length + 1;    // 기존 추가된 첨부파일 개수
//		  
//		  // 추가로 첨부가능한 개수
//		  if( attFileCnt > maxFileCnt) {
//			  alert("첨부파일 은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
//		  } else {
//			  //현재 등록된 파일 명 기재 됨
//			  console.log('$(this).val() ==== ' + $(this).val());
//			  
//			  var inputFile = $("input[name='postFile']");
//			  console.log(' inputFile ====' , inputFile )
//			  var uploadFile = inputFile[0].files[0];
//
//			  // 파일 리스트 추가 
//			  var htmlData = '';
//			  htmlData += '<div id="file' + fileNo + '" class="filebox">';
//			  htmlData += '<p class="name">' + uploadFile.name + '</p>'; 
//			  htmlData += '<a class="delete" onclick="deleteFile(' + fileNo + ');"> <div>삭제</div> </a>';
//			  htmlData += '</div>';
//			  $('.file-list').append(htmlData);
//			  filesArr.push(uploadFile);
//
//			  fileNo++;
//			  fileCnt++;
//			  
//			  console.log('attFileCnt ====' + attFileCnt);
//		  }
//		  // 파일선택란 비워주기
//		  $("#postFile").val("");
	 })
	
	
	//저장버튼 클릭 이벤트
	$("#noticeSave").on("click", function(){
		 var scriptTag = /[~^&()|<>?]/;
			//========== 제목
			  if($("#bbsSj").val() == ''){
					alert("제목을 입력해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if($("#bbsSj").val().length > 500){
					alert("제목을 100글자 이내로 작성해주세요.");
					$("#bbsSj").focus();
					return false;
				}
				else if(scriptTag.test($("#bbsSj").val()) == true){
					alert("스크립트 태그는 들어갈 수 없습니다."); 
					$("#bbsSj").focus();
					return false;
				}
			//========== 내용
				else if($("#bbsCn").val() == ''){
					alert("내용을 입력해주세요.");
					$("#bbsCn").focus();
					return false;
				}
				else if(scriptTag.test($("#bbsCn").val()) == true){
					alert("스크립트 태그는 들어갈 수 없습니다."); 
					$("#bbsCn").focus();
					return false;
				}
			  var formData = new FormData();
			  
			  //파일 삭제할 데이터 배열  
//			  var filesDelArr = new Array();
			  // 새로 추가할 파일 데이터 배열 
//			  var filesNewArr = new Array();

			  //삭제된 파일 or 새로 업로드될 파일 정보 및 pk 값 같이 넘겨줘야함 
//			  for ( var i =0; i< filesArr.length; i++){
//				  console.log(" fileArr["+i+"] ====" , filesArr[i]);
//				  formData.append("uploadFile_"+i, filesArr[i]);
//			  }	
			  // 삭제한 파일 데이터 filesDelArr
			  // 삭제할 첨부파일 아이디 값만 넘겨진다.
			  for ( var i = 0; i < filesDelArr.length; i++){
				  console.log(" filesDelArr["+i+"] ====" , filesDelArr[i]);
				  formData.append("DeleteFile_"+i, filesDelArr[i]);
			  }
			  
			  // 새로추가할 파일데이터 filesNewArr
			  // 새로추가한 파일 데이터 값이 넘겨진다.
			  for ( var i = 0; i < filesNewArr.length; i++){
				  console.log(" filesNewArr["+i+"] ====" , filesNewArr[i]);
				  formData.append("uploadFile_"+i, filesNewArr[i]);
			  }

			  //controller 에서 for문을 돌리기위해서 각각 배열에 길이도 같이 보내줘야함
			  formData.append("filesDelArrLen", filesDelArr.length);
			  formData.append("filesNewArrLen", filesNewArr.length);

			  
//			  var uploadFile = $("#postFile")[0].files[0];
//			  formData.append("uploadFile", uploadFile);
			  formData.append("title", $("#bbsSj").val());
			  formData.append("contents", $("#bbsCn").val());
			  formData.append("noticePk", $("#noticePk").val());
//			  formData.append("filePk", $("#filePk").val());
			  
			  // 데이터 확인 
				for (let key of formData.keys()) {
					console.log(key, ":::::", formData.get(key));
				}
				
			  	/*var param = {};
				param.title = $("#bbsSj").val();
				param.contents = $("#bbsCn").val();*/
//				console.log("formData  ::: " , $("#noticePk").val());
//				console.log("formData  ::: " , $("#filePk").val());
				$.ajax({
					method : "POST",
					type: 'POST',
					url: "/mamager/noticeMng/updateList.do",
					data: formData,
					contentType : false,
					dataType : "html",
					processData: false,
					success: function(result) {
						var resultData = JSON.parse(result);
					if( resultData.resultValue == "Y" ){
						alert(resultData.resultMsg);
						//godetail
						fn_goDetail()
				}else{
					alert(resultData.resultMsg);
					location.href="/mamager/noticeMng/noticeMng.do";
				}
			}
			});
		
	});
	
	//취소버튼 클릭 이벤트
	 $("#noticeList").on("click", function(){
		 fn_goDetail();
	});
	 
	 //상세 이동 함수
	 function fn_goDetail(){
			$("#noticePk").val(noticePk);
			$("#dsctSe").val(dsctSe);
			$("#detailForm").attr("action", "/mamager/noticeMng/detailNotice.do");
			$("#detailForm").attr("method", "post");
			$("#detailForm").submit();
		};
});

	//다운로드 파일
//	function fn_fileDown(filePk){
//		  location.href = "/manage/noticeMng/fileDown.do?filePk="+encodeURIComponent(filePk);
//	}

	//파일 삭제
	function fn_noticeDel(filePk){
		$("#filePk").val(filePk)
		if(confirm("삭제하시겠습니까?")){
			$("#fileDiv").html("<input id='postFile' class='wd50' name='postFile' type='file' accept='*'>");
		}
	}
