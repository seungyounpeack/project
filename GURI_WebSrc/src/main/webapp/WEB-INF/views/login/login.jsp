<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : login.jsp
  * @Description : 로그인 페이지
  * @Modification Information
  *
  *     수정일                   수정자                          수정내용
  *  -----------   -------------   ----------------------
  *  2021.10.06        김부권                          최초 생성
  */
%>	
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>의정부시 로그인 페이지 </title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/manager/admin.css">
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-2.2.2.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>
</head>

<body class="login_body">
	<p class="bg_left"></p>
	<p class="bg_right"></p>
	
	<div id="login_wrap">
		
		<div class="login_all">
			<p class="login_logo"><img src="/dist/images/manager/login_logo.png" alt="" /></p>
			<div class="login_box">
				<p class="title_login">빅데이터 분석.공유 활용시스템</p>
				
				<ul class="select_tab">
					<li><input type="radio" name="member" id="memb" value="exist" checked="checked"> <label for="memb">기존사용자</label></li>
					<li><input type="radio" name="member" id="join" value="new"/> <label for="join">신규사용자</label></li>
				</ul>
				
				<div class="form_area" id="divUserLogin">
					<ul class="idpw_area">
						<li><input type="text" class="input_login" id="userId" placeholder="아이디를 입력해주세요" /></li>
						<li><input type="password" class="input_login" id="userPassword" placeholder="비밀번호를 입력해주세요" /></li>
						<li><a href="#" id="userLogin" class="login_button">로그인</a></li>
					</ul>
					<p class="login_desc">* 아이디나 비번을 잊으셨을 경우 
					<!-- <span class="c_blue undline">031-1234-5678</span>로 -->
					<br />관리자에게 문의하시기 바랍니다.</p>
				</div>
				
				<div class="form_area" id="divUserCreate" style="display:none">
					<ul class="idpw_area">
						<li class="nameid">
							<input type="text" id="searchId" class="input_login wd75" placeholder="아이디를 입력해주세요" /><br />
							<input type="text" id="searchUserName" class="input_login wd75 mt4" placeholder="성함을 입력해 주세요" />
							<a href="#" id="searchInfo" class="bt_xs2 b_gray">검색</a>
						</li>
						<li id="selectId" style="display:none">
							<select id="selectUserInfo" class="join_select">
								<option disabled selected hidden>사용하실 아이디를 선택해주세요</option>
								<option value=""></option>
							</select>
						</li>
						<%/*  <li><input type="text" class="input_login wd75" placeholder="성함을 입력해주세요" /> </li> */%>
						<li><input type="password" class="input_login" id="createPassword" placeholder="사용하실 비밀번호를 입력해주세요" /></li>
						<li><input type="password" class="input_login" id="createPasswordCheck" placeholder="비밀번호를 한번 더 입력해주세요" /></li>
						<li><a href="#"  id="userCreate" class="join_button b_blue">사용자등록</a><%/*  <a href="#" id="createCancel" class="join_button b_gray">취소</a> */%></li>
					</ul>
				</div>
				
			</div>
			<p class="login_footer">Copyright ⓒ 2021 Uijeongbu CITY All Rights Reserved. </p>
		</div>
		<div id="divLoading" style="position: fixed;z-index: 1000;top: 0px;left: 0px;width: 100%;height: 100%; display: none;padding-top:15px;background-color: #fff;color: #000; opacity: 0.7;">
			<div class="loading-container" style="">
			</div>
		</div>
	</div>
	
</body>
<script src="${pageContext.request.contextPath}/pageJs/login/login.js"></script>
</html>
