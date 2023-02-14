<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>Alert-Error</title>
<style>
<!--
	html, body {margin:0;padding:0;outline:0}
	.err_wrap {width:100%;margin-top:220px;text-align:center;}
	.err_icon {clear:both;display:inline-block;text-align:center;width:100%;padding-top:120px;background:url(${pageContext.request.contextPath}/dist/images/alert_error.svg) no-repeat center top;background-size:150px 150px}
	.btngo_main {display:inline-block;margin-top:30px;min-width:180px;height:34px;border-radius:5px;background-color:#444;color:#fff;text-decoration:none;font-size:16px;letter-spacing:-0.05em;box-sizing:border-box;padding-top:6px}
	.btngo_main:hover {background-color:#3f3f3f}
-->
</style>
</head>

<body>
	<div class="err_wrap">
		<div class="err_icon">
			<a href="/intro.do" class="btngo_main">메인페이지로 가기</a>
		</div>
	</div>
</body>
</html>