
//공통 함수
var Util = {
	//시간 0추가 함수
	addZero : function(data){
		var time = data;
		if( time < 10 ) {
			time = '0' + time.toString();
		}
		return time;
	},
	/**
     * Function 인지 체크
     *  Util.isFunction(testFunction);
     */
    isFunction : function(object){
    	
    	return $.isFunction(object);
    },
    
    isEmpty : function(str) {
		var obj = String($.trim(str));

		if(obj == null || obj == undefined || obj == 'null' || obj == 'undefined' || obj == '' ) return true;
		else return false;
	},
	
	/**
	 * 비동기 Ajax 호출
	 */
	requestAjax : function(param, returnAjaxCallBack){
		$.ajax({
			method : "POST",							// http 요청 방식 (default: ‘GET’)
			type : "POST",
			timeout : 30000000,								// 요청 제한 시간. 제한 시간 안에 요청이 완료되지 않으면 요청을 취소하거나 error 콜백을 호출.
			cache : false,
			global : true,
			url : param.paramUrl,							// 요청이 전송될 url
			data : param.data,								// 서버로 전달될 데이터 JSON 
			dataType : param.dataType,						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
			async : param.async,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
			processData : (Util.isEmpty(param.processData))? true:param.processData,
			contentType : param.contentType,				// 서버에 데이터를 보낼 때 사용 content - type
			beforeSend:function(){
	            // Loading bar Start
				if(param.showLoading){
					loading.ajax(true);
					$("#divLoading").show();
				}
	        },
	        complete:function(){
	        	if(param.showLoading){
					loading.close();
					$('#divLoading').hide();
				}
	        },
	        success : function(resultData){
		    	if(Util.isFunction(returnAjaxCallBack)) returnAjaxCallBack(resultData);
	        },
	        error : function(request,status,error){
	        	console.log("B", request,status,error);
	        	
	        	//$(DEF.controllId.contentWrapper).html(request.responseText);
	        },
	        fail : function() {
	        	
	        	alert("인터넷 연결 상태를 확인해주세요.");
	        }
		});
	},
	/**
	 * Ajax 방식으로 파일 업로드
	 */
	requestFileUplaod : function(paramUrl, paramData, paramReturnCallBack){
		
		$.ajax({
			method : "POST",							// http 요청 방식 (default: ‘GET’)
			type : "POST",
			timeout : 300000,								// 요청 제한 시간. 제한 시간 안에 요청이 완료되지 않으면 요청을 취소하거나 error 콜백을 호출.
			cache : false,
			global : true,
			url : paramUrl,								// 요청이 전송될 url
			data : paramData,								// 서버로 전달될 데이터 JSON 
			dataType : "html",						// 서버로부터 반환될 데이터의 type. default: Intelligent Guess (xml, json, jsonp, script, html)
			async : false,							// 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
			processData : false,
			contentType : false,				// 서버에 데이터를 보낼 때 사용 content - type
			beforeSend:function(){
				$("#divLoading").show();
				loading.ajax(true);
				//Util.showLoading();
	        },
	        complete:function(){
	        	// Loading bar End
	        	$("#divLoading").hide();
	        },
	        success : function(resultData){
	        	
	        	var returnData = JSON.parse(resultData);
	        	console.log("returnData", returnData)
		    	if(Util.isFunction(paramReturnCallBack)) paramReturnCallBack(returnData);
		    	//Util.showAlert(DEF.messages.saveComplete);
	        },
	        error : function(request,status,error){
	        	
	        	//$(DEF.controllId.contentWrapper).html(request.responseText);
	        },
	        fail : function() {
	        	
	        	alert(returnData.resultMsg);
	        }
		});
	},
	
	/**
	 * Ajax Load 호출 Jsp 파일을 읽어봐 특정 Container 에 Append 시킨다
	 */
	requestLoad : function(paramUrl, paramData, paramReturnCallBack){
		
		// Ajax Option 설정
		var param = {};
		
		param.paramUrl = paramUrl;
		param.data = (Util.isEmpty(paramData))? JSON.stringify({}):JSON.stringify(paramData);;
		param.dataType = "html";
		param.async = true;
		param.processData = true;
		param.showLoading = false;
		param.contentType = "application/json";
		//param.returnCallBack = paramReturnCallBack;
		
		// 비동기 Ajax 호출
		Util.requestAjax(param, function(resultData){
			if(Util.isFunction(paramReturnCallBack)) paramReturnCallBack(resultData);
		});
	},
	
	/**
	 * Content 영역에 표시할 화면을 Load 한다
	 */
	loadContentPage : function(menuItem, backForward, dongCode) {
		console.log("!! menuItem : ", menuItem)
		//권한 설정 시 아래 소스로 적용 해야 함
		var menuCode = menuItem;
		console.log("loadContentPage menuCode : ", menuCode)
		var requestUrl = "/checkRoleMenuCnt.do";

		var param ={};
		var paramData = {};

		param.menuInfo = {};
		if( dongCode != undefined ) {
			console.log("dongCode : ," , dongCode)
			paramData.dongCode = dongCode.dongCode; 
			paramData.tp = dongCode.tp; 
		}		
		param.menuInfo.menuCode = menuCode;

		// 메뉴 목록 조회하기
		Util.requestHide(requestUrl, param, function(resultData){
			//console.log("!! resultData: ", resultData)
			var menuInfo = resultData.menuInfo;
			
			console.log("backForward : ", backForward)
			console.log("menuInfo : ", menuInfo)
			if(Util.isObject(menuInfo)){
				
				var menuLinkUrl = menuInfo.menuLink;
				if( backForward == undefined )  {
					menuList.push(menuCode);
					var cnt = $("#menu_prev").attr("index");
					$("#menu_prev").attr("index", parseInt(cnt)+1);
					$("#menu_next").attr("index", parseInt(cnt)+1);
				}else{
					var cnt = $("#menu_prev").attr("index");
					$("#menu_prev").attr("index", backForward);
					$("#menu_next").attr("index", backForward);
				}
				if(!Util.isEmpty(menuLinkUrl)){
					Util.requestLoad(menuLinkUrl, paramData, function(resultData){
						console.log("!!! menuLinkUrl: ", menuLinkUrl)
						//인자로 함수 이름 넣어줍니다.
						try{
							
							var jsonResult = JSON.parse(resultData);
							//console.log("jsonResult : " ,jsonResult)
								
							alert(jsonResult.resultMsg);
							
						}catch(ex){
								// 현재 Content 화면을 지운다
								$(DEF.controllId.contentWrapper).children().remove();
								//$(DEF.controllId.loadingId).remove();
								$(DEF.controllId.contentWrapper2).remove();
								$(DEF.controllId.contentWrapper).html();
								console.log("!!!! ex ; ", ex)
								
								$(DEF.controllId.contentWrapper).html(resultData);
								//console.log("!!!! resultData: ", resultData)
						}
					});
				}
				
			}else{
			
				alert("선택한 메뉴에 대한 권한이 없습니다.");
			}
		});
		

		// 권한 적용시 아래 소스 주석 처리 해야 함
		// 주석 시작
		/*var menuLinkUrl = menuItem.attr("linkUrl");
		console.log("menuLinkUrl : " , menuLinkUrl);
		if(!Util.isEmpty(menuLinkUrl)){
			
			Util.requestLoad(menuLinkUrl, null, function(resultData){

				try{
					
					var jsonResult = JSON.parse(resultData);
					
					Util.showAlert(jsonResult.resultMsg);
					
				}catch(ex){
				
					// 현재 Content 화면을 지운다
					$(DEF.controllId.contentWrapper).children().remove();
					$(DEF.controllId.contentWrapper).html();
					
					$(DEF.controllId.contentWrapper).html(resultData);
				}
			});
		}*/
		// 주석 종료
	},
	
	/**
	 * 비동기 Ajax 호출 : loading bar 없음 
	 */
	requestHide : function(paramUrl, paramData, paramReturnCallBack){
		
		// Ajax Option 설정
		var param = {};
		
		param.paramUrl = paramUrl;
		param.data = (Util.isEmpty(paramData))? JSON.stringify({}):JSON.stringify(paramData);
		param.dataType = "json";
		param.async = true;
		param.processData = true;
		param.contentType = "application/json";
		param.showLoading = false;
		//param.returnCallBack = paramReturnCallBack;
		
		// 비동기 Ajax 호출
		Util.requestAjax(param, function(resultData){
			if(Util.isFunction(paramReturnCallBack)) paramReturnCallBack(resultData);
		});
	},
	
	/**
	 * 동기 Ajax 호출
	 * 예 :  
	 * var requestUrl = "/loadMenuList.do";		
   	 * var param = {"mnuCode":"mnu0001"};
	 * 
	 * Util.request(requestUrl, param, function(resultData){
	 * 			......  resultData
	 * });
	 * paramUrl		: 호출 Url
	 * paramData	: 호출 시 전달할 Parameter 데이터
	 * paramReturnCallBack : 호출 완료 시 return Function
	 */
	requestAsync : function(paramUrl, paramData, paramReturnCallBack){
		
		// Ajax Option 설정
		var param = {};
		
		param.paramUrl = paramUrl;
		param.data = (Util.isEmpty(paramData))? JSON.stringify({}):JSON.stringify(paramData);
		param.dataType = "json";
		param.async = false;
		param.processData = true;
		param.contentType = "application/json";
		param.showLoading = true;
		//param.returnCallBack = paramReturnCallBack;
		
		// 비동기 Ajax 호출
		Util.requestAjax(param, function(resultData){
			if(Util.isFunction(paramReturnCallBack)) paramReturnCallBack(resultData);
		});
	},
	
	/**
	 * 비동기 Ajax 호출
	 * 예 :  
	 * var requestUrl = "/loadMenuList.do";		
   	 * var param = {"mnuCode":"mnu0001"};
	 * 
	 * Util.request(requestUrl, param, function(resultData){
	 * 			......  resultData
	 * });
	 * paramUrl		: 호출 Url
	 * paramData	: 호출 시 전달할 Parameter 데이터
	 * paramReturnCallBack : 호출 완료 시 return Function
	 */
	request : function(paramUrl, paramData, paramReturnCallBack){
		
		// Ajax Option 설정
		var param = {};
		
		param.paramUrl = paramUrl;
		param.data = (Util.isEmpty(paramData))? JSON.stringify({}):JSON.stringify(paramData);
		param.dataType = "json";
		param.async = true;
		param.processData = true;
		param.contentType = "application/json";
		param.showLoading = true;
		//param.returnCallBack = paramReturnCallBack;
		
		// 비동기 Ajax 호출
		Util.requestAjax(param, function(resultData){
			if(Util.isFunction(paramReturnCallBack)) paramReturnCallBack(resultData);
		});
	},


    /**
     * 특수문자를 변환하기
     */
    convertSpecialChars : function (strChars) {
		  return (strChars||'').replace(/[<>]/g, function (m) {
			    return {
			      '<': '&lt;',
			      '>': '&gt;',
			    }[m]
		  })
    },
    
	/**
	 * Util.checkDupArray(strArray, strKey, strValue)
	 * Array 객체에서 key string 값으로 중복체크
	 */
	checkDupArray : function(strArray, strKey, strValue){
		
		var bResult = false;
		
		for(var inx = 0 ; inx < strArray.length ; inx++){
			
			var chkJson = strArray[inx];
			
			if(Util.isEqual(chkJson[strKey], strValue)){ 
				bResult = true;
			}
		}
		
		return bResult;
	},
	
	/**
	 * Data 수정 시 Request
	 */
	updateRequest : function(requestUrl, param, updateReturnCallBack) {

		//Util.showConfirm(DEF.messages.updateConfirm, function(){
			
			Util.request(requestUrl, param, function(resultData){
				
				if(Util.isEqual(resultData.resultValue, "Y")){
					
					if(Util.isFunction(updateReturnCallBack)) updateReturnCallBack(resultData);
					
					//alert(DEF.messages.updateComplete);
				}
			});
		//});
	},
	/**
	 * Data 저장 시 Request 
	 */
	saveRequest : function(requestUrl, param, saveReturnCallBack) {
		
		//Util.showConfirm(DEF.messages.saveConfirm, function(){
			
			Util.request(requestUrl, param, function(resultData){
				
				if(Util.isEqual(resultData.resultValue, "Y")){
					
					if(Util.isFunction(saveReturnCallBack)) saveReturnCallBack(resultData);
					//Util.showAlert(DEF.messages.saveComplete);
				}
			});
		//});
	},
	/**
	 * selectBox option 추가 하는 함수
	 * resultData : 불러오는 데이터 ( code / name 으로 구성 )
	 *              데이터 형식 List
	 * tagId : 태그의 ID값
	 */
	selectAddOption : function(resultData, tagId, active){
		//selectbox 초기화
		Util.selectOptionClear(tagId);
		//select tag
		var selectTag = document.getElementById(tagId);
		
		//option 객체
		var option = '';
		
		//select에서 선택 option을 추가 여부
		if( active ) {
			
			var initOption = document.createElement('option');
			initOption.text = '전체';
			initOption.value = '';
			selectTag.add(initOption);
		}
		//list형식의 결과 데이터 반복하여 select태그에 option 추가하기
		for( var i = 0 ; i < resultData.length; i++ ){
			option = document.createElement('option');
			
			option.text = resultData[i].name;
			option.value = resultData[i].code;
			selectTag.add(option);
		}
		$(".selectElement.opt1").selectmenu( "refresh" );
		$(".selectElement.opt7").selectmenu( "refresh" );
		
	},
	/**
	 * selectbox 초기화 
	 * tagId : select box id값
	 */
	selectOptionClear : function(tagId){
	    //selectbox tag가져오기
		var selectTag = document.getElementById(tagId);
		if( selectTag.options.length > 0 ) {
			
			for( var i=0 ; i < selectTag.options.length; i++){
				selectTag.options[i] = null;
			}
			selectTag.options.length = 0;
		}
	},
	/**
	 * checkbox 1개만 선택 가능
	 */
	checkOne : function(tagId) {
		
		$('input[name='+tagId+']').click(function(){
			if($(this).prop('checked')){
 
				$('input[name='+tagId+']').prop('checked',false);
 
				$(this).prop('checked',true);
			}
			  
	   });
	},
	/**
	 * 배열 객체안에 요소 존재 여부 확인
	 * 반환값 true or false
	 */
	arrayListCheck : function(list, attribute){
		var arrayList = list;
		var atrb = attribute;
		var check = false;
		arrayList.forEach(function(item, index){
			if( item === atrb ) {
				check = true;
			}
		})
		return check;
	},
	
	/**
	 * 배열추가함수
	 */
	addArray : function(list, columnName){
		var array = [];
		
		list.forEach(function(item, index){
			
			if( columnName == null || columnName == undefined ){
				array.push(item[index]);
			}else{
				
				array.push(item[columnName]);
			}
			
		})
		return array;
		
	},
	/**
	 * 배열에서 특정요소 삭제
	 */
	removeAttribute : function(list, columnName){

		// 원소 'b' 삭제
		for(var i = 0; i < list.length; i++) {
		  if(list[i] === columnName)  {
			  list.splice(i, 1);
		    i--;
		  }
		}
	},
	/**
	 * 로드한 데이터에 따라 select option selected
	 * tagId : select tag id
	 * value : select tag value값
	 * sort : 로드한 value의 종류(value, text)
	 */
	selectedValueOption : function(tagId, value, sort){
		var tag = document.getElementById(tagId);
		//console.log("tag.options : ", tag.options.length)
		for( var i = 0 ; i < tag.options.length; i++ ){
			if( sort == 'value' ){
				var option = tag.options[i];
				//$('#'+ tagId).selectmenu("value", value);
				//$('#'+ tagId + ' option[value='+value+']').prop('selected', 'selected').change();
				if( (i+1) == value ) {
					$("#"+tagId).val(value).selectmenu("refresh");
					
					//$("#"+tagId).val(String(value));
					//$('#'+tagId).find('option[value="' + value + '"]').attr("selected", true);   
					//$(option[i]).selected == true;
					//$(".selectElement.opt5").selectmenu( "refresh" );
					//$(".selectElement.opt1").selectmenu( "refresh" );
					break;
				}
			}else if( sort == 'text' ){
				console.log("@@@@@@@@@@@@@@@@@@@ sort : " , sort)
				console.log("@@@@@@@@@@@@@@@@@@@ value : " , value)
				console.log("@@@@@@@@@@@@@@@@@@@  $(tag.options[i]).text() : " ,  $(tag.options[i]).text())
				if( $(tag.options[i]).text() === value ) {
					console.log("@@@@@@@@@@@@@@@@@@@ i : ", i)
					//$(tagId).find("option:eq("+i+")").prop("selected", true);
					//$(tag.options[i]).text(value).selectmenu("refresh");
					$('#'+ tagId + ' option:eq("'+i+'")').prop('selected', 'selected').change();
					$(".selectElement.opt7").selectmenu( "refresh" );
					$(".selectElement.opt1").selectmenu( "refresh" );
					//$(tag.options[i]).selected == true;
					break;
				}
			}
		}
		
	},
	
	//2개 list합치기
	listCombine : function(min, max){
		
		var value = min.concat(max);
		
		return value;
	},
	//list 중복제거
	listDeduplication : function(value){
		var valueList = value.reduce(function(a,b){
			if (a.indexOf(b) < 0 ) a.push(b);
			return a;
		},[]);	
		
		return valueList;
	},
	/**
	 * 리스트에서 해당 text를 포함한 배열요소 반환
	 */
	getListText : function(list, text){
		var listText = "";
		
		list.forEach(function(item, index){
			
			if( item.indexOf(text) != -1  ){
				
				listText = item;
			}
		})
		return listText;
	},
	/**
	 * 번호 클릭시 페이지 번호 구하는 함수
	 * tagId : page ID
	 * tagName : li, div 등 페이지가 속한 tag명
	 * pageLimit : 페이지 그룹의 개수(ex : 5페이지까지)
	 * page :   nowPage: 1          --현재페이지
				nowPageCnt: 3       --한페이지당 row수
				pageCnt: 8          --전체 페이지 수
				totalCnt: 22        --전체 데이터수
				totalPage: 8        --전체 페이지 수
	 */
	addPageNumber : function(tagId, page, pageLimit, callback) {
		//페이지 태그 초기화
		$( tagId ).html('');
		var html = '';
		
		var nowPage = 1;
		var preNo = 0;
		var nextNo = 1;
		if( page.pageNo != undefined ) nowPage = page.nowPage;
		//페이지 전체 그룹
		var pageGroup = Math.floor((parseInt(page.totalPage)-1)/parseInt(pageLimit));
		//현재 페이지 그룹
		var nowGroup = Math.floor((parseInt(page.nowPage)-1)/parseInt(pageLimit));
		
		//마지막 페이지 번호
		var endPageNo = parseInt(page.totalPage);
		
		if( parseInt(page.totalPage) > (parseInt(nowGroup)+1)*parseInt(pageLimit) ) endPageNo = (parseInt(nowGroup)+1)*parseInt(pageLimit);
		//페이지 개수가 5를 초과할 경우
		if( page.totalPage > pageLimit ) {
			
			if( nowGroup > 0 ) {
				console.log("222222222222222")
				html += '<li class="f" value=' + nowGroup + '>';
				html += '<button>';
				html += '<img src="/dist/images/numbering-left.png" alt="">';
				html += '</button>';
				html += '</li>';
			}
			
			for( var i = (nowGroup*pageLimit) + 1 ; i < endPageNo+1; i++ ){
				html += '<li>';
				html += '<button>'+ i +'</button>';
				html += '</li>';
			}
			if( nowGroup < pageGroup ){
				
				html += '<li class="l" value=' + nowGroup + '>';
				html += '<button>';
				html += '<img src="/dist/images/numbering-right.png" alt="">';
				html += '</button>';
				html += '</li>';
			}
		//페이지 개수가 5미만	
		}else{
			
			for( var i = 1 ; i < parseInt(page.totalPage)+1; i++ ){
				html += '<li>';
				html += '<button>'+ i +'</button>';
				html += '</li>';
				
			}
		}
		
		$( tagId ).append(html);
		
		var listItems = document.querySelectorAll( tagId + " li" );
		var layersArray= Array.prototype.slice.call(listItems);
		console.log("layersArray : ", layersArray)
		layersArray.forEach(function(item, index){
			console.log("66666666666666666666666")
			if( nowGroup > 0 && nowGroup == pageGroup ){
				
//				if( (index+pageLimit) == page.nowPage) {
				if( (index) == (page.nowPage-nowGroup*pageLimit) ) {
					console.log("222222222222222 3333333333")
					$(item.children).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						console.log("222222222222222 4444444444444")
						
						$(item.children).addClass('on');
					}else{
						console.log("222222222222222 page.nowPage : ", page.nowPage)
						console.log("222222222222222 index : " , index)
						console.log("222222222222222 item.children : " , item.children)
						
						
						$(item.children).removeClass('on');
					}
					
				}
			
			}else if( nowGroup > 0 ) {
				if( (index) == (page.nowPage-nowGroup*pageLimit)) {
					console.log("222222222222222 6666666666")
					
					$(item.children).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						console.log("222222222222222 777777777777")
						
						$(item.children).addClass('on');
					}else{
						console.log("222222222222222 888888888888")
						
						$(item.children).removeClass('on');
					}
					
				}
			}else if( nowGroup < pageGroup ) {
				
				if( (index+1) == page.nowPage) {
					console.log("222222222222222 1111111111111111111111111")
					$(item.children).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						console.log("222222222222222 2222222222222222222222222")
						$(item.children).addClass('on');
					}else{
						console.log("222222222222222 333333333333333333333333333333333")
						$(item.children).removeClass('on');
					}
					
				}
			}else {
				if( (index+1) == page.nowPage) {
					console.log("222222222222222 1111111111111111111111111")
					$(item.children).addClass('on');
				}else{
					if( page.nowPage == undefined && index == 1) {
						console.log("222222222222222 2222222222222222222222222")
						$(item.children).addClass('on');
					}else{
						console.log("222222222222222 333333333333333333333333333333333")
						$(item.children).removeClass('on');
					}
					
				}
				console.log("222222222222222 index : ", index)
				console.log("222222222222222 nowGroup : ", nowGroup)
				console.log("222222222222222 pageLimit : ", pageLimit)
				console.log("222222222222222  page.nowPage : ", page.nowPage)
				
			}
			
			item.addEventListener('click', callback);
		})
	},
	toCamelCase : function(str) {
		return str.toLowerCase().replace(/(\_[a-z])/g, function(arg){
			return arg.toUpperCase().replace('_','');
		});
	},

    /**
     * 숫자인지 체크
     * Util.isNumber(123) or Util.isNumber("123")
     */
    isNumber : function(str){
    	
    	if(!Util.isEmpty(str)){
    	
    		var obj = $.trim(str);
        	
        	if(obj.replace(/[0-9]/g, '').length === 0) return true;
        	else return false;
    	}else{
    		return false;
    	}
    },
    
    /**
     * 소수점을 포함하는지 체크
     * Util.isDecimal("11233")
     */
    isDecimal : function(str){ 
    	var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    
		if(str.match(decimal)) return true;
		else return false;
    },
    
    /**
     * 두개의 값이 같은지 비교
     * Util.isEqual("aa", "aa") 
     * Util.isEqual(12, 12)
     */
    isEqual : function(str1, str2){
    	
    	var p, t;
    	
        for (p in str1) {
        	
        	if (typeof str2[p] === 'undefined') {
        		return false;
        	}
          
        	if (str2[p] && !str1[p]) {
        		return false;
        	}
          
        	t = typeof str1[p];
          
        	if (t === 'object' && !isEqual(str1[p], str2[p])) {
        		return false;
        	}
          
        	if (t === 'function' && (typeof str2[p] === 'undefined' || str1[p].toString() !== str2[p].toString())) {
        		return false;
        	}
          
        	if (str1[p] !== str2[p]) {
        		return false;
        	}
        }
        
        for (p in str2) {
        	if (typeof str1[p] === 'undefined') {
        		return false;
        	}
        }
        
        return true;
    },
    
    
    /**
     * 이메일 포멧인지 체크
     * Util.isEmail("aaa@naver.com")
     */
    isEmail : function(str){
    	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) return true;
    	else return false;
    },
    
    /**
     * 날짜 데이터가 ISO 포멧인지 체크
     * Util.isDateISO("2018.02.28") OR Util.isDateISO("2018/02/28") OR Util.isDateISO("2018-02-28")
     */
    isDateISO : function(str){
    	  
    	if(Util.isEmpty(str)) return false;
    	else{

    		//var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;	 	// dd-mm-yyyy
    		var dateformat = /^\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])/;    // yyyy-mm-dd

    		var bResult = true;
    	  
    		// Match the date format through regular expression
    		if(str.match(dateformat)){
    			
    		  //Test which seperator is used '/' or '-' or '.'
    		  var opera1 = str.split('/');
    		  var opera2 = str.split('-');
    		  var opera3 = str.split('.');
    		  
    		  lopera1 = opera1.length;
    		  lopera2 = opera2.length;
    		  lopera3 = opera3.length;
    		  
    		  // Extract the string into month, date and year
    		  if (lopera1>1){
    			  var pdate = str.split('/');
    		  }else if (lopera2>1){
    			  var pdate = str.split('-');
    		  }else if (lopera3>1){
    			  var pdate = str.split('.');
    		  }
    		  
    		  var yy = parseInt(pdate[0]);
    		  var mm  = parseInt(pdate[1]);
    		  var dd = parseInt(pdate[2]);
    		  
    		  // Create list of days of a month [assume there is no leap year by default]
    		  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    		  if (mm==1 || mm>2){
    			  
    			  if (dd>ListofDays[mm-1]){
    				  //alert('Invalid date format!');
    				  bResult = false;
    			  }
    		  }
    	  
    		  if (mm==2){
    			  var lyear = false;
    			  
    			  if ( (!(yy % 4) && yy % 100) || !(yy % 400)){
    				  lyear = true;
    			  }
    	  
    			  if ((lyear==false) && (dd>=29)){
    				  //alert('Invalid date format!');
    				  bResult = false;
    			  }
    	  
    			  if ((lyear==true) && (dd>29)){
    				  //alert('Invalid date format!');
    				  bResult = false;
    			  }
    		  }
    	  }else{
    		  
    		  bResult = false;
    	  }
    	  
    	}
    	  return bResult;
    },
    
    
    /**
     * 전화번호 포멧인지 체크
     * Util.isPhoneNumber("010-1111-1111")
     */
    isPhoneNumber : function(str){
    	
    	if(Util.isEmpty(str)) return false;
    	else{
    		var regxPhonenum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$/;
    	  
    		if((str.match(regxPhonenum))) return true;
    		else return false;
    	}
    },
    
    /**
     * 데이터의 Length가 지정한 길이 이상인지 체크
     * Util.isMinlength($("#email").val(), "4")
     */
    isMinlength : function(str, chkLength){
    
    	if(!Util.isEmpty(str) && !Util.isEmpty(chkLength)) return str.length >= chkLength;
    	else return false
    },
    
    
    /**
     * 데이터의 Length가 지정한 길이 이하인지 체크
     * Util.isMaxlength($("#email").val(), "6")
     */
    isMaxlength : function(str, chkLength){
        
    	if(!Util.isEmpty(str) && !Util.isEmpty(chkLength)) return str.length <= chkLength;
    	else return false
    },
    
    /**
     * Object 인지 체크
     * Util.isObject({"name":"valueStr"})
     */
    isObject: function(object) {
        return object !== null && "object" === typeof object;
    },
    
    /**
     * Array 형식인지 체크
     * Util.isArray(object);
     */
    isArray: function(object) {
        return Array.isArray(object);
    },
    
	/**
	 * Validate Check 결과를 Layer Tooltip으로 보여주기
	 * 
	 */
	showValidateMsg : function(paramShowType, paramValidateList){

		// Validation 관련 div 태그 전체 Remove
		$(DEF.controllId.validateLayerId).remove();
		
		var layerDiv = "";
		
		for(var idx = 0 ; idx < paramValidateList.length ; idx++){
			
			
			var validateItem = paramValidateList[idx];
			
			var itemName = validateItem.itemName;
			var itemTitle = validateItem.itemTitle;
			var itemTagName = validateItem.itemTagName;
			var itemTypeName = validateItem.itemTypeName;
			var itemValidMsg = validateItem.itemValidMsg;
			
			
			var objElement = null;
			var objBaseLayerElement = null;
			
			// Id 또는 name 으로 객체 가져오기
			objElement = (document.getElementById(itemName) == null)? document.getElementsByName(itemName) : document.getElementById(itemName);

			switch(itemTagName){
			
				case "INPUT":
					
					switch(itemTypeName){

						case "checkbox":
							//objBaseLayerElement = objElement[0].parentElement;
							objBaseLayerElement = objElement[0];
							break;
							
						case "radio":
							//objBaseLayerElement = objElement[0].parentElement;
							objBaseLayerElement = objElement[0];
							break;
							
						default:
							objBaseLayerElement = objElement;
							break;
					}
					
					break;
				case "SELECT":
					
					switch(itemTypeName){

						case "select-one":
							objBaseLayerElement = objElement;
							break;
						case "select-multiple":
							objBaseLayerElement = objElement.parentElement.children[1];
							break;
					}
					break;
					
				case "TEXTAREA":
					objBaseLayerElement = objElement;
					break;
			}
			
			
			// Validation Layer 띄우기
			var elementRect = objBaseLayerElement.getBoundingClientRect();
	
			var positionLeft = 0;
			var positionTop = 0;
			
			var divTagId = "popover-" + itemName;
			
			// Show Type에 따라 
			switch(paramShowType.toUpperCase()){
			
				case "TOP":
					
					positionLeft = elementRect.left;
					positionTop = ((elementRect.top - elementRect.height) - 7) + $(document).scrollTop();
					
					layerDiv += '<div class="popover fade top in" role="tooltip" id="'+ divTagId + '" style="top: '+ positionTop + 'px; left: '+ positionLeft +'px; display: block;">';
					layerDiv += '	<div class="arrow" style="left: 20px;"></div>';
					layerDiv += '	<h3 class="popover-title">'+ itemValidMsg + '</h3>';
					//layerDiv += '<div class="popover-content">'+ itemValidMsg + '</div>';
					layerDiv += '</div>';
					
					break;
					
				case "BOTTOM":
					
					positionLeft = elementRect.left;
					positionTop = ((elementRect.top + elementRect.height)) + $(document).scrollTop();
					
					layerDiv += '<div class="popover fade bottom in" role="tooltip" id="'+divTagId + '" style="top: '+ positionTop + 'px; left: '+ positionLeft + 'px; display: block;">';
					layerDiv += '<div class="arrow" style="left: 50%;"></div>';
					layerDiv += '<h3 class="popover-title">'+itemValidMsg+'</h3>';
					//layerDiv += '<div class="popover-content">'+ itemValidMsg + '</div>';
					layerDiv += '</div>';
					
					break;
					
				case "RIGHT":
					
					positionLeft = elementRect.right;
					positionTop = elementRect.top + $(document).scrollTop();
					
					/*
					layerDiv += '<div class="popover fade right in" role="tooltip" id="popover432553" style="top: 29px; left: 507.594px; display: block;">';
					layerDiv += '<div class="arrow" style="top: 50%;"></div>';
					layerDiv += '<h3 class="popover-title">Header</h3>';
					layerDiv += '<div class="popover-content">Content</div>';
					layerDiv += '</div>';
					
					
					var positionTrans3d = "translate3d(" + positionLeft + "px, " + positionTop + "px, 0px)";
					
					layerDiv += '<div class="popover fade bs-popover-right show" role="tooltip" id="' + divTagId + '" style="position: absolute; transform: ' + positionTrans3d + '; top: 0px; left: 0px; will-change: transform;" x-placement="right">';
					layerDiv += '<div class="arrow" style="top: 7px;"></div>';
					layerDiv += '<h3 class="popover-header"></h3>';
					layerDiv += '<div class="popover-body">' + itemValidMsg + '</div>';
					layerDiv += '</div>';
					*/
					
					break;
				
			}
		}
		
		// 
		if(!Util.isEmpty(layerDiv)){
		
			$("body").append(layerDiv);
			
			// 2초 후 Validate Tooptip 태그 전체 삭제
			setTimeout(function(){
				$(DEF.controllId.validateLayerId).remove();
			}, 2000);
		}
		
	},
	/**
	 * Confirm 메시지 처리
	 * Util.showConfirm("Confirm Message Call", function(){
		
		});
	 */
	showConfirm : function (msg, returnCallBack) {

		var dialog = bootbox.dialog({
    	    title: 'Confirm Message',
    	    message: "<p>" + msg + "</p>",
    	    backdrop: true,
    	    animate: true,
    	    //size: 'large',    //  small, large, extra-large
    	    //centerVertical:true,
    	    buttons: {
    	        cancel: {
    	            label: '<i class="fa fa-times"></i> Close',
    	            className: 'btn-info',
    	            callback: function(){
    	                
    	            }
    	        },
    	        ok: {
    	            label: '<i class="fa fa-check"></i> Confirm',
    	            className: 'btn-warning',
    	            callback: function(result){
    	                //console.log(result);
    	                if(Util.isFunction(returnCallBack)) returnCallBack(null);
    	            }
    	        }
    	    }
    	});
	},
	
};

