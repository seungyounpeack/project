package kr.go.guri.manager.dataMng.outDataReg;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import kr.go.guri.cmm.util.ComStringUtil;
import kr.go.guri.cmm.util.ComWebUtil;

public class UploadDataUtil {
	
	char FILE_SEPARATOR = File.separatorChar;
	
	private Connection getConnectionDB() throws Exception {
		
		Class.forName("org.postgresql.Driver");
		
		Connection con = DriverManager.getConnection("jdbc:log4jdbc:postgresql://192.168.1.210:5433/EZ_UJB","postgres","ezgis0424&&");
//		Connection con = DriverManager.getConnection("jdbc:postgresql://105.3.10.71:5433/ez_ujb","postgres","ezgis0424&&");
		
		con.setAutoCommit(false);
		
		return con;
	}
	
	
	
	public Map<String, Object> makeSvcInfl(String filePath) throws Exception {
		
		System.out.println("filePath" +  filePath);
		// 처리 결과 데이터 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		StringBuilder errorMsg = new StringBuilder();		// 에러 메시지

		Connection con = getConnectionDB();			// DB Connection 객체
		
		PreparedStatement pstmt = null;			// Prestatement 객체
		
		// Table Insert 스크립트
		String sql = "INSERT INTO test_dsu_po_svc_infl_202205_if" + 
				" (std_ym, std_ymd, time, inflow_cd, hcode, h_pop, w_pop, v_pop)" + 
				" VALUES" + 
				" (?, ?, ?, ?, ?, ?, ?, ?)";

		// 파일에서 읽어온 데이터 구분자
		String charSplit = "|";
		
		int readLineCnt = 0;		// 데이터 Row 수
		int batchCnt = 0;			// 트랜잭션 단위
		int errorCnt = 0;			// 에러 메시지 수
		
		try{

			System.out.println("============================  DB Connection");
            pstmt = con.prepareStatement(sql) ;
            System.out.println("pstmt" +  pstmt);

            System.out.println("============================  File Read");
            
            // 파일 오픈
    		String parFile1 = filePath.replace('\\', FILE_SEPARATOR).replace('/', FILE_SEPARATOR);
    		System.out.println("parFile1" + parFile1);
    		File file = new File(ComWebUtil.filePathBlackList(parFile1));
    		BufferedReader br = null;
            System.out.println("1번=======================================================");
    		// 파일이며, 존재하면 파싱 시작
    		if (file.exists() && file.isFile()) {
    			
    			// 파일에서 내용을 읽어서 StringBuffer에 쌓는다.
    			//br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
    			br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));

    			String line = "";
    			
    			while ((line = br.readLine()) != null) {
    				
    				if(line.length() > 0) {

    					// 첫 라인은 컬럼 정보이기 때문에 2번째 라인부터 저장한다
    					if(readLineCnt > 0){

							String[] strFileline = ComStringUtil.split(line.toString(), charSplit);
    						
							System.out.println("strFileline.length" + strFileline.length);
							System.out.println("strFileline===============" + strFileline);
    						if(strFileline.length == 8) {
    							
    							String resultTemp = "";
    							//pay_area_se, toi_lcla_nm, toi_midc_nm, toi_scla_nm, crtr_ym, crtr_ymd, 
    							//dow, corp_prsn_se, sexd_cd, age, use_amt, use_cnt, pay_custm_cnt
							//STD_YM, STD_YMD, TIME, INFLOW_CD, HCODE, H_POP, W_POP, V_POP
    							String STD_YM = strFileline[0];
    							String STD_YMD = strFileline[1];
    							String TIME = strFileline[2];
    							String INFLOW_CD = strFileline[3];
    							String HCODE = strFileline[4];
    							String H_POP = strFileline[5];
    							String W_POP = strFileline[6];
    							String V_POP = strFileline[7];
    							
    							System.out.println("std_ym"+ STD_YM);
    							System.out.println("std_ymd"+ STD_YMD);
    							System.out.println("TIME"+ TIME);
    							System.out.println("INFLOW_CD"+ INFLOW_CD);
    							System.out.println("HCODE"+ HCODE);
    							System.out.println("H_POP"+ H_POP);
    							System.out.println("W_POP"+ W_POP);
    							System.out.println("V_POP"+ V_POP);
    							
    							if(strFileline[0].isEmpty()) {STD_YM = "99999999";resultTemp += ",STD_YM:E";}
    							if(strFileline[1].isEmpty()) {STD_YMD = "99999999";resultTemp += ",STD_YMD:E";}
    							if(strFileline[2].isEmpty()) {TIME = "99999999";resultTemp += ",TIME:E";}
    							if(strFileline[3].isEmpty()) {INFLOW_CD = "99999999";resultTemp += ",INFLOW_CD:E";}
    							if(strFileline[4].isEmpty()) {HCODE = "999999";resultTemp += ",HCODE:E";}
    							if(strFileline[5].isEmpty()) {H_POP = "99999999";resultTemp += ",H_POP:E";}
    							if(strFileline[6].isEmpty()) {W_POP = "999";resultTemp += ",W_POP:E";}
    							if(strFileline[7].isEmpty()) {V_POP = "99999999";resultTemp += ",V_POP:E";}
    							
    							
    							pstmt.setString(1, STD_YM);
    			                pstmt.setString(2, STD_YMD);
    			                pstmt.setString(3, TIME);
    			                pstmt.setString(4, INFLOW_CD);
    			                pstmt.setString(5, HCODE);
    			                pstmt.setFloat(6, Float.parseFloat(H_POP));
    			                pstmt.setFloat(7, Float.parseFloat(W_POP));
    			                pstmt.setFloat(8, Float.parseFloat(V_POP));
    			              
    			                
    			                // addBatch에 담기
    			                pstmt.addBatch();
    			                   
    			                // 파라미터 Clear
    			                pstmt.clearParameters() ;
    			                
    			                // Batch Count 증가
    			                batchCnt++;
    			                
    			                // 데이터 체크 메시지 만들기
    			                if(resultTemp.length() > 0) {
    			                	
    			                	errorMsg.append("L:" + readLineCnt + "" + resultTemp + "|");		// 에러 메시지 남기기
    			                	errorCnt++;			// 에러 수 증가하기
    			                }
    			                   
    			                // OutOfMemory를 고려하여 만건 단위로 커밋
    			                if( (batchCnt % 10000) == 0){
    			                //if( (batchCnt % 10) == 0){	
    			                       
    			                    // Batch 실행
    			                    pstmt.executeBatch() ;
    			                       
    			                    // Batch 초기화
    			                    pstmt.clearBatch();
    			                       
    			                    // 커밋
    			                    con.commit() ;
    			                    
    			                    batchCnt = 0;
    			                    
    			                    System.out.println("============================  Insert Cnt : " + readLineCnt);
    			                }
    			                
    						}else {
    				            System.out.println("5번=======================================================");

    							errorMsg.append("L:" + readLineCnt + ",C|");
    							errorCnt++;			// 에러 수 증가하기
    						}
    					}
    					
    					readLineCnt++;		// Read Count 중가
    				}
    			}
    			
    			// 커밋되지 못한 나머지 구문에 대하여 커밋
	            pstmt.executeBatch() ;
	            con.commit() ;
	            
	            con.setAutoCommit(true);
    			
    		}

		}catch(Exception e){

			con.rollback();
			throw e;
               
        }finally{
        	
            if (pstmt != null) try {pstmt.close();pstmt = null;} catch(SQLException ex){}
            if (con != null) try {con.close();con = null;} catch(SQLException ex){}
            
            readLineCnt--;
            System.out.println("============================  Insert Cnt : " + readLineCnt);
            System.out.println("============================  처리 완료");
        }
		
		resultMap.put("dataCnt", readLineCnt);
		resultMap.put("errorMsg", errorMsg.toString());
		resultMap.put("errorCnt", errorCnt);
		
		
		return resultMap;
	}
}