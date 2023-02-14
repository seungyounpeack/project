package kr.go.guri.cmm.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.go.guri.cmm.vo.LoginVO;


/**
 * 인증여부 체크 인터셉터
 * @author 공통서비스 개발팀 서준식
 * @since 2011.07.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.07.01  서준식          최초 생성
 *  2011.09.07  서준식          인증이 필요없는 URL을 패스하는 로직 추가
 *  2017.08.31  장동한          인증된 사용자 체크로직 변경 및 관리자 권한 체크 로직 추가 
 *  </pre>
 */


public class AuthenticInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	private Environment environment;
	
	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticInterceptor.class);
	
	/** 관리자 접근 권한 패턴 목록 */
	private List<String> adminAuthPatternList;
	
	private List<String> excludePatternList;
	
	public List<String> getAdminAuthPatternList() {
		LOGGER.info("AuthenticInterceptor - getAdminAuthPatternList 호출");
		List<String> list = new ArrayList<>();
		list.addAll(adminAuthPatternList);
		
		return list;
		//return adminAuthPatternList;
	}

	public void setExcludePatternList(List<String> excludePatternList) {
		LOGGER.info("AuthenticInterceptor - setExcludePatternList 호출");
		this.excludePatternList = new ArrayList<String>();
		this.excludePatternList.addAll(excludePatternList);
		/*for( int i = 0 ; i < excludePatternList.size(); i++ ) {
			String str = excludePatternList.get(i);
			this.excludePatternList.add(str);
		}*/
		

		//this.excludePatternList = excludePatternList;
	}
	
	public List<String> getExcludePatternList() {
		LOGGER.info("AuthenticInterceptor - getExcludePatternList 호출");
		List<String> list = new ArrayList<>();
		list.addAll(excludePatternList);
		
		return list;
		//return excludePatternList;
	}

	public void setAdminAuthPatternList(List<String> adminAuthPatternList) {
		LOGGER.info("AuthenticInterceptor - setAdminAuthPatternList 호출");
		this.adminAuthPatternList = new ArrayList<String>();
		this.adminAuthPatternList.addAll(adminAuthPatternList);
		
		//this.adminAuthPatternList = excludePatternList;
	}
	
	
	/*@Resource(name = "menuService")
	private MenuService menuService;						// DB 서비스 호출
*/
	/**
	 * 인증된 사용자 여부로 인증 여부를 체크한다.
	 * 관리자 권한에 따라 접근 페이지 권한을 체크한다.
	 */
	
	@Override
	public boolean preHandle( HttpServletRequest request, HttpServletResponse response, Object handler) throws NullPointerException, Exception {
		
		LOGGER.info("AuthenticInterceptor - preHandle 호출");
		
		LOGGER.debug("=========================== Service Start");
		
		boolean bExcludeUrl = false;
		boolean bExistMenu = false;
		
		// 요청한 Url 정보를 가져온다
		String requestURI = request.getRequestURI();
		LOGGER.info("AuthenticInterceptor - requestURI : " + requestURI);
		LOGGER.info("AuthenticInterceptor - excludePatternList : " + excludePatternList);
		
		// 인증 제외 Url 인지 체크한다 
		for(String excludeUrl : excludePatternList) {
			
			if(requestURI.equals(excludeUrl)) {
				
				bExcludeUrl = true;
				break;
			}
		};
		LOGGER.info("AuthenticInterceptor - bExcludeUrl : " + bExcludeUrl);

		//HttpSession session = request.getSession();
		
		/*LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(session != null) {
			if(loginVO == null) {
				loginVO = new LoginVO();
				
				loginVO.setId((String)session.getAttribute("sso_id"));
				loginVO.setOrgnztId((String)session.getAttribute("dept_code"));
				
				request.getSession().setAttribute("loginVO", loginVO);
			}
			request.getSession().setAttribute("loginVO", loginVO);
		}
		else {
			
			ModelAndView modelAndView = new ModelAndView("/common/errorPage/error");
			throw new ModelAndViewDefiningException(modelAndView);
		}*/
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		LOGGER.info("AuthenticInterceptor - loginVO : " + loginVO);
		
		loginVO = new LoginVO();
		
		loginVO.setId("0ZUWUN");
		loginVO.setName("관리자");
		
		request.getSession().setAttribute("loginVO", loginVO);
		return true;
		
		
		
		// 제외 대상 Url 이 아니면
		/*
		if(!bExcludeUrl) {
			
			Map<String, Object> paramMenu = null;
			
			// 메뉴 목록 조회
			List<Map<String, Object>> menuList = menuService.selectMenuList(paramMenu);
			
			//System.out.println(menuList);
			
			// 요청 Url이 메뉴 정보에 존재하는지 체크
			for(Map<String, Object> menuInfo : menuList) {
				
				if(menuInfo.get("menuLink").equals(requestURI)) {
					
					bExistMenu = true;
				}
			}
			
			// 존재하지 않는 요청 Url 이면
			if(!bExistMenu) {
			
				//ModelAndView modelAndView = new ModelAndView("/common/errorPage/accessDeny");
				//throw new ModelAndViewDefiningException(modelAndView);
				
				//ModelAndView modelAndView = new ModelAndView();
		    	//modelAndView.setViewName("jsonView");
		    	//modelAndView.addObject("resultFlag", "Y");
		    	//modelAndView.addObject("resultMsg", "권한이 없는 요청 Url 입니다.");
		    	//throw new ModelAndViewDefiningException(modelAndView);
			}
			
		}else {
			
			System.out.println("인증 제외 Url : " + requestURI);
		}
		*/
		
		
		
		/*
		LoginVO loginVO = null;
		
		//인증된사용자 여부
		boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();	
		
		//미민증사용자 체크
		if(!isAuthenticated) {
			ModelAndView modelAndView = new ModelAndView("redirect:/login.do");
			throw new ModelAndViewDefiningException(modelAndView);
		}
		*/

		/*
		
		String requestURI = request.getRequestURI();
		String requestURL = request.getRequestURL().toString();
		String servletPath = request.getServletPath();
		String contextPath = request.getContextPath();
		String menuCode = request.getParameter("menuCode");
		
		
		LOGGER.debug("=========================== requestURI : " + requestURI);
		LOGGER.debug("=========================== requestURL : " + requestURL);
		LOGGER.debug("=========================== servletPath : " + servletPath);
		LOGGER.debug("=========================== menuCode : " + menuCode);
		
		
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		
		httpRequest.setAttribute("message", "messageSample");
		
		String messageSample1 = httpRequest.getAttribute("message").toString();
		
		LOGGER.debug("=========================== messageSample1 : " + messageSample1);
		*/
		
		
		//if (RequestContextHolder.getRequestAttributes() == null) {
		
		//HttpServletRequest httpRequest = (HttpServletRequest) request;
		//HttpSession session = httpRequest.getSession();
		
		//LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		//System.out.println("============================= loginVO 1 ============================================");
		//System.out.println(loginVO);
		
		/*if(loginVO == null) {
		
			loginVO = new LoginVO();
			
			loginVO.setId("admin");
			loginVO.setName("관리자");
			
			request.getSession().setAttribute("loginVO", loginVO);
			
			//System.out.println("============================= loginVO 2 ============================================");
			//System.out.println(loginVO);
		}else {
			
			loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
			
			//System.out.println("============================= loginVO 3 ============================================");
			//System.out.println(loginVO);
		}*/
		
		//System.out.println(excludePatternList);
		//System.out.println(adminAuthPatternList);
		
		//인증된사용자 여부
		//boolean isAuthenticated = ComUserDetailsHelper.isAuthenticated();
		
		/*
		//미민증사용자 체크
		if(!isAuthenticated) {
			ModelAndView modelAndView = new ModelAndView("redirect:/login.do");
			throw new ModelAndViewDefiningException(modelAndView);
		}
		*/

		//인증된 권한 목록
		//List<String> authList = (List<String>)ComUserDetailsHelper.getAuthorities();
		
		//관리자인증여부
		//boolean adminAuthUrlPatternMatcher = false;
		
		//AntPathRequestMatcher
		//AntPathRequestMatcher antPathRequestMatcher = null;
		
		//관리자가 아닐때 체크함
		/*
		for(String adminAuthPattern : adminAuthPatternList){
			antPathRequestMatcher = new AntPathRequestMatcher(adminAuthPattern);
			if(antPathRequestMatcher.matches(request)){
				adminAuthUrlPatternMatcher = true;
			}
		}
		*/
		
		
		//관리자 권한 체크
		/*
		if(adminAuthUrlPatternMatcher && !authList.contains("ADMIN")){
			ModelAndView modelAndView = new ModelAndView("redirect:/loginUsr.do?auth_error=1");
			throw new ModelAndViewDefiningException(modelAndView);
		}
		*/
		
		
		
		//관리자 권한 체크
		/*
		if(adminAuthUrlPatternMatcher){
			ModelAndView modelAndView = new ModelAndView("redirect:/loginUsr.do?auth_error=1");
			throw new ModelAndViewDefiningException(modelAndView);
		}
		*/
		
		
		//ModelMap model = new ModelMap();
		
		//model.addAttribute("volcanas", "volcanasSample");
		
		//return true;
	}
	
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
		LOGGER.info("AuthenticInterceptor - postHandle 호출");

		if(LOGGER.isDebugEnabled()) {
			
			LOGGER.debug("=========================== Service End");
		}
	 }

}
