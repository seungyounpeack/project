package kr.go.guri.manager.inquiryMng.inquiryMng.web;

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

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.util.FrequentlyUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.inquiryMng.inquiryMng.service.InquiryMngService;
import kr.go.guri.manager.logMng.service.LogService;
/**
 * 문의 Controller 클래스
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
public class InquiryMngController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InquiryMngController.class);
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Resource(name = "inquiryMngService")
	private InquiryMngService InquiryMngService;						// DB 서비스 호출
	/**
	 * 문의사항 관리 메인페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inquiryMng/inquiryMng.do", produces={"application/json; charset=UTF-8"})
	public String inquiryMngMain(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{
		
		//메뉴코드
		String menuCode = "MENU_00057";
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
		}catch(SQLException e) {
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return "manager-content/manager/inquiryMng/inquiryMng";
	}
	
	/**
	 * 문의사항 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inquiryMng/inquiryList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView inquiryList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		int totalPage = 0;        //전체 페이지
		int totalCnt = 0;         //전체 데이터
		int nowPage = 0;          //현재 페이지
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		try {
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		
		System.out.println("param :  " + params);
		if(params.get("gb") != null) {
		param.put("gb", params.get("gb").toString());
		param.put("searchForm", params.get("searchForm").toString());
		}
		System.out.println("param :  " + param);
		//공지사항 리스트 조회
		List<Map<String, Object>> inquiryList = InquiryMngService.selectInquiryList(param);
		
		
		if( inquiryList.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(inquiryList.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(inquiryList.get(0).get("cnt").toString());
		}
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		Map<String, Object> page = FrequentlyUtil.pageParam(param);
		
		modelAndView.addObject("page", page);	
		modelAndView.addObject("inquiryList", inquiryList);	
		}catch(SQLException e) {
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		
		return modelAndView;
	}
	
	/**
	 * 문의사항 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inquiryMng/deleteList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView deleteInquiryList(@RequestBody List<String> params, HttpServletRequest request, ModelMap model) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		String resultValue = "Y";
		String resultMsg = "";
		try {
		
			System.out.println("params ; " + params);
			EgovMap map = new EgovMap();
			map.put("chkArr", params);
		int result = 0;
		result = InquiryMngService.deleteInquiryList(map);
		if(result > 0) {
			resultMsg = "성공적으로 삭제하였습니다.";
		}
		}catch(SQLException e) {
			resultValue = "N";
			resultMsg = "실패하였습니다.";
		}catch(Exception e) {
			resultValue = "N";
			resultMsg = "실패하였습니다.";
		}

		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);	
		return modelAndView;
	}
	
}