var FORM = function(strFormId) {
	this.objForm = (!Util.isEmpty(document.getElementById(strFormId)))? $("#"+strFormId) : $("body");
	this.strFormId = strFormId;
	
	
	/**
	 * 화면에서 Control 의 값을 가져오기
	 * var currForm = new FORM("singleForm");
	 * currForm.getValue("email");
	 */
	FORM.prototype.getValue = function(strId){

		var currentForm = this.objForm;
		var returnValue = null;

		// getObjectControl Check할 대상을 가져온다
		this.getObjectControl(strId, function(returnData){
			
			returnValue = returnData.itemValue;
		});
		
		return returnValue;
	};
	
	
	/**
	 * var currForm = new FORM("singleForm");
	 * currForm.setValue("email", "aaa@aaa.com");
	 */
	FORM.prototype.setValue = function(strId,  strValue){
		
		var currentForm = this.objForm;
		var isSetting = false;
		
		if(!isSetting){
			// input text type에 넣기
			var textField = currentForm.find("input[id="+strId+"]");
			
			textField.each(function(i,elements){
				
				if(Util.isEqual(elements.id, strId)){
					elements.value = strValue;
					isSetting = true;
				}
			});
		}
		
		if(!isSetting){
			// input checkbox type에 넣기
			var checkboxField = currentForm.find("input:checkbox[name="+strId+"]");
			
			if(checkboxField.length > 0){
				
				// checkbox 초기화
				currentForm.find("input:checkbox[name="+strId+"]").prop("checked", false);
			
				checkboxField.each(function(i,elements){
					
					var arrayValue = eval(strValue);
					
					if (!Array.isArray(arrayValue)) {
						arrayValue = eval("[" + strValue + "]");
					}
					
					if (Array.isArray(arrayValue)) {
					
						arrayValue.forEach(function(data) {
							
			                if(Util.isEqual(String(elements.value), String(data))){
	
			                	//$("#"+elements.id).prop("checked", true);
			                	elements.checked = true;
			                	isSetting = true;
			                }
			            });
					}
				});
			}
		}
		
		
		if(!isSetting){
			// input radio type 에 넣기
			var radioField = currentForm.find("input:radio[name="+strId+"]");
			
			radioField.each(function(i,elements){
				
				if(Util.isEqual(elements.value, strValue)){
	
	            	//$("#"+elements.id).prop("checked", true);
					elements.checked = true;
					
	            	isSetting = true;
	            }
			});
		}
		
		
		if(!isSetting){
			// input password type에 넣기
			var passwordField = currentForm.find("input:password[id="+strId+"]");
			
			passwordField.each(function(i,elements){
				
				if(Util.isEqual(elements.id, strId)){
					elements.value = strValue;
					isSetting = true;
				}
			});
		}
		
		
		if(!isSetting){
			// input hidden type 에 넣기
			var hiddenField = currentForm.find("input:hidden[id="+strId+"]");
			
			hiddenField.each(function(i,elements){
				
				if(Util.isEqual(elements.id, strId)){
					elements.value = strValue;
					isSetting = true;
				}
			});
		}

		
		if(!isSetting){
			// textarea 에 넣기
			var textareaField = currentForm.find("textarea[id="+strId+"]");
			
			textareaField.each(function(i,elements){
				
				if(Util.isEqual(elements.id, strId)){
					elements.value = strValue;
					isSetting = true;
				}
			});
		}
		
		if(!isSetting){
			// select 에 넣기
			var selectField = currentForm.find("select[id="+strId+"]");

			selectField.each(function(i,elements){
				
				// Select 태그에 Multiple 속성이 있는지
				if(elements.multiple){
					
					// Multiple 속성이 있으면 Data Type이 Array Type이어야 함
					var arrayValue = strValue;
					
					$("#" + strId).val(arrayValue).trigger("change");
					isSetting = true;
				}else{
					//elements.value = strValue;
					$("#" + strId).val(strValue).trigger("change");
					isSetting = true;
				}
			});
		}
	};
	
	
	/**
	 * Form 안의 데이터 전부 가져오기
	 * var currForm = new FORM("singleForm");   Form id
	 * currForm.getFormValue();
	 * 중복된 id 또는 name 값이 있으면 하나의 항목만 리턴됨
	 */
	FORM.prototype.getFormValue = function(){

		var currentForm = this.objForm;
		
		var strJson = "";			// Json 데이터 포멧으로 만들기 위해 우선 String으로 조합
		
		var arrJson = [];			// id 또는 name 중복 체크를 위해 Array 객체 사용

		// Input 태그에서 가져오기
		var inputElements = currentForm.find("input");		// Input 태그 Elements
		
		inputElements.each(function(i,elements){
			
			switch(elements.type.toUpperCase()){
			
				case "EMAIL":
				case "SEARCH":
				case "URL":
				case "TEL":
				case "NUMBER":
				case "DATE":
				case "PASSWORD":
				case "HIDDEN":
				case "RANGE":
				case "TEXT":
					
					// 중복 체크
					if(!Util.checkDupArray(arrJson, "name", elements.id) && !Util.isEmpty(elements.id)){
						
						this.jsonData = {};
						
						this.jsonData.name = elements.id;
						this.jsonData.value = Util.convertSpecialChars(elements.value);
						
						arrJson.push(this.jsonData);
						
						strJson = strJson + '"' + elements.id + '":"' + elements.value + '",';
					}
					break;
					
				case "CHECKBOX":
					
					// 중복 방지
					if(!Util.checkDupArray(arrJson, "name", elements.name) && !Util.isEmpty(elements.name)){
						
						var checkedField = currentForm.find("input:checkbox[name="+elements.name+"]:checked");
						
						// check한 checkbox가 있으면
						if(checkedField.length > 0){
						
							var strArray = '"' + elements.name + '":[';
							checkedField.each(function(i,elements){
							
								this.jsonData = {};
								
								this.jsonData.name = elements.name;
								this.jsonData.value = elements.value;
								
								arrJson.push(this.jsonData);
								
								strArray = strArray + '"' + elements.value + '",';
							});
							
							strArray = strArray.substring(0, strArray.length-1);
							
							strArray = strArray + '],';
							
							strJson = strJson + strArray;
						}else{
							
							this.jsonData = {};
							
							this.jsonData.name = elements.name;
							this.jsonData.value = "";
							
							arrJson.push(this.jsonData);
							
							strJson = strJson + '"' + elements.name + '":"",';
						}
					}
					
					break;
				
				case "RADIO":
					
					// 중복 방지
					if(!Util.checkDupArray(arrJson, "name", elements.name) && !Util.isEmpty(elements.name)){
						
						var radioField = currentForm.find("input:radio[name="+elements.name+"]:checked");
						
						if(radioField.length > 0){
						
							radioField.each(function(i,elements){
	
								this.jsonData = {};
								
								this.jsonData.name = elements.name;
								this.jsonData.value = elements.value;
								
								arrJson.push(this.jsonData);
								
								strJson = strJson + '"' + elements.name + '":"' + elements.value + '",';
							});
							
						}else{
							
							this.jsonData = {};
							
							this.jsonData.name = elements.name;
							this.jsonData.value = "";
							
							arrJson.push(this.jsonData);
							
							strJson = strJson + '"' + elements.name + '":"",';
						}
					}
					
					break;
			}
		});
		
		
		// Textarea 태그에서 가져오기
		var textAreaElements = currentForm.find("textarea");		// TextArea태그 Elements
		
		textAreaElements.each(function(i,elements){

			// 중복 방지
			if(!Util.checkDupArray(arrJson, "name", elements.id)){
				
				this.jsonData = {};
				
				this.jsonData.name = elements.id;
				this.jsonData.value = Util.convertSpecialChars(elements.value);
				
				arrJson.push(this.jsonData);
			
				strJson = strJson + '"' + elements.id + '":"' + elements.value + '",';
			}
		});
		
		
		
		// Select 태그에서 가져오기
		var selectElements = currentForm.find("select");			// Select 태그 Elements
		
		if(selectElements.length > 0){
		
			selectElements.each(function(i,elements){

				// 중복 방지
				if(!Util.checkDupArray(arrJson, "name", elements.id)){
				
					this.jsonData = {};
					
					var elementValue = $("#" + elements.id).val();

					var strArray = "";
					var selectValue = "";
					
					if(!Util.isEmpty(elementValue)){
						
						if(Util.isArray(elementValue)){
							
							// Multiple 데이터를 Array 타입으로 만들기
							for(var idx = 0 ; idx < elementValue.length ; idx++){
								strArray = strArray + '"' + elementValue[idx] + '",';
							}
							
							selectValue = "[" + strArray.substring(0, strArray.length - 1) + "]";
							
						}else{
							
							selectValue = '"' + elementValue + '"';
						}
						
					}else{
						selectValue = '"' + '"';
					}
					
					this.jsonData.name = elements.id;
					this.jsonData.value = selectValue;

					arrJson.push(this.jsonData);
					
					strJson = strJson + '"' + elements.id + '":' + selectValue + ',';
				}
			});
		}

		strJson = '{"' + this.strFormId + '" : {' + strJson + strJson.substring(0, strJson.length-1) + '}}';
		
		// Json Data Type 으로 변환
		var returnJsonData = (!Util.isEmpty(strJson))? JSON.parse(strJson) : {};
		
		return returnJsonData;
	};
	
	
	/**
	 * Form 항목에 데이터 바인드 하기
	 * var currForm = new FORM("singleForm");   Form id
	 * currForm.setFormValue(paramJsonData);
	 */
	FORM.prototype.setFormValue = function(paramJsonData){

		var objJsonData = paramJsonData;

		for(var keyName in objJsonData){
			
	        var val = objJsonData[keyName];
	        
	        for(var j in val){
	            var jsonKey = j;
	            var jsonValue = val[j];
	            
	            this.setValue(jsonKey, jsonValue);
	        }
	    }
	};
	
	
	
	/**
	 * 입력 컨트롤 찾기
	 * Object 형식으로 Return
	 * var currForm = new FORM("formSample"); 
	 * currForm.getObjectControl(checkName, function(returnData){
	 * });
	 */
	FORM.prototype.getObjectControl = function(strId, returnCallBack){

		var currentForm = this.objForm;
		
		var returnObject = {};		// Return 객체
		
		var isGetting = false;		// 데이터를 가져왔는지 체크
		
		if(!isGetting){
		
			// input text 에서 가져오기
			var textField = currentForm.find("input[id="+strId+"]");
		
			textField.each(function(i,elements){
				
				isGetting = true;
				
				returnObject.tagId = strId;
				returnObject.itemTagName = elements.tagName;
				returnObject.itemTypeName = elements.type;
				returnObject.itemValue = Util.convertSpecialChars(elements.value);
			});
		}
		
		
		if(!isGetting){
			
			// input password 에서 가져오기
			var passwordField = currentForm.find("input:password[id="+strId+"]");
		
			passwordField.each(function(i,elements){
				
				//objValue = elements.value;
				isGetting = true;
				
				returnObject.tagId = strId;
				returnObject.itemTagName = elements.tagName;
				returnObject.itemTypeName = elements.type;
				returnObject.itemValue = elements.value;
			});
		}
		
		if(!isGetting){
			
			// input checkbox 에서 가져오기
			var checkboxField = currentForm.find("input:checkbox[name="+strId+"]");

			// 일치하는 Checkbox가 있으면
			if(checkboxField.length > 0){
				
				returnObject.tagId = strId;
				returnObject.itemTagName = checkboxField[0].tagName;
				returnObject.itemTypeName = checkboxField[0].type;
				
				var checkboxCheckedField = currentForm.find("input:checkbox[name="+strId+"]:checked");

				var arrayValue = [];		// Checkbox 데이터 처리를 위해 Array 사용
				
				checkboxCheckedField.each(function(i,elements){

					arrayValue.push(elements.value);		// CheckBox는 Multi 선택이 가능하므로 Array Type으로 관리
				});
			
				if(arrayValue.length > 0){
					
					isGetting = true;
					returnObject.itemValue = arrayValue;
				}
			}
		}
		
		if(!isGetting){
		
			// input radio 에서 가져오기
			var radioField = currentForm.find("input:radio[name="+strId+"]");
			
			// 일치하는 Radio 가 있으면
			if(radioField.length > 0){
				
				returnObject.tagId = strId;
				returnObject.itemTagName = radioField[0].tagName;
				returnObject.itemTypeName = radioField[0].type;
				
				var radioCheckedField = currentForm.find("input:radio[name="+strId+"]:checked");

				radioCheckedField.each(function(i,elements){
					
					isGetting = true;
					returnObject.itemValue = elements.value;
				});
			}
		}
		
		if(!isGetting){

			// selectbox 에서 가져오기
			var selectField = currentForm.find("select[id="+strId+"]");
			
			if(selectField.length > 0){

				var elements = selectField[0];
				
				isGetting = true;
				
				returnObject.tagId = strId;
				returnObject.itemTagName = elements.tagName;
				returnObject.itemTypeName = elements.type;
				returnObject.itemValue = selectField.val();
			}
		}

		if(!isGetting){
			
			// textarea 에서 가져오기
			var textareaField = currentForm.find("textarea[id="+strId+"]");
			textareaField.each(function(i,elements){

				isGetting = true;
				
				returnObject.tagId = strId;
				returnObject.itemTagName = elements.tagName;
				returnObject.itemTypeName = elements.type;
				returnObject.itemValue = Util.convertSpecialChars(elements.value);
			});
		}
		
		if(Util.isFunction(returnCallBack)) returnCallBack(returnObject);
	};
	
	
	/**
	 * Form 안의 데이터 초기화
	 * var currForm = new FORM("singleForm");   Form id
	 * currForm.initFormData();
	 */
	FORM.prototype.initFormData = function(){

		var currentForm = this.objForm;
		var strJson = "";
		var arrJson = [];			// id 또는 name 중복 체크를 위해 Array 객체 사용

		// Input 태그에서 가져오기
		var inputElements = currentForm.find("input");		// Input 태그 Elements
		
		inputElements.each(function(i,elements){
			
			switch(elements.type.toUpperCase()){
			
				case "EMAIL":
				case "SEARCH":
				case "URL":
				case "TEL":
				case "NUMBER":
				case "DATE":
				case "PASSWORD":
				case "HIDDEN":
				case "RANGE":
				case "TEXT":
					elements.value = "";
					break;
					
				case "CHECKBOX":
					elements.checked = false;
					break;
				
				case "RADIO":
					elements.checked = false;
					break;
			}
		});
		
		
		// Textarea 태그에서 가져오기
		var textAreaElements = currentForm.find("textarea");		// TextArea태그 Elements
		
		textAreaElements.each(function(i,elements){
			elements.value = "";
		});
		
		
		
		// Select 태그에서 가져오기
		var selectElements = currentForm.find("select");			// Select 태그 Elements
		
		if(selectElements.length > 0){
		
			selectElements.each(function(i,elements){
				$("#" + elements.id).val("").trigger("change");
			});
		}
	};
	
	
	/**
	 * 화면의 입력 항목에 대해서 Validation Check 하기
	 * required, number, email, phonenum, decimal, minLength, maxLength
	 * var currForm = new FORM("singleForm");   Form id
	 * var validationItems = {
			showType : 'top', 				// "top", "bottom"
			rules : [
				{fieldName:'example-text-input', 		fieldTitle:'Text', 				ruleOption:["required"]},
				{fieldName:'example-email-input', 		fieldTitle:'Email', 			ruleOption:["email"]},
				{fieldName:'example-tel-input', 		fieldTitle:'Telephone', 		ruleOption:["phonenum"]},
				{fieldName:'example-password-input', 	fieldTitle:'Password', 			ruleOption:["required","minLength=4","maxLength=8"]},
				{fieldName:'example-number-input', 		fieldTitle:'Number', 			ruleOption:["number"]},
				{fieldName:'example-date-input', 		fieldTitle:'Date', 				ruleOption:["date"]},
			]
		};
		
		// Validation Check
		currForm.validate(validationItems, function(returnValidData, validSuccess){
			
			// Validate Rule에 위반되는 항목만 결과로 return됨
			// rules 의 fieldName 미 일치시 결과값 return 안됨
			console.log(returnValidData);
			
			// Validate Success
			if(validSuccess){
				
				console.log("Success Validate");
			}
		});
    });
	 */
	FORM.prototype.validate = function(paramRuleList, returnCallBack){
		
		// Validate 결과를 
		var listValidateItem = [];
		
		// validation rule 가져오기
		var validationRule = paramRuleList.rules;

		for (var i in validationRule) {
	        
			var listCheckValidate = {};
			
			var checkName = validationRule[i].fieldName;				// 체크할 항목 ID or Name
			var checkTitle = validationRule[i].fieldTitle;				// 체크 Message Title
			var validateOption = validationRule[i].ruleOption;			// 체크 옵션 Array Type
			
			// getObjectControl Check할 대상을 가져온다
			this.getObjectControl(checkName, function(returnData){
				
				// 체크할 fieldName의 컨트롤이 있을경우만
				if(!Util.isEmpty(returnData.itemTagName)){

					// FORM.getValue로 객체 값 가져오기
					var objCheckValue = returnData.itemValue;
					
					var ruleOption = "";
					var checkLength = "";
					var validateMsg = "";
					
					// ruleOption Array 수만큼 반복
					validateOption.forEach(function(optionValue){
						
						var bDupFlag = false;			// 중복 Check Flag
						
						// Validation List 에 이미 추가된 항목이 있는지 체크
						for(var idx = 0 ; idx < listValidateItem.length ; idx++){
							
							var objItem = listValidateItem[idx];
							
							if(Util.isEqual(String(objItem.itemName), String(checkName))){
							
								bDupFlag = true;
								break;
							}
						}
						
						// 중복된 항목이 없으면
						if(!bDupFlag){
							
							//var strOptionValue = JSON.stringify(optionValue);
				
							// mixLength, maxLength 옵션이 있는 체크
							if(optionValue.indexOf("=") >= 0){
								
								// mixLength, maxLength 옵션이면 Split 으로 값 추출
								ruleOption = optionValue.split("=")[0];
								checkLength = optionValue.split("=")[1];
							}else{
								ruleOption = optionValue;
							}
							
							validateMsg = "";

							switch(ruleOption.toUpperCase()){
							
								case "REQUIRED":
					        		//if(Util.isEmpty(objCheckValue)) Util.showAlert(DEF.messages.required.format(this.checkTitle));
					        		if(Util.isEmpty(objCheckValue)){ 
					        			console.log("checkTitle : " , checkTitle)
					        			console.log("DEF.messages.required : " , DEF.messages.format)
					        			validateMsg = DEF.messages.format(checkTitle, DEF.messages.required)};
					        		break;
					        		
					        	case "NUMBER":
					        		if(!Util.isNumber(objCheckValue)){ validateMsg =  DEF.messages.number.format(checkTitle)};
					        		break;
					        		
					        	case "EMAIL":
					        		if(!Util.isEmail(objCheckValue)){ validateMsg =  DEF.messages.email.format(checkTitle)};
					        		break;
					        		
					        	case "PHONENUM":
					        		if(!Util.isPhoneNumber(objCheckValue)){ validateMsg = DEF.messages.phoneNum.format(checkTitle)};
					        		break;
					        		
					        	case "DATE":
					        		if(!Util.isDateISO(objCheckValue)){ validateMsg = DEF.messages.date.format(checkTitle)};
					        		break;
					        		
					        	case "DECIMAL":
					        		if(!Util.isDecimal(objCheckValue)){ validateMsg = DEF.messages.decimal.format(checkTitle)};
					        		break;
					        		
					        	case "MINLENGTH":
					        		if(!Util.isMinlength(objCheckValue, checkLength)){ validateMsg = DEF.messages.minLength.format(checkTitle, checkLength)};
					        		break;
					        		
					        	case "MAXLENGTH":
					        		if(!Util.isMaxlength(objCheckValue, checkLength)){ validateMsg = DEF.messages.maxLength.format(checkTitle, checkLength)};
					        		break;
							}
						
							// Check Result Message 가 있으면 보여주기
							if(!Util.isEmpty(validateMsg)){
								
								// Validation Item 에 정보 설정
								listCheckValidate.itemName =  checkName;
								listCheckValidate.itemTitle = checkTitle;
								listCheckValidate.itemTagName = returnData.itemTagName;
								listCheckValidate.itemTypeName = returnData.itemTypeName;
								listCheckValidate.itemValue = returnData.itemValue;
								listCheckValidate.itemValidMsg = validateMsg;
								
								// Validation List 에 추가
								listValidateItem.push(listCheckValidate); 
							};
						}
					});
				
				}
			});
	    }

		// Validation 성공유무
		var validSuccess = true;

		// 위반된 항목이 있으면 보여주기
		if(listValidateItem.length > 0){
			
			validSuccess = false;
			
			// Validate Check 결과를 Layer 로 보여주기
			Util.showValidateMsg(paramRuleList.showType, listValidateItem);
		}
		
		// 결과값 확인을 위해 returnCallBack 호출
		if(Util.isFunction(returnCallBack)) return returnCallBack(listValidateItem, validSuccess);
	};
};