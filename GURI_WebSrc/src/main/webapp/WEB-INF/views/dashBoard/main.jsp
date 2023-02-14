<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/dist/css/dashBoard/main_new.css" /> --%>
<div id="container">
			<div class="content_wrap">
			<div class="content">
			<div class="main_wrap">
			
				<div class="main_left">
					<!-- 코로나 현황 -->
					<div class="covid_19"  href="https://www.data.go.kr/" target="_blank">
						<h2 class="main_title">코로나19 현황 <span class="covid_date maintxt_sm">(2021년 7월 26일 기준)</span></h2>
						<dl class="covid_sum">
							<dt>누적 확진자 수</dt>
							<dd class="covid_cnfd"></dd>
						</dl>
						
						<div class="covid_bottom">
							<dl class="covid_box">
								<dt class="c_yellow">치료중</dt>
								<dd class="covid_thrp"></dd>
							</dl>
							<dl class="covid_box">
								<dt class="c_green">완치</dt>
								<dd class="covid_recv"></dd>
							</dl>
							<dl class="covid_box">
								<dt class="c_gray">사망</dt>
								<dd class="covid_dead"></dd>
							</dl>
						</div>
					</div>
					
					<!-- 의정부시 인구 현황 -->
					<div id="populationInfoContainer" class="population">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00020');">의정부시 인구 현황 <span class="maintxt_sm"></span></a></h2>
						<div class="sex_population">
							<dl class="all_people">
								<dt>전체</dt>
								<dd></dd>
							</dl>
							<div class="sex_desc">
								<dl class="people_man">
									<dt>남성</dt>
									<dd></dd>
								</dl>
								<dl class="people_woman">
									<dt>여성</dt>
									<dd></dd>
								</dl>
							</div>
						</div>
						<div class="move_population">
							<ul class="flow_move">
								<li><span class="flow_in">전입</span> <b>-</b></li>
								<li class="num_sign">-</li>
								<li><span class="flow_out">전출</span> <b>-</b></li>
								<li class="num_sign">=</li>
								<li><span class="flow_ap">순이동</span> <b></b></li>
							</ul>
						</div>
					</div>
					
					<!-- 민원현황 -->
					<div class="minwon_top3" id="complainTop">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00025');">민원 분석 TOP3 <span class="maintxt_sm"></span></a></h2>
						<div class="top3_area" id="complainTopThree">
                        
							<!-- <div class="top3_box" >
								<p class="tbox_num">1</p>
								<div class="top3_desc">
									<dl class="tb_100">
										<dt>주정차</dt>
										<dd>52,421<span class="mn_unit">건</span></dd>
									</dl>
									<dl class="tb_50 dotline_r">
										<dt>긍정률</dt>
										<dd class="c_orange">0.1<span class="mn_12">%</span></dd>
									</dl>
									<dl class="tb_50">
										<dt>부정률</dt>
										<dd class="c_aqua">99.9<span class="mn_12">%</span></dd>
									</dl>
								</div>
							</div>
                            
                            <div class="top3_box" >
								<p class="tbox_num">2</p>
								<div class="top3_desc">
									<dl class="tb_100">
										<dt>주정차</dt>
										<dd>52,421<span class="mn_unit">건</span></dd>
									</dl>
									<dl class="tb_50 dotline_r">
										<dt>긍정률</dt>
										<dd class="c_orange">0.1<span class="mn_12">%</span></dd>
									</dl>
									<dl class="tb_50">
										<dt>부정률</dt>
										<dd class="c_aqua">99.9<span class="mn_12">%</span></dd>
									</dl>
								</div>
							</div>
                            
                            <div class="top3_box" >
								<p class="tbox_num">3</p>
								<div class="top3_desc">
									<dl class="tb_100">
										<dt>주정차</dt>
										<dd>52,421<span class="mn_unit">건</span></dd>
									</dl>
									<dl class="tb_50 dotline_r">
										<dt>긍정률</dt>
										<dd class="c_orange">0.1<span class="mn_12">%</span></dd>
									</dl>
									<dl class="tb_50">
										<dt>부정률</dt>
										<dd class="c_aqua">99.9<span class="mn_12">%</span></dd>
									</dl>
								</div>
							</div> -->
                            
						</div>
					</div>
					
					
					<!-- 사업추진현황 -->
					<%-- <div id="businessInfoContainer" class="business">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00036');">사업추진현황</a></h2>
						<div class="bui_wrap">
							
							<div class="bui_area">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							<div class="bui_area">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							<div class="bui_area mr0">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							<div class="bui_area">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							<div class="bui_area">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							<div class="bui_area mr0">
								<p class="complete">추진완료</p>
								<dl class="bui_box">
									<dt>도시재생 지원센터 설치</dt>
									<dd>100<span class="txt16">%</span></dd>
								</dl>
							</div>
							
						</div>
					</div> --%>
					
					<!-- 여론분석 -->
					<div class="opinion" id="compPublic">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00024');">여론 분석 워드클라우드 <span class="maintxt_sm"></span></a></h2>
						<div class="opinion_graph" id="wordCloud">
							
						</div>
					</div>
					
					<!-- 기상정보 -->
					<!-- <div id="weatherContainer" class="weather">
						<h2 class="main_title"><a  href="javascript:fn_movePage('MENU_00027');" >기상정보 <span class="maintxt_sm"></span></a></h2>
						<dl class="w_box">
							<dt>평균기온</dt>
							<dd>11.8˚</dd>
						</dl>
						<dl class="w_box">
							<dt>강수량</dt>
							<dd>0.1㎜</dd>
						</dl>
						<dl class="w_box">
							<dt>미세먼지</dt>
							<dd><span class="weather_4">좋음</span></dd>
						</dl>
						<dl class="w_box">
							<dt>초미세먼지</dt>
							<dd><span class="weather_2">보통</span></dd>
						</dl>
					</div> -->
					
				</div>

				<div class="main_middle">
					<p class="bg_left"></p>
					<p class="bg_right"></p>
					
					<div class="middle_all">
						<div class="roll_menu">
							<ul class="mid_menu">
								<%--
								<li><a class="on" href="#">공원수목</a></li>
								<li><a href="#">가로수</a></li>
								<li><a href="#">횡단보도</a></li>
								<li><a href="#">신호등</a></li>
								<li><a href="#">안전표지</a></li>
								<li><a href="#">안전비상벨</a></li>
								<li><a href="#">CCTV</a></li>
								<li><a href="#">어린이집</a></li>
								<li><a href="#">어린이보호구역</a></li>
								<li><a href="#">소방용수시설</a></li>
								<li><a href="#">주차장</a></li>
								<li><a href="#">무료와이파이</a></li>
								--%>
							</ul>
						</div>
						
						<p class="play_n_stop">
							<a href="javascript:startInterval();" class="m_play">play</a>
							<a href="javascript:stopInterval();" class="m_stop" style="display:none">stop</a>
						</p>
						
						<div class="title_area">
							<p class="title_center">의정부 도시 현황</p>
							<p class="cont_title"></p>
						</div>
						<div class="map_area">
							<!--******** 20211014추가 ********-->
							<div id="markerTag">
							
							</div>
							<!-- <p class="nokyang img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
							<p class="ganeung img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="heungsun img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="uijeongbu2 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="howon2 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="howon1 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="jangam img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="singok1 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="uijeongbu1 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="singok2 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="jakeum img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="songsan3 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="songsan2 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
                            <p class="songsan1 img_lv1"><img src="/dist/images/main/tree_lv1.svg" alt=""></p>
							 -->
							<div class="map_remark">
							<ul class="main_rm">
								<!-- <li><span class="rm_lv1"><img src="/dist/images/main/cctv.svg" alt=""></span><br /><span class="rm_text">30만 그루 이하</span></li>
								<li><span class="rm_lv2"><img src="/dist/images/main/cctv.svg" alt=""><br /></span><span class="rm_text">70만 그루 미만</span></li>
								<li><span class="rm_lv3"><img src="/dist/images/main/cctv.svg" alt=""><br /></span><span class="rm_text">70만 그루 이상</span></li>
								<li><span class="rm_lv4"><img src="/dist/images/main/cctv.svg" alt=""><br /></span><span class="rm_text">120만 그루 이상</span></li> -->
								</ul>
							</div>
						
							
							<!-- <div class="map_remark">
								<ul class="main_rm">
									<li><span class="rm_lv1"><img src="/dist/images/main/wifi_lv1.svg" alt=""></span><br /><span class="rm_text">30만 그루 이하</span></li>
									<li><span class="rm_lv2"><img src="/dist/images/main/wifi_lv2.svg" alt=""><br /></span><span class="rm_text">70만 그루 미만</span></li>
									<li><span class="rm_lv3"><img src="/dist/images/main/wifi_lv3.svg" alt=""><br /></span><span class="rm_text">70만 그루 이상</span></li>
									<li><span class="rm_lv4"><img src="/dist/images/main/wifi_lv4.svg" alt=""><br /></span><span class="rm_text">120만 그루 이상</span></li>
								</ul>
							</div> -->
						</div>
						<!-- <div class="chart_wrap po_rel" style="margin-top:50px;">
							<div id="mapLegend" class="remark_map comp_grp01"></div>
							<div id="mainMap" class="graph_451 mapboxgl-map"></div>
						</div> -->
						
						
						<%--
						<div class="map_area">
							<!-- <svg width="" height=""></svg> -->
							
							<img src="/dist/images/main/cmm_dong_bndr.svg" alt="의정부지도">
							<img src="/dist/images/main/pin_aquablue.svg" class="pin" alt="pin아이콘" style="position:absolute;top:210px;left:140px"><!-- pin아이콘 -->
							<a id="openPop" href="#"><img src="/dist/images/main/tree1.svg" class="tree1" alt="나무1단계" style="position:absolute;top:312px;right:264px" ></a>
							<img src="/dist/images/main/tree2.svg" class="tree2" alt="나무2단계" style="position:absolute;top:212px;right:194px" >
							<img src="/dist/images/main/tree3.svg" class="tree3" alt="나무3단계" style="position:absolute;top:362px;left:112px" >
							<img src="/dist/images/main/tree4.svg" class="tree4" alt="나무4단계" style="position:absolute;top:312px;right:380px" >
							
							
						</div>
						--%>
					</div>
					
					<!-- 지도 미니팝업 -->
					<div id="mini_wrap" class="mini_pop" style="display:none">
						<div class="mini_all" id="attributePopup">
							<!-- <a id="mini_close" class="mini_close" href="#">닫기</a>
							<p class="mini_title">송산1동 도시 현황</p>
							<ul class="mini_desc">
								<li>가로수 : 33</li>
								<li>신호등 수 : 44</li>
								<li>주차장 수 :33</li>
								<li>어린이 보호구역 수 : 33</li>
								<li>공원수목  수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
								<li>가로수 : 33</li>
							</ul>
							<p class="go_detail"><a href="#" class="bt_detail">자세히 보기</a></p> -->
						</div>
					</div>
					<!-- <div id="mini_wrap" class="mini_pop" style="display:none">
						<div class="mini_all">
							<a id="mini_close" class="mini_close" href="#">닫기</a>
							<p class="mini_title">공원수목<br />송산1동 <span class="font20 c_green">23,066</span> 그루</p>
							<p class="mini_desc">키 큰 나무 4만그루,키 작은 나무 194만 그루,공원 총 158개소</p>
						</div>
					</div> -->
					
				</div>

				<div class="main_right">
					<!-- 오늘의 날씨 -->
					<div class="today">
                    	<h2  id="weather" class="main_title"><a href="javascript:;">오늘의 날씨
                    	<span class="maintxt_sm">클릭하시면 기상청 날씨정보로 이동합니다.</span>
                    	</a></h2>
                        <div class="today_area">
                        	<img id="weatherIcon" src="https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new_new/img/weather_svg/icon_flat_wt1.svg" alt="날씨">
                        	<dl class="wt_main">
                            	<dt id="weatherTemp"> 23℃</dt><!-- 이미지 icon_flat_wt41.png까지 -->
                                <dd id="weatherType">맑음</dd>
                            </dl>
                            <ul class="wt_sub">
                            	<li>습도 <span id="humidity" class="mn_600">54%</span></li>
                                <li>바람<span id="weatherSpeed" class="mn_600">(남서풍)  3m/s</span></li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- 기상정보 -->
					<div id="weatherContainer" class="weather">
						<h2 class="main_title"><a  href="javascript:fn_movePage('MENU_00027');" >기상정보 <span class="maintxt_sm"></span></a></h2>
						<dl class="w_box">
							<dt>평균기온</dt>
							<dd>11.8˚</dd>
						</dl>
						<dl class="w_box">
							<dt>강수량</dt>
							<dd>0.1㎜</dd>
						</dl>
						<dl class="w_box">
							<dt>미세먼지</dt>
							<dd><span class="weather_1">좋음</span></dd>
						</dl>
						<dl class="w_box">
							<dt>초미세먼지</dt>
							<dd><span class="weather_2">보통</span></dd>
						</dl>
					</div>
                    
                    <!-- <div class="weather">
						<h2 class="main_title"><a href="#">기상정보 <span class="maintxt_sm">(2021년 07월 08일 17:00)</span></a></h2>
						<dl class="w_box">
							<dt>평균기온</dt>
							<dd>11.8˚</dd>
						</dl>
						<dl class="w_box">
							<dt>강수량</dt>
							<dd>0.1㎜</dd>
						</dl>
						<dl class="w_box">
							<dt>미세먼지</dt>
							<dd><span class="weather_1">좋음</span></dd>
						</dl>
						<dl class="w_box">
							<dt>초미세먼지</dt>
							<dd><span class="weather_2">보통</span></dd>
						</dl>
					</div> -->
					<!-- 민원 주요 키워드 -->
					<%-- <div class="keyword">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00023');" >민원 주요 키워드</a></h2>
						<div id="complaintContainer" class="word_all">
							
							<a class="keyword_st st_blue" href="#">#주정차</a>
							<a class="keyword_st st_blue" href="#">#과태료</a>
							<a class="keyword_st st_blue" href="#">#주정차</a> <br />
							<a class="keyword_st" href="#">#주정차</a>
							<a class="keyword_st" href="#">#주정차</a>
							<a class="keyword_st" href="#">#주정차</a>
							<a class="keyword_st" href="#">#주정차</a><br />
							<a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a>
							
						</div>
					</div> --%>
					
					<!-- 여론 주요 키워드 -->
					<%-- <div class="keyword">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00024');">여론 주요 키워드</a></h2>
						<div id="opinionContainer" class="word_all">
							
							<a class="keyword_st st_blue" href="#">#주정차</a> <a class="keyword_st st_blue" href="#">#과태료</a> <a class="keyword_st st_blue" href="#">#주정차</a> <br />
							<a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a> <br />
							<a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a> <a class="keyword_st" href="#">#주정차</a>
							
						</div>
					</div> --%>
					
					<!-- 민원대기현황  -->
					<div class="apply_minwon" id="complaintReceivedContainer">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00023');">실시간 민원 대기 현황 <span class="maintxt_sm"></span></a></h2>
						<div class="apply_state">
							<dl class="state_bx">
								<dt><span class="st_green">여권신청</span></dt>
								<dd><span id="spnText1"></span></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_green">여권교부</span></dt>
								<dd><span id="spnText2"></span></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_blue">일반민원</span></dt>
								<dd><span id="spnText3"></span></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_blue">가족관계등록</span></dt>
								<dd><span id="spnText4"></span></dd>
							</dl>
						</div>
					</div>
					
					<!-- 민원접수현황 -->
					<!-- <div id="complaintReceivedContainer" class="apply_minwon">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00023');" >민원 접수 현황 <span class="maintxt_sm"></span></a></h2>
						<div class="apply_state">
							<dl class="state_bx">
								<dt><span class="st_green">여권신청</span></dt>
								<dd></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_green">여권교부</span></dt>
								<dd></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_blue">일반민원</span></dt>
								<dd></dd>
							</dl>
							<dl class="state_bx">
								<dt><span class="st_blue">가족관계등록</span></dt>
								<dd></dd>
							</dl>
						</div>
					</div> -->
					
					<!-- 시정뉴스 -->
					<div class="news">
						<h2 class="main_title"><a href="javascript:fn_movePage('MENU_00023');">시정뉴스</a></h2>
						<ul id="newsContainer" class="main_list">
							<%--
							<li><a href="#">의정부시 ‘경기도 공공배달 플랫폼 사업확대’ 업무협약<br /><span class="news_date">[국민일보] 2021-06-21 17:44</span></a></li>
							<li><a href="#">의정부시 ‘경기도 공공배달 플랫폼 사업확대’ 업무협약<br /><span class="news_date">[국민일보] 2021-06-21 17:44</span></a></li>
							<li><a href="#">의정부시 ‘경기도 공공배달 플랫폼 사업확대’ 업무협약<br /><span class="news_date">[국민일보] 2021-06-21 17:44</span></a></li>
							<li><a href="#">의정부시 ‘경기도 공공배달 플랫폼 사업확대’ 업무협약<br /><span class="news_date">[국민일보] 2021-06-21 17:44</span></a></li>
							<li><a href="#">의정부시 ‘경기도 공공배달 플랫폼 사업확대’ 업무협약<br /><span class="news_date">[국민일보] 2021-06-21 17:44</span></a></li>
							--%>
						</ul>
					</div>
					
				</div>
				
			</div>
			</div>
			</div>
		</div>
		<!-- Date Time Picker   --> 
<script src="${pageContext.request.contextPath}/dist/js/moment.min.js"></script>
    <!-- Date Picker Locale 설정 -->
<script src="${pageContext.request.contextPath}/dist/js/locale.ko.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/dist/js/bootstrap.min.js"></script>    
<script src="${pageContext.request.contextPath}/dist/js/common/jquery-ui.min.js"></script>
	<!-- js 라이브러리 -->
<%-- 	<script src="${pageContext.request.contextPath}/dist/js/common/d3/d3_v5.min.js"></script> --%>
	<script src="${pageContext.request.contextPath}/dist/js/common/etc/loading/ajax-loading.js"></script>
	<script src="${pageContext.request.contextPath}/dist/js/common/commonUtil.js"></script>	
	<script src="${pageContext.request.contextPath}/pageJs/dashBoard/main.js"></script>
	<script src="${pageContext.request.contextPath}/dist/js/common/commonChart.js"></script>
	<script src="${pageContext.request.contextPath}/dist/js/common/map/mapUtil.js"></script>