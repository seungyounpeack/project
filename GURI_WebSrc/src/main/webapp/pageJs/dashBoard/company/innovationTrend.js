var loading = $.loading();

var layerList = [];
var sourceList = [];

$(function(){
	document.body.style.zoom = "100%";
	//지역산업 생태계 > 혁신동향 데이터 조회
	function fn_innovationTrendData(){

		var url = "/dashBoard/company/innovationTrendData.do";
		Util.request(url, {}, function(resultData){
			
			fn_innovationChart(resultData.companyInnovation);

			fn_investmentTable(resultData.companyInvestment);

			fn_innovationTable(resultData.companyInnovation);

			fn_rndChart(resultData.companyRnd);
		});
	}
	
	fn_innovationTrendData();
	
	function fn_innovationChart(data) {
		
		$("#dateTxt").text("("+data[0].date+" 기준)");

		var params = {
			elementId: 'innovationChart',
			animated: true,
			theme: 'dark',
			reverse: false,
			stacked: true,
			style: {
				paddingTop: 30,
				height: "450",
				fontSize: 12,
			},
			xCategory: 'admdNm',
			legend: {
				visible: true,
				position: 'bottom',
				template: '[bold {color}]{value}[/]'
			},
			// 범례
			series: [{
				name: '벤처',
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}, {
				name: '이노비즈',
				value: 'atrb02',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}, {
				name: '기업부설',
				value: 'atrb03',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}, {
				name: '연구개발전담부서',
				value: 'atrb04',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}명</span>'
			}],
			unit: '건',
			// 차트 컬러
			colors: ["#c3dc67", "#9cd35b", "#75c995", "#61a848"],
			// 데이터
			data:  data
		};
		CHART.createBarChart(params);
	}
	
	function fn_investmentTable(data) {
		$("#investmentTable").html('');
		
		var html = '';
		html += '<caption></caption>';
		html += '<colgroup>';
		html += '<col width="30%" />';
		html += '<col width="10%" />';
		html += '<col width="60%" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		var rowTitle = {}, lastStacSe, colorStepData = {}, colorStep = 0;
		for( var i = 0 ; i < data.length ; i++ ){
			if( rowTitle[data[i].stacSe] == undefined ) rowTitle[data[i].stacSe] = 0;
			if( colorStepData[data[i].stacYmd] == undefined ) {
				colorStepData[data[i].stacYmd] = true;
				colorStep++;
			}
			rowTitle[data[i].stacSe]++;
		}
		
		var colorAry = interpolateColors("rgb(245, 237, 92)", "rgb(95, 170, 69)", colorStep);
		
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<tr>';
			if( lastStacSe != data[i].stacSe) { 
				html += '<td rowspan="'+rowTitle[data[i].stacSe]+'" style="vertical-align: middle;">'+data[i].stacSe+'</td>';
				lastStacSe = data[i].stacSe;
			}
			html += '<td>'+data[i].stacYmd+'</td>';
			html += '<td style="text-align:left"><span class="bar" style="background-color:'+colorAry[i%colorStep]+';width:'+(parseInt(data[i].percent)*0.8)+'%"></span>'+data[i].atrb01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#investmentTable").html(html);
	}
	
	function fn_innovationTable(data) {
		$("#innovationTable").html('');
		
		var html = '';
		html += '<caption></caption>';
		html += '<colgroup>';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '<col width="20%" />';
		html += '</colgroup>';
		html += '<tbody>';
		
		for( var i = 0 ; i < data.length ; i++ ){
			html += '<tr>';
			html += '<td>'+data[i].admdNm+'</td>';
			html += '<td>'+data[i].atrb01+'</td>';
			html += '<td>'+data[i].atrb02+'</td>';
			html += '<td>'+data[i].atrb03+'</td>';
			html += '<td>'+data[i].atrb04+'</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		$("#innovationTable").html(html);
	}
	
	function fn_rndChart(data) {
		var params = {
			type: 'bar',				// 타입
			elementId: 'rndChart',		// 아이디
			animated: true,
			theme: 'dark',
			style: {
				paddingTop: 30,
				fontFamily: "chart.fontFamily",
				fontSize: 12,
				height: "350",
			},
			legend: {
				visible: false,
				position: 'top',
				template: '[bold {color}]{value}[/]'
			},
			unit: '천원',
			xCategory: 'stacYmd',
			// 범례
			series: [{
				value: 'atrb01',
				tooltip: '<span style="font-size:12px;font-weight:bold;">{categoryX}</span><br/> <span style="font-size:11px;">{valueY}{additional}</span>'
			}],
			// 차트 컬러
			colors: ["#d6d638"],
			// 데이터
			data: data
		};
		CHART.createBarChart(params);
	}

});

function interpolateColors(color1, color2, steps) {
	var stepFactor = 1 / (steps - 1),
	interpolatedColorArray = [];
	
	color1 = color1.match(/\d+/g).map(Number);
	color2 = color2.match(/\d+/g).map(Number);
	
	for(var i = 0; i < steps; i++) {
		interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
	}
	
    return interpolatedColorArray;
}

function interpolateColor(color1, color2, factor) {
	if (arguments.length < 3) { 
		factor = 0.5; 
	}
	var result = color1.slice();
	for (var i = 0; i < 3; i++) {
		result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
	}
	return "rgb(" + result.join(",") + ")";
};
