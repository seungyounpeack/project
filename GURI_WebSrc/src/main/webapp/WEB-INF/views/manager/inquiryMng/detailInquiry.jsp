<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : detailInquiry.jsp
  * @Description : 문의 상세 페이지
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2022.06.15.      권기완          최초 생성
  */
%>	
<section id ="container">
<form id="detailForm">
<input type="hidden" id="inquiryPk" name="inquiryPk" value="${inquiryPk}">
</form>
			<h2>문의사항 상세</h2>
			<div class ="contents">
		 	<!-- 테이블 배치 -->
		 	<div class="board_area">
				<table class="view_table">
								 	<caption>문의글 상세보기 테이블</caption>
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
											<th>답변내용</th>
											<td colspan="3">
												 <div id="ansDiv">
												</div>
											</td>
										</tr>
									</tbody>
								</table>
			</div>
			
				<div class="btn_area">
					<a href="#" class="bt_md btn_gray" id="inquiryList">목록으로</a>
				</div>
		</div>
	</section>
	
	<script src="${pageContext.request.contextPath}/pageJs/manager/inquiryMng/detailInquiry.js"></script>