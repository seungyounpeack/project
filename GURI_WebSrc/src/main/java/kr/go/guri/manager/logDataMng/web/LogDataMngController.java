package kr.go.guri.manager.logDataMng.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;

@Controller
public class LogDataMngController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LogDataMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	
	@RequestMapping(value = "/mamager/logMng/logDataMng.do")
	public String logDataMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{
		
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		String menuCode = request.getParameter("menuCode");
		logService.createMenuLog(paramInfo);
		model.addAttribute("startDate", logService.selectLogDate());
		if( menuCode == null ) {
			return "manager-content/manager/logDataMng/logDataMng";
		}else {
			
			return "/manager/logDataMng/logDataMng";
		}
			
		
        
		
	}
}
