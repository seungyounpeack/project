package kr.go.guri.cmm.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *  Class Name : GlobalProperties.java
 *  Description : properties값들을 파일로부터 읽어와   Globals클래스의 정적변수로 로드시켜주는 클래스로
 *   문자열 정보 기준으로 사용할 전역변수를 시스템 재시작으로 반영할 수 있도록 한다.
 *
 * @author 신용삼
 * @since 2019. 07. 08.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019.07.08.   	신용삼          최초 생성
 *   
 * </pre>
 */

public class GlobalProperties {

	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalProperties.class);

	//파일구분자
	final static  String FILE_SEPARATOR = "/";
	//final static  String FILE_SEPARATOR = System.getProperty("file.separator");

	//프로퍼티 파일의 물리적 위치
	//public static final String GLOBALS_PROPERTIES_FILE = System.getProperty("user.home") + FILE_SEPARATOR + "props" +FILE_SEPARATOR + "globals.properties";
	
	//설정값입니다.
	public static final String RELATIVE_PATH_PREFIX = GlobalProperties.class.getResource("").getPath().substring(0, GlobalProperties.class.getResource("").getPath().lastIndexOf("kr"));
	
	//public static final String RELATIVE_PATH_PREFIX = GlobalProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath().substring(0,GlobalProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath().indexOf("WEB-INF/classes/")+"WEB-INF/classes/".length())+"egovframework/";

	public static final String GLOBALS_PROPERTIES_FILE = RELATIVE_PATH_PREFIX + "config/props" + FILE_SEPARATOR + "globals.properties";

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 상대경로 프로퍼티 값을 절대경로로 반환한다(Globals.java 전용)
	 * @param keyName String
	 * @return String
	 */
	public static String getPathProperty(String keyName) {
		String value = "";
		
		LOGGER.debug("getPathProperty : {} = {}", GLOBALS_PROPERTIES_FILE, keyName);
		
		FileInputStream fis = null;
		BufferedInputStream bin = null;
		try {
			Properties props = new Properties();
			
			fis = new FileInputStream(ComWebUtil.filePathBlackList(GLOBALS_PROPERTIES_FILE));
			bin = new BufferedInputStream(fis);
			props.load(bin);
			
			value = props.getProperty(keyName);
			value = (value == null) ? "" : value.trim();//KISA 보안약점 조치 (2018-10-29, 윤창원)
			value = RELATIVE_PATH_PREFIX + "props" + System.getProperty("file.separator") + value;
		} catch (FileNotFoundException fne) {
			LOGGER.debug("Property file not found.", fne);
			throw new RuntimeException("Property file not found", fne);
		} catch (IOException ioe) {
			LOGGER.debug("Property file IO exception", ioe);
			throw new RuntimeException("Property file IO exception", ioe);
		} finally {
			if( bin != null )ComResourceCloseHelper.close(bin);
			if( fis != null )ComResourceCloseHelper.close(fis);
		}
		
		return value;
	}

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다(Globals.java 전용)
	 * @param keyName String
	 * @return String
	 */
	public static String getProperty(String keyName) {
		String value = "";
		
		//설정값입니다.
		LOGGER.debug("===>>> getProperty"+GlobalProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath());
		LOGGER.debug("getProperty : {} = {}", GLOBALS_PROPERTIES_FILE, keyName);
		
		FileInputStream fis = null;
		BufferedInputStream bin = null;
		try {
			Properties props = new Properties();
			
			fis = new FileInputStream(ComWebUtil.filePathBlackList(GLOBALS_PROPERTIES_FILE));
			bin = new BufferedInputStream(fis);
			props.load(bin);
			
			if (props.getProperty(keyName) == null) {
				return "";
			}
			value = props.getProperty(keyName).trim();
		} catch (FileNotFoundException fne) {
			LOGGER.debug("Property file not found.", fne);
			throw new RuntimeException("Property file not found", fne);
		} catch (IOException ioe) {
			LOGGER.debug("Property file IO exception", ioe);
			throw new RuntimeException("Property file IO exception", ioe);
		} finally {
			if( bin != null ) ComResourceCloseHelper.close(bin);
			if( fis != null ) ComResourceCloseHelper.close(fis);
		}
		
		return value;
	}

	/**
	 * 주어진 파일에서 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 상대 경로값을 절대 경로값으로 반환한다
	 * @param fileName String
	 * @param key String
	 * @return String
	 */
	public static String getPathProperty(String fileName, String key) {
		FileInputStream fis = null;
		BufferedInputStream bin = null;
		try {
			Properties props = new Properties();
			
			fis = new FileInputStream(ComWebUtil.filePathBlackList(fileName));
			bin = new BufferedInputStream(fis);
			props.load(bin);

			String value = props.getProperty(key);
			value = RELATIVE_PATH_PREFIX + "props" + System.getProperty("file.separator") + value;
			
			return value;
		} catch (FileNotFoundException fne) {
			LOGGER.debug("Property file not found.", fne);
			throw new RuntimeException("Property file not found", fne);
		} catch (IOException ioe) {
			LOGGER.debug("Property file IO exception", ioe);
			throw new RuntimeException("Property file IO exception", ioe);
		} finally {
			if( bin != null ) ComResourceCloseHelper.close(bin);
			if( fis != null ) ComResourceCloseHelper.close(fis);
		}
	}

	/**
	 * 주어진 파일에서 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다
	 * @param fileName String
	 * @param key String
	 * @return String
	 */
	public static String getProperty(String fileName, String key) {
		FileInputStream fis = null;
		BufferedInputStream bin = null;
		try {
			Properties props = new Properties();
			
			fis = new FileInputStream(ComWebUtil.filePathBlackList(fileName));
			bin = new BufferedInputStream(fis);
			props.load(bin);

			String value = props.getProperty(key);
			
			return value;
		} catch (FileNotFoundException fne) {
			LOGGER.debug("Property file not found.", fne);
			throw new RuntimeException("Property file not found", fne);
		} catch (IOException ioe) {
			LOGGER.debug("Property file IO exception", ioe);
			throw new RuntimeException("Property file IO exception", ioe);
		} finally {
			if( bin != null ) ComResourceCloseHelper.close(bin);
			if( fis != null ) ComResourceCloseHelper.close(fis);
		}
	}

	/**
	 * 주어진 프로파일의 내용을 파싱하여 (key-value) 형태의 구조체 배열을 반환한다.
	 * @param property String
	 * @return ArrayList
	 */
	public static ArrayList<Map<String, String>> loadPropertyFile(String property) {

		// key - value 형태로 된 배열 결과
		ArrayList<Map<String, String>> keyList = new ArrayList<Map<String, String>>();

		String src = property.replace('\\', File.separatorChar).replace('/', File.separatorChar);
		FileInputStream fis = null;
		BufferedInputStream bin = null;
		try {

			File srcFile = new File(ComWebUtil.filePathBlackList(src));
			if (srcFile.exists()) {

				Properties props = new Properties();
				fis = new FileInputStream(src);
				bin = new BufferedInputStream(fis);
				props.load(bin);

				Enumeration<?> plist = props.propertyNames();
				if (plist != null) {
					while (plist.hasMoreElements()) {
						Map<String, String> map = new HashMap<String, String>();
						String key = (String) plist.nextElement();
						map.put(key, props.getProperty(key));
						keyList.add(map);
					}
				}
			}
		} catch (IOException ex) {
			LOGGER.debug("IO Exception", ex);
			throw new RuntimeException(ex);
		} catch (Exception ex) {
			LOGGER.debug("Exception", ex);
			throw new RuntimeException(ex);
		} finally {
			if( bin != null ) ComResourceCloseHelper.close(bin);
			if( fis != null ) ComResourceCloseHelper.close(fis);
		}

		return keyList;
	}
}
