<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%
  /**
  * @Class Name : manager_layout.jsp
  * @Description : manager 레이아웃
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2021.09.17.      김부권          최초 생성
  */
%>	
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>구리시 관리자 페이지</title>

<!-- css -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/manager/admin.css">
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/manager/admin_base.css"> --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/font_face.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/js/ax5ui/css/ax5grid.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/manager/custom.css">
<!-- Date Time Picker  -->
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/datetimepickerstyle.css"> --%>

<!-- jQuery 3 -->
	<%-- <script src="${pageContext.request.contextPath}/dist/js/jquery-3.4.1.min.js"></script> --%>

<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-2.2.2.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/@marp-team/marpit-svg-polyfill/lib/polyfill.browser.js"></script> -->
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.bpopup.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/d3/polyfill.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/d3/fetch.umd.min.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/d3/fetch.js"></script> --%>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/jquery-3.4.1.min.js"></script> --%>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.easing.min.js"></script>

<!-- amchart -->
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/core.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/charts.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/themes/dark.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/animated.js"></script>
<%-- <script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/maps.js"></script> --%>

<!-- Date Time Picker   --> 
<script src="${pageContext.request.contextPath}/dist/js/moment.min.js"></script>

<!-- Date Picker Locale 설정 -->
<script src="${pageContext.request.contextPath}/dist/js/locale.ko.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap.min.js"></script>     

	

<!-- grid -->
<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
    <script src="${pageContext.request.contextPath}/dist/js/ax5ui/js/ax5core.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/ax5ui/js/ax5grid.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/gnb.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/commonDef.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/commonGrid.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/exceljs/exceljs.min.js"></script>	
    <script src="${pageContext.request.contextPath}/dist/js/common/fileSaver/FileSaver.min.js"></script>	

<body>
	<div id="admin_wrap">
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
var menuList = ['MENU_00005'];
$(function () {
	var loading = $.loading();
	var requestUrl = "/mamager/menuMng/selectAuthMenuList.ajax";

	var param ={};

	param.menuInfo = {menuTp : 'A'};
	console.log("222222222222")			
	var html = '';
	// 메뉴 목록 조회하기
	Util.request(requestUrl, param, function(resultData){
		var menu = resultData.menuList;
		var menuList = document.getElementById('menuList');
		var no = 1;
		menuList.innerHTML = '';
		menu.forEach(function(item, index){
			if( item.menuDp == 2 ) {
				if( no > 2 ){
					html += '</div>';
					html += '</li>';
				}
				html += '<li class="gnb' + no + '">								';
				html += '<a href="javascript:;">' + item.menuNm + '</a>									';
				html += '<div class="twoD" id="'+item.menuCd+'">';
				no += 1;
			} /* else if( item.menuDp > 2 ){
				
				//html += '<a href="javascript:;" menucode="' + item.menuCd + '" >' + item.menuNm + '</a>									';
			}  */
			if( index == (menu.length-1) ){
				html += '</div>';
				html += '</li>';
			}
		})
		menuList.innerHTML = html;
		menu.forEach(function(item, index){
			if( item.menuDp > 2 ){
				//console.log("item.menuNm : " , item.menuNm ) 
				$("#"+item.parentCode+"").append('<a href="javascript:;" menucode="' + item.menuCd + '" >' + item.menuNm + '</a>')
			} 
		})
		
		$(".twoD").on("click", "a", function() {
			console.log("클릭")
			var menuItem = $(this);
			// Content 영역에 표시할 화면을 Load 한다
			var menuParam = menuItem.attr("menucode");
			
			console.log("1111111111 : ",menuParam)
			//$("#divLoading").show();
			Util.loadContentPage(menuParam);
			
			
			console.log("menuItem" , menuItem);
			// 현재 Click 한 메뉴에 active 속성 지정하기
			var sideMenu = document.querySelectorAll('.twoD a');
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
			console.log("parentNode : ", parentNode)
			//parentNode.attr("class", "active");
			$(this).attr("class", "on");
			$("#menu,.page_cover,html").removeClass("open");
			//$("#menu,.page_cover,html").removeClass("open");
		});
	});
	
	
	
});
	
	//로그아웃
	function fn_logout(){
		Util.request("/login/logoutUser.do", null, function(){
			location.replace("/login.do");
		})
	}

</script>
</html>


