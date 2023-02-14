package kr.go.guri.manager.stopword.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.manager.stopword.service.StopwordService;

@Controller
public class StopwordController {

	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Resource(name = "stopwordService")
	private StopwordService stopwordService;
	
	
	// 키워드 메인화면 
	@RequestMapping(value = "/mamager/stopword/stopwordMain.do")
	public String stopwordMain (HttpServletRequest request, ModelMap model) throws Exception {
		
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		
		//날짜 데이터 불러오기
		Map<String, Object> date = stopwordService.getDate();
		model.addAttribute("date", date);
		
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		logService.createMenuLog(paramInfo);

		return "manager-content/manager/stopword/stopwordMain";
    }
	
	// 키워드 추가
	@RequestMapping(value = "/mamager/stopword/stopwordInsert.ajax")
	public ModelAndView stopwordInsert(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{

		// 세션의 로그인 사용자 정보 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		//DB 설정 변경시 param 아이디 값 추가해주기
//		params.put("userId", loginVO.getId());
					
		int wordInsert = stopwordService.insertWord(params);

		// word , wordType , userId
		System.out.println("params===================="+ params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		modelAndView.addObject("wordInsert", wordInsert);
		System.out.println("wordInsert : " + wordInsert);		
		
		return modelAndView;
	}
	
		
	
	//키워드 삭제
	@RequestMapping(value = "/mamager/stopword/stopwordDelete.ajax")
	public ModelAndView stopwordDelete(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		System.out.println("키워드 삭제 params check ========================" + params);
		int wordDelete = stopwordService.deleteWord(params);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		modelAndView.addObject("wordDelete", wordDelete);
		System.out.println("wordDelete : " + wordDelete);		
		
		return modelAndView;
	}
	
	
	// 키워드 조회
	@RequestMapping(value = "/mamager/stopword/stopwordList.ajax")
	public ModelAndView wordList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		List<Map<String, Object>> wordList = stopwordService.wordList(params);
		
		System.out.println("params========== check ======" + params);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		modelAndView.addObject("wordList", wordList);
		
		System.out.println("wordList :::===================" + wordList);
		
		return modelAndView;
    }
}
