<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : workList.jsp
  * @Description : intro 페이지
  * @Modification Information
  *
  *     수정일                   수정자                          수정내용
  *  -----------   -------------   ----------------------
  *  2022.10.26        권기완                          최초 생성
  */
%>	
<html style="min-width:1500px">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-2.2.2.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
<title>솔루션 워크플로워 페이지</title>
</head>
<body>
<div style="width:95%; height: 95%; margin:auto;">
	<div id= "topMenu" style="width:100%; height:15%; display:block; position:relative;">
		<div id="searchBox" style="width:100%; height:50%; position:absolute; bottom:0px;">
			<div id= "searchBoxTop" style = "width:100%; height:50%; text-align: end;">
				<div id="searchInput" style="position:relative">
					<input id="workSearch" type="text" placeholder="워크플로워 검색">
					<button id="workSearchBtn">검색</button>
				</div>
			</div>
				<div id= "searchBoxBottom" style = "width:100%; height:50%; text-align: end;">
					<select name="searchSort"id="searchSort">
						<option value="001">최신순</option>
						<option value="002">조회순</option>
						<option value="003">다운로드순</option>
					</select>
				</div>
			</div>
		</div>
		
	<div id= "leftMenu" style="width:14%; height:80%; border:solid 1px blue; display:inline-block">
		<div>
			<ul id = "categoryMenu"style="list-style:none;"> 
				<!-- <li><label><input type="checkbox"> 메뉴 1 </label> <span> 11 </span></li>
				<li><label><input type="checkbox"> 메뉴 2 </label></li>
				<li><label><input type="checkbox"> 메뉴 3 </label></li>
				<li><label><input type="checkbox"> 메뉴 4 </label></li>
				<li><label><input type="checkbox"> 메뉴 5 </label></li>
				<li><label><input type="checkbox"> 메뉴 6 </label></li>
				<li><label><input type="checkbox"> 메뉴 7 </label></li>
				<li><label><input type="checkbox"> 메뉴 8 </label></li> -->
			</ul>
		</div>
		<div>
			<ul id = "feeMenu" style="list-style:none;">
				<li><label><input type="checkbox" name="fee" value="001"> 유료 </label></li>
				<li><label><input type="checkbox" name="fee" value="002"> 무료 </label></li>
			</ul>
		</div> 
	</div>
	
	<div id= "rightMenu" style="width:85%; height:80%; display:inline-block; float:right">
		<div id= "rightMenuTop" style="width:100%; height:10%; border-bottom:solid 1px blue;">
			<div style="width:20%; height:100%; border:1px solid blue; display: flex; justify-content: center; align-items: center;">
				<span>워크플로워(<span id="workTotal"></span>)건</span>
			</div>
		</div>
		<div id= "rightMenuBottom" style="width:100%; height:90%;">
			<ul id="contentsList" style="display:flex;flex-wrap: wrap;list-style:none;">
				<!-- <li style="position: relative; width: 17.5%; margin-right: 16px; margin-bottom: 16px; padding: 5px; background-color:#B9C2C2;min-width: 265px;">
					<div class="topBox" index-no="1">
						<img src="/dist/images/manager/login_logo.png" style="width: 100%; cursor: pointer; height: 100px;">
						<img src = /dist/images/ico_new.png>
					</div>
					<div class="bottomBox" style="padding: 12px;box-sizing: border-box;height: 132px; position: relative;">
						<div>
							<span style="font-weight:bold">워크플로워명</span>
							<span style="background-color:#FFC000; color:white; float:right; padding: 2px 5px 2px 5px;">구매</span>
						</div>
						<div style="display:flex">
							<p style="font-size:12px">워크플로우 설명 요약</p>
						</div>
						<div style="display:flex; bottom: 0px; position: absolute;">
							<span style="font-size:12px;margin-right: 30px;">2022.08.23</span>
							<img src = "/dist/images/ico_new.png" style="margin-right: 5px;">
							<span style="font-size:12px;margin-right: 10px;">10</span>
							<img src = "/dist/images/ico_new.png" style="margin-right: 5px;">
							<span style="font-size:12px;margin-right: 30px;">10</span>
							<span style="font-size:16px; margin-right: 10px; font-weight:bold;">무료</span>
						</div>
					</div>
				</li> -->
			</ul>
			<div class="paging" id="paging" style = "text-align:center;">
			</div>
		</div>
	</div>

</div>
<form id="workDetailForm">
    <input type='hidden' id="workPk" name="workPk" value="${workPk} " />
</form>
</body>
<script src="${pageContext.request.contextPath}/pageJs/solution/workList/workList.js"></script>
</html>