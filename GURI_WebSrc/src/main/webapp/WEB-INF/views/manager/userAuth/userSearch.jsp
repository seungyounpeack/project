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
			<h2>사용자 조회</h2>
			<div class="search_wrap">
				<ul>
					<li>
						<span class="sch_title">부서</span>
						<select id="department" class="select_sch">
							<option value="">전체</option>
						</select>
					</li>
					<li>
						<span class="sch_title">직위</span>
						<select id="position_id" class="select_sch">
							<option value="">전체</option>
						</select>
					</li>
					<li class="wd45">
						<span class="sch_title">사용자명</span>
						<input id="userName" type="text" class="input_sch" />
					</li>
					<li class="wd7"><a href="#" id="btnDeptSearch" class="sch_button">검색</a></li>
				</ul>
			</div>
			<div class="admin_content">

				<div class="grid" data-ax5grid="userSearch-grid" data-ax5grid-config='{name:"userSearch-grid"}' ><img src="image/grid_ex.jpg" alt="" /></div>
			
			</div>
			
		</section>


   <!--  <section class="content-header">
      <h1>
       사용자 조회
       <div><button class="optionListToggleBtn"><i 
        class="glyphicon glyphicon-search"></i>검색조건</button>
       </div>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">관리자</a></li>
        <li class="active">사용자 조회</li>
      </ol>
      <div class="optionBox">
      	<li class="on">
           <div class="left">
           	  <label for="">부서</label>
	          <select name="" class="select2" id="department">
	             <option value="">전체</option>
	          </select>
	          <label for="">직위</label>
	          <select name="" class="select2" id="position_id">
	             <option value="">전체</option>
	          </select>
	          <label for="">사용자명</label>
	           <input type="text" class="form-control" name="" id="userName" style="width:300px;text-align:left" >
              <button id="btnDeptSearch">검색</button>
           </div>
        </li>   
      </div>
    </section>

    Main content
    <section class="content" id="elementForm">
        <div class="row">
			<div class="col-md-12">
	          general form elements
	          <div class="box box-success">
	            <div class="box-header with-border">
					<h3 class="box-title">사용자 조회</h3>
	              	<div class="box-tools pull-right">
						<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				  	</div>
	            </div>
	          	<div class="box-body">
	          		메뉴 목록 Grid 시작
		          	<div data-ax5grid="userSearch-grid" data-ax5grid-config='{name:"userSearch-grid"}' style="height: 500px;"></div>
		          	메뉴 목록 Grid 끝
	          	</div>
	          </div>
			</div>
        </div>
    </section> -->
    <!-- /.content -->
    
	<!-- Page 스크립트 -->
	<script src="${pageContext.request.contextPath}/pageJs/manager/userAuth/userSearch.js"></script>
