package kr.go.guri.manager.inDataMng.mainBusinessMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @Description		: 데이터 현황 관리 Service
 * @Source        	: MainBusinessMngService.java
 * @author 김부권
 * @since 2021. 09. 23.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.09.23.   	김부권          최초 생성
 *   
 * </pre>
 */

public interface MainBusinessMngService {
	
	/**
	 * 의정부 사업추진현황테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int createBusiStatus(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황 상세테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int createBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황 통계테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int createBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황 파일정보 데이터 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int deleteFileDetail(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 사업현황 테이블 데이터 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int deleteBusiContents(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 사업현황 상세 테이블 데이터 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int deleteBusiDetailContents(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int updateBusiStatus(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황 상세테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int updateBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 의정부 사업추진현황 통계테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	int updateBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException;
	
	/**
	 * 추진 사업현황 첨부파일 정보 가져오기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> selectGetFileId() throws IOException, SQLException;
	
	/**
	 * 추진 사업현황 다음등록 no가져오기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> selectBusiNo() throws IOException, SQLException;
	
	/**
	 * 추진 사업리스트 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	List<Map<String, Object>> selectBusiList() throws IOException, SQLException;
	
	/**
	 * 사업현황 조회 하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	List<Map<String, Object>> selectBusiDesc(Map<String, Object> param) throws IOException, SQLException;
	/**
	 * 사업현황 파일정보 조회 하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	Map<String, Object> selectBusiFileInfo(Map<String, Object> param) throws IOException, SQLException;
	
}
