<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	/**
	* @Class Name : workDetail.jsp
	* @Description : 공지사항 상세 페이지
	* @Modification Information
	*
	*  수정일         		  수정자                            수정내용
	*  -------       -------------   ----------------------
	*  2022.10.26.   백승연         		   최초 생성
	*/
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- jquery사용하려면 필요하다 -->
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-3.4.1.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<!-- 로딩하려면 필요하다 -->
<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>

<script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
<title>EyeT WorkFlow</title>
</head>

<body>
	<form id="workDetailForm">
		<input type="hidden" id="workPk" name="workPk" value="${workPk}">
	</form>
	
	<center><p style="font-size: 30px">View 상세페이지</p></center>
	<div style="margin-left: 25%">
		<p style="font-size: 24px;">상품 상세 정보</p>
		<div id="detailImg" style="display: inline-block;">
			<img src="/dist/images/manager/camelCase.jpg"
				style="width: 300px; height: 300px;">
			<div>
				<img src="/dist/images/manager/down.png" style="width: 13px;">
				<span id="down" style="width: 15px"></span> 
				<img src="/dist/images/manager/like.png" style="width: 13px;">
				<span id="recommend"></span> 
				<img src="/dist/images/manager/eyes.png" style="width: 13px;">
				<span id="view"></span>
			</div>
		</div>

		<div id="work_info" style="display: inline-block; position: absolute; margin-left: 10px">
			<div>
				<p id="title" style="font-weight:bold"></p>
			</div>
			<div><p id="info"></p></div>
			<div>
				<span>카테고리 :</span> <span id="kategories"></span>
			</div>
			<div>
				<span>이용료 :</span> <span id="fee"></span>
			</div>
			<div>
				<span>등록일자 :</span> <span id="date"></span>
			</div>
			<div>
				<span>용 량 :</span> <span id="size"></span>
			</div>
			<div style=" padding-top: 100px">
				<span style="font-size: 18px;"><button id="recommendBtn">
					<img src="/dist/images/manager/like.png" style="width: 15px;">추천</button></span>
					<span><button>구매하기</button></span> 
					<span><button id = "downFile">다운로드</button></span>
			</div>

		</div>
		<div id="work_button" style="font-size: 20px">
			<input type="button" style="width: 18%" id="btnContents" value="상세 정보">
			<!-- <button id="contents_bt" onclick="contents_info()">상세정보</button> -->
			<input type="button" style="width: 18%" id="downManual" value="메뉴얼 다운로드">
			<input type="button" style="width: 18%" id="btnNotice" value="유의사항">
			<input type="button" id = "reviewCnt"style="width: 18%" value="리뷰">
		</div>
		<div id="contentsDetail" style="display: block;width: 74%;">
			<span id="contents"></span>
		</div>
		<div id="contentsReview" style="display: none; width: 74%;height: 400px;">
			<div id = "reviewTop" style="background: lavender;">
				<span>리뷰 만족도 : ★★★★★          5.0</span>
			</div>
			<div id = "reviewMid" style="width:100%;height:65%;border: 0.5px solid lightgray;">
			
			<!-- 리뷰 리스트  -->
			
			</div>
			<div class="paging" id="paging" style = "text-align:center;">
			</div>
			<div id="reviewBot">
				<p>리뷰 별점 : ★★★★★</p>
				<textarea id="reviewArea"style="resize: none;width: 94%;height: 35px;"></textarea>
				<button id="insertReview">등록</button>
			</div>
		</div>
		<div id="contentsNotice" style="display: none;width: 74%;">
		contentsNotice
		</div>
		<!-- js 연결 -->
		<script src="/pageJs/solution/workDetail/workDetail.js"></script>
	</div>
</body>
</html>