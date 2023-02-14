var loading = $.loading();
$(function(){
	document.body.style.zoom = "100%";
	var start = String(parseInt($("#start").val())-1);
	//console.log("!!! : ",$('.dateSelect').datetimepicker()[0].option)
	$('.dateSelect').datetimepicker({ 
		format: "YYYY",
		viewMode : 'years',
//		minDate : String(parseInt($("#start").val())-1),
		minDate : $("#start").val(),
		//disabledYears : [start],
		maxDate : $("#end").val()
	});
	
	fn_cityStatistics();
	//인구 통계 데이터 호출 함수
	function fn_cityStatistics(){
		
		var param = {};
		param.startDate = $("#startDate").val();
		var url = "/dashBoard/city/cityStatisticsData.do";
		
		Util.request(url, param, function(resultData){
			if( resultData.cityStatisticsData.length < 37 ) {
				$(".prev_baro").css("display", "none");
				$(".next_baro").css("display", "none");
			}else{
				$(".prev_baro").css("display", "");
				$(".next_baro").css("display", "");
			}
			//도시통계지표  데이터 조회
			if( resultData.cityStatisticsData.length > 0 ) fn_cityStatisticsData(resultData.cityStatisticsData);
			
		})
		
	}
	
	//도시통계지표
	function fn_cityStatisticsData(data){
		var html = '';
		var html2 = '';
		$("#cityStatistics").html('');
		
		data.forEach(function(item, index){
			var no = item.no+1;
			if( no < 10 ) no = "0" + (item.no+1).toString();
			
			if( item.valu > 0 ){
				if( index > 35 ){
					
					html2 += '<div class="barometer_sbox ca'+no+' on">';
					html2 += '<input class="keyNo" type="hidden" value="'+item.keyNo+'">';
					html2 += '<p class="category_index">'+item.lclaIx+'</p>';
					html2 += '<dl class="baro_desc">';
					html2 += '<dt>'+item.sclaIx+'</dt>';
					html2 += '<dd>'+item.valu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</dd>';
					html2 += '</dl>';
					html2 += '<p class="sup_sm">'+item.stdrYy+'년</p>'; 
					html2 += '</div>';
				}else{
						
						html += '<div class="barometer_sbox ca'+no+' on">';
						html += '<input class="keyNo" type="hidden" value="'+item.keyNo+'">';
						html += '<p class="category_index">'+item.lclaIx+'</p>';
						html += '<dl class="baro_desc">';
						html += '<dt>'+item.sclaIx+'</dt>';
						html += '<dd>'+item.valu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</dd>';
						html += '</dl>';
						html += '<p class="sup_sm">'+item.stdrYy+'년</p>';
						html += '</div>';
				}
			}
			
			
			
			/*html += '<div class="city_area" >';
			html += '<div class="city_box'+item.no+' on" onClick="">';
			html += '<dl class="city_100">';
			html += '<dt>'+item.lclaIx+'</dt>';
			html += '</dl>';
			html += '<dl class="city_sub_100">';
			html += '<dt>'+item.sclaIx+'</dt>';
			html += '<dd class="c_orange">'+item.valu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</dd>';
			html += '</dl>';
			html += '</div>';
			html += '</div>';*/
		})
		
		$("#cityStatistics").html(html);
		$("#cityStatistics2").html(html2);

		var param = {};
		$(".city_area").on("click", function(){
			param.keyNo = $(this.children[0]).val();
			
			var url = "/dashBoard/city/cityStatisticsClickData.do";
			Util.request(url, param, function(resultData){
				//도시통계지표 차트 데이터 조회
				fn_cityStatisticsChart(resultData.chartData);
				fn_changeName(resultData.chartData[0].category+" "+resultData.chartData[0].subCategory)
			})
		})
		//param
	}
	
	
	//도시통계지표 차트 데이터 조회
	function fn_cityStatisticsChart(data){
		$("#city_popup").html(html);
		$("#city_popup").fadeIn();
		//cityStatisticsChart
		
		var html = '';
		
		
		//연도별 세입징수 추이  chart data 객체
		var cityStatisticsData = {};
		
		
		cityStatisticsData.data = data;
		cityStatisticsData.dataFieldsCategory = "year";
		cityStatisticsData.dataFieldsValue = "value";
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var cityStatisticsChart = CHART.dashBoard_city_statisticsSub("cityStatisticsChart", cityStatisticsData);
		
		$("#close_button").click(function(){
			$("#city_popup").fadeOut();
		});
	};
	
	//span name 변경
	function fn_changeName(data){
		var tag = document.getElementsByClassName('searchName');
		
		if( tag.length > 0 ){
			for( var i = 0 ; i < tag.length; i++ ){
				tag[i].innerHTML = data;
			}
		}
		
	}
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("fffffffffffffffffffffffffffffffffffff : ", $('.dateSelect').datetimepicker())
		fn_cityStatistics()
		showDivs(3)
	});
})


var slideIndex = 1;
	showDivs(slideIndex);

	function plusDivs(n) {
	  showDivs(slideIndex += n);
	}

	function showDivs(n) {
	  var i;
	  var x = document.getElementsByClassName("mySlides");
	  if (n > x.length) {slideIndex = 1}    
	  if (n < 1) {slideIndex = x.length} ;
	  for (i = 0; i < x.length; i++) {
		 x[i].style.display = "none";  
	  }
	  x[slideIndex-1].style.display = "block";  
	}

	