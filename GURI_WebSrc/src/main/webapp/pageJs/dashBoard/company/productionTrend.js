var loading = $.loading();

var layerList = [];
var sourceList = [];
$(function(){
	document.body.style.zoom = "100%";
	//지역산업 생태계 > 혁신동향 데이터 조회
	function fn_productTrendData(){
		var url = "/dashBoard/company/productionTrendData.do";
		Util.request(url, {}, function(resultData){
			
			fn_productSalesData(resultData.productSales);
			
			fn_survivalRateChart(resultData.survivalRate);

			fn_monthClosedChart(resultData.monthClosed);
			
			fn_companyIndustryChart(resultData.companyIndustry);
		});
	}
	
	function fn_monthClosedChart(data) {
		var params = {
			type: 'bar',				// 타입
			elementId: 'monthClosedChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				paddingTop: 30,
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "300",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '건',
			xCategory: 'stacYmd',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}건</span>'
			}],
			// 차트 컬러
			colors: ["#2cca90"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_companyIndustryChart(data) {
		
		$("#dateTxt2").text("("+data[0].date+" 기준)");

		var params = {
			type: 'bar',				// 타입
			elementId: 'companyIndustryChart',		// 아이디
			animated: true,
			theme: 'dark',
			reverse: true,
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "300",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'stacSe',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryY}</span><br/> <span style="font-size:11px;">{valueX}{additional}건</span>'
			}],
			unit: '개',
			// 차트 컬러
			colors: ["#9a47c9"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}
	
	//부서별 계약현황 데이터 테이블
	function fn_productSalesData(data){
		$("#productSalesList").html('');
		
		var html = '';
		html += '<caption>연간 업종별 기업부채비율 설명 테이블</caption>';
		html += '<colgroup>';
		html += '<col width="35%" />';
		html += '<col width="15%" />';
		html += '<col width="25%" />';
		html += '<col width="25%" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		var rowTitle = {}, lastToiLclaNm;
		for( var i = 0 ; i < data.length ; i++ ){
			if( rowTitle[data[i].toiLclaNm] == undefined ) rowTitle[data[i].toiLclaNm] = 0;
			rowTitle[data[i].toiLclaNm]++;
		}
		
		for( var i = 0 ; i < data.length ; i++ ){
			if( data[i].fnsrStae ) color = "";
			html += '<tr>';
			if( lastToiLclaNm != data[i].toiLclaNm) { 
				html += '<td rowspan="'+rowTitle[data[i].toiLclaNm]+'" style="vertical-align: middle;">'+data[i].toiLclaNm+'</td>';
				lastToiLclaNm = data[i].toiLclaNm;
			}
			html += '<td>'+data[i].crtrYr+'</td>';
			html += '<td style="text-align:right">'+data[i].debtRt+'</td>';
			html += '<td style="text-align:left"><span class="legend" style="background: '+data[i].color+'"></span>'+data[i].fnsrStae+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#productSalesList").html(html);
	}
	
	function fn_survivalRateChart(data) {
		
		$("#dateTxt").text("("+data[0].date+" 기준)");

		var params = {
			type: 'gauge',					// 타입
			elementId: 'survivalRateChart',	// 아이디
			animated: true,
			theme: 'dark',
			style: {
				height: "450",				// 차트 높이
				fontSize: 12,
			},
			dataFields: {
				value: 'value',
				full: 'full',
				category: 'category',
			},
			data: data
		};
		CHART.createRadarChart(params);
	}
	
	fn_productTrendData();
})

