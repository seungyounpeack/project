<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	
%>
<section id="container">
	<h2>키워드 유형 관리</h2>

	<!-- 검색 부분  -->
	<div class="search_wrap" style="position: relative">
		<ul>
			<li><span class="sch_title">검색 기간</span> <input type='text'
				class="input_sch" id="iptstart_date" value="${date.startDate }" /> ~
				<input type='text' class="input_sch " id="iptend_date"
				value="${date.endDate }" />
			<li class="wd20"><span class="sch_title">단어</span> <input
				id="searchWord" type="text" class="input_sch" /></li>
			<li class="wd7"><a href="#" id="btnAnalysisStopword"
				class="sch_button">검색</a></li>
		</ul>
	</div>
	<div class="admin_content">
		<div class="left_area">
			<h3>키워드 목록</h3>
			<div class="grid" data-ax5grid="stopword-grid"
				data-ax5grid-config='{name:"stopword-grid"}'>
				<img src="image/grid_ex.jpg" alt="" />
			</div>
			<p class="admin_btns">
				<a id="btnDeleteStopword" href="#" class="bt_md b_blue">키워드 삭제</a>
			</p>
		</div>

		<div id="keywordInfo" class="right_area">
			<h3>키워드 추가</h3>
			<table class="admin_write" summary="키워드 내용 입력">
				<caption>권한 정보를 저장하기 위한 테이블</caption>
				<colgroup>
					<col width="30%" />
					<col width=" " />
				</colgroup>
				<tbody>
					<tr>
						<th>분류</th>
						<td><label for="posWord">긍정</label> <input type="radio"
							id="posWord" name="wordTp" value="긍정" /> <label for="negWord">부정</label>
							<input type="radio" id="negWord" name="wordTp" value="부정" /> <label
							for="stopWord">불용어</label> <input type="radio" id="stopWord"
							name="wordTp" value="불용어" /></td>
					</tr>
					<tr>
						<th>키워드</th>
						<td><input type="text" id="word" name="word"
							class="input_basic" /></td>
					</tr>
				</tbody>
			</table>
			<p class="admin_btns">
				<a href="#" id="btnSaveInfo" class="bt_md b_blue">키워드 추가</a>
			</p>
		</div>
	</div>
</section>

<!-- Page 스크립트 -->
<script
	src="${pageContext.request.contextPath}/pageJs/manager/stopword/stopwordMain.js"></script>
