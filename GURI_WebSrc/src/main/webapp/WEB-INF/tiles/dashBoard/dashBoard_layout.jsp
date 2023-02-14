<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%
  /**
  * @Class Name : gis_layout.jsp
  * @Description : gis 레이아웃
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2021.05.17.      김부권          최초 생성
  */
%>	
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>의정부 대시보드</title>

<!-- css -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/mapbox_1.12/mapbox-gl.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/mapbox_1.12/mapbox-gl-draw-1.2.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/base.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/common.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/contents.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/font_face.css" />
<link rel="stylesheet" href="/dist/css/dashBoard/main_new.css" />
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/import.css" /> --%> <!-- 중복 import 시킴 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/layout.css" />

<!-- Date Time Picker  -->
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/datetimepickerstyle.css"> --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/tui.grid/tui-grid.css" />

<!-- jQuery 3 -->
	<%-- <script src="${pageContext.request.contextPath}/dist/js/jquery-3.4.1.min.js"></script> --%>

<script src="${pageContext.request.contextPath}/dist/js/common/jquery-3.4.1.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/jquery-2.2.2.min.js"></script> --%>
<!-- <script src="https://cdn.jsdelivr.net/npm/@marp-team/marpit-svg-polyfill/lib/polyfill.browser.js"></script> -->
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.bpopup.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/d3/polyfill.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/d3/fetch.umd.min.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/d3/fetch.js"></script> --%>
<script src="${pageContext.request.contextPath}/dist/js/common/menu.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.easing.min.js"></script>

<!-- amchart -->
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/core.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/charts.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/themes/dark.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/animated.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/maps.js"></script> --%>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/forceDirected.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/wordCloud.js"></script>

<script src="${pageContext.request.contextPath}/dist/js/common/commonDef.js"></script>
<%-- <!-- Date Time Picker   --> 

    <!-- Date Picker Locale 설정 -->
<script src="${pageContext.request.contextPath}/dist/js/locale.ko.js"></script>

<script src="${pageContext.request.contextPath}/dist/js/bootstrap.min.js"></script>     --%> 
<script src="${pageContext.request.contextPath}/dist/js/moment.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap.min.js"></script>


	
<!-- grid -->
<script src="${pageContext.request.contextPath}/dist/js/common/tui.grid/tui-grid.js"></script>	
</head>
<!-- mapbox -->
<script src="${pageContext.request.contextPath}/dist/js/common/mapbox/mapbox-gl-1.12.0.js"></script>	
<script src="${pageContext.request.contextPath}/dist/js/common/commonVoice.js"></script>

<!-- <script    src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
<script    src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha256.js"></script>	 -->
<body>

	<div id="wrap">
		<!-- Header -->
		<tiles:insertAttribute name="header" />
		<!-- Header -->

		<!-- Content Wrapper. Contains page content -->
		<div class="contents">
			<tiles:insertAttribute name="content" />
		</div>
		<!-- /.content-wrapper -->


	
	
	    <div id="divLoading" style="position: fixed;z-index: 1000;top: 0px;left: 0px;width: 100%;height: 100%; display: none;padding-top:15px;background-color: #fff;color: #000; opacity: 0.7;">
			<div class="loading-container" style="">
			</div>
		</div>
	
		<!-- Footer  -->
		<tiles:insertAttribute name="footer" />
		<!-- Footer  -->
				
	</div>
</body>
<script type="text/javascript">

	var menuList = ['MENU_00002'];
	$(function () {
		
		
		$("dd").on("click", "a", function() {
			
			var menuItem = $(this);
			console.log("this : ", this)
			// Content 영역에 표시할 화면을 Load 한다
			var menuParam = menuItem.attr("menucode");
			//$("#divLoading").show();
			if( menuParam != null ){
				Util.loadContentPage(menuParam);
				var sideMenu = document.querySelectorAll('dd a');
				console.log("sideMenu : " ,sideMenu)
				
				// ul > li 전체 조회
				for(var i = 0; i < sideMenu.length; i++) {
						
					var tagLi = $(sideMenu[i]);
					// active 인 메뉴 속성을 지운다
					if (tagLi.attr('class') == "on") {
						tagLi.attr('class','');
					}
				}
				
				
				// Click 한 LI 태그에 active class 지정
				var parentNode = $(this).parent();
				//parentNode.attr("class", "active");
				$(this).attr("class", "on");
				$("#menu,.page_cover,html").removeClass("open");
			}
			
			
			//console.log("menuItem" , menuItem);
			// 현재 Click 한 메뉴에 active 속성 지정하기
			//$("#menu,.page_cover,html").removeClass("open");
		});
});


	var agent = navigator.userAgent.toLowerCase();
	var browse = navigator.userAgent.toLowerCase(); 
	if(((navigator.appName == 'Netscape' && browse.indexOf('trident') != -1) || (browse.indexOf("msie") != -1))){
	     // ie일 경우
	     console.log("ie11")
	}else{
	     // ie가 아닐 경우
		var repeat = 0;
	     $(".btn_voice").css("display", "");
		
		function Start() {
			$("#voiceImg").attr("src", '/dist/images/btn_mic_play.png');
		 	//window.chrome.webview.postMessage('start');
		 	
		 	
		 	//window.postMessage('start')
		 	if(window.chrome.webview != null) {
		
			    window.chrome.webview.postMessage('start');
			    
		
			}
		    /* window.webview.addEventListener('message', function(e){
		    	Util.loadContentPage(e.data);
		    }) */
		 	
		    window.addEventListener("message", function (e) {
		    	if(e.data != null ){
		    		Util.loadContentPage(e.data);
		    	}
			});
		    
			setTimeout(function(){
				 
				//clearTimeout(timerId);
			 	//timerId = null;
				$("#voiceImg").attr("src", '/dist/images/btn_mic_stop.png');
				if(window.chrome.webview != null) {
		
				    window.chrome.webview.postMessage('stop')
			
				}
				//window.postMessage('stop')
			 },3200);
		}
	}
	

//console.log("MainLayout");

</script>
</html>


