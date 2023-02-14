package kr.go.guri.manager.dataMng.dataReg.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 관리자 > 데이터 등록 Mapper 클래스
* @author 서미현
* @since 2022. 10. 10.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			        수정자			   수정내용
*  -------      -------------   ----------------------
*  2022.10.10.   	서미현                          최초 생성
*   
* </pre>
*/
@Repository("dataRegMapper")
public class DataRegMapper extends ComAbstractDAO{

	public List<Map<String, Object>> getDataList(Map<String, Object> param) {
		return selectList("DataRegDAO.getDataList", param);
	}
	
	public List<Map<String, Object>> getDataHisList(Map<String, Object> param) {
		return selectList("DataRegDAO.getDataHisList", param);
	}
	
	public List<Map<String, Object>> getDepList() {
		return selectList("DataRegDAO.getDepList");
	}
	
	public Map<String, Object> getDataContentAllCount(Map<String, Object> param) {
		return selectOne("DataRegDAO.getDataContentAllCount", param);
	}
	
	public List<Map<String, Object>> getDataYearList(Map<String, Object> param) {
		return selectList("DataRegDAO.getDataYearList", param);
	}
	
	public List<Map<String, Object>> selectColCom(Map<String, Object> param) {
		return selectList("DataRegDAO.selectColCom", param);
	}

	public int insertFileUploadInfo(Map<String, Object> param) {
		return insert("DataRegDAO.insertFileUploadInfo", param);
	}

	public int insertFileUploadHistory(Map<String, Object> param) {
		return insert("DataRegDAO.insertFileUploadHistory", param);
	}

	public Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) {
		return selectOne("DataRegDAO.selectUpliadFileInfo", param);
	}

	public Map<String, Object> selectTableExist(Map<String, Object> param) {
		return selectOne("DataRegDAO.selectTableExist", param);
	}

	public int createIfTable(Map<String, Object> param) {
		return update("DataRegDAO.createIfTable", param);
	}

	public List<Map<String, Object>> selectGetColumn(Map<String, Object> param) {
		return selectList("DataRegDAO.selectGetColumn", param);
	}

	public List<Map<String, Object>> selectGetColumnType(Map<String, Object> param) {
		return selectList("DataRegDAO.selectGetColumnType", param);
	}

	public int deleteIfTable(Map<String, Object> param) {
		return delete("DataRegDAO.deleteIfTable", param);
	}

	public int InsertDataTable(Map<String, Object> param) {
		return insert("DataRegDAO.InsertDataTable", param);
	}

	public Map<String, Object> selectDldFile(Map<String, Object> param) {
		return selectOne("DataRegDAO.selectDldFile", param);
	}

	public Map<String, Object> getDataTableNm(Map<String, Object> param) {
		return selectOne("DataRegDAO.getDataTableNm", param);
	}

	
}
