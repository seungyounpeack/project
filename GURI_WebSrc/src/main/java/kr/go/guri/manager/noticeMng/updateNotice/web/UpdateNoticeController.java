package kr.go.guri.manager.noticeMng.updateNotice.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.util.GlobalProperties;
import kr.go.guri.cmm.vo.FileVO;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.noticeMng.updateNotice.service.UpdateNoticeService;
/**
 * 관리자 > 공지사항 수정 Controller 클래스
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
public class UpdateNoticeController {
	private static final String UPLOAD_PATH = GlobalProperties.getProperty("Globals.fileStorePath");
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "updateNoticeService")
	private UpdateNoticeService updateNoticeService;	
	
	/**
	 * 공지사항 수정 페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "updateNotice.do")
	public String updateNotice(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("noticePk", req.getParameter("noticePk"));
		model.addAttribute("bsctSe", req.getParameter("bsctSe"));
		
		return "manager-content/manager/noticeMng/updateNotice";
	}
	@RequestMapping(value = "updateList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		String resultValue = "Y";
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);	
		Map<String, Object> paramsInfo = new HashMap<String, Object>();
		try {
			
			List<Map<String, Object>> updateList = updateNoticeService.selectUpdateList(params);
			System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!$$$$$$$$$$$$$$$$$$$$");

			paramsInfo.put("bsctSe", updateList.get(0).get("bsctse").toString());
			System.out.println("11111111111111111111111");
			paramsInfo.put("noticePk", updateList.get(0).get("noticePk").toString());
			System.out.println("22222222222222222222222222");
			paramsInfo.put("title", updateList.get(0).get("title").toString());
			System.out.println("333333333333333333333333");
			paramsInfo.put("contents", updateList.get(0).get("contents").toString());
			System.out.println("4444444444444444444444444");
			paramsInfo.put("regId", updateList.get(0).get("regId").toString());
			System.out.println("555555555555555555555555");
			System.out.println(" detailList.size()" + updateList.size());
			
			if(updateList.size() > 0) {
				modelAndView.addObject("updateList", paramsInfo);
				modelAndView.addObject("resultValue", resultValue);
				}else {
					resultValue="N";
					modelAndView.addObject("resultValue", resultValue);
				}
		} catch (Exception e) {
			System.out.println("###############");
		}
		
		return modelAndView;
	}
	/**
	 * 공지사항 수정 등록 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	// 게시글 등록 처리
	@ResponseBody
	@RequestMapping(value = "updateList.do" ,method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView detailList(final MultipartHttpServletRequest multiRequest, HttpServletRequest req) throws Exception {
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		//삭제 처리할 파일이름 param 담기
		Map<String, Object> deleteParam = new HashMap<String, Object>();
		
		String resultValue = "N";
		String resultMsg = "";
		// DB저장 성공 여부 확인
		int insertResult =1;
		int insertResult1 =0;
		
		//파일 삭제 
		int deleteResult1 =0;
		//파일 새로 등록
		int insertFileResult=0;
		
		int pkVal = 0;
		String result = "N";
		LoginVO loginVO = CommonUtil.getLoginInfo();

		try {
			/*
				parameter 확인
				filesDelArrLen :: 삭제할 첨부파일 배열 크기
			  	filesNewArrLen :: 새로 업로드할 첨부파일 배열 크기
			  	DeleteFile_(번호) :: 삭제할 파일 파일 번호
			  	uploadFile_(번호) :: 새로 업로드할 파일 
			  	title :: 제목
			  	contents :: 내용
			  	noticePk :: 게시물 번호 
			 */
			
			int filesDelArrLen = Integer.parseInt(multiRequest.getParameter("filesDelArrLen"));
			System.out.println("filesDelArrLen ====" + filesDelArrLen);
			int filesNewArrLen = Integer.parseInt(multiRequest.getParameter("filesNewArrLen"));
			System.out.println("filesNewArrLen ====" + filesNewArrLen);
			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			
			// 삭제할 파일 리스트 값이 존재하면 Delete 처리
			if (filesDelArrLen != 0) {
				// 파일 delete or upadte
				for (int i=0; i< filesDelArrLen; i++) {
					multiRequest.getParameter("DeleteFile_"+i);
					System.out.println("삭제될 파일 데이터 확인하기 =====" + multiRequest.getParameter("DeleteFile_"+i));
					String atchFileId = multiRequest.getParameter("DeleteFile_"+i).toString();
					deleteParam.put("atchFileId", atchFileId);
					
					//파일 삭제 처리
					deleteResult1 = updateNoticeService.deleteFile(deleteParam);
					
					if(deleteResult1==0) {
						resultValue = "N";
						resultMsg = "오류입니다.";
					} 
					else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
						resultValue = "N";
						resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
					}
					else {
						resultValue = "Y";
						resultMsg = "성공적으로 저장하였습니다.";
					}
				}
				// 쿼리 태워서 삭제
				// 새로 업로드될 파일 리스트 ==> files 
			}
			if (filesNewArrLen != 0) {
				// 파일 insert
				for (int i=0; i< filesNewArrLen; i++) {
					
					for( String key : files.keySet() ){
					    MultipartFile value = files.get(key);
					    System.out.println( String.format("키 : "+key+", 값 : "+value));
					}
					
//					multiRequest.getParameter("uploadFile_"+i);
//					System.out.println("새로 업로드 될 파일 데이터 확인하기 =====" + multiRequest.getParameter("uploadFile_"+i));
					
					//파일명
					String fileNm = files.get("uploadFile_"+i).getOriginalFilename();
					//확장자
					String last = fileNm.substring(fileNm.lastIndexOf('.') + 1);
					//파일사이즈
					long fileSize = files.get("uploadFile_"+i).getSize();
				
					SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd_HHmmss.sss");
					Date nowdate = new Date();
					String dateString = formatter.format(nowdate)+"_"+i;
					System.out.println("dateString : " + dateString);
					String uploadReFileName = "FILE_NOTICE_" + dateString;
					
					FileVO fileVO = new FileVO();

					MultipartFile file = files.get("uploadFile_"+i);
					
					int noticePk = Integer.parseInt(multiRequest.getParameter("noticePk"));
					pkVal = noticePk;
					
					//게시글 번호 (기존 pk 값으로 넣어준다)
					fileVO.setBsctSn(pkVal);

					//원본파일명
					fileVO.setOrignlFileNm(fileNm);

					//저장파일명
					fileVO.setStreFileNm(uploadReFileName);

					//파일저장경로
					fileVO.setFileStreCours(UPLOAD_PATH);

					//파일크기
					fileVO.setFileMg(Integer.parseInt(String.valueOf(fileSize)));

					//파일확장자
					fileVO.setFileExtsn(last);

					//등록자id
					fileVO.setCreatId(loginVO.getId());

					// 파일 저장하기
					File saveFile = new File(UPLOAD_PATH,uploadReFileName); // 저장할 폴더 이름, 저장할 파일 이름
					file.transferTo(saveFile); // 업로드 파일에 saveFile이라는 껍데기 입힘	
					// 파일저장 결과값
					System.out.println("fileVO:::::: " +fileVO);

					result = uploadFile(file, UPLOAD_PATH,uploadReFileName);
					
					if(result.equals("Y")) {
						// 파일 새로 추가 해주기
						insertFileResult = updateNoticeService.updateFileUp(fileVO);
						
						if(insertFileResult==0) {
							resultValue = "N";
							resultMsg = "오류입니다.";
						} 
						else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
							resultValue = "N";
							resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
						}
						else {
							resultValue = "Y";
							resultMsg = "성공적으로 저장하였습니다.";
						}
					}
				}
			}			
			
			
			// 새로 업로든된 파일 데이터값만 가져옴
			
			System.out.println(" files size === 확인 중 ==== " + files.size());

					Map<String, Object> param = new HashMap<String, Object>();
					String title = multiRequest.getParameter("title");
					String contents = multiRequest.getParameter("contents");
					int noticePk = Integer.parseInt(multiRequest.getParameter("noticePk"));
					param.put("title",title);
					param.put("contents",contents);
					param.put("noticePk",noticePk);
					param.put("loginId", loginVO.getId());
					System.out.println("param : " + param);
					insertResult1 = updateNoticeService.updateNotice(param);
					
					if(insertResult1==0) {
						resultValue = "N";
						resultMsg = "오류입니다.";
					} 
					else if(loginVO.getId().isEmpty() || loginVO.getId() == null){
						resultValue = "N";
						resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
					}
					else {
						resultValue = "Y";
						resultMsg = "성공적으로 저장하였습니다.";
					}
				
		} catch (SQLException e) {
			resultMsg = e.getMessage();
			System.out.println("Exception " + resultMsg.toString());
			resultMsg = "에러입니다. 관리자에게 문의하세요.";
		}catch (Exception e) {
			resultMsg = e.getMessage();
			System.out.println("Exception " + resultMsg.toString());
			resultMsg = "에러입니다. 관리자에게 문의하세요.";
		}
					
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		System.out.println("Exception " + resultMsg.toString());
		return modelAndView; 
	}
	
	
	/**
	 * 파일 업로드
	 * @param file
	 * @param uploadPath
	 * @param uploadReFileName
	 * @throws IOException, Exception 
	 */
	private String uploadFile(MultipartFile file, String uploadPath, String uploadReFileName) throws IOException, Exception {
		File saveFile = new File(UPLOAD_PATH,uploadReFileName);
		System.out.println("uploadReFileName : " + uploadReFileName);
		FileOutputStream outputStream = null;
		BufferedOutputStream bufferedOutputStream = null;
		String result = "N";
		try
		{
			outputStream = new FileOutputStream(saveFile);
			bufferedOutputStream = new BufferedOutputStream(outputStream);
			//byte fileData[] = file.getBytes();
			//버퍼 크기만큼 읽을 때마다 출력 스트림에 써준다.
			bufferedOutputStream.write(file.getBytes());
			result = "Y";
		}catch(IOException e) {
			
			System.out.println("파일 입출력 에러!!" + e);
		}
		catch (Exception e)
		{
			System.out.println("파일 입출력 에러!!" + e);
		}
		finally
		{
			// 파일 닫기. 여기에도 try/catch가 필요하다.
			if( bufferedOutputStream != null ) bufferedOutputStream.close();
			
		}
		return result;
		
	}
}
