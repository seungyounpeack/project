var loading = $.loading();
$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	function fn_param(){
		var param = {};
		param.startDate = $("#startDate").val();
		return param;
	}
	
	fn_businessStatusData();
	//인구 통계 데이터 호출 함수
	function fn_businessStatusData(){
		
		var param = fn_param();
		console.log("param : ", param)
		
		var url = "/dashBoard/business/businessStatusData.do";
		
		Util.request(url, param, function(resultData){
			
			//희망도시  데이터 조회
			fn_busiStatusHope(resultData.busiStatusHope);
			
			//선진교통도시  데이터 조회
			fn_busiStatusTrans(resultData.busiStatusTrans);
			
			//교육선도도시  데이터 조회
			fn_busiStatusEducation(resultData.busiStatusEducation);
			
			//복지도시  데이터 조회
			fn_busiStatusWelfare(resultData.busiStatusWelfare);
			
			//행정도시  데이터 조회
			fn_busiStatusPublic(resultData.busiStatusPublic);
			
			
		})
		
	}
	
	
	
	
	
	//클릭한 데이터 조회
	function fn_busiStatusClick(param, tagId){
		var url = '/dashBoard/business/businessStatusClickData.do';
		Util.request(url, param, function(resultData){
			var html = '';
			$(".push_desc").css("display", "");
			$("#"+tagId).html('');
			//정책목표, 공약추진기간, 공약사업내용, 기대효과, 소요예산
			//SELECT pldg_goal as target, PLDG_PD as date, PLDG_CTN as contents, PLDG_BUDG as money, PLDG_EFCT as effect	
			html += '<li>';
			html += '<span class="sm_title">1. 정책목표</span>';
			if( resultData.statusLoad.target != null ){
				
				html += '<span class="sm_area">'+resultData.statusLoad.target+'</span>';
			}else{
				html += '<span class="sm_area"></span>';
				
			}
			html += '</li>';
			html += '<li>';
			html += '<span class="sm_title">2. 공약추진기간</span>';
			html += '<span class="sm_area">'+resultData.statusLoad.date+'</span>';
			html += '</li>';
			html += '<li>';
			html += '<span class="sm_title">3. 공약사업내용</span>';
			html += '<span class="sm_area">'+resultData.statusLoad.contents+'</span>';
			html += '</li>';
			html += '<li>';
			html += '<span class="sm_title">4. 기대효과</span>';
			html += '<span class="sm_area">'+resultData.statusLoad.effect+'</span>';
			html += '</li>';
			html += '<li>';
			html += '<span class="sm_title">5. 소요예산</span>';
			html += '<span class="sm_area">'+resultData.statusLoad.money+'</span>';
			html += '</li>';
			$("#"+tagId).html(html);
		})
	}
	
	
	//희망도시  데이터 조회
	function fn_busiStatusHope(data){
		var html = '';
		console.log("hoe : ", data)
		//태그 초기화
		$("#busiHope").html('');
		
		data.forEach(function(item, index){
			
			if( index == 0 ){
				html += '<div class="push_cont">';
				
			}else{
				html += '<div class="push_cont">';
				
			}
			html += '<input type="hidden" value="' +item.stacTp+ '">';
			if( item.percent == 100 ){
				
				html += '<p class="ico_complete">추진완료</p>';
			}
			html += '<div class="cont_box">';
			html += '<dl>';
			html += '<dt>' + item.stacSe + '</dt>';
			html += '<dd>' + (item.percent).toFixed(1) + '%</dd>';
			html += '</dl>';
			html += '<div class="bar_type" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue '+(item.percent)+'%, rgb(49, 49, 49) '+(item.percent)+'%, rgb(49, 49, 49) 100%);"></div>';
			html += '<p class="bar_txt">' + item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억 <span class="c_gray">/ ' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억</span></p>';
			html += '</div>';
			html += '</div>';
		})
		
		//태그 넣기
		$("#busiHope").html(html);
		$(".push_desc").css("display", "none");
		$(".push_cont").on('click', function(){
			var param = {};
			param.key = $(this.children[0]).val();
			var tag = document.getElementsByClassName('push_cont');
			for( var i = 0 ; i < tag.length; i++ ){
				$(tag).removeClass("on");
			}
			$(this).addClass("on");
			fn_busiStatusClick(param, "busiHopeList");
			//console.log("this : ", $(this.children[0]).val())
		})
	}
	
	//선진교통도시  데이터 조회
	function fn_busiStatusTrans(data){
		var html = '';
		
		$("#busiTrans").html('');
		
		data.forEach(function(item, index){
			
			if( index == 0 ){
				html += '<div class="push_cont">';
				
			}else{
				html += '<div class="push_cont">';
				
			}
			html += '<input type="hidden" value="' +item.stacTp+ '">';
			if( item.percent == 100 ){
				
				html += '<p class="ico_complete">추진완료</p>';
			}
			html += '<div class="cont_box">';
			html += '<dl>';
			html += '<dt>' + item.stacSe + '</dt>';
			html += '<dd>' + (item.percent).toFixed(1) + '%</dd>';
			html += '</dl>';
			html += '<div class="bar_type" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue '+(item.percent)+'%, rgb(49, 49, 49) '+(item.percent)+'%, rgb(49, 49, 49) 100%);"></div>';
			html += '<p class="bar_txt">' + item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억 <span class="c_gray">/ ' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억</span></p>';
			html += '</div>';
			html += '</div>';
		})
		
		$("#busiTrans").html(html);
		$(".push_desc").css("display", "none");
		/*$(".push_cont").on('click', function(){
			var param = {};
			param.key = $(this.children[0]).val();
			fn_busiStatusClick(param, "busiTransList")
			//console.log("this : ", $(this.children[0]).val())
		})		*/
	}
	
	//교육선도도시  데이터 조회
	function fn_busiStatusEducation(data){
		var html = '';
		
		$("#busiEducation").html('');
		
		data.forEach(function(item, index){
			
			if( index == 0 ){
				html += '<div class="push_cont">';
				
			}else{
				html += '<div class="push_cont">';
				
			}
			html += '<input type="hidden" value="' +item.stacTp+ '">';
			if( item.percent == 100 ){
				
				html += '<p class="ico_complete">추진완료</p>';
			}
			html += '<div class="cont_box">';
			html += '<dl>';
			html += '<dt>' + item.stacSe + '</dt>';
			html += '<dd>' + (item.percent).toFixed(1) + '%</dd>';
			html += '</dl>';
			html += '<div class="bar_type" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue '+(item.percent)+'%, rgb(49, 49, 49) '+(item.percent)+'%, rgb(49, 49, 49) 100%);"></div>';
			html += '<p class="bar_txt">' + item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억 <span class="c_gray">/ ' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억</span></p>';
			html += '</div>';
			html += '</div>';
		})
		
		$("#busiEducation").html(html);
		$(".push_desc").css("display", "none");
		/*$(".push_cont").on('click', function(){
			var param = {};
			param.key = $(this.children[0]).val();
			fn_busiStatusClick(param, "busiEducationList")
			//console.log("this : ", $(this.children[0]).val())
		})		*/
	}
	
	//복지도시  데이터 조회
	function fn_busiStatusWelfare(data){
		var html = '';
		
		$("#busiWelfare").html('');
		
		data.forEach(function(item, index){
			
			if( index == 0 ){
				html += '<div class="push_cont">';
				
			}else{
				html += '<div class="push_cont">';
				
			}
			html += '<input type="hidden" value="' +item.stacTp+ '">';
			if( item.percent == 100 ){
				
				html += '<p class="ico_complete">추진완료</p>';
			}
			html += '<div class="cont_box">';
			html += '<dl>';
			html += '<dt>' + item.stacSe + '</dt>';
			html += '<dd>' + (item.percent).toFixed(1) + '%</dd>';
			html += '</dl>';
			html += '<div class="bar_type" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue '+(item.percent)+'%, rgb(49, 49, 49) '+(item.percent)+'%, rgb(49, 49, 49) 100%);"></div>';
			html += '<p class="bar_txt">' + item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억 <span class="c_gray">/ ' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억</span></p>';
			html += '</div>';
			html += '</div>';
		})
		
		$("#busiWelfare").html(html);
		$(".push_desc").css("display", "none");
		/*$(".push_cont").on('click', function(){
			var param = {};
			param.key = $(this.children[0]).val();
			fn_busiStatusClick(param, "busiWelfareList")
			//console.log("this : ", $(this.children[0]).val())
		})		*/
	}
	
	//행정도시  데이터 조회
	function fn_busiStatusPublic(data){
		var html = '';
		
		$("#busiPublic").html('');
		
		data.forEach(function(item, index){
			
			if( index == 0 ){
				html += '<div class="push_cont">';
				
			}else{
				html += '<div class="push_cont">';
				
			}
			html += '<input type="hidden" value="' +item.stacTp+ '">';
			if( item.percent == 100 ){
				
				html += '<p class="ico_complete">추진완료</p>';
			}
			html += '<div class="cont_box">';
			html += '<dl>';
			html += '<dt>' + item.stacSe + '</dt>';
			html += '<dd>' + (item.percent).toFixed(1) + '%</dd>';
			html += '</dl>';
			html += '<div class="bar_type" style="background: linear-gradient(to right, dodgerblue 0%, dodgerblue '+(item.percent)+'%, rgb(49, 49, 49) '+(item.percent)+'%, rgb(49, 49, 49) 100%);"></div>';
			html += '<p class="bar_txt">' + item.atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억 <span class="c_gray">/ ' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억</span></p>';
			html += '</div>';
			html += '</div>';
		})
		
		$("#busiPublic").html(html);
		$(".push_desc").css("display", "none");
		
	}
	
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_businessStatusData();
    });
	
	 $('.tab_url').click(function () {
         var tab_id = $(this).attr('data-tab');
         var tagId = "";
         $('.tab_url').removeClass('on');
         $('.tab_business').removeClass('on');
         $(".push_desc").css("display", "none");
         $(this).addClass('on');
         $("#" + tab_id).addClass('on');
         
         if( $(this).attr('data-tab') == 'tab-1' ) tagId = 'busiHopeList';
    	 if( $(this).attr('data-tab') == 'tab-2' ) tagId = 'busiTransList';
		 if( $(this).attr('data-tab') == 'tab-3' ) tagId = 'busiEducationList';
		 if( $(this).attr('data-tab') == 'tab-4' ) tagId = 'busiWelfareList';
		 if( $(this).attr('data-tab') == 'tab-5' ) tagId = 'busiPublicList';
		 $(".push_cont").off('click');
         $(".push_cont").on('click', function(){
 			var param = {};
 			console.log("this  :  :  ", this)
 			param.key = $(this.children[0]).val();
 			console.log("this : ", $(this.children[0]).val())
 			var tag = document.getElementsByClassName('push_cont');
 			for( var i = 0 ; i < tag.length; i++ ){
 				$(tag).removeClass("on");
 			}
 			
 			$(this).addClass("on")
 			fn_busiStatusClick(param, tagId)
 		})		
     });
	 
	 function fn_click(){
		 
	 }
})
