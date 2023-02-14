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
	
	//인구 통계 데이터 호출 함수
	function fn_complainPublicData(){
		
		
		var param = fn_param();
		
		var url = "/dashBoard/complain/complainPublicData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			//여론 현황
			if( resultData.keyword != undefined &&  resultData.compPublicStatus.length > 0 ) {
				fn_compPublicStatus(resultData.compPublicStatus, resultData.keyword);
			}else{
				fn_compPublicStatus(resultData.compPublicStatus);
			}
			
			//여론 키워드 관련글
			fn_compPublicKeywordList(resultData.compPublicKeyword);
			
			//일별 언급량 추이
			if( resultData.compPublicDay.length > 0 ) fn_compPublicDayChart(resultData.compPublicDay, param.startDate);
			
			// 워드 클라우드
			if( resultData.compPublicWordcloud.length > 0 ) fn_compPublicWordcloudChart(resultData.compPublicWordcloud);
			//연관어 분석
			if( resultData.compPublicRelate.length > 0 ) fn_compPublicRelateChart(resultData.compPublicRelate);
		})
		
	}
	
	fn_complainPublicData();
	
	//여론 현황
	function fn_compPublicStatus(data, keyword){
		$("#compPublicStatus").html('');
		var html = '';
		
		
		data.forEach(function(item, index){
			
			html += '<div class="keyword_area">';
			html += '<p class="box_num">' + (index+1) + '</p>';
			html += '<div class="keyword_box">';
			html += '<dl class="kw_100">';
			html += '<dt>'+item.keyword+'</dt>';
			html += '<dd>'+item.totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'<span class="add_unit">건</span></dd>';
			html += '</dl>';
			html += '<dl class="kw_50 dotline_r">';
			html += '<dt>긍정률</dt>';
			html += '<dd class="c_orange">' + item.positiveCnt + ' %</dd>';
			html += '</dl>';
			html += '<dl class="kw_50">';
			html += '<dt>부정률</dt>';
			html += '<dd class="c_aqua">' + item.negativeCnt + ' %</dd>';
			html += '</dl>';
			html += '</div>';
			html += '</div>';
			
		})
		
		
		$("#compPublicStatus").html(html);
		
		var listTag = document.getElementsByClassName("keyword_box");
		
		if( keyword != undefined ) $(listTag[0]).addClass("on");
		
			
		$(".keyword_box").on("click", function(){
			var no = 0;
			for( var i = 0 ; i < listTag.length; i++ ){
				if( listTag[i] == this ) no = i;
				$(listTag[i]).removeClass("on");
			}
			$(this).addClass("on");
			//console.log("$(listTag[i]).hasClass('on'): ",$(listTag[i]).hasClass('on'))
			
			var param = {};
			param.keyword = param.keyword = listTag[no].children[0].children[0].innerHTML;
			param.startDate = $("#startDate").val();
			
			//키워드 클릭 함수 호출
			fn_clickKeyword(param);
		})
		
	}
	
	//키워드 클릭시 함수
	function fn_clickKeyword(param){
		
		var url = "/dashBoard/complain/complainPublicData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			//여론 키워드 관련글
			fn_compPublicKeywordList(resultData.compPublicKeyword);
			
			//일별 언급량 추이
			if( resultData.compPublicDay.length > 0 ) fn_compPublicDayChart(resultData.compPublicDay, param.startDate);
			
			// 워드 클라우드
			if( resultData.compPublicWordcloud.length > 0 ) fn_compPublicWordcloudChart(resultData.compPublicWordcloud);
			//연관어 분석
			if( resultData.compPublicRelate.length > 0 )  fn_compPublicRelateChart(resultData.compPublicRelate);
		})
		
	}
	
	//여론 키워드 관련글 grid
	function fn_compPublicKeywordList(data){
		$("#compPublicKeyword").html('');
		   html += '<hr style="width:100%;height: 2px;" align="center" color="#444444" size="2">';
		   var html = ''
		   html += '<caption>키워드 관련 테이블</caption>';
		   html += '<colgroup>';
		   html += '<col width="10%" />';
		   html += '<col width=" " />';
		   html += '<col width="16%" />';
		   html += '<col width="20%" />';
		   html += '<col width="16%" />';
		   html += '</colgroup>';
		   html += '<tbody>';
		   html += '';
		data.forEach(function(item, index){
			
			var url = item.url;
			
			html += '<tr>';
			html += '<td>' + (index+1) + '</td>';
			html += '<td>' + item.title + '</td>';
			if( url == undefined ){
				console.log("this : ", this)
				url = "javascript:alert('"+'링크가 없습니다.'+"');";
				html += '<td><a href="'+url+'" class="bt_tbl c_aquab"><input type="hidden" value="' + item.no + '">원문보기</a></td>';
			}else{
				
				html += '<td><a target="_blank" href="'+url+'" class="bt_tbl c_aquab"><input type="hidden" value="' + item.no + '">원문보기</a></td>';
			}
			html += '<td>' + item.date + '</td>';
			html += '<td>' + item.sort + '</td>';
			html += '</tr>';
		})
		
		html += '</tbody>';
		
		$("#compPublicKeyword").html(html);
		
		$(".bt_tbl c_aquab").on('click', function(){
		    console.log('this : ', this)
			var no = $(this.children[1]).val();
		    data.forEach(function(item, index){
				var contents = '';
				if( item.no == no ){
					contents += item.contents;
					$("#newsContents").html(contents);
				}
				
			})
		});
		
	}
	
	
	//일별 언급량 추이
	function fn_compPublicDayChart(data, date){
		//chart data 객체
    	var compPublicDayData = {};
    	
    	//div 초기화
    	$("#compPublicDay").html('');
    	
    	console.log("data : ", data)
    	var month = parseInt(date.substring(0,4));
    	var day = parseInt(date.substring(4,6))
    	var lastDate = new Date(month, day, 0).getDate();
    	console.log("lastDate : ", lastDate);
    	var resultData = [];
    	
    	for( var i = 1 ; i < (lastDate+1); i++ ){
    		var cnt = 0;
    		var dataRow = {};
    		for( var j = 0 ; j < data.length; j++ ){
    			if( i == parseInt(data[j].date) ){
    				//새로운 결과 객체에 넣기
    				resultData.push(data[j]);
    				cnt = cnt + 1;
    				break;
    			}
    		}
    		
    		if (cnt == 0) {
    			var dataRow = {};
				if( i < 10 ) {
					dataRow.date = "0"+i.toString();
				}else{
					dataRow.date = i.toString();
				}
				dataRow.cnt = 0;
				resultData.push(dataRow)
    		}
    	}
    	console.log("!!!! resultData: ", resultData)
    	compPublicDayData.data = resultData;
    	compPublicDayData.dataFieldsCategory = "date";
    	compPublicDayData.dataFieldsValue = "cnt";
		var compPublicDayChart = CHART.dashBoard_comp_publicDay("compPublicDay", compPublicDayData);
	}
	
	// 워드 클라우드
	function fn_compPublicWordcloudChart(data){
		//chart data 객체
    	var compPublicWordcloudData = {};
    	$("#compPublicWordcloud").html('');
    	
    	compPublicWordcloudData.data = data;
    	compPublicWordcloudData.dataFieldsCategory = "keyword";
    	compPublicWordcloudData.dataFieldsValue = "cnt";
		var compPublicWordcloudChart = CHART.dashBoard_comp_publicWorldcloud("compPublicWordcloud", compPublicWordcloudData);
	}
	
	//연관어 분석
	function fn_compPublicRelateChart(data){
		//chart data 객체
    	var compPublicRelateData = {};
    	
    	$("#compPublicRelate").html('');
    	
    	console.log("data[0].keyword : ", data)
    	compPublicRelateData.data = [{
	    		cnt : "연관어 분석",
	    		color : "#ffffff",
	    		name : data[0].keyword,
	    		children : data
	    	}];
    	console.log("compPublicRelateData.data" + data)
    	//compPublicRelateData.data = data;
    	compPublicRelateData.dataFieldsCategory = "keyword";
    	compPublicRelateData.dataFieldsValue = "cnt";
    	compPublicRelateData.dataFieldsColor = "color";
    	compPublicRelateData.dataFieldsChildren = "children";
		var stackChart = CHART.dashBoard_comp_publicRelate("compPublicRelate", compPublicRelateData);
	}
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		console.log("ddd")
		fn_complainPublicData();
    });
})
