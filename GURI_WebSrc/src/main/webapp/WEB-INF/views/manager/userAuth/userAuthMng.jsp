<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : complain_dept.jsp
  * @Description : 부서/직위 권한 관리자 페이지
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2020.07.03.      전동표          최초 생성
  */
%>	
	<section id="container">
			<h2>사용자 권한 적용</h2>
			<div class="search_wrap">
				<ul>
					<li class="division">
						<span class="sch_title">상위 부서</span>
						<select id="department" class="select_sch">
							<option value=""></option>
						</select>
					</li>
					<li class="division">
						<span class="sch_title">하위 부서</span>
						<select id="section" class="select_sch">
							<option value=""></option>
						</select>
					</li>
					<li class="division">
						<span class="sch_title">직위</span>
						<select id="position_id" class="select_sch">
							<option value=""></option>
						</select>
					</li>
					<li class="division">
						<span class="sch_title">사용자명</span>
						<input id="userName" type="text" class="input_sch2" />
					</li>
					<li class=""><a href="#" id="btnSearchUser" class="sch_button">검색</a></li>
				</ul>
			</div>
			
			<div class="admin_content">
				<div class="left_area">
					<h3>사용자 목록</h3>
					<div data-ax5grid="dept-grid" data-ax5grid-config='{name:"dept-grid"}' class="grid">
					</div>
				</div>
				<div class="right_area">
					<h3>사용자별 권한 목록</h3>
					<div data-ax5grid="role-grid" data-ax5grid-config='{name:"role-grid"}' class="grid">
					</div>
						<p class="admin_btns"><a id="btnSaveRoleInfo" href="#" class="bt_md b_blue">저장</a></p>
				</div>
			</div>

			
		</section>
<script src="${pageContext.request.contextPath}/pageJs/manager/userAuth/userAuthMng.js"></script>