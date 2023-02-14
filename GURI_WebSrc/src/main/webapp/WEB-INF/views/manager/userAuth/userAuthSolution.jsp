<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : userAuthSolution.jsp
  * @Description : 관리자 > 솔루션 권한 관리
  * @Modification Information
  *
  *  수정일			수정자			수정내용
  *  -------    	-------------   ----------------------
  *  2021.10.14.   	김부권          최초 생성
  */
%>
		
		
		<section id="container">
			<h2>솔루션 권한 설정</h2>
			<div class="search_wrap">
				<ul>
					<li>
						<span class="sch_title">부서</span>
						<select id="department" class="select_sch">
							<option value=""></option>
						</select>
					</li>
					<li>
						<span class="sch_title">직위</span>
						<select id="position_id" class="select_sch">
							<option value=""></option>
						</select>
					</li>
					<li class="wd45">
						<span class="sch_title">사용자명</span>
						<input id="userName" type="text" class="input_sch" />
					</li>
					<li class="wd7"><a href="#" id="btnSearchRole" class="sch_button">검색</a></li>
				</ul>
			</div>
			
			<div class="admin_content">
				<div class="left_area">
					<h3>사용자 목록</h3>
					<div data-ax5grid="role-grid" data-ax5grid-config='{name:"role-grid"}' class="grid">
					</div>
						<p class="admin_btns"><a id="btnCreateRole" href="#" class="bt_md b_blue">권한 부여</a></p>
				</div>
				<div class="right_area">
					
					<div class="tab_area">
						<ul class="tab_all">
							<!-- <li class="tab_link on" data-tab="tab-1">권한 정보</li>
							<li class="tab_link"  data-tab="tab-1">메뉴 목록</li> -->
						</ul>
					</div>
					
					<%-- <div id="tab-1" class="tab_content on">
						<table class="admin_write" summary="권한정보 내용 입력">
							<caption>권한 정보를 저장하기 위한 테이블</caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>권한코드</th>
									<td><input type="text" id="roleCode" class="input_basic" disabled="disabled"/></td>
								</tr>
								<tr>
									<th>권한명</th>
									<td><input type="text" id="roleName" class="input_basic" /></td>
								</tr>
								<tr>
									<th>권한설명</th>
									<td><input type="text" id="roleDesc" class="input_basic" /></td>
								</tr>
								<tr>
									<th>사용유무</th>
									<td><label for="use">사용</label> <input type="radio" id="use" name="useYn" value="Y" /> <label for="unuse">미사용</label> <input type="radio" id="unuse" name="useYn" value="N"/></td>
								</tr>
							</tbody>
						</table>
						<p class="admin_btns"><a href="#" id="btnSaveRoleInfo" class="bt_md b_blue">권한 저장</a></p>
					</div> --%>
					<div id="tab-1" class="tab_content on">
						<div data-ax5grid="menu-grid" data-ax5grid-config='{name:"menu-grid"}' class="grid">
						</div>
							<p class="admin_btns"><a href="#" id="btnSaveRoleMenu" class="bt_md b_blue">권한 해제</a></p>
					</div>
					
				</div>
			</div>
			
		<!-- 20210804 tab스크립트 -->
			<script>
				$('.tab_link').click(function () {
					var tab_id = $(this).attr('data-tab');

					$('.tab_link').removeClass('on');
					$('.tab_content').removeClass('on');

					$(this).addClass('on');
					$("#" + tab_id).addClass('on');

				});
			</script>
			
		</section>

   <%--  <section class="content-header">
      <h1>
       권한 관리
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">관리자</a></li>
        <li class="active">권한관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" id="elementForm">
        <div class="row">
			<div class="col-md-6">
	          <!-- general form elements -->
	          <div class="box box-success">
	            <div class="box-header with-border">
					<h3 class="box-title">권한 목록</h3>
	              	<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				  	</div>
	            </div>
	          	<div class="box-body">
	          		<!-- 권한 목록 Grid 시작 -->
		          	<div data-ax5grid="role-grid" data-ax5grid-config='{name:"role-grid"}' style="height: 400px;"></div>
		          	<!-- 권한 목록 Grid 끝 -->
	          	</div>
	          	<div class="box-footer">
	                <!-- <button type="button" class="btn btn-default pull-right btn-sm">하위 메뉴 생성</button> -->
	                <button type="button" id="btnCreateRole" class="btn btn-default pull-right btn-sm">권한 생성</button>
				</div>
	          </div>  
			</div>
			
			
			<div class="col-md-6">
			
				<div class="nav-tabs-custom">
		            <ul class="nav nav-tabs">
		              <li class="active"><a href="#tab_1" data-toggle="tab">권한정보</a></li>
		              <li><a href="#tab_2" data-toggle="tab">메뉴 목록</a></li>
		              
		            </ul>
		            <div class="tab-content">
		              <div class="tab-pane active" id="tab_1">
						<div class="box-body" id="formRoleInfo">
							<table class="table">
								<colgroup>
							    	<col style="width: 150px;"/>
							    	<col />
							  	</colgroup>
								<tbody>
									<tr>
										<td>권한코드</td>
										<td>
											<input type="text" id="roleCode" class="form-control input-sm" placeholder="" disabled>
										</td>
					                </tr>
					                <tr>
										<td>권한명</td>
										<td>
											<input type="text" id="roleName" class="form-control input-sm" placeholder="" maxlength="25">
										</td>
					                </tr>
					                <tr>
										<td>권한설명</td>
										<td>
											<input type="text" id="roleDesc" class="form-control input-sm" placeholder="" maxlength="100">
										</td>
					                </tr>
					                <tr>
										<td>사용 유무</td>
										<td>
											<input type="radio" name="useYn" value="Y"> 사용
		                        			<input type="radio" name="useYn" value="N"> 미사용
										</td>
					                </tr>
				              	</tbody>
			              </table>
			            </div>
			            <div class="box-footer">
			                <!-- <button type="button" class="btn btn-default pull-right btn-sm">하위 메뉴 생성</button> -->
			                <button type="button" id="btnSaveRoleInfo" class="btn btn-default pull-right btn-sm">권한 저장</button>
						</div>
		              </div>
		              <!-- /.tab-pane -->
		              <div class="tab-pane" id="tab_2">
						<div class="box-body">
			          		<!-- 메뉴 목록 Grid 시작 -->
				          	<div data-ax5grid="menu-grid" data-ax5grid-config='{name:"menu-grid"}' style="height: 400px;"></div>
				          	<!-- 메뉴 목록 Grid 끝 -->
			          	</div>
			          	<div class="box-footer">
			                <!-- <button type="button" class="btn btn-default pull-right btn-sm">하위 메뉴 생성</button> -->
			                <button type="button" id="btnSaveRoleMenu" class="btn btn-default pull-right btn-sm">저장</button>
						</div>
		              </div>
		              
		            </div>
		            <!-- /.tab-content -->
		          </div>
	          
			</div>
        </div>
         --%>
        
        

    </section>
    <!-- /.content -->
    
	<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/pageJs/manager/userAuth/userAuthSolution.js"></script>
