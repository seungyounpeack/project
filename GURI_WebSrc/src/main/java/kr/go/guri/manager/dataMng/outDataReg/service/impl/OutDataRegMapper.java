package kr.go.guri.manager.dataMng.outDataReg.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("outDataRegMapper")
public class OutDataRegMapper extends ComAbstractDAO{

	public List<Map<String, Object>> outDataList(Map<String, Object> param) throws SQLException , IOException{
		return selectList("OutDataRegDAO.selectOutDataList", param);
	}

	public List<Map<String, Object>> outDataHisList(Map<String, Object> param) throws SQLException , IOException{
		return selectList("OutDataRegDAO.selectOutDataHisList", param);
	}
	
	public Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) throws SQLException , IOException{
		return selectOne("OutDataRegDAO.selectUpliadFileInfo", param);
	}
	
	public int insertFileUploadInfo(Map<String, Object> param) throws SQLException , IOException{
		return insert("OutDataRegDAO.insertFileUploadInfo", param);
	}

	public int insertFileUploadHistory(Map<String, Object> param) throws SQLException , IOException{
		return insert("OutDataRegDAO.insertFileUploadHistory", param);
	}

	public int createSvcInfl(Map<String, Object> param) throws SQLException , IOException{
		return update("OutDataRegDAO.createSvcInfl", param);
	}

	public int insertSvcInfl(Map<String, Object> param) throws SQLException , IOException{
		return delete("OutDataRegDAO.insertSvcInfl", param);
	}

	public int deleteSvcInfl(Map<String, Object> param) throws SQLException , IOException{
		return delete("OutDataRegDAO.deleteSvcInfl", param);
	}


	

}
