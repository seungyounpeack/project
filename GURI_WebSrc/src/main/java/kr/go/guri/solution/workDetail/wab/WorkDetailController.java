package kr.go.guri.solution.workDetail.wab;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.util.FrequentlyUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.noticeMng.detailNotice.web.DetailNoticeController;
import kr.go.guri.solution.workDetail.service.WorkDetailService;
/**
 * 관리자 > 공지 상세 Controller 클래스
 * @author 백승연
 * @since 2022. 10. 26.
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.10.26.   	백승연          최초 생성
 * 
 *      </pre>
 */
@Controller
/*중복으로 들어가는 주소는 먼저 @RequestMapping 처리를 해주면 밑으론 쓰지 않아도 된다.*/
@RequestMapping(value = "/solution/workDetail")
public class WorkDetailController {
	/*'LOGGER'는 기록을 남기기 위해 사용*/
	private static final Logger LOGGER = LoggerFactory.getLogger(DetailNoticeController.class);
	@Autowired
	private MappingJackson2JsonView jsonView; // Json 데이터를 Return 받기위해 Controller 마다 선언해준다

	@Resource(name = "workDetailService")
	private WorkDetailService WorkDetailService; // DB 서비스 호출

	/**
	 * 상세페이지 디테일 페이지
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/workDetail.do")
	public String workdetail(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("workPk", req.getParameter("workPk"));
		return "/solution/workDetail/workDetail";
	}
	/**
	 * 상세페이지 디테일 페이지 데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/workDetailList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
			/*'throws SQLException, Exception' 는 밑에 catch문까지 꼭 두 번 쓰는데 이유는 보안전검때문이다*/
	public ModelAndView workDetailList(@RequestBody Map<String, Object> params,HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		/*resultValue는 Y다*/
		String resultValue = "Y";
		System.out.println("resultValue =========="+resultValue);
		/*resultMSG는 공란이기 때문에 뭐든 올 수 있다*/
		String resultMsg = "";
		/*jsonView를 modelAndView라는 이름으로 쓰겠다*/
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		System.out.println("modelAndView ================="+modelAndView );
		try {
			/*params를 workDetailList에 넣어 사용하겠다*/
		int updateView = WorkDetailService.updateView(params);		//조회수 증가
		Map<String, Object> workDetailList = WorkDetailService.selectWorkList(params);
		if(updateView == 1) {
			if (workDetailList.size()>0) {
				modelAndView.addObject("workDetailList", workDetailList ); //params가 들어 있는 workDetailList를 modelAndView에 넣겠다.
				modelAndView.addObject("resultValue", resultValue); //resultValue에 'Y'를 넣어 modelAndView에 넣겠다.
				modelAndView.addObject("resultMsg", resultMsg );
				
				System.out.println("modelAndView=============================================="+modelAndView);
			}	else {
				resultValue = "N";
				resultMsg = "오류입니다.";
				modelAndView.addObject("resultValue", resultValue);//modelAndView에 'N'을 modelAndView에 넣는다
				modelAndView.addObject("resultMsg", resultMsg ); //resultMSG에 "오류입니다." modelAndView에 넣는다
				
				}//문제가 생기면 catch문이 돌아간다.
			}
		} catch (SQLException e) {
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			LOGGER.info("error ========="+ e);
		}
		
		
		return modelAndView; //'workDetailList.ajax'에 modelAndView를 보낸다
		
	}
	
	/**
	 * 상세페이지 디테일 페이지 리뷰 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/workReviewList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
			/*'throws SQLException, Exception' 는 밑에 catch문까지 꼭 두 번 쓰는데 이유는 보안전검때문이다*/
	public ModelAndView workReviewList(@RequestBody Map<String, Object> params,HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		String resultValue = "Y";
		String resultMsg = "";
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		LoginVO loginVO = CommonUtil.getLoginInfo();
		try {
				Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
				System.out.println("params : "  + params);
				System.out.println("param : "  + param);
				param.put("workPk", params.get("workPk").toString());
				Map<String, Object> page = new HashMap<String, Object>();
				List<Map<String, Object>> workReviewList = WorkDetailService.selectReviewList(param);
				param = CommonUtil.getParam(workReviewList, param);
				page = FrequentlyUtil.pageParam(param);
				
				modelAndView.addObject("loginId", loginVO.getId());
				modelAndView.addObject("workReviewList", workReviewList ); //params가 들어 있는 workReviewList를 modelAndView에 넣겠다.
				modelAndView.addObject("page", page);
				modelAndView.addObject("resultValue", resultValue); //resultValue에 'Y'를 넣어 modelAndView에 넣겠다.
				modelAndView.addObject("resultMsg", resultMsg );
			}
		catch (SQLException e) {
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			LOGGER.info("error ========="+ e);
		}
		return modelAndView; //'workDetailList.ajax'에 modelAndView를 보낸다
		
	}
	
