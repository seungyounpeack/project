"use strict";

var CHART = {
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 인구통계
		 * 총인구 추이 그래프
		 * 차트종류 : 스택차트(누적바)
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_totalTrend : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			
			//add data
			chart.data = configData.data;
			
			// Create axes
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			//categoryAxis.title.text = "Local country offices";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 20;
			categoryAxis.renderer.cellStartLocation = 0.1;
			categoryAxis.renderer.cellEndLocation = 0.9;
			chart.colors.list = [
				am4core.color("#1E86FF"),
				 am4core.color("#FF64D2")
			]
			
			var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 11;
			//valueAxis.title.text = "Expenditure (M)";

			// Create series
			function createSeries(field, name, showSum) {
				var series = chart.series.push(new am4charts.ColumnSeries());
				series.dataFields.valueY = field;
				series.dataFields.categoryX = configData.dataFieldsCategory;
				series.columns.template.tooltipText = name +" {categoryX} : {valueY}";
				series.stacked = true;
				series.name = name;
				if( name == "남성" ){
					series.dummyData = {
							flag: "/dist/images/population/ico_man.png"
					};
					series.fill
				}else{
					series.dummyData = {
							flag: "/dist/images/population/ico_woman.png"
					};
					
				}
				
				
				var labelBullet = series.bullets.push(new am4charts.LabelBullet());
				labelBullet.locationX = 0.5;
				labelBullet.label.dy = 10;
				//labelBullet.locationY = -0.5;
				labelBullet.label.fontSize = 10;
				labelBullet.label.text = "{valueY}";
				labelBullet.label.fill = am4core.color("#fff");
				if (showSum) {
				    var sumBullet = series.bullets.push(new am4charts.LabelBullet());
				    sumBullet.label.text = "{valueY}";
				    sumBullet.label.fontSize = 11;
				    sumBullet.verticalCenter = "bottom";
				    sumBullet.dy = -8;
				    sumBullet.label.adapter.add("text", function(text, target) {
				      var val = Math.abs(target.dataItem.dataContext.atrb01 + target.dataItem.dataContext.atrb02);
				      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				    });
				  }
				/*labelBullet.label.adapter.add("text", function(text, target) {
				    var val = Math.abs(target.dataItem.valueY - target.dataItem.openValueY);
				    return val;
				  });*/
				/*series.dataFields.valueY = field;
				series.dataFields.categoryX = configData.dataFieldsCategory;
				series.name = name;
				series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
				series.stacked = stacked;
				series.columns.template.width = am4core.percent(95);*/
			}

			createSeries(configData.dataFieldsValue1, "남성", false);
			createSeries(configData.dataFieldsValue2, "여성", true);
			
			// Add legend
			/*chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;*/
			
			/* Create legend and enable default markers */
			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.position = "right";
			chart.legend.useDefaultMarker = true;

			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.disposeChildren();
			marker.width = 30;
			marker.height = 30;

			/* Add custom image instead */
			var flag = marker.createChild(am4core.Image);
			flag.width = 20;
			flag.height = 20;
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

		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 연령별 남자 구성
		 * 연령별 남녀구성
		 * 차트종류 : 사람이미지
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_ageManStatus : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.SlicedChart);
			
			chart.hiddenState.properties.opacity = 0;
			//add data
			chart.data = configData.data;
			var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
			
			var series = chart.series.push(new am4charts.PictorialStackedSeries());
			series.dataFields.value = configData.dataFieldsValue;
			series.dataFields.category = configData.dataFieldsCategory;
			series.alignLabels = true;
			series.slices.template.propertyFields.fill = configData.dataFieldsColor;
			series.maskSprite.path = iconPath;
			series.ticks.template.locationX = 1;
			series.ticks.template.locationY = 0.5;
			//series.ticks.template.fontSize = 10;
			series.labelsContainer.width = 200;
			series.labelsContainer.fontSize = 10;
			chart.legend = new am4charts.Legend();
			chart.legend.position = "left";
			chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 225;
			chart.legend.scrollable = true;
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 연령별 여자 구성
		 * 연령별 남녀구성
		 * 차트종류 : 사람이미지
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_ageWomanStatus : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.SlicedChart);
			
			chart.hiddenState.properties.opacity = 0;
			//add data
			chart.data = configData.data;
			var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
			var series = chart.series.push(new am4charts.PictorialStackedSeries());
			series.dataFields.value = configData.dataFieldsValue;
			series.dataFields.category = configData.dataFieldsCategory;
			series.alignLabels = true;
			//series.alignLabels.fontSize = 10;
			
			series.maskSprite.path = iconPath;
			series.ticks.template.locationX = 1;
			series.ticks.template.locationY = 0.5;
			series.slices.template.propertyFields.fill = configData.dataFieldsColor;
			//series.ticks.template.lable.fontSize =10;
			console.log("series.ticks.template : ", series.ticks.template)
			series.labelsContainer.width = 200;
			series.labelsContainer.fontSize = 10;
			chart.legend = new am4charts.Legend();
			chart.legend.position = "left";
			chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 225;
			chart.legend.scrollable = true;
			//chart.legend.height = am4core.percent(25)
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 연령별 인구현황
		 * 연령별 인구현황
		 * 차트종류 : 피라미드(종차트)
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_ageStatus :  function(displayDivTagID, configData, returnCallBack){
			
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			// Use only absolute numbers
			chart.numberFormatter.numberFormat = "#.#s";
			chart.colors.list = [
				am4core.color("#1E86FF"),
				 am4core.color("#FF64D2")
			]
			// Create axes
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			
			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.extraMin = 0.1;
			valueAxis.extraMax = 0.1;
			valueAxis.renderer.minGridDistance = 40;
			valueAxis.renderer.fontSize = 10;
			valueAxis.renderer.ticks.template.length = 5;
			valueAxis.calculatePercent = true;
			valueAxis.renderer.ticks.template.disabled = false;
			valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
			valueAxis.renderer.labels.template.adapter.add("text", function(text) {
			  return text == "Male" || text == "Female" ? text : text + "%";
			})

			// Create series
			var male = chart.series.push(new am4charts.ColumnSeries());
			male.dataFields.valueX = configData.dataFieldsValue1;
			male.dataFields.categoryY = configData.dataFieldsCategory;
			male.clustered = false;
			male.columns.template.tooltipText = "남성 "+"{categoryY} {valueX}%";
			//male.renderer.fontSize = 10;
			
			var maleLabel = male.bullets.push(new am4charts.LabelBullet());
			maleLabel.label.text = "{valueX}%";
			maleLabel.label.hideOversized = false;
			maleLabel.label.truncate = false;
			maleLabel.label.horizontalCenter = "right";
			maleLabel.label.dx = -10;
			maleLabel.label.fontSize = 10;

			var female = chart.series.push(new am4charts.ColumnSeries());
			female.dataFields.valueX = configData.dataFieldsValue2;
			female.dataFields.categoryY = configData.dataFieldsCategory;
			female.clustered = false;
			female.columns.template.tooltipText = "여성 "+"{categoryY} {valueX}%";
			//female.renderer.fontSize = 10;
			
			var femaleLabel = female.bullets.push(new am4charts.LabelBullet());
			femaleLabel.label.text = "{valueX}%";
			femaleLabel.label.hideOversized = false;
			femaleLabel.label.truncate = false;
			femaleLabel.label.horizontalCenter = "left";
			femaleLabel.label.dx = 10;
			femaleLabel.label.fontSize = 10;
			
			var maleRange = valueAxis.axisRanges.create();
			maleRange.value = -25;
			maleRange.endValue = 0;
			maleRange.label.text = "Male";
			maleRange.label.fill = chart.colors.list[0];
			maleRange.label.dy = 20;
			maleRange.label.fontWeight = '600';
			maleRange.grid.strokeOpacity = 1;
			maleRange.grid.stroke = male.stroke;

			var femaleRange = valueAxis.axisRanges.create();
			femaleRange.value = 0;
			femaleRange.endValue = 25;
			femaleRange.label.text = "Female";
			femaleRange.label.fill = chart.colors.list[1];
			femaleRange.label.dy = 20;
			femaleRange.label.fontWeight = '600';
			femaleRange.grid.strokeOpacity = 1;
			femaleRange.grid.stroke = female.stroke;

		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 전입,전출 순이동 현황
		 * 전입 현황
		 * 차트종류 : bar차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_incomeStatus :  function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#00F0FF")
			]
			chart.paddingLeft = 0;
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 40;
		    valueAxis.title.dy = -10;
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryY = configData.dataFieldsCategory;
			series.dataFields.valueX = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryY} : {valueX}";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			series.columns.template.column.cornerRadiusBottomRight = 5;
			series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "right";
			labelBullet.label.dx = 25;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueX.value}";
			//labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
			//labelBullet.locationX = 1;

			// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
			/*series.columns.template.adapter.add("fill", function(fill, target){
			  return chart.colors.getIndex(target.dataItem.index);
			});*/

			categoryAxis.sortBySeries = series;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 전입,전출 순이동 현황
		 * 전출 현황
		 * 차트종류 : bar차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_outcomeStatus :  function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#FF9C00")
			]
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 40;
		    valueAxis.title.dy = -10;
		    
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryY = configData.dataFieldsCategory;
			series.dataFields.valueX = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryY} : {valueX}";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			series.columns.template.column.cornerRadiusBottomRight = 5;
			series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "right";
			labelBullet.label.dx = 25;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueX.value}";
			//labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
			//labelBullet.locationX = 1;

			// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
			/*series.columns.template.adapter.add("fill", function(fill, target){
			  return chart.colors.getIndex(target.dataItem.index);
			});*/

			categoryAxis.sortBySeries = series;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 전입,전출 순이동 현황
		 * 10년간 전입,전출 현황
		 * 차트종류 : line차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_moveYearStatus : function(displayDivTagID, configData) {
	    	
	    	// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#01F1FF"),
				am4core.color("#FE9B00"),
				am4core.color("#FFFFFF"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	dateAxis.dateFormats.setKey("year", "yyyy");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;
		    //valueAxis.title
	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  series.tooltip.label.minWidth = 30;
	    		  series.tooltip.label.minHeight = 10;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  
	    		  /*series.tooltip.background.cornerRadius = 5;
				  series.tooltip.background.strokeOpacity = 0;*/
	    		  
	    		  var interfaceColors = new am4core.InterfaceColorSet();
	    		  console.log("interfaceColors :" ,interfaceColors)
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
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue1, "전입", "circle");
	    	createAxisAndSeries(configData.dataFieldsValue2, "전출", "rectangle");
	    	createAxisAndSeries(configData.dataFieldsValue3, "순이동", "triangle");
	    	
	    	//return chart;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 전입,전출 순이동 현황
		 * 전입,전출 지도
		 * 차트종류 : line차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_moveMap : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			
			var title = "경기도";
			  
			var chart = am4core.create(displayDivTagID, am4maps.MapChart);
		  
			chart.titles.create().text = title;

			chart.colors.list = [
				  am4core.color("#845EC2"),
				  am4core.color("#D65DB1"),
				  am4core.color("#FF6F91"),
				  am4core.color("#FF9671"),
				  am4core.color("#FFC75F"),
				  am4core.color("#F9F871"),
				
			];
			
			  // Set map definition
			//chart.geodataSource.url = configData;
			//chart.geodataSource.url = "/pageJs/analysis/complain/sn.json";
			chart.geodata = configData.data;
			chart.geodataSource.geodata = configData.data;
			// Set projection
			chart.projection = new am4maps.projections.Mercator();
			console.log("chart : ", chart)
			console.log("chart configData.data : ", configData.data)
			  // Create map polygon series
			var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
			
			
			  //Set min/max fill color for each area
			polygonSeries.heatRules.push({
			  property: "fill",
			  target: polygonSeries.mapPolygons.template,
			  min: chart.colors.getIndex(0).brighten(1),
			  max: chart.colors.getIndex(5).brighten(-1)
			});
			
			// Make map load polygon data (state shapes and names) from GeoJSON
			polygonSeries.useGeodata = true;
			//범례
			/*
			 var heatLegend = chart.createChild(am4maps.HeatLegend);
			  heatLegend.series = polygonSeries;
			  heatLegend.align = "right";
			  heatLegend.width = am4core.percent(25);
			  heatLegend.marginRight = am4core.percent(4);
			  heatLegend.minValue = 0;
			  //heatLegend.maxValue = valueMax;
			  heatLegend.markerCount = 10;
			  heatLegend.valign = "bottom";
			 */
			
			polygonSeries.mapPolygons.template.events.on("over", function(event) {
				  handleHover(event.target);
				
			});
			
			function handleHover(mapPolygons) {
				
				//console.log(mapPolygons.dataItem.dataContext.value);
				  
				if (!isNaN(mapPolygons.dataItem.dataContext.value)) {
				    heatLegend.valueAxis.showTooltipAt(mapPolygons.dataItem.dataContext.value)
				}else{
				    heatLegend.valueAxis.hideTooltip();
				}
			}
			  
			  
			  var heatLegend = chart.createChild(am4charts.HeatLegend);
			  heatLegend.series = polygonSeries;
			  heatLegend.align = "right";
			  heatLegend.width = am4core.percent(35);
			  //heatLegend.marginTop = am4core.percent(4);
			  //heatLegend.valueAxis.renderer.labels.template.fontSize = 8;
			  //heatLegend.valueAxis.renderer.minGridDistance = 30;
			  //heatLegend.valueAxis.renderer.minGridDistance = 30;
			  heatLegend.markerContainer.height = 3;
			  heatLegend.markerCount = 7;
			  heatLegend.valign = "bottom";
			  heatLegend.minValue = 0;
			  //heatLegend.maxValue = valueMax;
			  heatLegend.padding(0, 0, 20, 0);
			  
			  heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
				  return "";
			  });
			  
			  let minRange = heatLegend.valueAxis.axisRanges.create();
			  minRange.label.horizontalCenter = "left";

			  let maxRange = heatLegend.valueAxis.axisRanges.create();
			  maxRange.label.horizontalCenter = "right";
			  
			  /*
			  var minRange = heatLegend.valueAxis.axisRanges.create();
			  minRange.value = heatLegend.minValue;
			  minRange.label.text = "{minValue}";
			  var maxRange = heatLegend.valueAxis.axisRanges.create();
			  maxRange.value = heatLegend.maxValue;
			  maxRange.label.text = "{maxValue}";
			  */
			
			
			  
			// Configure series tooltip
			var polygonTemplate = polygonSeries.mapPolygons.template;
			polygonTemplate.tooltipText = "{adm_dr_nm}: {value} 원";
			polygonTemplate.nonScalingStroke = true;
			polygonTemplate.strokeWidth = 0.5;

			// Create hover state and set alternative fill color
			var hs = polygonTemplate.states.create("hover");
			hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);
			
			
			/*
			var cntData = configData.data;
			
			var valueMax = cntData[0].count;
			chart.geodataSource.events.on("parseended", function(ev) {
			    var data2 = [];			   
			    var cnt = [];
			    for(var i = 0; i < ev.target.data.features.length; i++) {
			    	for(var j = 0; j < cntData.length; j++){
			    		if(cntData[j].dong.match(ev.target.data.features[i].adm_dr_nm)){
			    			data2.push({
			    				adm_dr_nm: ev.target.data.features[i].adm_dr_nm,			    				
			    				value: cntData[j].count
			    			});
			    		}
			    	}	
			    }

			    polygonSeries.data = data2;    
			})
			*/
			
			
			
			if(Util.isFunction(returnCallBack)) returnCallBack(chart, polygonSeries, polygonTemplate);
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 유동인구
		 * 요일별 유동인구
		 * 차트종류 : line차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_dayFlow : function(displayDivTagID, configData) {
	    	
	    	// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#FE0000"),
				am4core.color("#FE6002"),
				am4core.color("#FEF600"),
				am4core.color("#30E400"),
				am4core.color("#0078FF"),
				am4core.color("#0A0071"),
				am4core.color("#9300EF"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			/* Remove square from marker template */
			//chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	//dateAxis.renderer.dx = -0.5;
	    	dateAxis.dateFormats.setKey("year", "yy");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 10;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.columns.template.fontSize = 12;
	    		  series.tooltip.label.minHeight = 20;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  
	    		  
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue1, "일", "triangle");
	    	createAxisAndSeries(configData.dataFieldsValue2, "월", "circle");
	    	createAxisAndSeries(configData.dataFieldsValue3, "화", "rectangle");
	    	createAxisAndSeries(configData.dataFieldsValue4, "수", "triangle");
	    	createAxisAndSeries(configData.dataFieldsValue5, "목", "circle");
	    	createAxisAndSeries(configData.dataFieldsValue6, "금", "rectangle");
	    	createAxisAndSeries(configData.dataFieldsValue7, "토", "triangle");
	    	
	    	//return chart;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 유동인구
		 * 성 연령별 유동 인구
		 * 차트종류 : 피라미드(종차트)
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_genderFlow :  function(displayDivTagID, configData, returnCallBack){
			
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			// Use only absolute numbers
			chart.numberFormatter.numberFormat = "#,##s";
			chart.colors.list = [
				am4core.color("#1E86FF"),
				 am4core.color("#FF64D2")
			]
			
			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			//chart.legend.maxHeight = 250;
			
			// Create axes
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.ticks.template.length = 10;
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 10;
			//categoryAxis.renderer.labels.template.location = 0.0001;
			//categoryAxis.renderer.grid.template.disabled = true;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			
			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.extraMin = 0.1;
			valueAxis.extraMax = 0.1;
			valueAxis.renderer.minGridDistance = 40;
			valueAxis.renderer.fontSize = 10;
			
			//valueAxis.renderer.ticks.template.length = 10;
			//valueAxis.calculatePercent = true;
			valueAxis.renderer.ticks.template.disabled = true;
			valueAxis.renderer.ticks.template.strokeOpacity = 0;
			valueAxis.renderer.labels.template.adapter.add("text", function(text) {
				var replaceText;
				if( text != undefined ) {
					replaceText= ((parseInt(text)/10).toString()).replace("-",""); 
				}
			   if(parseInt(replaceText) > 0 ){
				   return text == "Male" || replaceText == "Female" ? replaceText : replaceText + "만명";
			  }else{
				  
				  return text == "Male" || replaceText == "Female" ? replaceText : replaceText + "";
			  }
			})

			// Create series
			var male = chart.series.push(new am4charts.ColumnSeries());
			male.dataFields.valueX = configData.dataFieldsValue1;
			male.dataFields.categoryY = configData.dataFieldsCategory;
			male.clustered = false;
			male.name = "남성";
			male.columns.template.tooltipText = "남성 "+"{categoryY} {valueX} 명";
			console.log("male.columns.templat ",male.columns.template)
			//male.renderer.fontSize = 10;
			
			var maleLabel = male.bullets.push(new am4charts.LabelBullet());
			maleLabel.label.text = "{valueX}";
			maleLabel.label.hideOversized = false;
			maleLabel.label.truncate = false;
			maleLabel.label.horizontalCenter = "right";
			maleLabel.label.dx = -10;
			maleLabel.label.fontSize = 10;
			console.log("maleLabel : ", maleLabel)
			
			var female = chart.series.push(new am4charts.ColumnSeries());
			female.dataFields.valueX = configData.dataFieldsValue2;
			female.dataFields.categoryY = configData.dataFieldsCategory;
			female.clustered = false;
			female.name = "여성";
			female.columns.template.tooltipText = "여성 "+"{categoryY} {valueX} 명";
			//female.renderer.fontSize = 10;
			
			var femaleLabel = female.bullets.push(new am4charts.LabelBullet());
			femaleLabel.label.text = "{valueX}";
			femaleLabel.label.hideOversized = false;
			femaleLabel.label.truncate = false;
			femaleLabel.label.horizontalCenter = "left";
			femaleLabel.label.dx = 10;
			femaleLabel.label.fontSize = 10;
			
			var maleRange = valueAxis.axisRanges.create();
			maleRange.value = -20;
			maleRange.endValue = 0;
			maleRange.label.text = "Male";
			maleRange.label.fill = chart.colors.list[0];
			maleRange.label.dy = 20;
			maleRange.label.fontWeight = '600';
			maleRange.grid.strokeOpacity = 1;
			maleRange.grid.stroke = male.stroke;

			var femaleRange = valueAxis.axisRanges.create();
			femaleRange.value = 0;
			femaleRange.endValue = 20;
			femaleRange.label.text = "Female";
			femaleRange.label.fill = chart.colors.list[1];
			femaleRange.label.dy = 20;
			femaleRange.label.fontWeight = '600';
			femaleRange.grid.strokeOpacity = 1;
			femaleRange.grid.stroke = female.stroke;
			
			
			

		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 인구
		 * 하위 - 유동인구
		 * 거주지별 생활인구/서비스 인구
		 * 차트종류 : group barchart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_pop_regService : function(displayDivTagID, configData, returnCallBack){
			
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.paddingLeft = 40;
			chart.data = configData.data;
			
			//color
			chart.colors.list = [
				am4core.color("#70C61D"),
			]
			
			// Create axes
			var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			yAxis.dataFields.category = configData.dataFieldsCategory;
			yAxis.renderer.grid.template.locationX = 5;
			yAxis.renderer.labels.template.fontSize = 10;
			yAxis.renderer.minGridDistance = 15;
			//yAxis.renderer.grid.template.location = 0;

			var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
			// Create series
			var series = chart.series.push(new am4charts.ColumnSeries());
			console.log("series.dataFields : ", series.dataFields)
			series.dataFields.valueX = configData.dataFieldsValue;
			//series.dataFields.label.dx = 30;
			series.dataFields.categoryY = configData.dataFieldsCategory;
			series.columns.template.tooltipText = "{categoryY}: {valueX}[/]";
			series.columns.template.strokeWidth = 0;
			//series.dataFields.valueXShow = "percent";
			
			//series.columns.template.locationX = 1;
			series.calculatePercent = true;
			//series.dataFields.valueXShow = "percent";
			var labelBullet = series.bullets.push(new am4charts.LabelBullet());
			labelBullet.label.dx = -5;
			labelBullet.label.horizontalCenter = "right";
			labelBullet.label.fontSize = 11;
			labelBullet.visible = true;
			//labelBullet.label.pixelX = 100 
			labelBullet.label.text = "{valueX}";
			// ({valueX.percent.formatNumber('#.0')}%)
			labelBullet.label.fill = am4core.color("#000000");
			
			//라벨 auto hidden 설정 제거
			labelBullet.label.truncate = false;
			labelBullet.label.hideOversized = false;

			var axisBreaks = {};
			var legendData = [];

			// Add ranges
			function addRange(label, start, end, color) {
			  var range = yAxis.axisRanges.create();
			  
			  range.category = start;
			  range.endCategory = end;
			  range.label.text = label;
			  range.label.disabled = false;
			  range.label.fill = color;
			  range.label.location = 0;
			  range.label.dx = -130;
			  range.label.dy = 12;
			  range.label.fontWeight = "bold";
			  range.label.fontSize = 10;
			  range.label.horizontalCenter = "left"
			  range.label.inside = true;
			  
			  range.grid.stroke = am4core.color("#396478");
			  range.grid.strokeOpacity = 1;
			  range.tick.length = 200;
			  range.tick.disabled = false;
			  range.tick.strokeOpacity = 0.6;
			  range.tick.stroke = am4core.color("#396478");
			  range.tick.location = 0;
			  
			  range.locations.category = 1;
			  var axisBreak = yAxis.axisBreaks.create();
			  axisBreak.startCategory = start;
			  axisBreak.endCategory = end;
			  axisBreak.breakSize = 1;
			  axisBreak.fillShape.disabled = true;
			  axisBreak.startLine.disabled = true;
			  axisBreak.endLine.disabled = true;
			  axisBreaks[label] = axisBreak;  

			  legendData.push({name:label, fill:color});
			}
			
			var data = configData.data;
			
			var admdName = [];
	    	for( var i = 0 ; i < data.length; i++ ){
	    		if( i < (data.length-1) && i > 0 ){
	    			if( data[i].admdNm != data[i+1].admdNm ) admdName.push(data[i].admdNm);
	    		}else if( i == 0 ){
	    			admdName.push(data[i].admdNm);
	    		}else{
	    			if( data[0].admdNm != data[data.length-1].admdNm ) admdName.push(data[i].admdNm);
	    		}
	    		
	    	}
	    	
	    	for( var j = 0 ; j < admdName.length; j++ ){
	    		var start = "";
	    		var end = "";
	    		
	    		for( var k = 0 ; k < data.length; k++ ){
	    			if( admdName[j] === data[k].admdNm ) {
	    				start = data[k].stacSe;
	    			}else{
	    				if( k != 0 ) end = data[k-1].stacSe;
	    			}
	    		}
	    		console.log("admdName[j] : ", admdName[j])
	    		addRange(admdName[j], start, end, chart.colors.getIndex(0));
	    		
	    	}
			//addRange(configData.dataFieldsCategory2, "New York", "West Virginia", chart.colors.getIndex(1));
			//addRange(configData.dataFieldsCategory2, "Florida", "South Carolina", chart.colors.getIndex(2));
			//addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

			//chart.cursor = new am4charts.XYCursor();


			var legend = new am4charts.Legend();
			legend.position = "right";
			legend.scrollable = true;
			legend.valign = "top";
			legend.reverseOrder = true;

			chart.legend = legend;
			legend.data = legendData;

			legend.itemContainers.template.events.on("toggled", function(event){
			  var name = event.target.dataItem.dataContext.name;
			  var axisBreak = axisBreaks[name];
			  if(event.target.isActive){
			    axisBreak.animate({property:"breakSize", to:0}, 1000, am4core.ease.cubicOut);
			    yAxis.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.hide(1000, 500);
			      }
			    })
			    series.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.hide(1000, 0, 0, ["valueX"]);
			      }
			    })    
			  }
			  else{
			    axisBreak.animate({property:"breakSize", to:1}, 1000, am4core.ease.cubicOut);
			    yAxis.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.show(1000);
			      }
			    })  

			    series.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.show(1000, 0, ["valueX"]);
			      }
			    })        
			  }
			})

		},
		
		/** ----------------민원------------------------------- **/
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 여론분석
		 * 일별 언급량 추이
		 * 차트종류 : 라인차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_publicDay : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	console.log("chart.data: ", chart.data)
	    	//colors
	    	chart.colors.list = [
				am4core.color("#01F1FF"),
				am4core.color("#FE9B00"),
				am4core.color("#FFFFFF"),
			]
	    	
	    	// Add legend
	    	/*chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 250;*/
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	dateAxis.dateFormats.setKey("year", "yy");
	    	//dateAxis.dateFormats.setKey("day", "dd");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 11;
			valueAxis.title.text = "(건)";
			valueAxis.title.fontSize = 11;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 22;
		    valueAxis.title.dy = 10;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 1;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: [bold]{valueY}건[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  //series.tooltip.background.strokeOpacity = 0;
	    		  //series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.tooltip.label.minHeight = 40;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  
	    		  /*series.tooltip.background.cornerRadius = 5;
				  series.tooltip.background.strokeOpacity = 0;*/
	    		  
	    		  var interfaceColors = new am4core.InterfaceColorSet();
	    		  console.log("interfaceColors :" ,interfaceColors)
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
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue, "일별 언급량", "circle");
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 여론분석
		 * 워드 클라우드
		 * 차트종류 : 워드 클라우드
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_publicWorldcloud : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var wordCloudChart = am4core.create(displayDivTagID, am4plugins_wordCloud.WordCloud); 
			var wordSeries = wordCloudChart.series.push(new am4plugins_wordCloud.WordCloudSeries());
			wordSeries.data = configData.data;
			wordSeries.dataFields.word = configData.dataFieldsCategory;
	 		wordSeries.dataFields.value = configData.dataFieldsValue;
	 		wordSeries.colors = new am4core.ColorSet();
	 		wordSeries.accuracy = 4;
	 		wordSeries.step = 15;
	 		wordSeries.rotationThreshold = 0.7;
	 		wordSeries.randomness = 0.9
	 		//wordSeries.maxCount = 200;
	 		//wordSeries.minWordLength = 2;
	 		//wordSeries.labels.template.margin(4,4,4,4);
	 		wordSeries.maxFontSize = am4core.percent(100);
	 		wordSeries.colors.passOptions = {};
	 		wordSeries.labels.template.tooltipText = "{word}: {value}";
	 		wordSeries.minFontSize = 8;
	 		wordSeries.maxFontSize = 40;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 여론분석
		 * 연관어 분석
		 * 차트종류 : 연관어 분석
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_publicRelate : function(displayDivTagID, configData, returnCallBack){
			
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4plugins_forceDirected.ForceDirectedTree);
			
			// Chart 데이터를 Parameter로 받아 설정한다
			var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
			networkSeries.data = configData.data;
			var relationData = networkSeries.data[Object.keys(networkSeries.data)[0]].children;	
			console.log("relationData : ", relationData)
			for( var i = 0; i < relationData.length; i++){
				  if(parseInt(i/4) == 0){
					  relationData[i].color = "#dc8c67";	
					  networkSeries.minRadius = am4core.percent(9);
					  //networkSeries.maxRadius = am4core.percent(8);
				  }else if(parseInt(i/4) == 1){				    
					  relationData[i].color = am4core.color("#dc67cf");
					  networkSeries.minRadius = am4core.percent(8);	
					  //networkSeries.maxRadius = am4core.percent(7);
				  }else if(parseInt(i/4) == 2){
					  relationData[i].color = am4core.color("#dd6789");
					  networkSeries.minRadius = am4core.percent(7);
					  //networkSeries.maxRadius = am4core.percent(6);
				  }else if(parseInt(i/4) == 3){
					  relationData[i].color = am4core.color("#a468dd");
					  networkSeries.minRadius = am4core.percent(6);	
					  //networkSeries.maxRadius = am4core.percent(5);
				  }else if(parseInt(i/4) == 4){
					  relationData[i].color = am4core.color("#6771dc");
					  networkSeries.minRadius = am4core.percent(5);	
					  //networkSeries.maxRadius = am4core.percent(4);
				  }else{
					  relationData[i].color = "#999999";
				  }
			};
			
			networkSeries.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			networkSeries.dataFields.name = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			networkSeries.dataFields.color = configData.dataFieldsColor;
			networkSeries.dataFields.children = configData.dataFieldsChildren;
			networkSeries.nodes.template.tooltipText = "{name}:{value}";
			networkSeries.fontSize = 12;
			networkSeries.centerStrength = 1;
			networkSeries.nodes.template.fillOpacity = 1;
			networkSeries.manyBodyStrength = -20;
			networkSeries.links.template.strength = 0.8;
			/*networkSeries.minRadius = am4core.percent(6);
			networkSeries.maxRadius = am4core.percent(4);*/
			/*networkSeries.nodes.maxRadius = am4core.percent(13);
			networkSeries.nodes.minRadius = am4core.percent(13);*/
			networkSeries.nodes.template.label.text = "{name}";
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 민원분석
		 * 행정동별 민원 상위
		 * 차트종류 : 바차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_AnalysisRank : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#67b7dc"),
				am4core.color("#66dcba"),
				am4core.color("#67dc98"),
				am4core.color("#7ddc68"),
				am4core.color("#2cca90"),
				am4core.color("#dc67cf"),
				am4core.color("#c3dc67"),
				am4core.color("#a366db"),
				am4core.color("#67dc74"),
				am4core.color("#a1dc68"),
				am4core.color("#dc8c67"),
				am4core.color("#dc6868"),
				am4core.color("#ddd268"),
				am4core.color("#8f7ee8"),
			]
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(건)";
			valueAxis.title.fontSize = 11;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "left";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = -30;
		    valueAxis.title.dy = -25;
			
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryY = configData.dataFieldsCategory;
			series.dataFields.valueX = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryY} : {valueX}";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			series.columns.template.column.cornerRadiusBottomRight = 5;
			series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			var columnTemplate = series.columns.template;
			columnTemplate.adapter.add("fill", function(fill, target) {
				  return chart.colors.getIndex(target.dataItem.index);
				})
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "right";
			labelBullet.label.dx = 25;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueX.value}";
			//labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
			//labelBullet.locationX = 1;

			// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
			/*series.columns.template.adapter.add("fill", function(fill, target){
			  return chart.colors.getIndex(target.dataItem.index);
			});*/

			categoryAxis.sortBySeries = series;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 민원분석
		 * 민원 - 일별 언급량 추이
		 * 차트종류 : 바차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_AnalysisDay : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	console.log("chart.data: ", chart.data)
	    	//colors
	    	chart.colors.list = [
				am4core.color("#01F1FF"),
				am4core.color("#FE9B00"),
				am4core.color("#FFFFFF"),
			]
	    	
	    	// Add legend
	    	/*chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 250;*/
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	dateAxis.dateFormats.setKey("year", "yy");
	    	//dateAxis.dateFormats.setKey("day", "dd");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 11;
			valueAxis.title.text = "(건)";
			valueAxis.title.fontSize = 11;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			valueAxis.title.dx = 23;
		    valueAxis.title.dy = 5;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 1;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: [bold]{valueY}건[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  //series.tooltip.background.strokeOpacity = 0;
	    		  //series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.tooltip.label.minHeight = 40;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  
	    		  /*series.tooltip.background.cornerRadius = 5;
				  series.tooltip.background.strokeOpacity = 0;*/
	    		  
	    		  var interfaceColors = new am4core.InterfaceColorSet();
	    		  console.log("interfaceColors :" ,interfaceColors)
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
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue, "일별 언급량", "circle");
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 민원분석
		 * 민원 - 긍정 부정분석
		 * 차트종류 : 파이차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_AnalysisNp : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.PieChart3D);
			
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			chart.legend = new am4charts.Legend();
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			// Chart 데이터를 Parameter로 받아 설정한다
			chart.data = configData.data;
			
			
			var series = chart.series.push(new am4charts.PieSeries3D());
			series.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			series.dataFields.category = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			
			series.colors.list = [
				 am4core.color("#487ec4"), //긍정
				 am4core.color("#f35366") //부정
			]
			
			return chart;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 민원
		 * 하위 - 민원분석
		 * 민원 - 연관어 분석
		 * 차트종류 : 연관그래프
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_comp_AnalysisRelate : function(displayDivTagID, configData, returnCallBack){

			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4plugins_forceDirected.ForceDirectedTree);
			
			// Chart 데이터를 Parameter로 받아 설정한다
			var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
			networkSeries.data = configData.data;
			var relationData = networkSeries.data[Object.keys(networkSeries.data)[0]].children;	
			console.log("relationData : ", relationData)
			for( var i = 0; i < relationData.length; i++){
				  if(parseInt(i/4) == 0){
					  relationData[i].color = "#dc8c67";	
					  networkSeries.minRadius = am4core.percent(9);
					  //networkSeries.maxRadius = am4core.percent(8);
				  }else if(parseInt(i/4) == 1){				    
					  relationData[i].color = am4core.color("#dc67cf");
					  networkSeries.minRadius = am4core.percent(8);	
					  //networkSeries.maxRadius = am4core.percent(7);
				  }else if(parseInt(i/4) == 2){
					  relationData[i].color = am4core.color("#dd6789");
					  networkSeries.minRadius = am4core.percent(7);
					  //networkSeries.maxRadius = am4core.percent(6);
				  }else if(parseInt(i/4) == 3){
					  relationData[i].color = am4core.color("#a468dd");
					  networkSeries.minRadius = am4core.percent(6);	
					  //networkSeries.maxRadius = am4core.percent(5);
				  }else if(parseInt(i/4) == 4){
					  relationData[i].color = am4core.color("#6771dc");
					  networkSeries.minRadius = am4core.percent(5);	
					  //networkSeries.maxRadius = am4core.percent(4);
				  }else{
					  relationData[i].color = "#999999";
				  }
			};
			
			networkSeries.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			networkSeries.dataFields.name = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			networkSeries.dataFields.color = configData.dataFieldsColor;
			networkSeries.dataFields.children = configData.dataFieldsChildren;
			networkSeries.nodes.template.tooltipText = "{name}:{value}";
			networkSeries.fontSize = 12;
			networkSeries.centerStrength = 1;
			networkSeries.nodes.template.fillOpacity = 1;
			networkSeries.manyBodyStrength = -20;
			networkSeries.links.template.strength = 0.8;
			/*networkSeries.minRadius = am4core.percent(6);
			networkSeries.maxRadius = am4core.percent(4);*/
			/*networkSeries.nodes.maxRadius = am4core.percent(13);
			networkSeries.nodes.minRadius = am4core.percent(13);*/
			networkSeries.nodes.template.label.text = "{name}";
		},
		
		/*재정 대시보드*/
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 재정현황
		 * 민원 - 부서별 예산 현황
		 * 차트종류 : group barchart & line
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_statusDept : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			chart.colors.step = 2;
			chart.data = configData.data;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			chart.legend.labels.template.fontSize = 12;
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			
			chart.cursor = new am4charts.XYCursor();
			//color
			chart.colors.list = [
				  am4core.color("#5dbcfe"),
				  am4core.color("#fe8687"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.minGridDistance = 10;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 12; 
			yAxis.title.text = "(억원)";
			yAxis.title.fontSize = 12;  
			yAxis.title.dx = 50;
			yAxis.title.dy = -200;
			yAxis.title.rotation = 0;
			
			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue1, '예산액');
			createSeries(configData.dataFieldsValue2, '지출액');
			
			var yAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis2.renderer.opposite = true;
			yAxis2.renderer.fontSize = 12;
			yAxis2.syncWithAxis = yAxis;
			yAxis2.tooltip.disabled = true;
			
			var lineSeries = chart.series.push(new am4charts.LineSeries());
			lineSeries.dataFields.valueY = configData.dataFieldsValue3;
			lineSeries.dataFields.categoryX = configData.dataFieldsCategory;
			lineSeries.tooltipText = "{categoryX} 집행액 : {valueY}";
			lineSeries.yAxis = yAxis2;
			lineSeries.bullets.push(new am4charts.CircleBullet());
			//lineSeries.stroke = chart.colors.getIndex(13);
			lineSeries.strokeWidth = 2;
			lineSeries.snapTooltip = true;
			console.log("lineSeries : " , lineSeries)
			//lineSeries.renderer.fontSize = 10;
			lineSeries.name = "집행액";
			lineSeries.yAxis = yAxis2;
			lineSeries.stroke = am4core.color("#fffa84");
			lineSeries.fill = lineSeries.stroke;
			lineSeries.strokeWidth = 3;
			lineSeries.propertyFields.strokeDasharray = "lineDash";
			lineSeries.tooltip.label.textAlign = "middle";
			
			
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 재정현황
		 * 민원 - 분야 부문별 예산 현황 데이터
		 * 차트종류 : group barchart & line
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_statusSort : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			chart.colors.step = 2;
			chart.data = configData.data;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			chart.cursor = new am4charts.XYCursor();
			//color
			chart.colors.list = [
				  am4core.color("#5dbcfe"),
				  am4core.color("#fe8687"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			xAxis.renderer.minGridDistance = 10;
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 12; 
			yAxis.title.text = "(억원)";
			yAxis.title.fontSize = 12;  
			yAxis.title.dx = 50;
			yAxis.title.dy = -200;
			yAxis.title.rotation = 0;

			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue1, '예산액');
			createSeries(configData.dataFieldsValue2, '지출액');
			
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 재정현황
		 * 민원 - 부서별 집행현황
		 * 차트종류 : group barchart & line
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_statusExecution : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			chart.colors.step = 2;
			chart.data = configData.data;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.fontSize = 12;
			chart.legend.labels.template.maxWidth = 95
			chart.legend.useDefaultMarker = true;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			chart.cursor = new am4charts.XYCursor();
			//color
			chart.colors.list = [
				  am4core.color("#5dbcfe"),
				  am4core.color("#fe8687"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			xAxis.renderer.minGridDistance = 10;
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 12; 
			yAxis.title.text = "(억원)";
			yAxis.title.fontSize = 12;  
			yAxis.title.dx = 50;
			yAxis.title.dy = -200;
			yAxis.title.rotation = 0;
			
			
			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name;
			    series.columns.template.fontSize = 12; 
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue1, '예산액');
			createSeries(configData.dataFieldsValue2, '지출액');
			
			
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 재정현황
		 * 민원 - 부서별 계약현황
		 * 차트종류 : group barchart & line
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_statusContract : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);

			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			//chart.colors.step = 2;
			chart.data = configData.data;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			chart.cursor = new am4charts.XYCursor();
			
			//color
			chart.colors.list = [
				  am4core.color("#5dbcfe"),
				  am4core.color("#fe8687"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			xAxis.renderer.minGridDistance = 10;
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 12; 
			yAxis.title.text = "(억원)";
			yAxis.title.fontSize = 12;  
			yAxis.title.dx = 50;
			yAxis.title.dy = -200;
			yAxis.title.rotation = 0;
			
			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue1, '예산액');
			//createSeries(configData.dataFieldsValue2, '지출액');
			
			
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 신속집행
		 * 민원 - 부서별 신속집행
		 * 차트종류 : group barchart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_executionDept : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create axes
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				am4core.color("#5dbcff"),
				 am4core.color("#fe8687")
			]
			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.position = "right";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			//categoryAxis.numberFormatter.numberFormat = "#";
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.cellStartLocation = 0.1;
			categoryAxis.renderer.cellEndLocation = 0.9;
			categoryAxis.renderer.fontSize = 12;
			categoryAxis.renderer.minGridDistance = 10;
			
			var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
			valueAxis.renderer.opposite = true;
			valueAxis.renderer.ticks.template.strokeOpacity = 1;
			valueAxis.max = configData.max*1.2;
			valueAxis.renderer.fontSize = 12;
			valueAxis.title.text = "(억원)";
			valueAxis.title.align = "left";  
			valueAxis.title.fontSize = 12;  
			valueAxis.title.dx = -40;
			valueAxis.title.dy = 27;
			
			// Create series
			function createSeries(field, name) {
				console.log("field", field)
				console.log("name", name)
			  var series = chart.series.push(new am4charts.ColumnSeries());
			  series.dataFields.valueX = field;
			  series.dataFields.categoryY = configData.dataFieldsCategory;
			  series.name = name;
			  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
			  series.columns.template.height = am4core.percent(100);
			  series.columns.template.width = am4core.percent(60);
			  series.sequencedInterpolation = true;

			  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
			  valueLabel.label.text = "{valueX}";
			  valueLabel.label.fontSize = 12;
			  valueLabel.label.horizontalCenter = "left";
			  valueLabel.label.dx = 10;
			  valueLabel.label.hideOversized = false;
			  valueLabel.label.truncate = false;

			  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
			  //categoryLabel.label.text = name;
			  categoryLabel.label.fontSize = 12;
			  categoryLabel.label.horizontalCenter = "right";
			  categoryLabel.label.dx = -10;
			  categoryLabel.label.fill = am4core.color("#000");
			  categoryLabel.label.hideOversized = false;
			  categoryLabel.label.truncate = false;
			}
			console.log("configData : ", configData)
			createSeries(configData.dataFieldsValue1, "예산액");
			createSeries(configData.dataFieldsValue2, "지출액");
			//createSeries(configData.dataFieldsValue3, "Expenses");

			
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재정
		 * 하위 - 신속집행
		 * 민원 - 분야별 신속집행
		 * 차트종류 : group barchart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_fin_executionSort : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create axes
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				am4core.color("#5dbcff"),
				 am4core.color("#fe8687")
			]
			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.position = "right";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 20;
			marker.height = 20;
			
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			//categoryAxis.numberFormatter.numberFormat = "#";
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.fontSize = 12;
			categoryAxis.renderer.cellStartLocation = 0.1;
			categoryAxis.renderer.cellEndLocation = 0.9;
			categoryAxis.renderer.minGridDistance = 0;

			var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
			valueAxis.renderer.opposite = true;
			valueAxis.renderer.ticks.template.strokeOpacity = 1;
			valueAxis.renderer.fontSize = 12;
			valueAxis.max = configData.max*1.2;
			valueAxis.title.text = "(억원)";
			valueAxis.title.align = "left";  
			valueAxis.title.fontSize = 12;  
			valueAxis.title.dx = -40;
			valueAxis.title.dy = 27;
			// Create series
			function createSeries(field, name) {
				console.log("field", field)
				console.log("name", name)
			  var series = chart.series.push(new am4charts.ColumnSeries());
			  series.dataFields.valueX = field;
			  series.dataFields.categoryY = configData.dataFieldsCategory;
			  series.name = name;
			  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
			  series.columns.template.height = am4core.percent(100);
			  series.columns.template.width = am4core.percent(60);
			  series.sequencedInterpolation = true;

			  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
			  valueLabel.label.text = "{valueX}";
			  valueLabel.label.fontSize = 12;
			  valueLabel.label.horizontalCenter = "left";
			  valueLabel.label.dx = 10;
			  valueLabel.label.hideOversized = false;
			  valueLabel.label.truncate = false;

			  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
			  //categoryLabel.label.text = name;
			  categoryLabel.label.fontSize = 12;
			  categoryLabel.label.horizontalCenter = "right";
			  categoryLabel.label.dx = -10;
			  categoryLabel.label.fill = am4core.color("#000");
			  categoryLabel.label.hideOversized = false;
			  categoryLabel.label.truncate = false;
			}
			console.log("configData : ", configData)
			createSeries(configData.dataFieldsValue1, "예산액");
			createSeries(configData.dataFieldsValue2, "지출액");
			
		},
		/* 세입징수 현황 대시보드 */
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 세입 징수 현황
		 * 세입징수 현황 - 세입징수 현황
		 * 차트종류 : pie & subPie chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_statusPie : function(displayDivTagID, configData, returnCallBack){
			
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Themes end

			var container = am4core.create(displayDivTagID, am4core.Container);
			container.width = am4core.percent(90);
			container.height = am4core.percent(90);
			container.layout = "horizontal";


			var chart = container.createChild(am4charts.PieChart);

			// Add data
			chart.data = configData.data;

			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = configData.dataFieldsValue;
			pieSeries.dataFields.category = configData.dataFieldsCategory;
			pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
			//pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";
			pieSeries.labels.template.wrap = true;
			pieSeries.labels.template.fontSize = 11;
			pieSeries.slices.template.events.on("hit", function(event) {
			  selectSlice(event.target.dataItem);
			})

			var chart2 = container.createChild(am4charts.PieChart);
			chart2.width = am4core.percent(30);
			chart2.radius = am4core.percent(80);

			// Add and configure Series
			var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
			pieSeries2.dataFields.value = configData.dataFieldsValue2;
			pieSeries2.dataFields.category = configData.dataFieldsCategory2;
			pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
			//pieSeries2.labels.template.radius = am4core.percent(50);
			//pieSeries2.labels.template.inside = true;
			//pieSeries2.labels.template.fill = am4core.color("#ffffff");
			pieSeries2.labels.template.disabled = true;
			pieSeries2.ticks.template.disabled = true;
			pieSeries2.alignLabels = false;
			//pieSeries2.labels.template.wrap = true;
			pieSeries2.labels.template.fontSize = 11;
			//pieSeries2.events.on("positionchanged", updateLines);

			var interfaceColors = new am4core.InterfaceColorSet();

			var line1 = container.createChild(am4core.Line);
			line1.strokeDasharray = "2,2";
			line1.strokeOpacity = 0.5;
			line1.stroke = am4core.color("#ffffff");
			//line1.stroke = interfaceColors.getFor("alternativeBackground");
			line1.isMeasured = false;

			var line2 = container.createChild(am4core.Line);
			line2.strokeDasharray = "2,2";
			line2.strokeOpacity = 0.5;
			line2.stroke = am4core.color("#ffffff");
			//line2.stroke = interfaceColors.getFor("alternativeBackground");
			line2.isMeasured = false;


			var selectedSlice;

			function selectSlice(dataItem) {

			  selectedSlice = dataItem.slice;

			  var fill = selectedSlice.fill;

			  var count = dataItem.dataContext.sub.length;
			  pieSeries2.colors.list = [];
			  for (var i = 0; i < count; i++) {
			    pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
			  }

			  chart2.data = dataItem.dataContext.sub;
			  pieSeries2.appear();

			  var middleAngle = selectedSlice.middleAngle;
			  var firstAngle = pieSeries.slices.getIndex(0).startAngle;
			  var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
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

			    var p21 = { x: 0, y: -pieSeries2.pixelRadius };
			    var p22 = { x: 0, y: pieSeries2.pixelRadius };

			    p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
			    p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

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

			chart.events.on("datavalidated", function() {
			  setTimeout(function() {
			    selectSlice(pieSeries.dataItems.getIndex(0));
			  }, 1000);
			});

		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 세입 징수 현황
		 * 세입징수 현황 - 연도별 세입징수 추이 
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_statusYear : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#7883f7")
			]
			chart.paddingLeft = 0;
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			//categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			//categoryAxis.renderer.inversed = false;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.cellStartLocation = 0.1
			categoryAxis.renderer.cellEndLocation = 0.8;
			categoryAxis.renderer.labels.template.hideOversized = false;
			categoryAxis.renderer.labels.template.horizontalCenter = "middle";
			//categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(억)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 30;
		    valueAxis.title.dy = 10;
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryX = configData.dataFieldsCategory;
			series.dataFields.valueY = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryX} : {valueY}"+"억";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			//series.columns.template.column.cornerRadiusBottomRight = 5;
			//series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "middle";
			//labelBullet.label.dx = 15;
			labelBullet.label.dy = -10;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueY.value}";

			//categoryAxis.sortBySeries = series;
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 세입 징수 현황
		 * 세입징수 현황 - 항목별 세입징수 현황
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_statusMain : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#69c6f1")
			]
			chart.paddingLeft = 0;
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 30;
			//categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(억)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 30;
		    valueAxis.title.dy = 10;
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryX = configData.dataFieldsCategory;
			series.dataFields.valueY = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryX} : {valueY}"+"억";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			//series.columns.template.column.cornerRadiusBottomRight = 5;
			//series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "middle";
			//labelBullet.label.dx = 15;
			labelBullet.label.dy = -10;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueY.value}";

			categoryAxis.sortBySeries = series;
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 세입 징수 현황
		 * 세입징수 현황 - 전년대비 세목별 세입징수 현황 
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_statusSub : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			chart.colors.step = 2;
			chart.data = configData.data;
			chart.paddingLeft = 0;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 11;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 12;
			marker.height = 12;
			chart.cursor = new am4charts.XYCursor();
			//color
			chart.colors.list = [
				  am4core.color("#bababa"),
				  am4core.color("#67c7f1"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			xAxis.renderer.minGridDistance = 10;
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 10;
			yAxis.title.text = "(백만)";
			yAxis.title.fontSize = 11;  
			yAxis.title.dx = 35;
			yAxis.title.dy = -50;
			yAxis.title.rotation = 0;

			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue2, '전년');
			createSeries(configData.dataFieldsValue1, '현재');
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 수납및체납 현황
		 * 세입징수 현황 - 연도별 수납및체납 추이 
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_overdueYear : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#7883f7")
			]
			chart.paddingLeft = 0;
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			//categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			//categoryAxis.renderer.inversed = false;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.cellStartLocation = 0.1
			categoryAxis.renderer.cellEndLocation = 0.8;
			categoryAxis.renderer.labels.template.hideOversized = false;
			categoryAxis.renderer.labels.template.horizontalCenter = "middle";
			//categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(백만)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 30;
		    valueAxis.title.dy = 10;
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryX = configData.dataFieldsCategory;
			series.dataFields.valueY = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryX} : {valueY}";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			//series.columns.template.column.cornerRadiusBottomRight = 5;
			//series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "middle";
			//labelBullet.label.dx = 15;
			labelBullet.label.dy = -10;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueY.value}";

			//categoryAxis.sortBySeries = series;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 세입징수 현황
		 * 하위 - 수납및체납 현황
		 * 세입징수 현황 - 세목별 체납/수납 현황 
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_revn_overdueStatus : function(displayDivTagID, configData, returnCallBack){
			
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.paddingLeft = 40;
			chart.data = configData.data;
			
			//color
			chart.colors.list = [
				am4core.color("#70C61D"),
			]
			
			// Create axes
			var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			yAxis.dataFields.category = configData.dataFieldsCategory;
			yAxis.renderer.grid.template.locationX = 5;
			yAxis.renderer.labels.template.fontSize = 10;
			//yAxis.renderer.minGridDistance = 15;
			//yAxis.renderer.grid.template.location = 0;

			var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
			xAxis.renderer.fontSize = 10;
			xAxis.title.text = "(백만)";
			xAxis.title.fontSize = 11;  
			xAxis.title.dx = 35;
			xAxis.title.dy = -50;
			// Create series
			var series = chart.series.push(new am4charts.ColumnSeries());
			console.log("series.dataFields : ", series.dataFields)
			series.dataFields.valueX = configData.dataFieldsValue;
			//series.dataFields.label.dx = 30;
			series.dataFields.categoryY = configData.dataFieldsCategory;
			series.columns.template.tooltipText = "{categoryY}: {valueX}[/]";
			series.columns.template.strokeWidth = 0;
			//series.dataFields.valueXShow = "percent";
			
			//series.columns.template.locationX = 1;
			series.calculatePercent = true;
			//series.dataFields.valueXShow = "percent";
			var labelBullet = series.bullets.push(new am4charts.LabelBullet());
			labelBullet.label.dx = -5;
			labelBullet.label.horizontalCenter = "right";
			labelBullet.label.fontSize = 11;
			labelBullet.visible = true;
			//labelBullet.label.pixelX = 100 
			labelBullet.label.text = "{valueX}";
			// ({valueX.percent.formatNumber('#.0')}%)
			labelBullet.label.fill = am4core.color("#000000");
			
			//라벨 auto hidden 설정 제거
			labelBullet.label.truncate = false;
			labelBullet.label.hideOversized = false;

			var axisBreaks = {};
			var legendData = [];

			// Add ranges
			function addRange(label, start, end, color) {
			  var range = yAxis.axisRanges.create();
			  
			  range.category = start;
			  range.endCategory = end;
			  range.label.text = label;
			  range.label.disabled = false;
			  range.label.fill = color;
			  range.label.location = 0;
			  range.label.dx = -130;
			  range.label.dy = 12;
			  range.label.fontWeight = "bold";
			  range.label.fontSize = 10;
			  range.label.horizontalCenter = "left"
			  range.label.inside = true;
			  
			  range.grid.stroke = am4core.color("#396478");
			  range.grid.strokeOpacity = 1;
			  range.tick.length = 200;
			  range.tick.disabled = false;
			  range.tick.strokeOpacity = 0.6;
			  range.tick.stroke = am4core.color("#396478");
			  range.tick.location = 0;
			  
			  range.locations.category = 1;
			  var axisBreak = yAxis.axisBreaks.create();
			  axisBreak.startCategory = start;
			  axisBreak.endCategory = end;
			  axisBreak.breakSize = 1;
			  axisBreak.fillShape.disabled = true;
			  axisBreak.startLine.disabled = true;
			  axisBreak.endLine.disabled = true;
			  axisBreaks[label] = axisBreak;  

			  legendData.push({name:label, fill:color});
			}
			
			var data = configData.data;
			
			var admdName = [];
	    	for( var i = 0 ; i < data.length; i++ ){
	    		if( i < (data.length-1) && i > 0 ){
	    			if( data[i].admdNm != data[i+1].admdNm ) admdName.push(data[i].admdNm);
	    		}else if( i == 0 ){
	    			admdName.push(data[i].admdNm);
	    		}else{
	    			if( data[0].admdNm != data[data.length-1].admdNm ) admdName.push(data[i].admdNm);
	    		}
	    		
	    	}
	    	
	    	for( var j = 0 ; j < admdName.length; j++ ){
	    		var start = "";
	    		var end = "";
	    		
	    		for( var k = 0 ; k < data.length; k++ ){
	    			if( admdName[j] === data[k].admdNm ) {
	    				start = data[k].stacTp;
	    			}else{
	    				if( k != 0 ) end = data[k-1].stacTp;
	    			}
	    		}
	    		console.log("admdName[j] : ", admdName[j])
	    		addRange(admdName[j], start, end, chart.colors.getIndex(0));
	    		
	    	}
			//addRange(configData.dataFieldsCategory2, "New York", "West Virginia", chart.colors.getIndex(1));
			//addRange(configData.dataFieldsCategory2, "Florida", "South Carolina", chart.colors.getIndex(2));
			//addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

			//chart.cursor = new am4charts.XYCursor();


			//var legend = new am4charts.Legend();
			/*legend.position = "right";
			legend.scrollable = false;
			legend.valign = "top";
			legend.reverseOrder = true;*/

			/*chart.legend = legend;
			legend.data = legendData;

			legend.itemContainers.template.events.on("toggled", function(event){
			  var name = event.target.dataItem.dataContext.name;
			  var axisBreak = axisBreaks[name];
			  if(event.target.isActive){
			    axisBreak.animate({property:"breakSize", to:0}, 1000, am4core.ease.cubicOut);
			    yAxis.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.hide(1000, 500);
			      }
			    })
			    series.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.hide(1000, 0, 0, ["valueX"]);
			      }
			    })    
			  }
			  else{
			    axisBreak.animate({property:"breakSize", to:1}, 1000, am4core.ease.cubicOut);
			    yAxis.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.show(1000);
			      }
			    })  

			    series.dataItems.each(function(dataItem){
			      if(dataItem.dataContext.region == name){
			        dataItem.show(1000, 0, ["valueX"]);
			      }
			    })        
			  }
			})*/

		},
		/**
		 * 작성 : 김혜림
		 * 대쉬보드 - 복지현황
		 * 하위 - 노인복지시설별 비율 현황
		 * 차트종류 : Stacked Column Chart
		 * @param displayDivTagID : div ID
		 * @param data : chartData
		 * @param returnCallBack
		 * 
		 */
		dashBoard_welfare_oldWfFacilRatio : function(displayDivTagID, data, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = data;
			chart.paddingTop = 40;
			chart.colors.list = [
				am4core.color("#BFC5FF"),
				am4core.color("#A1A9FE"),
				am4core.color("#6065F7")
				];
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "cntType";
			categoryAxis.renderer.grid.template.location = 0;


			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.inside = false;
			valueAxis.renderer.labels.template.disabled = false;
			valueAxis.min = 0;

			valueAxis.renderer.minWidth = 50;
			valueAxis.min = 0;
			valueAxis.title.text = "(%)";
			valueAxis.title.fontSize = 11;  
			valueAxis.title.valign = "top";
			valueAxis.title.dx = 40;
			valueAxis.title.dy = -25;
			valueAxis.title.rotation = 0;


			function createSeries(field, name) {
				  
				  // Set up series
				  var series = chart.series.push(new am4charts.ColumnSeries());
				  series.name = name;
				  series.dataFields.valueY = field;
				  series.dataFields.categoryX = "cntType";
				  series.sequencedInterpolation = true;
				  
				  // Make it stacked
				  series.stacked = true;
				  
				  // Configure columns
				  series.columns.template.width = am4core.percent(60);
				  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {"+field+"cnt}";
				  // Add label
				  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
				  labelBullet.label.text = "{valueY}%";
				  labelBullet.locationY = 0.5;
				  labelBullet.label.hideOversized = true;
				  
				  return series;
			}

			createSeries("val1", "노인의료");
			createSeries("val2", "재가노인");
			createSeries("val3", "노인여가");
			
			chart.legend = new am4charts.Legend();
//			chart.legend.contentHeight = 20;
			chart.legend.labels.template.fontSize = 14;
//			chart.legend.width = 70;
			chart.legend.useDefaultMarker = true;

			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
		},
		
		/**
		 * 작성 : 김혜림
		 * 대쉬보드 - 복지현황
		 * 하위 - 유형별 유치원 정원 수, 유형별 어린이집 정원 수
		 * 차트종류 : Donut chart
		 * @param displayDivTagID : div ID
		 * @param data : chartData
		 * @param returnCallBack
		 * 
		 */
		dashBoard_welfare_kndgnLimit : function(displayDivTagID, data, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.PieChart);
			chart.data = data;
			
			// Set inner radius
			chart.innerRadius = am4core.percent(50);

			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "val1";
			pieSeries.dataFields.category = "faciltype";
			pieSeries.slices.template.tooltipText = "{category}: {value.percent.formatNumber('#.#')}% ({val1})";
			pieSeries.slices.template.stroke = am4core.color("#000");
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;
			pieSeries.labels.template.fontSize = 10;
			pieSeries.labels.template.fill = am4core.color("white");
			
			//라벨 연결하는 선
			pieSeries.ticks.template.stroke = am4core.color("white");
			pieSeries.ticks.template.strokeOpacity = 0.5;
			
