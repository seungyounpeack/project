<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : logMng.jsp
  * @Description : 로그관리 관리자 페이지
  * @Modification Information
  *
  *  수정일         수정자         수정내용
  *  -------       -------------   ----------------------
  */
%>	

	<section id="container">
			<h2>데이터 다운로드 통계</h2>
			
			<div class="admin_content">
				
				<div class="user_access">
					<dl class="access_box b_lightBlue">
						<dt>이번달 분야별 데이터 다운로드 수</dt>
						<dd id="fieldDown"></dd>
					</dl>
					<dl class="access_box b_lightBlue">
						<dt>누적 다운로드 수</dt>
						<dd id="accDown"></dd>
					</dl>				
				</div>
				
				<div class="left_area">
					
					<div class="search_wrap mt0">
						<ul>
							<li class="wd40">
								<span class="sch_title">주기 설정</span>
								<select id="sort" class="select_sch wd70">
									<option value="month">월별 통계(6개월)</option>
									<option value="day">요일별 통계</option>
								</select>
							</li>
							<li class="calendar_area" style="position:relative;" >
								<span class="sch_title">기간</span>
								<input id="startDate" type="text" class="input_sch wd70 dateSelect" value="${startDate.max }" />
								<input type="hidden" id="start" value="${startDate.min }" >
								<input type="hidden" id="end" value="${startDate.max }" >
							</li>
							<li class="wd7"><a href="#" id="btnSearch" class="sch_button">검색</a></li>
						</ul>
					</div>
					
					<div id="logMonthChart" class="graph_450">
						
					</div>
				</div>
				<div class="right_area">
					<h3>상세 다운로드 정보</h3>
					<!-- 210924 추가 -->
					<div class="table_area scroll_box">
						<table class="admin_list" summary="상세 다운로드 정보 테이블">
							<caption>상세 다운로드 정보</caption>
							<colgroup>
								<col width="10%" />
								<col width="15%" />
								<col width="15%" />
								<col width="30%" />
							</colgroup>
							<thead>
								<tr>
									<th>순위</th>
									<th>분야</th>
									<th>다운로드 수</th>
									<th>비율</th>
								</tr>
							</thead>
							<tbody id="logMenuList">
								<!-- <tr>
									<td>1</td>
									<td class="t_l reduce_t">http://www.abc.co.kr/abcdefghijklmnopqrstu</td>
									<td>135</td>
									<td><div class="tbl_grp"></div> <span class="grp_t">91%</span></td>
								</tr>
								<tr>
									<td>2</td>
									<td class="t_l reduce_t">http://www.abc.co.kr/abcdefghijklmnopqrstu</td>
									<td>135</td>
									<td><div class="tbl_grp"></div> <span class="grp_t">91%</span></td>
								</tr> -->
							</tbody>
						</table>
					</div>
					<p class="admin_btns">
						<a id="btnExcelDownload" class="bt_md b_green" style="cursor:pointer">엑셀다운로드</a>
					</p>
				</div>
			</div>
			
			
		</section>
		
		
	<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/dist/js/common/commonChart.js"></script>
	<script src="${pageContext.request.contextPath}/pageJs/manager/logDataMng/logDataMng.js"></script>
		