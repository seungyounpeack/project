<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%
  /**
  * @Class Name : manager_header.jsp
  * @Description : manager 화면 header 영역
  * @Modification Information
  *
  *     수정일         	  수정자                           수정내용
  *  ----------   -------------   ----------------------
  *  2021.09.17      김 부 권             최초 생성
  */
%>
		<header>
            <div class="header_wrap">
                
                <div class="top_area">
                	<h1 class="top_logo">
                		<a href="<c:url value="/" />"><img src="/dist/images/manager/top_logo.png" alt="" /> &nbsp;&nbsp;구리시 행정데이터 공유 활용 포털</a>
                	</h1>
                    <ul class="user">
                    	<li class="text_user">관리자1님</li>
                        <li><a href="javascript:fn_logout();" class="bt_logout">로그아웃</a></li>
                    </ul>
                </div>
                
                <div class="gnb_all">
                    <ul class="gnbL" id="menuList">
                    	 <!-- <li class="gnb1">								
                            <a href="javascript:;" class="on">공통코드</a>									
                            <div class="twoD">
                                <a href="/mamager/codeMng/commonCodeMng.do" menucode="MENU_00050" >공통코드 관리</a>									
                                <a href="/mamager/codeMng/menuMng.do" menucode="MENU_00051" >메뉴관리</a>
                            </div>
                        </li>
                        <li class="gnb2">								
                            <a href="javascript:;" class="on">사용자 관리</a>									
                            <div class="twoD">
                                <a href="/mamager/userAuth/userSearch.do" menucode="MENU_00050" >사용자 검색</a>									
                                <a href="/mamager/userAuth/menuAuthMng.do" menucode="MENU_00051" >메뉴별 권한 관리</a>
								<a href="/mamager/userAuth/userAuthMng.do" menucode="MENU_00052" >사용자 권한 적용</a>
                            </div>
                        </li>
                        <li class="gnb3">								
                            <a href="javascript:;">접속자 관리</a>									
                            <div class="twoD">
                                <a href="/mamager/logMng/logMng.do">사용자 접속 통계</a>									
                                <a href="/mamager/logMng/logDataMng.do">다운로드 통계</a>									
                            </div>
                        </li>
                        <li class="gnb4">								
                            <a href="javascript:;">연계 데이터 관리</a>									
                            <div class="twoD">
                                <a href="javascript:;" menucode="MENU_00054" >연계 상태 검색</a>					
                            </div>
                        </li>
                        <li class="gnb5">								
                            <a href="javascript:;">데이터 관리</a>									
                            <div class="twoD">
                                <a href="/mamager/fieldDataReg/fieldDataRegMain.do">분야별 데이터 등록</a>
								<a href="/mamager/outDataReg/outDataRegMain.do" >외부 데이터 등록</a>
                            </div>
                        </li>
                        <li class="gnb6">								
                            <a href="javascript:;">불용어 관리</a>									
                            <div class="twoD">
                                <a href="/mamager/stopword/stopwordMain.do">불용어 관리</a>																	
                            </div>
                        </li>
                        <li class="gnb7">								
                            <a href="javascript:;">게시글 관리</a>									
                            <div class="twoD">
                                <a href="/mamager/noticeMng/noticeMng.do" menucode="MENU_00060" >공지사항 관리</a>																	
                                <a href="/mamager/inquiryMng/inquiryMng.do" menucode="MENU_00057" >문의 게시판 관리</a>																	
                            </div>
                        </li>  -->
                    </ul>
                </div>
                
            </div>
            <p class="gnbBg">&nbsp;</p>
		</header>
		<script>
		</script>