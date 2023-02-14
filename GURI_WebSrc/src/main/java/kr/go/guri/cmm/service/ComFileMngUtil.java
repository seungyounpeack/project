package kr.go.guri.cmm.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import kr.go.guri.cmm.util.ComResourceCloseHelper;
import kr.go.guri.cmm.util.ComWebUtil;
import kr.go.guri.cmm.util.GlobalProperties;
import kr.go.guri.cmm.vo.FileVO;

/**
 * @Class Name  : EgovFileMngUtil.java
 * @Description : 메시지 처리 관련 유틸리티
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *   2009.02.13       이삼섭                  최초 생성
 *   2011.08.09       서준식                  utl.fcc패키지와 Dependency제거를 위해 getTimeStamp()메서드 추가
 *   2017.03.03 	     조성원 	            시큐어코딩(ES)-부적절한 예외 처리[CWE-253, CWE-440, CWE-754]
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 02. 13
 * @version 1.0
 * @see
 *
 */
@Component("ComFileMngUtil")
public class ComFileMngUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(ComFileMngUtil.class);
	
	public static final int BUFF_SIZE = 2048;

	//@Resource(name = "fileIdGnrService")
	//private EgovIdGnrService idgenService;
	
	
	// 첨부파일 관련
	@Resource(name = "ComFileMngService")
	private ComFileMngService fileMngService;
	
	/**
	 * 첨부파일을 저장 한다 BY Volcanas
	 * @param files
	 * @param atchFileId
	 * @return
	 * @throws Exception
	 */
	public String uploadFiles(Map<String, MultipartFile> files, String atchFileId) throws FileNotFoundException,Exception {
		
		// 첨부파일 관련 첨부파일ID 생성
		List<FileVO> result = null;
		
		
		// Attach File ID 가 없으면 신규 등록
		if ("".equals(atchFileId) || atchFileId == null) {
		
			result = parseFileInf(files, "FILE_", "", "");
			FileVO fvo = new FileVO();
			
			fvo.setAtchFileId(atchFileId);
			String cnt = fileMngService.getMaxFileSN(fvo);
			fileMngService.insertFileInfs(result); //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
			atchFileId = cnt;
			
		} else {
			
			FileVO fvo = new FileVO();
			
			fvo.setAtchFileId(atchFileId);
			
			String cnt = fileMngService.getMaxFileSN(fvo);
			
			result = parseFileInf(files, "FILE_", atchFileId, "");
			fileMngService.updateFileInfs(result);
		}
		
		return atchFileId;
	}

	/**
	 * 첨부파일에 대한 목록 정보를 취득한다.
	 * 첨부파일 업로드
	 * @param files
	 * @return
	 * @throws Exception
	 */
	public List<FileVO> parseFileInf(Map<String, MultipartFile> files, String KeyStr, String atchFileId, String storePath) throws FileNotFoundException,Exception {

		String storePathString = "";
		String atchFileIdString = "";

		if ("".equals(storePath) || storePath == null) {
			storePathString = GlobalProperties.getProperty("Globals.fileStorePath");
		} else {
			storePathString = GlobalProperties.getProperty(storePath);
		}

		
		if ("".equals(atchFileId) || atchFileId == null) {
			atchFileIdString = atchFileId;
		} else {
			atchFileIdString = atchFileId;
		}


		File saveFolder = new File(ComWebUtil.filePathReplaceAll(storePathString));

		saveFolder.setExecutable(false, true);
		saveFolder.setReadable(true);
		saveFolder.setWritable(false, true);
		
		if (!saveFolder.exists() || saveFolder.isFile()) {
			//2017.03.03 	조성원 	시큐어코딩(ES)-부적절한 예외 처리[CWE-253, CWE-440, CWE-754]
			if (saveFolder.mkdirs()){
				LOGGER.debug("[file.mkdirs] saveFolder : Creation Success ");
			}else{
				LOGGER.error("[file.mkdirs] saveFolder : Creation Fail ");
			}
		}

		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		MultipartFile file;
		String filePath = "";
		List<FileVO> result = new ArrayList<FileVO>();
		FileVO fvo;

		while (itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();

			file = entry.getValue();
			String orginFileName = file.getOriginalFilename();

			//--------------------------------------
			// 원 파일명이 없는 경우 처리
			// (첨부가 되지 않은 input file type)
			//--------------------------------------
			if ("".equals(orginFileName)) {
				continue;
			}
			////------------------------------------

			int index = orginFileName.lastIndexOf(".");
			//String fileName = orginFileName.substring(0, index);
			String fileExt = orginFileName.substring(index + 1);
			String newName = KeyStr + getTimeStamp();
			long size = file.getSize();

			if (!"".equals(orginFileName)) {
				filePath = storePathString + File.separator + newName;
				File saveFile = new File(ComWebUtil.filePathReplaceAll(filePath));
				FileOutputStream outputStream = null;
				BufferedOutputStream bufferedOutputStream = null;
				try
				{
					outputStream = new FileOutputStream(saveFile);
					bufferedOutputStream = new BufferedOutputStream(outputStream);
					//byte fileData[] = file.getBytes();
					//버퍼 크기만큼 읽을 때마다 출력 스트림에 써준다.
					bufferedOutputStream.write(file.getBytes());
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
					if( outputStream != null ) outputStream.close();
					if( bufferedOutputStream != null ) bufferedOutputStream.close();
					
				}
			}
			
			fvo = new FileVO();
			fvo.setFileExtsn(fileExt);
			fvo.setFileStreCours(storePathString);
			fvo.setFileMg(Integer.parseInt(Long.toString(size)));
			fvo.setOrignlFileNm(orginFileName);
			fvo.setStreFileNm(newName);
			fvo.setAtchFileId(atchFileIdString);
			//fvo.setFileSn(String.valueOf(fileKey));

			result.add(fvo);

		}

		return result;
	}

	/**
	 * 첨부파일을 서버에 저장한다.
	 *
	 * @param file
	 * @param newName
	 * @param stordFilePath
	 * @throws Exception
	 */
	protected void writeUploadedFile(MultipartFile file, String newName, String stordFilePath) throws FileNotFoundException, Exception {
		InputStream stream = null;
		OutputStream bos = null;

		try {
			stream = file.getInputStream();
			File cFile = new File(stordFilePath);

			cFile.setExecutable(false, true);
			cFile.setReadable(true);
			cFile.setWritable(false, true);
			if (!cFile.isDirectory()) {
				boolean _flag = cFile.mkdir();
				if (!_flag) {
					throw new IOException("Directory creation Failed ");
				}
			}

			bos = new FileOutputStream(stordFilePath + File.separator + newName);

			int bytesRead = 0;
			byte[] buffer = new byte[BUFF_SIZE];

			while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
				bos.write(buffer, 0, bytesRead);
			}
		} finally {
			if( bos != null ) ComResourceCloseHelper.close(bos);
			if( stream != null ) ComResourceCloseHelper.close(stream);
		}
	}

	/**
	 * 서버의 파일을 다운로드한다.
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public static void downFile(HttpServletRequest request, HttpServletResponse response) throws FileNotFoundException, Exception {

		String downFileName = "";
		String orgFileName = "";

		if ((String) request.getAttribute("downFile") == null) {
			downFileName = "";
		} else {
			downFileName = (String) request.getAttribute("downFile");
		}

		if ((String) request.getAttribute("orgFileName") == null) {
			orgFileName = "";
		} else {
			orgFileName = (String) request.getAttribute("orginFile");
		}

		orgFileName = ComWebUtil.removeCRLF(orgFileName);

		File file = new File(ComWebUtil.filePathBlackList(downFileName));

		if (!file.exists()) {
			throw new FileNotFoundException(downFileName);
		}

		if (!file.isFile()) {
			throw new FileNotFoundException(downFileName);
		}

		byte[] buffer = new byte[BUFF_SIZE]; //buffer size 2K.
		String userAgent = request.getHeader("User-Agent");
		boolean ie = (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1); 
		
		response.setContentType("application/x-msdownload");
		response.setContentType("application/octet-stream;");
		if ( ie ) { 
			response.setHeader("Content-Disposition:", "attachment; filename="+new String(orgFileName.getBytes(), "UTF-8")+";");
		} else { 
			response.setHeader("Content-Disposition", "filename="+new String(orgFileName.getBytes(), "UTF-8")+";");
		};
		//response.setHeader("Content-Disposition:", "attachment; filename=" + new String(orgFileName.getBytes(), "UTF-8"));
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		FileInputStream ins = null;
		try {
			ins = new FileInputStream(file);
			fin = new BufferedInputStream(ins);
			outs = new BufferedOutputStream(response.getOutputStream());
			int read = 0;

			while ((read = fin.read(buffer)) != -1) {
				outs.write(buffer, 0, read);
			}
		} finally {
			if( outs != null ) ComResourceCloseHelper.close(outs);
			if( fin != null ) ComResourceCloseHelper.close(fin);
			if( ins != null ) ComResourceCloseHelper.close(ins);
		}
	}

	/**
	 * 첨부로 등록된 파일을 서버에 업로드한다.
	 *
	 * @param file
	 * @return
	 * @throws Exception
	 */
	public static HashMap<String, String> uploadFile(MultipartFile file) throws FileNotFoundException, Exception {

		HashMap<String, String> map = new HashMap<String, String>();
		//Write File 이후 Move File????
		String newName = "";
		String stordFilePath = GlobalProperties.getProperty("Globals.fileStorePath");
		String orginFileName = file.getOriginalFilename();

		int index = orginFileName.lastIndexOf(".");
		//String fileName = orginFileName.substring(0, _index);
		String fileExt = orginFileName.substring(index + 1);
		long size = file.getSize();

		//newName 은 Naming Convention에 의해서 생성
		newName = getTimeStamp(); // 2012.11 KISA 보안조치
		writeFile(file, newName, stordFilePath);
		//storedFilePath는 지정
		map.put(Globals.ORIGIN_FILE_NM, orginFileName);
		map.put(Globals.UPLOAD_FILE_NM, newName);
		map.put(Globals.FILE_EXT, fileExt);
		map.put(Globals.FILE_PATH, stordFilePath);
		map.put(Globals.FILE_SIZE, String.valueOf(size));

		return map;
	}

	/**
	 * 파일을 실제 물리적인 경로에 생성한다.
	 *
	 * @param file
	 * @param newName
	 * @param stordFilePath
	 * @throws Exception
	 */
	protected static void writeFile(MultipartFile file, String newName, String stordFilePath) throws FileNotFoundException, Exception {
		InputStream stream = null;
		OutputStream bos = null;

		try {
			stream = file.getInputStream();
			File cFile = new File(ComWebUtil.filePathBlackList(stordFilePath));

			cFile.setExecutable(false, true);
			cFile.setReadable(true);
			cFile.setWritable(false, true);
			if (!cFile.isDirectory()){
				//2017.03.03 	조성원 	시큐어코딩(ES)-부적절한 예외 처리[CWE-253, CWE-440, CWE-754]
				if (cFile.mkdirs()){
					LOGGER.debug("[file.mkdirs] saveFolder : Creation Success ");
				}else{
					LOGGER.error("[file.mkdirs] saveFolder : Creation Fail ");
				}
			}
				
			bos = new FileOutputStream(ComWebUtil.filePathBlackList(stordFilePath + File.separator + newName));

			int bytesRead = 0;
			byte[] buffer = new byte[BUFF_SIZE];

			while ((bytesRead = stream.read(buffer, 0, BUFF_SIZE)) != -1) {
				bos.write(buffer, 0, bytesRead);
			}
		} finally {
			if( bos != null ) ComResourceCloseHelper.close(bos);
			if( stream != null ) ComResourceCloseHelper.close(stream);
		}
	}

	/**
	 * 서버 파일에 대하여 다운로드를 처리한다.
	 *
	 * @param response
	 * @param streFileNm 파일저장 경로 + 확장자가 포함된 형태
	 * @param orignFileNm
	 * @throws Exception
	 */
	public static void downFile(HttpServletRequest request, HttpServletResponse response, String streFileNm, String orignFileNm) throws FileNotFoundException, Exception {
		String downFileName = streFileNm;
		String orgFileName = orignFileNm;
		File file = new File(ComWebUtil.filePathBlackList(downFileName));
		if (!file.exists()) {
			throw new FileNotFoundException(downFileName);
		}

		if (!file.isFile()) {
			throw new FileNotFoundException(downFileName);
		}

		byte[] buffer = new byte[BUFF_SIZE]; //buffer size 2K.
		String userAgent = request.getHeader("User-Agent");
		boolean ie = (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1); 
		
		response.setContentType("application/x-msdownload");
		response.setContentType("application/octet-stream;");
		if ( ie ) { 
			orgFileName = new String(orgFileName.getBytes("UTF-8"), "ISO-8859-1");
			response.setHeader("Content-Disposition", "attachment; filename=\""+orgFileName+"\"");
		} else { 
			orgFileName = new String(orgFileName.getBytes("UTF-8"), "ISO-8859-1");
			response.setHeader("Content-Disposition", "filename=\""+orgFileName+"\"");
		};
		//response.setHeader("Content-Disposition:", "attachment; filename=" + new String(orgFileName.getBytes(), "UTF-8"));
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		FileInputStream ins = null;
		try {
			ins = new FileInputStream(file);
			fin = new BufferedInputStream(ins);
			outs = new BufferedOutputStream(response.getOutputStream());
			int read = 0;
			while ((read = fin.read(buffer)) != -1) {
				outs.write(buffer, 0, read);
			}
		} finally {
			if( outs != null ) ComResourceCloseHelper.close(outs);
			if( fin != null ) ComResourceCloseHelper.close(fin);
			if( ins != null ) ComResourceCloseHelper.close(ins);
		}
	}

		/*
		String uploadPath = propertiesService.getString("fileDir");

		File uFile = new File(uploadPath, requestedFile);
		int fSize = (int) uFile.length();

		if (fSize > 0) {
		    BufferedInputStream in = new BufferedInputStream(new FileInputStream(uFile));

		    String mimetype = "text/html";

		    //response.setBufferSize(fSize);
		    response.setContentType(mimetype);
		    response.setHeader("Content-Disposition", "attachment; filename=\"" + requestedFile + "\"");
		    response.setContentLength(fSize);

		    FileCopyUtils.copy(in, response.getOutputStream());
		    in.close();
		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		} else {
		    response.setContentType("text/html");
		    PrintWriter printwriter = response.getWriter();
		    printwriter.println("<html>");
		    printwriter.println("<br><br><br><h2>Could not get file name:<br>" + requestedFile + "</h2>");
		    printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
		    printwriter.println("<br><br><br>&copy; webAccess");
		    printwriter.println("</html>");
		    printwriter.flush();
		    printwriter.close();
		}
		//*/

		/*
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition:", "attachment; filename=" + new String(orgFileName.getBytes(),"UTF-8" ));
		response.setHeader("Content-Transfer-Encoding","binary");
		response.setHeader("Pragma","no-cache");
		response.setHeader("Expires","0");

		BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
		BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
		int read = 0;

		while ((read = fin.read(b)) != -1) {
		    outs.write(b,0,read);
		}
		log.debug(this.getClass().getName()+" BufferedOutputStream Write Complete!!! ");

		outs.close();
		fin.close();
		//
}*/

	/**
	 * 공통 컴포넌트 utl.fcc 패키지와 Dependency제거를 위해 내부 메서드로 추가 정의함
	 * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서17자리의TIMESTAMP값을 구하는 기능
	 *
	 * @param
	 * @return Timestamp 값
	 * @see
	 */
	private static String getTimeStamp() {

		String rtnStr = null;

		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmssSSS";

		SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
		Timestamp ts = new Timestamp(System.currentTimeMillis());

		rtnStr = sdfCurrent.format(ts.getTime());

		return rtnStr;
	}
}
