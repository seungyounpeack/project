package kr.go.guri.manager.noticeMng.insNotice.web;

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
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
import kr.go.guri.manager.noticeMng.insNotice.service.InsNoticeService;
/**
 * 관리자 > 공지사항 등록 Controller 클래스
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
@Controller
public class InsNoticeController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InsNoticeController.class);
	private static final String UPLOAD_PATH = GlobalProperties.getProperty("Globals.fileStorePath");
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "insNoticeService")
	private InsNoticeService InsNoticeService;	
	
	/**
	 * 공지사항 관리 등록 페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/noticeMng/insNotice.do" ,produces={"application/json; charset=UTF-8"})
	public String noticeMngMain(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{
		model.addAttribute("bsctSe", request.getParameter("bsctSe"));

		return "manager-content/manager/noticeMng/insNotice";
	}
	
	
	@RequestMapping(value = "updateNotice.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateNotice(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		return modelAndView;
	}
	/**
	 * 공지사항 관리 등록 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	// 게시글 등록 처리
	@Transactional
	@ResponseBody
	@RequestMapping(value = "/mamager/noticeMng/saveNotice.ajax",method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView saveNotice(final MultipartHttpServletRequest multiRequest, HttpServletRequest req) throws Exception {
		System.out.println("test  ====>>"+GlobalProperties.getProperty("Globals.fileStorePath"));
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성

		String resultValue = "N";
		String resultMsg = "";
		String result = "N";
		
		// DB저장 성공 여부 확인
		int insertResult =1;
		int insertResult1 =0;
		int pkVal = 0;
	
		LoginVO loginVO = CommonUtil.getLoginInfo();
		
		if( loginVO != null ) {
			
			try {
				Map<String, Object> param = new HashMap<String, Object>();
				String title = multiRequest.getParameter("title");
				String contents = multiRequest.getParameter("contents");
				param.put("title",title);
				param.put("contents",contents);
				param.put("loginId", loginVO.getId());
				System.out.println("param : " + param);
				pkVal = InsNoticeService.selectPk();
				param.put("pkVal", pkVal);
				
				// 제목이랑 내용 저장 하는 부분 
				insertResult1 = InsNoticeService.saveNotice(param);
				
				//파일저장
				System.out.println("multiRequest.getFileMap() : " + multiRequest.getFileMap());
				final Map<String, MultipartFile> files = multiRequest.getFileMap();
				for( String key : files.keySet() ){
				    MultipartFile value = files.get(key);
				    System.out.println( String.format("키 : "+key+", 값 : "+value));
				}
				
				// files.size == 2 ====> uploadfile 2개 다 보유중 
				System.out.println(" files size === 확인 중 ==== " + files.size());
				
				if(files.size() > 0) {
					for (int i=0; i< files.size(); i++) {
					// 파일명
					String fileNm = files.get("uploadFile_"+i).getOriginalFilename();
//					String encodeValue = new String (fileNm.getBytes("ISO-8859-1"), "UTF-8");
					
					System.out.println(" fileNm ===" + fileNm);
//					System.out.println(" encodeValue ====" + encodeValue);
					// 확장자
					String last = fileNm.substring(fileNm.lastIndexOf('.') + 1);
					// 파일 사이즈
					long fileSize = files.get("uploadFile_"+i).getSize();

					System.out.println( i + "번째 fileNm 확인 중 ========" + fileNm);
					System.out.println( i + "번째 last 확인 중 ========" + last);
					System.out.println( i + "번째 fileSize 확인 중 ========" + fileSize);

					SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd_HHmmss");
					Date nowdate = new Date();
					String dateString = formatter.format(nowdate)+"_"+i;
					System.out.println("dateString : " + dateString);
					String uploadReFileName = "FILE_NOTICE_" + dateString;
					FileVO fileVO = new FileVO();
//						final List<MultipartFile> fileInfo = multiRequest.getFiles("uploadFile_"+i);
//						System.out.println(" i =======" + multiRequest.getFiles("uploadFile_"+i));

//						System.out.println(" fileInfo ====" + fileInfo);
//						System.out.println(" fileInfo" + files.get("uploadFile_"+i));
//						System.out.println(" fileInfo" + fileInfo.get(i).toString());
						
						// 해당 부분 부터 오류 발생 
						MultipartFile file = files.get("uploadFile_"+i);

//						System.out.println("file ====" + file);
						// fileData 넘겨받는  map 객체
						// 데이터 넘겨 받기
						// DB 저장하기
						//게시글 구분
						//fileVO.setBsctSe("공지사항");
						//게시글 번호
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


						if( result.equals("Y") ) insertResult = InsNoticeService.noticeFileUp(fileVO);
					}
				}
				
				
				if(insertResult==0 || insertResult1 == 0) {
					resultValue = "N";
					resultMsg = "다시 시도해 주세요.";
				}
				else {
					resultValue = "Y";
					resultMsg = "성공적으로 저장하였습니다.";
					modelAndView.addObject("pkVal", pkVal);
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
		}else {
				resultValue = "N";
				resultMsg = "세션이 완료되었습니다. 다시 접속해주세요.";
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
