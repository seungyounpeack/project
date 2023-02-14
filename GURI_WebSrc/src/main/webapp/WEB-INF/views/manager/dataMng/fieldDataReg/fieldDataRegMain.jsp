<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%

%>	
<section id="container">
			<h2>분야별 데이터 등록</h2>
			
			<div class="admin_content">
				<div class="left_area">
					
					<div class="search_wrap mt0">
						<ul>
							<li class="wd85">
								<span class="sch_title">분야</span>
								<select id="fieldDataCode" name="fieldDataCode" class="select_sch">
									<option value="">전체</option>
								</select>
							</li>
							<li class="wd7"><a id="btnCodeSearch" href="#" class="sch_button">검색</a></li>
						</ul>
					</div>
					
					<div id="formCodeInfo" class="table_area">
						<table class="admin_list" summary="연계상태 검색을 위한 리스트 테이블">
							<caption>연계상태 검색을 위한 현황 리스트</caption>
							<colgroup>
								<col width="10%" />
								<col width=" " />
								<col width="16%" />
								<col width="16%" />
							</colgroup>
							<thead>
								<tr class="fldDataListTitle">
									<th>번호</th>
									<th>데이터 셋명</th>
									<th>등록자</th>
									<th>등록일</th>
								</tr>
							</thead>
							<tbody id="fieldDataList">
							</tbody>
						</table>
					</div>
				</div>
				
				<div class="right_area">
					<!-- <h3>키워드 추가</h3> -->
						<input type="hidden" id="fldFileId" value="">
						<table class="admin_write" summary="">
							<caption></caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>분야</th>
									<td>
										<select id="fldCd" name="fldCd" class="select_sch">
										<option value="">분야 선택</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>제공기관</th>
									<td><input type="text" id="instNm" name="instNm" class="input_basic" /></td>
								</tr>
								<tr>
									<th>파일기간</th>
									<td style="position: relative">
										<input type='text' class="input_sch" id="iptstart_date" name="iptstart_date" value="" /> ~ 
										<input type='text' class="input_sch "id="iptend_date" name="iptend_data"value="" />
									</td>
								</tr>
								<tr>
									<th>데이터셋명</th>
									<td><input type="text" id="dataNm" name="dataNm" class="input_basic" /></td>
								</tr>
								<tr>
									<th>파일 업로드</th>
									<td><input type="file" id="uploadFile" name="uploadFile" class="input_basic" accept=".csv , .txt"/></td>
								</tr>
								<tr>
									<th>DB테이블 생성 여부</th>
									<td>
										<input type="radio" id="tableY" name="tableYn" value="Y" />
										<label for="Y">생성</label>
										<input type="radio" id="tableN" name="tableYn" value="N" />
										<label for="N">미생성</label>
									</td>
								</tr>
								<tr>
									<th>헤더</th>
									<td>
										<input type="radio" id="headerY" name="headerYn" value="Y" />
										<label for="Y">유</label>
										<input type="radio" id="headerN" name="headerYn" value="N" />
										<label for="N">무</label>
									</td>
								</tr>
								<tr>
									<th>파일 구분자</th>
									<td>
										<select id="fileSe" name="fileSe" class="select_sch">
										<option value="" >구분자 선택</option>
										<option value=";" >;</option>
										<option value="," >,</option>
										<option value="|" >|</option>
										<option value="\t" >Tab</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>출처</th>
									<td><input type="text" id="sourceNm" name="sourceNm" class="input_basic" /></td>
								</tr>
							</tbody>
						</table>
						<p class="admin_btns">
							<span class="admin_btns"><a href="#" id="dataDel" class="bt_md b_red">삭제</a></span>
							<span class="admin_btns"><a href="#" id="dataIns" class="bt_md b_green">신규 등록</a></span>
							<span class="admin_btns"><a href="#" id="dataUpd" class="bt_md b_blue">수정</a></span>
						</p>
						<p class="admin_btns">
							<span class="admin_btns"><a href="#" id="dataCancel" class="bt_md b_red">취소</a></span>
							<span class="admin_btns"><a href="#" id="dataSave" class="bt_md b_blue">저장</a></span>
						</p>					
				</div>
			</div>
		</section>

<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/pageJs/manager/dataMng/fieldDataReg/fieldDataRegMain.js"></script>

