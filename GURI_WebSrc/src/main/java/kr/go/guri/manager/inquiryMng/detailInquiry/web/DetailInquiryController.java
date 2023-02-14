package kr.go.guri.manager.inquiryMng.detailInquiry.web;

import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.inquiryMng.detailInquiry.service.DetailInquiryService;
/**
 * 문의 상세 Controller 클래스
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
public class DetailInquiryController {
	private static final Logger LOGGER = LoggerFactory.getLogger(DetailInquiryController.class);
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "detailInquiryService")
	private DetailInquiryService DetailInquiryService;						// DB 서비스 호출
	
	/**
	 * 문의사항 디테일 페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/manage/inquiryMng/detailInquiry.do")
	public String detailNotice(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("inquiryPk", req.getParameter("inquiryPk"));
		
		return "manager-content/manager/inquiryMng/detailInquiry";
	}
	/**
	 * 문의사항 디테일 페이지 데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inquiryMng/detailList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView detailList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		String resultValue = "Y";
		String resultMsg = "";
		System.out.println("param :  " + params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		try {
		//공지사항 리스트 조회
		Map<String, Object> detailList = DetailInquiryService.selectDetailList(params);
		
		
		if(detailList.size() > 0) {
		modelAndView.addObject("detailList", detailList);
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		}else {
			resultValue="N";
			resultMsg="오류입니다. 관리자에게 문의하세요.";
			modelAndView.addObject("resultValue", resultValue);
			modelAndView.addObject("resultMsg", resultMsg);
		}
		}catch(SQLException e) {
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return modelAndView;
	}
	
	/**
	 * 문의사항 답글 등록
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inquiryMng/answerUpdate.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView answerUpdate(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		String resultValue = "Y";
		String resultMsg = "";
		int insertResult =0;
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		LoginVO loginVO = CommonUtil.getLoginInfo();
		params.put("loginId", loginVO.getId());
		System.out.println("param :  " + params);
		try {
		//공지사항 리스트 조회
		if(params.get("delYn").equals("Y")) {
			insertResult = DetailInquiryService.deleteInquiry(params);
			if(insertResult ==1) {
				resultValue = "Y";
				resultMsg = "답변을 성공적으로 삭제하였습니다..";
			} else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
				resultValue = "N";
				resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
			 }else {
				resultValue="N";
				resultMsg="오류입니다. 관리자에게 문의하세요.";
				}	
		}else if(params.get("delYn").equals("N")) {
			insertResult = DetailInquiryService.updateInquiry(params);
		if(insertResult ==1) {
			resultValue = "Y";
			resultMsg = "답변을 성공적으로 등록하였습니다.";
		} else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
			resultValue = "N";
			resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
		 }else {
			resultValue="N";
			resultMsg="오류입니다. 관리자에게 문의하세요.";
			}
		}else {

			insertResult = DetailInquiryService.insertInquiry(params);
		if(insertResult ==1) {
			resultValue = "Y";
			resultMsg = "답변을 성공적으로 등록하였습니다.";
		} else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
			resultValue = "N";
			resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
		 }else {
			resultValue="N";
			resultMsg="오류입니다. 관리자에게 문의하세요.";
			}
		
		}
		}catch (SQLException e) {
			resultMsg = e.getMessage();
			System.out.println("Exception " + resultMsg.toString());
			resultMsg = "에러입니다. 관리자에게 문의하세요.";
			resultValue="N";
		}catch (Exception e) {
			resultMsg = e.getMessage();
			System.out.println("Exception " + resultMsg.toString());
			resultMsg = "에러입니다. 관리자에게 문의하세요.";
			resultValue="N";
		}
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		return modelAndView;
	}
}
