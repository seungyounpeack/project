<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : intro.jsp
  * @Description : intro 페이지
  * @Modification Information
  *
  *     수정일                   수정자                          수정내용
  *  -----------   -------------   ----------------------
  *  2021.10.01        김부권                          최초 생성
  */
%>	

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>구리시 Intro 페이지 </title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/intro.css">
<script src="${pageContext.request.contextPath}/dist/js/common/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-2.2.2.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
    	        
    <script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
</head>

<body class="intro_body">
<%-- <%
	String userAuth = (String) request.getParameter("userRole");

%>
	<%=userAuth %> --%>
	<div id="intro_wrap">
		<!-- <p class="intro_logo"><img src="/dist/images/intro/intro_logo.png" alt="" /></p> -->
		<div class="intro_box">
			<ul class="btn_list">
				<!-- <li><a href="http://105.3.10.72:8079" class="btn_intro intro_blue"><span>의정부시 빅데이터</span>활용 시스템</a></li> -->
				<li><a href="javascript:;" class="btn_intro intro_blue" onClick="fn_goIntro('MENU_00001');"><span>구리시 빅데이터</span>활용 시스템</a></li>
<!-- 				<li><a href="javascript:;" class="btn_intro intro_blue" onClick="fn_goIntro('MENU_00001');"><span>의정부시 빅데이터</span>활용 시스템</a></li> -->
				<li><a href="javascript:;" class="btn_intro intro_green" onClick="fn_goIntro('MENU_00002');"><span>구리시 빅데이터</span>DID 시스템</a></li>
				<!-- 나중에 꼭 menu_adminEX -> menu_admin로 바꿔주세요 --><li class="menu_adminEX"><a href="javascript:;" class="btn_intro intro_yellow" onClick="fn_goIntro('MENU_00012');"><span>구리시 빅데이터</span>관리자페이지</a></li>
				<li><a href="javascript:;" class="btn_intro intro_green" onClick="fn_goIntro('MENU_00050');"><span>구리시 빅데이터</span>솔루션 페이지</a></li>
				<li><a href="/dashBoardTest/main.do" class="btn_intro intro_green"><span>구리시 빅데이터</span>dashBoard Test</a></li>
			<!-- <p class="download_file"><a href="#" id="fileDownload" class="btn_filedown">EYET 다운로드</a></p> -->
			</ul>
		</div>
	</div>
	<input type="hidden" id="userAuth" value="${userRole }"> 
</body>


<form id="frmIntro"  action="/main.do" method="post">
    <input type='hidden' id="menuCode" name="menuCode" value="" />
    <input type='hidden' id="loginUserInfo" name="loginUserInfo" value="" />
</form>
  
<script type="text/javascript">
	var loading = $.loading();
	
	var userAuth = $("#userAuth").val();
	
	if( userAuth == "USERROLE_000002"){
		$(".menu_admin").css("display", "");
	}else{
		$(".menu_admin").css("display", "none");
	}
	
	$(function(){
		/* $("#fileDownload").on("click", function(){
			var requestUrl = "/intro/solutionDownload.do";
			// iframe 동적생성
			$("iframe[name='submitIframe']").remove();
			var iframe = $('<iframe name="submitIframe" style="width:1px;height:1px;border:none;display:none;"></iframe>').appendTo($('body'));
			iframe.on("load", function() {
				iframe.remove();
			});
			// form 동적생성
			var frm = $('<form></form>').appendTo($('body'));
			frm.attr("method", "post").attr("action", requestUrl).attr("target", "submitIframe");
			frm.submit().remove();
		}) */
	})
	
	function fn_goIntro(paramMenuCode){
		//console.log(paramMenuCode);
		var menuCode = paramMenuCode;
		$("#menuCode").val(paramMenuCode);
		var requestUrl = "/checkRoleMenuCnt.ajax";
		var param ={};
		param.menuInfo = {};
		param.menuInfo.menuCode = menuCode;
		// 메뉴 목록 조회하기
		Util.requestHide(requestUrl, param, function(resultData){
			var menuInfo = resultData.menuInfo;
		     $("#loginUserInfo").val(resultData.loginUserInfo);
			console.log("menuInfo : ", menuInfo)
			if(Util.isObject(menuInfo)){
				// 상세 화면으로 이동
				var menuLinkUrl = menuInfo.menuLink;
				//return false;
				if(!Util.isEmpty(menuLinkUrl)){
					console.log(document.getElementById('frmIntro'))
					 var gsWin = window.open('about:blank','_self');
					 document.getElementById('frmIntro').target = '_self';
				     document.getElementById('frmIntro').method ="post";
				     //document.getElementById('frmIntro').contentType ="application/json";
				     if( paramMenuCode == 'MENU_00001' ){
					     //document.getElementById('frmIntro').action = "http://ujb.meta-pi.co.kr/webGis/visualList.do"; 
					      document.getElementById('frmIntro').action = "http://192.168.1.93:8078/webGis/visualList.do"; 
					     //document.getElementById('frmIntro').action = "http://105.3.10.72:8077/webGis/visualList.do";
				     }else{
				    	 
				     document.getElementById('frmIntro').action = menuLinkUrl;
				     }
				     document.getElementById('frmIntro').submit();
				}
				
			}else{
			
				alert("선택한 메뉴에 대한 권한이 없습니다.");
				location.replace("/intro.do");
			}
		});
		
	}
	

</script>

</html>
