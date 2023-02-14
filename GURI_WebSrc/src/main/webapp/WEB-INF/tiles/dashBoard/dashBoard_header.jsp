<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%
  /**
  * @Class Name : dashBoard_header.jsp
  * @Description : dashBoard 화면 header 영역
  * @Modification Information
  *
  *     수정일         	  수정자                           수정내용
  *  ----------   -------------   ----------------------
  *  2021.07.07      김 부 권             최초 생성
  */
%>

		<!-- 헤더 시작 -->
        <div id="header">
			<h1>
			<dd>
				<a href="javascript:;"  menucode="MENU_00002" linkurl="/dashBoard/main.do" ><img src="${pageContext.request.contextPath}/dist/images/logo_top.png" alt="logo"> <span class="logo_text">구리시의 모든것</span></a></h1>
			</dd>
			<div class="top_right">

				<div class="menu_top">
					<div class="btn_menu">메뉴열기</div>
					<div class="page_cover"></div>
					<div id="menu">
						<div id="menuClose" onclick="" class="close">메뉴닫기</div>
						<div class="gnb_all">
							<dl class="gnb_01">
								<dt>인구현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00020" linkurl="/dashBoard/population/populationStatic.do">인구 통계</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00021" linkurl="/dashBoard/population/populationMove.do">전입, 전출 및 순이동</a></dd>
								<!-- <dd><a href="#">유동인구 현황</a></dd> -->
								<dd><a href="javascript:;" menucode="MENU_00022" linkurl="/dashBoard/population/populationFlow.do">유동인구 현황</a></dd>
							</dl>
							<dl class="gnb_02">
								<dt>여론 및 민원 분석</dt>
								<dd><a href="javascript:;" menucode="MENU_00023" linkurl="/dashBoard/complain/complainStatus.do">민원대기현황</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00024" linkurl="/dashBoard/complain/complainPublic.do">여론 분석</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00025" linkurl="/dashBoard/complain/complainAnalysis.do">민원 분석</a></dd>
							</dl>
							<dl class="gnb_03">
								<dt>복지 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00026" linkurl="/dashBoard/welfare/welfareStatsus.do">복지 현황</a></dd>
							</dl>
							<dl class="gnb_04">
								<dt>기상 및 대기 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00027" linkurl="/dashBoard/weather/weatherStatus.do">기상 및 대기 현황</a></dd>
							</dl>
							<dl class="gnb_05">
								<dt>재정 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00028" linkurl="/dashBoard/finance/financeStatus.do">재정 현황</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00029" linkurl="/dashBoard/finance/financeExecution.do">신속집행 현황</a></dd>
							</dl>
							<dl class="gnb_06">
								<dt>세입징수 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00030" linkurl="/dashBoard/revenue/revenueStatus.do">세입징수 현황</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00031" linkurl="/dashBoard/revenue/revenueOverdue.do">체납 및 수납 현황</a></dd>
							</dl>
							<dl class="gnb_07">
								<dt>수질 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00032" linkurl="/dashBoard/water/waterQuality.do">정수장 수질현황</a></dd>
							</dl>
							<dl class="gnb_08">
								<dt>교통 및 CCTV 현황</dt>
								<dd><a href="//105.3.10.111:29000">스마트시티 통합 플랫폼 </a></dd> 
								<dd><a href="javascript:;" menucode="MENU_00033" linkurl="/dashBoard/communication/cctvInfo.do">CCTV 정보</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00034" linkurl="/dashBoard/communication/communInfo.do">교통 정보</a></dd>
							</dl>
							<dl class="gnb_09">
								<dt>재난 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00035" linkurl="/dashBoard/calamity/calamityStatus.do">재난 현황</a></dd>
							</dl>
							<!-- <dl class="gnb_10">
								<dt>사업추진 현황</dt>
								<dd><a href="javascript:;" menucode="MENU_00036" linkurl="/dashBoard/business/businessStatus.do">사업추진 현황</a></dd>
								
							</dl> -->
							<dl class="gnb_11">
								<dt>도시통계 현황</dt>
									<dd><a href="javascript:;" menucode="MENU_00037" linkurl="/dashBoard/city/cityStatistics.do">도시통계 현황</a></dd>
							</dl>
							<dl class="gnb_12">
								<dt>지역산업 생태계</dt>
								<dd><a href="javascript:;" menucode="MENU_00038" linkurl="/dashBoard/company/companyTrend.do">기업 동향</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00039" linkurl="/dashBoard/company/productionTrend.do">경기.생산 동향</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00040" linkurl="/dashBoard/company/employmentTrend.do">고용 동향</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00041" linkurl="/dashBoard/company/innovationTrend.do">혁신 동향</a></dd>
							</dl>
							<dl class="gnb_13">
								<dt>지역경제(상권) 분석</dt>
								<dd><a href="javascript:;" menucode="MENU_00042" linkurl="/dashBoard/economy/localEconomy.do">지역경제(상권) 분석</a></dd>
								<dd><a href="javascript:;" menucode="MENU_00043" linkurl="/dashBoard/economy/cardEconomy.do">카드 매출 분석</a></dd>
							</dl>
							<dl class="gnb_14">
								<dt>조직도</dt>
 								<dd><a href="javascript:;" menucode="MENU_00044"  linkurl="/dashBoard/organization/organizationMain.do'">의정부시 조직도</a></dd> 
							</dl>
							<!-- <dl class="gnb_15">
								<dt>유튜브</dt>
 								<dd><a href="javascript:fn_link();">의정부시 유튜브 LIVE</a></dd> 
							</dl> -->
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<script type="text/javascript">
			function fn_link(){
				
				var agent = navigator.userAgent.toLowerCase();
				if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
				     // ie일 경우
					window.location = 'microsoft-edge:' + 'https://www.youtube.com/embed/PZbhgrmF0Jk?autoplay=1&mute=1&autohide=1&amp;playlist=PZbhgrmF0Jk&loop=1';
				}else{
				     // ie가 아닐 경우
					window.open('https://www.youtube.com/embed/PZbhgrmF0Jk?autoplay=1&mute=1&autohide=1&amp;playlist=PZbhgrmF0Jk&loop=1');
				}
			}
		</script>
        <!-- 헤더 끝 -->