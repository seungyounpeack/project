var loading = $.loading();

var layerList = [];
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	
	// 누적 현황 조회
	$("#btnSummaryData").click(function() {
		$(".dd_txt").text("누적 민원 수");
		$(".s_minwon02 .did_title").text("각 동 주민센터 누적 일반민원대기 현황");
		fn_complainStatus();
	})
	
	// 실시간 현황
	$("#btnLiveData").click(function() {
		$(".dd_txt").text("실시간 대기 수");
		$(".s_minwon02 .did_title").text("각 동 주민센터 실시간 일반민원대기 현황");
		
		fn_complainLiveStatus();
	})
	
	 //$( "#startDate" ).datepicker( "option", "minDate", '201901' );
     //$( "#startDate" ).datepicker( "option", "maxDate", '202003' );
     //console.log('$( "#startDate" ).datepicker() : ', $( "#startDate" ).datepicker())
     	
	
	function fn_param(){
		var param = {};
		param.startDate = $("#startDate").val();
		return param;
	}
	
	//민원실 현황 데이터 함수
	function fn_complainStatus(){
		
		var param = fn_param();
		if( param == null )
			console.log("실행")
		
		var url = "/dashBoard/complain/complainStatusData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//popEmdTime, popDayFlow, popGenderFlow, popRegService
			
			//민원 접수 현황 함수 호출
			if( resultData.complainReceipt.length > 0 ) fn_complainReceiptData(resultData.complainReceipt);
			
			//각동 주민센터 일빈민원접수 함수 호출
			if( resultData.complainStatus.length > 0 ) fn_complainStatusData(resultData.complainStatus, "total");
			
			//시정 뉴스 함수 호출
			fn_complainNewsData(resultData.complainNews);
			$("#dateTxt").text('');
		})
		$("#spnYear")[0].innerHTML = param.startDate.toString().substring( 0, 4 );
		$("#spnMonth")[0].innerHTML = param.startDate.toString().substring( 4, 6 );
	}
	
	function fn_complainLiveStatus() {
		var param = fn_param();
		if( param == null )
			console.log("실행")
		
		var url = "/dashBoard/complain/complainLiveStatusData.do";
		
		Util.request(url, {}, function(resultData){
			var dateTxt = "(" + resultData.complainLastDate['datetxt'] + ' 기준)';
			$("#dateTxt").text(dateTxt);
			console.log("!!! : resultData.complainLastDate['datetxt'] ", resultData.complainLastDate['datetxt'])
			
			//민원 접수 현황 함수 호출
			if( resultData.complainReceipt.length > 0 ) fn_complainReceiptData(resultData.complainReceipt);
			
			//각동 주민센터 일빈민원접수 함수 호출
			if( resultData.complainStatus.length > 0 ) fn_complainStatusData(resultData.complainStatus, "live");
			
			//시정 뉴스 함수 호출
			fn_complainNewsData(resultData.complainNews);
			$("#spnYear")[0].innerHTML = " 실시간 " + resultData.complainLastDate['datetxt'].toString().substring( 0, 4 );
			$("#spnMonth")[0].innerHTML = resultData.complainLastDate['datetxt'].toString().substring( 5, 7 ) ;
		});
	}
	fn_complainLiveStatus();
	//fn_complainStatus();
	
	
	//민원 접수 현황 함수  ATRB_01, ATRB_02, ATRB_03, ATRB_04
	function fn_complainReceiptData(data){
		$("#spnText1").html(data[0].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText2").html(data[0].atrb02.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText3").html(data[0].atrb03.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		$("#spnText4").html(data[0].atrb04.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
	};
	
	//각동 주민센터 일빈민원접수
	function fn_complainStatusData(data, type){
		$("#statusData").html('');
		
		var html = '';
		var title = "누적민원 수";
		if( type == "live" ) title = "실시간민원 수"
		data.forEach(function(item, index){
			
			html += '<div class="dong_unit">';
			html += '<ul class="unit_con">';
			html += '<li class="pic_dong"><img src="/dist/images/minwon/'+item.stacDongCd+'.png" alt="' + item.stacSe + '" /></li>';
			html += '<li class="dong_name">' + item.stacSe + '<br><span class="klein">'+title+'</span></li>';
			html += '<li class="sum_up">' + item.atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</li>';
			html += '</ul>';
			html += '</div>';
		})
		
		$("#statusData").html(html);
	};
	
	//시정 뉴스 데이터
	function fn_complainNewsData(data){
		$("#newsList").html('');
		var html = '<ul class="list_news">';
		
		
		data.forEach(function(item, index){
			html += '<li>';
			if( index == 0 ){
				html += '<li><a href="'+item.newsUrl+'" target="_blank">'+item.title+'<br /><span class="news_date">['+item.sort+'] '+item.date+'</span></a></li>';
				//html += '<a class="newList on" href="#">'+item.title+'<br />';
			}else{
				//html += '<a class="newList" href="#">'+item.title+'<br />';
				html += '<li><a href="'+item.newsUrl+'" target="_blank">'+item.title+'<br /><span class="news_date">['+item.sort+'] '+item.date+'</span></a></li>';
				
			}
			/*html += '<input type="hidden" value="' + item.no + '">';
			html += '<span class="n_origin">['+item.sort+'] '+ item.date+'</span>';
			html += '</a>';
			html += '</li>';
			html += '<div class="newList" style="cursor:pointer; width: 100%; height: 40px;">';
			html += '<span style="color:#ffffff;margin-bottom:5px;">';
			html += item.title;
			html += '</span>';
			html += '<p style="color:gray;">';
			html += '['+item.sort+'] '+ item.date;
			html += '</p>';
			html += '';
			html += '</div>';
			html += '<hr style="margin-bottom:5px;width:100%;height: 2px;" align="center" color="#444444" size="2">';*/
		})
		//html += '</ul>';
		$("#newsList").html(html);
		
		/*var tagOn = document.getElementsByClassName('newList');
		for( var i = 0 ; i < tagOn.length; i++ ){
			if( $(tagOn[i]).hasClass('on') ){
				var no1 = $(tagOn[i].children[1]).val();
				data.forEach(function(item, index){
					var contents = '';
					if( item.no == no1 ){
						contents += item.contents;
						$("#newsContents").html(contents);
					}
					
				})
			}
		}*/
		
		/*$(".newList").on("click", function(){
			
			var tag = document.getElementsByClassName('newList');
			for( var i = 0 ; i < tag.length; i++ ){
				$(tag[i]).removeClass('on');
			}
			$(this).addClass('on');
			var no = $(this.children[1]).val();
			data.forEach(function(item, index){
				var contents = '';
				if( item.no == no ){
					contents += item.contents;
					$("#newsContents").html(contents);
				}
				
			})
			$("#newsContents").show();
			
			
		})*/
		
	}
	
	

	
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		//민원실 현황 데이터 호출 함수
		fn_complainStatus();
    });
})
