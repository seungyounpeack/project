package kr.go.guri.login.web;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.executor.ExecutorException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonSHA256;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.common.service.CommonService;
import kr.go.guri.login.service.LoginService;

/**
 * 로그인 화면 Controller 클래스
 * @author 김부권
 * @since 2021. 10. 08.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.10.08.   	김부권          최초 생성
 *   
 * </pre>
 */
@Controller
public class LoginController {

	//private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);
	
	@Resource(name = "loginService")
	private LoginService loginService;					// 공통코드 서비스
	
	@Resource(name = "commonService")
	private CommonService commonService;					// 공통코드 서비스
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	/**
	 * login 화면
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login.do")
    public String login(HttpServletRequest request, ModelMap model) throws ExecutorException, Exception {
		
		return "/login/login";
    }
	
	
	/**
	 * userID 검색
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login/loginSerachUserId.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView loginSerachUserId(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		List<Map<String, Object>> userId = loginService.selectSearchInfo(params);
		
		modelAndView.addObject("userId", userId);
		return modelAndView;
	}
	
	/**
	 * loginCheck 화면
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login/loginCheck.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
    public ModelAndView loginCheck(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model, HttpSession session) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		//패스워드 암호화
		String passwordCoding = CommonSHA256.encrypt(params.get("createPassword").toString());
		
		params.put("passwordCoding", passwordCoding);
		
		Map<String, Object> logon = loginService.selectUserLogin(params);
		String resultMsg = "";
		String resultSuccess = "Y";
		if( logon != null ) {
			LoginVO loginVO = new LoginVO();
			session.setAttribute("userId", logon.get("logonId").toString());
			session.setMaxInactiveInterval(36000);
			loginVO.setId((String)session.getAttribute("userId"));
			request.getSession().setAttribute("loginVO", loginVO);
		}else {
			resultMsg = "로그인 정보를 다시 확인해주세요";
			resultSuccess = "N";
		}
		
		modelAndView.addObject("resultMsg", resultMsg);
		modelAndView.addObject("resultSuccess", resultSuccess);
        return modelAndView;
    }
	
	
	/**
	 * 회원가입 프로세스
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login/createUser.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView createUser(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		
		String resultMsg = "";
		String resultSuccess = "Y";
		String passwordCoding = CommonSHA256.encrypt(params.get("createPassword").toString());
		
		params.put("passwordCoding", passwordCoding);
		//유저 중복 체크
		int checkCnt = loginService.selectCheckUserInfo(params);
		
		int cnt = 0;
		
		if( checkCnt == 0 ) {
			
			cnt = loginService.insertUserInfo(params);
		}
		
		
		if( cnt == 1 ) {
			
		}else {
			resultMsg = "회원가입에 실패하였습니다.";
			resultSuccess = "N";
		}
		modelAndView.addObject("resultMsg", resultMsg);
		modelAndView.addObject("resultSuccess", resultSuccess);
		return modelAndView;
	}
	
	/**
	 * 로그아웃 프로세스
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login/logoutUser.do")
	public ModelAndView logoutUser(HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		HttpSession sec = request.getSession(false);
		String msg = "Y";
		request.getSession(true).invalidate();
		modelAndView.addObject("resultSuccess", msg);
		return modelAndView;
	}
	
	
}
