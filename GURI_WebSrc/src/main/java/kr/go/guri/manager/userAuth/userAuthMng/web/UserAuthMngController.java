package kr.go.guri.manager.userAuth.userAuthMng.web;

import java.sql.SQLException;
import java.util.ArrayList;
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
import kr.go.guri.manager.userAuth.userAuthMng.service.UserAuthMngService;


@Controller
@RequestMapping( "/mamager/userAuthMng" )
public class UserAuthMngController {
private static final Logger LOGGER = LoggerFactory.getLogger(UserAuthMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "userAuthMngService")
	private UserAuthMngService userAuthMngService;						// DB 서비스 호출

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	/**
	 * 관리자 > 사용자 권한설정 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userAuthMng.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String userAuthMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception {
		LoginVO loginVO = CommonUtil.getLoginInfo();
		//메뉴코드
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		
		String menuCode = request.getParameter("menuCode");
		try {
			// 로그인 사용자 정보를 Session에서 가져오기
			paramInfo.put("loginId", loginVO.getId());
			paramInfo.put("menuCode", menuCode);
			logService.createMenuLog(paramInfo);
			logService.createUserLog(paramInfo);
	        if( menuCode == null ) {
				
	        	return "manager-content/manager/userAuth/userAuthMng";
			}else {
				
				return "/manager/userAuth/userAuthMng";
			}
	        
			}catch (SQLException e) {
				LOGGER.info("userAuthMng SQLException Error");
				return "/common/errorPage/error";
			}catch (Exception e) {
				LOGGER.info("userAuthMng Error");
				return "/common/errorPage/error";
			}
		
		
    }
	
	/**
	 * 초기 데이터 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userAuthMngList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView userAuthMngList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		// Json Parameter에서 Map Type으로 변환
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> upperDeptList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> userSearchList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> userRankList = new ArrayList<Map<String, Object>>();
		
		try {
			upperDeptList  = userAuthMngService.selectUpperDetpList();
			userSearchList  = userAuthMngService.selectUserList(params);
			userRankList     = userAuthMngService.selectPosList();
			
			modelAndView = CommonUtil.makeModelAndView(jsonView);
			modelAndView.addObject("resultValue"   , "Y");
		}catch(SQLException e) {
			LOGGER.info("SQLEXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
		}catch(Exception e) {
			LOGGER.info("EXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
			
		}
	
		modelAndView.addObject("upperDeptList"   , upperDeptList);
		modelAndView.addObject("userSearchList"   , userSearchList);
		modelAndView.addObject("userRankList"      , userRankList);
		
		return modelAndView;
	}
	
	/**
	 * 하위부서 데이터 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getDeptList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getDeptList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "deptInfo");
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		System.out.println("paramInfo :: "+ paramInfo);
		if( paramInfo != null ) {
			try {
				resultList  = userAuthMngService.selectSectionDeptList(paramInfo);
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				modelAndView.addObject("resultValue"   , "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLEXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("EXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
				
			}
		}
		
		modelAndView.addObject("sectionList"   , resultList);
		
		return modelAndView;
	}
	
	/**
	 * 하위부서 데이터 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRoleList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectRoleList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "deptInfo");
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		System.out.println("paramInfo :: "+ paramInfo);
		if( paramInfo != null ) {
			try {
				resultList  = userAuthMngService.selectUserRoleList(paramInfo);
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				modelAndView.addObject("resultValue"   , "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLEXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("EXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
				
			}
		}
		
		modelAndView.addObject("resultList"   , resultList);
		
		return modelAndView;
	}
	
	/**
	 * 검색 조건 데이터 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSearchUserList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectSearchUserList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "deptInfo");
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		if( paramInfo != null ) {
			try {
				resultList  = userAuthMngService.selectUserList(paramInfo);
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				modelAndView.addObject("resultValue"   , "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLEXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("EXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
				
			}
		}
		
		modelAndView.addObject("searchList"   , resultList);
		
		return modelAndView;
	}
	
	/**
	 * 검색 조건 데이터 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUserRoleList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateUserRoleList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> deptInfo = CommonUtil.convertMapToJson(params, "deptInfo");
		Map<String, Object> roleList = CommonUtil.convertMapToJson(params, "roleList");
		ModelAndView modelAndView = new ModelAndView();
		int deleteCnt = 0;
		int insertCnt = 0;
		int selectCnt = 0;
		if( deptInfo != null ) {
			try {
				
				System.out.println("deptInfo : " + deptInfo);
				System.out.println("roleList : " + roleList);
				selectCnt = userAuthMngService.selectUserRoleInfo(deptInfo);
				if( selectCnt > 0 ) deleteCnt  = userAuthMngService.deleteUserRoleInfo(deptInfo);
				deptInfo.put("roleCode", roleList.get("roleCode"));
				insertCnt = userAuthMngService.insertUserRoleInfo(deptInfo);
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				modelAndView.addObject("resultValue"   , "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLEXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("EXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
				
			}
		}
		
		
		return modelAndView;
	}
	
}
