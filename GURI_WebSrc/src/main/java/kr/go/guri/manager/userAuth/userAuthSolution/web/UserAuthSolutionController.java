package kr.go.guri.manager.userAuth.userAuthSolution.web;

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
import kr.go.guri.manager.userAuth.userAuthSolution.service.UserAuthSolutionService;
import kr.go.guri.manager.userAuth.userSearch.service.UserSearchService;


@Controller
public class UserAuthSolutionController {
private static final Logger LOGGER = LoggerFactory.getLogger(UserAuthSolutionController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "userAuthSolutionService")
	private UserAuthSolutionService userAuthSolutionService;						// DB 서비스 호출
	

	@Resource(name = "userSearchService")
	private UserSearchService userSearchService;						// DB 서비스 호출

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	/**
	 * 관리자 > 솔루션 권한 부여 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/userAuth/userAuthSolution.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
    public String userAuthSolutionInsert(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		try {
		//메뉴코드
		String menuCode = "MENU_00058";
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);

		List<Map<String, Object>> deptAllList     = userSearchService.getDeptAllGetList();
		List<Map<String, Object>> positionList    = userSearchService.getPositionList();
		model.addAttribute("deptAllList"      , deptAllList);
		model.addAttribute("positionList"     , positionList);
		}catch (SQLException e) {
			LOGGER.info("userAuthSolutionInsert SQLException Error");
		}catch (Exception e) {
			LOGGER.info("userAuthSolutionInsert Error");
		}
        return "/manager/userAuth/userAuthSolution";
    }
	
	/**
	 * 솔루션 권한 부여하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/userAuth/userAuthSolutionInsert.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView userAuthSolutionInsert(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		int cnt  = userAuthSolutionService.selectInsertSolutionAuth(params);

		int solutionCnt = 0;

		
		String resultValue = "Y";
		//솔루션 권한의 유저수 체크
		solutionCnt = userAuthSolutionService.selectSolutionUserCnt(params);
		
		if( solutionCnt > 49 ) {
			resultValue = "N";
			
		}else {
			
			if( cnt == 0 ) resultValue = "N"; 
			
			modelAndView.addObject("resultValue"   , resultValue);
			
		}
		}catch (SQLException e) {
			LOGGER.info("userAuthSolutionInsert SQLException Error");
		}catch (Exception e) {
			LOGGER.info("userAuthSolutionInsert Error");
		}
		return modelAndView;
		
		
	}
	/**
	 * 솔루션 권한 해제하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/userAuth/userAuthSolutionDelete.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView userAuthSolutionDelete(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		int cnt  = userAuthSolutionService.selectDeleteSolutionAuth(params);
		
		String resultValue = "Y";
		
		if( cnt == 0 ) resultValue = "N"; 
		
		modelAndView.addObject("resultValue"   , resultValue);
		}catch (SQLException e) {
			LOGGER.info("userAuthSolutionDelete SQLException Error");
		}catch (Exception e) {
			LOGGER.info("userAuthSolutionDelete Error");
		}
		return modelAndView;
	}
	
	/**
	 * 솔루션 권한 유저 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/userAuth/selectAuthUserInfo.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectAuthUserInfo(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		List<Map<String, Object>> deptAllList     = userSearchService.getDeptAllGetList();
		List<Map<String, Object>> positionList    = userSearchService.getPositionList();
		modelAndView.addObject("deptAllList"      , deptAllList);
		modelAndView.addObject("positionList"     , positionList);
		}catch (SQLException e) {
			LOGGER.info("selectAuthUserInfo SQLException Error");
		}catch (Exception e) {
			LOGGER.info("selectAuthUserInfo Error");
		}
		return modelAndView;
	}
	
	/**
	 * 솔루션 권한 유저 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/userAuth/selectAuthUserList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectAuthUserList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		List<Map<String, Object>> userSolutionList  = userAuthSolutionService.selectSolutionUserList(params);
		List<Map<String, Object>> userList  = userAuthSolutionService.selectUserList(params);
		
		
		
		
		modelAndView.addObject("userSolutionList"   , userSolutionList);
		modelAndView.addObject("userList"   , userList);
		}catch (SQLException e) {
			LOGGER.info("selectAuthUserList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("selectAuthUserList Error");
		}
		
		return modelAndView;
	}
	
}
