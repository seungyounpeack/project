"use strict";

/**
 * Grid 공통 Javascript
 */
var GRID = {
		
		/**
		 * Grid 생성
		 * GRID.createGridView("sample-grid", gridConfigInfo, function(ax5Grid){
    	
		    	// 화면별 그리드 사용을 위해 객체를 Return 받는다
		    	ax5GridView = ax5Grid;
		    });
		    container : div tag id
		    gridConfigInfo : 그리드 config 정보
		    returnCallBack : returnCall 함수
		 */
		createGridView : function(container, gridConfigInfo, returnCallBack) {
		
			var ax5Grid = new ax5.ui.grid();
			
			GRID.setConfig(ax5Grid, gridConfigInfo, container);
			
			if(Util.isFunction(returnCallBack)) returnCallBack(ax5Grid);
		},

		
		/**
		 * 그리드 설정
		 * GRID.setConfig(ax5Grid, gridConfigInfo, container);
		 * ax5Grid 			: 그리드 객체
		 * gridConfigInfo 	: 그리드 config 정보
		 * container 		: div tag id
		 */
		setConfig : function(ax5Grid, gridConfigInfo, container) {
			
			// Define 정보에서 그리드 기본 config 값을 가져온다
			var configInfo = DEF.gridConfig;
			
			configInfo.target = $('[data-ax5grid="'+ container + '"]');			// 그리드를 표시할 대상을 지정
			
			// Header 설정
			configInfo.header = {
		        align: "center",
		        columnHeight: 25
		    };
			
			// Body 설정
			configInfo.body = {
		        align: "center",
		        columnHeight: 25
		    };
			
			// Body Grouping 정보가 있으면 설정
			if(Util.isObject(gridConfigInfo.grouping)){
				
				configInfo.body.grouping = gridConfigInfo.grouping;
			};
			
			
			// Column 설정
			if(Util.isObject(gridConfigInfo.columns)){
				
				configInfo.columns = gridConfigInfo.columns;
			}
			
			// Footer Summary 설정 footSum 데이터가 있으면
			if(Util.isObject(gridConfigInfo.footSum)){
			
				configInfo.footSum = gridConfigInfo.footSum;
			}else{
				
				configInfo.footSum = null;
			}
			
			// Page Display 설정
			if(Util.isObject(gridConfigInfo.page)){
			
				configInfo.page = gridConfigInfo.page;
				
			}else{
				
				configInfo.page = {display:false};
			}
			
			
			
			if(Util.isObject(gridConfigInfo.tree)){
				console.log("gridConfigInfo.tree : ", gridConfigInfo.tree)
				configInfo.tree = gridConfigInfo.tree;
			}
			
			
			// Config 값 적용
			ax5Grid.setConfig(configInfo);
		},
		
		
		/**
		 * 그리드의 Config 정보를 다시 설정
		 * GRID.reSetConfig(ax5Grid, configInfo);
		 * ax5Grid 			: 그리드 객체
		 * configInfo		: Config 정보
		 */
		reSetConfig : function(ax5Grid, configInfo) {
			
			// Config 값 적용
			ax5Grid.setConfig(configInfo);
			
			ax5Grid.repaint();
		},
		
		
		/**
		 * 그리드 데이터 설정
		 * GRID.setGridData(ax5GridView, dataList);
		 * ax5Grid 			: 그리드 객체
		 * dataList			: 데이터 List
		 */
		setGridData : function(ax5Grid, gridDataList, returnCallBack) {
			
			ax5Grid.setData(gridDataList);
			
			// Return Call Back 함수 호출
			if(Util.isFunction(returnCallBack)) returnCallBack(gridDataList);
		},
		
		/**
		 * 그리드 데이터 및 페이지 설정
		 * 작성자 				: 김부권
		 * ax5Grid 				: 그리드 객체
		 * griddataList			: 데이터 List
		 * currentPage          : 현재페이지
		 */
		setGridDataForPaging : function(ax5Grid, gridDataList, currentPage, returnCallBack) {
			var list = [];
			
			//페이징시 데이터를 나눠서 새로운 리스트에 담아야 하므로 DataList의 시작
			var start = parseInt(currentPage*10);
			
			//페이징시 데이터를 나눠서 새로운 리스트에 담아야 하므로 DataList의 끝
			var end = parseInt(10+currentPage*10);
			
			//페이지에 넣을 데이터 담기
			for ( var i = start; i < end; i++){
				list.push(gridDataList[i]);
			}
			
			var totalElement = gridDataList.length;
			var totalPage = totalElement/10;
			
			if (totalPage < 0 ) {
				totalPage = 1;
			} 
			
			//데이터 input 및 페이지 정보 설정
			ax5Grid.setData({
				list : list,
				page : {
					currentPage: currentPage,
                    pageSize: 10,
                    totalElements: gridDataList.length,
                    totalPages: totalPage
				}
			});
			
			// Return Call Back 함수 호출
			if(Util.isFunction(returnCallBack)) returnCallBack(gridDataList);
		},
		
		
		/**
		 * 그리드 데이터 설정
		 * GRID.setGridDataAjax(ax5GridView, "/getGridData.do", {"searchWord":"인구"});
		 * ax5Grid 			: 그리드 객체
		 * paramUrl			: Ajax Request Url
		 * paramData		: Request 요청 시 Parameter
		 * 
		 * return 되는 JSON 데이터에서 "gridList" key name 값으로 설정 됨
		 */
		setGridDataAjax : function(ax5Grid, paramUrl, paramData) {
			
			var requestParam = (Util.isEmpty(paramData))? JSON.stringify({}):JSON.stringify(paramData);
			
			$.ajax({
				method : "POST",						// http 요청 방식 (default: ‘GET’)
				type : "POST",
				timeout : 10000,						// 요청 제한 시간. 제한 시간 안에 요청이 완료되지 않으면 요청을 취소하거나 error 콜백을 호출.
				cache : false,
				global : true,
				url : paramUrl,							// 요청이 전송될 url
				data : requestParam,						// 서버로 전달될 데이터 JSON 
				dataType : "json",						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
				async : true,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
				processData : true,
				contentType : "application/json",		// 서버에 데이터를 보낼 때 사용 content - type
				beforeSend:function(){
		            // Loading bar Start
		        },
		        complete:function(){
		        	// Loading bar End
		        },
		        success : function(resultData){
		        	// Json 데이터에서 "gridList" 값으로 그리드 데이터 설정
					ax5Grid.setData(resultData.gridList);
		        },
		        error : function(request,status,error){
		        	$(DEF.controllId.contentWrapper).html(request.responseText);
		        	
		        	//console.log(request.statusText);
		        },
		        fail : function() {
		       
		        }
			});
			
			/*
			Util.request(paramUrl, paramData, function(resultData){
				
				// Json 데이터에서 "gridList" 값으로 그리드 데이터 설정
				ax5Grid.setData(resultData.gridList);
			});
			*/
		},
		
		
		/**
		 * Line Number 보이기
		 * var configOption = {showLineNumber:true, lineNumberColumnWidth:50};
		 * GRID.showLineNumber(ax5GridView, {showLineNumber:true});
		 * ax5Grid 			: 그리드 객체
		 * optionConfig		: Config 정보
		 * optionConfig.showLineNumber 			: Line Number 보이기 감추기 default = false
		 * optionConfig.lineNumberColumnWidth 	: Line Numebr Width 값 default = 30
		 */
		showLineNumber : function(ax5Grid, optionConfig) {
			
			if(Util.isObject(optionConfig)){
				
				var configInfo = {
						showLineNumber: (!Util.isEmpty(optionConfig.showLineNumber))? optionConfig.showLineNumber : DEF.gridConfig.showLineNumber,
						lineNumberColumnWidth: (!Util.isEmpty(optionConfig.lineNumberColumnWidth))? optionConfig.lineNumberColumnWidth:DEF.gridConfig.lineNumberColumnWidth
				};
				
				// Config 다시 설정
				GRID.reSetConfig(ax5Grid, configInfo);
			}
		},
		
		
		/**
		 * Row Selector (Row Checkbox) 보이기
		 * var configOption = {showRowSelector:true, rowSelectorColumnWidth:30};
		 * GRID.showRowSelector(ax5GridView, configOption);
		 * ax5Grid 			: 그리드 객체
		 * optionConfig		: Config 정보
		 * optionConfig.showRowSelector			: Selector(Checkbox) 보이기 감추기 default : false
		 * optionConfig.multipleSelect			: checkbox Multi select Flag default : true
		 * optionConfig.rowSelectorColumnWidth	: width 값 default : 25
		 */
		showRowSelector : function(ax5Grid, optionConfig) {
			
			if(Util.isObject(optionConfig)){
				
				var configInfo = {
					showRowSelector : (!Util.isEmpty(optionConfig.showRowSelector))? optionConfig.showRowSelector:DEF.gridConfig.showRowSelector,
					multipleSelect : (!Util.isEmpty(optionConfig.multipleSelect))? optionConfig.multipleSelect:DEF.gridConfig.multipleSelect,
					rowSelectorColumnWidth : (!Util.isEmpty(optionConfig.rowSelectorColumnWidth))? optionConfig.rowSelectorColumnWidth:DEF.gridConfig.rowSelectorColumnWidth
				};
				
				// Config 다시 설정
				GRID.reSetConfig(ax5Grid, configInfo);
			}
		},
		
		
		/**
		 * 전체 컬럼 Sortable 설정
		 * var configOption = {sortable:true};
		 * GRID.setSortColumnAll(ax5GridView, configOption);
		 * ax5Grid 			: 그리드 객체
		 * optionConfig		: Config 정보
		 * optionConfig.sortable	: Sortable 보기이 감추기 default = false
		 */
		setSortColumnAll : function(ax5Grid, optionConfig) {
			
			if(Util.isObject(optionConfig)){
				
				var configInfo = {
					sortable : (!Util.isEmpty(optionConfig.sortable))? optionConfig.sortable:DEF.gridConfig.sortable,
				};
				
				// Config 다시 설정
				GRID.reSetConfig(ax5Grid, configInfo);
			}
		},
		
		
		/**
		 * 지정한 컬럼에 sortable 설정
		 * GRID.setSortColumn(ax5GridView, ["price", "amount"], true);
		 * ax5Grid 			: 그리드 객체
		 * optionConfig		: Config 정보
		 * sortFlag			: true = 보이기, false = 감추기
		 */
		setSortColumn : function(ax5Grid, columnName, sortFlag) {
			
			// 그리드의 컬럼 정보 가져오기
			var gridColumns = ax5Grid.config.columns;
			
			// 새로 적용할 컬럼 리스트 객체
			var gridColumnList = [];
			
			// 적용할 컬럼을 배열 형식으로 만든다
			var columnNames = [].concat(columnName);
						
			for(var idx = 0 ; idx < gridColumns.length ; idx++){
				
				var firstColumnInfo = gridColumns[idx];
				
				
				for (var len = 0 ; len < columnNames.length; len++) {
					
					if(Util.isEqual(firstColumnInfo.key, columnNames[len])){
						
						firstColumnInfo.sortable = (sortFlag)? true:false;
					}
				};
				
				
				if(Util.isObject(firstColumnInfo.columns)){
					
					var secondColumnList = [];
					
					for(var jdx = 0 ; jdx < firstColumnInfo.columns.length ; jdx++){
						
						var secondColumnInfo = firstColumnInfo.columns[jdx];
						
						
						for (var len = 0 ; len < columnNames.length; len++) {
							
							if(Util.isEqual(secondColumnInfo.key, columnNames[len])){
								
								secondColumnInfo.sortable = (sortFlag)? true:false;
							};
						};
						
						secondColumnList.push(secondColumnInfo);
					};
					
					firstColumnInfo.columns = secondColumnList;
				};
				
				gridColumnList.push(firstColumnInfo);
			};
			
			
			// 컬럼 정보를 다시 설정하기 위해 config 객체에 담기
			var configInfo = {};
			
			configInfo.columns = gridColumnList;
			
			// Config 다시 설정
			GRID.reSetConfig(ax5Grid, configInfo);
		},
		
		
		
		/**
		 * Merge Cell 설정
		 * GRID.setMergeColumn(ax5GridView, ['a', 'b']);
		 * ax5Grid 			: 그리드 객체
		 * mergeColumnList	: 적용할 컬럼 key 값 ==> Array 타입
		 */
		setMergeColumn : function(ax5Grid, mergeColumnList) {
			
			var configInfo = {};
			
			configInfo.body = {
			    mergeCells: mergeColumnList
			};
			
			
			if(!Util.isEmpty(ax5Grid.config.footSum)){
				
				configInfo.footSum = ax5Grid.config.footSum;
			}
			
			
			// Config 다시 설정
			GRID.reSetConfig(ax5Grid, configInfo);
		},
		
		
		/**
		 * 지정한 컬럼에 Formatter 설정
		 * GRID.setColumnFormatter(ax5GridView, ["amount", "price", "cost"], "money");
		 * ax5Grid 			: 그리드 객체
		 * columnName		: 적용할 컬럼 key 값 ==> Array 타입
		 * formatName		: Formatter Name 
		 */
		setColumnFormatter : function(ax5Grid, columnName, formatName) {
			
			// 그리드의 컬럼 정보 가져오기
			var gridColumns = ax5Grid.config.columns;
			
			// 새로 적용할 컬럼 리스트 객체
			var gridColumnList = [];
			
			// 적용할 컬럼을 배열 형식으로 만든다
			var columnNames = [].concat(columnName);
						
			for(var idx = 0 ; idx < gridColumns.length ; idx++){
				
				var firstColumnInfo = gridColumns[idx];
				
				
				for (var len = 0 ; len < columnNames.length; len++) {
					
					if(Util.isEqual(firstColumnInfo.key, columnNames[len])){
						
						firstColumnInfo.formatter = (Util.isEmpty(formatName))? "money": formatName;
					}
				};
				
				
				if(Util.isObject(firstColumnInfo.columns)){
					
					var secondColumnList = [];
					
					for(var jdx = 0 ; jdx < firstColumnInfo.columns.length ; jdx++){
						
						var secondColumnInfo = firstColumnInfo.columns[jdx];
						
						
						for (var len = 0 ; len < columnNames.length; len++) {
							
							if(Util.isEqual(secondColumnInfo.key, columnNames[len])){
								
								secondColumnInfo.formatter = (Util.isEmpty(formatName))? "money": formatName;;
							};
						};
						
						secondColumnList.push(secondColumnInfo);
					};
					
					firstColumnInfo.columns = secondColumnList;
				};
				
				gridColumnList.push(firstColumnInfo);
			};
			
			
			// 컬럼 정보를 다시 설정하기 위해 config 객체에 담기
			var configInfo = {};
			
			configInfo.columns = gridColumnList;
			
			// Config 다시 설정
			GRID.reSetConfig(ax5Grid, configInfo);
			
		},
		
		
		/**
		 * 그리드의 전체 Row Data 가져오기
		 */
		getRowDataAll : function(ax5Grid) {
			
			return ax5Grid.getList();
		},
		
		
		/**
		 * 선택한 Row 데이터 가져오기
		 */
		getSelectedAll : function(ax5Grid) {
			
			return ax5Grid.getList("selected");
		},
		
		
		/**
		 * 선택한 Row의 데이터만 가져오기
		 * var selectedInfo = GRID.getSelectedList(ax5GridView, ax5GridViewCheckIdx);
		 * ax5GridView : 그리드 객체
		 * ax5GridViewCheckIdx : 선택된 Row Index
		 */
		getSelectedList : function(ax5Grid, selectedIndex) {
			
			// modified, deleted 속성 사용 가능
			//return ax5Grid.getList("selected");
			
			var returnRowInfo = null;
			
			var gridRows = ax5Grid.getList();
			
			for(var idx = 0 ; idx < gridRows.length ; idx++){
				
				var rowInfo = gridRows[idx];
				
				if(selectedIndex == idx){
				
					returnRowInfo = rowInfo;
					break;
				}
			}
			
			return returnRowInfo;
		},
		
		
		/**
		 * Excel Export
		 * GRID.excelExport(ax5GridView);
		 * ax5Grid 			: 그리드 객체
		 * 
		 * Excel Export 시 생성되는 파일명은 대상 div 태그에 data-ax5grid-config='{name:"volcanas-grid"}' 속성값을 기준으로 생성
		 * name 값과 년월일 시분 값 조합으로 생성 됨
		 * 예 : volcanas-grid_20190728_14_12.xls
		 */
		excelExport : function(ax5Grid) {
			
			var gridName = ax5Grid.config.name;
			var dateTimeNow = moment().format('YYYYMMDD_HH_mm');
			
			// Name 값이 없으면
			if(Util.isEmpty(gridName)){
				gridName = "uijeongbu";
			};
			
			var excelFileName = gridName + "_" + dateTimeNow + ".xls";
			
			ax5Grid.exportExcel(excelFileName);
		},
		
		
		/**
		 * 전체 선택 해제 하기
		 * GRID.clearSelectAll(ax5GridView);
		 * ax5Grid 			: 그리드 객체
		 */
		clearSelectAll : function(ax5Grid) {
			
			ax5Grid.clearSelect();
		}
		
};
	