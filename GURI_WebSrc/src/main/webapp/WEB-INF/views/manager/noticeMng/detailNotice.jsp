<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	/**
	* @Class Name : detailNotice.jsp
	* @Description : 공지사항 상세 페이지
	* @Modification Information
	*
	*  수정일         수정자         수정내용
	*  -------       -------------   ----------------------
	*  2022.06.15.      권기완          최초 생성
	*/
%>
<section id="container">
	<form id="detailForm">
		<input type="hidden" id="noticePk" name="noticePk" value="${noticePk}">
		<input type="hidden" id="bsctSe" name="bsctSe" value="${bsctSe}">
	</form>
	<div id="detailMng_title"></div>
	<div class="contents" id="deteil">
		<!-- 테이블 배치 -->
		<div class="board_area">
			<table class="view_table">
				<caption>공지사항 상세보기 테이블</caption>
				<colgroup>
					<col width="20%" />
					<col width=" " />
				</colgroup>
				<tbody>
					<tr>
						<th>제목</th>
						<td colspan="3">
							<div id="title"></div>
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td colspan="3">
							<div id="contents" style="min-height: 300px;"></div>
						</td>
					</tr>
					<tr>
						<th>작성자</th>
						<td colspan="3">
							<div id="regId"></div>
						</td>
					</tr>
					<tr>
						<th>작성일자</th>
						<td colspan="3">
							<div id="regDate"></div>
						</td>
					</tr>
					<tr>
						<th>첨부파일</th>
						<td colspan="3">
							<div id="fileDiv"></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="btn_area">
			<a href="#" class="bt_md b_blue" id="noticeUpdate">수정</a> <a href="#"
				class="bt_md b_gray" id="noticeList">목록으로</a>
		</div>
	</div>
</section>

<script
	src="${pageContext.request.contextPath}/pageJs/manager/noticeMng/detailNotice.js"></script>