	/**
	 * 추천 update
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateCommend.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateCommend(@RequestBody Map<String, Object> params,HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		String resultLike = "Y";
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		System.out.println("modelAndView ================="+modelAndView );
		try {
			int updateCommend = WorkDetailService.updateCommend(params);
			Map<String, Object> workDetailList = WorkDetailService.selectWorkList(params);
			modelAndView.addObject("workDetailList", workDetailList);
			modelAndView.addObject("resultLike", resultLike);//modelAndView에 'N'을 modelAndView에 넣는다
		} catch (SQLException e) {
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			LOGGER.info("error ========="+ e);
		}
		
		return modelAndView;
	
	}
	
	/**
	 * 리뷰 등록
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/workReviewInsert.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView workReviewInsert(@RequestBody Map<String, Object> params,HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		LoginVO loginVO = CommonUtil.getLoginInfo();
		System.out.println("modelAndView ================="+modelAndView );
		try {
			params.put("loginId", loginVO.getId());
			int insertResult = WorkDetailService.workReviewInsert(params);
			modelAndView.addObject("insertResult", insertResult);
		} catch (SQLException e) {
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			LOGGER.info("error ========="+ e);
		}
		return modelAndView;
	
	}
	
	/**
	 * 리뷰 삭제
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/workReviewDelete.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView workReviewDelete(@RequestBody Map<String, Object> params,HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		System.out.println("modelAndView ================="+modelAndView );
		try {
			int deleteResult = WorkDetailService.workReviewDelete(params);
			modelAndView.addObject("deleteResult", deleteResult);
		} catch (SQLException e) {
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			LOGGER.info("error ========="+ e);
		}
		return modelAndView;
	
	}
	
	/**
	 * 파일 다운로드
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	//파일 다운로드
	@RequestMapping(value = "/fileDown.do")
	public void fileDown(HttpServletRequest req, HttpServletResponse res) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		int fileId = 0;
		String workPk = "";
		String fileNameOrgn = "";
		String fileNameChng = "";
		try {
		fileId = Integer.parseInt(req.getParameter("fileId"));
		workPk = req.getParameter("workPk").toString();
		params.put("fileId", fileId);
		params.put("workPk", workPk);
		fileInfo = WorkDetailService.selectFileInfo(params);
		fileNameChng = fileInfo.get("filePath") + fileInfo.get("fileNewName").toString() + "." + fileInfo.get("fileExtnName");
		fileNameOrgn = fileInfo.get("fileOriName").toString() + "." + fileInfo.get("fileExtnName") ;
		
		ComFileMngUtil.downFile(req, res, fileNameChng, fileNameOrgn);
		
		}catch(SQLException e) {
			LOGGER.info("Exception : {}", e.toString());
		}catch(Exception e) {
			LOGGER.info("Exception : {}", e.toString());
		}
	}
	@RequestMapping(value = "/fileDownCheck.ajax", method = RequestMethod.POST)
	public ModelAndView fileDownCheck(@RequestBody Map<String, Object> params, HttpServletResponse response, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		String resultValue = "Y";
		String resultMsg = "";
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
			Map<String, Object> fileInfo = WorkDetailService.selectFileInfo(params);
			
			System.out.println("fileInfo : " + fileInfo);
			if(fileInfo == null) {
				System.out.println("File null==================");
				resultValue = "N";
				resultMsg = "해당 파일은 존재하지 않습니다.";
			}
		} catch (SQLException e) {
			resultValue = "N";
			resultMsg = "에러입니다. 관리자에게 문의바랍니다.";
			LOGGER.info("error ========="+ e);
		}catch (Exception e) {
			resultValue = "N";
			resultMsg = "에러입니다. 관리자에게 문의바랍니다.";
			LOGGER.info("error ========="+ e);
		}
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		return modelAndView;
	}
	
}
