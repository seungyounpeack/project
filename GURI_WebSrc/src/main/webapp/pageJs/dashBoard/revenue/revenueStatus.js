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
	function fn_revenueStatusData(){
		
		
		var param = fn_param();
		if( param == null )
		
		console.log("param : ", param);
		
		var std = $("input:radio[name=rdoStd]:checked").val();//연간 : yy, 월간 : mm
		param.std = std;
		var url = "/dashBoard/revenue/revenueStatusData.do";
		
		Util.request(url, param, function(resultData){
			console.log("resultData : ", resultData)
			
			var dateString = "";
			if( param.startDate ) {
				dateString += param.startDate.substr(0,4) + "년 ";
				if(std == 'mm') {
					dateString += parseInt(param.startDate.substr(4,2)) + "월 ";
				}
				dateString += "세입징수 현황";
				$(".did_title").text(dateString);
			}
			
			//세입징수현황  데이터 조회
			fn_revnStatusChart(resultData.revnStatusChart);
			//세입징수현황  데이터 조회
			fn_revnStatus(resultData.revnStatus);
			
			//연도별 세입징수 추이  데이터 조회
			fn_revnStatusYear(resultData.revnStatusYear);
			
			
			//항목별 세입징수 현황  데이터 조회
			fn_revnStatusMain(resultData.revnStatusMain);
			
			//전년대비 세목별 세입징수 현황 데이터 조회
			fn_revnStatusSub(resultData.revnStatusSub);
			
			
		})
		
	}
	
	fn_revenueStatusData();

	
	//세입징수현황 차트 데이터 조회
	function fn_revnStatusChart(data){
		//chart data 객체
    	var revnStatusData = {};
    	
    	
    	revnStatusData.data = data;
    	revnStatusData.dataFieldsCategory = "mainName";
    	revnStatusData.dataFieldsValue = "sum";
    	revnStatusData.dataFieldsCategory2 = "name";
    	revnStatusData.dataFieldsValue2 = "value";
    	console.log("data : ", data)
		var chart = CHART.dashBoard_revn_statusPie("revnStatus", revnStatusData);	
	};

	
	//세입징수현황  데이터 조회
	function fn_revnStatus(data){
		console.log("data : ", data);
		$("#revenueList").html('');
		var html = '';
		
		html += '<caption>세입현황 리스트 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="10%" />';
		html += '<col width=" " />';
		html += '<col width="8%" />';
		html += '<col width="15%" />';
		html += '<col width="15%" />';
		html += '<col width="15%" />';
		html += '<col width="15%" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		var spanList = [];
		var j = 1;
		for( var i = 0 ; i < data.length; i++ ){
			var tableSpan = {};
			
			if( i < (data.length-1) ){
				if( data[i].mainName == data[i+1].mainName ){
					j += 1;
					if( i == (data.length-2) ){
						tableSpan.mainName = data[i].mainName;
						tableSpan.cnt = j;
						spanList.push(tableSpan)
						
					}
				}else{
					tableSpan.mainName = data[i].mainName;
					tableSpan.cnt = j;
					j = 1;
					spanList.push(tableSpan)
				}
				
			}else{
				if( data[i-1].mainName != data[i].mainName ){
					
					tableSpan.mainName = data[i].mainName;
					tableSpan.cnt = j;
					spanList.push(tableSpan)
				}
			}
			
		}
		
		console.log("spanList : ", spanList)
		
		var cnt = 0;
		data.forEach(function(item, index){
				
			html += '<tr>';
			for( var k = 0 ; k < spanList.length; k++ ){
				if( item.mainName == spanList[k].mainName ){
					cnt += 1;
					if( cnt != 1 ) {
						if( spanList[k].cnt == cnt ) {
							cnt = 0;
						}
						break;
					}else{
						html += '<th rowspan="'+spanList[k].cnt+'">'+spanList[k].mainName+'</th>';
						if( spanList[k].cnt == 1 ){
							cnt = 0;
						}
						
					}
				}
			}
			html += '<td>'+item.subName+'</td>';
			html += '<td style="text-align:right;">'+item.rcvmtAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align:right;">'+item.levyAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align:right;">'+item.rdcaAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align:right;">'+item.lossAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '<td style="text-align:right;">'+item.ovrpAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		})
		html += '</tbody>';
		$("#revenueList").html(html);
	}
	
	//연도별 세입징수 추이  데이터 조회
	function fn_revnStatusYear(data){
		var now = new Date();	// 현재 날짜 및 시간
		var year = now.getFullYear();	// 연도
		var firstDayOfMonth = new Date( now.getFullYear(), now.getMonth() , 1 );
		var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
		var month = lastMonth.getMonth() + 1;
		
		$("#dateTxt").text("(" + year + "년 " + month + "월 기준)");
		
		//연도별 세입징수 추이  chart data 객체
		var revnStatusYearData = {};
		var resultData = [];
		
		for( var i = 0 ; i < data.length; i++ ){
			resultData.push(data[i])
		}
		
		console.log("resultData : ", resultData)
		revnStatusYearData.data = resultData;
		revnStatusYearData.dataFieldsCategory = "stacYmd";
		revnStatusYearData.dataFieldsValue = "atrb01";
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var revnStatusYearChart = CHART.dashBoard_revn_statusYear("revnStatusYear", revnStatusYearData);
	};
	
	
	//항목별 세입징수 현황  데이터 조회
	function fn_revnStatusMain(data){
		//연도별 세입징수 추이  chart data 객체
		var revnStatusMainData = {};
		var resultData = [];
		
		revnStatusMainData.data = data;
		revnStatusMainData.dataFieldsCategory = "stacSe"; 
		revnStatusMainData.dataFieldsValue = "atrb01";    
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var revnStatusMainChart = CHART.dashBoard_revn_statusMain("revnStatusMain", revnStatusMainData);
	};
	
	//전년대비 세목별 세입징수 현황 데이터 조회
	function fn_revnStatusSub(data){
		//연도별 세입징수 추이  chart data 객체
		var revnStatusSubData = {};
		var resultData = [];
		
		revnStatusSubData.data = data;
		revnStatusSubData.dataFieldsCategory = "stacSe"; 
		revnStatusSubData.dataFieldsValue1 = "atrb01";    
		revnStatusSubData.dataFieldsValue2 = "atrb02";    
    	//finStatusExecutionData.dataFieldsValue3 = "atrb03";
		var revnStatusSubChart = CHART.dashBoard_revn_statusSub("revnStatusSub", revnStatusSubData);
	};
	
	//검색 조건 날짜 변경시
	$("#startDate").on("dp.change", function (e) {
		console.log("e.date : ", e.date);
		console.log("e : ", e)
        //$('#startDate').data("DateTimePicker").minDate('201901');
		//$('#startDate').data("DateTimePicker").maxDate('202003');
		fn_revenueStatusData();
    });
	
	 $('.tab_url').click(function () {
         var tab_id = $(this).attr('data-tab');

         $('.tab_url').removeClass('on');
         $('.tab_business').removeClass('on');

         $(this).addClass('on');
         $("#" + tab_id).addClass('on');

     });
	 
	 //연간/월간 라디오 버튼 선택
	 $("input:radio[name=rdoStd]").click(function(){
		    if($("input:radio[name=rdoStd]:checked").val()=='mm'){//월간
		    	$('.dateSelect').datetimepicker().data('DateTimePicker').format('YYYYMM');
		    }else{//연간
//		    	var start = $("#start").val();
//		    	var end = $("#end").val();
		    	$('.dateSelect').datetimepicker().data('DateTimePicker').format('YYYY');
		    }
		    fn_revenueStatusData();
		});

})
