package kr.go.guri.manager.dataMng.fieldDataReg.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("fieldDataRegMapper")
public class FieldDataRegMapper extends ComAbstractDAO{

	public List<Map<String, Object>> fieldDataList(Map<String, Object> param) throws SQLException , IOException{
		return selectList("FieldDataRegDAO.selectFieldDataList", param);
	}

	public List<Map<String, Object>> fieldDataCode() throws SQLException , IOException{
		return selectList("FieldDataRegDAO.selectFieldDataCode");
	}

	public Map<String, Object> selectData(Map<String, Object> param) throws SQLException , IOException{
		return selectOne("FieldDataRegDAO.selectData", param);
	}

	public int fieldDataInsert(Map<String, Object> param) throws SQLException , IOException{
		return insert("FieldDataRegDAO.fieldDataInsert", param);
	}

	public int fieldDataUpdate(Map<String, Object> param) throws SQLException , IOException{
		return update("FieldDataRegDAO.fieldDataUpdate", param);
	}

	public Map<String, Object> fieldFileData(Map<String, Object> param) throws SQLException , IOException{
		return selectOne("FieldDataRegDAO.fieldFileData", param);
	}
	

	
}
