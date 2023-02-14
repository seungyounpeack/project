/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.go.guri.main.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.ComResourceCloseHelper;
import kr.go.guri.cmm.util.ComWebUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.common.service.CommonService;
import kr.go.guri.manager.logMng.service.LogService;

/**
 * 인트로 화면 Controller 클래스
 * @author 김부권
 * @since 2021. 09. 27.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.09.27.   	김부권          최초 생성
 *   
 * </pre>
 */
@Controller
public class IntroMainController {

	//private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);
	
	@Resource(name = "logService")
	private LogService logService;					// 공통코드 서비스
	
	@Resource(name = "commonService")
	private CommonService commonService;					// 공통코드 서비스
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	/**
	 * Intro 화면
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/intro.do")
    public String intro(HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		/*// Parameter 객체
		if(loginVO != null) {
			if(loginVO.getId() ==null) {
				return "/login/login";
				//return "/common/errorPage/accessDeny";
			}else {
				
				Map<String, Object> paramInfo = new HashMap<String, Object>();
				paramInfo.put("loginId", loginVO.getId());
				Map<String, Object> userInfo = commonService.selectGetRoleInfo(paramInfo);
				
				paramInfo.put("deptCode", loginVO.getOrgnztId());
				paramInfo.put("deptCode", loginVO.getOrgnztId());
				model.addAttribute("userRole", userInfo.get("authCd").toString());
				
				String pwd = "ezgis0424&&";
				String key = "ABCDEFGHABCDEFGH";
				Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
				String iv;
				iv = key.substring(0, 16);
				byte[] keyBytes = new byte[16];
				byte[] b = key.getBytes("UTF-8");
				int len = b.length;
				if (len > keyBytes.length) {
					len = keyBytes.length;
				}
				System.arraycopy(b, 0, keyBytes, 0, len);
				
				Key keySpec = new SecretKeySpec(keyBytes, "AES");
				
				
				c.init(Cipher.ENCRYPT_MODE, keySpec,new IvParameterSpec(iv.getBytes()));
				byte[] encrypted = c.doFinal(pwd.getBytes("UTF-8"));
				pwd = new String(encrypted);
				
				
				c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
				
				byte[] decrypted = c.doFinal(encrypted);
				pwd = new String(decrypted); 
				*/
				
				return "/intro/intro";
			//}
		//}
    }
	
	
	/**
	 * 메인 화면
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/main.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
    public String mainPage(HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		
		String menuCode = request.getParameter("menuCode");
		String returnPage = "";
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		//System.out.println("============================ menuCode =====================================");
		//System.out.println(menuCode);
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		//System.out.println("loginVO : " + loginVO);
		//System.out.println("loginVODeptId : " + loginVO.getOrgnztId());
		//System.out.println("loginVOId : " + loginVO.getId());
		model.addAttribute("loginUserInfo", loginVO);
		//return "analysis/population/servicePopl/serviceContent";
		if(loginVO.getId() ==null) {
			returnPage =  "/common/errorPage/error";
		}else {
			
			switch(menuCode) {
			
			case "MENU_00001":		// 의정부시 공유활용 시스템
				paramInfo.put("loginId", loginVO.getId());
				paramInfo.put("menuCode", menuCode);
				logService.createMenuLog(paramInfo);
				//returnPage = "http://105.3.10.72:8077/webGis/visualList.do";
				//returnPage = "http://localhost:8079/webGis/visualList.do";
				returnPage = "http://ujb.meta-pi.co.kr/webGis/visualList.do";

				break;
				
			case "MENU_0002":		// 대시보드
				paramInfo.put("loginId", loginVO.getId());
				paramInfo.put("menuCode", menuCode);
				logService.createMenuLog(paramInfo);
				returnPage = "/dashBoard/main.do";
				break;
				
			case "MENU_00050":		// 관리자
				paramInfo.put("loginId", loginVO.getId());
				paramInfo.put("menuCode", menuCode);
				logService.createMenuLog(paramInfo);
				returnPage = "/manager/userAuth/userSearch.do";
				break;
				
			}
		}
		
		
		
        return returnPage;
    }
	
	/**
	 * 솔루션 다운로드
	 * @param multiRequest
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/intro/solutionDownload.do")
	public void mainBusinessDwonload(HttpServletResponse response, HttpServletRequest request) throws FileNotFoundException,Exception {
		// /intro/solutionDownload.do?fileNm=EyeTUjbSetup
		// /intro/solutionDownload.do?fileNm=UpdateEyeT
		// /intro/solutionDownload.do?fileNm=version
		String fileNm = null;
		
		String fileUrl = null;
		String fileName = null;
		
		if(request.getParameter("fileNm") != null) {
			fileNm = request.getParameter("fileNm").toString().replaceAll("/", "").replaceAll("\\\\", "");
		}
		
		if(fileNm == null || fileNm.equals("EyeTUjbSetup")) {
			fileUrl = "/home/sonic/UJB-PJT/solution/EyeTUjbSetup.exe";
//			fileUrl = "C:\\home\\sonic\\ujb\\성남시 페이지별 기능 정리.xlsx";
//			fileUrl = "D:\\ujb\\cctvImg.png";
			fileName = "EyeTUjbSetup.exe";
		}
		else if(fileNm.equals("UpdateEyeT")) {
			fileUrl = "/home/sonic/UJB-PJT/solution/UpdateEyeT.exe";
			fileName = "UpdateEyeT.exe";
		}
		else if(fileNm.equals("version")) {
			fileUrl = "/home/sonic/UJB-PJT/solution/version.txt";
			fileName = "version.txt";
		}
		else if(fileNm.equals("manual")) {
			fileUrl = "/home/sonic/UJB-PJT/solution/EyeT_manual.pdf";
			fileName = "EyeT_manual.pdf";
		}
		
		
		String orignlFileNm = URLEncoder.encode( fileName, "UTF-8" ).replaceAll( "\\+", "%20" );
		File file = new File(ComWebUtil.filePathBlackList(fileUrl));

		if (!file.exists()) {
			throw new FileNotFoundException(fileUrl);
		}

		if (!file.isFile()) {
			throw new FileNotFoundException(fileUrl);
		}

		byte[] b = new byte[8192];

	    response.setContentType("application/octet-stream;");
		response.setHeader("Content-Disposition", "filename="+orignlFileNm+";");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;");

		long length = file.length();

		if (length <= Integer.MAX_VALUE)
		{
		  response.setContentLength((int)length);
		}
		else
		{
//		  response.addHeader("Content-Length", Long.toString(length));
		  response.setHeader("Content-Length", Long.toString(length));
		}
		
		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		FileInputStream in = null;

		try {
			in = new FileInputStream(file);
			fin = new BufferedInputStream(in);
			outs = new BufferedOutputStream(response.getOutputStream());

			int read = 0;

			while ((read = fin.read(b)) != -1) {
				outs.write(b, 0, read);
			}
		} finally {
			if( outs != null ) ComResourceCloseHelper.close(outs);
			if( fin != null ) ComResourceCloseHelper.close(fin);
			if( in != null ) ComResourceCloseHelper.close(in);
		}
	}
}
