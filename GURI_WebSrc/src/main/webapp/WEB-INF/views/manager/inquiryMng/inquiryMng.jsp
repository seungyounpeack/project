<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : inquiryMng.jsp
  * @Description : 문의사항 관리 페이지
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2022.06.15.      권기완          최초 생성
  */
%>	
<section id ="container">
<form id="detailForm">
<input type="hidden" id="inquiryPk" name="inquiryPk">
</form>
			<h2>문의사항 관리</h2>
			<div class ="contents">
				<!-- 검색 -->
			<div class="search_wrap">
				<ul>
					<li>
						<span class="sch_title">구분</span>
						<select name="searchSel" id="searchSel" class="select_sch">
							<option value="searchAll">전체</option>
							<option value="postCont">제목</option>
							<option value="postTitle">내용</option>
							<option value="postName">작성자</option>
						</select>
					</li>
					<li class="wd45">
						<input id="searchForm" type="text" class="input_sch" />
					</li>
					<li class="wd7"><a href="#" id="btnTableSearch" class="sch_button">검색</a></li>
				</ul>
			</div>
					
		 	<!-- 테이블 배치 -->
		 	<div class="table_area">
				<table class="list_table" id="list_table">
					<caption></caption>
					<colgroup>
						<col width="10%" />
						<col width="10%" />
						<col width="20%" />
						<col width=" " />
						<col width="10%" />
						<col width="10%" />
						<col width="10%" />
					</colgroup>
					<thead>
						<tr>
							<th><input type="checkbox" id="chkAll"></th>
							<th>번호</th>
							<th>제목</th>
							<th>내용</th>
							<th>작성자</th>
							<th>등록날짜</th>
							<th>답변상태</th>
						</tr>
					</thead>
					<tbody id="inquiryTableList"></tbody>
				</table>
			
			
			<!-- 페이징 부분 -->
			<div class="paging" id="paging">
					<!-- <a href="#" class="first">처음페이지</a>
					<a href="#" class="prev">이전페이지</a>
					<a href="#" class="on">1</a>
					<a href="#">2</a>
					<a href="#">3</a>
					<a href="#">4</a>
					<a href="#">5</a>
					<a href="#" class="next">다음페이지</a>
					<a href="#" class="last">마지막페이지</a> -->
				</div>
			</div>
				<div class="btn_area">
					<a href="#" class="bt_md btn_red" id="inquiryDel">삭제</a>
				</div>
		</div>
	</section>
	
	<script src="${pageContext.request.contextPath}/pageJs/manager/inquiryMng/inquiryMng.js"></script>