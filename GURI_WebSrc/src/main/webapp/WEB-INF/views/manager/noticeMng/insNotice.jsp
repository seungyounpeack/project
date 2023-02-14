<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : noticeMng.jsp
  * @Description : 공지사항 수정 페이지
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  *  2022.06.15.      권기완          최초 생성
  */
%>	
<section id ="container">
<form id="detailForm">
<input type="hidden" id="noticePk" name="noticePk">
<input type="text" id="bsctSe" name="bsctSe">
</form>
			<h2 id="insMng_title"></h2>
			<div class ="contents">
		 	<!-- 테이블 배치 -->
		 	<div class="board_area">
				<table class="write_table">
								 	<caption>문의글 상세보기 테이블</caption>
									<colgroup>
										<col width="20%" />
										<col width=" " />
									</colgroup>
									<tbody>
										<tr>
											<th><span style="color:red;">*  </span>제목</th>
											<td colspan="3">
												<input id="bbsSj" name="bbsSj" type="text" class="wd45" >
											</td>
										</tr>	
										<tr>
											<th><span style="color:red;"> *  </span>내용</th>
											<td colspan="3">
												<textarea id="bbsCn" name="bbsCn" rows="5" class="wd100 noticeTextArea"></textarea>
											</td>
										</tr>
										<tr>
											<th>파일첨부</th>
											<td colspan="3">
												 <div id="fileDiv">
														<!-- 
													<div id="data_file_txt" style="margin:10px; margin-bottom: 30px;">
														<span style="font-size: 12px;">첨부 파일 목록</span>
														<br />
														<div id="articlefileChange">
														</div>
														
													</div>
													<button id="btnFile" type="button">
													</button>
														 -->
													<input id="postFile" class="wd50" name="postFile" type="file" multiple="multiple" accept="*">
													<div class="file-list"></div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
			</div>
			
				<div class="btn_area">
					<a href="#" class="bt_md b_blue" id="noticeSave">등록</a>
					<a href="#" class="bt_md btn_red" id="noticeList">취소</a>
				</div>
		</div>
	</section>
	
	<script src="${pageContext.request.contextPath}/pageJs/manager/noticeMng/insNotice.js"></script>