//			pieSeries.alignLabels = false;
			pieSeries.name = name;

			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;

			//색 설정
			chart.colors.list = [
				am4core.color("#FFF001"),
				am4core.color("#FFB900")
				];
			pieSeries.slices.template.adapter.add("fill", function(fill, target) {
				return chart.colors.getIndex(target.dataItem.index);
			});
//			chart.legend = new am4charts.Legend();
			
		},
		
		/**
		 * 작성 : 김혜림
		 * 대쉬보드 - 복지현황
		 * 하위 - 유형별 어린이집 정원 수
		 * 차트종류 : Column Chart
		 * @param displayDivTagID : div ID
		 * @param data : chartData
		 * @param returnCallBack
		 * 
		 */
		dashBoard_welfare_nurseryLimit : function(displayDivTagID, data, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = data;
			chart.paddingTop = 40;

			// Create axes
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "faciltype";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 30;
			categoryAxis.renderer.labels.template.horizontalCenter = "middle";
			categoryAxis.renderer.labels.template.verticalCenter = "middle";
			categoryAxis.renderer.labels.template.fontSize = 12;
			// categoryAxis.renderer.labels.template.rotation = 270;
			categoryAxis.tooltip.disabled = true;
			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			
			valueAxis.renderer.minWidth = 50;
			valueAxis.renderer.minGridDistance = 20;
			valueAxis.min = 0;
			
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 11;  
			valueAxis.title.valign = "top";
			valueAxis.title.dx = 50;
			valueAxis.title.dy = -30;
			valueAxis.title.rotation = 0;

//			valueAxis.min = 500;
//			valueAxis.max = 1500; 
			
			// Create series
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.sequencedInterpolation = true;
			series.dataFields.valueY = "val1";
//			series.name = "faciltype";
			series.dataFields.categoryX = "faciltype";
			series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
			series.columns.template.strokeWidth = 0;

			series.tooltip.pointerOrientation = "vertical";

//			series.columns.template.column.cornerRadiusTopLeft = 10;
//			series.columns.template.column.cornerRadiusTopRight = 10;
			series.columns.template.column.fillOpacity = 1;
			series.columns.template.width = am4core.percent(30);//series 그리드 너비 조정

			//색 설정
			chart.colors.list = [
				  am4core.color("#419BE7"),
				  am4core.color("#D9FF86"),
				  am4core.color("#66CAC2"),
				  am4core.color("#2BDABB"),
				  am4core.color("#CADC2E"),
				  am4core.color("#5BCF5E"),
				  am4core.color("#8BD38D")
				];
			series.columns.template.adapter.add("fill", function(fill, target) {
				return chart.colors.getIndex(target.dataItem.index);
			});

			// Cursor
			chart.cursor = new am4charts.XYCursor();
			// 차트 드래그로 zoom 되는 것 막기
			chart.cursor.behavior = "none";
			
			// 축 툴팁 안 나타나게 설정
			valueAxis.cursorTooltipEnabled = false;
			valueAxis.cursorTooltipEnabled = false;
			
			// 커서 움직일 때 선 안 나오게 설정
			chart.cursor.lineX.strokeWidth = 0;
			chart.cursor.lineY.strokeWidth = 0;

			chart.legend = new am4charts.Legend();
			series.events.on("ready", function(ev) {
				  var legenddata = [];
				  series.columns.each(function(column) {
				    legenddata.push({
				      name: column.dataItem.categoryX,
				      fill: column.fill
				    });
				  });
				  chart.legend.data = legenddata;
				});
			chart.legend.itemContainers.template.clickable = false;
			chart.legend.itemContainers.template.focusable = false;
			chart.legend.labels.template.fontSize = 12;
			chart.legend.maxHeight = 250;
			chart.legend.scrollable = true;
		},
		
		/**
		 * 작성 : 김혜림
		 * 대쉬보드 - 복지현황
		 * 하위 - 장애정도별 수급자 수, 연령별 수급자 수
		 * 차트종류 : Column Chart
		 * @param displayDivTagID : div ID
		 * @param data : chartData
		 * @param returnCallBack
		 * 
		 */
		dashBoard_welfare_disCnt : function(displayDivTagID, data, color, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = data;
			chart.paddingTop = 40;

			//색 설정
			chart.colors.list = [
				am4core.color(color),
				];
			// Create axes
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "faciltype";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 30;
			categoryAxis.renderer.labels.template.horizontalCenter = "middle";
			categoryAxis.renderer.labels.template.verticalCenter = "middle";
			categoryAxis.renderer.labels.template.fontSize = 12;
			// categoryAxis.renderer.labels.template.rotation = 270;
			categoryAxis.tooltip.disabled = true;
			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.labels.template.fontSize = 12;
			valueAxis.renderer.minWidth = 50;
			valueAxis.min = 0;
			valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 11;  
			valueAxis.title.valign = "top";
			valueAxis.title.dx = 50;
			valueAxis.title.dy = -30;
			valueAxis.title.rotation = 0;

			// Create series
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.sequencedInterpolation = true;
			series.dataFields.valueY = "val1";
//			series.name = "faciltype";
			series.dataFields.categoryX = "faciltype";
			series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
			series.columns.template.strokeWidth = 0;

			series.tooltip.pointerOrientation = "vertical";

//			series.columns.template.column.cornerRadiusTopLeft = 10;
//			series.columns.template.column.cornerRadiusTopRight = 10;
			series.columns.template.column.fillOpacity = 1;
			series.columns.template.width = am4core.percent(30);//series 그리드 너비 조정

//			series.columns.template.adapter.add("fill", function(fill, target) {
//				return chart.colors.getIndex(target.dataItem.index);
//			});

			// Cursor
			chart.cursor = new am4charts.XYCursor();
			// 차트 드래그로 zoom 되는 것 막기
			chart.cursor.behavior = "none";
			
			// 축 툴팁 안 나타나게 설정
			valueAxis.cursorTooltipEnabled = false;
			valueAxis.cursorTooltipEnabled = false;
			
			// 커서 움직일 때 선 안 나오게 설정
			chart.cursor.lineX.strokeWidth = 0;
			chart.cursor.lineY.strokeWidth = 0;

		},
		
		/**          수질현황     **/
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 수질현황 현황
		 * 하위 - 누적 수질현황 현황
		 * 누적 수질현황 - 잔류염소 현황 
		 * 차트종류 : line chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_water_qualityTotalCh : function(displayDivTagID, configData, returnCallBack){
			
			// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated)
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#96e253"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			/* Remove square from marker template */
			//chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	dateAxis.dateFormats.setKey("year", "yy시");
	    	//dateAxis.dateFormats.setKey("hour", "hh");
	    	/*dateAxis.gridIntervals.setAll([
	    		  { timeUnit: "hour", count: 1 },
	    		  { timeUnit: "hour", count: 20 }
	    		]);*/
	    	//dateAxis.renderer.dx = -0.5; 
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(mg/L)";
			valueAxis.title.fontSize = 10;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.columns.template.fontSize = 12;
	    		  series.tooltip.label.minHeight = 20;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  var bullet = series.bullets.push(new am4charts.CircleBullet());
    		      //bullet.circle.stroke = interfaceColors.getFor("background");
    		      bullet.circle.strokeWidth = 2;
	    		  
	    		  
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue, "잔류염소");

		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 수질현황 현황
		 * 하위 - 누적 수질현황 현황
		 * 누적 수질현황 - 산성도 현황 
		 * 차트종류 : line chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_water_qualityTotalAc : function(displayDivTagID, configData, returnCallBack){
			
			// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#5ec1ca"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			/* Remove square from marker template */
			//chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	//dateAxis.renderer.dx = -0.5;
	    	dateAxis.dateFormats.setKey("year", "yy시");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "(ph)";
			valueAxis.title.fontSize = 10;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.columns.template.fontSize = 12;
	    		  series.tooltip.label.minHeight = 20;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  var bullet = series.bullets.push(new am4charts.CircleBullet());
    		      //bullet.circle.stroke = interfaceColors.getFor("background");
    		      bullet.circle.strokeWidth = 2;
	    		  
	    		  
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue2, "산성도");
			
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 수질현황 현황
		 * 하위 - 누적 수질현황 현황
		 * 누적 수질현황 - 탁도 현황 
		 * 차트종류 : line chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_water_qualityTotalTu : function(displayDivTagID, configData, returnCallBack){
			
			// Themes begin
	    	am4core.useTheme(am4themes_dark);
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#c6b660"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			/* Remove square from marker template */
			//chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	//dateAxis.renderer.dx = -0.5;
	    	dateAxis.dateFormats.setKey("year", "yy시");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			valueAxis.title.text = "";
			valueAxis.title.fontSize = 10;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  //series.tooltip.label.minWidth = 40;
	    		  //series.columns.template.fontSize = 12;
	    		  series.tooltip.label.minHeight = 20;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  var bullet = series.bullets.push(new am4charts.CircleBullet());
    		      //bullet.circle.stroke = interfaceColors.getFor("background");
    		      bullet.circle.strokeWidth = 2;
	    		  
	    		  
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue3, "탁도");
			
		},
		// 공통 바 차트
		createBarChart: function(params) {
			if( params.style && params.style.width ) $("#"+params.elementId).width(params.style.width);
			if( params.style && params.style.height ) $("#"+params.elementId).height(params.style.height);
			
			if( params.animated ) am4core.useTheme(am4themes_animated);
			if( params.theme && params.theme == 'dark') {
				am4core.useTheme(am4themes_dark);
			}
			
			var chart = am4core.create(params.elementId, am4charts.XYChart);
			if( params.style && params.style.paddingTop ) chart.paddingTop = params.style.paddingTop;

			//chart.colors.step = 2;
			if( params.style && params.style.fontFamily ) chart.fontFamily = params.style.fontFamily;
			
			// 폰트 사이즈
			if( params.style && params.style.fontSize ) {
				chart.fontSize = params.style.fontSize;
			}
			
			// 배경 컬러 지정
			if( params.style && params.style.background ) {
				chart.background.fill = params.style.background;			
			}
			
			// 컬러 지정
			if( params.colors) {
				$.each(params.colors, function(index, color) {
					chart.colors.list.push(am4core.color(color));
				});			
			}
			
			if( params.legend && params.legend.visible ) {
				chart.legend = new am4charts.Legend();
				chart.legend.useDefaultMarker = true;
				if( params.legend.position ) chart.legend.position = params.legend.position;
				chart.legend.scrollable = true;
				
				var marker = chart.legend.markers.template.children.getIndex(0);
				marker.cornerRadius(5, 5, 5, 5);
				marker.strokeWidth = 1;
				marker.strokeOpacity = 1;
				marker.stroke = am4core.color("#ccc");
				marker.width = 20;
				marker.height = 20;
			}
			
			var xAxis;
			if( !params.reverse ) {
				xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			}
			else {
				xAxis = chart.yAxes.push(new am4charts.CategoryAxis())
				xAxis.renderer.inversed = true;
			}
			xAxis.dataFields.category = params.xCategory
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.9
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.minGridDistance = 30;
			
			var yAxis;
			if( !params.reverse ) {
				yAxis = chart.yAxes.push(new am4charts.ValueAxis());
				yAxis.min = 0;	// y축 최소값
				yAxis.renderer.minGridDistance = 50;	// y축 간격
				if( params.unit ) yAxis.title.text="( " + params.unit + " )";
				yAxis.title.rotation = 0;
				yAxis.title.align = "center";
				yAxis.title.valign = "top";
				yAxis.title.dx = -7;
				if( params.style.yAxis_dy ) yAxis.title.dy = params.style.yAxis_dy;
				else yAxis.title.dy = -30;
				
				yAxis.title.align = "right";
				yAxis.title.valign = "top";
				yAxis.layout = "absolute";
				yAxis.extraMax = 0.05;
			}
			else {
				yAxis = chart.xAxes.push(new am4charts.ValueAxis());
				yAxis.renderer.minGridDistance = 30;	// y축 간격
				xAxis.renderer.minGridDistance = 1;
				yAxis.renderer.minGridDistance = 70;	// y축 간격
				if( params.unit ) yAxis.title.text="( " + params.unit + " )";
				
				yAxis.title.align = "right";
				yAxis.title.valign = "top";
				yAxis.layout = "absolute";
				yAxis.extraMax = 0.05;
				//yAxis.title.dx = -7;
				yAxis.title.dy = 25;
			}
			

			if( params.style.fontColor ) {
				xAxis.title.fill = am4core.color(params.style.fontColor);
				yAxis.title.fill = am4core.color(params.style.fontColor);
				xAxis.renderer.labels.template.fill = am4core.color(params.style.fontColor);
				yAxis.renderer.labels.template.fill = am4core.color(params.style.fontColor);
			}
			if( params.style.gridColor ) {
				xAxis.renderer.grid.template.stroke = am4core.color(params.style.gridColor);
				xAxis.renderer.grid.template.strokeOpacity = 1;
				yAxis.renderer.grid.template.stroke = am4core.color(params.style.gridColor);
				yAxis.renderer.grid.template.strokeOpacity = 1;
			}

			chart.data = params.data;
			for( var i=0;i<	params.series.length;i++ ) {
				createSeries(params.series[i]);
			}
			
			function createSeries(item) {
				var series = chart.series.push(new am4charts.ColumnSeries())
				series.name = item.name;
				series.columns.template.tooltipHTML = item.tooltip
				series.columns.template.events.on("hit", function(event) {
					console.log("params", params.clickEvent)
					if( params.clickEvent ) params.clickEvent.call(this, event);
				}, this);

				//series.tooltip.getFillFromObject = false;
				if( item.fill ) {
					series.tooltip.background.fill = am4core.color(item.fill);
				}
				if( item.stroke ) {
					series.tooltip.background.stroke = am4core.color(item.stroke);
				}

				series.events.on("hidden", arrangeColumns);
				series.events.on("shown", arrangeColumns);
				//series.hiddenInLegend = true;
				
				if( params.stacked ) series.stacked = params.stacked;

				var bullet = series.bullets.push(new am4charts.LabelBullet())
				bullet.interactionsEnabled = false;
				if( params.style.fontColor ) bullet.label.fill = am4core.color(params.style.fontColor)
				bullet.label.truncate = false;
				bullet.label.hideOversized = false;

				if( !params.reverse ) {
					//bullet.dy = -15;
					//bullet.locationY = 0.5;
					bullet.label.text = '{valueY}';
					series.dataFields.valueY = item.value;
					series.dataFields.categoryX = params.xCategory;
					series.columns.template.events.on("sizechanged", function (ev) {
						if (ev.target.dataItem && ev.target.dataItem.bullets) {
							var height = ev.target.pixelHeight;
							ev.target.dataItem.bullets.each(function(id, bullet) {
								var pixelHeight = chart.pixelHeight-120;
								if( params.legend.visible ) pixelHeight -= 50;
								if (height > pixelHeight) {
									bullet.locationY = 0.5;
									bullet.dy = 0;
								}
								else {
									bullet.locationY = 0;
									bullet.dy = -15;
								}
							});
						}
					});
				}
				else {
					//bullet.dx = -15;
					bullet.label.text = '{valueX}';
					series.dataFields.valueX = item.value;
					series.dataFields.categoryY = params.xCategory;
				}
				
				return series;
			}

			function arrangeColumns() {

				var series = chart.series.getIndex(0);

				var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
				if (series.dataItems.length > 1) {
					var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
					var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
					var delta = ((x1 - x0) / chart.series.length) * w;
					if (am4core.isNumber(delta)) {
						var middle = chart.series.length / 2;

						var newIndex = 0;
						chart.series.each(function(series) {
							if (!series.isHidden && !series.isHiding) {
								series.dummyData = newIndex;
								newIndex++;
							}
							else {
								series.dummyData = chart.series.indexOf(series);
							}
						})
						var visibleCount = newIndex;
						var newMiddle = visibleCount / 2;

						chart.series.each(function(series) {
							var trueIndex = chart.series.indexOf(series);
							var newIndex = series.dummyData;

							var dx = (newIndex - trueIndex + middle - newMiddle) * delta

							series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
							series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
						})
					}
				}
			}
			return chart;
		},
		// 공통 라인 차트
		createLineChart: function(params) {
			if( params.style && params.style.width ) $("#"+params.elementId).width(params.style.width);
			if( params.style && params.style.height ) $("#"+params.elementId).height(params.style.height);
			
			if( params.animated ) am4core.useTheme(am4themes_animated);
			
			var chart = am4core.create(params.elementId, am4charts.XYChart)
			//chart.colors.step = 2;
			
			if( params.style && params.style.fontFamily ) chart.fontFamily = params.style.fontFamily;

			// 폰트 사이즈
			if( params.style.fontSize ) {
				chart.fontSize = params.style.fontSize;
			}
			
			// 배경 컬러 지정
			if( params.style && params.style.background ) {
				chart.background.fill = params.style.background;			
			}
			
			// 컬러 지정
			if( params.colors) {
				$.each(params.colors, function(index, color) {
					chart.colors.list.push(am4core.color(color));
				});			
			}
			
			if( params.legend && params.legend.visible ) {
				chart.legend = new am4charts.Legend();
				if( params.legend.position ) chart.legend.position = params.legend.position;
				if( params.legend.template ) chart.legend.labels.template.text = params.legend.template;
				chart.legend.scrollable = true;
			}
			
			var xAxis = chart.xAxes.push(new am4charts.DateAxis());
			xAxis.renderer.minGridDistance = 1

			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			if( params.unit ) yAxis.title.text="( " + params.unit + " )";
			yAxis.title.rotation = 0;
			yAxis.title.align = "right";
			yAxis.title.valign = "top";
			yAxis.title.dx = -7;
			yAxis.title.dy = -17;

			yAxis.title.align = "right";
			yAxis.title.valign = "top";
			yAxis.layout = "absolute";
			yAxis.extraMax = 0.05;

			if( params.style.fontSize ) {
				xAxis.tooltip.label.fontSize = params.style.fontSize;
				yAxis.tooltip.label.fontSize = params.style.fontSize;
			}
			
			if( params.style.fontColor ) {
				xAxis.title.fill = am4core.color(params.style.fontColor);
				yAxis.title.fill = am4core.color(params.style.fontColor);
				xAxis.renderer.labels.template.fill = am4core.color(params.style.fontColor);
				yAxis.renderer.labels.template.fill = am4core.color(params.style.fontColor);
			}
			if( params.style.gridColor ) {
				xAxis.renderer.grid.template.stroke = am4core.color(params.style.gridColor);
				xAxis.renderer.grid.template.strokeOpacity = 1;
				yAxis.renderer.grid.template.stroke = am4core.color(params.style.gridColor);
				yAxis.renderer.grid.template.strokeOpacity = 1;
				
			}
			if( params.xAxisFormat ) xAxis.dateFormats.setKey("year", params.xAxisFormat);
			for( var i=0;i<	params.series.length;i++ ) {
				createSeries(params.series[i]);
			}
			
			chart.cursor = new am4charts.XYCursor();
			chart.cursor.xAxis = xAxis;
			chart.data = params.data;
			
			function createSeries(item) {
				// Create series
				var series = chart.series.push(new am4charts.LineSeries());
				series.dataFields.valueY = item.value;
				series.dataFields.dateX = item.category;
				series.tooltipHTML = item.tooltip;
				series.name = item.name;
				series.tooltip.pointerOrientation = "vertical";

				//series.bullets.push(new am4charts.CircleBullet());
				//series.strokeWidth = 2;
//				series.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
//				series.strokeOpacity = 0.5;

				//series.tooltip.getFillFromObject = false;
				if( item.fill ) {
					series.tooltip.background.fill = am4core.color(item.fill);
				}
				if( item.stroke ) {
					series.tooltip.background.stroke = am4core.color(item.stroke);
				}
			}
			return chart;
		},
		// 공통 레이더 차트
		createRadarChart: function(params) {
			if( params.style && params.style.width ) $("#"+params.elementId).width(params.style.width);
			if( params.style && params.style.height ) $("#"+params.elementId).height(params.style.height);
			
			if( params.animated ) am4core.useTheme(am4themes_animated);
			
			var chart = am4core.create(params.elementId, am4charts.RadarChart)
			//chart.colors.step = 2;
			
			if( params.style && params.style.fontFamily ) chart.fontFamily = params.style.fontFamily;
			
			// 폰트 사이즈
			if( params.style && params.style.fontSize ) {
				chart.fontSize = params.style.fontSize;
			}
			
			chart.data = params.data;
			
			chart.startAngle = -90;
			chart.endAngle = 180;
			chart.innerRadius = am4core.percent(20);

			// Set number format
			chart.numberFormatter.numberFormat = "#.#'%'";

			// Create axes
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "category";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.grid.template.strokeOpacity = 0;
			categoryAxis.renderer.labels.template.horizontalCenter = "right";
			categoryAxis.renderer.labels.template.fontWeight = 500;
			categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
				return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
			});
			categoryAxis.renderer.minGridDistance = 10;

			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.grid.template.strokeOpacity = 0;
			valueAxis.min = 0;
			valueAxis.max = 100;
			valueAxis.strictMinMax = true;

			// Create series
			var series1 = chart.series.push(new am4charts.RadarColumnSeries());
			
			series1.clustered = false;
			series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
			series1.columns.template.fillOpacity = 0.08;
			series1.columns.template.cornerRadiusTopLeft = 20;
			series1.columns.template.strokeWidth = 0;
			series1.columns.template.radarColumn.cornerRadius = 20;

			var series2 = chart.series.push(new am4charts.RadarColumnSeries());
			if( params.dataFields ) {
				if( params.dataFields.value ) series1.dataFields.valueX = params.dataFields.value;
				if( params.dataFields.category ) series1.dataFields.categoryY = params.dataFields.category;
				if( params.dataFields.value ) series2.dataFields.valueX = params.dataFields.value;
				if( params.dataFields.category ) series2.dataFields.categoryY = params.dataFields.category;
				if( params.dataFields.tooltip ) series2.tooltipText = params.dataFields.tooltip;
			}
			
			series2.clustered = false;
			series2.columns.template.strokeWidth = 0;
			series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
			series2.columns.template.radarColumn.cornerRadius = 20;

			series2.columns.template.adapter.add("fill", function(fill, target) {
			  return chart.colors.getIndex(target.dataItem.index);
			});

			if( params.style.fontSize ) {
				categoryAxis.tooltip.label.fontSize = params.style.fontSize;
				valueAxis.tooltip.label.fontSize = params.style.fontSize;
				series1.tooltip.label.fontSize = params.style.fontSize;
				series2.tooltip.label.fontSize = params.style.fontSize;
			}
			
			// Add cursor
			chart.cursor = new am4charts.RadarCursor();
			return chart;
		},
		createPieBarChart: function(params) {
			if( params.style && params.style.width ) $("#"+params.elementId).width(params.style.width);
			if( params.style && params.style.height ) $("#"+params.elementId).height(params.style.height);

			if( params.animated ) am4core.useTheme(am4themes_animated);
			
			if( params.theme && params.theme == 'dark') {
				am4core.useTheme(am4themes_dark);
			}
			
			var chart = am4core.create(params.elementId, am4core.Container);
			chart.width = am4core.percent(100);
			chart.height = am4core.percent(100);
			chart.layout = "horizontal";

			// 폰트 사이즈
			if( params.style && params.style.fontSize ) {
				chart.fontSize = params.style.fontSize;
			}
			
			/**
			 * Column chart
			 */

			// Create chart instance
			var columnChart = chart.createChild(am4charts.XYChart);

			// Create axes
			var categoryAxis = columnChart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "category";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.minGridDistance = 10;

			var valueAxis = columnChart.xAxes.push(new am4charts.ValueAxis());

			// Create series
			var columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
			columnSeries.dataFields.valueX = "value";
			columnSeries.dataFields.categoryY = "category";
			columnSeries.columns.template.strokeWidth = 0;
			columnSeries.columns.template.tooltipHTML = "<span style='font-size:12px;font-weight:bold;'>{category}: {value}억원</span>";

			// Create chart instance
			var pieChart = chart.createChild(am4charts.PieChart);
			pieChart.data = params.data;
			pieChart.innerRadius = am4core.percent(50);

			// Add and configure Series
			var pieSeries = pieChart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "value";
			pieSeries.dataFields.category = "category";
			pieSeries.slices.template.propertyFields.fill = "color";
			pieSeries.labels.template.disabled = true;

			// Set up labels
			var label1 = pieChart.seriesContainer.createChild(am4core.Label);
			label1.text = "";
			label1.horizontalCenter = "middle";
			label1.fontSize = 35;
			label1.fontWeight = 600;
			label1.dy = -30;

			var label2 = pieChart.seriesContainer.createChild(am4core.Label);
			label2.text = "";
			label2.horizontalCenter = "middle";
			label2.fontSize = 12;
			label2.dy = 20;

			// Auto-select first slice on load
			pieChart.events.on("ready", function(ev) {
				pieSeries.slices.getIndex(0).isActive = true;
			});

			// Set up toggling events
			pieSeries.slices.template.events.on("toggled", function(ev) {
			  if (ev.target.isActive) {
			    
			    // Untoggle other slices
			    pieSeries.slices.each(function(slice) {
			      if (slice != ev.target) {
			        slice.isActive = false;
			      }
			    });
			    
			    // Update column chart
			    columnSeries.appeared = false;
			    columnChart.data = ev.target.dataItem.dataContext.breakdown;
			    columnSeries.fill = ev.target.fill;
			    columnSeries.reinit();
			    
			    // Update labels
			    label1.text = pieChart.numberFormatter.format(ev.target.dataItem.values.value.percent, "#.'%'");
			    label1.fill = ev.target.fill;
			    
			    label2.text = ev.target.dataItem.category;
			  }
			});
		},
		// 공통 파이 차트
		createPieChart: function(params) {
			if( params.style && params.style.width ) $("#"+params.elementId).width(params.style.width);
			if( params.style && params.style.height ) $("#"+params.elementId).height(params.style.height);
			
			if( params.animated ) am4core.useTheme(am4themes_animated);
			
			var chart = am4core.create(params.elementId, am4charts.PieChart)
			//chart.colors.step = 2;
			
			if( params.style && params.style.fontFamily ) chart.fontFamily = params.style.fontFamily;
			
			if( params.style && params.style.innerRadius ) {
				chart.innerRadius = params.style.innerRadius;			
			}
			
			if( params.style && params.style.radius ) {
				chart.radius = params.style.radius;
			}
			
			// 폰트 사이즈
			if( params.style && params.style.fontSize ) {
				chart.fontSize = params.style.fontSize;
			}
			
			// 배경 컬러 지정
			if( params.style && params.style.background ) {
				chart.background.fill = params.style.background;			
			}
			
			// 컬러 지정
			if( params.colors) {
				$.each(params.colors, function(index, color) {
					chart.colors.list.push(am4core.color(color));
				});			
			}
			
			// Add data
			chart.data = params.data;
			
			if( params.title && params.title.text ) {
				var label = chart.seriesContainer.createChild(am4core.Label);
				label.text = params.title.text;
				label.horizontalCenter = "middle";
				label.verticalCenter = "middle";
				if( params.title.size) label.fontSize = params.title.size;
			}

			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			
			if( params.dataFields ) {
				if( params.dataFields.value ) pieSeries.dataFields.value = params.dataFields.value;
				if( params.dataFields.category ) pieSeries.dataFields.category = params.dataFields.category;
				if( params.dataFields.tooltip ) pieSeries.tooltipText = params.dataFields.tooltip;
			}
			
			pieSeries.slices.template.stroke = am4core.color("#fff");
			
			pieSeries.slices.template.strokeOpacity = 1;
			if( params.style.fontSize ) {
				pieSeries.tooltip.label.fontSize = params.style.fontSize;
				pieSeries.tooltip.label.fontSize = params.style.fontSize;
			}
			
			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;

			pieSeries.labels.template.maxWidth = 130;
			pieSeries.labels.template.wrap = true;
			
			chart.hiddenState.properties.radius = am4core.percent(0);
			
			if( params.legend && params.legend.visible ) {
				chart.legend = new am4charts.Legend();
				if( params.legend.position ) chart.legend.position = params.legend.position;
				if( params.legend.template ) chart.legend.labels.template.text = params.legend.template;
				chart.legend.scrollable = true;
				
				var marker = chart.legend.markers.template.children.getIndex(0);
				marker.cornerRadius(2, 2, 2, 2);
				marker.strokeWidth = 2;
				marker.strokeOpacity = 1;
				marker.stroke = am4core.color("#ccc");
				marker.width = 20;
				marker.height = 20;
			}
			return chart;
		},
		/**     재난현황     **/
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재난현황 현황
		 * 하위 - 재난현황 현황
		 * 재난 유형별 구조수 데이터 조회
		 * 차트종류 : pie chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_cala_caseCnt : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.PieChart3D);
			
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			chart.legend = new am4charts.Legend();
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			// Chart 데이터를 Parameter로 받아 설정한다
			chart.data = configData.data;
			
			
			chart.innerRadius = 100;
			var series = chart.series.push(new am4charts.PieSeries3D());
			series.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			series.dataFields.category = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			

			
			series.colors.list = [
				 am4core.color("#67b7dc"), 
				 am4core.color("#6794dc"), 
				 am4core.color("#6771dc"), 
				 am4core.color("#8067dc"), 
				 am4core.color("#a367dc"), 
				 am4core.color("#c767dc"), 
				 am4core.color("#d564cb"), 
			]
			
			return chart;
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재난현황 현황
		 * 하위 - 재난현황 현황
		 * 재난 발화장소별 화재 발생 누적현황
		 * 차트종류 : pie chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_cala_placeTotal : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.PieChart);
			
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			chart.legend = new am4charts.Legend();
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			chart.legend.labels.template.fontSize = 12;
			chart.legend.maxHeight = 100;
			chart.legend.scrollable = true;
			// Chart 데이터를 Parameter로 받아 설정한다
			chart.data = configData.data;
			
			
			//chart.innerRadius = 100;
			var series = chart.series.push(new am4charts.PieSeries());
			series.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			series.dataFields.category = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			series.slices.template.stroke = am4core.color("#fff");
			series.slices.template.strokeWidth = 2;
			series.slices.template.strokeOpacity = 1;
			series.labels.template.wrap = true;
			series.labels.template.fontSize = 11;
			
			series.colors.list = [
				 am4core.color("#67b7dc"), 
				 am4core.color("#6794dc"), 
				 am4core.color("#6771dc"), 
				 am4core.color("#8067dc"), 
				 am4core.color("#a367dc"), 
				 am4core.color("#c767dc"), 
				 am4core.color("#d564cb"), 
			]
			
			return chart;
		},
		
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 재난현황 현황
		 * 하위 - 재난현황 현황
		 * 재난 발화장소별 화재 발생 누적현황
		 * 차트종류 : pie chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_cala_factorTotal : function(displayDivTagID, configData, returnCallBack){
			// Themes begin
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.PieChart);
			
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			chart.legend = new am4charts.Legend();
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			chart.legend.labels.template.fontSize = 12;
			chart.legend.maxHeight = 100;
			chart.legend.scrollable = true;
			// Chart 데이터를 Parameter로 받아 설정한다
			chart.data = configData.data;
			
			
			//chart.innerRadius = 100;
			var series = chart.series.push(new am4charts.PieSeries());
			series.dataFields.value = configData.dataFieldsValue;				// Parameter로 DataField Value 값 설정
			series.dataFields.category = configData.dataFieldsCategory;			// Parameter로 DataField Category 값 설정
			series.slices.template.stroke = am4core.color("#fff");
			series.slices.template.strokeWidth = 2;
			series.slices.template.strokeOpacity = 1;
			series.labels.template.wrap = true;
			series.labels.template.fontSize = 11;
			
			series.colors.list = [
				 am4core.color("#67b7dc"), 
				 am4core.color("#6794dc"), 
				 am4core.color("#6771dc"), 
				 am4core.color("#8067dc"), 
				 am4core.color("#a367dc"), 
				 am4core.color("#c767dc"), 
				 am4core.color("#d564cb"), 
			]
			
			return chart;
		},
		/**
		 * 작성 : 김부권
		 * 대쉬보드 - 도시 통계 지표 현황
		 * 하위 - 도시통계지표 현황
		 * 세입징수 현황 - 도시통계지표 추이 
		 * 차트종류 : bar chart
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		dashBoard_city_statisticsSub : function(displayDivTagID, configData, returnCallBack){
			am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);
			// Create chart instance
			var chart = am4core.create(displayDivTagID, am4charts.XYChart);
			chart.data = configData.data;
			chart.colors.list = [
				//#00F0FF
				am4core.color("#7883f7")
			]
			chart.paddingLeft = 0;
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			//categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = configData.dataFieldsCategory;
			categoryAxis.renderer.minGridDistance = 1;
			//categoryAxis.renderer.inversed = false;
			categoryAxis.renderer.fontSize = 10;
			categoryAxis.renderer.cellStartLocation = 0.1
			categoryAxis.renderer.cellEndLocation = 0.8;
			categoryAxis.renderer.labels.template.hideOversized = false;
			categoryAxis.renderer.labels.template.horizontalCenter = "middle";
			//categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;
			valueAxis.renderer.fontSize = 10;
			//valueAxis.title.text = "(억)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 30;
		    valueAxis.title.dy = 10;
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryX = configData.dataFieldsCategory;
			series.dataFields.valueY = configData.dataFieldsValue;
			series.columns.template.tooltipText = "{categoryX} : {valueY}";
			//series.tooltipText = "{valueX.value}"
			series.columns.template.strokeOpacity = 0;
			//series.columns.template.column.cornerRadiusBottomRight = 5;
			//series.columns.template.column.cornerRadiusTopRight = 5;
			//series.renderer.fontSize = 10;
			series.columns.template.fontSize = 10;
			
			
			var labelBullet = series.bullets.push(new am4charts.LabelBullet())
			labelBullet.label.horizontalCenter = "middle";
			//labelBullet.label.dx = 15;
			labelBullet.label.dy = -10;
			labelBullet.label.fontSize = 11;
			labelBullet.label.text = "{valueY.value}";

			//categoryAxis.sortBySeries = series;
		},
		
		/**
		 * 작성 : 김부권
		 * 관리자페이지 - 데이터 현황 관리
		 * 하위 - 데이터 현황 관리
		 * 데이터 현황 관리
		 * 차트종류 : group barchart & line
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		manage_data_statusChart : function(displayDivTagID, configData, returnCallBack){
			//am4core.useTheme(am4themes_dark);
			am4core.useTheme(am4themes_animated);

			var chart = am4core.create(displayDivTagID, am4charts.XYChart)
			//chart.colors.step = 2;
			chart.data = configData.data;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			/* Remove square from marker template */
			var marker = chart.legend.markers.template;
			marker.width = 15;
			marker.height = 15;
			chart.cursor = new am4charts.XYCursor();
			
			//color
			chart.colors.list = [
				  am4core.color("#5dbcfe"),
				  am4core.color("#fe8687"),
				
			];
			
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = configData.dataFieldsCategory;
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.8
			xAxis.renderer.grid.template.location = 0;
			xAxis.renderer.fontSize = 12;
			xAxis.renderer.labels.template.hideOversized = false;
			xAxis.renderer.labels.template.horizontalCenter = "middle";
			xAxis.renderer.minGridDistance = 10;
			//xAxis.renderer.labels.template.rotation = 90;
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			yAxis.renderer.fontSize = 12; 
			yAxis.title.text = "(억원)";
			yAxis.title.fontSize = 12;  
			yAxis.title.dx = 50;
			yAxis.title.dy = -200;
			yAxis.title.rotation = 0;
			
			function createSeries(value, name) {
			    var series = chart.series.push(new am4charts.ColumnSeries())
			    series.dataFields.valueY = value
			    series.dataFields.categoryX = configData.dataFieldsCategory;
			    series.name = name
			    series.tooltipText = "{categoryX} " + name + " : " + "{valueY}";
			    //series.events.on("hidden", arrangeColumns);
			    series.events.on("shown", arrangeColumns);

			    /*var bullet = series.bullets.push(new am4charts.LabelBullet())
			    bullet.interactionsEnabled = false
			    bullet.dy = 30;
			    bullet.label.text = '{valueY}'
			    bullet.label.fill = am4core.color('#ffffff')*/

			    return series;
			}

			createSeries(configData.dataFieldsValue, '테이블수');
			//createSeries(configData.dataFieldsValue2, '지출액');
			
			
			function arrangeColumns() {

			    var series = chart.series.getIndex(0);

			    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			    if (series.dataItems.length > 1) {
			        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
			        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
			        var delta = ((x1 - x0) / chart.series.length) * w;
			        if (am4core.isNumber(delta)) {
			            var middle = chart.series.length / 2;

			            var newIndex = 0;
			            chart.series.each(function(series) {
			                if (!series.isHidden && !series.isHiding) {
			                    series.dummyData = newIndex;
			                    newIndex++;
			                }
			                else {
			                    series.dummyData = chart.series.indexOf(series);
			                }
			            })
			            var visibleCount = newIndex;
			            var newMiddle = visibleCount / 2;

			            chart.series.each(function(series) {
			                var trueIndex = chart.series.indexOf(series);
			                var newIndex = series.dummyData;

			                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

			                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
			            })
			        }
			    }
			}
		},
		
		
		/**
		 * 작성 : 김부권
		 * 관리자페이지
		 * 사용자통계 - 월별
		 * 월별 로그
		 * 차트종류 : line차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		manager_log_monthChart : function(displayDivTagID, configData) {
	    	
	    	// Themes begin
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#6fd0e1"),
				am4core.color("#73c894"),
				am4core.color("#a485cf"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 12;
			markerTemplate.height = 12;
			chart.legend.labels.template.fontSize = 11;
			chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	    	dateAxis.renderer.minGridDistance = 0;
	    	dateAxis.renderer.fontSize = 10;
	    	dateAxis.dateFormats.setKey("month", "MM");
	    	dateAxis.periodChangeDateFormats.setKey("month", "MM");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			//valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 12;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
		    valueAxis.title.dx = 40;
		    valueAxis.title.dy = -30;
		    //valueAxis.title
	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.LineSeries());
	    		  series.dataFields.valueY = field;
	    		  series.dataFields.dateX = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  //series.tensionX = 0.8;
	    		  
	    		  //series.tooltip.background.cornerRadius = 20;
	    		  series.tooltip.background.strokeOpacity = 0;
	    		  series.tooltip.pointerOrientation = "vertical";
	    		  series.tooltip.label.minWidth = 30;
	    		  series.tooltip.label.minHeight = 10;
	    		  series.tooltip.label.textAlign = "middle";
	    		  series.tooltip.label.textValign = "middle";
	    		  
	    		  /*series.tooltip.background.cornerRadius = 5;
				  series.tooltip.background.strokeOpacity = 0;*/
	    		  
	    		  var interfaceColors = new am4core.InterfaceColorSet();
	    		  console.log("interfaceColors :" ,interfaceColors)
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
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue1, "페이지뷰", "circle");
	    	createAxisAndSeries(configData.dataFieldsValue2, "방문횟수", "rectangle");
	    	createAxisAndSeries(configData.dataFieldsValue3, "방문자수", "triangle");
	    	
	    	//return chart;
		},
		/**
		 * 작성 : 김부권
		 * 관리자페이지
		 * 사용자통계 - 요일별
		 * 요일별 로그
		 * 차트종류 : line차트
		 * @param displayDivTagID : div ID
		 * @param configData : resultData
		 * @param returnCallBack
		 */
		manager_log_dayChart : function(displayDivTagID, configData) {
	    	
	    	// Themes begin
	    	am4core.useTheme(am4themes_animated);
	    	// Themes end

	    	// Create chart instance
	    	var chart = am4core.create(displayDivTagID, am4charts.XYChart);
	    	chart.data = configData.data;
	    	//chart.paddingTop = 30;
	    	
	    	//colors
	    	chart.colors.list = [
				am4core.color("#FE0000"),
				am4core.color("#FE6002"),
				am4core.color("#FEF600"),
				am4core.color("#30E400"),
				am4core.color("#0078FF"),
				am4core.color("#0A0071"),
				am4core.color("#9300EF"),
			]
	    	
	    	// Add legend
	    	chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.useDefaultMarker = true;
			chart.legend.labels.template.fontSize = 12;
			//chart.legend.valign = "bottom";
			var markerTemplate = chart.legend.markers.template;
			markerTemplate.width = 15;
			markerTemplate.height = 15;
			/* Remove square from marker template */
			//chart.legend.maxHeight = 250;
	    	// Add cursor
	    	chart.cursor = new am4charts.XYCursor();
	    	
	    	// Create axes
	    	var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	    	xAxis.dataFields.category = configData.dataFieldsCategory;
	    	xAxis.renderer.minGridDistance = 0;
	    	xAxis.renderer.fontSize = 10;
	    	xAxis.renderer.cellStartLocation = 0.1
	    	xAxis.renderer.cellEndLocation = 0.9
	    	//dateAxis.renderer.dx = -0.5;
	    	//dateAxis.dateFormats.setKey("year", "yy");
	    	//dateAxis.periodChangeDateFormats.setKey("month", "yyyy-MMM"); 
	    	
	    	
	    	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			//valueAxis.layout = "absolute";
			valueAxis.renderer.fontSize = 10;
			//valueAxis.title.text = "(명)";
			valueAxis.title.fontSize = 10;
			valueAxis.title.rotation = 0;    
			valueAxis.title.align = "center";
			valueAxis.title.valign = "top";  
			//valueAxis.title.dx = 40;
		   // valueAxis.title.dy = -30;

	    	
	    	// Create series
	    	function createAxisAndSeries(field, name, bullet) {
	    		  
	    		  var series = chart.series.push(new am4charts.ColumnSeries());
	    		  series.dataFields.valueY  = field;
	    		  series.dataFields.categoryX  = configData.dataFieldsCategory;
	    		  series.strokeWidth = 2;
	    		  series.yAxis = valueAxis;
	    		  series.name = name;
	    		  series.tooltipText = "{name}: {valueY}[/]";
	    		  var bullet = series.bullets.push(new am4charts.LabelBullet())
	    		    bullet.interactionsEnabled = false
	    		    bullet.dy = -10;
	    		    bullet.label.text = '{valueY}';
    		    	bullet.label.fontSize = 10;
	    		    bullet.label.fill = am4core.color('#000000')
	    		    //bullet 잘리지않게 설정  ex)2.. => 226 
	    		    bullet.label.truncate = false;
	    		  
	    	};
	    	createAxisAndSeries(configData.dataFieldsValue1, "페이지뷰");
	    	createAxisAndSeries(configData.dataFieldsValue2, "방문자수");
	    	createAxisAndSeries(configData.dataFieldsValue3, "방문횟수");
	    	
	    	//return chart;
		},
}