var loading = $.loading();

// 파일 번호 부여
var fileNo = 1;
var filesArr = new Array();
//최대 첨부파일 개수 설정  (임의로 두개의 파일 까지 업로드 처리 )
var maxFileCnt = 2;

//현재 가지고 있는 파일 개수
var fileCnt = 0;
//insert title
var html1 = '';

var param = {};
//현재 첨부파일 개수 
//var curFileCnt = this.files.length;
fn_loadWord();
function fn_loadWord(){
	param.bsctSe = $("#bsctSe").val();
	console.log("11111111111111", bsctSe);
	console.log("param :" , param);
	Util.request("/mamager/noticeMng/updateNotice.ajax", param, function(resultData){
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
		$("#insMng_title").html(html1);
		
	})
};


function deleteFile(fileNo){

	// 배열에서 선택한 파일 삭제
	filesArr.splice(fileNo-1,1);
			  
	console.log(' filesArr ====' + filesArr[0]);
	console.log(' filesArr ====' + filesArr[1]);
	
	//div 에서 삭제
	$("#file"+fileNo).remove();
	
	console.log('deleteFile fileCnt ====' + fileCnt);

}

$(function () {
	  //취소버튼 이벤트
	  $("#noticeList").on("click", function(){
		  location.href="/mamager/noticeMng/noticeMng.do";
	  });
	  
	  
	  // 첨부 파일 등록 

	  $('#postFile').change(function(){
		  
		  var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
		  var attFileCnt = $('.filebox').length + 1;    // 기존 추가된 첨부파일 개수
		  
		  // 추가로 첨부가능한 개수
		  if( attFileCnt > maxFileCnt) {
			  alert("첨부파일 은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
		  } else {
			  //현재 등록된 파일 명 기재 됨
			  console.log('$(this).val() ==== ' + $(this).val());
			  
			  var inputFile = $("input[name='postFile']");
			  console.log(' inputFile ====' , inputFile )
			  var uploadFile = inputFile[0].files[0];

			  // 파일 리스트 추가 
			  var htmlData = '';
			  htmlData += '<div id="file' + fileNo + '" class="filebox">';
			  htmlData += '<p class="name">' + uploadFile.name + '</p>'; 
			  htmlData += '<a class="delete" onclick="deleteFile(' + fileNo + ');"> <div>삭제</div> </a>';
			  htmlData += '</div>';
			  $('.file-list').append(htmlData);
			  filesArr.push(uploadFile);

			  fileNo++;
			  fileCnt++;
			  
			  console.log('attFileCnt ====' + attFileCnt);
		  }
		  // 파일선택란 비워주기
		  $("#postFile").val("");
	 })
	 
//	 $("#file"+fileNo).on("click", function(){
//		console.log('fileNo' + fileNo);
//		console.log(filesArr.splice(fileNo,1));
//		console.log(' filesArr ===' , filesArr);
//		console.log(' filesArr ===' , filesArr[0]);
//		console.log(' filesArr ===' , filesArr[1]);
//			  
//		 //div 에서 삭제
//		$("#file"+fileNo).remove();
//		fileNo--;
//	});  
	  //저장버튼 이벤트
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


		  formData.append("title", $("#bbsSj").val());
		  formData.append("contents", $("#bbsCn").val());
		  //추가한 파일 리스트 내역 
		  for ( var i =0; i< filesArr.length; i++){
			  console.log(" fileArr["+i+"] ====" , filesArr[i]);
			  formData.append("uploadFile_"+i, filesArr[i]);
		  }		  
		  	/*var param = {};
			param.title = $("#bbsSj").val();
			param.contents = $("#bbsCn").val();*/
		  // 데이터 확인 
			for (let key of formData.keys()) {
				console.log(key, ":::::", formData.get(key));
			}
			$.ajax({
				method : "POST",
				type: 'POST',
				url: "/mamager/noticeMng/saveNotice.ajax",
				enctype: "multipart/form-data",
				data: formData,
				contentType : false,
				dataType : "html",
				processData: false,
				success: function(result) {
				var resultData = JSON.parse(result);
				if( resultData.resultValue == "Y" ){
					alert(resultData.resultMsg);
					//godetail
					fn_goDetail(resultData.pkVal)
					console.log("555555555555555555555", $("#bsctSe").val());
			}else{
				alert(resultData.resultMsg);
				location.href="/mamager/noticeMng/noticeMng.do";
			}
		}
		});
	  });
	  
	  console.log("222")
	  //상세 이동
	  function fn_goDetail(noticePk){
			$("#noticePk").val(noticePk);
			$("#detailForm").attr("action", "/mamager/noticeMng/detailNotice.do");
			$("#detailForm").attr("method", "post");
			$("#detailForm").submit();
		};
		
});


