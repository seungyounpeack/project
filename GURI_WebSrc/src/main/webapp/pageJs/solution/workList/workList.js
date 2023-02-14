
var loading = $.loading();
$(function () {
	
	fn_loadList();
	/*페이징*/
	function fn_loadList(){
		var param = {};
		param.nowPageCnt = 20;
		param.nextNo = 0;
		param.sort = $("#searchSort").val(); //검색 기준 항목
		param.keyword = $("#workSearch").val(); //워크플로우 검색
		var chkCat = new Array();
		var list = $("input[name=catId]");
		 for(var i = 0; i < list.length; i++){
				if(list[i].checked){
					chkCat.push(list[i].value);
				}
			}
		 console.log("chkCat : " , chkCat)
		if(chkCat.length > 0)param.chkCat = chkCat
		
		var chkFee = $("input[type=checkbox][name=fee]:checked").val();
		param.chkFee = chkFee 
		Util.request("/solution/workList/workList.ajax", param, function(resultData){//workList.ajax에 param이란 이름으로 정보를 넘긴다.
			console.log(":chkCat.length : " , chkCat.length)
			if(chkCat.length == 0){
			fn_categoryMenu(resultData.category);
			}
			console.log("resultData.category : " , resultData.category)
			if( resultData.workList.length > 0 ){
				//리스트 불러오는 함수 호출
				fn_workTableList(resultData.workList);
				//페이지함수 호출
				if( resultData.workList.length > 0  ) fn_addPageNumber("#paging", resultData.page, 5, addLayerPageEvent);
				$("#workTotal").text(resultData.page.totalCnt)
			}
			else{
				alert("조회하신 컨텐츠 데이터가 없습니다.");
				$("#contentsList").html('');
				fn_addPageNumber("#paging", resultData.page, 5, addLayerPageEvent);
				$("#workTotal").text(resultData.page.totalCnt)
			}
		});
	}
	
	//스키마 검색 테이블 리스트 가져오기
	function fn_workTableList(result){
		
		var html = '';
		var data = result;
		data.forEach(function(item, index){
			var imgSrc = '/dist/images/manager/login_logo.png';
			if(item.filePath != undefined){
				imgSrc = item.filePath + item.fileOriName + '.' + item.fileExtnName;
			}
			//데이타 갯수 만큼 forEach문 돌려서 리스트 생성, html에 적는 것과 같은 방싱에 html +=만 앞에 써줌
			html += '<li style="position: relative; width: 17.5%; margin-right: 16px; margin-bottom: 16px; padding: 5px; background-color:#B9C2C2;min-width: 265px;">';
			html += '<div class="topBox" index-no="' + item.workPk + '">';
			html +=	'<img src="'+imgSrc+'" style="width: 100%; cursor: pointer; height: 100px;">';
			html +=	'<img src = /dist/images/ico_new.png>';
			html += '</div>';
			html += '<div class="bottomBox" style="padding: 12px;box-sizing: border-box;height: 132px; position: relative;">';
			html += '<div>';
			html += '<span style="font-weight:bold">'+item.title+'</span>';
			html += '<span style="background-color:#FFC000; color:white; float:right; padding: 2px 5px 2px 5px;">구매</span>';
			html += '</div>';
			html += '<div style="display:flex">';
			html += '<p style="font-size:12px">'+item.info+'</p>';
			html += '</div>';
			html += '<div style="display:flex; bottom: 0px; position: absolute;">';
			html += '<span style="font-size:12px;margin-right: 30px;">'+item.regDate+'</span>';
			html += '<img src = "/dist/images/ico_new.png" style="margin-right: 5px;">';
			html += '<span style="font-size:12px;margin-right: 10px;">'+item.down+'</span>';
			html += '<img src = "/dist/images/ico_new.png" style="margin-right: 5px;">';
			html += '<span style="font-size:12px;margin-right: 30px;">'+item.view+'</span>';
			html += '<span style="font-size:16px; margin-right: 10px; font-weight:bold;">'+item.fee+'</span>';
			html += '</div>';
			html += '</div>';
			html += '</li>';
		})
		
		$("#contentsList").html(html);
		fn_viewPage()
		
	};
	
	//카테고리 리스트 
	function fn_categoryMenu(data){
		var html = '';
		data.forEach(function(item, index){
			html += '<li><label><input type="checkbox" name = "catId" value="'+item.catId+'"> '+item.catNm+' </label> <span style="float:right"> ' + item.cnt+ '</span> </li>'
		})
		$("#categoryMenu").html(html);
	}
	
	
	//컨텐츠 클릭 시 view이동 
	function fn_viewPage(){
		$(".topBox").on("click", function(){
	        var workPk = $(this).attr("index-no");
		    $("#workPk").val(workPk);
		    $("#workDetailForm").attr("action", "/solution/workDetail/workDetail.do");
			$("#workDetailForm").attr("method", "post");
			$("#workDetailForm").submit();
		})

	};
	
	
	//페이징 함수 
	function fn_addPageNumber(tagId, page, pageLimit, callback) {
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
		if( parseInt(page.totalPage) > (parseInt(nowGroup)+1)*parseInt(pageLimit) ) endPageNo = (parseInt(nowGroup)+1)*parseInt(pageLimit);
		if( page.totalPage > pageLimit ) {
			console.log("nowGroup : " , nowGroup)
			if( nowGroup > 0 ) {
				html += '<a href="#" class="prev" value=' + nowGroup + '>처음페이지</a>';
			}
			for( var i = (nowGroup*pageLimit) + 1 ; i < endPageNo+1; i++ ){
				html += '<a href="#">' + i + '</a>';
			}
			if( nowGroup < pageGroup ){
				html += '<a href="#" class="next" value=' + nowGroup + '>다음페이지</a>';
			}
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
	
	
	//페이지 번호 클릭 콜백
	var addLayerPageEvent = function() {
	    	
		
		var nowPage = parseInt(this.innerText) ;
		if( $(this).hasClass('prev') ) {
			if( $(this).val() > 0 ) {  
				nowPage = (parseInt($(this).val())-1)*20+1;
			}else{
				nowPage = 1;
			}
		}else if( $(this).hasClass('next') ) {
			nowPage = parseInt($(this).val()+1)*20+1;
		}
		
		$(this.children).addClass('on');
		//데이터 검색 함수 호출
		fn_pageData(nowPage);
	}
	
	
	//페이지 데이터 호출 함수 
	function fn_pageData(nowPage){
		var param = {};
		console.log("nowPage : " , nowPage)
		if( nowPage == undefined ){
			param.nowPage = 1;
		}else{
			param.nowPage = nowPage;
		}
		param.nowPageCnt = 20;
		param.sort = $("#searchSort").val();
		param.keyword = $("#workSearch").val();
		Util.request("/solution/workList/workList.ajax", param, function(resultData){
			if( resultData.workList.length > 0 ){
				//공지사항 테이블 리스트 함수 호출
				fn_workTableList(resultData.workList);
				
				//페이지함수 호출
				fn_addPageNumber("#paging", resultData.page, 5, addLayerPageEvent);
			}
		});
	};
	
	//정렬 select box 이벤트
	$("#searchSort").on("change", function(){
		fn_loadList();
	});
	
	//검색버튼 클릭 이벤트
	$("#workSearchBtn").on("click", function(){
		fn_loadList();
	});
	//카테고리 메뉴 클릭 이벤트
	$("#categoryMenu").change(function(){
		fn_loadList();
	});
	//금액 메뉴 클릭 이벤트
	$("input[name=fee]").on("click", function(){
		if ($(this).prop('checked')) {
			$("input[name=fee]").prop("checked", false);
			$(this).prop("checked", true);
		}
		fn_loadList();
	});
});