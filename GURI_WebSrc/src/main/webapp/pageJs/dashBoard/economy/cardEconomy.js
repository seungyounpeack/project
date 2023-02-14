var loading = $.loading();

var categoryChart;
$(function(){
	document.body.style.zoom = "100%";
	$('.dateSelect').datetimepicker({ 
		format: 'YYYYMM',
		minDate : $("#start").val(),
		maxDate : $("#end").val()
	});
	$('.dateSelect').on('dp.change', function(e){
		fn_economyCardData()
	})
	
	//지역산업 생태계 > 혁신동향 데이터 조회
	function fn_economyCardData(){
		var url = "/dashBoard/economy/cardEconomyData.do";
		Util.request(url, {dateYm: $("#startDate").val()}, function(resultData){
			fn_cardEconomyAgeCategory(resultData.cardEconomyAgeCategory);
			fn_cardEconomyEmd(resultData.cardEconomyEmd);
			fn_cardEconomyWeek(resultData.cardEconomyWeek);
			fn_cardEconomyMonth(resultData.cardEconomyMonth);
			
		});
	}
	
	function fn_cardEconomyAgeCategory(data) {
		var params = {
			type: 'bar',
			elementId: 'ageCategoryChart',
			animated: true,
			theme: 'dark',
			reverse: true,
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "450",
			},
			data: data
		};
		CHART.createPieBarChart(params);
	}
	
	function fn_cardEconomyEmd(data) {
		var params = {
			type: 'bar',
			elementId: 'emdChart',
			animated: true,
			theme: 'dark',
			reverse: true,
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "450",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'admdNm',
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryY}</span><br/> <span style="font-size:11px;">{valueX}{additional}억원</span>'
			}],
			unit: '억',
			colors: ["#9a47c9"],
			data: data
		};
		CHART.createBarChart(params);
	}
	
	function fn_cardEconomyWeek(data) {
		var params = {
			type: 'line',				// 타입
			elementId: 'weekChart',		// 아이디
			animated: true,
			style: {
				height: "300",			// 차트 높이
				fontSize: 12,
			},
			legend: {
				visible: true,
				position: 'top',
				template: '[bold {color}]{name}[/]'
			},
			unit: '억',
			xAxisFormat: "yy",
			colors: ["#eb1e2c", "#fd6f30", "#f9a729", "#f9d23c", "#5fbb68", "#64cdcc", "#91dcea"],
			// 범례
			series: [{
				name: '일',
				category: 'stacSe',
				value: 'atrb01',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">일</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '월',
				category: 'stacSe',
				value: 'atrb02',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">월</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '화',
				category: 'stacSe',
				value: 'atrb03',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">화</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '수',
				category: 'stacSe',
				value: 'atrb04',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">수</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '목',
				category: 'stacSe',
				value: 'atrb05',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">목</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '금',
				category: 'stacSe',
				value: 'atrb06',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">금</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			},{
				name: '토',
				category: 'stacSe',
				value: 'atrb07',
				stroke: '#ffffff',
				tooltip: '<span style="font-size:12px; color:#000000;font-weight:bold;">토</span>: <span style="font-size:11px; color:#000000;">{valueY}{additional}억원</span>'
			}],
			data: data
		};
		CHART.createLineChart(params);
	}
	
	function fn_cardEconomyMonth(data) {
		var params = {
			type: 'bar',
			elementId: 'monthChart',
			animated: true,
			theme: 'dark',
			style: {
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "300",
				yAxis_dy: -25
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			xCategory: 'stacYmd',
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}억원</span>'
			}],
			unit: '억',
			colors: ["#b07aa1"],
			data: data
		};
		CHART.createBarChart(params);
	}
	
	fn_economyCardData();
})

