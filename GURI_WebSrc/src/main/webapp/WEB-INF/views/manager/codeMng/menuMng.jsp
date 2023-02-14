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
					<h3>메뉴 목록</h3>
					<div data-ax5grid="menu-grid" data-ax5grid-config='{name:"menu-grid"}' class="grid">
					</div>
						<p class="admin_btns">
							<button id="btnModifyMenuInfo" class="bt_md btn_green" disabled="disabled">수정</button>
							&nbsp; 
							<button id="btnCreateMenu" class="bt_md btn_blue">메뉴생성</button> 
						</p>
				</div>
				<div class="right_area">
					<h3>메뉴 정보</h3>
					<div id="formMenuInfo" class="tab_content on">
						<table class="admin_write" summary="권한정보 내용 입력"> 
							<caption>메뉴 정보를 저장하기 위한 테이블</caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>상위 메뉴명</th>
									<td><input type="text" id="parentCode" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>메뉴 ID</th>
									<td><input type="text" id="menuCode" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>메뉴명</th>
									<td><input type="text" id="menuName" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>link URL </th>
									<td><input type="text" id="menuUrl" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>순서</th>
									<td><input type="text" id="menuOrder" class="input_basic"  disabled="disabled"/></td>
								</tr>
								<tr>
									<th>Dispaly 유무</th>
									<td><label for="visible">사용</label> <input type="radio" id="visibleYn" name="visibleYn" value="Y"  disabled="disabled"  checked="checked"/> 
									<label for="unVisible">미사용</label> <input type="radio" id="unVisible" name="visibleYn" value="N" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>사용유무</th>
									<td><label for="use">사용</label> <input type="radio" id="useYn" name="useYn" value="Y"  disabled="disabled" checked="checked"/> 
									<label for="unSubUse">미사용</label> <input type="radio" id="unUse" name="useYn" value="N" disabled="disabled"/></td>
								</tr>
								<input type="hidden" id="menuMode" class="input_basic" value="false">
							</tbody>
						</table>
						<p class="admin_btns">
							<button id="btnSaveMenuInfo" class="bt_md btn_red" disabled="disabled">저장</button>
							&nbsp; 
							<button id="btnCancleMenuInfo" class="bt_md btn_gray" disabled="disabled">취소</button>
						</p>
					</div>
					<i class="fa-duotone fa-folder-open"></i>
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
	<script src="${pageContext.request.contextPath}/pageJs/manager/codeMng/menuMng.js"></script>
    