<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="width:100%; height:100%;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/core.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/charts.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/themes/dark.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/animated.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/forceDirected.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/amcharts_v4.10.19/wordCloud.js"></script>

<script src="${pageContext.request.contextPath}/dist/js/common/jquery-3.4.1.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>

	
<title>Insert title here</title>
</head>
<body style="width:100%; height:100%;">
<div id="leftTop" style="width:50%; height:50%; float:left; display:inline-block;">
</div>
<div id="rightTop" style="width:50%; height:50%; display:inline-block;">
</div>
<div id="leftBot" style="width:50%; height:50%; float:left; display:inline-block;">
</div>
<div id="rightBot" style="width:50%; height:50%; display:inline-block;">
</div>
<a href="javascript:fn_fileDown('TEST_00003', 'recent')">한달치 다운로드</a>
<a href="javascript:fn_fileDown('TEST_00003','all')">전체 다운로드</a>
	<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
	<script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
	<script src="${pageContext.request.contextPath}/pageJs/dashBoard/testBoard.js"></script>
	<script src="${pageContext.request.contextPath}/dist/js/common/commonChart.js"></script>


</body>
</html>