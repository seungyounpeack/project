<%@ page contentType="text/html; charset=EUC-KR" %>

<%
	String sso_id = (String)session.getAttribute("sso_id");
	//String dept_code = (String)session.getAttribute("dept_code");

  	//out.println("sso_id :::: " + sso_id);
  	//out.println("dept_code :::: " + dept_code);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <meta charset="EUC-KR">
  <TITLE> SSO Sample Page </TITLE>
 </HEAD>

 <BODY>
  <form name="form1" method="post" >
	<INPUT TYPE="text" NAME="sso_id" value=${sso_id} >
  </form>
 </BODY>
</HTML>
