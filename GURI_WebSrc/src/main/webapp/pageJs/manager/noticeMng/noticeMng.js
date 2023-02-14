var loading = $.loading();
$(function () {
	//게시판이 바뀔 때 필요한 bsctSe데이터 전송
	$("#board_option").val($("#bsctSe").val());
	//페이지 로딩 함수 호출
	fn_loadWord();
	function fn_loadWord(){
		var param = {};
		param.bsctSe = $("#board_option").val();
		param.gb = $("#searchSel").val();
		param.searchForm = $("#searchForm").val();
		param.nowPageCnt = 10;
		param.nextNo = 0;
		console.log("param :" , param);
		Util.request("/mamager/noticeMng/noticeList.ajax", param, function(resultData){
			
			console.log("000000000000000000000000", resultData.noticeList.length);
			if( resultData.noticeList.length >= 0 ){
				console.log("bsctSe ============================" + $("#bsctSe").val());
				console.log("board_option ============================" + $("#board_option").val());
				//공지사항 테이블 리스트 함수 호출
				fn_noticeTableList(resultData.noticeList);
				console.log("bsctSe ============================" + $("#bsctSe").val());
				
				//페이지함수 호출
				if(  resultData.noticeList.length > 0  ) fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
				
			}
			
		});
	};    
	// select box에서 변경하면 즉시 리스트의 데이터가 바뀜
	$("#board_option").on('change',function() {
		$("#bsctSe").val($(this).val())
		fn_loadWord();
	})
	
	//스키마 검색 테이블 리스트 가져오기
	function fn_noticeTableList(resultList){
		
		var date = new Date();
	    var year = date.getFullYear(); //년도
	    var month = date.getMonth()+1; //월
	    var day = date.getDate(); //일
	    
	    if ((month+"").length < 2) {
	    	month = "0" + month;
	    }
	    
	    if((day+"").length <2){
	    	day = "0" + day;
	    }
	    var getToday = year+"-"+month+"-"+day;

		var html1 = '';
		//게시판 title
		console.log("====================", $("#bsctSe").val());
		if ($("#bsctSe").val() == "OFA") {
			html1 += '<h2>공지사항 관리</h2>'
			console.log("===================="+"공지사항 관리");
		}else if ($("#bsctSe").val()=="DTR") {
			html1 += '<h2>자료실 관리</h2>'
			console.log("====================", $("#board_title").val());
			console.log("===================="+"자료실 관리");
		}else if ($("#bsctSe").val()=="GLLY") {
			html1 += '<h2>데이터 갤러리 관리</h2>'
			console.log("===================="+"데이터 갤러리 관리");
		}else if ($("#bsctSe").val()=="ANLS") {
			html1 += '<h2>빅데이터 분석사례 관리</h2>'
			console.log("===================="+"빅데이터 분석사례 관리");
		}else if ($("#bsctSe").val()=="PWWK") {
			html1 += '<h2>경진대회 수상작 관리</h2>'
			console.log("===================="+"경진대회 수상작 관리");
		}
		$("#board_title").html(html1);
		//게시판 list
		var html = '';
		$("#noticeTableList").html('');
		console.log("resultList.length : ", resultList.length)
				console.log($("#bsctSe").val());

		if ($("#bsctSe").val()=="OFA" || $("#bsctSe").val()=="DTR") {
			
		
		if( resultList.length > 0 ){
			html +='<table class="list_table" id="list_table">';
			html +='<thead>';
			html +='<tr>';
			html +='<th>'+'<input type="checkbox" id="chkAll">'+'</th>';
			html +='<th>번호</th>';
			html +='<th>제목</th>';
			html +='<th>내용</th>';
			html +='<th>작성자</th>';
			html +='<th>등록날짜</th>';
			html +='</tr>';
			html +='</thead>';
			html +='<tbody id="noticeTableList"></tbody>';
			html +='</table>';
			for( var i = 0; i < resultList.length; i++ ){
				console.log("77777777777777777777" );
				
				
				
				html += '<tr>';
				html += '<td>'
				html += '<input type="checkbox" name="chk" value="'+resultList[i]['noticePk']+'">'
				html += '<td>'+resultList[i]['rowNum'] + '</td>';
				html += '<td>'+resultList[i]['title'] + '</td>';
				html += '<td style="cursor:pointer;" onclick="fn_goDetail('
					html += resultList[i]['noticePk'] + ')">'
					//html += '<a href="javascript:fn_goDetail('
					//html += resultList[i]['noticePk'] + ')">'
				if(resultList[i]['atchFileNo'] != null){
					html += '<i class="fa-solid fa-file-arrow-down" style="color : #003949; margin-left:3px; margin-right: 5px;"></i>'
				}
				html += resultList[i]['contents']
				if(getToday==resultList[i]['regDate']){
					html += '<img src="/dist/images/ico_new.png" alt="새글" style="vertical-align: text-top;padding-left: 5px;"/>'
				}
				//html += '</a>'
				html += '</td>';
				html += '<td>'+resultList[i]['regId'] + '</td>';
				html += '<td>'+resultList[i]['regDate'] + '</td>';
				html += '</tr>';
			}
		}else{
			html += '<tr>';
			html += '<td colspan="6">등록된 데이터가 없습니다.';
			html += '</td>';
			html += '</tr>';
		}
		$("#noticeTableList").html(html);
		}
		
		
	};
	
	//페이지 데이터 호출 함수 
	function fn_pageData(nowPage){
		var param = {};
		if( nowPage == undefined ){
			
			param.nowPage = 1;
		}else{
			param.nowPage = nowPage;
			
		}
		param.name = $("#schmaName").val();
		param.nowPageCnt = 10;
		Util.request("/mamager/noticeMng/noticeList.ajax", param, function(resultData){
			if( resultData.noticeList.length > 0 ){
				//공지사항 테이블 리스트 함수 호출
				fn_noticeTableList(resultData.noticeList);
				
				//페이지함수 호출
				fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
			}
		});
	};    
	
	
	
	//페이지 번호 클릭 콜백
	var addLayerPageEvent = function() {
	    	
		
		var nowPage = parseInt(this.innerText) ;
		if( $(this).hasClass('prev') ) {
			
			if( $(this).val() > 0 ) {  
				nowPage = (parseInt($(this).val())-1)*10+1;
			}else{
				nowPage = 1;
			}
		}else if( $(this).hasClass('next') ) {
			nowPage = parseInt($(this).val()+1)*10+1;
		}
		
		/*var param = {};
		param.nowPage = nowPage;
		param.nowPageCnt = 3;*/
		$(this.children).addClass('on');
		//fn_commonTable(param);
		//데이터 검색 함수 호출
		fn_pageData(nowPage);
	}

	
	//페이징 함수 
	function fn_addPageNumber(tagId, page, pageLimit, callback) {
		$("#chkAll").prop("checked", false);
		//페이지 태그 초기화
		$( tagId ).html('');
		var html = '';
		
		var nowPage = 1;
		var preNo = 0;
		var nextNo = 1;
		if( page.pageNo != undefined ) nowPage = page.nowPage;
		//페이지 전체 그룹
		var pageGroup = Math.floor((parseInt(page.totalPage)-1)/parseInt(pageLimit));
		//현재 페이지 그룹
		var nowGroup = Math.floor((parseInt(page.nowPage)-1)/parseInt(pageLimit));
		
		//마지막 페이지 번호
		var endPageNo = parseInt(page.totalPage);
		console.log("pageLimit : ", pageLimit)
		if( parseInt(page.totalPage) > (parseInt(nowGroup)+1)*parseInt(pageLimit) ) endPageNo = (parseInt(nowGroup)+1)*parseInt(pageLimit);
		//페이지 개수가 5를 초과할 경우
		if( page.totalPage > pageLimit ) {
			
			if( nowGroup > 0 ) {
				html += '<a href="#" class="prev" value=' + nowGroup + '>처음페이지</a>';
			}
			
			for( var i = (nowGroup*pageLimit) + 1 ; i < endPageNo+1; i++ ){
				html += '<a href="#">' + i + '</a>';
			}
			if( nowGroup < pageGroup ){
				
				html += '<a href="#" class="next" value=' + nowGroup + '>다음페이지</a>';
			}
		//페이지 개수가 5미만	
		}else{
			
			for( var i = 1 ; i < parseInt(page.totalPage)+1; i++ ){
				html += '<a href="#">' + i + '</a>';
			}
		}
		
		$( tagId ).append(html);
		
		var listItems = document.querySelectorAll( tagId + " a" );
		var layersArray= Array.prototype.slice.call(listItems);
		layersArray.forEach(function(item, index){
			
			if( nowGroup > 0 && nowGroup == pageGroup ){
//				if( (index+pageLimit) == page.nowPage) {
				if( (index) == (page.nowPage-nowGroup*pageLimit) ) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
				}
			}else if( nowGroup > 0 ) {
				if( (index) == (page.nowPage-nowGroup*pageLimit)) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
				}
			}else if( nowGroup < pageGroup ) {
				if( (index+1) == page.nowPage) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item.children).addClass('on');
					}else{
						$(item.children).removeClass('on');
					}
				}
			}else {
				if( (index+1) == page.nowPage) {
					$(item).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						$(item).addClass('on');
					}else{
						$(item).removeClass('on');
					}
				}
			}
			
			item.addEventListener('click', callback);
		})
	};
	
	//검색시
	function fn_search(){
		//선택된걸 초기화 
		$("#chkAll").prop("checked", false);
		fn_loadWord();

	};   
	
	//삭제 함수
	function fn_delete(){
		var chkArr = new Array();
		var list = $("input[name=chk]");
		 for(var i = 0; i < list.length; i++){
				if(list[i].checked){
					chkArr.push(list[i].value);
				}
			}
		 Util.request("/mamager/noticeMng/deleteList.ajax", chkArr, function(resultData){
				if( resultData.resultValue == "Y" ){
					alert(resultData.resultMsg);
					fn_loadWord();
					//fn_noticeTableList(resultData.resultList);
					//fn_addPageNumber("#paging", resultData.page, 10, addLayerPageEvent);
				}else{
					alert(resultData.resultMsg);
				}
			});
	};
	
	/***************************************************************************************************
	    *Button Event 영역
	 ****************************************************************************************************/
	
	
	//검색
    $("#btnTableSearch").on("click", function(){
    	//스키마별 검색시 호출
    	fn_search();
    });    
    
  //전체 체크박스 이벤트
	  $("#chkAll").click(function() {
	  	var checked = $(this).is(":checked");
	  	$("input[name=chk]").each(function() {
	  		$("input[name=chk]").prop('checked', checked)
	  	})
	  });
	 //선택 삭제 이벤트
	  $("#noticeDel").on("click", function(){
		  if($("input[name=chk]:checked").length == 0){
			  alert("선택된 글이 없습니다.");
			  return false;
		  }
		  if(confirm("삭제하시겠습니까?")){
		  fn_delete();
		  }
	    });    
	  //등록 이벤트
	  $("#noticeIns").on("click", function(){
		  location.href="/mamager/noticeMng/insNotice.do";
	  });
});

//상세 페이지 이동
function fn_goDetail(noticePk, dsctSe){
	$("#noticePk").val(noticePk);
	$("#dsctSe").val(dsctSe);
	$("#detailForm").attr("action", "/mamager/noticeMng/detailNotice.do");
	$("#detailForm").attr("method", "post");
	$("#detailForm").submit();
};