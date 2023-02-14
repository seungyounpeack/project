package kr.go.guri.manager.inDataMng.dataStatusMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * @Description		: 주요업무등록  Mapper
 * @Source        	: DataStatusMngMapper.java
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
@Repository("dataStatusMngMapper")
public class DataStatusMngMapper extends ComAbstractDAO {
	
	/**
	 * 스키마별 데이터  조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectScmaList() throws IOException, SQLException{
		return selectList("DataStatusMngDAO.selectScmaList");
	}
	
	
	/**
	 * 스키마별 데이터 갯수 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectScmaStatusCnt() throws IOException, SQLException{
		return selectList("DataStatusMngDAO.selectScmaStatusCnt");
	}
	
	/**
	 * 스키마별 데이터 리스트 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectScmaStatus(Map<String, Object> param) throws IOException, SQLException{
		return selectList("DataStatusMngDAO.selectScmaStatus", param);
	}
	
	
	
}
