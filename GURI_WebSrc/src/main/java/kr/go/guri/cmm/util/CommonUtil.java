package kr.go.guri.cmm.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.vo.LoginVO;


/**
 * Java 공통 Utility
 * @author 신용삼
 * @since 2019. 07. 08.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일         수정자         수정내용
 *  -------         -------------   ----------------------
 *  2019.07.08.     신용삼          최초 생성
 *   
 * </pre>
 */
@Service
public class CommonUtil {
	
	  /**
     * Ajax 호출 Parameter 를 Map 형식으로 변환
     * @author 		volcanas 	: 2019.07.23 추가
     * @param 		paramJson	: Request Parameter
     * @param 		strKeyName	: 추출할 Json KeyName
     * @return 		Object
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> convertMapToJson(Map<String, Object> paramJson, String strKeyName) throws NullPointerException, Exception {
    	
    	Map<String, Object> returnMap = null;
    	
    	if(!strKeyName.isEmpty()) {
    	
    		returnMap = (Map<String, Object>)paramJson.get(strKeyName);
    	}
    	
    	returnMap = addMapUserSession(returnMap);
    	
    	return returnMap;
    }
    
    /**
     * Map Parameter 에 Session 정보 추가하여 리턴
     * @param paramInfo
     * @return
     * @throws Exception
     */
    public static Map<String, Object> addMapUserSession(Map<String, Object> paramInfo) throws NullPointerException, Exception {
    	
    	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    	
    	LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    	if(loginVO == null) {
    		
    		paramInfo.put("loginId", "");
    		paramInfo.put("logindeptId", "");
    		
    	}else {
    		
    		paramInfo.put("loginId", loginVO.getId());
    		paramInfo.put("logindeptId", loginVO.getOrgnztId());
    	}
    	
    	return paramInfo;
    }
    
    /**
     * 세션의 로그인 사용자 정보 가져오기
     * @return
     * @throws Exception
     */
    public static LoginVO getLoginInfo() throws NullPointerException, Exception {
    	
    	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    	
    	LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
    	
    	return loginVO;
    }
	
	//한글명을 받아오기
    public static ArrayList<String> getName(List<Map<String, Object>> param, String columnName) {
    	ArrayList<String> name = new ArrayList<String>();
    	
    	if( param.size() > 1 ) {
    		for( int i = 0; i < param.size() ; i++ ) {
    			name.add(param.get(i).get(columnName).toString());
    		}
    		
    	}else {
    		name.add(param.get(0).get(columnName).toString());
    	}
    	
    	return name;
    	
    }
	
	/**
     * 문자열을 지정한 분리자에 의해 배열로 리턴하는 메서드.
     * @param source 원본 문자열
     * @param separator 분리자
     * @return result 분리자로 나뉘어진 문자열 배열
     */
    public static String[] split(String source, String separator) throws NullPointerException, Exception {
        String[] returnVal = null;
        int cnt = 1;

        int index = source.indexOf(separator);
        int index0 = 0;
        while (index >= 0) {
            cnt++;
            index = source.indexOf(separator, index + 1);
        }
        returnVal = new String[cnt];
        cnt = 0;
        index = source.indexOf(separator);
        while (index >= 0) {
            returnVal[cnt] = source.substring(index0, index);
            index0 = index + 1;
            index = source.indexOf(separator, index + 1);
            cnt++;
        }
        returnVal[cnt] = source.substring(index0);

        return returnVal;
    }
	

    
    /**
     * Ajax 호출 Parameter 를 List 형식으로 변환
     * @author 		volcanas 	: 2019.07.23 추가
     * @param 		paramJson	: Request Parameter
     * @param 		strKeyName	: 추출할 Json KeyName
     * @return 		Object
     */
    @SuppressWarnings("unchecked")
    public static List<Map<String, Object>> convertListToJson(Map<String, Object> paramJson, String strKeyName) throws NullPointerException, Exception{
    	
    	List<Map<String, Object>> tempList = null;
    	
    	List<Map<String, Object>> returnList = new ArrayList<Map<String,Object>>();
    	
    	if(!strKeyName.isEmpty()) {
    	
    		tempList = (List<Map<String, Object>>)paramJson.get(strKeyName);
    	}    	
    	
    	
    	return returnList;
    }
    

    
    /**
     * Json 데이터를 Return 받기 위해 ModelAndView 객체 생성
     * Controller 에서 Return 객체로 사용한다
     * @param jsonView
     * @return ModelAndView
     * @throws Exception
     */
    public static ModelAndView makeModelAndView(MappingJackson2JsonView jsonView) {
    	
		ModelAndView modelAndView = new ModelAndView("jsonView");
    	modelAndView.setView(jsonView);
    	
    	return modelAndView;
	}
    
    
    /**
     * Map Data Type 을 콘솔에 출력하기
     * @param LOGGER
     * @param paramTitle
     * @param map
     */
    public static void printMap(Logger LOGGER, String paramTitle, Map<String,Object> map) throws NullPointerException, Exception {
        Iterator<Entry<String,Object>> iterator = map.entrySet().iterator();
        Entry<String,Object> entry = null;
        
        LOGGER.info("============================== : " + paramTitle + "\n");
        
        while(iterator.hasNext()){
            entry = iterator.next();
            LOGGER.info("key : "+entry.getKey()+",\tvalue : "+entry.getValue());
        }
        
        LOGGER.info("");
        LOGGER.info("============================================================\n");
    }
    
    
    /**
     * List Data Type 을 콘솔에 출력하기
     * @param LOGGER
     * @param paramTitle
     * @param list
     */
    public static void printList(Logger LOGGER, String paramTitle, List<Map<String,Object>> list) throws NullPointerException, Exception {
        Iterator<Entry<String,Object>> iterator = null;
        Entry<String,Object> entry = null;
        
        LOGGER.info("============================== " + paramTitle + " ==============================\n");
        
        int listSize = list.size();
        
        for(int i=0; i<listSize; i++){
        	LOGGER.info("list index : "+i);
            iterator = list.get(i).entrySet().iterator();
            while(iterator.hasNext()){
                entry = iterator.next();
                LOGGER.info("key : "+entry.getKey()+",\tvalue : "+entry.getValue());
            }
            LOGGER.info("\n");
        }
        
        LOGGER.info("============================================================\n");
    }
    
    
    /**
     * Excel Download 를 위한 공통 함수
     * @param sheetName			: Sheet Name
     * @param titleName			: Data Title
     * @param columnNameList	: Table Header 정보
     * @param columnKeyList		: Column Key 정보
     * @param excelDataList		: Download Data List
     * @return
     */
    public static ModelAndView ExcelDownXSSF(String sheetName, String titleName, String[] columnNameList, String[] columnKeyList, List<Map<String, Object>> excelDataList) throws NullPointerException, Exception {
    
    	ModelAndView excelView = new ModelAndView("excelDownViewXSSF");
		//HashMap<String, Object> paramSampleInfo = new HashMap();
		
		Map<String, Object> excelDataMap = new HashMap<String, Object>();

	    excelDataMap.put("sheetName", sheetName);
	    excelDataMap.put("titleName", titleName);
	    excelDataMap.put("columnNameList", columnNameList);
	    excelDataMap.put("columnKeyList", columnKeyList);
	    //excelDataMap.put("sheetNm", "게시물 목록");
	    
	    excelDataMap.put("excelDatalist", excelDataList);
	    
	    excelView.addObject("excelDataMap", excelDataMap);
	    
	    
	    return excelView;
    }
    
   
    
