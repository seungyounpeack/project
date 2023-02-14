<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%

%>


	<section id="container">
			<h2>데이터 등록</h2>
			
			<div class="admin_content">
				<div class="left_area">
					<h3>데이터 목록</h3>
					<div data-ax5grid="upload-data-grid" data-ax5grid-config='{name:"upload-data-grid"}' class="grid">
					</div>
				</div>
				<div class="right_area">
					
					<div class="tab_area">
						<ul class="tab_all">
							<li id="tab1" class="tab_link on" data-tab="tab-1">세부 정보</li>
							<li id="tab2" class="tab_link"  data-tab="tab-2">데이터 이력</li>
						</ul>
					</div>
					
					<div id="tab-1" class="tab_content on">
						<input type='hidden' id="codeId" value="" />
						<input type='hidden' id="atchFileId" value="" />
						<table class="admin_view" summary="데이터 정보 내용 입력">
							<caption>데이터 정보를 저장하기 위한 테이블</caption>
							<colgroup>
								<col width="30%" />
								<col width=" " />
							</colgroup>
							<tbody>
								<tr>
									<th>구분</th>
									<td><input type='text' id="gubunName" class="input_basic" disabled/></td>
								</tr>
								<tr>
									<th>테이블명</th>
									<td><input type='text' id="codeName" class="input_basic" disabled /></td>
								</tr>
								<!-- <tr>
									<th>테이블설명</th>
									<td><input type='text' id="codeDesc" class="input_basic" disabled /></td>
								</tr> -->
								<tr>
									<th>물리적 테이블명</th>
									<td><input type='text' id="codeDesc" class="input_basic" disabled /></td>
								</tr>
								<tr>
									<th>대상 년월</th>
									<td>
										<div style="position: relative">
											<input type="text" id="targetMonth" class="form-control dateSelect"  value="" disabled />
										</div>
									</td>
								</tr>
								<tr>
									<th>업로드 파일</th>
									<td><input type="file" id="uploadFiles" name="uploadFiles" class="input_basic" /></td>
								</tr>
								<tr>
									<th>첨부 파일</th>
									<td><input type='text' id="orignlFileNm" class="input_basic" disabled /></td>
								</tr>
							</tbody>
						</table>
						<p class="admin_btns">
							<a href="#" id="btnCreateData" class="bt_md b_blue">데이터 업로드</a>
							<!-- <a href="#" class="bt_md b_gray">저장</a> -->
						</p>
					</div>
					<div id="tab-2" class="tab_content">
						<div data-ax5grid="upload-history-grid" data-ax5grid-config='{name:"upload-history-grid"}' class="grid">
							<!-- <p class="admin_btns"><a href="#" class="bt_md b_blue">저장</a></p> -->
						</div>
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

<%-- 
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
       Upload 데이터 관리
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">관리자</a></li>
        <li class="active">Upload 데이터 관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" id="elementForm">

		
		
        <div class="row">
			<div class="col-md-6">
	          <!-- general form elements -->
	          <div class="box box-success">
	            <div class="box-header with-border">
					<h3 class="box-title">목록</h3>
	              	<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				  	</div>
	            </div>
	          	<div class="box-body">
	          		<!-- 데이터 유형 목록 Grid 시작 -->
		          	<div data-ax5grid="upload-data-grid" data-ax5grid-config='{name:"upload-data-grid"}' style="height: 500px;"></div>
		          	<!-- 데이터 유형 목록 Grid 끝 -->
	          	</div>
	          	<!-- 
	          	<div class="box-footer">
	                <button type="button" id="btnCreateMenu" class="btn btn-default pull-right btn-sm">하위 메뉴 생성</button>
				</div>
				 -->
	          </div>  
			</div>
			
			
			<div class="col-md-6">
			
				<div class="nav-tabs-custom">
		            <ul class="nav nav-tabs">
		              <li class="active" id="tabInfo"><a href="#tab_1" data-toggle="tab">정보</a></li>
		              <li id="tabHistory"><a href="#tab_2" data-toggle="tab">History</a></li>
		              
		            </ul>
		            <div class="tab-content">
		              <div class="tab-pane active" id="tab_1">
						<div class="box-body" id="formUploadInfo">
						<input type='hidden' id="codeId" value="" />
						<input type='hidden' id="atchFileId" value="" />
							<table class="table">
								<colgroup>
							    	<col style="width: 150px;"/>
							    	<col />
							  	</colgroup>
								<tbody>
									<tr>
										<td>구분</td>
										<td>
											<input type='text' id="gubunName" class="form-control dateSelectM" disabled/>
										</td>
					                </tr>
					                <tr>
										<td>데이터 유형</td>
										<td>
											<input type='text' id="codeName" class="form-control dateSelectM" disabled />
										</td>
					                </tr>
									<tr>
										<td>대상 년월</td>
										<td>
											<div class="input-group date" id="targetMonthDiv" style="width:130px;">
							                    <input type="text" id="targetMonth" class="form-control" maxlength="7" disabled />
							                    <span class="input-group-addon">
							                        <span class="glyphicon glyphicon-calendar"></span>
							                    </span>
							                </div>
										</td>
					                </tr>
					                <tr>
										<td>업로드 파일</td>
										<td>
											<input type='text' id="orignlFileNm" class="form-control dateSelectM" disabled />
										</td>
					                </tr>
					                <tr>
										<td>파일선택</td>
										<td>
											<input type="file" id="uploadFiles" name="uploadFiles" style="width:100%;height:30px;"  disabled="disabled"/>
										</td>
					                </tr>
				              	</tbody>
			              </table>
			            </div>
			            <div class="box-footer">
			                <!-- 
			                <button type="button" id="btnCreateAnalysis" class="btn btn-default pull-right btn-sm" style="margin-left:5px;" disabled>통계 생성</button>
			                <button type="button" id="btnSaveUploadInfo" class="btn btn-default pull-right btn-sm">파일 저장</button>
			                 -->
			                <button type="button" id="btnCreateData" class="btn btn-default pull-right btn-sm" style="margin-left:5px;">데이터 생성</button>
			                
						</div>
		              </div>
		              <!-- /.tab-pane -->
		              <div class="tab-pane" id="tab_2">
						<div class="box-body">
			          		<!-- 메뉴 목록 Grid 시작 -->
				          	<div data-ax5grid="upload-history-grid" data-ax5grid-config='{name:"upload-history-grid"}' style="height: 475px;"></div>
				          	<!-- 메뉴 목록 Grid 끝 -->
			          	</div>
			          	<!-- 
			          	<div class="box-footer">
			                <button type="button" id="btnSaveRoleMenu" class="btn btn-default pull-right btn-sm">저장</button>
						</div>
						 -->
		              </div>
		              
		            </div>
		            <!-- /.tab-content -->
		          </div>
	          
			</div>
			
        </div>
        
        
        

    </section> --%>
    <!-- /.content -->
    
	<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/pageJs/manager/dataMng/outDataReg/outDataRegMain.js"></script>
