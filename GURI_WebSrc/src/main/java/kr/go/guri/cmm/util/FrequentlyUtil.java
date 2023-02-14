package kr.go.guri.cmm.util;

import java.util.HashMap;
import java.util.Map;

public class FrequentlyUtil {
	 /**
     * 페이지 계산
     * @param params
     * @return
     * @throws Exception
     */
    public static Map<String, Object> pageParam(Map<String, Object> params) throws NullPointerException, Exception{
    	Map<String, Object> param = new HashMap<String, Object>();
    	
    	//데이터 전체 수
    	double totalCnt = Double.parseDouble(params.get("cnt").toString());
    	
    	//전체페이지 번호
    	int totalPage = Integer.parseInt(params.get("totalPage").toString());
    	
    	//현재페이지 번호
    	int nowPage = Integer.parseInt(params.get("nowPage").toString());
    	//한페이지의 row수
    	double nowPageCnt = Double.parseDouble(params.get("nowPageCnt").toString());
    	
    	//페이징 번호
    	//int pageCnt = (int)Math.ceil(totalCnt/nowPageCnt);
    	
    	//현재 페이지 그룹 (페이지 그룹은 페이지 5개 기준)
    	//int nowPageGroup = (int)(nowPage/5);
    			
    	//전체 페이지 그룹		
    	//int pageGroup = (int)(pageCnt/nowPageCnt);
    	param.put("totalPage", totalPage);
    	param.put("totalCnt", totalCnt);
    	param.put("nowPageCnt", nowPageCnt);
    	param.put("nowPage", nowPage);
    	//param.put("pageCnt", pageCnt);

    	return param;
    }
    
    public static Map<String, Object> pageSetParam(Map<String, Object> params) {
		
		Map<String, Object> param = new HashMap<String, Object>();
		
		int nowPageCnt = Integer.parseInt(params.get("nowPageCnt").toString());

		String tableName = "";
		String name = "";
		
		if( params.get("tableName") != null ) tableName = params.get("tableName").toString();
		if( params.get("name") != null ) name = params.get("name").toString();
		
		
		if( params.get("nowPageCnt") != null ) nowPageCnt = (Integer) params.get("nowPageCnt");
		
		
		int nowPage = 1;
		
		if( params.get("nowPage") != null ) nowPage = (Integer) params.get("nowPage");
		
		
		int nextNo = ( nowPage - 1 ) * nowPageCnt;
		
		param.put("nowPageCnt", Integer.toString((nowPageCnt)));
		param.put("nowPage", nowPage);
		param.put("nextNo", Integer.toString(nextNo));
		param.put("tableName", tableName);
		param.put("name", name);
		return param;
		
	}
}
