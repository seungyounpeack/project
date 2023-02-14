package kr.go.guri.manager.logMng.web;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
/**
 * @Description		: 로그 관리 Controller
 * @Source        	: LogController.java
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Controller
public class LogController {
private static final Logger LOGGER = LoggerFactory.getLogger(LogController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	/**
	 * 로그 관리 메인페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/logMng/logMng.do", produces={"application/json; charset=UTF-8"})
	public String logMain(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{
		
		//메뉴코드
		String menuCode = "MENU_00053";
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		try {
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);
		model.addAttribute("startDate", logService.selectLogDate());
		/*model.addAttribute("visitor", logService.selectLogDate().get("visitor").toString());
		model.addAttribute("visitorCnt", logService.selectLogDate().get("visitorCnt").toString());
		model.addAttribute("pageView", logService.selectLogDate().get("pageView").toString());*/
		}catch(SQLException e){
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return "manager-content/manager/logMng/logMng";
	}
	
	
	/**
	 * 사용자 통계 초기 데이터 호출 및 월별 로그 데이터 검색 
	 * @param params
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping( value = "/mamager/logMng/logInitData.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView logUserMonth(@RequestBody Map<String, Object> params, ModelMap model, HttpServletRequest request ) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		try {
		//누적 방문자수 통계
		Map<String, Object> visitor = logService.selectLogTotalVisitor();
		
		//누적 방문횟수 통계 
		Map<String, Object> visitorCnt = logService.selectLogTotalCnt();
		
		//누적 페이지뷰 통계
		Map<String, Object> pageView = logService.selectLogTotalView();
		
		//사용자 유저(월별) 로그 CNT
		List<Map<String, Object>> monthCnt = logService.selectLogUserMonthCnt(params);
		
		//사용자 유저 로그(페이지 방문 현황) 데이터 조회 
		List<Map<String, Object>> pageData = logService.selectLogUserPageView(params);
		
		modelAndView.addObject("visitor", visitor);	
		modelAndView.addObject("visitorCnt", visitorCnt);	
		modelAndView.addObject("pageView", pageView);	
		modelAndView.addObject("monthCnt", monthCnt);	
		modelAndView.addObject("pageData", pageData);	
		}catch(SQLException e){
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return modelAndView;
	}
	
	/**
	 * 요일별 로그 데이터 검색 
	 * @param params
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping( value = "/mamager/logMng/logSearchData.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView logMenuDay(@RequestBody Map<String, Object> params, ModelMap model, HttpServletRequest request ) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		try {
		//누적 방문자수 통계
		Map<String, Object> visitor = logService.selectLogTotalVisitor();
		
		//누적 방문횟수 통계 
		Map<String, Object> visitorCnt = logService.selectLogTotalCnt();
		
		//누적 페이지뷰 통계
		Map<String, Object> pageView = logService.selectLogTotalView();
		
		//사용자 유저 로그(요일별) cnt 조회
		List<Map<String, Object>> dayCnt = logService.selectLogUserDayCnt(params);
		
		//사용자 유저 로그(페이지 방문 현황) 데이터 조회 
		List<Map<String, Object>> pageData = logService.selectLogUserPageView(params);
		
		modelAndView.addObject("visitor", visitor);	
		modelAndView.addObject("visitorCnt", visitorCnt);	
		modelAndView.addObject("pageView", pageView);	
		modelAndView.addObject("dayCnt", dayCnt);	
		modelAndView.addObject("pageData", pageData);	
		}catch(SQLException e){
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return modelAndView;
	}
	
	/**
	 * 요일별 로그 데이터 검색 
	 * @param params
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping( value = "/mamager/logMng/logDetailData.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView logDetailData(@RequestBody Map<String, Object> params, ModelMap model, HttpServletRequest request ) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		modelAndView.addObject("logData", logService.selectLogDetailView(params));	
		return modelAndView;
	}
}