    /**
     * 현재 시간 구하기 : yyyy-MM-dd HH:mm:ss
     * @return
     * @throws Exception
     */
    public static String getDataTimeForLog() {
    	
    	Date startTime = new Date();
		
		SimpleDateFormat startDateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String returnDateTime = startDateTime.format(startTime);
		
		return returnDateTime;
    }
    
   
    
    /**
     * HttpServletRequest 에서 Json Type으로 변환하기 위한 Method : 미 사용
     * @param request
     * @return
     */
    /*
    public static JSONObject convertJsonObjectFromRequest(HttpServletRequest request) throws Exception {
        StringBuffer json = new StringBuffer();
        String line = null;
        String jsonString = null;
        JSONObject jsonObject = null;
     
        try {
            BufferedReader reader = request.getReader();
            while((line = reader.readLine()) != null) {
                json.append(line);
            }
            
            jsonString = json.toString();
            
            jsonObject = new JSONObject(jsonString);
     
        }catch(Exception e) {
            System.out.println("Error reading JSON string: " + e.toString());
        }
        
        return jsonObject;
    }
    */
    /**

     * underscore ('_') 가 포함되어 있는 문자열을 Camel Case ( 낙타등

     * 표기법 - 단어의 변경시에 대문자로 시작하는 형태. 시작은 소문자) 로 변환해주는

     * utility 메서드 ('_' 가 나타나지 않고 첫문자가 대문자인 경우도 변환 처리

     * 함.)

     * @param underScore

     *        - '_' 가 포함된 변수명

     * @return Camel 표기법 변수명

     */

    public static String convert2CamelCase(String underScore) {
        // '_' 가 나타나지 않으면 이미 camel case 로 가정함.
        // 단 첫째문자가 대문자이면 camel case 변환 (전체를 소문자로) 처리가
        // 필요하다고 가정함. --> 아래 로직을 수행하면 바뀜
        if (underScore.indexOf('_') < 0
            && Character.isLowerCase(underScore.charAt(0))) {
            return underScore;
        }

        StringBuilder result = new StringBuilder();
        boolean nextUpper = false;
        int len = underScore.length();

        for (int i = 0; i < len; i++) {
            char currentChar = underScore.charAt(i);
            if (currentChar == '_') {
                nextUpper = true;
            } else {
                if (nextUpper) {
                    result.append(Character.toUpperCase(currentChar));
                    nextUpper = false;
                } else {
                    result.append(Character.toLowerCase(currentChar));
                }
            }
        }
        return result.toString();

    }
    /**
     * 페이징처리
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getParam(List<Map<String, Object>> list, Map<String, Object> param) {
		
		int totalPage = 0;        //전체 페이지
		int totalCnt = 0;         //전체 데이터
		int nowPage = 0;          //현재 페이지
		
		if( list.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(list.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(list.get(0).get("cnt").toString());
		}
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		
		return param;
	}
}
