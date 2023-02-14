var loading = $.loading();
$(function () {
	
	fn_loadDetail();
	fn_reviewList();
	//데이터 로딩
	function fn_loadDetail(){
		var param = {};
		param.workPk = $("#workPk").val();
		Util.request("/solution/workDetail/workDetailList.ajax", param, function(resultData){
			if (resultData.resultValue == "Y") {
				$("#kategories").text(resultData.workDetailList['kategories'])
				$("#title").text(resultData.workDetailList['title'])
				$("#info").text(resultData.workDetailList['info'])
				$("#contents").text(resultData.workDetailList['contents'])
				$("#fee").text(resultData.workDetailList['fee'])
				$("#recommend").text(resultData.workDetailList['recommend'])
				$("#view").text(resultData.workDetailList['view'])
				$("#down").text(resultData.workDetailList['down'])
				$("#imgs").text(resultData.workDetailList['imgs'])
				$("#review").text(resultData.workDetailList['review'])
				//$("#cUser").text(resultData.workDetailList['cUser'])
				$("#date").text(resultData.workDetailList['date'])
				//$("#mUser").text(resultData.workDetailList['mUser'])
				$("#update").text(resultData.workDetailList['update'])
			}
		});
	}
	
});
	
	//상세정보를 접었다 폈다 추가 필요
	$("#btnContents").on("click", function() {
		/*contents의 스타일이 'none'처리 되어 있으면 보이게끔 'block' 처리*/
		if (document.getElementById("contentsDetail").style.display == "none") {
			document.getElementById("contentsReview").style.display = "none";
			document.getElementById("contentsNotice").style.display = "none";
			document.getElementById("contentsDetail").style.display = "block";
		}
		
	})
	//리뷰를 접었다 폈다 추가 필요
	$("#reviewCnt").on("click", function() {
		/*review의 스타일이 'none'처리 되어 있으면 보이게끔 'block' 처리*/
		if (document.getElementById("contentsReview").style.display == "none") {
			document.getElementById("contentsDetail").style.display = "none";
			document.getElementById("contentsNotice").style.display = "none";
			document.getElementById("contentsReview").style.display = "block";
		}
	})

	//유의사항를 접었다 폈다 추가 필요
	$("#btnNotice").on("click", function() {
		/*review의 스타일이 'none'처리 되어 있으면 보이게끔 'block' 처리*/
		if (document.getElementById("contentsNotice").style.display == "none") {
			document.getElementById("contentsDetail").style.display = "none";
			document.getElementById("contentsReview").style.display = "none";
			document.getElementById("contentsNotice").style.display = "block";
		}
	})
	
	$("#recommendBtn").on("click", function() {
		var param = {};
		param.workPk = $("#workPk").val();
		Util.request("/solution/workDetail/updateCommend.ajax", param, function(resultData){
			 $("#recommend").text(resultData.workDetailList['recommend'])
			});
		
		});
	
	$("#downFile").on("click", function() {
		var fileId = 1 
		fn_downFile(fileId)
	});
	
	$("#downManual").on("click", function() {
		var fileId = 3
		fn_downFile(fileId)
	});
	
	function fn_downFile(fileId){
		var workPk = $("#workPk").val();
		var param = {};
		param.workPk = workPk;
		param.fileId = fileId;
		
		Util.request("/solution/workDetail/fileDownCheck.ajax", param, function(resultData){
			if (resultData.resultValue == "N") {
				alert(resultData.resultMsg);
			}else{
				location.href = "/solution/workDetail/fileDown.do?workPk="+encodeURIComponent(workPk)+"&fileId="+encodeURIComponent(fileId);
			}
		});
	}
	
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
				nowPage = (parseInt($(this).val())-1)*5+1;
			}else{
				nowPage = 1;
			}
		}else if( $(this).hasClass('next') ) {
			nowPage = parseInt($(this).val()+1)*5+1;
		}
		
		$(this.children).addClass('on');
		//데이터 검색 함수 호출
		fn_reviewList(nowPage);
	}
	
	$("#insertReview").on("click", function() {
		if($('#reviewArea').val() == null){
			alert("리뷰를 작성해주세요.");
			return false;
		}
			var param = {};
			param.workPk = $("#workPk").val();
			param.review = $("#reviewArea").val();
			Util.request("/solution/workDetail/workReviewInsert.ajax", param, function(resultData){
				if(resultData.insertResult > 0){
					alert("리뷰 등록이 완료되었습니다.");
					$('#reviewArea').val("")
					fn_reviewList();
				} else{
					alert("오류입니다. 관리자에게 문의해주세요.");
				}
			});
	})
	
	
	 
	
	
	function fn_reviewList(nowPage){
		var param = {};
		param.nowPageCnt = 4;
		param.workPk = $("#workPk").val();
		if( nowPage == undefined ){
			param.nowPage = 1;
			param.nextNo = 0;
		}else{
			param.nowPage = nowPage;
		}
		Util.request("/solution/workDetail/workReviewList.ajax", param, function(resultData){
			if( resultData.workReviewList.length > 0 ){
				console.log("resultData : " , resultData.loginId)
				$("#reviewCnt").val("리뷰 ("+resultData.workReviewList[0]['cnt']+")")
				fn_review(resultData.workReviewList, resultData.loginId)
				fn_addPageNumber("#paging", resultData.page, 5, addLayerPageEvent);
			}
		});
	}
	
	function fn_review(data, id){
	var html = '';
	data.forEach(function(item, index){
		//데이타 갯수 만큼 forEach문 돌려서 리스트 생성, html에 적는 것과 같은 방싱에 html +=만 앞에 써줌
		html += '<div id = "" style="width:100%;height:25%;border-top: 1px solid lightgray;">'
		html += '<div id = "reviewLeft" style="height:100%;width:20%;float:left">'
		html += '<span style ="display: block;text-align: center;">id</span>'
		if( id == item.reviewUser){
		html += '<div style="display:inline-block;text-align: center;width: 100%;">'
		html += '<button id ="delReBtn" onclick=delReview('+ item.reviewPk+')>삭제</button></div>'
		}
		html += '</div>'
		html += '<div id = "reviewRight" style="height:100%;width:80%;float:right">'
		html += '<span style="display:block">리뷰 별점 : ★★★★★</span>'
		html += '<span>'+item.reviewContents+'</span>'
		html += '<span style="font-size:8px; display:block">'+item.reviewDate+'</span>'
		html += '</div>'
		html += '</div>'
	})
	
	$("#reviewMid").html(html);
	
	}
	
	function delReview(reviewPk) {
			var param = {};
			param.workPk = $("#workPk").val();
			param.reviewPk = reviewPk;
			Util.request("/solution/workDetail/workReviewDelete.ajax", param, function(resultData){
				if(resultData.deleteResult > 0){
					alert("리뷰 삭제가 완료되었습니다.");
					fn_reviewList();
				} else{
					alert("오류입니다. 관리자에게 문의해주세요.");
				}
			});
			
		}
	
	
	

