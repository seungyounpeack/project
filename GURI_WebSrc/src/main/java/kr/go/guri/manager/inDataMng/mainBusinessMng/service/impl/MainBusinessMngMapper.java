package kr.go.guri.manager.inDataMng.mainBusinessMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * @Description		: 사업추진계획 관리 Mapper
 * @Source        	: MainBusinessMngMapper.java
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
@Repository("mainBusinessMngMapper")
public class MainBusinessMngMapper extends ComAbstractDAO {
	
	/**
	 * 의정부 사업추진현황테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int createBusiStatus(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.createBusiStatus", param);
	}
	
	/**
	 * 의정부 사업추진현황 상세테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int createBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.createBusiStatusDetail", param);
	}
	
	/**
	 * 의정부 사업추진현황 통계테이블 insert
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int createBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.createBusiStatusStatic", param);
	}
	
	/**
	 * 의정부 사업추진현황 파일 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int deleteFileDetail(Map<String, Object> param) throws IOException, SQLException{
		return delete("MainBusinessMngDAO.deleteFileDetail", param);
	}
	
	
	/**
	 * 사업현황 테이블 데이터 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int deleteBusiContents(Map<String, Object> param) throws IOException, SQLException{
		return delete("MainBusinessMngDAO.deleteBusiContents", param);
	}
	
	/**
	 * 사업현황 상세 테이블 데이터 delete
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int deleteBusiDetailContents(Map<String, Object> param) throws IOException, SQLException{
		return delete("MainBusinessMngDAO.deleteBusiDetailContents", param);
	}
	
	/**
	 * 의정부 사업추진현황테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int updateBusiStatus(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.updateBusiStatus", param);
	}
	
	/**
	 * 의정부 사업추진현황 상세테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int updateBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.updateBusiStatusDetail", param);
	}
	
	/**
	 * 의정부 사업추진현황 통계테이블 update
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int updateBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException{
		return insert("MainBusinessMngDAO.updateBusiStatusStatic", param);
	}
	
	/**
	 * 추진 사업현황 첨부파일정보 가져오기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> selectGetFileId() throws IOException, SQLException{
		return selectOne("MainBusinessMngDAO.selectGetFileId");
	}
	
	/**
	 * 추진 사업현황 다음등록 no가져오기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> selectBusiNo() throws IOException, SQLException{
		return selectOne("MainBusinessMngDAO.selectBusiNo");
	}
	
	/**
	 * 추진 사업리스트 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectBusiList() throws IOException, SQLException{
		return selectList("MainBusinessMngDAO.selectBusiList");
	}
	
	/**
	 * 사업현황 조회 하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectBusiDesc(Map<String, Object> param) throws IOException, SQLException{
		return selectList("MainBusinessMngDAO.selectBusiDesc", param);
	}
	
	/**
	 * 사업현황 조회 하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> selectBusiFileInfo(Map<String, Object> param) throws IOException, SQLException{
		return selectOne("MainBusinessMngDAO.selectBusiFileInfo", param);
	}
	
	
	
}
