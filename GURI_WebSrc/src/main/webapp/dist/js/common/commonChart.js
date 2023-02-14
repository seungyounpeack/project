"use strict";

/* 
 * var param = {};
		param.targetId = "popRegService";
		param.type = "X";
		param.category = "stacSe";
		param.column = ["atrb01"];
		param.columnKr = ["인구"];
		param.color = ["#70C61D"];
		param.position = "right";
		param.cornerRadius = true;
		param.inversed = false;
 * 
 * 
 * */


var CHART = {
		//바차트 변수
		/**
		 * param : 변수
		 * unit : 단위
		 * fontSize : 차트 폰트 크기
		 */
		barParam : function(param, unit){
			var barParam = {
	    			targetId : param.targetId,
	    			type : param.type,                       //value축설정
	    			animated : true,						 //차트가 생성될때 움직임
	    			stack : param.stack,                         //바차트 누적
	    			category : param.category,               //category
	    			column : param.column,          		 //list []
	    			columnKr : param.columnKr,        		 // value 한글명 list []
	    			color : param.color ,          		 //차트 색상 list[]
	    			/*pyramid : {             				 //피라미드 차트 설정
	    				value : 3000,            			 //피라이드 차트 시작 값
	    				endValue : 5000,						 //피라이드 차트 종료값
	    				//axisRangeDx : 20,     
	    				dy : 20,							 //피라이드 차트 y축 이동
	    				fontWeight : '600',					 //피라이드 차트 폰트 값
	    				strokeOpacity : 1,     				 //피라이므 차트 선 투명도 값
	    				text : unit,					 //단위
	    				//axisRangeStroke : 				 //
	    			},*///피라미드 쓰면 따로 params에 추가
					//콤보차트 line
	    			/*line : {								 //콤보차트
	    				column : ["atrb03"],                 //콤보차트 value컬럼 LIST[]
	        			columnKr : ["집행액"],                 //콤보차트 value컬럼 한글명 LIST[]
	        			valueStyle : {                       //value축 style
	        				opposite : true,			     //
	        				fontSize : 12,                   //value font
	        				disabled : false,                //
	        			},
	        			series : {                           //콤보 라인 스타일
	        				point : ["circle"],              //콤보 라인 중간 포인트도형
	        				strokeWidth : 2,                 //콤보 라인 선 두께
	        				snapTooltip : true,              //toolptip
	        				stroke : "#fffa84",              //라인색
	        				strokeWidth : 3,                 //라인굵기
	        				strokeDasharray : "lineDash",    //라인종류
	        				textAlign : "middle",            //텍스트 정렬
	        			}
	    			},*///라인 쓰면 따로 params에 추가
	    			padding : { 
		                   top : 30 
		             },
					//numberFormat : "#,##s",                  //value 데이터 포멧
	    			categoryStyle : {                        //category 스타일
	    				inversed : param.inversed,                     //value 반전여부
	    				minGridDistance : param.minGridDistance,                //barSeries의 간격
	    				disabled : true,				     //사용여부
	    				//locationX : 5,
	    				fontSize : param.fontSize,                 //폰트사이즈
	    				//cellStartLocation : 0.1,
	    				//cellEndLocation : 0.9,
	    			},
	    			//value축 단위
	    			valueTitle : {
	    				text : unit,   //단위
	    				fontSize : param.fontSize,   //폰트사이즈
	    				rotation : 0,    //회전
	    				align : param.type = "X" ? "right" : "top",  //텍스트 정렬
	    				valign :  param.type = "X" ? "right" : "top",   //정렬
	    			    dx :  param.type = "X" ? -10 : 40,           //x축이동 
	    			    dy :  param.type = "X" ? -10 : -30,          //y축이동
	    			},
	    			valueStyle : {
	    				fontSize : param.fontSize,
	    				min : 0,
	    				inversed : true,
	    				minGridDistance : 1,
	    				disabled : false,
	    				strokeOpacity : 0,
	    			},    			
	    			legend : {
	    				position : param.legend.position,        //범례 생성위치
	    				markerWidth : 20,
	    				markerHeight : 20,
						fontSize : param.legend.fontSize,
	    				maxHeight : 100,
	    				scrollable : true,
	    			},
	    			/*
	    			legendIcon : {
	    				iconWidth : 20,
	    				iconHeight : 20,
	    				iconHref : {
	    					"남성" : "/dist/images/population/ico_man.png",
	    					"여성" : "/dist/images/population/ico_woman.png"
	    				}
	    				
	    			},*/
	    			//시리얼 옵션
	    			series : {
	    				cornerRadiusBottomRight : param.cornerRadius = true ? 5 : 0,
	    				cornerRadiusTopRight : param.cornerRadius = true ? 5 : 0,
	    				strokeOpacity : 0,
	    				fontSize : param.fontSize,
	    				strokeWidth : 0, 
						cluster : param.cluster,               //클러스터
						width : 60,
						tooltip : {
							fontSize : param.tooltip.fontSize,
						}
	    			},
	    			label : {
	    				horizontalCenter : "right", //위치 정렬
	    				locationX :  param.type = "X" ? 0 : 0,
						locationY :  param.type = "X" ? 0.5 : 0,
						text : param.type = "X" ? "":unit,   //단위
	    				dx :  param.type = "X" ? 30 : 0,
	    				dy :  param.type = "Y" ? 0 : 10,
	    				fontSize : param.fontSize,
	    				//color : "#000000",
	    				truncate : false,                 //라벨 잘림현상 방지
	    				hideOversized : false,            //라벨 숨김 방지
	    			},
	    			//stack true일 경우 최종 토탈값 설정
	    			/*total : {
	    				sum : true,
	    				dy : -8
	    			},*/
	    	};
			return barParam;
		},

		pieParam : function(param, unit, fontSize) {
			var pieParam = {
				targetId : param.targetId,
    			type : param.type,                       //value축설정
    			animated : true,						 //차트가 생성될때 움직임
    			category : param.category,               //category
    			column : param.column,          		 //list []
    			value : param.column,          		 //list []
    			columnKr : param.columnKr,        		 // value 한글명 list []
    			color : param.color,              		 //차트 색상 list[]    			
    			size : param.size,						 //pieChart 크기
    			innerRadius : param.innerRadius,              //안쪽 파이원 비율
    			//numberFormat : "#.#'%'",                  //숫자 포맷 형식
    			
    			legend : {
    				position : param.position,
    				markerWidth : 15,
    				markerHeight : 15, 
    				fontSize : param.fontSize,				//범례 글자 크기
    				maxHeight : 100,						//범례 div max높이
    				scrollable : true,
    			},
    			/*
    			legendIcon : {
    				iconWidth : 20,
    				iconHeight : 20,
    				iconHref : {
    					"남성" : "/dist/images/population/ico_man.png",
    					"여성" : "/dist/images/population/ico_woman.png"
    				}
    				
    			},*/
    			//시리얼 옵션
    			series : {
    				strokeOpacity : 1,
    				fontSize : param.fontSize,
    				strokeWidth : 1, 
    				stroke : "#fff",
    				//fill : "white",
    				wrap : true,
    			},
    			label : {
    				//horizontalCenter : "right", //위치 정렬
    				//locationX : 0.5,
    				//dx : -5,
    				//dy : 10,
    				fontSize : param.fontSize,              //font크기
    				//color : "white",				
    				//stroke : "white",
    				disabled : param.lable.disabled
    			},
    			//children => 파이차트 2개
    			//pie차트 2개 쓸경우 추가해야함
    			/*children : {	
    				disabled : true,
    				alignLabels : false,
    				fontSize : fontSize,
    				line : {
    					strokeDasharray : "2,2",
    					strokeOpacity : 0.5,
    					stroke : "#ffffff",
    					isMeasured : false,
    				}
    			},*/
			}
			return pieParam;
    	},
    	
    	lineParam : function(param, unit){
    		var lineParam = {
				targetId : param.targetId, //divId
				type : param.type,                       //category 축설정 year, month, day
	             //data : resultData ,
				category : param.category,               //category
    			column : param.column,          		 //list []
    			value : param.column,          		 //list []
    			columnKr : param.columnKr,        		 // value 한글명 list []
	            bullet : param.bullet,                               //["circle" , "rectangle", "triangle"],
	            color : param.color,              		 //차트 색상 list[]    			
	            legend : {
	               position : param.position, // 범례 위치
	               fontSize : param.fontSize, //범례 글자 크기
	               maxHeight : 100 //범례 div max높이
	            },
	            marker : {
	               width : 20, // 범례 마커 넓이
	               height : 20 // 범례 마커 높이
	            },
	            padding : { 
	                   top : 30 
	             },
	            dateAxis : {
	               minGridDistance :param.minGridDistance, //최소 거리 픽셀
	               fontSize : param.fontSize, //날짜 축 글자 크기
	               dateFormats : param.dateFormats, // 날짜 format
	               setKey :  param.setKey// format key "yyyy"
	            },
	            valueAxis : {
	               renderer : { 
	                     fontSize : param.fontSize
	                  },
	               title : {
	                  text : unit, //Y축 타이틀
	                  fontSize : param.fontSize,
	                  rotation : 0, // 회전값
	                  align : param.type = "X" ? "center" : "top",  //텍스트 정렬
    				  valign : param.type = "X" ? "top" : "center",   //정렬
    			      dx : param.type = "X" ? 40 : -10,           //x축이동 
    			      dy : param.type = "X" ? -30 : -10,          //y축이동
	               }
	            },
	            series : {
	               strokeWidth : 2,
	               tooltipText : "{name}: {valueY}[/]", //tooltip
	               tooltip : {
	                  backgroundStrokeOpacity : 0, //tooltip 투명도
	                  pointerOrientation : "vertical", //포인터 방향
	                  labelMinHeight : 10, //tooltip 높이
	                  labelMinWidth : 30, //tooltip 넓이
	                  labelTextAlign : "middle",//tooltip 위치
	                  labelTextValign : "middle",
	                  fontSize : param.tooltip.fontSize
	               }
	            }
	       }
    		return lineParam;
    	},
    	/**
    	 * wordCloud chart
    	 */
    	wcParam : function(param){
    		var wcParam = {
				targetId : param.targetId,
				animated : true,
				category : param.category,               //category
    			column : param.column,          		 //list []
				series : {
				   accuracy : 5, // word간 간격 
				   step : param.step, // 레이블 단계
				   rotationThreshold : 0, //회전값
				   randomness : 0.9, // 단어 배치
				   fontWeight : 1000,
				   minFontSize : param.minFontSize,
				   maxFontSize : param.maxFontSize,
				   minWordLength : 2, //최소 단어 수
				   
				 }
			}
    		return wcParam;
    	},
    	/**
    	 * 연관어 차트
    	 */
    	relationParam : function(param, unit, fontSize){
    		var relationParam = {
				targetId : param.targetId,
				animated : true,
				category : param.category,               //category
    			column : param.column,          		 //list []
    			value : param.column,          		 //list []
    			columnKr : param.columnKr,        		 // value 한글명 list []
	            bullet : param.bullet,                               //["circle" , "rectangle", "triangle"],
	            colorList : param.color,              		 //차트 색상 list[]  
	            color : "color",
				children : "children",
				radius : {
					max : param.radius,   //radius max 값
				step : param.step,   //연관어 구분 개수
				differ : 1, //구간 마다 radius 작아지는 값
				},
				style : {
					fontSize : param.fontSize,
					centerStrength : 1,
					fillOpacity : 1,
					manyBodyStrength : -20,
					strength : 0.8,
					fontWeight : "800",
				}
        	};
    		return relationParam;
    	},
		/**
		 * 공통 바차트
		 */
		dashBoard_barChart : function(configData, param, returnCallback){
			//다크테마
			//am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(param.targetId, am4charts.XYChart);
			chart.paddingTop = 30;
			//add data
			if( "data" in configData ) chart.data = configData.data;
			if( configData.length > 0 ) chart.data = configData;
			
			// Create axes
			var categoryAxis;         //category축
			var valueAxis;            //value축
			var categoryColumn = "";
			if( param.type && param.type === "X" ) {
				categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
				valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			}else{
				
				categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
				valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			}
			
			//기준축 카테고리 컬럼
			var categoryColumn = "";
			if( "category" in param ) categoryColumn = param.category;
			categoryAxis.dataFields.category = categoryColumn;
			
			categoryAxis.renderer.grid.template.location = 0;
			
			//차트 value단위
			if( "numberFormat" in param ) chart.numberFormatter.numberFormat = param.numberFormat;
			
			
			if( "categoryStyle" in param ){
				var categoryStyle = param.categoryStyle;
				categoryAxis.renderer.ticks.template.length = 10;
				if( "cellStartLocation" in categoryStyle ) categoryAxis.renderer.cellStartLocation = categoryStyle.cellStartLocation;
				if( "cellEndLocation" in categoryStyle ) categoryAxis.renderer.cellEndLocation = categoryStyle.cellEndLocation;
				if( "inversed" in categoryStyle ) categoryAxis.renderer.inversed = categoryStyle.inversed;
				if( "minGridDistance" in categoryStyle ) categoryAxis.renderer.minGridDistance = categoryStyle.minGridDistance;
				if( "disabled" in categoryStyle ) categoryAxis.renderer.grid.template.disabled = categoryStyle.disabled;
				if( "locationX" in categoryStyle ) categoryAxis.renderer.grid.template.locationX = categoryStyle.locationX; // 0
				if( "location" in categoryStyle ) categoryAxis.renderer.grid.template.location = categoryStyle.location; // 0
				if( "fontSize" in categoryStyle ) {
					categoryAxis.renderer.labels.template.fontSize = categoryStyle.fontSize; // 0
					categoryAxis.renderer.fontSize = categoryStyle.fontSize;
				}
			}
			
			//차트 색상
			var colorCnt = 0;
			if( "color" in param ) colorCnt = param.color.length;
			console.log("param.color.length : " , param.color.length)
			if( colorCnt > 0 ) {
				var colorList = [];
				for( var item of param.color ){
					colorList.push(am4core.color(item));
				}
				chart.colors.list = colorList;
				console.log("colorList : " , colorList)
			}
			if( "valueStyle" in param ) {
				var valueStyle = param.valueStyle;
				if( "min" in valueStyle ) valueAxis.min = valueStyle.min;
				if( "max" in valueStyle ) valueAxis.max = valueStyle.max;
				if( "extraMin" in valueStyle ) valueAxis.extraMin = valueStyle.extraMin;
				if( "extraMax" in valueStyle ) valueAxis.extraMax = valueStyle.extraMax;
				if( "fontSize" in valueStyle ) valueAxis.renderer.fontSize = valueStyle.fontSize; //11
				if( "disabled" in valueStyle ) valueAxis.renderer.ticks.template.disabled = valueStyle.disabled;
				if( "strokeOpacity" in valueStyle ) valueAxis.renderer.ticks.template.strokeOpacity = valueStyle.strokeOpacity; //11
				if( "pyramid" in param ){
					
					valueAxis.renderer.ticks.template.length = 10;
					valueAxis.renderer.labels.template.adapter.add("text", function(text) {
						var replaceText;
						if( text != undefined ) {
							replaceText= ((parseInt(text)/10).toString()).replace("-",""); 
						}
						if(parseInt(replaceText) > 0 ){
							return text == param.columnKr[0] || replaceText == param.columnKr[1] ? replaceText : replaceText + param.pyramid.text;
						}else if( parseInt(replaceText) == 0 ){
							
							return text == param.columnKr[0] || replaceText == param.columnKr[1] ? replaceText : replaceText + "";
						}
					})
				}
			}
			
			//y축이 value일경우
			if( "valueTitle" in param ){
				var valueTitle = param.valueTitle;
				if( "text" in valueTitle ) valueAxis.title.text = valueTitle.text;
				if( "fontSize" in valueTitle ) valueAxis.title.fontSize = valueTitle.fontSize;
				if( "rotation" in valueTitle ) valueAxis.title.rotation = valueTitle.rotation;    
				if( "align" in valueTitle ) valueAxis.title.align = valueTitle.align;
				if( "valign" in valueTitle ) valueAxis.title.valign = valueTitle.valign;  
			    if( "dx" in valueTitle ) valueAxis.title.dx = valueTitle.dx;
			    if( "dy" in valueTitle ) valueAxis.title.dy = valueTitle.dy;
			}			
			
			//시리얼 생성
			function createSeries(field, name, showSum, cnt) {
				var series = chart.series.push(new am4charts.ColumnSeries());
				if( param.type && param.type === "X" ) {
					
					series.dataFields.valueX = field;
					series.dataFields.categoryY = categoryColumn;
					series.columns.template.tooltipText = " {categoryY} : {valueX}";
				}else{
					series.dataFields.valueY = field;
					series.dataFields.categoryX = categoryColumn;
					series.columns.template.tooltipText = " {categoryX} : {valueY}";
				}
				series.tooltip.label.fontSize = param.series.tooltip.fontSize;
				series.name = name;
				if( "series" in param ){
					var seriesOption = param.series;
					//categoryAxis.renderer.ticks.template.length = 10;
					if( "strokeOpacity" in seriesOption ) series.columns.template.strokeOpacity = seriesOption.strokeOpacity;
					if( "cornerRadiusBottomRight" in seriesOption ) series.columns.template.column.cornerRadiusBottomRight = seriesOption.cornerRadiusBottomRight;
					if( "cornerRadiusTopRight" in seriesOption ) series.columns.template.column.cornerRadiusTopRight = seriesOption.cornerRadiusTopRight;
					if( "fontSize" in seriesOption ) series.columns.template.fontSize = seriesOption.fontSize;
					if( "strokeWidth" in seriesOption ) series.columns.template.strokeWidth = seriesOption.strokeWidth;
					if( "cluster" in seriesOption ) series.cluster = seriesOption.cluster;
					if( "width" in seriesOption ) series.columns.template.width = am4core.percent(seriesOption.width);
					//series.sequencedInterpolation = true;
					if(param.eachColor)series.columns.template.adapter.add("fill", function(fill, target) {
						  return chart.colors.getIndex(target.dataItem.index);
						})
				}
				
				//누적
				if( "stack" in param ) series.stacked = param.stack;
				
				if( "legendIcon" in param ){
					var legendIcon = param.legendIcon;
					var columnKrCnt = 0;
					if( "columnKr" in param ) {
						columnKrCnt = param.columnKr.length;
					}
					console.log("columnKrCnt : ", columnKrCnt)
					if( "iconHref" in legendIcon && columnKrCnt > 0 ){
						var columnKr = param.columnKr;
						for( var j = 0 ; j < columnKrCnt; j++ ){
							if( columnKr[j] in legendIcon.iconHref ) {
								var columnData = columnKr[j];
								console.log("legendIcon : ", legendIcon)
								if( columnData === name ){
									console.log("columnData : ", legendIcon.iconHref[columnData]);
									series.dummyData = {
											flag: legendIcon.iconHref[columnData]
									};
									
								}
							}
						}
					}
					
				}
				
				//라벨
				var labelBullet = series.bullets.push(new am4charts.LabelBullet());
				if( "label" in param ){
					var label = param.label;
					if( "locationX" in label ) labelBullet.locationX = label.locationX;   //0.5
					if( "locationY" in label ) labelBullet.locationY = label.locationY;   //0.5
					if( "dx" in label ) labelBullet.label.dx = label.dx;  //10
					if( "dy" in label ) labelBullet.label.dy = label.dy;  //10
					if( "fontSize" in label ) labelBullet.label.fontSize = label.fontSize;  //10
					if( "fill" in label ) labelBullet.label.fill = am4core.color(label.color);  //"#fff"
					if( "horizontalCenter" in label ) labelBullet.label.horizontalCenter = label.horizontalCenter;
					if( "truncate" in label ) labelBullet.label.truncate = label.truncate;
					if( "hideOversized" in label ) labelBullet.label.hideOversized = label.hideOversized;
					if( param.type && param.type === "X" ) labelBullet.label.text = "{valueX}"+param.label.text;
					if( param.type && param.type === "Y" ) labelBullet.label.text = "{valueY}"+param.label.text;
					if( "pyramid" in param ){
						labelBullet.label.dx = label.dx*(-cnt);  //10
						labelBullet.label.horizontalCenter = "left";
					}
				}
				var range;
				
				if( "pyramid" in param ){
					range = valueAxis.axisRanges.create();
					if( "value" in param.pyramid ) range.value = param.pyramid.value;
					if( "endValue" in param.pyramid ) range.endValue = param.pyramid.endValue;
					range.label.text = param.columnKr[0];
					range.label.fill = chart.colors.list[0];
					if( "dy" in param.pyramid ) range.label.dy = param.pyramid.dy; //20
					if( "fontWeight" in param.pyramid ) range.label.fontWeight = param.pyramid.fontWeight;
					if( "strokeOpacity" in param.pyramid ) range.grid.strokeOpacity = param.pyramid.strokeOpacity;
					range.grid.stroke = series.stroke;
				}
				
				//총 누적값
				if( "total" in param ){
					var total = param.total;
					if (showSum) {
						var sumBullet = series.bullets.push(new am4charts.LabelBullet());
						if( param.type && param.type === "X" ) sumBullet.label.text = "{valueY}";
						if( param.type && param.type === "Y" ) sumBullet.label.text = "{valueY}";
						if( "label" in param ) sumBullet.label.fontSize = param.label.fontSize;
						sumBullet.verticalCenter = "bottom";
						if( "dy" in total ) sumBullet.dy = total.dy; //-8;
						if( "dx" in total ) sumBullet.dx = total.dx; //
						sumBullet.label.adapter.add("text", function(text, target) {
							var val = Math.abs(target.dataItem.dataContext.atrb01 + target.dataItem.dataContext.atrb02);
							return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						});
					}
				}
			}
			
			
			//컬럼 및 한글명 여부 확인
			if( "columnKr" in param && "column" in param ){
				var column = param.column;
				var columnKr = param.columnKr;
				
				if( column.length != columnKr.length ) {
					alert("컬럼 확인해주세요."); 
					return;
				}
				for( var i = 0; i < columnKr.length; i++ ){
					if( (columnKr.length-1) != i || i == 0 ) {
						createSeries(column[i], columnKr[i], false, i);
					}else{
						createSeries(column[i], columnKr[i], true, i);
					}
				}
			}
			
			if( "line" in param ){
				var line = param.line;
				var lineAxis = chart.yAxes.push(new am4charts.ValueAxis());
				if( "valueStyle" in line ){
					var valueStyle = line.valueStyle;
					if( "opposite" in valueStyle ) lineAxis.renderer.opposite = valueStyle.opposite;
					if( "fontSize" in valueStyle ) lineAxis.renderer.fontSize = valueStyle.fontSize;
					lineAxis.syncWithAxis = valueAxis;
					if( "disabled" in valueStyle ) lineAxis.tooltip.disabled = valueStyle.disabled;
				}
				
				for(var k = 0 ; k < line.column.length; k++ ){
					fn_createLine(line.column[k], line.columnKr[k]);
				}
				
				function fn_createLine(field, name) {
					console.log("field : ", field)
					console.log("name : ", name)
					if( "series" in line ){
						var series = line.series;
						var lineSeries = chart.series.push(new am4charts.LineSeries());
						lineSeries.dataFields.valueY = field;
						lineSeries.dataFields.categoryX = param.category;
						lineSeries.name = name;
						lineSeries.yAxis = lineAxis;
						//series.columns.template.tooltipText = name +" {categoryX} : {valueY}";
						lineSeries.tooltipText = "{categoryX} {name} : {valueY}";
						console.log("lineSeries :: ", lineSeries)
						if( "point" in series ) {
							var point = series.point;
							for( var m = 0 ; m < point.length; m++ ){
								
								if( point[m] === "circle" ) lineSeries.bullets.push(new am4charts.CircleBullet());
							}
						}
						//lineSeries.stroke = chart.colors.getIndex(13);
						if( "strokeWidth" in series ) lineSeries.strokeWidth = series.strokeWidth;
						if( "snapTooltip" in series ) lineSeries.snapTooltip = series.snapTooltip;
						//lineSeries.renderer.fontSize = 10;
						
						lineSeries.yAxis = lineAxis;
						if( "stroke" in series ) lineSeries.stroke = am4core.color(series.stroke);
						lineSeries.fill = lineSeries.stroke;
						if( "strokeWidth" in series ) lineSeries.strokeWidth = series.strokeWidth;
						if( "strokeDasharray" in series ) lineSeries.propertyFields.strokeDasharray = series.strokeDasharray;
						if( "textAlign" in series ) lineSeries.tooltip.label.textAlign = series.textAlign;
					}
				}
				
			} 
			
			//범례 설정
			if( "legend" in param ) {
				var legend = param.legend;
				chart.legend = new am4charts.Legend();
				if( legend != null && "position" in legend ) chart.legend.position = legend.position; //"top";
				chart.legend.useDefaultMarker = true;
				/* Remove square from marker template */
				var marker = chart.legend.markers.template;
				if( "legendIcon" in param ) marker.disposeChildren();
				if( legend != null && "markerWidth" in legend ) marker.width = legend.markerWidth;//30;
				if( legend != null && "markerHeight" in legend ) marker.height = legend.markerHeight; // 30;
			}
			
			
			/* Add custom image instead */
			if( "legendIcon" in param ){
				
				var flag = marker.createChild(am4core.Image);
				if( "iconWidth" in param.legendIcon ) flag.width = param.legendIcon.iconWidth; //20;
				if( "iconHeight" in param.legendIcon ) flag.height = param.legendIcon.iconHeight;//20;
				flag.verticalCenter = "top";
				flag.horizontalCenter = "left";
				flag.adapter.add("href", function(href, target) {
					if (target.dataItem && target.dataItem.dataContext && target.dataItem.dataContext.dummyData) {
						return target.dataItem.dataContext.dummyData.flag;
					}
					else {
						return href;
					}
				});
			}
			
		},
		
		/**
		 * line Chart
		 */
		dashBoard_lineChart : function(configData, param, returnCallback) {
			// Themes begin
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end
	    	console.log("param.series.tooltip.fontSize : " ,param.series.tooltip.fontSize)
	    	// Create chart instance
	    	var chart = am4core.create(param.targetId, am4charts.XYChart);
	    	chart.data = configData;
	    	if(param.padding.top) chart.paddingTop = 30;
	    	
	    	//colors
	    	if(param.color) chart.colors.list = param.color;
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
	    	if(param.legend.position) chart.legend.position = param.legend.position;
	    	if(param.legend.useDefaultMarker) chart.legend.useDefaultMarker = param.legend.useDefaultMarker;
			
			var markerTemplate = chart.legend.markers.template;
			if(param.marker.width) markerTemplate.width = param.marker.width;
			if(param.marker.height) markerTemplate.height = param.marker.height;
			if(param.legend.fontSize) chart.legend.labels.template.fontSize = param.legend.fontSize;
			if(param.legend.maxHeight) chart.legend.maxHeight = param.legend.maxHeight;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	if ("minGridDistance" in param.dateAxis) dateAxis.renderer.minGridDistance = param.dateAxis.minGridDistance;
	    	if (param.dateAxis.fontSize) dateAxis.renderer.fontSize = param.dateAxis.fontSize;
	    	if (param.dateAxis.dateFormats == "year"){
	    		dateAxis.dateFormats.setKey("year", param.dateAxis.setKey);
	    	}else{
	    		dateAxis.dateFormats.setKey("month", param.dateAxis.setKey);
	    		dateAxis.periodChangeDateFormats.setKey("month", param.dateAxis.setKey); 
	    	}
	    	//valueAxis.title
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			if (param.valueAxis.renderer.fontSize) valueAxis.renderer.fontSize = param.valueAxis.renderer.fontSize;
			if ("rotation" in param.valueAxis.title) valueAxis.title.rotation = param.valueAxis.title.rotation;    
			if (param.valueAxis.title.text) valueAxis.title.text = param.valueAxis.title.text;
			if (param.valueAxis.title.fontSize) valueAxis.title.fontSize = param.valueAxis.title.fontSize;
			
			if (param.valueAxis.title.align) valueAxis.title.align = param.valueAxis.title.align;
			if (param.valueAxis.title.valign) valueAxis.title.valign = param.valueAxis.title.valign;
			if (param.valueAxis.title.dx) valueAxis.title.dx = param.valueAxis.title.dx;
			if (param.valueAxis.title.dy) valueAxis.title.dy = param.valueAxis.title.dy;
		    
		    function createAxisAndSeries(field, name, bullet) {
		    	 console.log("bullet : "  , bullet)
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = param.category;
	    		  if (param.series.strokeWidth) series.strokeWidth = param.series.strokeWidth;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  if (param.series.tooltipText) series.tooltipText = param.series.tooltipText;
	    		  //series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  if(param.series.tooltip.backgroundStrokeOpacity) series.tooltip.background.strokeOpacity = param.series.tooltip.backgroundStrokeOpacity;
	    		  if(param.series.tooltip.pointerOrientation) series.tooltip.pointerOrientation = param.series.tooltip.pointerOrientation;
	    		  //series.tooltip.label.minWidth = 40;
	    		  series.tooltip.label.fontSize = param.series.tooltip.fontSize;
	    		  if(param.series.tooltip.labelMinWidth) series.tooltip.label.minWidth = param.series.tooltip.labelMinWidth;
	    		  if(param.series.tooltip.labelMinHeight) series.tooltip.label.minHeight = param.series.tooltip.labelMinHeight;
	    		  if(param.series.tooltip.labelTextAlign) series.tooltip.label.textAlign = param.series.tooltip.labelTextAlign;
	    		  if(param.series.tooltip.labelTextValign) series.tooltip.label.textValign = param.series.tooltip.labelTextValign;
	    		  
	    		 
	    		  if(bullet){
		    		  switch(bullet) {
		    		    case "triangle":
		    		      var bullet = series.bullets.push(new am4charts.Bullet());
		    		      bullet.width = 12;
		    		      bullet.height = 12;
		    		      bullet.horizontalCenter = "middle";
		    		      bullet.verticalCenter = "middle";
		    		      //bullet.fill = am4core.color("#fff");
		    		      var triangle = bullet.createChild(am4core.Triangle);
		    		      //triangle.stroke = interfaceColors.getFor("background");
		    		      triangle.strokeWidth = 2;
		    		      triangle.direction = "top";
		    		      triangle.width = 10;
		    		      triangle.height = 10;
		    		      break;
		    		    case "rectangle":
		    		      var bullet = series.bullets.push(new am4charts.Bullet());
		    		      bullet.width = 10;
		    		      bullet.height = 10;
		    		      bullet.horizontalCenter = "middle";
		    		      bullet.verticalCenter = "middle";
		    		      //bullet.fill = am4core.color("#fff");
		    		      
		    		      var rectangle = bullet.createChild(am4core.Rectangle);
		    		      //rectangle.stroke = interfaceColors.getFor("background");
		    		      rectangle.strokeWidth = 2;
		    		      rectangle.width = 10;
		    		      rectangle.height = 10;
		    		      break;
		    		    default:
		    		      var bullet = series.bullets.push(new am4charts.CircleBullet());
		    		      //bullet.circle.stroke = interfaceColors.getFor("background");
		    		      bullet.circle.strokeWidth = 2;
		    		      break;
		    		  }
	    		  }else{
	    		  }
	    	};
	    	for (var i = 0; i < param.value.length; i++){
	    		if(param.columnKr){
	    			if(param.bullet){
	    				console.log("3 => 333333333")
	    				createAxisAndSeries(param.value[i], param.columnKr[i], param.bullet[i]);
	    				console.log("param.bullet : " , param.value[i], "ㅎㅎㅎㅎㅎㅎㅎㅎ" ,param.columnKr[i],"ㅗㅗㅗㅗㅗㅗㅗㅗㅗ", param.bullet[i])
	    			}else{
	    				createAxisAndSeries(param.value[i], param.columnKr[i], "");
	    				console.log("param.bullet => 없음")
	    			}
	    		}else{
	    			console.log("param.name => 없음")
	    		}
	    	}
	    	//createAxisAndSeries(configData.value1, "일", "triangle");
		},
		
		
		/**
		 * 파이차트 공통 함수
		 * param.targetId : 차트 DIV ID
		 * configData : chartData
		 * param : chart 옵션값 객체
		 */
		dashBoard_pieChart : function(configData, param, returnCallback){
			// Themes begin
			//am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			
			//parent PieChart container
			var container;
			
			container = am4core.create(param.targetId, am4core.Container);
			if( "size" in param ){
				container.width = am4core.percent(param.size);
				container.height = am4core.percent(param.size);
				container.layout = "horizontal";
			}
			
			// Create child chart instance
			var chart;
			var series;
			console.log("configData : ", configData)
			
			//자식 파이차트
			var chart2;
			//자식 파이차트 시리얼
			var series2;
			if( param.type && param.type == "2D" ) {
				chart = container.createChild(am4charts.PieChart);
				series = chart.series.push(new am4charts.PieSeries());
				if( "children" in param ) {
					chart2 = container.createChild(am4charts.PieChart);
					series2 = chart2.series.push(new am4charts.PieSeries());
				}
			}
			if( param.type && param.type == "3D" ) {
				chart = container.createChild(am4charts.PieChart3D);
				series = chart.series.push(new am4charts.PieSeries3D());
				if( "children" in param ) {
					chart2 = container.createChild(am4charts.PieChart3D);
					series2 = chart2.series.push(new am4charts.PieSeries3D());
				}
			}
			console.log("configData : ", configData)
			if( "data" in configData ) chart.data = configData;
			if( configData.length > 0 ) chart.data = configData;

			var categoryColumn = "";
			if( "category" in param ) categoryColumn = param.category;
			console.log("categoryColumn : ", categoryColumn)
		
			// Add and configure Series
			if( "value" in param ) series.dataFields.value = param.value[0];
			series.dataFields.category = categoryColumn;
			series.slices.template.tooltipText = "{category}: {value.percent.formatNumber('#.#')}% ({value})";
			if( "series" in param ) {
				var seriesStyle = param.series;
				console.log("param.labels.disabled : " , param)
				if(param.label.disabled)series.labels.template.disabled = true;
				if( "stroke" in seriesStyle ) series.slices.template.stroke = am4core.color(seriesStyle.stroke);
				if( "strokeWidth" in seriesStyle ) series.slices.template.strokeWidth = seriesStyle.strokeWidth;
				if( "strokeOpacity" in seriesStyle ) series.slices.template.strokeOpacity = seriesStyle.strokeOpacity;
				if( "fontSize" in seriesStyle ) series.labels.template.fontSize = seriesStyle.fontSize;
				if( "fill" in seriesStyle ) series.labels.template.fill = am4core.color(seriesStyle.fill);
				if( "wrap" in seriesStyle ) series.labels.template.wrap = seriesStyle.wrap;
				//라벨 연결하는 선
				if( "stroke" in seriesStyle ) series.ticks.template.stroke = am4core.color(param.label.stroke);
				if( "strokeOpacity" in seriesStyle ) series.ticks.template.strokeOpacity = seriesStyle.strokeOpacity/2;
			}
			
			
			//series.dataFields.value = configData.value;				// Parameter로 DataField Value 값 설정
			
			//차트 value단위
			if( "numberFormat" in param ) chart.numberFormatter.numberFormat = param.numberFormat;
			
			//안쪽원 크기
			if( "innerRadius" in param ) chart.innerRadius = am4core.percent(param.innerRadius);
			
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
			/*series.hiddenState.properties.opacity = 1;
			series.hiddenState.properties.endAngle = -90;
			series.hiddenState.properties.startAngle = -90;*/
			//범례 설정
			if( "legend" in param ) {
				var legend = param.legend;
				chart.legend = new am4charts.Legend();
				if( legend != null && "position" in legend ) chart.legend.position = legend.position; //"top";
				if( legend != null && "fontSize" in legend ) chart.legend.labels.template.fontSize = legend.fontSize; //"top";
				if( legend != null && "maxHeight" in legend ) chart.legend.maxHeight = legend.maxHeight; //"top";
				if( legend != null && "scrollable" in legend ) chart.legend.scrollable = legend.scrollable; //"top";
				//chart.legend.useDefaultMarker = true;
				/* Remove square from marker template */
				var marker = chart.legend.markers.template;
				if( legend != null && "markerWidth" in legend ) marker.width = legend.markerWidth;//30;
				if( legend != null && "markerHeight" in legend ) marker.height = legend.markerHeight; // 30;
			
			}
			
			//차트 색상
			var colorCnt = 0;
			if( "color" in param ) colorCnt = param.color.length;
			
			if( colorCnt > 0 ) {
				var colorList = [];
				for( var item of param.color ){
					colorList.push(am4core.color(item));
				}
				chart.colors.list = colorList;
			}
			
			series.slices.template.adapter.add("fill", function(fill, target) {
				return chart.colors.getIndex(target.dataItem.index);
			});
			
			if( "children" in param ) {
				var children = param.children;
				
				
				if( "size" in param ) {
					chart2.width = am4core.percent(param.size/2);
					chart2.radius = am4core.percent(param.size/2);
				}
				
				series2.dataFields.value = param.value[1];
				series2.dataFields.category = param.category[1];
				if( "disabled" in children ) series2.labels.template.disabled = true;
				if( "disabled" in children ) series2.ticks.template.disabled = true;
				if( "alignLabels" in children ) series2.alignLabels = false;
				if( "fontSize" in children ) series2.labels.template.fontSize = 11;
				
				if( "line" in children ){
					var line = children.line;
					var interfaceColors = new am4core.InterfaceColorSet();
					
					var line1 = container.createChild(am4core.Line);
					if( "strokeDasharray" in line ) line1.strokeDasharray = line.strokeDasharray;
					if( "strokeOpacity" in line ) line1.strokeOpacity = line.strokeOpacity;
					if( "stroke" in line ) line1.stroke = am4core.color(line.stroke);
					//line1.stroke = interfaceColors.getFor("alternativeBackground");
					if( "isMeasured" in line ) line1.isMeasured = line.isMeasured;
					
					var line2 = container.createChild(am4core.Line);
					if( "strokeDasharray" in line ) line2.strokeDasharray = line.strokeDasharray;
					if( "strokeOpacity" in line ) line2.strokeOpacity = line.strokeOpacity;
					if( "stroke" in line ) line2.stroke = am4core.color(line.stroke);
					//line2.stroke = interfaceColors.getFor("alternativeBackground");
					if( "isMeasured" in line ) line2.isMeasured = line.isMeasured;
					
					
					var selectedSlice;
					
					function selectSlice(dataItem) {
						
						selectedSlice = dataItem.slice;
						
						var fill = selectedSlice.fill;
						
						var count = dataItem.dataContext.sub.length;
						series2.colors.list = [];
						for (var i = 0; i < count; i++) {
							series2.colors.list.push(fill.brighten(i * 2 / count));
						}
						
						chart2.data = dataItem.dataContext.sub;
						series2.appear();
						
						var middleAngle = selectedSlice.middleAngle;
						var firstAngle = series.slices.getIndex(0).startAngle;
						var animation = series.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
						animation.events.on("animationprogress", updateLines);
						
						selectedSlice.events.on("transformed", updateLines);
						
						//  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
						//  animation.events.on("animationprogress", updateLines)
					}
					
					
					function updateLines() {
						if (selectedSlice) {
							var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
							var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };
							
							p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
							p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);
							
							var p21 = { x: 0, y: -series2.pixelRadius };
							var p22 = { x: 0, y: series2.pixelRadius };
							
							p21 = am4core.utils.spritePointToSvg(p21, series2);
							p22 = am4core.utils.spritePointToSvg(p22, series2);
							
							line1.x1 = p11.x;
							line1.x2 = p21.x;
							line1.y1 = p11.y;
							line1.y2 = p21.y;
							
							line2.x1 = p12.x;
							line2.x2 = p22.x;
							line2.y1 = p12.y;
							line2.y2 = p22.y;
						}
					}
					
					series.slices.template.events.on("hit", function(event) {
					  selectSlice(event.target.dataItem);
					});
					
					chart.events.on("datavalidated", function() {
						setTimeout(function() {
							selectSlice(series.dataItems.getIndex(0));
						}, 1000);
					});
				}
			}
			
			//return chart;
			
		},
		//워드클라우드
		dashBoard_wordcloudChart : function(configData, param,  returnCallBack){
			//am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			
			
			var wordCloudChart = am4core.create(param.targetId, am4plugins_wordCloud.WordCloud); 
			var wordSeries = wordCloudChart.series.push(new am4plugins_wordCloud.WordCloudSeries());
			//add data
			if( "data" in configData ) wordCloudChart.data = configData.data;
			if( configData.length > 0 ) wordCloudChart.data = configData;
			
			if( "category" in param ) wordSeries.dataFields.word = param.category;
	 		if( "column" in param ) wordSeries.dataFields.value = param.column[0];
	 		
	 		if( "series" in param ){
	 			var series = param.series;
	 			wordSeries.colors = new am4core.ColorSet();
	 			
	 			if( "accuracy" in series ) wordSeries.accuracy = series.accuracy;
	 			if( "step" in series ) wordSeries.step = series.step;
	 			if( "ratationThreshold" in series ) wordSeries.rotationThreshold = series.rotationThreshold;
	 			if( "randomness" in series ) wordSeries.randomness = series.randomness;
	 			//wordSeries.maxCount = 200;
	 			if( "minWordLength" in series ) wordSeries.minWordLength = series.minWordLength;
	 			//wordSeries.labels.template.margin(4,4,4,4);
	 			if( "minFontSize" in series ) wordSeries.minFontSize = series.minFontSize;//am4core.percent(100);
	 			if( "maxFontSize" in series ) wordSeries.maxFontSize = series.maxFontSize;//am4core.percent(100);
	 			wordSeries.colors.passOptions = {};
	 			wordSeries.labels.template.tooltipText = "{word}: {value}";
	 			if( "fontWeight" in series ) wordSeries.fontWeight = series.fontWeight; 
	 		}
			

		},
		//연관어 분석
		dashBoard_relateChart : function(configData, param,  returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(param.targetId, am4plugins_forceDirected.ForceDirectedTree);
			
			// Chart 데이터를 Parameter로 받아 설정한다
			var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
			//add data
			if( "data" in configData ) networkSeries.data = configData.data;
			if( configData.length > 0 ) networkSeries.data = configData;
			
			
			var relationData = networkSeries.data[Object.keys(networkSeries.data)[0]].children;	
			console.log("relationData : ", relationData)
			if( "radius" in param ){
				var radius = param.radius;
				var totalStep = parseInt(relationData.length/radius.step);
				for( var i = 0; i < relationData.length; i++){
					for( var j = 0 ; j < totalStep ; j++){
						if(parseInt(i/totalStep) == j){
							relationData[i].color = param.color[j];	
							networkSeries.minRadius = am4core.percent(radius.max-(radius.differ*j));
						}
					}
				};
			}
			
			
			
			if( "column" in param ) networkSeries.dataFields.value = param.column[0];				// Parameter로 DataField Value 값 설정
			if( "category" in param ) networkSeries.dataFields.name = param.category;			// Parameter로 DataField Category 값 설정
			if( "colorName" in param ) networkSeries.dataFields.color = param.colorName;
			if( "children" in param ) networkSeries.dataFields.children = param.children;
			networkSeries.nodes.template.tooltipText = "{name}:{value}";
			
			if( "style" in param ){
				var style = param.style;
				if( "fontSize" in style ) networkSeries.fontSize = style.fontSize;
				if( "fontWeight" in style ) networkSeries.fontWeight = style.fontWeight;
				if( "centerStrength" in style ) networkSeries.centerStrength = style.centerStrength;
				if( "fillOpacity" in style ) networkSeries.nodes.template.fillOpacity = style.fillOpacity;
				if( "manyBodyStrength" in style ) networkSeries.manyBodyStrength = style.manyBodyStrength;
				if( "strength" in style ) networkSeries.links.template.strength = style.strength;
			}
			networkSeries.nodes.template.label.text = "{name}";
			
		},
}