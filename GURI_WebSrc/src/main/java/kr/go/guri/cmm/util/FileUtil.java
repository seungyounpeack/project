package kr.go.guri.cmm.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

public class FileUtil {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FileUtil.class);
	private static final String UPLOAD_PATH = GlobalProperties.getProperty("Globals.fileStorePath");
	private static final String DOWNLOAD_PATH = GlobalProperties.getProperty("Globals.fileStorePath");
	
	
	public void fileBinder(List<MultipartFile> file, List<Map<String, Object>> insData) {//파일을 db에 저장하는 데 필요한 정보를 매핑
		System.out.println("filse :::: " +file);
		if(file != null) {
			try {
			    // 파일 이름 변경
				for(int i = 0; i< file.size(); i++) {
					
					SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd_HHmmss.sss");
					Date nowdate = new Date();
					String dateString = formatter.format(nowdate);
					
					String uploadFileName = file.get(i).getOriginalFilename();
					String[] fileCodeList;
					int fileCodeIndex;
					
					// 파일 확장자만 가져오기
					fileCodeList = uploadFileName.split("\\.");
					fileCodeIndex = (fileCodeList.length) -1;
					
					// 1. 파일 확장자 제외한 이름만 가져오기 ( 원본파일명 )
					//uploadFileName = uploadFileName.substring(0, uploadFileName.indexOf(fileCodeList[fileCodeIndex]));
					uploadFileName = file.get(i).getOriginalFilename();
					
					// 2. 중복방지를 위한 파일 이름 변경하기 ( 변경파일명 )
					String uploadReFileName = dateString+ "_" + uploadFileName;;
					
					// 3. 파일 확장자
					String fileCode = fileCodeList[fileCodeIndex];
					
					// 4. 파일 크기
					String fileSize = Integer.toString(Math.round(file.get(i).getSize()/1024.0f));
					
					Map<String, Object> map = new HashMap<>();
					
					map.put("uploadFileName", uploadFileName);
					map.put("uploadReFileName", uploadReFileName);
					map.put("fileCode", fileCode);
					map.put("fileSize", fileSize);
					
					insData.add(map);
				}
				
			} catch (Exception e) {
				LOGGER.info("fileBinder 에러");
				e.printStackTrace();
			}
		} else {
			return;
		}
	}
	
	public static String saveFile(MultipartFile file, String uploadPath, String uploadReFileName) throws IOException, Exception{
		
		
		String pathFile = UPLOAD_PATH + File.separator + uploadReFileName;
		
		File saveFile = new File(ComWebUtil.filePathReplaceAll(pathFile));
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
			if( outputStream != null ) outputStream.close();
			if( bufferedOutputStream != null ) bufferedOutputStream.close();
			
		}
		return result;
		

	}
	

	
	public static void downloadFile(File file, HttpServletRequest req, HttpServletResponse res
						   , String fileNameOrgn, String fileNameChng) throws IOException, Exception {
		//CRLF 제거
		String newFileName = ComWebUtil.removeCRLF(fileNameChng);
		String fullPath = UPLOAD_PATH + File.separator + newFileName;
		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		FileInputStream ins = null;
		System.out.println("!!!!!!!!!!!!!!!!!!!!");
		try {
			
			if(fileNameOrgn==null||fileNameOrgn.equals("")) {

				fileNameOrgn = fileNameChng;
			}

			//File file = new File(fullPath);	

			if(!file.exists())
				LOGGER.info("파일이 존재하지 않음.");

			String header = req.getHeader("User-Agent");

			if (header.contains("MSIE") || header.contains("Trident")) {
				fileNameOrgn = URLEncoder.encode(fileNameOrgn,"UTF-8").replaceAll("\\+", "%20");
			    res.setHeader("Content-Disposition", "attachment;filename=" + fileNameOrgn + ";");
			} else {
				fileNameOrgn = new String(fileNameOrgn.getBytes("UTF-8"), "ISO-8859-1");
			   res.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameOrgn + "\"");
			}
			 
			res.setContentType("application/octet-stream");  // 공식 
			res.setContentLength((int) file.length());
			res.setHeader("Content-Type", "application/octet-stream");
			res.setContentLength((int)file.length());
			res.setHeader("Content-Transfer-Encoding", "binary;");
			res.setHeader("Pragma", "no-cache;");
			res.setHeader("Expires", "-1;");
			 
			ins = new FileInputStream(file);
			fin = new BufferedInputStream(ins);
			outs = new BufferedOutputStream(res.getOutputStream());

			int data;
			byte[] bytes = new byte[4096]; //4096 byte만큼 읽어서 클라이언트한테 내보낼것임
			System.out.println("file : "+ file.getName());
			System.out.println("file.length : "+ file.length());
			System.out.println("in : " + fin.read());
			System.out.println("fin.read(bytes) : " + fin.read(bytes));
			while((data=fin.read(bytes))!=-1) {//0~4096까지 읽어서 data에 넣을것임
				System.out.println("data : " + data);
				outs.write(bytes,0,data); //0~data의size까지 내보낼것임 
			}
			System.out.println("=========================== DOWNLOAD");
			outs.flush();
			


		} catch (IOException e) {
			LOGGER.info("FileUtil Exception : {}", e.toString());
		} catch (Exception e) {
			LOGGER.info("FileUtil Exception : {}", e);
		}finally {
			//if( bout != null ) bout.close();
			if( outs != null ) ComResourceCloseHelper.close(outs);
			if( fin != null ) ComResourceCloseHelper.close(fin);
			if( ins != null ) ComResourceCloseHelper.close(ins);
		}

	}
	
	public void saveSolFile(MultipartFile file, String fileNm){
			
			String uploadReFileName = fileNm;
			// 저장할 File 객체를 생성
			File saveFile = new File(DOWNLOAD_PATH,uploadReFileName); // 저장할 폴더 이름, 저장할 파일 이름
			
			try {
				file.transferTo(saveFile); // 업로드 파일에 saveFile이라는 껍데기 입힘
			} catch (IOException e) {
				e.printStackTrace();
		}

	}
	

	
	public String downloadSolFile(HttpServletRequest req, HttpServletResponse res
						   , String fileNameOrgn, String fileNameChng) {
		String upMsg = "Y";
		try {
			
			String fullPath = DOWNLOAD_PATH + File.separator + fileNameChng;
			System.out.println(" fullPath : " + fullPath);
			if(fileNameOrgn==null||fileNameOrgn.equals("")) {

				fileNameOrgn = fileNameChng;
			}

			File f = new File(fullPath);	

			if(!f.exists())
				{LOGGER.info("파일이 존재하지 않음.");
				upMsg = "N";
				}

			String header = req.getHeader("User-Agent");

			if (header.contains("MSIE") || header.contains("Trident")) {
				fileNameOrgn = URLEncoder.encode(fileNameOrgn,"UTF-8").replaceAll("\\+", "%20");
			    res.setHeader("Content-Disposition", "attachment;filename=" + fileNameOrgn + ";");
			} else {
				fileNameOrgn = new String(fileNameOrgn.getBytes("UTF-8"), "ISO-8859-1");
			   res.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameOrgn + "\"");
			}
			 
			res.setContentType("application/octet-stream");  // 공식 
			res.setContentLength((int) f.length());
			res.setHeader("Content-Type", "application/octet-stream");
			res.setContentLength((int)f.length());
			res.setHeader("Content-Transfer-Encoding", "binary;");
			res.setHeader("Pragma", "no-cache;");
			res.setHeader("Expires", "-1;");
			 
			
			BufferedInputStream bis = 
					new BufferedInputStream(new
							FileInputStream(f));

			// 읽어들인 파일을 "출력"한다
			OutputStream out = res.getOutputStream();

			int data;
			byte[] bytes = new byte[4096]; //4096 byte만큼 읽어서 클라이언트한테 내보낼것임

			while((data=bis.read(bytes,0,4096))!=-1) {//0~4096까지 읽어서 data에 넣을것임

				out.write(bytes,0,data); //0~data의size까지 내보낼것임 

			}

			out.flush();
			out.close();
			bis.close(); // 사용한 메소드는 다 닫아주기


		} catch (Exception e) {
			LOGGER.info("FileUtil Exception : {}", e);
		}
		System.out.println("upMsg : " + upMsg);
		return upMsg;
	}
	
}
