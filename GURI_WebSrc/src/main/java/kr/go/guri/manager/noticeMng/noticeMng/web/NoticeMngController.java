package kr.go.guri.manager.noticeMng.noticeMng.web;

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

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.util.FrequentlyUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.manager.noticeMng.noticeMng.service.NoticeMngService;
/**
 * 관리자 > 공지사항 Controller 클래스
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
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@RequestMapping(value = "/mamager/noticeMng/")
@Controller
public class NoticeMngController {
	private static final Logger LOGGER = LoggerFactory.getLogger(NoticeMngController.class);
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Resource(name = "noticeMngService")
	private NoticeMngService NoticeMngService;						// DB 서비스 호출
	/**
	 * 공지사항 관리 메인페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "noticeMng.do", produces={"application/json; charset=UTF-8"})
	public ModelAndView noticeMngMain(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{

		//메뉴코드
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		ModelAndView modelAndView = new ModelAndView();
		
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		String menuCode = request.getParameter("menuCode");
		String bsctSe = "";
		try {
			
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		
		logService.createMenuLog(paramInfo);
		if(menuCode.equals("MENU_00022")) {
			System.out.println("=============공지");
			bsctSe = "OFA";
		}else if(menuCode.equals("MENU_00023")) {
			System.out.println("=============자료");
			bsctSe = "DTR";
		}else if(menuCode.equals("MENU_00052")) {
			System.out.println("=============데이터");
			bsctSe = "GLLY";
		}else if(menuCode.equals("MENU_00053")) {
			System.out.println("=============빅데이터");
			bsctSe = "GLLY";
		}else if(menuCode.equals("MENU_00054")) {
			System.out.println("=============경진대");
			bsctSe = "PWWK";
		}
		System.out.println("menuCode : " + menuCode);
		System.out.println("bsctSe : " + bsctSe);
		model.addAttribute("startDate", logService.selectLogDate());
		
		modelAndView.addObject("bsctSe",bsctSe);
		if( menuCode == null ) {
			modelAndView.setViewName("manager-content/manager/noticeMng/noticeMng");
		}else {
			modelAndView.setViewName("/manager/noticeMng/noticeMng");
		}
		/*model.addAttribute("visitor", logService.selectLogDate().get("visitor").toString());
		model.addAttribute("visitorCnt", logService.selectLogDate().get("visitorCnt").toString());
		model.addAttribute("pageView", logService.selectLogDate().get("pageView").toString());*/
		}catch(SQLException e){
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		
		
		

		return modelAndView;
//		 if( menuCode == null ) {
//				
//			 return "manager-content/manager/noticeMng/noticeMng";
//			}else {
//				
//				return "/manager/noticeMng/noticeMng";
//			}
		
		
	}
	
	/**
	 * 공지사항 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "noticeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView noticeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		//공지사항 리스트 조회
		List<Map<String, Object>> noticeList = new ArrayList<Map<String, Object>>();
		Map<String, Object> page = new HashMap<String, Object>();
		try {
		System.out.println("param :  " + params);
		if(params.get("gb") != null) {
			param.put("gb", params.get("gb").toString());
			param.put("searchForm", params.get("searchForm").toString());
		}
		param.put("bsctSe", params.get("bsctSe").toString());
		System.out.println("param :  " + param);
		noticeList = NoticeMngService.selectNoticeList(param);
		
		
		param = getParam(noticeList, param);
		page = FrequentlyUtil.pageParam(param);
		modelAndView.addObject("resultValue", "Y");	
		}catch(SQLException e){
			modelAndView.addObject("resultValue", "N");	
			LOGGER.info("error ============== : " + e);
		}catch(Exception e){
			modelAndView.addObject("resultValue", "N");	
			LOGGER.info("error ============== : " + e);
		}
		modelAndView.addObject("page", page);	
		modelAndView.addObject("noticeList", noticeList);	
		return modelAndView;
	}
	
	private Map<String, Object> getParam(List<Map<String, Object>> noticeList, Map<String, Object> param) {
		
		int totalPage = 0;        //전체 페이지
		int totalCnt = 0;         //전체 데이터
		int nowPage = 0;          //현재 페이지
		
		if( noticeList.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(noticeList.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(noticeList.get(0).get("cnt").toString());
		}
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		
		return param;
	}

	/**
	 * 공지사항 삭제
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "deleteList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView deleteNoticeList(@RequestBody List<String> params, HttpServletRequest request, ModelMap model) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		String resultValue = "Y";
		String resultMsg = "";
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> param = new HashMap<String, Object>();
		Map<String, Object> page = new HashMap<String, Object>();
		EgovMap map = new EgovMap();
		int result = 0;
		int result1 = 0;
		
		try {
		
			System.out.println("params ; " + params);
			map.put("chkArr", params);
			result = NoticeMngService.deleteNoticeList(map);
			result1 = NoticeMngService.deleteNoticeListFile(map);
			System.out.println("result ; " + result1);
			if(result > 0) {
				resultMsg = "성공적으로 삭제하였습니다.";
				
			}else{
				resultValue = "N";
				resultMsg = "실패하였습니다.";
			}
		}catch(Exception e) {
			resultValue = "N";
			LOGGER.info("error ==============111111 : " + e);
			resultMsg = "실패하였습니다.";
		}

		modelAndView.addObject("resultList", resultList);
		modelAndView.addObject("page", page);
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);	
		return modelAndView;
	}
	
}
