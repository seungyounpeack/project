package kr.go.guri.manager.logDataMng.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("logDataMngMapper")
public class LogDataMngMapper extends ComAbstractDAO {

	public Map<String, Object> selectLogDataDateTotal(Map<String, Object> param) {
		return selectOne("LogDataManageDAO.selectLogDataDateTotal", param);
	}

	public Map<String, Object> selectLogDataAllTotal() {
		return selectOne("LogDataManageDAO.selectLogDataAllTotal");
	}

	public List<Map<String, Object>> selectLogDataMonthCnt(Map<String, Object> param) {
		return selectList("LogDataManageDAO.selectLogDataMonthCnt", param);
	}
	
	public List<Map<String, Object>> selectLogDataDayCnt(Map<String, Object> param) {
		return selectList("LogDataManageDAO.selectLogDataDayCnt", param);
	}
	
	public List<Map<String, Object>> selectLogDetailView(Map<String, Object> param) {
		return selectList("LogDataManageDAO.selectLogDetailView", param);
	}

	

}
