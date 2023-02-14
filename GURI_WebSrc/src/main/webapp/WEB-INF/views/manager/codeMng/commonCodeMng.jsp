<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : commonCodeMng.jsp
  * @Description : 공통코드 관리 페이지
  * @Modification Information
  *
  *     수정일                         수정자                            수정내용
  *  -----------       -------------   ----------------------
  *  2022.06.15.           김부권                          최초 생성
  */
%>	

		<section id="container">
			<h2>공통 코드 관리</h2>
						
			<div class="admin_content">
				<div class="left_area">
					<h3>그룹 공통코드 목록</h3>
					<div data-ax5grid="code-grid" data-ax5grid-config='{name:"code-grid"}' class="grid">
					</div>
						<p class="admin_btns">
							<button id="btnCreateCode" class="bt_md btn_blue">생성</button> 
							&nbsp; 
							<button id="btnModifyCodeInfo" class="bt_md btn_green" disabled="disabled">수정</button>
							&nbsp; 
							<button id="btnSaveCodeInfo" class="bt_md btn_red" disabled="disabled">저장</button>
							&nbsp; 
							<button id="btnCancleCodeInfo" class="bt_md btn_gray" disabled="disabled">취소</button>
						</p>
					<h3>코드 정보</h3>
					<div id="formCodeInfo" class="tab_content on">
						<table class="admin_write" summary="그룹 코드정보 내용 입력"> 
							<caption>그룹 코드 정보 목록 테이블</caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>코드 ID</th>
									<td><input type="text" id="codeId" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>코드명</th>
									<td><input type="text" id="codeName" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>코드설명</th>
									<td><input type="text" id="codeDesc" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>정렬순서</th>
									<td><input type="text" id="codeOrder" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>사용유무</th>
									<td><label for="use">사용</label> <input type="radio" id="use" name="useYn" value="Y"  disabled="disabled"/> <label for="unuse">미사용</label> <input type="radio" id="unuse" name="useYn" value="N" disabled="disabled"/></td>
								</tr>
							</tbody>
						</table>
						
					</div>
				</div>
				<div class="right_area">
					<h3>하위 공통코드 목록</h3>
					<div data-ax5grid="subCode-grid" data-ax5grid-config='{name:"subCode-grid"}' class="grid">
					</div>
						<p class="admin_btns">
							<button id="btnCreateSubCode" class="bt_md btn_blue" disabled="disabled">생성</button> 
							&nbsp; 
							<button id="btnModifySubCodeInfo" class="bt_md btn_green" disabled="disabled">수정</button>
							&nbsp; 
							<button id="btnSaveSubCodeInfo" class="bt_md btn_red" disabled="disabled">저장</button>
							&nbsp; 
							<button id="btnCancleSubCodeInfo" class="bt_md btn_gray" disabled="disabled">취소</button>
						</p>
					<h3>코드 정보</h3>
					<div id="formSubCodeInfo" class="tab_content on">
						<table class="admin_write" summary="하위 코드 정보 내용 입력"> 
							<caption>하위 코드 정보를 저장하기 위한 테이블</caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>상위 코드명</th>
									<td><input type="text" id="groupCode" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>코드 ID</th>
									<td><input type="text" id="subCodeId" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>코드명</th>
									<td><input type="text" id="subCodeName" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>코드설명</th>
									<td><input type="text" id="subCodeDesc" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>정렬순서</th>
									<td><input type="text" id="subCodeOrder" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>사용유무</th>
									<td><label for="subUse">사용</label> <input type="radio" id="subUse" name="subUseYn" value="Y"  disabled="disabled"/> 
									<label for="unSubUse">미사용</label> <input type="radio" id="unSubUse" name="subUseYn" value="N" disabled="disabled"/></td>
								</tr>
							</tbody>
						</table>
						
					</div>
					
				</div>
			</div>
			
		<!-- 20210804 tab스크립트 -->
			<!-- <script>
				$('.tab_link').click(function () {
					var tab_id = $(this).attr('data-tab');

					$('.tab_link').removeClass('on');
					$('.tab_content').removeClass('on');

					$(this).addClass('on');
					$("#" + tab_id).addClass('on');

				});
			</script> -->
			

    </section>
    <!-- /.content -->
    
<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/pageJs/manager/codeMng/commonCodeMng.js"></script>
    