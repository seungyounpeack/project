package kr.go.guri.manager.logDataMng.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.logDataMng.service.LogDataMngService;

@Service("logDataMngService")
public class LogDataMngServiceImpl implements LogDataMngService{

	@Resource(name = "logDataMngMapper")
	private LogDataMngMapper logDataMngMapper;

	@Override
	public Map<String, Object> selectLogDataDateTotal(Map<String, Object> param) throws Exception {
		return logDataMngMapper.selectLogDataDateTotal(param);
	}

	@Override
	public Map<String, Object> selectLogDataAllTotal() throws Exception {
		return logDataMngMapper.selectLogDataAllTotal();
	}

	@Override
	public List<Map<String, Object>> selectLogDataMonthCnt(Map<String, Object> param) throws Exception {
		return logDataMngMapper.selectLogDataMonthCnt(param);
	}
	
	@Override
	public List<Map<String, Object>> selectLogDataDayCnt(Map<String, Object> param) throws Exception {
		return logDataMngMapper.selectLogDataDayCnt(param);
	}
	
	@Override
	public List<Map<String, Object>> selectLogDetailView(Map<String, Object> param) throws Exception {
		return logDataMngMapper.selectLogDetailView(param);
	}

	
}